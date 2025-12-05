"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Upload,
    Type,
    CheckSquare,
    PenTool,
    Calendar,
    ChevronDown,
    Grid3x3,
    Wand2,
    Trash2,
    Eye,
    Download,
    Settings2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {LeftSide, RightSide} from "@/features/pdf-form-builder/components";
import {CenterContent} from "@/features/pdf-form-builder/components/center";

export type FieldType = "text" | "checkbox" | "signature" | "date" | "dropdown";

export interface FormField {
    id: string;
    type: FieldType;
    x: number;
    y: number;
    width: number;
    height: number;
    label: string;
    placeholder?: string;
    required: boolean;
}
//
// export type FieldConfigType = typeof fieldTypeConfig

const fieldTypeConfig = {
    text: {
        icon: Type,
        label: "Text",
        color: "bg-yellow-100 text-yellow-700 border-yellow-300",
    },
    checkbox: {
        icon: CheckSquare,
        label: "Checkbox",
        color: "bg-green-100 text-green-700 border-green-300",
    },
    signature: {
        icon: PenTool,
        label: "Signature",
        color: "bg-pink-100 text-pink-700 border-pink-300",
    },
    date: {
        icon: Calendar,
        label: "Date",
        color: "bg-blue-100 text-blue-700 border-blue-300",
    },
    dropdown: {
        icon: ChevronDown,
        label: "Dropdown",
        color: "bg-purple-100 text-purple-700 border-purple-300",
    },
};

export function PDFFormBuilder() {
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [fields, setFields] = useState<FormField[]>([]);
    const [selectedFieldType, setSelectedFieldType] = useState<FieldType | null>(null);
    const [selectedField, setSelectedField] = useState<FormField | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [activeTab, setActiveTab] = useState("design");
    const [documentName, setDocumentName] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const canvasRef = useRef<HTMLDivElement>(null);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type === "application/pdf") {
            setPdfFile(file);
            const url = URL.createObjectURL(file);
            setPdfUrl(url);
            setDocumentName(file.name);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type === "application/pdf") {
            setPdfFile(file);
            const url = URL.createObjectURL(file);
            setPdfUrl(url);
            setDocumentName(file.name);
        }
    };

    const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!selectedFieldType || !canvasRef.current) return;

        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newField: FormField = {
            id: Date.now().toString(),
            type: selectedFieldType,
            x,
            y,
            width: selectedFieldType === "checkbox" ? 20 : 200,
            height: selectedFieldType === "checkbox" ? 20 : 40,
            label: `${selectedFieldType} field`,
            placeholder: selectedFieldType === "text" ? "Enter text" : undefined,
            required: false,
        };

        setFields([...fields, newField]);
        setSelectedFieldType(null);
    };

    const handleFieldClick = (field: FormField, e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedField(field);
    };

    const handleDeleteField = () => {
        if (selectedField) {
            setFields(fields.filter((f) => f.id !== selectedField.id));
            setSelectedField(null);
        }
    };

    const handleClearAll = () => {
        setFields([]);
        setSelectedField(null);
    };



    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-[1600px] mx-auto">
                {/* Header */}
                <div className="bg-white border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                        </div>
                        <div className="flex items-center gap-3">
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="application/pdf"
                                onChange={handleFileUpload}
                                className="hidden"
                            />
                            <Button
                                variant="outline"
                                className="border-[1.5px] border-gray-400"
                            >
                                <Eye className="size-4 mr-2" />
                                Import
                            </Button>
                            <Button className="bg-[#4169E1] hover:bg-[#3151B7] text-white">
                                Submit
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex h-[calc(100vh-89px)]">
                    {/* Left Sidebar - Tools */}
                    <LeftSide
                        handleClearAll={handleClearAll}
                        setDocumentName={setDocumentName}
                        selectedFieldType={selectedFieldType}
                        activeTab={activeTab}
                        documentName={documentName}
                        setActiveTab={setActiveTab}
                        fieldTypeConfig={fieldTypeConfig}
                        setSelectedFieldType={setSelectedFieldType} />

                    {/* Center - Canvas */}
                    <CenterContent isDragging={isDragging} fileInputRef={fileInputRef} canvasRef={canvasRef} selectedFieldType={selectedFieldType} fields={fields} fieldTypeConfig={fieldTypeConfig} handleFieldClick={handleFieldClick} selectedField={selectedField} />

                    {/* Right Sidebar - Properties */}
                    <RightSide selectedFieldType={selectedFieldType} fields={fields} fieldTypeConfig={fieldTypeConfig} selectedField={selectedField} setSelectedField={setSelectedField} setFields={setFields} />
                </div>
            </div>
        </div>
    );
}