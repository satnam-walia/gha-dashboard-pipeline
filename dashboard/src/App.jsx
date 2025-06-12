import { computeKpisFromCSV } from './utils/computeKpis.js'
import { useState } from "react";
import DashboardPage from "./pages/DashboardPage.jsx";
import Papa from "papaparse";
import HomePage from "./pages/HomePage.jsx";
import {useStore} from "./store/useStore.js";

const App = () => {
    const [kpis, setKpis] = useState({})


    const handleResetApp = () => {
        setKpis({})
    }
    return <HomePage/>
}

export default App;
