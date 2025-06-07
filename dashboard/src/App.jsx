import { computeKpisFromCSV } from './utils/computeKpis.js'
import { useState } from "react";
import DashboardPage from "./pages/DashboardPage.jsx";
import Papa from "papaparse";

const App = () => {
    const [kpis, setKpis] = useState({})


    const handleResetApp = () => {
        setKpis({})
    }

    return (
        <DashboardPage kpis={kpis} onReset={handleResetApp} />
    )
}

export default App;
