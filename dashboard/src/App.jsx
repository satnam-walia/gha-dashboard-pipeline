import { computeKpisFromCSV } from './utils/computeKpis.js'
import { useState } from "react";
import HomePage from "./pages/HomePage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import Papa from "papaparse";

const App = () => {
    const [kpis, setKpis] = useState(null)

    const handleProcessCsvAndKpis = (file) => {
        return new Promise((resolve, reject) => {
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: (result) => {
                    if (result.errors.length) {
                        console.error("Erreurs de parsing:", result.errors)
                        reject(new Error("Erreur lors du parsing du fichier CSV: " + result.errors[0].message))
                        
                        return
                    }

                    const parsedData = result.data;
                    
                    try {
                        const kpiResults = computeKpisFromCSV(parsedData)
                        setKpis(kpiResults)

                        resolve();
                    } catch (error) {
                        console.error("Erreur lors du calcul des KPIs:", kpiError)
                        reject(new Error("Erreur lors du calcul des indicateurs: " + kpiError.message))
                    }
                },
                error: (err) => {
                    console.error("Erreur de lecture du fichier:", err)
                    reject(new Error("Impossible de lire le fichier: " + err.message))
                }
            });
        });
    }

    const handleResetApp = () => {
        setKpis(null)
    }

    return (
        <>
            {!kpis ? (
                <HomePage onProcessCsv={handleProcessCsvAndKpis} />
            ) : (
                <DashboardPage kpis={kpis} onReset={handleResetApp} />
            )}
        </>
    )
}

export default App;
