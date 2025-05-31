import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

const WorkflowStddevChart = ({ data }) => {
    console.log('📈 stddev data:', data)
    return(
        <div className="chart-style">
            <h3 className="text-xl font-semibold mb-4">Écart-type des durées des workflows</h3>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data} layout="horizontal" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="workflow_name" type="category" />
                    <YAxis type="number" label={{ value: 'Écart-type (s)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Bar dataKey="duration_stddev" fill="#facc15" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default WorkflowStddevChart