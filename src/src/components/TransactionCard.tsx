import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Folder, Archive, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { Transaction } from '../../App';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { Calendar } from '../../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover';

interface TransactionCardProps {
  transaction: Transaction;
  onClick: () => void;
}

export function TransactionCard({ transaction, onClick }: TransactionCardProps) {
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [selectedType, setSelectedType] = useState(transaction.type);
  const [selectedStatus, setSelectedStatus] = useState(transaction.status);
  const [showCalendar, setShowCalendar] = useState(false);
  const [closingDate, setClosingDate] = useState<Date | undefined>(
    transaction.closingDate ? new Date(transaction.closingDate) : undefined
  );

  // Calculate progress percentage (mock data - you can replace with real logic)
  const progressPercentage = 65;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent card click when clicking on dropdowns or calendar
    if ((e.target as HTMLElement).closest('.dropdown-trigger') || 
        (e.target as HTMLElement).closest('.calendar-trigger')) {
      return;
    }
    onClick();
  };

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
    >
      {/* Top Section with Folders */}
      <div className="relative h-48 overflow-hidden border-l-4 border-l-gray-800">
        <ImageWithFallback
          src={transaction.image}
          alt={transaction.address}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Card Content */}
      <div className="p-4 relative">
        {/* Address */}
        <h3 className="mb-4">
          {transaction.address}, {transaction.city}, {transaction.state} {transaction.zipCode}
        </h3>
        
        {/* Type Dropdown */}
        <div className="mb-3 flex items-center gap-2">
          <span className="text-sm text-gray-600 min-w-[60px]">Type:</span>
          <div className="dropdown-trigger relative flex-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTypeDropdown(!showTypeDropdown);
                setShowStatusDropdown(false);
              }}
              className="flex items-center justify-between w-full text-sm hover:text-blue-600 transition-colors"
            >
              <span className="underline">{selectedType}</span>
              {showTypeDropdown ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
            
            {showTypeDropdown && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border rounded shadow-lg z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedType('Listing');
                    setShowTypeDropdown(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-blue-500 hover:text-white transition-colors"
                >
                  Listing for Sale
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedType('Lease Listing');
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
                    setSelectedType('Lease Listing');
                    setShowTypeDropdown(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-blue-500 hover:text-white transition-colors"
                >
                  Lease
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedType('Listing');
                    setShowTypeDropdown(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-blue-500 hover:text-white transition-colors"
                >
                  Real Estate Other
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedType('Listing');
                    setShowTypeDropdown(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-blue-500 hover:text-white transition-colors"
                >
                  Other
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Status Dropdown */}
        <div className="mb-3 flex items-center gap-2">
          <span className="text-sm text-gray-600 min-w-[60px]">Status:</span>
          <div className="dropdown-trigger relative flex-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowStatusDropdown(!showStatusDropdown);
                setShowTypeDropdown(false);
              }}
              className="flex items-center justify-between w-full text-sm hover:text-blue-600 transition-colors"
            >
              <span className="underline">{selectedStatus}</span>
              {showStatusDropdown ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
            
            {showStatusDropdown && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border rounded shadow-lg z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedStatus('Pre-contract');
                    setShowStatusDropdown(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-blue-500 hover:text-white transition-colors"
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

        {/* Price */}
        <div className="mb-3 flex items-center gap-2">
          <span className="text-sm text-gray-600 min-w-[60px]">Price:</span>
          <span className="text-sm">${transaction.price.toLocaleString()}</span>
        </div>

        {/* Created Date */}
        <div className="mb-4 flex items-center gap-2">
          <span className="text-sm text-gray-600 min-w-[60px]">Created:</span>
          <span className="text-sm">{transaction.listDate || '11/06/2025, 3:11 PM'}</span>
        </div>

        {/* Bottom Row: Archive Button & Progress Circle */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              // Handle archive action
            }}
            className="text-gray-600 hover:text-gray-900"
          >
            <Archive className="h-4 w-4 mr-2" />
            Archive
          </Button>

          {/* Circular Progress Indicator with Calendar */}
          <Popover open={showCalendar} onOpenChange={setShowCalendar}>
            <PopoverTrigger asChild>
              <div 
                className="relative w-20 h-20 calendar-trigger cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCalendar(!showCalendar);
                }}
              >
                <svg className="w-20 h-20 transform -rotate-90">
                  {/* Background circle */}
                  <circle
                    cx="40"
                    cy="40"
                    r="35"
                    stroke="#E5E7EB"
                    strokeWidth="8"
                    fill="none"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="40"
                    cy="40"
                    r="35"
                    stroke="#3B82F6"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xs text-gray-600">Closing</span>
                  <span className="text-xs font-medium">
                    {closingDate ? closingDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' }).replace(/\//g, '.') : '11.30.25'}
                  </span>
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent 
              className="w-auto p-0 calendar-trigger" 
              align="end"
              onClick={(e) => e.stopPropagation()}
            >
              <Calendar
                mode="single"
                selected={closingDate}
                onSelect={(date) => {
                  setClosingDate(date);
                  setShowCalendar(false);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
