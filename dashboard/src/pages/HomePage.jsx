import {useState} from "react";
const HomePage = ({setCsvData}) => {
    const [dragOver, setDragOver] = useState(false)
    const [fileName, setFileName] = useState(null)

    const handleDrop = (e) => {
        e.preventDefault()
        setDragOver(false)
        const file = e.dataTransfer.files[0]
        if (file && file.type === 'text/csv') {
            setFileName(file.name)
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file && file.type === 'text/csv') {
            setFileName(file.name)
        }
    }
    return (
        <div className="w-full flex flex-col items-center justify-center bg-grey-50 px-4 mt-10">
            <div className={"flex flex-col items-center justify-center gap-3"}>
                <h1 className={"text-blue-600 text-5xl font-bold"}>Home page</h1>
                <p className={"text-gray-500"}>Welcome to home page</p>
            </div>
            <div
                onDrop={handleDrop}
                onDragOver={(e) => {
                    e.preventDefault()
                    setDragOver(true)
                }}
                onDragLeave={() => setDragOver(false)}
                className={`mt-5 w-1/2 border-4 border-dotted rounded-lg p-10 text-center transition-colors ${
                    dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
            >
                <p className="text-gray-600 text-lg mb-2">{!fileName ? "Glissez un fichier CSV ici" : "Glissez un autre fichier CSV ici"}</p>
                <p className="text-sm text-gray-500 mb-4">ou cliquez pour en sélectionner un</p>

                <label
                    htmlFor="file-upload"
                    className="cursor-pointer inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    {!fileName ? "Choisir un fichier" : "Choisir un autre fichier"}
                </label>
                <input
                    id="file-upload"
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    className="hidden"
                />
                {fileName && (
                    <p className="mt-4 text-sm text-green-600">
                        Fichier chargé : <span className="font-medium">{fileName}</span>
                    </p>
                )}
            </div>
        </div>

    )
}
export default HomePage