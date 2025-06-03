import {
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from 'recharts'

import FailureTooltip from '../components/FailureTooltip.jsx';

const COLORS = ['#60a5fa', '#facc15', '#4ade80', '#f87171', '#a78bfa', '#f472b6']

const WorkflowFailureChart = ({data}) => {
    if (!data || data.length === 0) {
        return (
            <div className="my-8">
                <h3 className="text-xl font-semibold mb-4 text-left">Taux d'échec par workflow</h3>
                <div className="chart-style">
                    <p className="text-gray-500 text-center py-4">Aucune donnée disponible pour ce graphique.</p>
                </div>
            </div>
        )
    }
    
    return (
        <div className="my-8">
            <h3 className="text-xl font-semibold mb-4 text-left">Taux d'échec par workflow</h3>
            <div className="chart-style">
                <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="failure_rate"
                            nameKey="workflow_name"
                            cx="50%"
                            cy="50%"
                            outerRadius={120}
                            label
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip content={<FailureTooltip />} />
                        <Legend layout="vertical" verticalAlign="bottom" align="center" />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default WorkflowFailureChart