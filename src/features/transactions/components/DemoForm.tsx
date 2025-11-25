import { useState } from 'react';
import { Button } from "@/components/button";
import { Badge } from "@/components/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/card";
import { Separator } from "@/components/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/dialog";
import { Label } from "@/components/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/table";
import { Checkbox } from "@/components/checkbox";
import { ArrowLeft, Bell, DollarSign, ArrowUpDown } from 'lucide-react';
import { Avatar, AvatarFallback } from "@/components/avatar";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { toast } from 'sonner';
import { Toaster } from "@/components/sonner";
import { useWebsiteConfig } from "@/providers/WebsiteConfigContext";

// Reusable Form Components
import { FormInput } from './FormInput';
import { FormTextarea } from './FormTextarea';
import { FormSelect } from './FormSelect';
import { FormCheckbox } from './FormCheckbox';
import { FormCheckboxGroup } from './FormCheckboxGroup';
import { FormRadioGroup } from './FormRadioGroup';
import { FormSwitch } from './FormSwitch';
import { FormDatePicker } from './FormDatePicker';
import { FormSlider } from './FormSlider';
import { FormFileUpload } from './FormFileUpload';
import { DynamicFieldList, DynamicField } from './DynamicFieldList';
import { FormAccordion } from './FormAccordion';
import { EditableTable } from './EditableTable';
import {format} from "date-fns";

interface DemoFormProps {
  onBack: () => void;
}

export function DemoForm({ onBack }: DemoFormProps) {
  const { config } = useWebsiteConfig();
  
  // State for various form inputs
  const [textInput, setTextInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [numberInput, setNumberInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [textareaInput, setTextareaInput] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [multiCheckbox, setMultiCheckbox] = useState<string[]>([]);
  const [radioValue, setRadioValue] = useState('');
  const [switchValue, setSwitchValue] = useState(false);
  const [sliderValue, setSliderValue] = useState([50]);
  const [date, setDate] = useState<Date>();
  const [showPopup, setShowPopup] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [dynamicFields, setDynamicFields] = useState([{ id: '1', value: '' }]);
  
  // Table states
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [editableTableRows, setEditableTableRows] = useState([
    { id: '1', name: 'User 1', role: 'Broker', percentage: 10, amount: 5000 },
    { id: '2', name: 'User 2', role: 'Buyer Agent', percentage: 15, amount: 7500 },
    { id: 'blank', name: '', role: '', percentage: 0, amount: 0 }
  ]);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleCheckboxGroup = (value: string) => {
    setMultiCheckbox(prev =>
      prev.includes(value)
        ? prev.filter(v => v !== value)
        : [...prev, value]
    );
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles(Array.from(e.target.files));
      toast.success(`${e.target.files.length} file(s) uploaded successfully!`);
    }
  };

  const addDynamicField = () => {
    setDynamicFields([...dynamicFields, { id: Date.now().toString(), value: '' }]);
  };

  const removeDynamicField = (id: string) => {
    setDynamicFields(dynamicFields.filter(field => field.id !== id));
  };

  const updateDynamicField = (id: string, value: string) => {
    setDynamicFields(dynamicFields.map(field =>
      field.id === id ? { ...field, value } : field
    ));
  };

  // Table helper functions
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const parseCurrency = (value: string): number => {
    const cleaned = value.replace(/[$,\s]/g, '');
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  };

  const toggleRowSelection = (id: string) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const toggleAllRows = () => {
    const staticData = [
      { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
      { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' }
    ];
    if (selectedRows.length === staticData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(staticData.map(row => row.id));
    }
  };

  const updateEditableTableRow = (id: string, field: string, value: any) => {
    setEditableTableRows(prevRows => {
      const updatedRows = prevRows.map(row => {
        if (row.id === id) {
          const updated = { ...row, [field]: value };
          
          // Two-way binding for percentage and amount
          if (field === 'percentage') {
            updated.amount = (50000 * value) / 100; // assuming $50,000 total
          } else if (field === 'amount') {
            updated.percentage = 50000 > 0 ? (value / 50000) * 100 : 0;
          }
          
          return updated;
        }
        return row;
      });
      
      // Auto-add blank row
      const updatedRow = updatedRows.find(r => r.id === id);
      const isBlankRow = id === 'blank' || id.startsWith('blank-');
      const hasContent = updatedRow && (updatedRow.name || updatedRow.role);
      
      if (isBlankRow && hasContent) {
        const lastRow = updatedRows[updatedRows.length - 1];
        const isLastRowBlank = lastRow && !lastRow.name && !lastRow.role;
        
        if (!isLastRowBlank) {
          return [
            ...updatedRows,
            { id: `blank-${Date.now()}`, name: '', role: '', percentage: 0, amount: 0 }
          ];
        }
      }
      
      return updatedRows;
    });
  };

  const removeEditableTableRow = (id: string) => {
    setEditableTableRows(prevRows => {
      const filtered = prevRows.filter(r => r.id !== id);
      
      const hasBlankRow = filtered.some(r => !r.name && !r.role);
      if (!hasBlankRow) {
        return [
          ...filtered,
          { id: `blank-${Date.now()}`, name: '', role: '', percentage: 0, amount: 0 }
        ];
      }
      
      return filtered;
    });
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Form submitted successfully!');
    console.log('Form data:', {
      textInput,
      emailInput,
      numberInput,
      passwordInput,
      textareaInput,
      selectValue,
      checkboxValue,
      multiCheckbox,
      radioValue,
      switchValue,
      sliderValue,
      date,
      uploadedFiles,
      dynamicFields
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Toaster />
      
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <ImageWithFallback 
                src={config.companyLogo}
                alt="Logo"
                className="h-10 w-auto object-contain"
              />
            </div>
            
            <nav className="flex gap-6">
              <button className="px-4 py-2 bg-gray-100 rounded">Demo Form</button>
              <button className="text-gray-600 hover:text-gray-900">Transactions</button>
              <button className="text-gray-600 hover:text-gray-900">Website Settings</button>
              <button className="text-gray-600 hover:text-gray-900">Templates</button>
            </nav>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5 text-gray-600" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="rounded-full"
            >
              <Avatar>
                <AvatarFallback className="bg-yellow-400 text-white">
                  A
                </AvatarFallback>
              </Avatar>
            </Button>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onBack}
              className="hover:bg-gray-100"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl">Demo Form</h1>
              <p className="text-gray-500 mt-1">Comprehensive form components showcase</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Tabs Section */}
          <Card>
            <CardHeader>
              <CardTitle>Tabbed Content</CardTitle>
              <CardDescription>Multiple sections organized with tabs</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="basic">Basic Inputs</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                  <TabsTrigger value="selection">Selection</TabsTrigger>
                  <TabsTrigger value="upload">Upload & Dynamic</TabsTrigger>
                  <TabsTrigger value="tables">Tables</TabsTrigger>
                </TabsList>

                {/* Tab 1: Basic Inputs */}
                <TabsContent value="basic" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormInput
                      id="text-input"
                      label="Text Input"
                      type="text"
                      value={textInput}
                      onChange={setTextInput}
                      placeholder="Enter text here"
                    />

                    <FormInput
                      id="email-input"
                      label="Email Input"
                      type="email"
                      value={emailInput}
                      onChange={setEmailInput}
                      placeholder="email@example.com"
                    />

                    <FormInput
                      id="number-input"
                      label="Number Input"
                      type="number"
                      value={numberInput}
                      onChange={setNumberInput}
                      placeholder="Enter number"
                    />

                    <FormInput
                      id="password-input"
                      label="Password Input"
                      type="password"
                      value={passwordInput}
                      onChange={setPasswordInput}
                      placeholder="Enter password"
                    />
                  </div>

                  <FormTextarea
                    id="textarea-input"
                    label="Textarea"
                    value={textareaInput}
                    onChange={setTextareaInput}
                    placeholder="Enter long text here..."
                    rows={4}
                  />
                </TabsContent>

                {/* Tab 2: Advanced Inputs */}
                <TabsContent value="advanced" className="space-y-4 mt-4">
                  <div className="space-y-4">
                    <FormDatePicker
                      id="date-picker"
                      label="Date Picker"
                      value={date}
                      onChange={setDate}
                      placeholder="Pick a date"
                    />

                    <Separator />

                    <FormSlider
                      id="slider-input"
                      label="Slider"
                      value={sliderValue}
                      onChange={setSliderValue}
                      max={100}
                      step={1}
                      showValue={true}
                    />

                    <Separator />

                    <FormSwitch
                      id="switch-input"
                      label="Toggle Switch"
                      checked={switchValue}
                      onChange={setSwitchValue}
                      description="Enable or disable this feature"
                    />

                    <Separator />

                    <div className="space-y-3">
                      <FormAccordion
                        sections={[
                          {
                            id: 'item-1',
                            title: 'Section 1',
                            content: 'This is the content of section 1. You can put any content here.'
                          },
                          {
                            id: 'item-2',
                            title: 'Section 2',
                            content: 'This is the content of section 2. Accordions are great for organizing information.'
                          },
                          {
                            id: 'item-3',
                            title: 'Section 3',
                            content: 'This is the content of section 3. You can have as many sections as you need.'
                          }
                        ]}
                        type="single"
                      />
                    </div>
                  </div>
                </TabsContent>

                {/* Tab 3: Selection Inputs */}
                <TabsContent value="selection" className="space-y-4 mt-4">
                  <div className="space-y-4">
                    <FormSelect
                      id="select-dropdown"
                      label="Select Dropdown"
                      value={selectValue}
                      onChange={setSelectValue}
                      options={[
                        { value: 'option1', label: 'Option 1' },
                        { value: 'option2', label: 'Option 2' },
                        { value: 'option3', label: 'Option 3' },
                        { value: 'option4', label: 'Option 4' }
                      ]}
                      placeholder="Select an option"
                    />

                    <Separator />

                    <FormCheckbox
                      id="single-checkbox"
                      label="Single Checkbox"
                      checked={checkboxValue}
                      onChange={setCheckboxValue}
                    />

                    <Separator />

                    <FormCheckboxGroup
                      label="Multiple Checkboxes"
                      options={[
                        { id: 'Checkbox 1', label: 'Checkbox 1' },
                        { id: 'Checkbox 2', label: 'Checkbox 2' },
                        { id: 'Checkbox 3', label: 'Checkbox 3' },
                        { id: 'Checkbox 4', label: 'Checkbox 4' }
                      ]}
                      selectedValues={multiCheckbox}
                      onChange={setMultiCheckbox}
                      showBadges={true}
                    />

                    <Separator />

                    <FormRadioGroup
                      label="Radio Group"
                      options={[
                        { value: 'radio1', label: 'Radio Option 1' },
                        { value: 'radio2', label: 'Radio Option 2' },
                        { value: 'radio3', label: 'Radio Option 3' }
                      ]}
                      value={radioValue}
                      onChange={setRadioValue}
                    />
                  </div>
                </TabsContent>

                {/* Tab 4: Upload & Dynamic Fields */}
                <TabsContent value="upload" className="space-y-4 mt-4">
                  <div className="space-y-4">
                    <FormFileUpload
                      id="file-upload"
                      label="File Upload"
                      files={uploadedFiles}
                      onChange={setUploadedFiles}
                      accept=".pdf,.png,.jpg"
                      multiple={true}
                    />

                    <Separator />

                    <DynamicFieldList
                      label="Dynamic Fields"
                      fields={dynamicFields}
                      onAdd={addDynamicField}
                      onRemove={removeDynamicField}
                      onUpdate={updateDynamicField}
                      placeholder="Enter value"
                      addButtonText="Add Field"
                      minFields={1}
                    />

                    <Separator />

                    <div className="space-y-2">
                      <p className="text-sm">Dialog/Popup Example</p>
                      <Dialog open={showPopup} onOpenChange={setShowPopup}>
                        <DialogTrigger asChild>
                          <Button type="button" variant="outline" className="w-full">
                            Open Popup Dialog
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Popup Dialog</DialogTitle>
                            <DialogDescription>
                              This is a modal popup dialog. You can put any content here.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="py-4">
                            <p className="text-sm text-gray-600">
                              Dialogs are great for confirmations, forms, or displaying important information
                              that requires user attention.
                            </p>
                          </div>
                          <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setShowPopup(false)}>
                              Cancel
                            </Button>
                            <Button type="button" onClick={() => {
                              toast.success('Popup action completed!');
                              setShowPopup(false);
                            }}>
                              Confirm
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </TabsContent>

                {/* Tab 5: Tables */}
                <TabsContent value="tables" className="space-y-6 mt-4">
                  
                  {/* Basic Static Table */}
                  <div className="space-y-3">
                    <div>
                      <Label className="text-base">Basic Static Table</Label>
                      <p className="text-sm text-gray-500">Read-only table with styled data</p>
                    </div>
                    <div className="border rounded-lg overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>John Doe</TableCell>
                            <TableCell>john@example.com</TableCell>
                            <TableCell>Admin</TableCell>
                            <TableCell><Badge className="bg-green-100 text-green-700 hover:bg-green-100">Active</Badge></TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Jane Smith</TableCell>
                            <TableCell>jane@example.com</TableCell>
                            <TableCell>User</TableCell>
                            <TableCell><Badge className="bg-green-100 text-green-700 hover:bg-green-100">Active</Badge></TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Bob Johnson</TableCell>
                            <TableCell>bob@example.com</TableCell>
                            <TableCell>User</TableCell>
                            <TableCell><Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">Inactive</Badge></TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>

                  <Separator />

                  {/* Table with Selection */}
                  <div className="space-y-3">
                    <div>
                      <Label className="text-base">Table with Row Selection</Label>
                      <p className="text-sm text-gray-500">Select multiple rows with checkboxes</p>
                    </div>
                    <div className="border rounded-lg overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-12">
                              <Checkbox
                                checked={selectedRows.length === 3}
                                onCheckedChange={toggleAllRows}
                              />
                            </TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {[
                            { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
                            { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
                            { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' }
                          ].map((row) => (
                            <TableRow key={row.id}>
                              <TableCell>
                                <Checkbox
                                  checked={selectedRows.includes(row.id)}
                                  onCheckedChange={() => toggleRowSelection(row.id)}
                                />
                              </TableCell>
                              <TableCell>{row.name}</TableCell>
                              <TableCell>{row.email}</TableCell>
                              <TableCell>{row.role}</TableCell>
                              <TableCell>
                                <Badge className={row.status === 'Active' ? 'bg-green-100 text-green-700 hover:bg-green-100' : 'bg-gray-100 text-gray-700 hover:bg-gray-100'}>
                                  {row.status}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    {selectedRows.length > 0 && (
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{selectedRows.length} row(s) selected</Badge>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedRows([]);
                            toast.success('Selection cleared');
                          }}
                        >
                          Clear Selection
                        </Button>
                      </div>
                    )}
                  </div>

                  <Separator />

                  {/* Sortable Table */}
                  <div className="space-y-3">
                    <div>
                      <Label className="text-base">Sortable Table</Label>
                      <p className="text-sm text-gray-500">Click column headers to sort</p>
                    </div>
                    <div className="border rounded-lg overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2"
                                onClick={() => handleSort('name')}
                              >
                                Name
                                <ArrowUpDown className="ml-2 h-4 w-4" />
                              </Button>
                            </TableHead>
                            <TableHead>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2"
                                onClick={() => handleSort('price')}
                              >
                                Price
                                <ArrowUpDown className="ml-2 h-4 w-4" />
                              </Button>
                            </TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Stock</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>Product A</TableCell>
                            <TableCell>$199.99</TableCell>
                            <TableCell>Electronics</TableCell>
                            <TableCell>25</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Product B</TableCell>
                            <TableCell>$49.99</TableCell>
                            <TableCell>Accessories</TableCell>
                            <TableCell>150</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Product C</TableCell>
                            <TableCell>$299.99</TableCell>
                            <TableCell>Electronics</TableCell>
                            <TableCell>8</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                    {sortColumn && (
                      <p className="text-sm text-gray-500">
                        Sorted by: <span className="font-medium">{sortColumn}</span> ({sortDirection})
                      </p>
                    )}
                  </div>

                  <Separator />

                  {/* Editable Table (Commission Split Style) */}
                  <div className="space-y-3">
                    <div>
                      <Label className="text-base">Editable Table with Calculations</Label>
                      <p className="text-sm text-gray-500">Commission split style with dynamic rows and two-way binding</p>
                    </div>
                    
                    {/* Total and Summary */}
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-sm text-gray-600">Total Commission</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <DollarSign className="h-5 w-5 text-orange-600" />
                            <span className="text-xl">$50,000.00</span>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <Label className="text-sm text-gray-600">Total Percentage</Label>
                          <p className="text-xl mt-1 text-orange-600">
                            {editableTableRows
                              .filter(r => r.name || r.role)
                              .reduce((sum, r) => sum + r.percentage, 0)
                              .toFixed(1)}%
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Editable Table */}
                    <EditableTable
                      columns={[
                        {
                          key: 'name',
                          label: 'Name',
                          width: '1fr',
                          type: 'text',
                          placeholder: 'Enter name'
                        },
                        {
                          key: 'role',
                          label: 'Role',
                          width: '1fr',
                          type: 'text',
                          placeholder: 'Enter role'
                        },
                        {
                          key: 'percentage',
                          label: 'Percentage (%)',
                          width: '120px',
                          type: 'number',
                          placeholder: '0',
                          min: 0,
                          max: 100,
                          step: 0.1,
                          disabled: (row) => !row.name && !row.role
                        },
                        {
                          key: 'amount',
                          label: 'Amount',
                          width: '150px',
                          type: 'currency',
                          placeholder: '$0.00',
                          disabled: (row) => !row.name && !row.role
                        }
                      ]}
                      rows={editableTableRows}
                      onUpdateRow={updateEditableTableRow}
                      onDeleteRow={removeEditableTableRow}
                      isBlankRow={(row) => !row.name && !row.role}
                      formatCurrency={formatCurrency}
                      parseCurrency={parseCurrency}
                      showDeleteButton={true}
                    />

                    {/* Summary */}
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Allocated:</span>
                        <span>
                          {formatCurrency(
                            editableTableRows
                              .filter(r => r.name || r.role)
                              .reduce((sum, r) => sum + r.amount, 0)
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Percentage:</span>
                        <span>
                          {editableTableRows
                            .filter(r => r.name || r.role)
                            .reduce((sum, r) => sum + r.percentage, 0)
                            .toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>

                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Form Summary */}
          <Card className="bg-gray-50">
            <CardHeader>
              <CardTitle>Form Summary</CardTitle>
              <CardDescription>Current values of all form inputs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div><span className="text-gray-500">Text:</span> {textInput || '-'}</div>
                <div><span className="text-gray-500">Email:</span> {emailInput || '-'}</div>
                <div><span className="text-gray-500">Number:</span> {numberInput || '-'}</div>
                <div><span className="text-gray-500">Select:</span> {selectValue || '-'}</div>
                <div><span className="text-gray-500">Single Checkbox:</span> {checkboxValue ? 'Yes' : 'No'}</div>
                <div><span className="text-gray-500">Radio:</span> {radioValue || '-'}</div>
                <div><span className="text-gray-500">Switch:</span> {switchValue ? 'On' : 'Off'}</div>
                <div><span className="text-gray-500">Slider:</span> {sliderValue}</div>
                <div><span className="text-gray-500">Date:</span> {date ? format(date, 'PP') : '-'}</div>
                <div><span className="text-gray-500">Files:</span> {uploadedFiles.length} file(s)</div>
              </div>
              {multiCheckbox.length > 0 && (
                <div>
                  <span className="text-gray-500">Multi Checkbox:</span> {multiCheckbox.join(', ')}
                </div>
              )}
              {textareaInput && (
                <div>
                  <span className="text-gray-500">Textarea:</span> {textareaInput}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2 pb-8">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setTextInput('');
                setEmailInput('');
                setNumberInput('');
                setPasswordInput('');
                setTextareaInput('');
                setSelectValue('');
                setCheckboxValue(false);
                setMultiCheckbox([]);
                setRadioValue('');
                setSwitchValue(false);
                setSliderValue([50]);
                setDate(undefined);
                setUploadedFiles([]);
                setDynamicFields([{ id: '1', value: '' }]);
                toast.success('Form cleared!');
              }}
            >
              Clear All
            </Button>
            <Button
              type="submit"
              className="bg-orange-600 hover:bg-orange-700 text-white"
            >
              Submit Form
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
