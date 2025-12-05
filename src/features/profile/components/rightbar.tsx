import React, {ChangeEvent, FC, MouseEventHandler, RefObject} from 'react'
import {Edit2, FileText, Home, Mail, MapPin, Phone, Upload, User, X} from "lucide-react";
import {Label} from "@/components/ui/label";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {ImageWithFallback} from "@/components/custom/image-with-fallback";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Checkbox} from "@/components/ui/checkbox";
import {Textarea} from "@/components/ui/textarea";
import {initDataFormType} from "@/features/profile/components/Profile";
import {MultiSelect} from "@/components/custom/multi-selection";

type RightBarProps = {
    primaryColor: string;
    personalRef: RefObject<HTMLDivElement | null>
    getLightPrimaryBg: () => string
    formData: initDataFormType
    handleInputChange: (field: string, value: string | boolean) => void
    isEditingEmail: boolean
    handleChangeEmail: () => void
    addressRef: RefObject<HTMLDivElement | null>
    handleSameAddressChange: (checked:boolean) => void
    otherRef: RefObject<HTMLDivElement | null>
    handleChangePassword: () => void
    handleLanguageChange: (vals:string[]) => void
}

export const RightBar:FC<RightBarProps> = ({getLightPrimaryBg,primaryColor,formData,isEditingEmail,addressRef,otherRef,personalRef,handleChangeEmail,handleInputChange,handleChangePassword,handleSameAddressChange,handleLanguageChange}) => {

    return (
        <main className="flex-1 overflow-y-auto w-full">
            <div className="max-w-4xl mx-auto p-8 space-y-8">

                {/* Personal Information Section */}
                <section ref={personalRef} id="personal" className="bg-white rounded-xl shadow-sm border">
                    <div className="border-b rounded-t-xl px-8 py-6" style={{ backgroundColor: getLightPrimaryBg() }}>
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-white shadow-sm" style={{ color: primaryColor }}>
                                <User className="h-6 w-6" />
                            </div>
                            <div>
                                <h2 className="text-xl">Personal Information</h2>
                                <p className="text-sm text-gray-500 mt-1">Update your personal details and preferences</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 space-y-8">
                        {/* Profile Picture */}
                        <div className="grid grid-cols-3 gap-6">
                            <Label className="pt-2 text-gray-600">Profile Picture</Label>
                            <div className="col-span-2">
                                <div className="flex items-center gap-6">
                                    <Avatar className="h-24 w-24 ring-4 ring-gray-100">
                                        <AvatarImage src={formData.profilePicture} />
                                        <AvatarFallback style={{ backgroundColor: primaryColor }}>
                                            <ImageWithFallback
                                                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&h=200&fit=crop"
                                                alt="Profile"
                                                className="h-full w-full object-cover"
                                            />
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <Button variant="outline" size="sm" className="mb-2">
                                            <Upload className="h-4 w-4 mr-2" />
                                            Upload Photo
                                        </Button>
                                        <p className="text-xs text-gray-500">JPG, PNG or GIF. Max 5MB.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="h-px bg-gray-100"></div>

                        {/* Full Name */}
                        <div className="grid grid-cols-3 gap-6">
                            <Label className="pt-2 text-gray-600">Full Name</Label>
                            <div className="col-span-2 grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-xs text-gray-500 mb-2">First Name</Label>
                                    <Input
                                        value={formData.firstName}
                                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label className="text-xs text-gray-500 mb-2">Last Name</Label>
                                    <Input
                                        value={formData.lastName}
                                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                                        className="mt-1"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Middle Name */}
                        <div className="grid grid-cols-3 gap-6">
                            <Label className="pt-2 text-gray-600">Middle Name</Label>
                            <div className="col-span-2">
                                <Input
                                    value={formData.middleName}
                                    onChange={(e) => handleInputChange('middleName', e.target.value)}
                                    placeholder="Optional"
                                />
                            </div>
                        </div>

                        <div className="h-px bg-gray-100"></div>

                        {/* Personal Email */}
                        <div className="grid grid-cols-3 gap-6">
                            <Label className="pt-2 text-gray-600">Personal Email</Label>
                            <div className="col-span-2">
                                <div className="flex gap-3">
                                    <div className="flex-1 relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input
                                            value={formData.personalEmail}
                                            onChange={(e) => handleInputChange('personalEmail', e.target.value)}
                                            className={`pl-10 ${!isEditingEmail ? 'bg-gray-50' : ''}`}
                                            disabled={!isEditingEmail}
                                        />
                                    </div>
                                    <Button
                                        variant={isEditingEmail ? "default" : "outline"}
                                        onClick={handleChangeEmail}
                                        size="sm"
                                        className="px-6"
                                        style={isEditingEmail ? { backgroundColor: primaryColor } : {}}
                                    >
                                        <Edit2 className="h-4 w-4 mr-2" />
                                        {isEditingEmail ? 'Save' : 'Edit'}
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Personal Phone */}
                        <div className="grid grid-cols-3 gap-6">
                            <Label className="pt-2 text-gray-600">Personal Phone</Label>
                            <div className="col-span-2">
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        value={formData.personalPhone}
                                        onChange={(e) => handleInputChange('personalPhone', e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="h-px bg-gray-100"></div>

                        {/* Legal Full Name */}
                        <div className="grid grid-cols-3 gap-6">
                            <div>
                                <Label className="text-gray-600">Legal Full Name</Label>
                                <p className="text-xs text-gray-500 mt-1">Based on I-94 or Green Card</p>
                            </div>
                            <div className="col-span-2 grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-xs text-gray-500 mb-2">Legal First Name</Label>
                                    <Input
                                        value={formData.legalFirstName}
                                        onChange={(e) => handleInputChange('legalFirstName', e.target.value)}
                                        className="mt-1"
                                        placeholder="Legal_given_name"
                                    />
                                </div>
                                <div>
                                    <Label className="text-xs text-gray-500 mb-2">Legal Last Name</Label>
                                    <Input
                                        value={formData.legalLastName}
                                        onChange={(e) => handleInputChange('legalLastName', e.target.value)}
                                        className="mt-1"
                                        placeholder="Legal_last_name"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Preferred Languages */}
                        <div className="grid grid-cols-3 gap-6">
                            <div>
                                <Label className="text-gray-600">Preferred Languages</Label>
                                <p className="text-xs text-gray-500 mt-1">Languages you speak fluently</p>
                            </div>
                            <div className="col-span-2">
                                <MultiSelect options={formData.preferredLanguages.map(item => ({
                                    label: item,
                                    value: item,
                                    disabled: false
                                }))}
                                             placeholder="Select languages"
                                             onValueChange={handleLanguageChange} />
                            </div>
                        </div>

                        <div className="h-px bg-gray-100"></div>

                        {/* Marital Status */}
                        <div className="grid grid-cols-3 gap-6">
                            <Label className="pt-2 text-gray-600">Marital Status</Label>
                            <div className="col-span-2">
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
                        <div className="grid grid-cols-3 gap-6">
                            <Label className="pt-2 text-gray-600">Citizenship</Label>
                            <div className="col-span-2">
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
                        <div className="grid grid-cols-3 gap-6">
                            <Label className="pt-2 text-gray-600">SSN</Label>
                            <div className="col-span-2">
                                <Input
                                    value={formData.ssn}
                                    onChange={(e) => handleInputChange('ssn', e.target.value)}
                                    placeholder="Optional"
                                />
                            </div>
                        </div>

                        {/* Date of Birth */}
                        <div className="grid grid-cols-3 gap-6">
                            <Label className="pt-2 text-gray-600">Date of Birth</Label>
                            <div className="col-span-2">
                                <Input
                                    value={formData.dateOfBirth}
                                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                                    placeholder="MM/DD/YYYY"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Address Information Section */}
                <section ref={addressRef} id="address" className="bg-white rounded-xl shadow-sm border">
                    <div className="border-b px-8 py-6 rounded-t-xl" style={{ backgroundColor: getLightPrimaryBg() }}>
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-white shadow-sm" style={{ color: primaryColor }}>
                                <Home className="h-6 w-6" />
                            </div>
                            <div>
                                <h2 className="text-xl">Address Information</h2>
                                <p className="text-sm text-gray-500 mt-1">Manage your personal and mailing addresses</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 space-y-8">
                        {/* Personal Address Header */}
                        <div>
                            <h3 className="mb-1">Personal Address</h3>
                            <p className="text-sm text-gray-500">
                                This is where the associate lives so the company can set up state income tax deduction accordingly.
                            </p>
                        </div>

                        {/* Personal Street Address */}
                        <div className="grid grid-cols-3 gap-6">
                            <Label className="pt-2 text-gray-600">Street Address</Label>
                            <div className="col-span-2">
                                <Input
                                    value={formData.personalStreetAddress}
                                    onChange={(e) => handleInputChange('personalStreetAddress', e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Apt/Unit */}
                        <div className="grid grid-cols-3 gap-6">
                            <Label className="pt-2 text-gray-600">Apt/Unit</Label>
                            <div className="col-span-2">
                                <Input
                                    value={formData.personalAptUnit}
                                    onChange={(e) => handleInputChange('personalAptUnit', e.target.value)}
                                    placeholder="Optional"
                                />
                            </div>
                        </div>

                        {/* ZIP Code */}
                        <div className="grid grid-cols-3 gap-6">
                            <Label className="pt-2 text-gray-600">ZIP Code</Label>
                            <div className="col-span-2">
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        value={formData.personalZipCode}
                                        onChange={(e) => handleInputChange('personalZipCode', e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* City and State */}
                        <div className="grid grid-cols-3 gap-6">
                            <Label className="pt-2 text-gray-600">City & State</Label>
                            <div className="col-span-2 grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-xs text-gray-500 mb-2">City</Label>
                                    <Input
                                        value={formData.personalCity}
                                        onChange={(e) => handleInputChange('personalCity', e.target.value)}
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label className="text-xs text-gray-500 mb-2">State</Label>
                                    <Input
                                        value={formData.personalState}
                                        onChange={(e) => handleInputChange('personalState', e.target.value)}
                                        className="mt-1 bg-gray-50"
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>

                        {/* County */}
                        <div className="grid grid-cols-3 gap-6">
                            <Label className="pt-2 text-gray-600">County</Label>
                            <div className="col-span-2">
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

                        <div className="h-px bg-gray-200"></div>

                        {/* Mailing Address Header */}
                        <div>
                            <h3 className="mb-4">Mailing Address</h3>
                            <div className="flex items-center gap-2 p-4 rounded-lg border bg-gray-50">
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

                        {/* Mailing Street Address */}
                        <div className="grid grid-cols-3 gap-6">
                            <Label className="pt-2 text-gray-600">Street Address</Label>
                            <div className="col-span-2">
                                <Input
                                    value={formData.mailingStreetAddress}
                                    onChange={(e) => handleInputChange('mailingStreetAddress', e.target.value)}
                                    className={formData.sameAsPersonalAddress ? 'bg-gray-50' : ''}
                                    disabled={formData.sameAsPersonalAddress}
                                />
                            </div>
                        </div>

                        {/* Mailing Apt/Unit */}
                        <div className="grid grid-cols-3 gap-6">
                            <Label className="pt-2 text-gray-600">Apt/Unit</Label>
                            <div className="col-span-2">
                                <Input
                                    value={formData.mailingAptUnit}
                                    onChange={(e) => handleInputChange('mailingAptUnit', e.target.value)}
                                    placeholder="Optional"
                                    className={formData.sameAsPersonalAddress ? 'bg-gray-50' : ''}
                                    disabled={formData.sameAsPersonalAddress}
                                />
                            </div>
                        </div>

                        {/* Mailing ZIP Code */}
                        <div className="grid grid-cols-3 gap-6">
                            <Label className="pt-2 text-gray-600">ZIP Code</Label>
                            <div className="col-span-2">
                                <Input
                                    value={formData.mailingZipCode}
                                    onChange={(e) => handleInputChange('mailingZipCode', e.target.value)}
                                    className={formData.sameAsPersonalAddress ? 'bg-gray-50' : ''}
                                    disabled={formData.sameAsPersonalAddress}
                                />
                            </div>
                        </div>

                        {/* Mailing City */}
                        <div className="grid grid-cols-3 gap-6">
                            <Label className="pt-2 text-gray-600">City</Label>
                            <div className="col-span-2">
                                <Input
                                    value={formData.mailingCity}
                                    onChange={(e) => handleInputChange('mailingCity', e.target.value)}
                                    className={formData.sameAsPersonalAddress ? 'bg-gray-50' : ''}
                                    disabled={formData.sameAsPersonalAddress}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Other Information Section */}
                <section ref={otherRef} id="other" className="bg-white rounded-xl shadow-sm border">
                    <div className="border-b px-8 py-6 rounded-t-xl" style={{ backgroundColor: getLightPrimaryBg() }}>
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-white shadow-sm" style={{ color: primaryColor }}>
                                <FileText className="h-6 w-6" />
                            </div>
                            <div>
                                <h2 className="text-xl">Other Information</h2>
                                <p className="text-sm text-gray-500 mt-1">Additional account settings and notes</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 space-y-8">
                        {/* Note */}
                        <div className="grid grid-cols-3 gap-6">
                            <div>
                                <Label className="text-gray-600">Notes</Label>
                                <p className="text-xs text-gray-500 mt-1">Add any additional information</p>
                            </div>
                            <div className="col-span-2">
                                <Textarea
                                    value={formData.note}
                                    onChange={(e) => handleInputChange('note', e.target.value)}
                                    rows={6}
                                    className="resize-none"
                                    placeholder="Optional notes..."
                                />
                            </div>
                        </div>

                        <div className="h-px bg-gray-100"></div>

                        {/* Password */}
                        <div className="grid grid-cols-3 gap-6">
                            <Label className="pt-2 text-gray-600">Password</Label>
                            <div className="col-span-2">
                                <div className="flex gap-3">
                                    <Input
                                        type="password"
                                        value={formData.password}
                                        className="flex-1 bg-gray-50"
                                        disabled
                                    />
                                    <Button
                                        variant="outline"
                                        onClick={handleChangePassword}
                                        className="px-6"
                                    >
                                        Change Password
                                    </Button>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">Last changed 30 days ago</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Spacer for better scroll */}
                <div className="h-20"></div>
            </div>
        </main>
    )
}
