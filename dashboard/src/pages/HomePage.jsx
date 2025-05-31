import {useState} from "react";
import FilePreviewCard from "../components/FilePreviewCard.jsx";
import { X } from "lucide-react";

const HomePage = ({onProcessCsv}) => {
    const [dragOver, setDragOver] = useState(false)
    const [file, setFile] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const processFile = (file) => {
        setErrorMessage(null)
        
        if (file && file.type === 'text/csv' && file.name.endsWith('.csv')) {
            setFile(file)

            return
        }

        setErrorMessage("Veuillez sélectionner un fichier CSV valide.")
        setFile(null)
    }

    const handleSubmit = async () => {
        setErrorMessage(null)
        setIsLoading(true)
        
        try {
            await onProcessCsv(file)
        } catch (error) {
            setErrorMessage(error.message)
            setFile(null)
        } finally {
            setIsLoading(false)
        }
    }

    const handleRemove = () => {
        setFile(null)
        setErrorMessage(null)
        setIsLoading(false)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setDragOver(false)
        const file = e.dataTransfer.files[0]
        processFile(file)
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        processFile(file)
    }

    return (
        <div className="w-full min-h-screen flex flex-col items-center bg-white justify-cente px-4 pt-20 gap-5">
            <div className={"flex flex-col items-center justify-center gap-3"}>
                <h1 className={"text-blue-600 text-5xl font-bold"}>Home page</h1>
                <p className={"text-gray-500"}>Welcome to home page</p>
            </div>
            <div className="w-full max-w-3xl">
                {errorMessage && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <strong className="font-bold">Erreur !</strong>
                        <span className="block sm:inline"> {errorMessage}</span>
                        <span className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer flex items-center justify-center" onClick={() => setErrorMessage(null)}>
                            <X className="w-5 h-5 text-red-500 hover:text-blue-600" />
                        </span>
                    </div>
                )}
                
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
                    <FilePreviewCard file={file} onRemove={handleRemove} onSubmit={handleSubmit} isLoading={isLoading}/>
                )}
            </div>
        </div>

    )
}

export default HomePage