import { useState } from 'react';
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { X, Trash2, DollarSign } from 'lucide-react';
import { toast } from 'sonner';
import { Toaster } from "@/components/sonner";

interface CommissionParty {
  id: string;
  name: string;
  role: string;
  percentage: number;
  amount: number;
}

interface CommissionSplitProps {
  totalCommission: number;
  onSave?: (data: any) => void;
}

export function CommissionSplit({ totalCommission, onSave }: CommissionSplitProps) {
  const [commission, setCommission] = useState(totalCommission || 0);
  const [parties, setParties] = useState<CommissionParty[]>([
    {
      id: '1',
      name: 'User 1',
      role: 'Broker',
      percentage: 10,
      amount: (totalCommission || 0) * 0.10
    },
    {
      id: '2',
      name: 'User 2',
      role: 'Buyer Agent',
      percentage: 15,
      amount: (totalCommission || 0) * 0.15
    },
    {
      id: 'blank',
      name: '',
      role: '',
      percentage: 0,
      amount: 0
    }
  ]);

  // Currency formatting helpers
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const parseCurrency = (value: string): number => {
    // Remove currency symbols, commas, and spaces
    const cleaned = value.replace(/[$,\s]/g, '');
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  };



  const removeParty = (id: string) => {
    setParties(prevParties => {
      const filtered = prevParties.filter(p => p.id !== id);
      
      // Make sure we always have at least one blank row
      const hasBlankRow = filtered.some(p => !p.name && !p.role);
      if (!hasBlankRow) {
        return [
          ...filtered,
          {
            id: `blank-${Date.now()}`,
            name: '',
            role: '',
            percentage: 0,
            amount: 0
          }
        ];
      }
      
      return filtered;
    });
  };

  const updateParty = (id: string, field: keyof CommissionParty, value: any) => {
    setParties(prevParties => {
      const updatedParties = prevParties.map(p => {
        if (p.id === id) {
          const updated = { ...p, [field]: value };
          
          // Update amount when percentage changes
          if (field === 'percentage') {
            updated.amount = (commission * value) / 100;
          }
          // Update percentage when amount changes
          else if (field === 'amount') {
            updated.percentage = commission > 0 ? (value / commission) * 100 : 0;
          }
          
          return updated;
        }
        return p;
      });
      
      // Check if the updated party was the blank row and now has content
      const updatedParty = updatedParties.find(p => p.id === id);
      const isBlankRow = id === 'blank' || id.startsWith('blank-');
      const hasContent = updatedParty && (updatedParty.name || updatedParty.role);
      
      // If the blank row now has content, add a new blank row
      if (isBlankRow && hasContent) {
        const lastParty = updatedParties[updatedParties.length - 1];
        const isLastRowBlank = lastParty && !lastParty.name && !lastParty.role;
        
        if (!isLastRowBlank) {
          return [
            ...updatedParties,
            {
              id: `blank-${Date.now()}`,
              name: '',
              role: '',
              percentage: 0,
              amount: 0
            }
          ];
        }
      }
      
      return updatedParties;
    });
  };

  // Filter out blank rows for calculations
  const filledParties = parties.filter(p => p.name || p.role);

  // Calculate total percentage
  const totalPercentage = filledParties.reduce((sum, p) => {
    return sum + p.percentage;
  }, 0);

  // Calculate total allocated amount
  const totalAllocated = filledParties.reduce((sum, party) => {
    return sum + party.amount;
  }, 0);

  const isValid = Math.abs(totalPercentage - 100) < 0.01;

  const handleSave = () => {
    if (!isValid) {
      toast.error('Commission split must equal 100%');
      return;
    }
    
    // Filter out blank rows when saving
    const splitData = {
      totalCommission: commission,
      parties: filledParties.map(p => ({
        ...p
      }))
    };
    
    onSave && onSave(splitData);
    toast.success('Commission split saved successfully!');
  };

  return (
    <div className="space-y-6">
      <Toaster />
      
      {/* Total Commission */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-sm text-gray-600">Total Commission</Label>
            <div className="flex items-center gap-2 mt-1">
              <DollarSign className="h-6 w-6 text-orange-600" />
              <Input
                type="number"
                value={commission}
                onChange={(e) => setCommission(Number(e.target.value))}
                className="text-2xl max-w-[200px]"
              />
            </div>
          </div>
          
          <div className="text-right">
            <Label className="text-sm text-gray-600">Total Percentage</Label>
            <p className={`text-2xl mt-1 ${
              totalPercentage > 100 ? 'text-red-600' : totalPercentage < 100 ? 'text-orange-600' : 'text-green-600'
            }`}>
              {totalPercentage.toFixed(1)}%
            </p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all ${
                totalPercentage > 100 ? 'bg-red-600' : 'bg-orange-600'
              }`}
              style={{ width: `${Math.min(totalPercentage, 100)}%` }}
            />
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span>Allocated: ${totalAllocated.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            <span>{totalPercentage.toFixed(1)}%</span>
          </div>
        </div>
      </div>

      {/* Commission Recipients Table */}
      <div className="space-y-4">
        <h3 className="text-lg">Commission Recipients</h3>

        {/* Table Header */}
        <div className="grid grid-cols-[1fr_1fr_120px_150px_auto] gap-4 px-4 pb-3 text-sm text-gray-600 border-b">
          <div>Name</div>
          <div>Role</div>
          <div>Percentage (%)</div>
          <div>Amount</div>
          <div></div>
        </div>

        {/* Table Rows */}
        <div className="space-y-3">
          {parties.map((party) => {
            const isBlankRow = !party.name && !party.role;
            return (
              <div key={party.id} className={`grid grid-cols-[1fr_1fr_120px_150px_auto] gap-4 items-center ${isBlankRow ? 'opacity-60' : ''}`}>
                {/* Name */}
                <div>
                  <Input
                    value={party.name}
                    onChange={(e) => updateParty(party.id, 'name', e.target.value)}
                    placeholder={isBlankRow ? "Add a recipient..." : "Enter name"}
                    className="h-12 border-gray-200"
                  />
                </div>
                
                {/* Role */}
                <div>
                  <Input
                    value={party.role}
                    onChange={(e) => updateParty(party.id, 'role', e.target.value)}
                    placeholder="Enter role"
                    className="h-12 border-gray-200"
                  />
                </div>

                {/* Percentage */}
                <div>
                  <Input
                    type="number"
                    value={party.percentage || ''}
                    onChange={(e) => updateParty(party.id, 'percentage', Number(e.target.value))}
                    placeholder="0"
                    min="0"
                    max="100"
                    step="0.1"
                    className="h-12 border-gray-200"
                    disabled={isBlankRow}
                  />
                </div>

                {/* Amount */}
                <div>
                  <Input
                    type="text"
                    value={isBlankRow ? '' : formatCurrency(party.amount)}
                    onChange={(e) => {
                      updateParty(party.id, 'amount', parseCurrency(e.target.value));
                    }}
                    placeholder="$0.00"
                    className="h-12 border-gray-200"
                    disabled={isBlankRow}
                  />
                </div>

                {/* Delete Button */}
                <div className="flex justify-center">
                  {!isBlankRow && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeParty(party.id)}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 h-12 w-12"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary */}
      <div className="border-t pt-6">
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Total Commission:</span>
            <span className="font-medium">${commission.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total Allocated:</span>
            <span className="font-medium">${totalAllocated.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total Percentage:</span>
            <span className="font-medium">{totalPercentage.toFixed(1)}%</span>
          </div>
          <div className="flex justify-between pt-2 border-t">
            <span className={totalPercentage > 100 ? 'text-red-600' : totalPercentage < 100 ? 'text-orange-600' : 'text-green-600'}>
              {totalPercentage > 100 ? 'Over-allocated' : totalPercentage < 100 ? 'Under-allocated' : 'Balanced'}
            </span>
            <span className={`${totalPercentage > 100 ? 'text-red-600' : totalPercentage < 100 ? 'text-orange-600' : 'text-green-600'}`}>
              {Math.abs(totalPercentage - 100) < 0.01 ? '✓' : `${Math.abs(100 - totalPercentage).toFixed(1)}%`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}