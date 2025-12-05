"use client"
import {useState, useRef, RefObject, ForwardRefExoticComponent, RefAttributes} from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PrimaryButton } from '@/components/custom/primary-button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ImageWithFallback } from '@/components/custom/image-with-fallback';
import {Mail, Phone, MapPin, User, Home, FileText, Upload, Check, X, Edit2, LucideProps} from 'lucide-react';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';
import { useThemeColors } from '@/hooks/useThemeColors';
import {LeftBar} from "@/features/profile/components/leftbar";
import {RightSide} from "@/features/pdf-form-builder/components";
import {RightBar} from "@/features/profile/components/rightbar";

export type initDataFormType = typeof initDataForm
const initDataForm = {
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
}
export type menuItemsType = {
  id: string
  label: string
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  ref: RefObject<HTMLDivElement | null>
}[]



export function UserProfile() {
  const { primaryColor, getLightPrimaryBg, getPrimaryTextClass } = useThemeColors();

  const [activeSection, setActiveSection] = useState('personal');
  const personalRef = useRef<HTMLDivElement>(null);
  const addressRef = useRef<HTMLDivElement>(null);
  const otherRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState(initDataForm);

  const [languageInput, setLanguageInput] = useState('');
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  const menuItems = [
    { id: 'personal', label: 'Personal Information', icon: User, ref: personalRef },
    { id: 'address', label: 'Address Information', icon: Home, ref: addressRef },
    { id: 'other', label: 'Other Information', icon: FileText, ref: otherRef },
  ];

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

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>, sectionId: string) => {
    setActiveSection(sectionId);
    // ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const isInView =
        rect.top >= 0 &&
        rect.bottom <= window.innerHeight;
    if (!isInView) {
      // scroll đến đúng vị trí top của element
      const y = rect.top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };


  function handleLanguageChange(vals:string[]) {
    let data = formData.preferredLanguages
    vals.map((val) => {
      if(data.includes(val)) {
        data.splice(data.indexOf(val), 1);
      }
      if(!data.includes(val)) {
        data.push(val);
      }
    })
    setFormData(prev => ({
      ...prev,
      preferredLanguages: data
    }));
  }

  return (
      <div className="flex min-h-screen bg-gray-50">
        <Toaster />
        <div className="flex items-start mx-auto  w-full max-w-[1200px]" >

          <LeftBar primaryColor={primaryColor} formData={formData} menuItems={menuItems} handleSaveProfile={handleSaveProfile} toast={toast} activeSection={activeSection} scrollToSection={scrollToSection} />
          <RightBar handleLanguageChange={handleLanguageChange} primaryColor={primaryColor} personalRef={personalRef} getLightPrimaryBg={getLightPrimaryBg} formData={formData} handleInputChange={handleInputChange} isEditingEmail={isEditingEmail} handleChangeEmail={handleChangeEmail} addressRef={addressRef} handleSameAddressChange={handleSameAddressChange} otherRef={otherRef} handleChangePassword={handleChangePassword} />
        </div>
      </div>
  );
}