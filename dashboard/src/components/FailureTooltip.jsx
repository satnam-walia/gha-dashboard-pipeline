const FailureTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const dataEntry = payload[0]

        return (
            <div className="bg-white p-2 border border-gray-300 shadow-md rounded">
                <p className="font-bold text-gray-800">{`${dataEntry.name}`}</p>
                <p className="text-gray-700">{`Taux d'échec: ${dataEntry.value.toFixed(2)}%`}</p>
            </div>
        )
    }

    return null
}

export default FailureTooltip