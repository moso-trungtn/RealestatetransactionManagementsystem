import { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { Button } from "@/components/button";
import { Checkbox } from "@/components/checkbox";

interface Task {
  id: string;
  created: string;
  updated: string;
  type: string;
  description: string;
  note: string;
  phase: 'listing' | 'offer' | 'escrow' | 'closing';
  completedType?: 'done' | 'skip';
}

const initialTasks: Task[] = [
  {
    id: '1',
    created: '10/29/2025, 8:52:45 PM',
    updated: '10/29/2025, 8:52:45 PM',
    type: 'Automatically',
    description: 'Maria Testcase: Latest 2 months bank statements',
    note: '2 hour(s) ago',
    phase: 'listing'
  },
  {
    id: '2',
    created: '10/29/2025, 8:52:34 PM',
    updated: '10/29/2025, 8:52:34 PM',
    type: 'Automatically',
    description: 'Provide Payoff Statement',
    note: '2 hour(s) ago',
    phase: 'listing'
  },
  {
    id: '3',
    created: '10/29/2025, 8:52:33 PM',
    updated: '10/29/2025, 8:52:33 PM',
    type: 'Automatically',
    description: 'Unexpired Photo ID (Drive License or Passport)',
    note: '2 hour(s) ago',
    phase: 'listing'
  },
  {
    id: '4',
    created: '10/29/2025, 8:50:12 PM',
    updated: '10/29/2025, 8:50:12 PM',
    type: 'Automatically',
    description: 'Purchase Agreement Review',
    note: '3 hour(s) ago',
    phase: 'offer'
  },
  {
    id: '5',
    created: '10/29/2025, 8:49:45 PM',
    updated: '10/29/2025, 8:49:45 PM',
    type: 'Automatically',
    description: 'Earnest Money Deposit Confirmation',
    note: '3 hour(s) ago',
    phase: 'offer'
  },
  {
    id: '6',
    created: '10/29/2025, 8:48:22 PM',
    updated: '10/29/2025, 8:48:22 PM',
    type: 'Automatically',
    description: 'Schedule Home Inspection',
    note: '3 hour(s) ago',
    phase: 'escrow'
  },
  {
    id: '7',
    created: '10/29/2025, 8:47:15 PM',
    updated: '10/29/2025, 8:47:15 PM',
    type: 'Automatically',
    description: 'Title Report Review',
    note: '3 hour(s) ago',
    phase: 'escrow'
  },
  {
    id: '8',
    created: '10/29/2025, 8:46:30 PM',
    updated: '10/29/2025, 8:46:30 PM',
    type: 'Automatically',
    description: 'Final Walk-Through',
    note: '4 hour(s) ago',
    phase: 'closing'
  },
  {
    id: '9',
    created: '10/29/2025, 8:45:50 PM',
    updated: '10/29/2025, 8:45:50 PM',
    type: 'Automatically',
    description: 'Wire Transfer Instructions',
    note: '4 hour(s) ago',
    phase: 'closing'
  },
];

export function TransactionChecklistTable() {
  const [currentTasks, setCurrentTasks] = useState<Task[]>(initialTasks);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [selectedPhase, setSelectedPhase] = useState<'listing' | 'offer' | 'escrow' | 'closing'>('listing');
  const [taskStatus, setTaskStatus] = useState<'current' | 'completed'>('current');
  const [selectedTasks, setSelectedTasks] = useState<Set<string>>(new Set());

  const handleTaskAction = (taskId: string, action: 'done' | 'skip') => {
    const task = currentTasks.find(t => t.id === taskId);
    if (task) {
      const completedTask = { ...task, completedType: action };
      setCompletedTasks([...completedTasks, completedTask]);
      setCurrentTasks(currentTasks.filter(t => t.id !== taskId));
      setSelectedTasks(prev => {
        const newSet = new Set(prev);
        newSet.delete(taskId);
        return newSet;
      });
    }
  };

  const toggleTaskSelection = (taskId: string) => {
    setSelectedTasks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(taskId)) {
        newSet.delete(taskId);
      } else {
        newSet.add(taskId);
      }
      return newSet;
    });
  };

  const toggleAllTasks = () => {
    const visibleTasks = taskStatus === 'current' 
      ? currentTasks.filter(t => t.phase === selectedPhase)
      : completedTasks.filter(t => t.phase === selectedPhase);
    
    if (selectedTasks.size === visibleTasks.length) {
      setSelectedTasks(new Set());
    } else {
      setSelectedTasks(new Set(visibleTasks.map(t => t.id)));
    }
  };

  const phaseTabs = [
    { id: 'listing' as const, label: 'Listing', color: 'text-[#F54900]', bgColor: 'bg-orange-50', borderColor: 'border-[#F54900]' },
    { id: 'offer' as const, label: 'Offer', color: 'text-[#F54900]', bgColor: 'bg-orange-50', borderColor: 'border-[#F54900]' },
    { id: 'escrow' as const, label: 'Escrow', color: 'text-[#F54900]', bgColor: 'bg-orange-50', borderColor: 'border-[#F54900]' },
    { id: 'closing' as const, label: 'Closing', color: 'text-[#F54900]', bgColor: 'bg-orange-50', borderColor: 'border-[#F54900]' },
  ];

  const visibleTasks = taskStatus === 'current' 
    ? currentTasks.filter(t => t.phase === selectedPhase)
    : completedTasks.filter(t => t.phase === selectedPhase);

  const allTasksSelected = visibleTasks.length > 0 && selectedTasks.size === visibleTasks.length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Top Action Bar */}
        <div className="bg-white rounded-t-lg shadow-sm border-b px-4 py-3 flex items-center gap-3">
          <Button size="sm" variant="outline" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            History
          </Button>
          <Button size="sm" className="bg-[#FF7333] hover:bg-[#E65F1F] text-white">
            Clear
          </Button>
          <Button size="sm" variant="outline">
            Reset
          </Button>
          <Button size="sm" className="bg-[#FF7333] hover:bg-[#E65F1F] text-white">
            + Borrower to-do
          </Button>
          <div className="ml-auto">
            <Button size="sm" variant="outline" className="text-[#F54900]">
              Reset filters
            </Button>
          </div>
        </div>

        {/* Phase Tabs */}
        <div className="bg-white border-b">
          <div className="flex">
            {phaseTabs.map(phase => (
              <button
                key={phase.id}
                onClick={() => setSelectedPhase(phase.id)}
                className={`px-6 py-3 font-medium text-sm transition-colors relative ${
                  selectedPhase === phase.id 
                    ? `${phase.color} ${phase.bgColor}` 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {phase.label}
                {selectedPhase === phase.id && (
                  <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${phase.borderColor.replace('border-', 'bg-')}`} />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Current/Completed Tasks Toggle */}
        <div className="bg-white border-b flex">
          <button
            onClick={() => setTaskStatus('current')}
            className={`px-6 py-3 font-medium text-sm transition-colors flex-1 ${
              taskStatus === 'current'
                ? 'bg-[#FF7333] text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Current
          </button>
          <button
            onClick={() => setTaskStatus('completed')}
            className={`px-6 py-3 font-medium text-sm transition-colors flex-1 ${
              taskStatus === 'completed'
                ? 'bg-gray-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Completed
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-b-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left w-12">
                    <Checkbox 
                      checked={allTasksSelected}
                      onCheckedChange={toggleAllTasks}
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Created</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Updated</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Description</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Note</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Action</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Upload</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Uploaded files</th>
                </tr>
              </thead>
              <tbody>
                {visibleTasks.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-8 text-center text-gray-500">
                      No {taskStatus} tasks in {selectedPhase} phase
                    </td>
                  </tr>
                ) : (
                  visibleTasks.map((task, index) => (
                    <tr 
                      key={task.id}
                      className={`border-b hover:bg-gray-50 transition-colors ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                      }`}
                    >
                      <td className="px-4 py-3">
                        <Checkbox 
                          checked={selectedTasks.has(task.id)}
                          onCheckedChange={() => toggleTaskSelection(task.id)}
                        />
                      </td>
                      <td className="px-4 py-3 text-sm">{task.created}</td>
                      <td className="px-4 py-3 text-sm">{task.updated}</td>
                      <td className="px-4 py-3 text-sm">{task.type}</td>
                      <td className="px-4 py-3">
                        <div className="text-sm text-[#F54900] hover:underline cursor-pointer">
                          {task.description}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-orange-600">{task.note}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {taskStatus === 'current' ? (
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              className="bg-green-600 hover:bg-green-700 text-white"
                              onClick={() => handleTaskAction(task.id, 'done')}
                            >
                              Done
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleTaskAction(task.id, 'skip')}
                            >
                              Skip
                            </Button>
                          </div>
                        ) : (
                          <span className="text-sm font-medium text-gray-600">
                            {task.completedType === 'done' ? 'Completed' : 'Skipped'}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <Button size="sm" variant="outline" className="bg-gray-700 text-white hover:bg-gray-800">
                          Upload
                        </Button>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        -
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
