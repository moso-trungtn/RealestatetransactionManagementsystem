import React, {FC} from 'react'
import {FormField} from "@/features/pdf-form-builder";
import {Button} from "@/components/ui/button"
import {Settings2, Trash2} from "lucide-react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Separator} from "@/components/ui/separator";
type RightSideProps = {
    selectedFieldType: string | null;
    fields: FormField[];
    fieldTypeConfig: any;
    selectedField: FormField | null;
    handleDeleteField?: () => void;
    setSelectedField: (fieldType: FormField) => void;
    setFields: (fields: FormField[]) => void;
}

export const RightSide:FC<RightSideProps> = ({selectedFieldType,fieldTypeConfig,fields,selectedField,setFields,setSelectedField,handleDeleteField}) => {
    return (
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
    )
}
