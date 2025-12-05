import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { X, Home, Check } from 'lucide-react';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';

interface NewTransactionProps {
  onClose: () => void;
  onSave: (data: any) => void;
  editMode?: boolean;
  existingData?: any;
}

type Section = 'property' | 'type' | 'client-info';

export function NewTransaction({ onClose, onSave, editMode = false, existingData }: NewTransactionProps) {
  const [currentSection, setCurrentSection] = useState<Section>('property');

  const [formData, setFormData] = useState({
    // Step 1: Property
    propertyAddressOrMLS: '',

    // Step 2: Type
    transactionType: existingData?.type || '',

    // Step 3: Client Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const sectionOrder: Section[] = ['property', 'type', 'client-info'];

  const sectionToStep = (section: Section): number => {
    return sectionOrder.indexOf(section) + 1;
  };

  const currentStep = sectionToStep(currentSection);
  const currentSectionIndex = sectionOrder.indexOf(currentSection);

  const steps = [
    { number: 1, label: 'Property', completed: currentStep > 1 },
    { number: 2, label: 'Type', completed: currentStep > 2 },
    { number: 3, label: 'Client Information', completed: currentStep > 3 },
  ];

  const handleNext = () => {
    const nextIndex = currentSectionIndex + 1;
    if (nextIndex < sectionOrder.length) {
      setCurrentSection(sectionOrder[nextIndex]);
    } else {
      handleSave();
    }
  };

  const handlePrevious = () => {
    const prevIndex = currentSectionIndex - 1;
    if (prevIndex >= 0) {
      setCurrentSection(sectionOrder[prevIndex]);
    }
  };

  const handleSave = () => {
    if (editMode) {
      toast.success('Transaction updated successfully!');
    } else {
      toast.success('Transaction created successfully!');
    }
    onSave(formData);
  };

  const isLastSection = currentSectionIndex === sectionOrder.length - 1;
  const isFirstSection = currentSectionIndex === 0;

  return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <Toaster />

        <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-white border-b p-6 flex items-center justify-between">
            <h1 className="text-2xl">{editMode ? 'Edit Transaction' : 'New Transaction'}</h1>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Step Indicator */}
          <div className="bg-white border-b py-8 px-6">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              {steps.map((step, index) => (
                  <div key={step.number} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ${
                              step.completed
                                  ? 'bg-gray-800 text-white'
                                  : currentStep === step.number
                                      ? 'bg-[#F36F23] text-white'
                                      : 'bg-gray-200 text-gray-500'
                          }`}
                      >
                        {step.completed ? (
                            <Check className="h-5 w-5" />
                        ) : (
                            <span>{step.number}</span>
                        )}
                      </div>
                      <span className={`text-xs mt-2 text-center whitespace-nowrap ${
                          currentStep === step.number ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                    {step.label}
                  </span>
                    </div>
                    {index < steps.length - 1 && (
                        <div className={`h-0.5 w-20 mx-2 -mt-6 ${
                            step.completed ? 'bg-gray-800' : 'bg-gray-200'
                        }`} />
                    )}
                  </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-2xl mx-auto">
              {/* Step 1: Property Address or MLS# */}
              {currentSection === 'property' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl">Property Information</h2>
                    <div>
                      <Label>Property Address or MLS#</Label>
                      <Input
                          value={formData.propertyAddressOrMLS}
                          onChange={(e) => handleInputChange('propertyAddressOrMLS', e.target.value)}
                          placeholder="Enter property address or MLS number"
                          className="mt-2"
                      />
                    </div>
                  </div>
              )}

              {/* Step 2: Type */}
              {currentSection === 'type' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl">Transaction Type</h2>
                    <RadioGroup
                        value={formData.transactionType}
                        onValueChange={(value) => handleInputChange('transactionType', value)}
                        className="space-y-3"
                    >
                      <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                        <RadioGroupItem value="purchase" id="purchase" />
                        <Label htmlFor="purchase" className="flex-1 cursor-pointer flex items-center gap-2">
                          <Home className="h-5 w-5 text-[#F36F23]" />
                          <span>Purchase</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                        <RadioGroupItem value="listing" id="listing" />
                        <Label htmlFor="listing" className="flex-1 cursor-pointer flex items-center gap-2">
                          <Home className="h-5 w-5 text-[#F36F23]" />
                          <span>Listing</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                        <RadioGroupItem value="lease" id="lease" />
                        <Label htmlFor="lease" className="flex-1 cursor-pointer flex items-center gap-2">
                          <Home className="h-5 w-5 text-[#F36F23]" />
                          <span>Lease Listing</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
              )}

              {/* Step 3: Client Information */}
              {currentSection === 'client-info' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl">Client Information</h2>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>First Name</Label>
                        <Input
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            placeholder="Enter first name"
                            className="mt-2"
                        />
                      </div>
                      <div>
                        <Label>Last Name</Label>
                        <Input
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            placeholder="Enter last name"
                            className="mt-2"
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Email</Label>
                      <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="example@gmail.com"
                          className="mt-2"
                      />
                    </div>

                    <div>
                      <Label>Phone</Label>
                      <Input
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="(212) 123-2121"
                          className="mt-2"
                      />
                    </div>
                  </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="bg-white border-t p-6 flex items-center justify-between">
            <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={isFirstSection}
            >
              Previous
            </Button>

            <Button
                onClick={handleNext}
                className="bg-[#F36F23] hover:bg-[#E05F13] text-white"
            >
              {isLastSection ? (editMode ? 'Update Transaction' : 'Create Transaction') : 'Next'}
            </Button>
          </div>
        </div>
      </div>
  );
}
