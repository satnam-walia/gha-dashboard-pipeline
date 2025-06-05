export const computeKpisFromCSV = (csvData) => {
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

    })

    return {
        workflowStddev: Object.entries(workflowDurations).map(([name, durations]) => {
            const mean = durations.reduce((a, b) => a + b, 0) / durations.length
            const stddev = Math.sqrt(durations.reduce((sum, x) => sum + Math.pow(x - mean, 2), 0) / durations.length)
            return { workflow_name: name, duration_stddev: parseFloat((stddev).toFixed(2)) }
        }).sort((a, b) => b.duration_stddev - a.duration_stddev),

        issuerFailures: Object.entries(issuerStats).map(([name, stat]) => ({
            issuer_name: name,
            failure_rate: parseFloat((stat.fail / stat.total * 100).toFixed(2))
        })).sort((a, b) => b.failure_rate - a.failure_rate),

        workflowFailures: Object.entries(workflowFailures).map(([name, stat]) => ({
            failures: stat.fail,
            workflow_name: name,
            failure_rate: parseFloat((stat.fail / stat.total * 100).toFixed(2))
        })).sort((a, b) => b.failure_rate - a.failure_rate)
    }
}
