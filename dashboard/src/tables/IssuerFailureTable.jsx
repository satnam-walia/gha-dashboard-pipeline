
export const IssuerFailureTable = ({ data }) => (
    <div className="my-8">
        <h3 className="text-xl font-semibold mb-4">Taux d'échec par émetteur</h3>
        <div className="overflow-x-auto rounded-lg overflow-hidden border border-gray-200">
            <table className="min-w-full table-auto">
                <thead className="bg-gray-100">
                <tr>
                    <th className="px-4 py-2 text-left border-r border-gray-200">Émetteur</th>
                    <th className="px-4 py-2 text-left">Taux d'échec (%)</th>
                </tr>
                </thead>
                <tbody>
                    {data && data.length > 0 ? (
                        data.map((row, index) => (
                            <tr key={index} className={`table-row ${index < data.length - 1 ? "border-b border-gray-200" : ""}`}>
                                <td className="px-4 py-2 border-r border-gray-200">{row.issuer_name}</td>
                                <td className="px-4 py-2">{row.failure_rate.toFixed(2)}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2" className="px-4 py-4 text-center text-gray-500">
                                Aucune donnée disponible pour les émetteurs.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
)