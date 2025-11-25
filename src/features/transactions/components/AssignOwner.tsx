import { useState } from 'react';
import { X, UserCircle2, Save } from 'lucide-react';
import { Button } from "@/components/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/select";
import { Transaction } from '@/types/transaction';

interface AssignOwnerProps {
  transaction: Transaction;
  onClose: () => void;
  onSave: (assignments: any) => void;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  active: number;
}

const teamMembers: TeamMember[] = [
  { id: '1', name: 'Robert Williams', role: 'Broker', active: 1 },
  { id: '2', name: 'Jessica Martinez', role: 'Agent', active: 4 },
  { id: '3', name: 'David Park', role: 'Broker', active: 2 },
  { id: '4', name: 'Sarah Johnson', role: 'Senior Agent', active: 5 },
  { id: '5', name: 'Michael Chen', role: 'Agent', active: 3 },
  { id: '6', name: 'Emily Rodriguez', role: 'Broker', active: 6 },
];

export function AssignOwner({ transaction, onClose, onSave }: AssignOwnerProps) {
  const [assignments, setAssignments] = useState({
    listingAgent: '1',
    buyerAgent: '2',
    transactionCoordinator: '3',
    supervisingBroker: '4',
  });

  const handleSave = () => {
    onSave(assignments);
    onClose();
  };

  const handleClearAll = () => {
    setAssignments({
      listingAgent: '',
      buyerAgent: '',
      transactionCoordinator: '',
      supervisingBroker: '',
    });
  };

  const getAssignedMember = (memberId: string) => {
    return teamMembers.find(m => m.id === memberId);
  };

  const renderMemberOption = (member: TeamMember) => (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
        <UserCircle2 className="h-5 w-5 text-[#F54900]" />
      </div>
      <div className="flex-1">
        <div className="font-medium text-sm">{member.name}</div>
        <div className="text-xs text-gray-500">{member.role} • {member.active} active</div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-[#F54900] text-white px-6 py-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-white/20 flex items-center justify-center">
                <UserCircle2 className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl">Assign Transaction Team</h2>
                <p className="text-sm text-orange-100 mt-1">
                  Assign team members to their roles in this transaction
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded p-1 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Transaction Info */}
        <div className="px-6 py-4 bg-gray-50 border-b">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Transaction ID:</span>
                <span className="font-medium">TXN-2024-{transaction.id.padStart(3, '0')}</span>
                <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                  Active
                </span>
              </div>
              <h3 className="text-lg mt-1">{transaction.address}</h3>
              <div className="text-sm text-gray-600">
                Type: {transaction.type} • Price: ${transaction.price.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="space-y-6">
            {/* Team Member Assignments */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <UserCircle2 className="h-5 w-5 text-[#F54900]" />
                <h3 className="font-semibold">Team Member Assignments</h3>
              </div>
              <p className="text-sm text-gray-600 mb-6">
                Assign qualified team members to each role in the transaction
              </p>

              <div className="space-y-5">
                {/* Listing Agent */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Listing Agent <span className="text-red-600">*</span>
                  </label>
                  <p className="text-xs text-gray-500 mb-2">Represents the seller in the transaction</p>
                  <Select
                    value={assignments.listingAgent}
                    onValueChange={(value) => setAssignments({ ...assignments, listingAgent: value })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue>
                        {assignments.listingAgent && renderMemberOption(getAssignedMember(assignments.listingAgent)!)}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {teamMembers.map((member) => (
                        <SelectItem key={member.id} value={member.id}>
                          <div className="flex items-center gap-3 py-1">
                            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                              <UserCircle2 className="h-5 w-5 text-[#F54900]" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-sm">{member.name}</div>
                              <div className="text-xs text-gray-500">{member.role} • {member.active} active</div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Buyer Agent */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Buyer Agent <span className="text-red-600">*</span>
                  </label>
                  <p className="text-xs text-gray-500 mb-2">Represents the buyer in the transaction</p>
                  <Select
                    value={assignments.buyerAgent}
                    onValueChange={(value) => setAssignments({ ...assignments, buyerAgent: value })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue>
                        {assignments.buyerAgent && renderMemberOption(getAssignedMember(assignments.buyerAgent)!)}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {teamMembers.map((member) => (
                        <SelectItem key={member.id} value={member.id}>
                          <div className="flex items-center gap-3 py-1">
                            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                              <UserCircle2 className="h-5 w-5 text-[#F54900]" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-sm">{member.name}</div>
                              <div className="text-xs text-gray-500">{member.role} • {member.active} active</div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Transaction Coordinator */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Transaction Coordinator
                  </label>
                  <p className="text-xs text-gray-500 mb-2">Manages paperwork and coordinates the process</p>
                  <Select
                    value={assignments.transactionCoordinator}
                    onValueChange={(value) => setAssignments({ ...assignments, transactionCoordinator: value })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue>
                        {assignments.transactionCoordinator && renderMemberOption(getAssignedMember(assignments.transactionCoordinator)!)}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {teamMembers.map((member) => (
                        <SelectItem key={member.id} value={member.id}>
                          <div className="flex items-center gap-3 py-1">
                            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                              <UserCircle2 className="h-5 w-5 text-[#F54900]" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-sm">{member.name}</div>
                              <div className="text-xs text-gray-500">{member.role} • {member.active} active</div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Supervising Broker */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Supervising Broker <span className="text-red-600">*</span>
                  </label>
                  <p className="text-xs text-gray-500 mb-2">Oversees and approves the transaction</p>
                  <Select
                    value={assignments.supervisingBroker}
                    onValueChange={(value) => setAssignments({ ...assignments, supervisingBroker: value })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue>
                        {assignments.supervisingBroker && renderMemberOption(getAssignedMember(assignments.supervisingBroker)!)}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {teamMembers.map((member) => (
                        <SelectItem key={member.id} value={member.id}>
                          <div className="flex items-center gap-3 py-1">
                            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                              <UserCircle2 className="h-5 w-5 text-[#F54900]" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-sm">{member.name}</div>
                              <div className="text-xs text-gray-500">{member.role} • {member.active} active</div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Assignment Summary */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h4 className="font-semibold text-sm text-orange-900 mb-3">Assignment Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Listing Agent:</span>
                  <span className="font-medium">{assignments.listingAgent ? getAssignedMember(assignments.listingAgent)?.name : '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Buyer Agent:</span>
                  <span className="font-medium">{assignments.buyerAgent ? getAssignedMember(assignments.buyerAgent)?.name : '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Transaction Coordinator:</span>
                  <span className="font-medium">{assignments.transactionCoordinator ? getAssignedMember(assignments.transactionCoordinator)?.name : '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Supervising Broker:</span>
                  <span className="font-medium">{assignments.supervisingBroker ? getAssignedMember(assignments.supervisingBroker)?.name : '-'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t flex items-center justify-end gap-3">
          <Button
            variant="outline"
            onClick={handleClearAll}
          >
            Clear All
          </Button>
          <Button
            className="bg-[#F54900] hover:bg-[#D63F00] text-white"
            onClick={handleSave}
          >
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
