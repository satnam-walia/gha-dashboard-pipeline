import { computeKpisFromCSV } from './utils/computeKpis.js'
import { useState } from "react";
import DashboardPage from "./pages/DashboardPage.jsx";
import Papa from "papaparse";
import HomePage from "./pages/HomePage.jsx";
import {useStore} from "./store/useStore.js";

const App = () => {
    const token = useStore((state) => state.token);
    const repo = useStore((state) => state.repo);

    console.log(token);
    const [kpis, setKpis] = useState({})

    const handleResetApp = () => {
        setKpis({})
    }
    if (token && repo) {
       return <DashboardPage kpis={kpis} onReset={handleResetApp} />
    }
    return <HomePage/>
}

export default App;
