import {Upload} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {FieldType, FormField} from "@/features/pdf-form-builder";
import {RefObject} from "react";

type CenterContentProps = {
    pdfUrl?: string;
    pdfFile?:File | null
    handleDragOver?: () => void;
    handleDragLeave?: () => void;
    handleDrop?: () => void;
    isDragging: boolean;
    fileInputRef: RefObject<HTMLInputElement | null>;
    canvasRef: RefObject<HTMLDivElement | null>;
    handleCanvasClick?: () => void;
    selectedFieldType: string | null;
    fields: FormField[]
    fieldTypeConfig: any;
    handleFieldClick: (field:FormField, e: React.MouseEvent) => void;
    selectedField: FormField | null;

}

export const CenterContent:React.FC<CenterContentProps> = ({fields,pdfFile,fieldTypeConfig,selectedFieldType,selectedField,handleFieldClick, handleCanvasClick,canvasRef,handleDragLeave,handleDragOver,isDragging,handleDrop,fileInputRef,pdfUrl}) => {
    return (
        <div className="flex-1 overflow-auto bg-gray-100 p-8">
            {!pdfUrl ? (
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`h-full flex items-center justify-center border-2 border-dashed rounded-lg transition-colors ${
                        isDragging
                            ? "border-[#F36F23] bg-orange-50"
                            : "border-gray-300 bg-white"
                    }`}
                >
                    <div className="text-center max-w-md">
                        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Upload className="size-8 text-blue-600" />
                        </div>
                        <h2 className="text-[#2E2E2E] mb-2">
                            Welcome to PDF Form Builder
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Upload a PDF document to start adding interactive form fields. You can add text inputs, checkboxes, signatures, dates, and dropdowns.
                        </p>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-sm text-gray-700">
                                <Badge variant="outline" className="bg-blue-50">1</Badge>
                                <span>Upload a PDF document</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-700">
                                <Badge variant="outline" className="bg-blue-50">2</Badge>
                                <span>Drag field types onto the document</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-700">
                                <Badge variant="outline" className="bg-blue-50">3</Badge>
                                <span>Switch to Fill mode and enter data</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-700">
                                <Badge variant="outline" className="bg-blue-50">4</Badge>
                                <span>Export your filled PDF</span>
                            </div>
                        </div>
                        <Button
                            onClick={() => fileInputRef.current?.click()}
                            className="mt-8 bg-[#F36F23] hover:bg-[#E05D15] text-white"
                        >
                            <Upload className="size-4 mr-2" />
                            Upload PDF
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-lg mx-auto max-w-[800px]">
                    <div
                        ref={canvasRef}
                        onClick={handleCanvasClick}
                        className="relative min-h-[1100px] border border-gray-300 rounded-lg cursor-crosshair"
                        style={{
                            backgroundImage: "linear-gradient(#f0f0f0 1px, transparent 1px), linear-gradient(90deg, #f0f0f0 1px, transparent 1px)",
                            backgroundSize: "20px 20px",
                        }}
                    >
                        {/* PDF Preview Placeholder */}
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                            <div className="text-center">
                                <p className="text-sm mb-2">PDF Preview</p>
                                <p className="text-xs">{pdfFile?.name}</p>
                                <p className="text-xs mt-4">
                                    {selectedFieldType
                                        ? `Click to place ${selectedFieldType} field`
                                        : "Select a field type from the left sidebar"}
                                </p>
                            </div>
                        </div>

                        {/* Form Fields */}
                        {fields.map((field) => {
                            const config = fieldTypeConfig[field.type];
                            const Icon = config.icon;
                            return (
                                <div
                                    key={field.id}
                                    onClick={(e) => handleFieldClick(field, e)}
                                    className={`absolute border-2 rounded transition-all cursor-move ${
                                        selectedField?.id === field.id
                                            ? "border-[#F36F23] shadow-lg"
                                            : `border-gray-400 ${config.color}`
                                    }`}
                                    style={{
                                        left: field.x,
                                        top: field.y,
                                        width: field.width,
                                        height: field.height,
                                    }}
                                >
                                    <div className="flex items-center gap-2 h-full px-2">
                                        <Icon className="size-4" />
                                        {field.type !== "checkbox" && (
                                            <span className="text-xs truncate">{field.label}</span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}