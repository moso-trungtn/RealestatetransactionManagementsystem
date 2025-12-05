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

type FieldType = "text" | "checkbox" | "signature" | "date" | "dropdown";

interface FormField {
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
                    <div className="w-64 bg-white border-r border-gray-200 p-4">
                        <div className="mb-4">
                            <Label htmlFor="document-name" className="text-sm mb-2 block">
                                Document Name
                            </Label>
                            <Input
                                id="document-name"
                                value={documentName}
                                onChange={(e) => setDocumentName(e.target.value)}
                                placeholder="Enter document name"
                                className="h-10 border-[1.5px] border-gray-400 bg-white focus:border-[#F36F23] focus:ring-1 focus:ring-[#F36F23] transition-colors"
                            />
                        </div>

                        <Separator className="mb-4" />

                        <Tabs value={activeTab} onValueChange={setActiveTab}>
                            <TabsList className="grid w-full grid-cols-2 mb-4">
                                <TabsTrigger value="design" className="text-xs">
                                    Design
                                </TabsTrigger>
                                <TabsTrigger value="preview" className="text-xs">
                                    Preview
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="design" className="space-y-4">
                                <div>
                                    <Label className="text-sm mb-3 block">DRAG TO ADD:</Label>
                                    <div className="space-y-2">
                                        {Object.entries(fieldTypeConfig).map(([type, config]) => {
                                            const Icon = config.icon;
                                            return (
                                                <button
                                                    key={type}
                                                    onClick={() => setSelectedFieldType(type as FieldType)}
                                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border-[1.5px] transition-all ${
                                                        selectedFieldType === type
                                                            ? "border-[#F36F23] bg-orange-50"
                                                            : "border-gray-300 hover:border-gray-400 bg-white"
                                                    }`}
                                                >
                                                    <Icon className="size-4" />
                                                    <span className="text-sm">{config.label}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                <Separator />

                                <div className="space-y-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full border-[1.5px] border-gray-400"
                                    >
                                        <Grid3x3 className="size-4 mr-2" />
                                        Grid
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full border-[1.5px] border-gray-400"
                                    >
                                        <Wand2 className="size-4 mr-2" />
                                        Snap
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handleClearAll}
                                        className="w-full border-[1.5px] border-red-400 text-red-600 hover:bg-red-50"
                                    >
                                        <Trash2 className="size-4 mr-2" />
                                        Clear All
                                    </Button>
                                </div>
                            </TabsContent>

                            <TabsContent value="preview">
                                <p className="text-sm text-gray-600">
                                    Preview the final PDF form
                                </p>
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Center - Canvas */}
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

                    {/* Right Sidebar - Properties */}
                    <div className="w-80 bg-white border-l border-gray-200 p-4">
                        {selectedField ? (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        {(() => {
                                            const Icon = fieldTypeConfig[selectedField.type].icon;
                                            return <Icon className="size-5 text-gray-600" />;
                                        })()}
                                        <h3 className="text-[#2E2E2E]">Field Properties</h3>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={handleDeleteField}
                                        className="h-8 w-8 p-0 text-red-600 hover:bg-red-50"
                                    >
                                        <Trash2 className="size-4" />
                                    </Button>
                                </div>

                                <Separator />

                                <div className="space-y-4">
                                    <div>
                                        <Label className="text-sm mb-2 block">Field Type</Label>
                                        <div className={`px-3 py-2 rounded-lg border-[1.5px] ${fieldTypeConfig[selectedField.type].color}`}>
                                            <span className="text-sm capitalize">{selectedField.type}</span>
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="field-label" className="text-sm mb-2 block">
                                            Label
                                        </Label>
                                        <Input
                                            id="field-label"
                                            value={selectedField.label}
                                            onChange={(e) => {
                                                setSelectedField({ ...selectedField, label: e.target.value });
                                                setFields(
                                                    fields.map((f) =>
                                                        f.id === selectedField.id
                                                            ? { ...f, label: e.target.value }
                                                            : f
                                                    )
                                                );
                                            }}
                                            className="h-10 border-[1.5px] border-gray-400 bg-white focus:border-[#F36F23] focus:ring-1 focus:ring-[#F36F23] transition-colors"
                                        />
                                    </div>

                                    {selectedField.type === "text" && (
                                        <div>
                                            <Label htmlFor="field-placeholder" className="text-sm mb-2 block">
                                                Placeholder
                                            </Label>
                                            <Input
                                                id="field-placeholder"
                                                value={selectedField.placeholder || ""}
                                                onChange={(e) => {
                                                    setSelectedField({
                                                        ...selectedField,
                                                        placeholder: e.target.value,
                                                    });
                                                    setFields(
                                                        fields.map((f) =>
                                                            f.id === selectedField.id
                                                                ? { ...f, placeholder: e.target.value }
                                                                : f
                                                        )
                                                    );
                                                }}
                                                className="h-10 border-[1.5px] border-gray-400 bg-white focus:border-[#F36F23] focus:ring-1 focus:ring-[#F36F23] transition-colors"
                                            />
                                        </div>
                                    )}

                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <Label htmlFor="field-width" className="text-sm mb-2 block">
                                                Width
                                            </Label>
                                            <Input
                                                id="field-width"
                                                type="number"
                                                value={selectedField.width}
                                                onChange={(e) => {
                                                    const width = parseInt(e.target.value) || 0;
                                                    setSelectedField({ ...selectedField, width });
                                                    setFields(
                                                        fields.map((f) =>
                                                            f.id === selectedField.id ? { ...f, width } : f
                                                        )
                                                    );
                                                }}
                                                className="h-10 border-[1.5px] border-gray-400 bg-white focus:border-[#F36F23] focus:ring-1 focus:ring-[#F36F23] transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="field-height" className="text-sm mb-2 block">
                                                Height
                                            </Label>
                                            <Input
                                                id="field-height"
                                                type="number"
                                                value={selectedField.height}
                                                onChange={(e) => {
                                                    const height = parseInt(e.target.value) || 0;
                                                    setSelectedField({ ...selectedField, height });
                                                    setFields(
                                                        fields.map((f) =>
                                                            f.id === selectedField.id ? { ...f, height } : f
                                                        )
                                                    );
                                                }}
                                                className="h-10 border-[1.5px] border-gray-400 bg-white focus:border-[#F36F23] focus:ring-1 focus:ring-[#F36F23] transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <Label htmlFor="field-x" className="text-sm mb-2 block">
                                                Position X
                                            </Label>
                                            <Input
                                                id="field-x"
                                                type="number"
                                                value={Math.round(selectedField.x)}
                                                onChange={(e) => {
                                                    const x = parseInt(e.target.value) || 0;
                                                    setSelectedField({ ...selectedField, x });
                                                    setFields(
                                                        fields.map((f) =>
                                                            f.id === selectedField.id ? { ...f, x } : f
                                                        )
                                                    );
                                                }}
                                                className="h-10 border-[1.5px] border-gray-400 bg-white focus:border-[#F36F23] focus:ring-1 focus:ring-[#F36F23] transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="field-y" className="text-sm mb-2 block">
                                                Position Y
                                            </Label>
                                            <Input
                                                id="field-y"
                                                type="number"
                                                value={Math.round(selectedField.y)}
                                                onChange={(e) => {
                                                    const y = parseInt(e.target.value) || 0;
                                                    setSelectedField({ ...selectedField, y });
                                                    setFields(
                                                        fields.map((f) =>
                                                            f.id === selectedField.id ? { ...f, y } : f
                                                        )
                                                    );
                                                }}
                                                className="h-10 border-[1.5px] border-gray-400 bg-white focus:border-[#F36F23] focus:ring-1 focus:ring-[#F36F23] transition-colors"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-full text-center px-4">
                                <div>
                                    <Settings2 className="size-12 text-gray-400 mx-auto mb-3" />
                                    <h3 className="text-[#2E2E2E] mb-2">
                                        Select a field to edit its properties
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Click on any field in the canvas to view and modify its settings
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}