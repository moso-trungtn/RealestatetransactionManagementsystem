"use client"
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Bell, Upload, Save, RotateCcw } from 'lucide-react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ImageWithFallback } from "@/components/custom/image-with-fallback";
import { toast } from 'sonner';
import { Toaster } from "@/components/ui/sonner";
import { useWebsiteConfig } from "@/contexts/WebsiteConfigContext";
import { PrimaryButton } from "@/components/custom/primary-button";

interface WebsiteSettingsProps {
  onBack: () => void;
}

export function WebsiteSettings({ onBack }: WebsiteSettingsProps) {
  const { config, updateConfig, resetToDefaults } = useWebsiteConfig();
  
  // Local state for editing
  const [primaryColor, setPrimaryColor] = useState(config.primaryColor);
  const [secondaryColor, setSecondaryColor] = useState(config.secondaryColor);
  const [companyLogo, setCompanyLogo] = useState(config.companyLogo);
  const [loadingIcon, setLoadingIcon] = useState(config.loadingIcon);
  
  // Sync with context when it changes
  useEffect(() => {
    setPrimaryColor(config.primaryColor);
    setSecondaryColor(config.secondaryColor);
    setCompanyLogo(config.companyLogo);
    setLoadingIcon(config.loadingIcon);
  }, [config]);
  
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setCompanyLogo(reader.result as string);
        toast.success('Logo uploaded successfully!');
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Helper function to get a lighter shade of primary color for backgrounds
  const getLightPrimaryColor = (color: string) => {
    // Convert hex to RGB
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    // Return a lighter version with opacity
    return `rgba(${r}, ${g}, ${b}, 0.1)`;
  };

  const handleSaveSettings = () => {
    updateConfig({
      primaryColor,
      secondaryColor,
      companyLogo,
      loadingIcon,
    });
    toast.success('Settings saved successfully!');
  };

  const handleResetToDefaults = () => {
    resetToDefaults();
    toast.success('Settings reset to defaults!');
  };

  return (
    <div className="min-h-screen bg-white">
      <Toaster />
      
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <ImageWithFallback 
                src={companyLogo}
                alt="Logo"
                className="h-10 w-auto object-contain"
              />
            </div>
            
            <nav className="flex gap-6">
              <button className="text-gray-600 hover:text-gray-900">Transactions</button>
              <button className="px-4 py-2 bg-gray-100 rounded">Website Settings</button>
              <button className="text-gray-600 hover:text-gray-900">Templates</button>
            </nav>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5 text-gray-600" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="rounded-full"
            >
              <Avatar>
                <AvatarFallback className="bg-yellow-400 text-white">
                  A
                </AvatarFallback>
              </Avatar>
            </Button>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onBack}
              className="hover:bg-gray-100"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl">Website Settings</h1>
              <p className="text-gray-500 mt-1">Manage system-wide properties and branding</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Settings Panel */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Colors Section */}
            <Card>
              <CardHeader>
                <CardTitle>Color Scheme</CardTitle>
                <CardDescription>
                  Customize the primary and secondary colors used throughout the system
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="primary-color">Primary Color</Label>
                    <div className="flex gap-3 items-center">
                      <Input
                        id="primary-color"
                        type="color"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="w-20 h-12 cursor-pointer"
                      />
                      <Input
                        type="text"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        placeholder="#FF6B35"
                        className="flex-1"
                      />
                    </div>
                    <div 
                      className="w-full h-16 rounded-lg border-2 border-gray-200"
                      style={{ backgroundColor: primaryColor }}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="secondary-color">Secondary Color</Label>
                    <div className="flex gap-3 items-center">
                      <Input
                        id="secondary-color"
                        type="color"
                        value={secondaryColor}
                        onChange={(e) => setSecondaryColor(e.target.value)}
                        className="w-20 h-12 cursor-pointer"
                      />
                      <Input
                        type="text"
                        value={secondaryColor}
                        onChange={(e) => setSecondaryColor(e.target.value)}
                        placeholder="#FFFFFF"
                        className="flex-1"
                      />
                    </div>
                    <div 
                      className="w-full h-16 rounded-lg border-2 border-gray-200"
                      style={{ backgroundColor: secondaryColor }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Company Logo Section */}
            <Card>
              <CardHeader>
                <CardTitle>Company Logo</CardTitle>
                <CardDescription>
                  Upload your company logo. Recommended size: 400x100px (PNG or JPG)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-48 h-24 border-2 border-gray-200 rounded-lg flex items-center justify-center bg-gray-50 p-3">
                      <ImageWithFallback 
                        src={companyLogo}
                        alt="Company Logo Preview"
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <Label htmlFor="logo-upload" className="cursor-pointer">
                      <div 
                        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center transition-colors"
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = primaryColor;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = '';
                        }}
                      >
                        <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm">
                          <span style={{ color: primaryColor }}>Click to upload</span>
                          <span className="text-gray-500"> or drag and drop</span>
                        </p>
                        <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                      </div>
                    </Label>
                    <Input
                      id="logo-upload"
                      type="file"
                      accept="image/png,image/jpeg,image/jpg"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Loading Icon Section */}
            <Card>
              <CardHeader>
                <CardTitle>Loading Icon</CardTitle>
                <CardDescription>
                  Select the loading animation style used throughout the application
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <button
                    onClick={() => setLoadingIcon('spinner')}
                    className="p-6 border-2 rounded-lg transition-all"
                    style={{
                      borderColor: loadingIcon === 'spinner' ? primaryColor : '#e5e7eb',
                      backgroundColor: loadingIcon === 'spinner' ? getLightPrimaryColor(primaryColor) : 'transparent',
                    }}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div 
                        className="w-8 h-8 border-4 border-gray-300 rounded-full animate-spin"
                        style={{ borderTopColor: primaryColor }}
                      />
                      <span className="text-sm">Spinner</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setLoadingIcon('dots')}
                    className="p-6 border-2 rounded-lg transition-all"
                    style={{
                      borderColor: loadingIcon === 'dots' ? primaryColor : '#e5e7eb',
                      backgroundColor: loadingIcon === 'dots' ? getLightPrimaryColor(primaryColor) : 'transparent',
                    }}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="flex gap-1">
                        <div 
                          className="w-2 h-2 rounded-full animate-pulse" 
                          style={{ backgroundColor: primaryColor }}
                        />
                        <div 
                          className="w-2 h-2 rounded-full animate-pulse [animation-delay:0.2s]" 
                          style={{ backgroundColor: primaryColor }}
                        />
                        <div 
                          className="w-2 h-2 rounded-full animate-pulse [animation-delay:0.4s]" 
                          style={{ backgroundColor: primaryColor }}
                        />
                      </div>
                      <span className="text-sm">Dots</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setLoadingIcon('pulse')}
                    className="p-6 border-2 rounded-lg transition-all"
                    style={{
                      borderColor: loadingIcon === 'pulse' ? primaryColor : '#e5e7eb',
                      backgroundColor: loadingIcon === 'pulse' ? getLightPrimaryColor(primaryColor) : 'transparent',
                    }}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div 
                        className="w-8 h-8 rounded-full animate-pulse" 
                        style={{ backgroundColor: primaryColor }}
                      />
                      <span className="text-sm">Pulse</span>
                    </div>
                  </button>
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card>
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                  <CardDescription>
                    See how your changes will look
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  
                  {/* Logo Preview */}
                  <div>
                    <Label className="text-xs text-gray-500">Logo</Label>
                    <div className="mt-2 p-4 bg-gray-50 rounded-lg border">
                      <ImageWithFallback 
                        src={companyLogo}
                        alt="Logo Preview"
                        className="h-12 w-auto object-contain"
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Color Preview */}
                  <div>
                    <Label className="text-xs text-gray-500">Primary Color</Label>
                    <div className="mt-2 space-y-2">
                      <button
                        className="w-full px-4 py-2 rounded text-white transition-all hover:opacity-90"
                        style={{ backgroundColor: primaryColor }}
                      >
                        Primary Button
                      </button>
                      <div 
                        className="w-full p-3 rounded border-2"
                        style={{ borderColor: primaryColor, color: primaryColor }}
                      >
                        Primary Text
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Loading Icon Preview */}
                  <div>
                    <Label className="text-xs text-gray-500">Loading Animation</Label>
                    <div className="mt-2 p-6 bg-gray-50 rounded-lg border flex items-center justify-center">
                      {loadingIcon === 'spinner' && (
                        <div className="w-8 h-8 border-4 border-gray-300 rounded-full animate-spin"
                          style={{ borderTopColor: primaryColor }} />
                      )}
                      {loadingIcon === 'dots' && (
                        <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: primaryColor }} />
                          <div className="w-2 h-2 rounded-full animate-pulse [animation-delay:0.2s]" style={{ backgroundColor: primaryColor }} />
                          <div className="w-2 h-2 rounded-full animate-pulse [animation-delay:0.4s]" style={{ backgroundColor: primaryColor }} />
                        </div>
                      )}
                      {loadingIcon === 'pulse' && (
                        <div className="w-8 h-8 rounded-full animate-pulse" style={{ backgroundColor: primaryColor }} />
                      )}
                    </div>
                  </div>

                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                <PrimaryButton 
                  onClick={handleSaveSettings}
                  className="w-full"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Settings
                </PrimaryButton>
                <Button 
                  onClick={handleResetToDefaults}
                  variant="outline"
                  className="w-full"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset to Defaults
                </Button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
