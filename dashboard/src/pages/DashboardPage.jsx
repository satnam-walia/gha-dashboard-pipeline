import WorkflowStddevChart from "../charts/WorkflowStddevChart.jsx";
import WorkflowFailureChart from "../charts/WorkflowFailureChart.jsx";
import {IssuerFailureTable} from "../tables/IssuerFailureTable.jsx";
import ReactLogo from "./../assets/react.svg"
import {Link} from "react-router-dom";

const DashboardPage = ({kpis}) => {
    return (
        <div className="mx-56 p-8 bg-white">
            <div className="flex flex-row items-baseline justify-start gap-2">
                <img className={"cursor-pointer"} src={ReactLogo} alt="React Logo" width={45} height={45}/>
                <h2 className="text-5xl text-blue-600 font-semibold mb-6">GHA Dashboard</h2>
            </div>
            <div className="divide-y divide-gray-200">
                <div className="grid grid-cols-2 gap-10 mb-3">
                    <WorkflowStddevChart data={kpis.workflowStddev}/>
                    <WorkflowFailureChart data={kpis.workflowFailures}/>
                </div>
                <IssuerFailureTable data={kpis.issuerFailures}/>
            </div>
        </div>
    )
}
export default DashboardPage