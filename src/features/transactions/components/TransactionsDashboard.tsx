import { useState } from 'react';
import { Button } from "@/components/button";
import { PrimaryButton } from "@/components/primary-button";
import { Input } from "@/components/input";
import { TransactionCard } from './TransactionCard';
import { NewTransaction } from './NewTransaction';
import { AssignOwner } from "./AssignOwner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/dropdown-menu";
import { Search, MoreHorizontal, SlidersHorizontal, LayoutGrid, Table, Plus, Bell, Home, ChevronRight, FileText, MoreVertical, Users, Copy, MessageSquare, FileSearch, Trash2, ChevronDown } from 'lucide-react';
import { Avatar, AvatarFallback } from "@/components/avatar";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { Transaction } from '@/types/transaction';
import { Checkbox } from "@/components/checkbox";
import { Badge } from "@/components/badge";
import { useWebsiteConfig } from "@/providers/WebsiteConfigContext";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Footer } from "@/shared/components/Footer";

interface TransactionsDashboardProps {
  onViewTransaction: (transaction: Transaction) => void;
  onViewProfile: () => void;
  onViewDemoForm: () => void;
  onViewSettings: () => void;
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    clientName: 'Joan Morris',
    address: '45 Covington Road',
    city: 'Ventura',
    state: 'CA',
    zipCode: '93003',
    price: 825000,
    type: 'Purchase',
    status: 'Pre-contract',
    closingDate: 'Nov 21, 2025',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MTY3NTM5M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    mlsNumber: '123456',
    modifiedDate: 'Sep 12, 2025'
  },
  {
    id: '2',
    clientName: 'Yaro Kallaberry',
    address: '55 Robin Blvd',
    city: 'Riverside',
    state: 'CA',
    zipCode: '96102',
    price: 2500000,
    type: 'Listing',
    status: 'Pre-contract',
    listDate: 'Sep 22, 2025',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBob3VzZXxlbnwxfHx8fDE3NjE2Njg1Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    mlsNumber: '123457',
    modifiedDate: 'Sep 11, 2025'
  },
  {
    id: '3',
    clientName: 'Mia Peplum',
    address: '62 Caledon Way',
    city: 'Ventura',
    state: 'CA',
    price: 3650000,
    type: 'Purchase',
    status: 'Pre-contract',
    image: 'https://images.unsplash.com/photo-1621693722835-44c9dcb724fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob21lJTIwcG9vbHxlbnwxfHx8fDE3NjE3MzI1MDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    mlsNumber: '123458',
    modifiedDate: 'Sep 11, 2025'
  },
  {
    id: '4',
    clientName: 'Valerie Sampleton',
    address: '88 Bay St, 212',
    city: 'Santa Monica',
    state: 'CA',
    price: 414000,
    type: 'Purchase',
    status: 'Under Contract',
    closingDate: 'Oct 28, 2025',
    image: 'https://images.unsplash.com/photo-1689574120966-c7b1e57a8cfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNpZGVudGlhbCUyMHByb3BlcnR5fGVufDF8fHx8MTc2MTcxNzE5NXww&ixlib=rb-4.1.0&q=80&w=1080',
    mlsNumber: '123459',
    modifiedDate: 'Sep 11, 2025',
    lostDeals: 1
  },
  {
    id: '5',
    clientName: 'Madeline Lance',
    address: '525 Cavaletti Lane, 201',
    city: 'Ventura',
    state: 'CA',
    zipCode: '91330',
    price: 2200,
    type: 'Lease Listing',
    status: 'Under Contract',
    closingDate: 'Oct 23, 2025',
    image: 'https://images.unsplash.com/photo-1628624747186-a941c476b7ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWJ1cmJhbiUyMGhvdXNlfGVufDF8fHx8MTc2MTcyNjg4MXww&ixlib=rb-4.1.0&q=80&w=1080',
    mlsNumber: '123460',
    modifiedDate: 'Sep 11, 2025'
  },
  {
    id: '6',
    clientName: 'Elizabeth Browning',
    address: '45 Huntington Ave',
    city: 'Los Angeles',
    state: 'CA',
    price: 825000,
    type: 'Purchase',
    status: 'Closed',
    listDate: 'Nov 4, 2025',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwaG9tZXxlbnwxfHx8fDE3NjE3MjA1Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    mlsNumber: '123461',
    modifiedDate: 'Sep 11, 2025'
  }
];

export function TransactionsDashboard({ onViewTransaction, onViewProfile, onViewDemoForm, onViewSettings }: TransactionsDashboardProps) {
  const { config } = useWebsiteConfig();
  const { primaryLight } = useThemeColors();
  const [view, setView] = useState<'cards' | 'table'>('table');
  const [filterType, setFilterType] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('listDate');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewTransaction, setShowNewTransaction] = useState(false);
  const [showAssignOwner, setShowAssignOwner] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const filteredTransactions = mockTransactions
    .filter(transaction => {
      const matchesSearch = searchQuery === '' || 
        transaction.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.mlsNumber?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = filterType === 'all' || 
        (filterType === 'purchase' && transaction.type === 'Purchase') ||
        (filterType === 'listing' && transaction.type === 'Listing') ||
        (filterType === 'lease' && transaction.type === 'Lease Listing');
      
      const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
      
      return matchesSearch && matchesType && matchesStatus;
    })
    .sort((a, b) => {
      // Sort by selected field
      if (sortBy === 'listDate') {
        const dateA = a.listDate ? new Date(a.listDate).getTime() : 0;
        const dateB = b.listDate ? new Date(b.listDate).getTime() : 0;
        return dateB - dateA; // Most recent first
      } else if (sortBy === 'closingDate') {
        const dateA = a.closingDate ? new Date(a.closingDate).getTime() : 0;
        const dateB = b.closingDate ? new Date(b.closingDate).getTime() : 0;
        return dateB - dateA;
      } else if (sortBy === 'modifiedDate') {
        const dateA = a.modifiedDate ? new Date(a.modifiedDate).getTime() : 0;
        const dateB = b.modifiedDate ? new Date(b.modifiedDate).getTime() : 0;
        return dateB - dateA;
      } else if (sortBy === 'price') {
        return b.price - a.price; // Highest first
      }
      return 0;
    });

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Pre-contract':
        return 'bg-blue-100 text-blue-700 hover:bg-blue-100';
      case 'Under Contract':
        return '';
      case 'Closed':
        return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
      default:
        return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
    }
  };

  const getStatusBadgeStyle = (status: string) => {
    if (status === 'Under Contract') {
      return {
        backgroundColor: primaryLight,
        color: config.primaryColor,
      };
    }
    return {};
  };

  const getTypeIcon = (type: string) => {
    if (type === 'Purchase') {
      return '🏠';
    } else if (type === 'Listing') {
      return '📋';
    } else if (type === 'Lease Listing') {
      return '📋';
    }
    return '🏠';
  };

  const handleNewTransactionSave = (data: any) => {
    console.log('New transaction data:', data);
    setShowNewTransaction(false);
  };

  const handleAssignOwner = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowAssignOwner(true);
  };

  const handleAssignOwnerSave = (assignments: any) => {
    console.log('Assignments saved:', assignments);
    setShowAssignOwner(false);
    setSelectedTransaction(null);
  };

  const handleClone = (transaction: Transaction) => {
    console.log('Clone transaction:', transaction);
  };

  const handleConversationHistory = (transaction: Transaction) => {
    console.log('View conversation history:', transaction);
  };

  const handleAuditLog = (transaction: Transaction) => {
    console.log('View audit log:', transaction);
  };

  const handleDelete = (transaction: Transaction) => {
    console.log('Delete transaction:', transaction);
  };

  return (
    <div className="min-h-screen bg-white">
      {showNewTransaction && (
        <NewTransaction
          onClose={() => setShowNewTransaction(false)}
          onSave={handleNewTransactionSave}
        />
      )}

      {showAssignOwner && selectedTransaction && (
        <AssignOwner
          transaction={selectedTransaction}
          onClose={() => {
            setShowAssignOwner(false);
            setSelectedTransaction(null);
          }}
          onSave={handleAssignOwnerSave}
        />
      )}
      
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
              <button 
                className="text-gray-600 hover:text-gray-900"
                onClick={onViewDemoForm}
              >
                Demo Form
              </button>
              <button className="px-4 py-2 bg-gray-100 rounded">Transactions</button>
              <button 
                className="text-gray-600 hover:text-gray-900"
                onClick={onViewSettings}
              >
                Website Settings
              </button>
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
              onClick={onViewProfile}
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

      {/* Main Content */}
      <main className="px-6 py-8">
        {/* Page Title and New Transaction Button */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl">Transactions</h1>
          <PrimaryButton 
            onClick={() => setShowNewTransaction(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Transaction
          </PrimaryButton>
        </div>

        {/* Filters and View Controls */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Find transactions by address, client name, or MLS #"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Transactions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Transactions</SelectItem>
              <SelectItem value="purchase">Purchase</SelectItem>
              <SelectItem value="listing">Listing</SelectItem>
              <SelectItem value="lease">Lease Listing</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Pre-contract">Pre-contract</SelectItem>
              <SelectItem value="Under Contract">Under Contract</SelectItem>
              <SelectItem value="Closed">Closed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="listDate">List Date</SelectItem>
              <SelectItem value="closingDate">Closing Date</SelectItem>
              <SelectItem value="modifiedDate">Modified Date</SelectItem>
              <SelectItem value="price">Price</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2 border rounded-lg px-2 py-1">
            <Button
              variant={view === 'table' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setView('table')}
            >
              Table
            </Button>
            <Button
              variant={view === 'cards' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setView('cards')}
            >
              Cards
            </Button>
          </div>
        </div>

        {/* Table View */}
        {view === 'table' && (
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider w-12">
                    <Checkbox />
                  </th>
                  <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Property</th>
                  <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Client</th>
                  <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">List Date</th>
                  <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Closing Date</th>
                  <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                  <tr 
                    key={transaction.id} 
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => onViewTransaction(transaction)}
                  >
                    <td className="px-4 py-4">
                      <Checkbox onClick={(e) => e.stopPropagation()} />
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <div className="text-sm">{transaction.address}</div>
                        <div className="text-xs text-gray-500">
                          {transaction.city} {transaction.state} {transaction.zipCode}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{getTypeIcon(transaction.type)}</span>
                        <span className="text-sm text-gray-600">{transaction.type}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm">{transaction.clientName}</td>
                    <td className="px-4 py-4">
                      <Badge 
                        variant="secondary" 
                        className={getStatusBadgeColor(transaction.status)}
                        style={getStatusBadgeStyle(transaction.status)}
                      >
                        {transaction.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 text-sm">
                      ${transaction.price.toLocaleString()}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      {transaction.listDate || '-'}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      {transaction.closingDate || '-'}
                    </td>
                    <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <PrimaryButton size="sm" className="h-8 px-3">
                            Action
                            <ChevronDown className="h-4 w-4 ml-1" />
                          </PrimaryButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                          <DropdownMenuItem onClick={() => handleAssignOwner(transaction)}>
                            <Users className="h-4 w-4 mr-2" />
                            Assign Owner
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleClone(transaction)}>
                            <Copy className="h-4 w-4 mr-2" />
                            Clone
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleConversationHistory(transaction)}>
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Conversation History
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleAuditLog(transaction)}>
                            <FileSearch className="h-4 w-4 mr-2" />
                            Audit Log
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDelete(transaction)}
                            className="text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Cards View */}
        {view === 'cards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTransactions.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                transaction={transaction}
                onClick={() => onViewTransaction(transaction)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>

  );
}