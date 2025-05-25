import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

const WorkflowStddevChart = ({ data }) => (
    <div className="my-8">
        <h3 className="text-xl font-semibold mb-4">Écart-type des durées des workflows</h3>
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data} layout="vertical" margin={{ left: 100 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" label={{ value: 'Écart-type (s)', position: 'insideBottomRight', offset: 0 }} />
                <YAxis type="category" dataKey="workflow_name" />
                <Tooltip />
                <Bar dataKey="duration_stddev" fill="#facc15" />
            </BarChart>
        </ResponsiveContainer>
    </div>
)

export default WorkflowStddevChart