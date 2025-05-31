import {
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from 'recharts'

const COLORS = ['#60a5fa', '#facc15', '#4ade80', '#f87171', '#a78bfa', '#f472b6']

const WorkflowFailureChart = ({data}) => {
    return (
        <div className="chart-style">
            <h3 className="text-xl font-semibold mb-4 text-center">Taux d'échec par workflow</h3>
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
                    <Tooltip />
                    <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default WorkflowFailureChart