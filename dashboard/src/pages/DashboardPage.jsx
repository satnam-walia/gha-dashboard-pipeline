import React, { useState } from "react";
import WorkflowStddevChart from "../charts/WorkflowStddevChart.jsx";
import WorkflowFailureChart from "../charts/WorkflowFailureChart.jsx";
import {IssuerFailureTable} from "../tables/IssuerFailureTable.jsx";
import ReactLogo from "../assets/react.svg"

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const DashboardPage = ({ kpis, onReset, onRepoSubmit }) => {
    const [repoUrl, setRepoUrl] = useState("");
    // ---- new code----
    // to store streamed KPis and SSE elements
    const [streamedKpis, setStreamedKpis] = useState(null)
    const [eventSource, setEventSource] = useState(null)
    // -----------------


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (repoUrl.trim()) {
            try {
                //---- new code-----
                // code to start the SSE (event stream)
                const source = new EventSource("http://localhost:8000/api/csv_checker");
                source.onmessage= (event) => {
                  console.log("new stream event");
                  try{
                    const parsedData = JSON.parse(event.data);
                    setStreamedKpis(parsedData);
                    console.log("new kpis streamed: ", parsedData);
                  } 
                  catch (e) {
                    console.log("error parsing streamed kpis: ",e);
                  }
                };
                source.onerror = (e) =>{
                  console.error("Error SSE: ",e);
                  source.close();
                };
                await new Promise((resolve) => setTimeout(resolve, 5000));
                //---------------------
                const response = await fetch("http://localhost:8000/api/refresh", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ repo_url: repoUrl, token: GITHUB_TOKEN }),
                });

                const result = await response.json();
                alert(`Status: ${result.status}`);
            } catch (err) {
                console.error("Error:", err);
                alert("Failed to refresh repo.");
            }
        }
    };
    return (
        <div className="mx-56 p-8 bg-white">
            <div className="flex flex-row items-baseline justify-center gap-2">
                <img src={ReactLogo} alt="React Logo" width={45} height={45}/>
                <h2 className="text-5xl text-blue-600 font-semibold mb-6 mr-auto">GHA Dashboard</h2>
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                        type="text"
                        value={repoUrl}
                        onChange={(e) => setRepoUrl(e.target.value)}
                        placeholder="https://github.com/user/repo"
                        className="border border-gray-300 px-4 py-2 rounded w-96"
                    />
                    <button
                        type="submit"
                        className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Analyser dépôt GitHub
                    </button>
                </form>
            </div>
            <div className="divide-y divide-gray-200">
                <div className="grid grid-cols-2 gap-10 mb-3">
                    <WorkflowStddevChart data={kpis.workflowStddev}/>
                    <WorkflowFailureChart data={kpis.workflowFailures}/>
                </div>
                <IssuerFailureTable data={kpis.issuerFailures}/>
            </div>
            {/*------ new code--------*/}
            <div>test react</div>
            {streamedKpis && (
                <div className="mt-8 p-4 bg-gray-100 rounded">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Mise a jour des KPIs en temps reel</h3>
                    <pre className="text-sm text-gray-700 overflow-auto max-h-96">
                        {JSON.stringify(streamedKpis, null, 2)}
                    </pre>
                </div>
            )}
            {/*-----------------*/}
        </div>
    )
}

export default DashboardPage
