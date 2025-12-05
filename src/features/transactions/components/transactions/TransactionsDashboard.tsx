import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { PrimaryButton } from "@/components/custom/primary-button";
import { Input } from "@/components/ui/input";
import { TransactionCard } from './TransactionCard';
import { NewTransaction, TransactionFormData, Party, Condition } from '../NewTransaction';
import { AssignOwner, OwnerAssignments } from "../AssignOwner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search, MoreHorizontal, SlidersHorizontal, LayoutGrid, Table, Plus, Bell, Home, ChevronRight, FileText, MoreVertical, Users, Copy, MessageSquare, FileSearch, Trash2, ChevronDown } from 'lucide-react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ImageWithFallback } from "@/components/custom/image-with-fallback";
import { Transaction } from '@/types/transaction';
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useWebsiteConfig } from "@/contexts/WebsiteConfigContext";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Footer } from "@/components/common/Footer";
import { mockTransactions } from '@/features/transactions/data/mockTransactions';

interface TransactionsDashboardProps {
  onViewTransaction: (transaction: Transaction) => void;
  onViewProfile: () => void;
  onViewDemoForm: () => void;
  onViewSettings: () => void;
}

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

  const handleNewTransactionSave = (data: TransactionFormData & { parties: Party[]; conditions: Condition[] }) => {
    console.log('New transaction data:', data);
    setShowNewTransaction(false);
  };

  const handleAssignOwner = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowAssignOwner(true);
  };

  const handleAssignOwnerSave = (assignments: OwnerAssignments) => {
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

    </div>

  );
}