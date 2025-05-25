import React from 'react'
import {BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid} from 'recharts'

const WorkflowFailureChart = ({data}) => (
    <div className="my-8">
        <h3 className="text-xl font-semibold mb-4">Taux d'échec par workflow</h3>
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data} layout="vertical" margin={{left: 100}}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis type="number" domain={[0, 100]}
                       label={{value: "% d'échec", position: 'insideBottomRight', offset: 0}}/>
                <YAxis type="category" dataKey="workflow_name"/>
                <Tooltip/>
                <Bar dataKey="failure_rate" fill="#f87171"/>
            </BarChart>
        </ResponsiveContainer>
    </div>
)
export default WorkflowFailureChart