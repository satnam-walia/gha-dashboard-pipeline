import { X, FileText } from 'lucide-react'

const FilePreviewCard = ({ file, onRemove, onSubmit }) => {
    const fileSizeMB = (file.size / (1024 * 1024)).toFixed(1)

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="w-full max-w-3xl bg-gray-100 border border-gray-300 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <FileText className="text-blue-600 w-8 h-8" />
                    <div>
                        <p className="text-sm font-medium text-gray-800">{file.name}</p>
                        <p className="text-xs text-gray-500">{fileSizeMB} MB</p>
                    </div>
                </div>
                <button onClick={onRemove} className="text-blue-600 hover:text-red-600 transition">
                    <X className="w-5 h-5 cursor-pointer" />
                </button>
            </div>

            <button
                onClick={onSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded"
            >
                Générer le dashboard
            </button>
        </div>
    )
}

export default FilePreviewCard
