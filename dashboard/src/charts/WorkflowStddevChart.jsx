import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import StddevTooltip from '../components/StddevTooltip.jsx'
import CustomXAxisTick from '../components/CustomXAxisTick.jsx'

const WorkflowStddevChart = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <div className="my-8">
                <h3 className="text-xl font-semibold mb-4 text-left">Écart-type des durées des workflows</h3>
                <div className="chart-style">
                    <p className="text-gray-500 text-center py-4">Aucune donnée disponible pour ce graphique.</p>
                </div>
            </div>
        )
    }
    
    return(
        <div className="my-8">
            <h3 className="text-xl font-semibold mb-4 text-left">Écart-type des durées des workflows</h3>
            <div className="chart-style">
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={data} layout="horizontal" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="workflow_name" type="category" tick={<CustomXAxisTick />} interval={0} height={80} />
                        <YAxis type="number" width={80} label={{ value: 'Écart-type (s)', position: 'insideTopRight' }} padding={{ top: 48 }} />
                        <Tooltip content={<StddevTooltip />} />
                        <Bar dataKey="duration_stddev" fill="#facc15" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default WorkflowStddevChart