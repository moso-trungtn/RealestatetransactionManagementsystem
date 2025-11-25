import { useState } from 'react';
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/select";
import { Textarea } from "@/components/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/radio-group";
import { Checkbox } from "@/components/checkbox";
import { Avatar, AvatarFallback } from "@/components/avatar";
import { X, Upload, Home, Check, Plus, MoreHorizontal, Trash2, Info } from 'lucide-react';
import { toast } from 'sonner';
import { Toaster } from "@/components/sonner";

interface NewTransactionProps {
  onClose: () => void;
  onSave: (data: any) => void;
  editMode?: boolean;
  existingData?: any;
}

type Section = 
  | 'type'
  | 'client-info'
  | 'property-info'
  | 'transactions'
  | 'offer'
  | 'parties';

interface Party {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  cellPhone: string;
  homePhone: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  role: string;
}

interface Condition {
  id: string;
  name: string;
  dueType: string;
  relativeTimeframe: string;
  relativeDate: string;
  notes: string;
}

export function NewTransaction({ onClose, onSave, editMode = false, existingData }: NewTransactionProps) {
  const [currentSection, setCurrentSection] = useState<Section>('type');
  const [showAddPartyModal, setShowAddPartyModal] = useState(false);
  const [showPartyForm, setShowPartyForm] = useState(false);
  const [partySearchQuery, setPartySearchQuery] = useState('');
  const [parties, setParties] = useState<Party[]>([]);
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [saveToContacts, setSaveToContacts] = useState(false);
  const [showAddConditionModal, setShowAddConditionModal] = useState(false);
  const [conditionFormData, setConditionFormData] = useState({
    name: '',
    dueType: 'relative',
    relativeTimeframe: 'on',
    relativeDate: '',
    notes: ''
  });
  
  const [formData, setFormData] = useState({
    // Type
    transactionType: existingData?.type || '',
    
    // Client Information
    fullName: existingData?.clientName || '',
    middleName: '',
    email: '',
    phone: '',
    relationship: '',
    
    // Property Information
    streetAddress: existingData?.address || '',
    unit: '',
    zipCode: existingData?.zipCode || '',
    city: existingData?.city || '',
    state: existingData?.state || '',
    county: '',
    propertyValue: existingData?.price?.toString() || '',
    
    // Important Dates
    contractDate: existingData?.contractDate || '',
    closingDate: existingData?.closingDate || '',
    approvedContingency: '',
    loanContingency: '',
    
    // Transactions
    salePrice: existingData?.price?.toString() || '',
    lastAgreed: '',
    purchasePrice: existingData?.price?.toString() || '',
    approvedDate: '',
    appraisalOrdered: false,
    escrowNumber: existingData?.mlsNumber || '',
    lenderName: '',
    mlsCoordinator: '',
    agentTeam: '',
    listingAgent: '',
    
    // Purchase Information
    buyerFirstName: '',
    buyerLastName: '',
    buyerCompany: '',
    buyerEmail: '',
    buyerPhone: '',
    sellerFirstName: '',
    sellerLastName: '',
    sellerCompany: '',
    sellerEmail: '',
    sellerPhone: '',
    escrowCompany: '',
    escrowEmail: '',
    escrowPhone: '',
    
    // Offer
    offerPurchasePrice: '$1,000,000.00',
    deposit: '$30,000.00',
    offerDate: 'Oct 22, 2025',
    offerExpirationDate: 'Oct 25, 2025',
    offerAcceptanceDate: '',
    finalWalkthroughDate: '',
    offerClosingDate: 'Nov 21, 2025',
    possessionDate: '',
    
    // Parties
    partyFirstName: '',
    partyMiddleName: '',
    partyLastName: '',
    partyEmail: '',
    partyCellPhone: '',
    partyHomePhone: '',
    partyStreetAddress: '',
    partyCity: '',
    partyState: '',
    partyZipCode: '',
    partyRole: ''
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const sectionOrder: Section[] = [
    'type',
    'client-info',
    'property-info',
    'transactions',
    'offer',
    'parties'
  ];

  const sectionToStep = (section: Section): number => {
    return sectionOrder.indexOf(section) + 1;
  };

  const currentStep = sectionToStep(currentSection);
  const currentSectionIndex = sectionOrder.indexOf(currentSection);

  const steps = [
    { number: 1, label: 'Type', completed: currentStep > 1 },
    { number: 2, label: 'Client information', completed: currentStep > 2 },
    { number: 3, label: 'Property information', completed: currentStep > 3 },
    { number: 4, label: 'Transactions', completed: currentStep > 4 },
    { number: 5, label: 'Offer', completed: currentStep > 5 },
    { number: 6, label: 'Parties', completed: currentStep > 6 }
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
    onSave({ ...formData, parties, conditions });
  };

  const handleAddCondition = () => {
    setShowAddConditionModal(true);
    setConditionFormData({
      name: '',
      dueType: 'relative',
      relativeTimeframe: 'on',
      relativeDate: '',
      notes: ''
    });
  };

  const handleSaveCondition = () => {
    if (!conditionFormData.name) {
      toast.error('Condition name is required');
      return;
    }
    
    const newCondition: Condition = {
      id: Date.now().toString(),
      name: conditionFormData.name,
      dueType: conditionFormData.dueType,
      relativeTimeframe: conditionFormData.relativeTimeframe,
      relativeDate: conditionFormData.relativeDate,
      notes: conditionFormData.notes
    };
    setConditions([...conditions, newCondition]);
    setShowAddConditionModal(false);
    toast.success('Condition added successfully');
  };

  const handleCancelCondition = () => {
    setShowAddConditionModal(false);
  };

  const handleConditionFormChange = (field: string, value: any) => {
    setConditionFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDeleteCondition = (id: string) => {
    setConditions(conditions.filter(c => c.id !== id));
    toast.success('Condition deleted');
  };

  const handleAddParty = () => {
    setShowAddPartyModal(true);
    setPartySearchQuery('');
    setShowPartyForm(false);
  };

  const handleCreateNewParty = () => {
    setShowPartyForm(true);
  };

  const handleSaveParty = () => {
    const newParty: Party = {
      id: Date.now().toString(),
      firstName: formData.partyFirstName,
      middleName: formData.partyMiddleName,
      lastName: formData.partyLastName,
      email: formData.partyEmail,
      cellPhone: formData.partyCellPhone,
      homePhone: formData.partyHomePhone,
      streetAddress: formData.partyStreetAddress,
      city: formData.partyCity,
      state: formData.partyState,
      zipCode: formData.partyZipCode,
      role: formData.partyRole
    };
    setParties([...parties, newParty]);
    setShowAddPartyModal(false);
    setShowPartyForm(false);
    setSaveToContacts(false);
    // Reset party form fields
    handleInputChange('partyFirstName', '');
    handleInputChange('partyMiddleName', '');
    handleInputChange('partyLastName', '');
    handleInputChange('partyEmail', '');
    handleInputChange('partyCellPhone', '');
    handleInputChange('partyHomePhone', '');
    handleInputChange('partyStreetAddress', '');
    handleInputChange('partyCity', '');
    handleInputChange('partyState', '');
    handleInputChange('partyZipCode', '');
    handleInputChange('partyRole', '');
  };

  const handleCancelParty = () => {
    setShowAddPartyModal(false);
    setShowPartyForm(false);
    setSaveToContacts(false);
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const getAvatarColor = (id: string) => {
    const colors = ['bg-orange-100 text-orange-700', 'bg-blue-100 text-blue-700', 'bg-green-100 text-green-700', 'bg-purple-100 text-purple-700', 'bg-pink-100 text-pink-700', 'bg-yellow-100 text-yellow-700'];
    const index = parseInt(id) % colors.length;
    return colors[index];
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
          <div className="flex items-center justify-between max-w-full mx-auto overflow-x-auto">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center min-w-0">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ${
                      step.completed
                        ? 'bg-gray-800 text-white'
                        : currentStep === step.number
                        ? 'bg-teal-600 text-white'
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
                  <div className={`h-0.5 w-8 mx-2 flex-shrink-0 -mt-6 ${
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
            {currentSection === 'type' && (
              <div className="space-y-6">
                <h2 className="text-2xl">Type</h2>
                <RadioGroup
                  value={formData.transactionType}
                  onValueChange={(value) => handleInputChange('transactionType', value)}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="purchase" id="purchase" />
                    <Label htmlFor="purchase" className="flex-1 cursor-pointer flex items-center gap-2">
                      <Home className="h-5 w-5 text-orange-600" />
                      <span>Purchase</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="listing" id="listing" />
                    <Label htmlFor="listing" className="flex-1 cursor-pointer flex items-center gap-2">
                      <Home className="h-5 w-5 text-orange-600" />
                      <span>Listing</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="lease" id="lease" />
                    <Label htmlFor="lease" className="flex-1 cursor-pointer flex items-center gap-2">
                      <Home className="h-5 w-5 text-orange-600" />
                      <span>Lease Listing</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {currentSection === 'client-info' && (
              <div className="space-y-6">
                <h2 className="text-2xl">Client Information</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Full name</Label>
                    <Input
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Middle name (optional)</Label>
                    <Input
                      value={formData.middleName}
                      onChange={(e) => handleInputChange('middleName', e.target.value)}
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
                  />
                </div>

                <div>
                  <Label>Phone</Label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="(212) 123-2121"
                  />
                </div>

                <div>
                  <Label>Relationship (optional)</Label>
                  <Select
                    value={formData.relationship}
                    onValueChange={(value) => handleInputChange('relationship', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="buyer">Buyer</SelectItem>
                      <SelectItem value="seller">Seller</SelectItem>
                      <SelectItem value="tenant">Tenant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {currentSection === 'property-info' && (
              <div className="space-y-6">
                <h2 className="text-2xl">Property Information</h2>

                <div>
                  <Label>Street Address</Label>
                  <Input
                    value={formData.streetAddress}
                    onChange={(e) => handleInputChange('streetAddress', e.target.value)}
                  />
                </div>

                <div>
                  <Label>Unit (optional)</Label>
                  <Input
                    value={formData.unit}
                    onChange={(e) => handleInputChange('unit', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Zip code</Label>
                    <Input
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>City</Label>
                    <Input
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>State</Label>
                    <Input
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>County (optional)</Label>
                    <Input
                      value={formData.county}
                      onChange={(e) => handleInputChange('county', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label>Property value (optional)</Label>
                  <Input
                    value={formData.propertyValue}
                    onChange={(e) => handleInputChange('propertyValue', e.target.value)}
                  />
                </div>
              </div>
            )}



            {currentSection === 'transactions' && (
              <div className="space-y-6">
                <h2 className="text-2xl">Transactions</h2>

                <div>
                  <Label>Sale price (optional)</Label>
                  <Input
                    value={formData.salePrice}
                    onChange={(e) => handleInputChange('salePrice', e.target.value)}
                  />
                </div>

                <div>
                  <Label>Last agreed (optional)</Label>
                  <Input
                    value={formData.lastAgreed}
                    onChange={(e) => handleInputChange('lastAgreed', e.target.value)}
                  />
                </div>

                <div>
                  <Label>Purchase Price (optional)</Label>
                  <Input
                    value={formData.purchasePrice}
                    onChange={(e) => handleInputChange('purchasePrice', e.target.value)}
                  />
                </div>

                <div>
                  <Label>Approved date (optional)</Label>
                  <Input
                    type="date"
                    value={formData.approvedDate}
                    onChange={(e) => handleInputChange('approvedDate', e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="appraisalOrdered"
                    checked={formData.appraisalOrdered}
                    onCheckedChange={(checked) => handleInputChange('appraisalOrdered', checked)}
                  />
                  <Label htmlFor="appraisalOrdered">Appraisal ordered</Label>
                </div>

                <div>
                  <Label>Escrow number (optional)</Label>
                  <Input
                    value={formData.escrowNumber}
                    onChange={(e) => handleInputChange('escrowNumber', e.target.value)}
                  />
                </div>

                <div>
                  <Label>Lender name (optional)</Label>
                  <Input
                    value={formData.lenderName}
                    onChange={(e) => handleInputChange('lenderName', e.target.value)}
                  />
                </div>

                <div>
                  <Label>MLS coordinator (optional)</Label>
                  <Select
                    value={formData.mlsCoordinator}
                    onValueChange={(value) => handleInputChange('mlsCoordinator', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="coordinator1">Coordinator 1</SelectItem>
                      <SelectItem value="coordinator2">Coordinator 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Agent team (optional)</Label>
                  <Select
                    value={formData.agentTeam}
                    onValueChange={(value) => handleInputChange('agentTeam', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="team1">Team 1</SelectItem>
                      <SelectItem value="team2">Team 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Listing agent (optional)</Label>
                  <Input
                    value={formData.listingAgent}
                    onChange={(e) => handleInputChange('listingAgent', e.target.value)}
                  />
                </div>
              </div>
            )}



            {currentSection === 'offer' && (
              <div className="space-y-6">
                <h2 className="text-2xl">Offer</h2>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Purchase Price</Label>
                    <Input
                      value={formData.offerPurchasePrice}
                      onChange={(e) => handleInputChange('offerPurchasePrice', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Deposit</Label>
                    <Input
                      value={formData.deposit}
                      onChange={(e) => handleInputChange('deposit', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Offer Date</Label>
                    <Input
                      value={formData.offerDate}
                      onChange={(e) => handleInputChange('offerDate', e.target.value)}
                      placeholder="MMM d, yyyy"
                    />
                  </div>
                  <div>
                    <Label>Offer Expiration Date</Label>
                    <Input
                      value={formData.offerExpirationDate}
                      onChange={(e) => handleInputChange('offerExpirationDate', e.target.value)}
                      placeholder="MMM d, yyyy"
                    />
                  </div>
                  <div>
                    <Label>Offer Acceptance Date</Label>
                    <Input
                      value={formData.offerAcceptanceDate}
                      onChange={(e) => handleInputChange('offerAcceptanceDate', e.target.value)}
                      placeholder="MMM d, yyyy"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Final Walkthrough Date</Label>
                    <Input
                      value={formData.finalWalkthroughDate}
                      onChange={(e) => handleInputChange('finalWalkthroughDate', e.target.value)}
                      placeholder="MMM d, yyyy"
                    />
                  </div>
                  <div>
                    <Label>Closing Date</Label>
                    <Input
                      value={formData.offerClosingDate}
                      onChange={(e) => handleInputChange('offerClosingDate', e.target.value)}
                      placeholder="MMM d, yyyy"
                    />
                  </div>
                  <div>
                    <Label>Possession Date</Label>
                    <Input
                      value={formData.possessionDate}
                      onChange={(e) => handleInputChange('possessionDate', e.target.value)}
                      placeholder="MMM d, yyyy"
                    />
                  </div>
                </div>

                <div className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl">Conditions</h3>
                    <Button 
                      variant="outline" 
                      className="gap-2"
                      onClick={handleAddCondition}
                    >
                      <Plus className="h-4 w-4" />
                      Add Condition
                    </Button>
                  </div>
                  
                  {conditions.length === 0 ? (
                    <p className="text-gray-400 text-sm">
                      There are no conditions to display. Use the Add button to add conditions.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {conditions.map((condition) => (
                        <div key={condition.id} className="flex items-start gap-2 p-3 border rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">{condition.name}</span>
                            </div>
                            {condition.relativeDate && (
                              <div className="text-sm text-gray-600">
                                {condition.relativeTimeframe} {condition.relativeDate}
                              </div>
                            )}
                            {condition.notes && (
                              <div className="text-sm text-gray-500 mt-1">
                                {condition.notes}
                              </div>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteCondition(condition.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {currentSection === 'parties' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl">Transaction Parties</h2>
                  <Button 
                    className="bg-green-700 hover:bg-green-800 text-white"
                    onClick={handleAddParty}
                  >
                    Add Party
                  </Button>
                </div>

                {parties.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">
                    No parties added yet. Click "Add Party" to get started.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {parties.map((party) => (
                      <div key={party.id} className="flex items-center justify-between border-b pb-3">
                        <div className="flex items-center gap-3">
                          <Avatar className={`h-10 w-10 ${getAvatarColor(party.id)}`}>
                            <AvatarFallback>
                              {getInitials(party.firstName, party.lastName)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <span>{party.firstName} {party.lastName}</span>
                              {party.role === 'buyer-agent' && (
                                <span className="text-xs bg-gray-800 text-white px-2 py-0.5 rounded">Me</span>
                              )}
                            </div>
                            <p className="text-sm text-gray-500">{party.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-600">{party.role}</span>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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
            className="bg-orange-600 hover:bg-orange-700 text-white"
          >
            {isLastSection ? (editMode ? 'Update Transaction' : 'Create Transaction') : 'Next'}
          </Button>
        </div>
      </div>

      {/* Add Condition Modal */}
      {showAddConditionModal && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl">
            <div className="p-6 border-b">
              <h2 className="text-2xl">Add Condition</h2>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <Label>Condition Name</Label>
                <Select
                  value={conditionFormData.name}
                  onValueChange={(value) => handleConditionFormChange('name', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Appraisal">Appraisal</SelectItem>
                    <SelectItem value="Inspection">Inspection</SelectItem>
                    <SelectItem value="Financing">Financing</SelectItem>
                    <SelectItem value="Title Review">Title Review</SelectItem>
                    <SelectItem value="HOA Documents">HOA Documents</SelectItem>
                    <SelectItem value="Disclosure Review">Disclosure Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Due</Label>
                <Select
                  value={conditionFormData.dueType}
                  onValueChange={(value) => handleConditionFormChange('dueType', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relative">Due Relative to Transaction Date</SelectItem>
                    <SelectItem value="specific">Specific Date</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-[120px_1fr] gap-4">
                <div>
                  <Label>Timeframe</Label>
                  <Select
                    value={conditionFormData.relativeTimeframe}
                    onValueChange={(value) => handleConditionFormChange('relativeTimeframe', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="on">On</SelectItem>
                      <SelectItem value="before">Before</SelectItem>
                      <SelectItem value="after">After</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Relative Date</Label>
                  <Select
                    value={conditionFormData.relativeDate}
                    onValueChange={(value) => handleConditionFormChange('relativeDate', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select date..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="List Date">List Date</SelectItem>
                      <SelectItem value="Offer Date">Offer Date</SelectItem>
                      <SelectItem value="Acceptance Date">Acceptance Date</SelectItem>
                      <SelectItem value="Closing Date">Closing Date</SelectItem>
                      <SelectItem value="Possession Date">Possession Date</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Notes</Label>
                <Textarea
                  value={conditionFormData.notes}
                  onChange={(e) => handleConditionFormChange('notes', e.target.value)}
                  placeholder="e.g., 7 day appraisal contingency"
                  rows={4}
                />
              </div>
            </div>

            <div className="border-t p-6 flex items-center justify-end gap-3">
              <Button variant="outline" onClick={handleCancelCondition}>
                Cancel
              </Button>
              <Button 
                className="bg-green-700 hover:bg-green-800 text-white"
                onClick={handleSaveCondition}
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Add Party Modal */}
      {showAddPartyModal && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-xl">Add Party</h2>
              <Button variant="ghost" size="icon" onClick={handleCancelParty}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {!showPartyForm ? (
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Search for a contact"
                      value={partySearchQuery}
                      onChange={(e) => setPartySearchQuery(e.target.value)}
                      className="flex-1"
                    />
                    <Button 
                      className="bg-green-700 hover:bg-green-800 text-white"
                      onClick={handleCreateNewParty}
                    >
                      Create New
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 text-center py-4">
                    Search for existing contacts by entering their first name, last name or email in the search bar.
                  </p>
                  <p className="text-sm text-gray-500 text-center">
                    To create a new contact, click Create New.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label>Role</Label>
                    <Select
                      value={formData.partyRole}
                      onValueChange={(value) => handleInputChange('partyRole', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="buyer">Buyer</SelectItem>
                        <SelectItem value="seller">Seller</SelectItem>
                        <SelectItem value="buyer-agent">Buyer's Agent</SelectItem>
                        <SelectItem value="seller-agent">Seller's Agent</SelectItem>
                        <SelectItem value="escrow">Escrow Officer</SelectItem>
                        <SelectItem value="lender">Lender</SelectItem>
                        <SelectItem value="title">Title Officer</SelectItem>
                        <SelectItem value="inspector">Inspector</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label>First Name</Label>
                      <Input
                        value={formData.partyFirstName}
                        onChange={(e) => handleInputChange('partyFirstName', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Middle Name</Label>
                      <Input
                        value={formData.partyMiddleName}
                        onChange={(e) => handleInputChange('partyMiddleName', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Last Name</Label>
                      <Input
                        value={formData.partyLastName}
                        onChange={(e) => handleInputChange('partyLastName', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label>Email</Label>
                      <Input
                        type="email"
                        value={formData.partyEmail}
                        onChange={(e) => handleInputChange('partyEmail', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Cell Phone</Label>
                      <Input
                        value={formData.partyCellPhone}
                        onChange={(e) => handleInputChange('partyCellPhone', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Home Phone</Label>
                      <Input
                        value={formData.partyHomePhone}
                        onChange={(e) => handleInputChange('partyHomePhone', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-4">
                      <Label>Street Address</Label>
                      <Input
                        value={formData.partyStreetAddress}
                        onChange={(e) => handleInputChange('partyStreetAddress', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>City</Label>
                      <Input
                        value={formData.partyCity}
                        onChange={(e) => handleInputChange('partyCity', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>State</Label>
                      <Input
                        value={formData.partyState}
                        onChange={(e) => handleInputChange('partyState', e.target.value)}
                      />
                    </div>
                    <div className="col-span-2">
                      <Label>Zip Code</Label>
                      <Input
                        value={formData.partyZipCode}
                        onChange={(e) => handleInputChange('partyZipCode', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="saveToContacts"
                      checked={saveToContacts}
                      onCheckedChange={(checked) => setSaveToContacts(checked as boolean)}
                    />
                    <Label htmlFor="saveToContacts" className="flex items-center gap-1">
                      Save to Contacts
                      <Info className="h-4 w-4 text-gray-400" />
                    </Label>
                  </div>
                </div>
              )}
            </div>

            {showPartyForm && (
              <div className="border-t p-6 flex items-center justify-end gap-3">
                <Button variant="outline" onClick={handleCancelParty}>
                  Cancel
                </Button>
                <Button 
                  className="bg-green-700 hover:bg-green-800 text-white"
                  onClick={handleSaveParty}
                >
                  Save
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
