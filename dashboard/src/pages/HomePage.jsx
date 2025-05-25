import {useState} from "react";
import FilePreviewCard from "../components/FilePreviewCard.jsx";
import Papa from "papaparse";

const HomePage = ({setCsvData}) => {
    const [dragOver, setDragOver] = useState(false)
    const [file, setFile] = useState(null)

    const handleFile = (file) => {
        setFile(file)
    }
    const handleSubmit = () => {
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (result) => {
                //setCsvData(result.data)
                console.log("finish")
            },
        })
    }
    const handleRemove = () => {
        setFile(null)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setDragOver(false)
        const file = e.dataTransfer.files[0]
        if (file && file.type === 'text/csv') {
            setFile(file)
        }
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file && file.type === 'text/csv') {
            setFile(file)
        }
    }
    return (
        <div className="w-full flex flex-col items-center justify-center bg-grey-50 px-4 mt-10 gap-5">
            <div className={"flex flex-col items-center justify-center gap-3"}>
                <h1 className={"text-blue-600 text-5xl font-bold"}>Home page</h1>
                <p className={"text-gray-500"}>Welcome to home page</p>
            </div>
            <div className="w-full max-w-3xl">
                {!file ? (
                    <div
                        onDrop={handleDrop}
                        onDragOver={(e) => {
                            e.preventDefault()
                            setDragOver(true)
                        }}
                        onDragLeave={() => setDragOver(false)}
                        className={`h-72 border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center
                         text-center transition-colors ${dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                    >
                        <p className="text-gray-600 text-lg mb-2">Glissez un fichier CSV ici</p>
                        <p className="text-sm text-gray-500 mb-4">ou cliquez pour en sélectionner un</p>
                        <label htmlFor="file-upload"
                               className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                            Choisir un fichier
                        </label>
                        <input id="file-upload" type="file" accept=".csv" onChange={handleFileChange}
                               className="hidden"/>
                    </div>
                ) : (
                    <FilePreviewCard file={file} onRemove={handleRemove} onSubmit={handleSubmit}/>
                )}
            </div>
        </div>

    )
}
export default HomePage