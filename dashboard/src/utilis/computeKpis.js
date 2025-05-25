// utils/computeKpis.js

export const computeKpisFromCSV = (csvData) => {
    const jobRecords = []
    const workflowDurations = {}
    const issuerStats = {}
    const workflowFailures = {}

    csvData.forEach(row => {
        const workflow = row.workflow_name
        const issuer = row.issuer_name
        const duration = parseFloat(row.build_duration)
        const conclusion = row.conclusion

        // Workflows
        if (workflow) {
            if (!workflowDurations[workflow]) workflowDurations[workflow] = []
            if (!workflowFailures[workflow]) workflowFailures[workflow] = { total: 0, fail: 0 }
            workflowDurations[workflow].push(duration)
            workflowFailures[workflow].total += 1
            if (conclusion === 'failure') workflowFailures[workflow].fail += 1
        }

        // Issuers
        if (issuer) {
            if (!issuerStats[issuer]) issuerStats[issuer] = { total: 0, fail: 0 }
            issuerStats[issuer].total += 1
            if (conclusion === 'failure') issuerStats[issuer].fail += 1
        }

        // Jobs
        if (row.job_details) {
            try {
                const jobs = JSON.parse(row.job_details)
                jobs.forEach(job => {
                    if (job.job_name && job.job_duration) {
                        jobRecords.push({
                            job_name: job.job_name,
                            job_duration: parseFloat(job.job_duration),
                            job_result: job.job_result
                        })
                    }
                })
            } catch (e) {
                // Ignore malformed JSON
            }
        }
    })

    const computeMedian = arr => {
        const sorted = arr.slice().sort((a, b) => a - b)
        const mid = Math.floor(sorted.length / 2)
        return sorted.length % 2 !== 0
            ? sorted[mid]
            : (sorted[mid - 1] + sorted[mid]) / 2
    }

    const jobFailureStats = {}
    const jobDurations = {}

    jobRecords.forEach(job => {
        const name = job.job_name
        if (!jobFailureStats[name]) jobFailureStats[name] = { total: 0, fail: 0 }
        if (!jobDurations[name]) jobDurations[name] = []
        jobFailureStats[name].total += 1
        jobDurations[name].push(job.job_duration)
        if (job.job_result === 'failure') jobFailureStats[name].fail += 1
    })

    return {
        jobFailures: Object.entries(jobFailureStats).map(([name, stat]) => ({
            job_name: name,
            failure_rate: (stat.fail / stat.total) * 100
        })).sort((a, b) => b.failure_rate - a.failure_rate),

        jobDurations: Object.entries(jobDurations).map(([name, durations]) => ({
            job_name: name,
            median_duration: computeMedian(durations)
        })).sort((a, b) => b.median_duration - a.median_duration),

        workflowStddev: Object.entries(workflowDurations).map(([name, durations]) => {
            const mean = durations.reduce((a, b) => a + b, 0) / durations.length
            const stddev = Math.sqrt(durations.reduce((sum, x) => sum + Math.pow(x - mean, 2), 0) / durations.length)
            return { workflow_name: name, duration_stddev: stddev }
        }).sort((a, b) => b.duration_stddev - a.duration_stddev),

        issuerFailures: Object.entries(issuerStats).map(([name, stat]) => ({
            issuer_name: name,
            failure_rate: (stat.fail / stat.total) * 100
        })).sort((a, b) => b.failure_rate - a.failure_rate),

        workflowFailures: Object.entries(workflowFailures).map(([name, stat]) => ({
            workflow_name: name,
            failure_rate: (stat.fail / stat.total) * 100
        })).sort((a, b) => b.failure_rate - a.failure_rate)
    }
}
