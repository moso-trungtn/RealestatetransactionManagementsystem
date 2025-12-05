import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Separator} from "@/components/ui/separator";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Button} from "@/components/ui/button";
import {Grid3x3, Trash2, Wand2} from "lucide-react";
import {FieldType} from "@/features/pdf-form-builder";

type LeftSideProps = {
    documentName:string;
    setDocumentName: (name: string) => void;
    activeTab: string;
    setActiveTab: (name: string) => void;
    fieldTypeConfig: Object;
    selectedFieldType: string | null;
    setSelectedFieldType: (type: FieldType | null) => void;
    handleClearAll: () => void;
}

export const LeftSide: React.FC<LeftSideProps> = ({fieldTypeConfig,selectedFieldType,setSelectedFieldType,handleClearAll,setDocumentName,documentName,setActiveTab,activeTab}) => {
    return (<div className="w-64 bg-white border-r border-gray-200 p-4">
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
    </div>)
}