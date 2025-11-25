import { useState } from 'react';
import { Button } from "@/components/button";
import { PrimaryButton } from "@/components/primary-button";
import { Input } from "@/components/input";
import { Badge } from "@/components/badge";
import { Checkbox } from "@/components/checkbox";
import { Avatar, AvatarFallback } from "@/components/avatar";
import { ChevronLeft, Search, Mail, FolderPlus, FilePlus, MoreHorizontal, FileText, ChevronDown, ChevronRight, DollarSign, Plus, GripVertical, Calendar, List, CalendarIcon, X, Filter, Edit, Trash, Home, Trash2, Upload, ChevronUp, Users, Clock, Info } from 'lucide-react';
import { Transaction } from '@/types/transaction';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import { CommissionSplit } from './CommissionSplit';
import { NewTransaction } from './NewTransaction';
import { ToDoTabContent } from './ToDoTabContent';
import { Label } from "@/components/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/select";
import { Textarea } from "@/components/textarea";
import { useThemeColors } from "@/hooks/useThemeColors";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { Navbar } from "@/shared/components/Navbar";
import { Footer } from "@/shared/components/Footer";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/dialog";

interface TransactionDetailProps {
  transaction: Transaction;
  onBack: () => void;
}

interface Document {
  id: string;
  name: string;
  type: string;
  status?: string;
  modifiedDate: string;
}

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  dueDate?: string;
}

interface TodoList {
  id: string;
  name: string;
  items: TodoItem[];
}

interface TimelineEvent {
  id: string;
  title: string;
  date: string;
}

interface TimelineDay {
  date: string;
  label: string;
  events: TimelineEvent[];
}

interface HistoryEntry {
  id: string;
  action: string;
  changedBy: string;
  date: string;
  personId?: string;
  details?: {
    offerDate?: {
      old: string;
      new: string;
    };
  };
}

const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'Buyer Representation and Broker Compensation Agreement - 8/25',
    type: 'pdf',
    modifiedDate: 'Oct 23, 2025'
  },
  {
    id: '2',
    name: 'Seller Counter Offer #1 - 1/024',
    type: 'pdf',
    modifiedDate: 'Oct 23, 2025'
  },
  {
    id: '3',
    name: 'California Residential Purchase Agreement - 6/25',
    type: 'pdf',
    modifiedDate: 'Oct 23, 2025'
  },
  {
    id: '4',
    name: 'Buyer Counter Offer #1 - 1/024',
    type: 'pdf',
    modifiedDate: 'Oct 23, 2025'
  }
];

export function TransactionDetail({ transaction, onBack }: TransactionDetailProps) {
  const { primaryColor, getPrimaryHoverStyle, getLightPrimaryBg, getPrimaryTextClass } = useThemeColors();
  const [notFiledExpanded, setNotFiledExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [todoSearchQuery, setTodoSearchQuery] = useState('');
  const [showAddList, setShowAddList] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [addingTaskToList, setAddingTaskToList] = useState<string | null>(null);
  const [newTaskText, setNewTaskText] = useState('');
  const [timelineSearchQuery, setTimelineSearchQuery] = useState('');
  const [historySearchQuery, setHistorySearchQuery] = useState('');
  const [selectedHistoryEntry, setSelectedHistoryEntry] = useState<HistoryEntry | null>(null);
  const [timelineViewMode, setTimelineViewMode] = useState<'list' | 'calendar'>('list');
  const [showEditTransaction, setShowEditTransaction] = useState(false);
  const [activeTab, setActiveTab] = useState<'detail' | 'documents' | 'people' | 'history' | 'commission'>('detail');
  const [sidebarTab, setSidebarTab] = useState<'type' | 'client-info' | 'property-info' | 'transactions' | 'offer' | 'parties' | 'documents' | null>('documents');
  const [partySearchQuery, setPartySearchQuery] = useState('');
  const [showNewFolderDialog, setShowNewFolderDialog] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [customFolders, setCustomFolders] = useState<Array<{ id: string; name: string; expanded: boolean }>>([]);
  const [showAddDocumentsDialog, setShowAddDocumentsDialog] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState('not-filed');
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    const [selectedType, setSelectedType] = useState<string>(transaction.type || '');
    const [selectedStatus, setSelectedStatus] = useState<string | undefined>(transaction.status);
  
  // Additional people state
  const [agents, setAgents] = useState([
    {
      id: '1',
      firstName: 'Christine',
      lastName: 'Babikian',
      email: 'christine.babikian@realty.com',
      phone: '(555) 234-5678',
      role: 'Listing Agent'
    },
    {
      id: '2',
      firstName: 'Michael',
      lastName: 'Rodriguez',
      email: 'michael.rodriguez@realty.com',
      phone: '(555) 234-5679',
      role: 'Buyer Agent'
    }
  ]);

  const [lenders, setLenders] = useState([
    {
      id: '1',
      name: 'First National Bank',
      contactPerson: 'Robert Thompson',
      email: 'robert.thompson@fnb.com',
      phone: '(555) 345-6789',
      role: 'Loan Officer'
    }
  ]);

  const [otherParties, setOtherParties] = useState([
    {
      id: '1',
      firstName: 'Jennifer',
      lastName: 'Martinez',
      email: 'jennifer.martinez@titleco.com',
      phone: '(555) 456-7890',
      role: 'Title Officer'
    },
    {
      id: '2',
      firstName: 'David',
      lastName: 'Chen',
      email: 'david.chen@inspection.com',
      phone: '(555) 567-8901',
      role: 'Home Inspector'
    }
  ]);
  
  // Buyers state
  const [buyers, setBuyers] = useState([
    {
      id: '1',
      firstName: 'John',
      middleName: 'Michael',
      lastName: 'Anderson',
      email: 'john.anderson@email.com',
      phone: '(555) 123-4567',
      relationship: 'Primary Buyer'
    },
    {
      id: '2',
      firstName: 'Sarah',
      middleName: 'Elizabeth',
      lastName: 'Anderson',
      email: 'sarah.anderson@email.com',
      phone: '(555) 123-4568',
      relationship: 'Co-Buyer'
    }
  ]);
  
  // Form data state
  const [formData, setFormData] = useState({
    transactionType: transaction.type || '',
    fullName: transaction.clientName || '',
    middleName: '',
    email: '',
    phone: '',
    relationship: '',
    streetAddress: transaction.address || '',
    unit: '',
    zipCode: transaction.zipCode || '',
    city: transaction.city || '',
    state: transaction.state || '',
    county: '',
    propertyValue: transaction.price?.toString() || '',
    salePrice: transaction.price?.toString() || '',
    lastAgreed: '',
    purchasePrice: transaction.price?.toString() || '',
    approvedDate: '',
    appraisalOrdered: false,
    escrowNumber: transaction.mlsNumber || '',
    lenderName: 'First National Bank - Robert Thompson',
    mlsCoordinator: '',
    agentTeam: '',
    listingAgent: 'Christine Babikian',
    offerPurchasePrice: '$1,000,000.00',
    deposit: '$30,000.00',
    offerDate: 'Oct 22, 2025',
    offerExpirationDate: 'Oct 25, 2025',
    offerAcceptanceDate: '',
    finalWalkthroughDate: '',
    offerClosingDate: 'Nov 21, 2025',
    possessionDate: ''
  });

  const [conditions, setConditions] = useState<Array<{
    id: string;
    name: string;
    dueType: string;
    relativeTimeframe: string;
    relativeDate: string;
    notes: string;
  }>>([]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBuyerChange = (buyerId: string, field: string, value: string) => {
    setBuyers(prev => prev.map(buyer => 
      buyer.id === buyerId ? { ...buyer, [field]: value } : buyer
    ));
  };

  const addBuyer = () => {
    const newBuyer = {
      id: Date.now().toString(),
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      phone: '',
      relationship: ''
    };
    setBuyers(prev => [...prev, newBuyer]);
  };

  const removeBuyer = (buyerId: string) => {
    if (buyers.length > 1) {
      setBuyers(prev => prev.filter(buyer => buyer.id !== buyerId));
    }
  };

  const handleDeleteCondition = (id: string) => {
    setConditions(conditions.filter(c => c.id !== id));
  };

  const [todoLists, setTodoLists] = useState<TodoList[]>([
    {
      id: '1',
      name: 'Firm Deal',
      items: [
        { id: '1-1', text: 'Obtain Signed Firm Docs from Listing Agent', completed: false }
      ]
    },
    {
      id: '2',
      name: 'Home Search',
      items: [
        { id: '2-1', text: 'Add Clients to MLS Listing Alerts', completed: false },
        { id: '2-2', text: 'Obtain signed Buyers Rep Agreement', completed: false }
      ]
    },
    {
      id: '3',
      name: 'Offer Submitted',
      items: [
        { id: '3-1', text: 'Pause MLS Listing Alerts', completed: false, dueDate: 'Sep 17, 2025' },
        { id: '3-2', text: 'Submit Docs to Brokerage', completed: false, dueDate: 'Sep 17, 2025' }
      ]
    }
  ]);

  const handleCommissionSave = (data: any) => {
    console.log('Commission split data:', data);
  };

  const handleEditTransaction = (data: any) => {
    console.log('Updated transaction data:', data);
    setShowEditTransaction(false);
  };

  const handleDeleteTransaction = () => {
    if (confirm('Are you sure you want to delete this transaction?')) {
      console.log('Delete transaction:', transaction.id);
      onBack();
    }
  };

  const handleAddFolder = () => {
    if (newFolderName.trim()) {
      setCustomFolders([...customFolders, {
        id: Date.now().toString(),
        name: newFolderName,
        expanded: true
      }]);
      setNewFolderName('');
      setShowNewFolderDialog(false);
    }
  };

  const toggleCustomFolder = (folderId: string) => {
    setCustomFolders(customFolders.map(folder =>
      folder.id === folderId ? { ...folder, expanded: !folder.expanded } : folder
    ));
  };

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      const newFolder = {
        id: `folder-${Date.now()}`,
        name: newFolderName,
        expanded: true
      };
      setCustomFolders([...customFolders, newFolder]);
      setShowNewFolderDialog(false);
      setNewFolderName('');
    }
  };

  const handleAddDocuments = () => {
    if (selectedFiles && selectedFiles.length > 0) {
      console.log('Adding documents to folder:', selectedFolder);
      console.log('Files:', selectedFiles);
      // Here you would typically handle the file upload
      setShowAddDocumentsDialog(false);
      setSelectedFiles(null);
      setSelectedFolder('not-filed');
    }
  };

  const getAllFolders = () => {
    const defaultFolders = [
      { id: 'not-filed', name: 'Not Filed' }
    ];
    const custom = customFolders.map(f => ({ id: f.id, name: f.name }));
    return [...defaultFolders, ...custom];
  };

  // Tab navigation
  const sidebarTabs: Array<'type' | 'client-info' | 'property-info' | 'transactions' | 'offer' | 'parties' | 'documents'> = [
    'type',
    'client-info',
    'property-info',
    'transactions',
    'offer',
    'parties',
    'documents'
  ];

  const getCurrentTabIndex = () => {
    if (!sidebarTab) return -1;
    return sidebarTabs.indexOf(sidebarTab);
  };

  const goToNextTab = () => {
    const currentIndex = getCurrentTabIndex();
    if (currentIndex < sidebarTabs.length - 1) {
      setSidebarTab(sidebarTabs[currentIndex + 1]);
    }
  };

  const goToPreviousTab = () => {
    const currentIndex = getCurrentTabIndex();
    if (currentIndex > 0) {
      setSidebarTab(sidebarTabs[currentIndex - 1]);
    }
  };

  const isFirstTab = () => getCurrentTabIndex() === 0;
  const isLastTab = () => getCurrentTabIndex() === sidebarTabs.length - 1;

  const toggleTodoItem = (listId: string, itemId: string) => {
    setTodoLists(todoLists.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          items: list.items.map(item => 
            item.id === itemId ? { ...item, completed: !item.completed } : item
          )
        };
      }
      return list;
    }));
  };

  const addTodoList = () => {
    if (newListName.trim()) {
      setTodoLists([...todoLists, {
        id: Date.now().toString(),
        name: newListName,
        items: []
      }]);
      setNewListName('');
      setShowAddList(false);
    }
  };

  const addTodoItem = (listId: string) => {
    if (newTaskText.trim()) {
      setTodoLists(todoLists.map(list => {
        if (list.id === listId) {
          return {
            ...list,
            items: [...list.items, {
              id: `${listId}-${Date.now()}`,
              text: newTaskText,
              completed: false
            }]
          };
        }
        return list;
      }));
      setNewTaskText('');
      setAddingTaskToList(null);
    }
  };

  const deleteTodoList = (listId: string) => {
    setTodoLists(todoLists.filter(list => list.id !== listId));
  };

  const timelineData: TimelineDay[] = [
    {
      date: 'Sep 12',
      label: 'today',
      events: []
    },
    {
      date: 'Sep 16',
      label: '4 days away',
      events: [
        { id: '1', title: 'Offer', date: 'Sep 16' },
        { id: '2', title: 'Offer Expiration', date: 'Sep 16' }
      ]
    },
    {
      date: 'Sep 17',
      label: '5 days away',
      events: [
        { id: '3', title: 'Offer Acceptance', date: 'Sep 17' },
        { id: '4', title: 'Pause MLS Listing Alerts', date: 'Sep 17' },
        { id: '5', title: 'Submit Docs to Brokerage', date: 'Sep 17' }
      ]
    }
  ];

  const historyData: HistoryEntry[] = [
    {
      id: '1',
      action: 'Offer Details Modified',
      changedBy: 'Christine Babikian',
      date: 'Sep 12, 2025 09:14 AM',
      personId: '3db01994-ded7-4c6c-9199-e8a1e0e913a2',
      details: {
        offerDate: {
          old: 'Sep 15, 2025',
          new: 'Sep 16, 2025'
        }
      }
    },
    {
      id: '2',
      action: 'Property Details Modified',
      changedBy: 'Christine Babikian',
      date: 'Sep 12, 2025 09:13 AM'
    },
    {
      id: '3',
      action: 'Document Deleted',
      changedBy: 'Christine Babikian',
      date: 'Sep 12, 2025 09:07 AM'
    },
    {
      id: '4',
      action: 'Document Created',
      changedBy: 'Christine Babikian',
      date: 'Sep 12, 2025 09:06 AM'
    },
    {
      id: '5',
      action: 'Document Created',
      changedBy: 'Christine Babikian',
      date: 'Sep 12, 2025 09:06 AM'
    },
    {
      id: '6',
      action: 'Document Created',
      changedBy: 'Christine Babikian',
      date: 'Sep 12, 2025 09:06 AM'
    },
    {
      id: '7',
      action: 'Document Created',
      changedBy: 'Christine Babikian',
      date: 'Sep 12, 2025 09:06 AM'
    },
    {
      id: '8',
      action: 'Property Details Modified',
      changedBy: 'Christine Babikian',
      date: 'Sep 12, 2025 09:03 AM'
    },
    {
      id: '9',
      action: 'Template Applied',
      changedBy: 'Christine Babikian',
      date: 'Sep 12, 2025 09:03 AM'
    },
    {
      id: '10',
      action: 'Tx Pre-Created',
      changedBy: 'Christine Babikian',
      date: 'Sep 11, 2025 09:02 AM'
    }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {showEditTransaction && (
        <NewTransaction
          onClose={() => setShowEditTransaction(false)}
          onSave={handleEditTransaction}
          editMode={true}
          existingData={transaction}
        />
      )}

      {/* Navbar */}
      <Navbar onViewTransactions={onBack} onLoginClick={function (): void {
          throw new Error("Function not implemented.");
      }} />

      {/* Breadcrumb Navigation */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink 
                onClick={onBack}
                className="cursor-pointer hover:text-orange-600 transition-colors"
              >
                <Home className="h-4 w-4" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink 
                onClick={onBack}
                className="cursor-pointer hover:text-orange-600 transition-colors"
              >
                Transactions
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-orange-600">
                {transaction.address}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* New Folder Dialog */}
      <Dialog open={showNewFolderDialog} onOpenChange={setShowNewFolderDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Folder</DialogTitle>
            <DialogDescription>
              Enter a name for the new folder to organize your documents.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="folder-name">Folder Name</Label>
            <Input
              id="folder-name"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="Enter folder name"
              className="mt-2"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAddFolder();
                }
              }}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowNewFolderDialog(false);
              setNewFolderName('');
            }}>
              Cancel
            </Button>
            <Button 
              className="bg-orange-600 hover:bg-orange-700 text-white"
              onClick={handleAddFolder}
              disabled={!newFolderName.trim()}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Documents Dialog */}
      <Dialog open={showAddDocumentsDialog} onOpenChange={setShowAddDocumentsDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Documents</DialogTitle>
            <DialogDescription>
              Select a folder and choose files to upload.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="folder-select">Select Folder</Label>
              <Select value={selectedFolder} onValueChange={setSelectedFolder}>
                <SelectTrigger id="folder-select" className="mt-2">
                  <SelectValue placeholder="Select a folder" />
                </SelectTrigger>
                <SelectContent>
                  {getAllFolders().map((folder) => (
                    <SelectItem key={folder.id} value={folder.id}>
                      {folder.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="file-upload">Select Files</Label>
              <div className="mt-2 border-2 border-dashed rounded-lg p-8 text-center hover:border-orange-400 transition-colors">
                <Input
                  id="file-upload"
                  type="file"
                  multiple
                  onChange={(e) => setSelectedFiles(e.target.files)}
                  className="hidden"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <FilePlus className="h-12 w-12 mx-auto text-gray-400 mb-2" />
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
              setShowAddDocumentsDialog(false);
              setSelectedFiles(null);
              setSelectedFolder('not-filed');
            }}>
              Cancel
            </Button>
            <Button 
              className="bg-orange-600 hover:bg-orange-700 text-white"
              onClick={handleAddDocuments}
              disabled={!selectedFiles || selectedFiles.length === 0}
            >
              Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Transaction Info Header */}
      <div className="px-6 py-6" style={{ background: 'linear-gradient(to right, rgba(243, 111, 32, 1), rgba(237, 185, 78, 1))' }}>
        <div className="flex gap-6">
          {/* Property Thumbnail */}
          <div className="w-24 h-24 flex-shrink-0 bg-white rounded overflow-hidden border-2 border-white shadow-lg">
            <ImageWithFallback
              src={transaction.image}
              alt={transaction.address}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info Section */}
          <div className="flex-1">
            {/* Address Title */}
            <h1 className="text-white text-xl mb-4">
              {transaction.address}, {transaction.city}, {transaction.state} {transaction.zipCode}
            </h1>

            {/* Details Row */}
            <div className="flex items-start gap-12">
              {/* Transaction Type */}
              <div>
                <p className="text-xs text-white/70 mb-1">Transaction Type</p>
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowTypeDropdown(!showTypeDropdown);
                      setShowStatusDropdown(false);
                    }}
                    className="flex items-center gap-2 text-sm text-white hover:text-white/80 transition-colors"
                  >
                    <span>{selectedType}</span>
                    {showTypeDropdown ? (
                      <ChevronUp className="h-3 w-3" />
                    ) : (
                      <ChevronDown className="h-3 w-3" />
                    )}
                  </button>
                  
                  {showTypeDropdown && (
                    <div className="absolute top-full left-0 mt-1 w-48 bg-white border rounded shadow-lg z-10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedType('Listing for Sale');
                          setShowTypeDropdown(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-blue-500 hover:text-white transition-colors"
                      >
                        Listing for Sale
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedType('Listing for Lease');
                          setShowTypeDropdown(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-blue-500 hover:text-white transition-colors"
                      >
                        Listing for Lease
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedType('Purchase');
                          setShowTypeDropdown(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-blue-500 hover:text-white transition-colors"
                      >
                        Purchase
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedType('Lease');
                          setShowTypeDropdown(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-blue-500 hover:text-white transition-colors"
                      >
                        Lease
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Status */}
              <div>
                <p className="text-xs text-white/70 mb-1">Status</p>
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowStatusDropdown(!showStatusDropdown);
                      setShowTypeDropdown(false);
                    }}
                    className="flex items-center gap-2 text-sm text-white hover:text-white/80 transition-colors"
                  >
                    <span>{selectedStatus}</span>
                    {showStatusDropdown ? (
                      <ChevronUp className="h-3 w-3" />
                    ) : (
                      <ChevronDown className="h-3 w-3" />
                    )}
                  </button>
                  
                  {showStatusDropdown && (
                    <div className="absolute top-full left-0 mt-1 w-48 bg-white border rounded shadow-lg z-10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedStatus('Pre-contract');
                          setShowStatusDropdown(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-blue-500 hover:text-white transition-colors z-10"
                      >
                        Pre-contract
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedStatus('Under Contract');
                          setShowStatusDropdown(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-blue-500 hover:text-white transition-colors"
                      >
                        Under Contract
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedStatus('Closed');
                          setShowStatusDropdown(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-blue-500 hover:text-white transition-colors"
                      >
                        Closed
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Listing Price */}
              <div>
                <p className="text-xs text-white/70 mb-1">Listing Price</p>
                <p className="text-sm text-white">${transaction.price.toLocaleString()}</p>
              </div>

              {/* Closing Date */}
              <div>
                <p className="text-xs text-white/70 mb-1">Closing on</p>
                <p className="text-sm text-white">
                  {transaction.closingDate 
                    ? new Date(transaction.closingDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                    : 'November 30, 2025'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'detail' | 'documents' | 'people' | 'history' | 'commission')} className="flex-1 flex flex-col">
        {/* Tabs Navigation */}
        <div className="border-b bg-white sticky top-0 z-1">
          <div className="px-6 border-b border-gray-200">
            <TabsList className="bg-transparent border-b-0 h-auto p-0 space-x-1">
              <TabsTrigger 
                value="detail" 
                className="relative rounded-t-lg bg-transparent px-6 py-4 transition-all duration-300 data-[state=inactive]:text-gray-500 data-[state=inactive]:hover:text-gray-700 data-[state=inactive]:hover:bg-gray-50 data-[state=active]:text-orange-600 data-[state=active]:bg-white data-[state=active]:shadow-[0_-2px_8px_rgba(0,0,0,0.08)] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-orange-500 after:scale-x-0 data-[state=active]:after:scale-x-100 after:transition-transform after:duration-300"
              >
                <Info className="h-5 w-5 mr-2" />
                <span className="font-medium">Detail</span>
              </TabsTrigger>
              <TabsTrigger 
                value="documents" 
                className="relative rounded-t-lg bg-transparent px-6 py-4 transition-all duration-300 data-[state=inactive]:text-gray-500 data-[state=inactive]:hover:text-gray-700 data-[state=inactive]:hover:bg-gray-50 data-[state=active]:text-orange-600 data-[state=active]:bg-white data-[state=active]:shadow-[0_-2px_8px_rgba(0,0,0,0.08)] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-orange-500 after:scale-x-0 data-[state=active]:after:scale-x-100 after:transition-transform after:duration-300"
              >
                <FileText className="h-5 w-5 mr-2" />
                <span className="font-medium">Documents</span>
              </TabsTrigger>
              <TabsTrigger 
                value="people" 
                className="relative rounded-t-lg bg-transparent px-6 py-4 transition-all duration-300 data-[state=inactive]:text-gray-500 data-[state=inactive]:hover:text-gray-700 data-[state=inactive]:hover:bg-gray-50 data-[state=active]:text-orange-600 data-[state=active]:bg-white data-[state=active]:shadow-[0_-2px_8px_rgba(0,0,0,0.08)] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-orange-500 after:scale-x-0 data-[state=active]:after:scale-x-100 after:transition-transform after:duration-300"
              >
                <Users className="h-5 w-5 mr-2" />
                <span className="font-medium">People</span>
              </TabsTrigger>
              <TabsTrigger 
                value="history" 
                className="relative rounded-t-lg bg-transparent px-6 py-4 transition-all duration-300 data-[state=inactive]:text-gray-500 data-[state=inactive]:hover:text-gray-700 data-[state=inactive]:hover:bg-gray-50 data-[state=active]:text-orange-600 data-[state=active]:bg-white data-[state=active]:shadow-[0_-2px_8px_rgba(0,0,0,0.08)] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-orange-500 after:scale-x-0 data-[state=active]:after:scale-x-100 after:transition-transform after:duration-300"
              >
                <Clock className="h-5 w-5 mr-2" />
                <span className="font-medium">History</span>
              </TabsTrigger>
              <TabsTrigger 
                value="commission" 
                className="relative rounded-t-lg bg-transparent px-6 py-4 transition-all duration-300 data-[state=inactive]:text-gray-500 data-[state=inactive]:hover:text-gray-700 data-[state=inactive]:hover:bg-gray-50 data-[state=active]:text-orange-600 data-[state=active]:bg-white data-[state=active]:shadow-[0_-2px_8px_rgba(0,0,0,0.08)] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-orange-500 after:scale-x-0 data-[state=active]:after:scale-x-100 after:transition-transform after:duration-300"
              >
                <DollarSign className="h-5 w-5 mr-2" />
                <span className="font-medium">Commission</span>
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        {/* Tab Content */}
        {/* Detail Tab */}
        <TabsContent value="detail" className="flex-1 m-0">
          <div className="p-8 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 gap-8">
              {/* Combined Detail Form Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="space-y-8">
                  {/* Property Information Subsection */}
                  <div>
                    <h3 className="text-orange-600 mb-4">Property Information</h3>
                    <div className="space-y-5">
                  <div>
                    <Label htmlFor="street-address" className="text-gray-700 mb-2 block">Street Address</Label>
                    <Input 
                      id="street-address"
                      value={formData.streetAddress}
                      onChange={(e) => handleInputChange('streetAddress', e.target.value)}
                      className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="unit" className="text-gray-700 mb-2 block">Unit/Apt</Label>
                      <Input 
                        id="unit"
                        value={formData.unit}
                        onChange={(e) => handleInputChange('unit', e.target.value)}
                        className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="zip-code" className="text-gray-700 mb-2 block">ZIP Code</Label>
                      <Input 
                        id="zip-code"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city" className="text-gray-700 mb-2 block">City</Label>
                      <Input 
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state" className="text-gray-700 mb-2 block">State</Label>
                      <Input 
                        id="state"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="county" className="text-gray-700 mb-2 block">County</Label>
                    <Input 
                      id="county"
                      value={formData.county}
                      onChange={(e) => handleInputChange('county', e.target.value)}
                      className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="property-value" className="text-gray-700 mb-2 block">Property Value</Label>
                    <Input 
                      id="property-value"
                      value={formData.propertyValue}
                      onChange={(e) => handleInputChange('propertyValue', e.target.value)}
                      className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="deposit" className="text-gray-700 mb-2 block">Deposit Amount</Label>
                    <Input 
                      id="deposit"
                      value={formData.deposit}
                      onChange={(e) => handleInputChange('deposit', e.target.value)}
                      className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="possession-date" className="text-gray-700 mb-2 block">Possession Date</Label>
                    <Input 
                      id="possession-date"
                      type="date"
                      value={formData.possessionDate}
                      onChange={(e) => handleInputChange('possessionDate', e.target.value)}
                      className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
                </div>
                  </div>

                  {/* Transaction Information Subsection */}
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-orange-600 mb-4">Transaction Information</h3>
                    <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="transaction-type" className="text-gray-700 mb-2 block">Transaction Type</Label>
                      <Input 
                        id="transaction-type"
                        value={formData.transactionType}
                        onChange={(e) => handleInputChange('transactionType', e.target.value)}
                        className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="mls-number" className="text-gray-700 mb-2 block">MLS Number</Label>
                      <Input 
                        id="mls-number"
                        value={formData.escrowNumber}
                        onChange={(e) => handleInputChange('escrowNumber', e.target.value)}
                        className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="client-name" className="text-gray-700 mb-2 block">Client Name</Label>
                    <Input 
                      id="client-name"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="listing-price" className="text-gray-700 mb-2 block">Listing Price</Label>
                      <Input 
                        id="listing-price"
                        value={formData.salePrice}
                        onChange={(e) => handleInputChange('salePrice', e.target.value)}
                        className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="purchase-price" className="text-gray-700 mb-2 block">Purchase Price</Label>
                      <Input 
                        id="purchase-price"
                        value={formData.purchasePrice}
                        onChange={(e) => handleInputChange('purchasePrice', e.target.value)}
                        className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="offer-date" className="text-gray-700 mb-2 block">Offer Date</Label>
                      <Input 
                        id="offer-date"
                        type="date"
                        value={formData.offerDate}
                        onChange={(e) => handleInputChange('offerDate', e.target.value)}
                        className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="closing-date" className="text-gray-700 mb-2 block">Closing Date</Label>
                      <Input 
                        id="closing-date"
                        type="date"
                        value={formData.offerClosingDate}
                        onChange={(e) => handleInputChange('offerClosingDate', e.target.value)}
                        className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="lender-name" className="text-gray-700 mb-2 block">Lender Name</Label>
                    <Input 
                      id="lender-name"
                      value={formData.lenderName}
                      onChange={(e) => handleInputChange('lenderName', e.target.value)}
                      className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="listing-agent" className="text-gray-700 mb-2 block">Listing Agent</Label>
                    <Input 
                      id="listing-agent"
                      value={formData.listingAgent}
                      onChange={(e) => handleInputChange('listingAgent', e.target.value)}
                      className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
                    </div>
                  </div>

                  {/* Order Information Subsection */}
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-orange-600 mb-4">Order Information</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="order-number" className="text-gray-700 mb-2 block">Order Number</Label>
                        <Input 
                          id="order-number"
                          placeholder="Enter order number"
                          className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="order-date" className="text-gray-700 mb-2 block">Order Date</Label>
                          <Input 
                            id="order-date"
                            type="date"
                            className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                          />
                        </div>
                        <div>
                          <Label htmlFor="order-status" className="text-gray-700 mb-2 block">Order Status</Label>
                          <Select>
                            <SelectTrigger id="order-status" className="border-gray-300 focus:border-orange-500 focus:ring-orange-500">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="processing">Processing</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="order-notes" className="text-gray-700 mb-2 block">Order Notes</Label>
                        <Textarea 
                          id="order-notes"
                          placeholder="Add any notes about this order..."
                          className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex justify-end gap-4">
              <Button variant="outline" className="px-6">
                Cancel
              </Button>
              <Button className="bg-orange-600 hover:bg-orange-700 text-white px-6">
                Save Changes
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="flex-1 m-0">
          <ToDoTabContent />
        </TabsContent>

    {/* People Tab */}
    <TabsContent value="people" className="flex-1 m-0">
      <div className="p-8 max-w-6xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl">People</h2>
          <PrimaryButton className="gap-2">
            <Plus className="h-4 w-4" />
            Add Person
          </PrimaryButton>
        </div>
        
        {/* People List */}
        <div className="space-y-6">
          {/* Buyers Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-orange-600">Buyers</h3>
              <Button variant="outline" size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Buyer
              </Button>
            </div>
            <div className="space-y-4">
              {buyers.map((buyer, index) => (
                <div key={buyer.id} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:border-orange-300 transition-colors">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-orange-100 text-orange-600">
                      {buyer.firstName ? buyer.firstName[0] : 'B'}{buyer.lastName ? buyer.lastName[0] : (index + 1)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium">
                        {buyer.firstName || buyer.lastName 
                          ? `${buyer.firstName} ${buyer.middleName} ${buyer.lastName}`.trim() 
                          : `Buyer ${index + 1}`}
                      </p>
                      {buyer.relationship && (
                        <Badge variant="outline" className="text-xs">
                          {buyer.relationship}
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 space-y-1">
                      {buyer.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          <span>{buyer.email}</span>
                        </div>
                      )}
                      {buyer.phone && (
                        <div className="flex items-center gap-2">
                          <span>📞</span>
                          <span>{buyer.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash className="h-4 w-4 mr-2" />
                        Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          </div>

          {/* Agents Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-orange-600">Agents</h3>
              <Button variant="outline" size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Agent
              </Button>
            </div>
            <div className="space-y-4">
              {agents.map((agent) => (
                <div key={agent.id} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:border-orange-300 transition-colors">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {agent.firstName[0]}{agent.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium">{agent.firstName} {agent.lastName}</p>
                      <Badge variant="outline" className="text-xs bg-blue-50">
                        {agent.role}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-500 space-y-1">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span>{agent.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>📞</span>
                        <span>{agent.phone}</span>
                      </div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash className="h-4 w-4 mr-2" />
                        Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          </div>

          {/* Lender Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-orange-600">Lender</h3>
              <Button variant="outline" size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Lender
              </Button>
            </div>
            <div className="space-y-4">
              {lenders.map((lender) => (
                <div key={lender.id} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:border-orange-300 transition-colors">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-green-100 text-green-600">
                      {lender.name[0]}{lender.contactPerson[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium">{lender.name}</p>
                      <Badge variant="outline" className="text-xs bg-green-50">
                        {lender.role}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{lender.contactPerson}</p>
                    <div className="text-sm text-gray-500 space-y-1">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span>{lender.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>📞</span>
                        <span>{lender.phone}</span>
                      </div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash className="h-4 w-4 mr-2" />
                        Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          </div>

          {/* Other Parties Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-orange-600">Other Parties</h3>
              <Button variant="outline" size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Party
              </Button>
            </div>
            <div className="space-y-4">
              {otherParties.map((party) => (
                <div key={party.id} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:border-orange-300 transition-colors">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-purple-100 text-purple-600">
                      {party.firstName[0]}{party.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium">{party.firstName} {party.lastName}</p>
                      <Badge variant="outline" className="text-xs bg-purple-50">
                        {party.role}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-500 space-y-1">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span>{party.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>📞</span>
                        <span>{party.phone}</span>
                      </div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash className="h-4 w-4 mr-2" />
                        Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </TabsContent>

    {/* History Tab */}
    <TabsContent value="history" className="flex-1 m-0">
      <div className="p-8 max-w-6xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl">Transaction History</h2>
        </div>
        
        {/* History Timeline */}
        <div className="space-y-6">
          {/* History Event 1 */}
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
              <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
            </div>
            <div className="flex-1 pb-8">
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium">Transaction Created</h3>
                  <span className="text-sm text-gray-500">2 weeks ago</span>
                </div>
                <p className="text-sm text-gray-600">Transaction was created by Christine Babikian</p>
              </div>
            </div>
          </div>

          {/* History Event 2 */}
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
            </div>
            <div className="flex-1 pb-8">
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium">Documents Uploaded</h3>
                  <span className="text-sm text-gray-500">1 week ago</span>
                </div>
                <p className="text-sm text-gray-600">Purchase Agreement and Disclosure documents were uploaded</p>
              </div>
            </div>
          </div>

          {/* History Event 3 */}
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
            </div>
            <div className="flex-1 pb-8">
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium">Buyer Added</h3>
                  <span className="text-sm text-gray-500">6 days ago</span>
                </div>
                <p className="text-sm text-gray-600">John Anderson was added as primary buyer</p>
              </div>
            </div>
          </div>

          {/* History Event 4 */}
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Info className="h-5 w-5 text-purple-600" />
              </div>
              <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
            </div>
            <div className="flex-1 pb-8">
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium">Status Updated</h3>
                  <span className="text-sm text-gray-500">5 days ago</span>
                </div>
                <p className="text-sm text-gray-600">Transaction status changed from "Pre-contract" to "Under Contract"</p>
              </div>
            </div>
          </div>

          {/* History Event 5 */}
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-yellow-600" />
              </div>
              <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
            </div>
            <div className="flex-1 pb-8">
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium">Commission Split Configured</h3>
                  <span className="text-sm text-gray-500">3 days ago</span>
                </div>
                <p className="text-sm text-gray-600">Commission distribution was set up and saved</p>
              </div>
            </div>
          </div>

          {/* History Event 6 */}
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <FileText className="h-5 w-5 text-red-600" />
              </div>
            </div>
            <div className="flex-1">
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium">Document Signed</h3>
                  <span className="text-sm text-gray-500">1 day ago</span>
                </div>
                <p className="text-sm text-gray-600">Purchase Agreement was signed by all parties</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TabsContent>

    {/* Commission Tab */}
    <TabsContent value="commission" className="flex-1 m-0">
      <div className="p-8 max-w-6xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl">Commission Split</h2>
          <p className="text-gray-500 mt-2">Manage the commission distribution for this transaction</p>
        </div>

        <CommissionSplit
          totalCommission={(transaction.price || 0) * 0.03}
          onSave={handleCommissionSave}
        />
      </div>
    </TabsContent>
  </Tabs>

      {/* Footer */}
      <Footer />
    </div>
  );
}