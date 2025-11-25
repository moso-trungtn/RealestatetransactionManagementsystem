import { useState } from 'react';
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { PrimaryButton } from "@/components/primary-button";
import { Label } from "@/components/label";
import { Textarea } from "@/components/textarea";
import { Checkbox } from "@/components/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/accordion";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { Mail, Phone, MapPin, MoreHorizontal, X, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { Toaster } from "@/components/sonner";
import { useThemeColors } from "@/hooks/useThemeColors";

export function AdminProfile() {
  const { primaryColor, primaryLight } = useThemeColors();

  const [formData, setFormData] = useState({
    // Personal Information
    profilePicture: '',
    firstName: 'Chau',
    lastName: 'Chau',
    middleName: '',
    personalEmail: 'chauchau.inc@gmail.com',
    personalPhone: '(322) 334-3455',
    legalFirstName: 'Legal_given_name',
    legalLastName: 'Legal_last_name',
    preferredLanguages: ['Albanian', 'Bengali', 'Cantonese Chinese', 'English', 'Russian', 'Vietnamese'],
    maritalStatus: 'Married',
    
    // Citizenship & Personal Details
    citizenship: 'US Citizen',
    ssn: '123-56-2656',
    dateOfBirth: '1/16/2001',
    
    // Personal Address
    personalStreetAddress: '1251 Sunset Boulevard',
    personalAptUnit: '',
    personalZipCode: '29169',
    personalState: 'SC',
    personalCounty: 'LEXINGTON',
    personalCity: 'West Columbia',
    
    // Mailing Address
    sameAsPersonalAddress: true,
    mailingStreetAddress: '1251 Sunset Boulevard',
    mailingAptUnit: '',
    mailingZipCode: '29169',
    mailingCity: 'West Columbia',
    
    // Others
    note: 'have not completed the profile yet. okla',
    password: '******'
  });

  const [languageInput, setLanguageInput] = useState('');
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Auto-sync mailing address if checkbox is enabled
    if (formData.sameAsPersonalAddress && field.startsWith('personal')) {
      const mailingField = field.replace('personal', 'mailing');
      if (mailingField !== field) {
        setFormData(prev => ({
          ...prev,
          [mailingField]: value
        }));
      }
    }
  };

  const handleSameAddressChange = (checked: boolean) => {
    setFormData(prev => {
      if (checked) {
        return {
          ...prev,
          sameAsPersonalAddress: checked,
          mailingStreetAddress: prev.personalStreetAddress,
          mailingAptUnit: prev.personalAptUnit,
          mailingZipCode: prev.personalZipCode,
          mailingCity: prev.personalCity
        };
      }
      return {
        ...prev,
        sameAsPersonalAddress: checked
      };
    });
  };

  const addLanguage = (language: string) => {
    if (language.trim() && !formData.preferredLanguages.includes(language.trim())) {
      setFormData(prev => ({
        ...prev,
        preferredLanguages: [...prev.preferredLanguages, language.trim()]
      }));
      setLanguageInput('');
    }
  };

  const removeLanguage = (language: string) => {
    setFormData(prev => ({
      ...prev,
      preferredLanguages: prev.preferredLanguages.filter(lang => lang !== language)
    }));
  };

  const handleSaveProfile = () => {
    toast.success('Profile updated successfully!');
  };

  const handleChangePassword = () => {
    toast.info('Password change dialog would open here');
  };

  const handleChangeEmail = () => {
    if (isEditingEmail) {
      toast.success('Email updated successfully!');
    }
    setIsEditingEmail(!isEditingEmail);
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      <Toaster />
      
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b p-6">
          <h1 className="text-2xl">Admin Profile</h1>
        </div>
        
        <div className="p-8">
          <Accordion type="multiple" defaultValue={['personal-info', 'address', 'other']} className="space-y-4">
            
            {/* Personal Information Section */}
            <AccordionItem value="personal-info" className="border rounded-lg px-6">
              <AccordionTrigger className="hover:no-underline">
                <h2 className="text-lg">PERSONAL INFORMATION</h2>
              </AccordionTrigger>
              <AccordionContent className="pt-6 space-y-6">
                {/* Profile Picture */}
                <div className="flex items-start gap-8">
                  <Label className="w-48 pt-2">Picture (optional)</Label>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-32 w-32">
                      <AvatarImage src={formData.profilePicture} />
                      <AvatarFallback style={{ backgroundColor: primaryColor }}>
                        <ImageWithFallback 
                          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&h=200&fit=crop"
                          alt="Profile"
                          className="h-full w-full object-cover"
                        />
                      </AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload
                    </Button>
                  </div>
                </div>

                {/* Full Name */}
                <div className="flex items-start gap-8">
                  <Label className="w-48 pt-2">Full name</Label>
                  <div className="flex-1 flex gap-4">
                    <div className="flex-1 relative">
                      <Input 
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="bg-gray-100"
                      />
                      <button className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-red-500 rounded p-1 hover:bg-red-600">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                    <Input 
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>

                {/* Middle Name */}
                <div className="flex items-start gap-8">
                  <Label className="w-48 pt-2">Middle name (optional)</Label>
                  <div className="flex-1">
                    <Input 
                      value={formData.middleName}
                      onChange={(e) => handleInputChange('middleName', e.target.value)}
                    />
                  </div>
                </div>

                {/* Personal Email */}
                <div className="flex items-start gap-8">
                  <Label className="w-48 pt-2">Personal email</Label>
                  <div className="flex-1 flex gap-4">
                    <div className="flex-1 relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input 
                        value={formData.personalEmail}
                        onChange={(e) => handleInputChange('personalEmail', e.target.value)}
                        className="pl-10 bg-gray-100"
                        disabled={!isEditingEmail}
                      />
                    </div>
                    <Button 
                      variant="secondary"
                      onClick={handleChangeEmail}
                      className="bg-gray-600 hover:bg-gray-700 text-white"
                    >
                      {isEditingEmail ? 'Save' : 'Change'}
                    </Button>
                  </div>
                </div>

                {/* Personal Phone */}
                <div className="flex items-start gap-8">
                  <Label className="w-48 pt-2">Personal phone</Label>
                  <div className="flex-1 relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input 
                      value={formData.personalPhone}
                      onChange={(e) => handleInputChange('personalPhone', e.target.value)}
                      className="pl-10 bg-gray-100"
                    />
                  </div>
                </div>

                {/* Legal Full Name */}
                <div className="flex items-start gap-8">
                  <Label className="w-48 pt-2">Legal full name</Label>
                  <div className="flex-1 space-y-2">
                    <div className="flex gap-4">
                      <Input 
                        value={formData.legalFirstName}
                        onChange={(e) => handleInputChange('legalFirstName', e.target.value)}
                        className="flex-1"
                        placeholder="Legal_given_name"
                      />
                      <div className="flex-1 relative">
                        <Input 
                          value={formData.legalLastName}
                          onChange={(e) => handleInputChange('legalLastName', e.target.value)}
                          placeholder="Legal_last_name"
                        />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-red-500 rounded p-1 hover:bg-red-600">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">Based on your I-94 or Green Card</p>
                  </div>
                </div>

                {/* Preferred Languages */}
                <div className="flex items-start gap-8">
                  <Label className="w-48 pt-2">Preferred languages</Label>
                  <div className="flex-1 space-y-2">
                    <div className="border rounded-md p-3 min-h-[80px] flex flex-wrap gap-2">
                      {formData.preferredLanguages.map((language) => (
                        <span 
                          key={language}
                          className="inline-flex items-center gap-1 bg-gray-200 px-3 py-1 rounded text-sm"
                        >
                          <button
                            onClick={() => removeLanguage(language)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <X className="h-3 w-3" />
                          </button>
                          {language}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500">List all languages that you can speak fluently</p>
                  </div>
                </div>

                {/* Marital Status */}
                <div className="flex items-start gap-8">
                  <Label className="w-48 pt-2">Marital status (optional)</Label>
                  <div className="flex-1">
                    <Select value={formData.maritalStatus} onValueChange={(value) => handleInputChange('maritalStatus', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Single">Single</SelectItem>
                        <SelectItem value="Married">Married</SelectItem>
                        <SelectItem value="Divorced">Divorced</SelectItem>
                        <SelectItem value="Widowed">Widowed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Citizenship */}
                <div className="flex items-start gap-8">
                  <Label className="w-48 pt-2">Citizenship</Label>
                  <div className="flex-1">
                    <Select value={formData.citizenship} onValueChange={(value) => handleInputChange('citizenship', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="US Citizen">US Citizen</SelectItem>
                        <SelectItem value="Permanent Resident">Permanent Resident</SelectItem>
                        <SelectItem value="Work Visa">Work Visa</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* SSN */}
                <div className="flex items-start gap-8">
                  <Label className="w-48 pt-2">SSN (optional)</Label>
                  <div className="flex-1">
                    <Input 
                      value={formData.ssn}
                      onChange={(e) => handleInputChange('ssn', e.target.value)}
                    />
                  </div>
                </div>

                {/* Date of Birth */}
                <div className="flex items-start gap-8">
                  <Label className="w-48 pt-2">Date of birth (optional)</Label>
                  <div className="flex-1 flex gap-2">
                    <Input 
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      className="flex-1"
                    />
                    <Button variant="secondary" size="icon" className="bg-gray-600 hover:bg-gray-700 text-white">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Address Section */}
            <AccordionItem value="address" className="border rounded-lg px-6">
              <AccordionTrigger className="hover:no-underline">
                <h2 className="text-lg">ADDRESS INFORMATION</h2>
              </AccordionTrigger>
              <AccordionContent className="pt-6 space-y-8">
                {/* Personal Address */}
                <div>
                  <div className="mb-6">
                    <h3 className="text-lg italic">Personal Address</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      This is where the associate lives so the company can set up state income tax deduction accordingly. Any new changes regarding this matter must be reported to the Human Resources Department.
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Personal Street Address */}
                    <div className="flex items-start gap-8">
                      <Label className="w-48 pt-2">Personal street address</Label>
                      <div className="flex-1">
                        <Input 
                          value={formData.personalStreetAddress}
                          onChange={(e) => handleInputChange('personalStreetAddress', e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Apt/Unit */}
                    <div className="flex items-start gap-8">
                      <Label className="w-48 pt-2">Apt/Unit (optional)</Label>
                      <div className="flex-1">
                        <Input 
                          value={formData.personalAptUnit}
                          onChange={(e) => handleInputChange('personalAptUnit', e.target.value)}
                        />
                      </div>
                    </div>

                    {/* ZIP Code */}
                    <div className="flex items-start gap-8">
                      <Label className="w-48 pt-2">ZIP code</Label>
                      <div className="flex-1 relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input 
                          value={formData.personalZipCode}
                          onChange={(e) => handleInputChange('personalZipCode', e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    {/* State */}
                    <div className="flex items-start gap-8">
                      <Label className="w-48 pt-2">State (optional)</Label>
                      <div className="flex-1">
                        <Input 
                          value={formData.personalState}
                          onChange={(e) => handleInputChange('personalState', e.target.value)}
                          className="bg-gray-100"
                          disabled
                        />
                      </div>
                    </div>

                    {/* County */}
                    <div className="flex items-start gap-8">
                      <Label className="w-48 pt-2">County (optional)</Label>
                      <div className="flex-1">
                        <Select value={formData.personalCounty} onValueChange={(value) => handleInputChange('personalCounty', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="LEXINGTON">LEXINGTON</SelectItem>
                            <SelectItem value="RICHLAND">RICHLAND</SelectItem>
                            <SelectItem value="CHARLESTON">CHARLESTON</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* City */}
                    <div className="flex items-start gap-8">
                      <Label className="w-48 pt-2">City</Label>
                      <div className="flex-1">
                        <Input 
                          value={formData.personalCity}
                          onChange={(e) => handleInputChange('personalCity', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mailing Address */}
                <div className="pt-6 border-t">
                  <div className="mb-6">
                    <h3 className="text-lg italic">Mailing Address</h3>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Same as Personal Address Checkbox */}
                    <div className="flex items-start gap-8">
                      <div className="w-48"></div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Checkbox 
                            id="sameAddress"
                            checked={formData.sameAsPersonalAddress}
                            onCheckedChange={handleSameAddressChange}
                          />
                          <Label htmlFor="sameAddress" className="cursor-pointer">
                            Same as personal address
                          </Label>
                        </div>
                      </div>
                    </div>

                    {/* Mailing Street Address */}
                    <div className="flex items-start gap-8">
                      <Label className="w-48 pt-2">Mailing street address</Label>
                      <div className="flex-1 relative">
                        <Input 
                          value={formData.mailingStreetAddress}
                          onChange={(e) => handleInputChange('mailingStreetAddress', e.target.value)}
                          className="bg-gray-100"
                          disabled={formData.sameAsPersonalAddress}
                        />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-red-500 rounded p-1 hover:bg-red-600">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Mailing Apt/Unit */}
                    <div className="flex items-start gap-8">
                      <Label className="w-48 pt-2">Mailing Apt/Unit (optional)</Label>
                      <div className="flex-1">
                        <Input 
                          value={formData.mailingAptUnit}
                          onChange={(e) => handleInputChange('mailingAptUnit', e.target.value)}
                          disabled={formData.sameAsPersonalAddress}
                        />
                      </div>
                    </div>

                    {/* Mailing ZIP Code */}
                    <div className="flex items-start gap-8">
                      <Label className="w-48 pt-2">Mailing ZIP code</Label>
                      <div className="flex-1 space-y-2">
                        <Input 
                          value={formData.mailingZipCode}
                          onChange={(e) => handleInputChange('mailingZipCode', e.target.value)}
                          disabled={formData.sameAsPersonalAddress}
                        />
                        <p className="text-sm text-gray-600">West Columbia, SC.</p>
                      </div>
                    </div>

                    {/* Mailing City */}
                    <div className="flex items-start gap-8">
                      <Label className="w-48 pt-2">Mailing city</Label>
                      <div className="flex-1">
                        <Input 
                          value={formData.mailingCity}
                          onChange={(e) => handleInputChange('mailingCity', e.target.value)}
                          disabled={formData.sameAsPersonalAddress}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Others Section */}
            <AccordionItem value="other" className="border rounded-lg px-6">
              <AccordionTrigger className="hover:no-underline">
                <h2 className="text-lg">OTHER INFORMATION</h2>
              </AccordionTrigger>
              <AccordionContent className="pt-6 space-y-6">
                {/* Note */}
                <div className="flex items-start gap-8">
                  <Label className="w-48 pt-2">Note (optional)</Label>
                  <div className="flex-1">
                    <Textarea 
                      value={formData.note}
                      onChange={(e) => handleInputChange('note', e.target.value)}
                      rows={6}
                      className="resize-none"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="flex items-start gap-8">
                  <Label className="w-48 pt-2">Password</Label>
                  <div className="flex-1 flex gap-4">
                    <Input 
                      type="password"
                      value={formData.password}
                      className="flex-1 bg-gray-100"
                      disabled
                    />
                    <Button 
                      variant="secondary"
                      onClick={handleChangePassword}
                      className="bg-gray-600 hover:bg-gray-700 text-white"
                    >
                      Change
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-8 mt-8 border-t">
            <Button variant="outline" onClick={() => toast.info('Changes discarded')}>
              Cancel
            </Button>
            <PrimaryButton onClick={handleSaveProfile}>
              Save Changes
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}
