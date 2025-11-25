import { useState, useEffect } from 'react';
import { Upload, Eye, CheckCircle, X, Info, RotateCcw, ChevronDown, ChevronRight, FileText } from 'lucide-react';
import { Button } from "@/components/button";
import { PrimaryButton } from "@/components/primary-button";
import { Checkbox } from "@/components/checkbox";
import { Progress } from "@/components/progress";
import { Badge } from "@/components/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/dialog";
import { Label } from "@/components/label";
import { Input } from "@/components/input";
import { useThemeColors } from "@/hooks/useThemeColors";

type ItemStatus = 'not-started' | 'completed' | 'skipped';
type ItemType = 'Checklist' | 'Automatically' | 'Manually';

interface ChecklistItem {
  id: string;
  name: string;
  type: ItemType;
  label: string;
  required: boolean;
  status: ItemStatus;
  hasDocument: boolean;
  autoDetected?: boolean;
  movedToCompleted?: boolean;
  assignedTo?: string;
}

const initialItems: ChecklistItem[] = [
  // Listing items - Checklist type
  { id: '1', name: 'Listing Agreement', type: 'Checklist', label: 'LISTING', required: true, status: 'completed', hasDocument: true, assignedTo: 'Scott Nguyen' },
  { id: '2', name: 'Property Disclosure', type: 'Checklist', label: 'LISTING', required: true, status: 'completed', hasDocument: true, assignedTo: 'Scott Nguyen' },
  { id: '3', name: 'Lead-Based Paint Disclosure', type: 'Checklist', label: 'LISTING', required: true, status: 'not-started', hasDocument: false, autoDetected: true, assignedTo: 'Trust La' },
  { id: '4', name: 'HOA Documents', type: 'Checklist', label: 'LISTING', required: true, status: 'not-started', hasDocument: true, autoDetected: true, assignedTo: 'Trust La' },
  { id: '5', name: 'Professional Photos', type: 'Checklist', label: 'LISTING', required: false, status: 'completed', hasDocument: true, assignedTo: 'Scott Nguyen' },
  { id: '6', name: 'Home Warranty Info', type: 'Checklist', label: 'LISTING', required: false, status: 'not-started', hasDocument: false, assignedTo: 'Seller Sam' },
  
  // Offer items - Checklist type
  { id: '7', name: 'Purchase Agreement', type: 'Checklist', label: 'OFFER', required: true, status: 'completed', hasDocument: true, assignedTo: 'Scott Nguyen' },
  { id: '8', name: 'Pre-Approval Letter', type: 'Checklist', label: 'OFFER', required: true, status: 'completed', hasDocument: false, assignedTo: 'Trust La' },
  { id: '9', name: 'Earnest Money Receipt', type: 'Checklist', label: 'OFFER', required: true, status: 'completed', hasDocument: true, assignedTo: 'Scott Nguyen' },
  { id: '10', name: 'Proof of Funds', type: 'Checklist', label: 'OFFER', required: true, status: 'not-started', hasDocument: false, assignedTo: 'Trust La' },
  { id: '11', name: 'Buyer Financial Statement', type: 'Checklist', label: 'OFFER', required: false, status: 'not-started', hasDocument: true, assignedTo: 'Trust La' },
  
  // Escrow items - Checklist type
  { id: '12', name: 'Escrow Instructions', type: 'Checklist', label: 'ESCROW', required: true, status: 'completed', hasDocument: true, assignedTo: 'Scott Nguyen' },
  { id: '13', name: 'Title Report', type: 'Checklist', label: 'ESCROW', required: true, status: 'completed', hasDocument: true, assignedTo: 'Loan Factory' },
  { id: '14', name: 'Home Inspection Report', type: 'Checklist', label: 'ESCROW', required: true, status: 'not-started', hasDocument: false, assignedTo: 'Loan Factory' },
  { id: '15', name: 'Appraisal Report', type: 'Checklist', label: 'ESCROW', required: true, status: 'not-started', hasDocument: true, assignedTo: 'Loan Factory' },
  { id: '16', name: 'Termite Inspection', type: 'Checklist', label: 'ESCROW', required: true, status: 'not-started', hasDocument: false, autoDetected: true, assignedTo: 'Seller Sam' },
  { id: '17', name: 'Survey Report', type: 'Checklist', label: 'ESCROW', required: false, status: 'not-started', hasDocument: true, assignedTo: 'Seller Sam' },
  { id: '18', name: 'Homeowners Insurance', type: 'Checklist', label: 'ESCROW', required: false, status: 'completed', hasDocument: false, assignedTo: 'Trust La' },
  
  // Closing items - Checklist type
  { id: '19', name: 'Final Walk-Through Checklist', type: 'Checklist', label: 'CLOSING', required: true, status: 'completed', hasDocument: true, assignedTo: 'Scott Nguyen' },
  { id: '20', name: 'Closing Disclosure', type: 'Checklist', label: 'CLOSING', required: true, status: 'completed', hasDocument: false, assignedTo: 'Loan Factory' },
  { id: '21', name: 'Wire Transfer Confirmation', type: 'Checklist', label: 'CLOSING', required: true, status: 'completed', hasDocument: true, assignedTo: 'Trust La' },
  { id: '22', name: 'Keys and Garage Openers', type: 'Checklist', label: 'CLOSING', required: true, status: 'not-started', hasDocument: false, assignedTo: 'Seller Sam' },
  { id: '23', name: 'HOA Transfer Documents', type: 'Checklist', label: 'CLOSING', required: true, status: 'not-started', hasDocument: true, autoDetected: true, assignedTo: 'Seller Sam' },
  { id: '24', name: 'Warranty Deeds', type: 'Checklist', label: 'CLOSING', required: false, status: 'completed', hasDocument: true, assignedTo: 'Loan Factory' },
  { id: '25', name: 'Bill of Sale', type: 'Checklist', label: 'CLOSING', required: false, status: 'skipped', hasDocument: false, assignedTo: 'Seller Sam' },
];

export function TransactionChecklist() {
  const { primaryColor } = useThemeColors();
  const [items, setItems] = useState<ChecklistItem[]>(initialItems);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'LISTING': true,
    'OFFER': true,
    'ESCROW': true,
    'CLOSING': true,
  });
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const toggleSection = (label: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  const toggleItemStatus = (itemId: string) => {
    setItems(prevItems => {
      const itemIndex = prevItems.findIndex(item => item.id === itemId);
      if (itemIndex === -1) return prevItems;
      
      const item = prevItems[itemIndex];
      
      // Skip skipped items - they can't be toggled
      if (item.status === 'skipped') {
        return prevItems;
      }
      
      // Toggle between completed and not-started
      const newStatus: ItemStatus = item.status === 'completed' ? 'not-started' : 'completed';
      
      // Create new array with updated item
      const updatedItems = [...prevItems];
      updatedItems[itemIndex] = { ...item, status: newStatus };
      
      // If marking as completed, move to end of the same label group
      if (newStatus === 'completed') {
        const sameLabel = updatedItems.filter(i => i.label === item.label);
        const otherLabels = updatedItems.filter(i => i.label !== item.label);
        const sameNotCompleted = sameLabel.filter(i => i.id !== itemId && i.status === 'not-started');
        const completedItem = { ...item, status: newStatus };
        const sameCompleted = sameLabel.filter(i => i.id !== itemId && (i.status === 'completed' || i.status === 'skipped'));
        
        // Reconstruct items with completed item at end of its section
        return [
          ...otherLabels.filter(i => i.label < item.label),
          ...sameNotCompleted,
          ...sameCompleted,
          completedItem,
          ...otherLabels.filter(i => i.label > item.label),
        ];
      }
      
      return updatedItems;
    });
  };

  const skipItem = (itemId: string) => {
    setItems(prevItems => 
      prevItems.map(item => {
        if (item.id === itemId) {
          return { ...item, status: 'skipped' };
        }
        return item;
      })
    );
  };

  const handleUpload = () => {
    if (selectedFiles && selectedFiles.length > 0 && selectedDocument) {
      console.log('Uploading files for document:', selectedDocument);
      console.log('Files:', selectedFiles);
      // Here you would typically handle the file upload
      setShowUploadDialog(false);
      setSelectedFiles(null);
      setSelectedDocument('');
    }
  };

  // Group items by label (only LISTING, OFFER, ESCROW, CLOSING)
  const groupByLabel = () => {
    const grouped: Record<string, ChecklistItem[]> = {
      'LISTING': [],
      'OFFER': [],
      'ESCROW': [],
      'CLOSING': []
    };
    
    items.forEach(item => {
      if (grouped[item.label]) {
        grouped[item.label].push(item);
      }
    });
    
    return grouped;
  };

  const groupedItems = groupByLabel();

  const getLabelDisplayName = (label: string) => {
    switch (label) {
      case 'LISTING':
        return 'Listing';
      case 'OFFER':
        return 'Offer';
      case 'ESCROW':
        return 'Escrow';
      case 'CLOSING':
        return 'Closing';
      default:
        return label;
    }
  };

  const renderItemRow = (item: ChecklistItem) => (
    <tr 
      key={item.id}
      className="hover:bg-gray-50 transition-colors"
    >
      <td className="px-4 py-4">
        {item.status === 'skipped' ? (
          <X className="h-5 w-5 text-gray-400" />
        ) : (
          <Checkbox 
            checked={item.status === 'completed'}
            onCheckedChange={() => toggleItemStatus(item.id)}
          />
        )}
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-sm ${
            item.status === 'completed' ? 'text-gray-500' : 
            item.status === 'skipped' ? 'text-gray-500' : ''
          }`}>
            {item.name}
          </span>
          {item.status === 'skipped' && (
            <Badge variant="secondary" className="bg-gray-100 text-gray-600">
              Skipped
            </Badge>
          )}
        </div>
      </td>
      <td className="px-4 py-4">
        <span className="text-sm text-gray-600">{item.type}</span>
      </td>
      <td className="px-4 py-4">
        <div className="flex gap-2">
          <Button size="sm" className="bg-[#C7CEEA] hover:bg-[#B0BAD9] text-gray-800 gap-2">
            <Upload className="h-4 w-4" />
            Upload
          </Button>
          <Button size="sm" className="bg-[#B5EAD7] hover:bg-[#9DD4C3] text-gray-800 gap-2">
            <Eye className="h-4 w-4" />
            View
          </Button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-[1200px] mx-auto space-y-6">
        {/* Upload Dialog */}
        <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Upload Document</DialogTitle>
              <DialogDescription>
                Select a document type and upload files from your computer.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="document-select">Select Document Type</Label>
                <Select value={selectedDocument} onValueChange={setSelectedDocument}>
                  <SelectTrigger id="document-select" className="mt-2">
                    <SelectValue placeholder="Choose a document from the checklist" />
                  </SelectTrigger>
                  <SelectContent>
                    {items.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name} ({getLabelDisplayName(item.label)})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="file-upload">Select Files</Label>
                <div className="mt-2 border-2 border-dashed rounded-lg p-8 text-center hover:border-orange-400 transition-colors cursor-pointer">
                  <Input
                    id="file-upload"
                    type="file"
                    multiple
                    onChange={(e) => setSelectedFiles(e.target.files)}
                    className="hidden"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600 mb-1">
                      {selectedFiles && selectedFiles.length > 0
                        ? `${selectedFiles.length} file(s) selected`
                        : 'Click to browse or drag and drop files here'}
                    </p>
                    <p className="text-xs text-gray-400">
                      PDF, DOC, DOCX, JPG, PNG up to 10MB
                    </p>
                  </label>
                </div>
                {selectedFiles && selectedFiles.length > 0 && (
                  <div className="mt-3 space-y-1">
                    {Array.from(selectedFiles).map((file, index) => (
                      <div key={index} className="text-sm text-gray-600 flex items-center gap-2">
                        <FileText className="h-4 w-4 text-orange-600" />
                        {file.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setShowUploadDialog(false);
                setSelectedFiles(null);
                setSelectedDocument('');
              }}>
                Cancel
              </Button>
              <Button 
                className="bg-orange-600 hover:bg-orange-700 text-white"
                onClick={handleUpload}
                disabled={!selectedFiles || selectedFiles.length === 0 || !selectedDocument}
              >
                Upload
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 space-y-4">
            {/* Header with Upload Button */}
            <div className="flex justify-end mb-4">
              <PrimaryButton 
                onClick={() => setShowUploadDialog(true)}
                className="gap-2"
              >
                <Upload className="h-4 w-4" />
                Upload Document
              </PrimaryButton>
            </div>

            {/* Sections - Grouped by Label */}
            {Object.entries(groupedItems).map(([label, sectionItems]) => {
              if (sectionItems.length === 0) return null;
              
              const currentItems = sectionItems.filter(item => item.status === 'not-started');
              const completedItems = sectionItems.filter(item => item.status === 'completed' || item.status === 'skipped');
              
              return (
                <div key={label} className="mb-6">
                  <button
                    onClick={() => toggleSection(label)}
                    className="w-full flex items-center gap-2 mb-3 px-1 hover:text-gray-700"
                  >
                    {expandedSections[label] ? (
                      <ChevronDown className="h-5 w-5" />
                    ) : (
                      <ChevronRight className="h-5 w-5" />
                    )}
                    <h3 className="text-lg">{getLabelDisplayName(label)}</h3>
                    <span className="text-sm text-gray-600">({sectionItems.length})</span>
                  </button>
                  
                  {expandedSections[label] && (
                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider w-12">Status</th>
                            <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider w-32">Type</th>
                            <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider w-64">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {currentItems.map((item) => renderItemRow(item))}
                          {completedItems.map((item) => renderItemRow(item))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
