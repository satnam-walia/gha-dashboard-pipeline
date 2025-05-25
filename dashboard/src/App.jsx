import { computeKpisFromCSV } from './utils/computeKpis.js'
import {useState, useEffect} from "react";
import HomePage from "./pages/HomePage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";

const App = () => {
    const [csvData, setCsvData] = useState(null)
    const [kpis, setKpis] = useState(null)

    useEffect(() => {
        if (csvData) {
            const kpiResults = computeKpisFromCSV(csvData)
            setKpis(kpiResults)
        }
    }, [csvData])

    return (
        <>
            {!csvData && <HomePage setCsvData={setCsvData} />}
            {kpis && (
                <DashboardPage kpis={kpis} />
            )}
        </>
    )
}

export default App;
