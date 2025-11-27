import { useState } from "react";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { Checkbox } from "@/components/checkbox";
import { ChevronLeft } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/select";
import { Navbar } from "@/shared/components/Navbar";
import { Footer } from "@/shared/components/Footer";

interface RecruitingProcessProps {
    onBack?: () => void;
    onLoginClick: () => void;
}

interface FormData {
    // Step 1: Basic Information
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    aliasFirstName: string;
    consentSMS: boolean;

    // Step 2: Personal Address
    streetAddress: string;
    aptUnit: string;
    zipCode: string;
    city: string;

    // Step 3: Mailing Address
    sameAsPersonal: boolean;
    mailingStreetAddress: string;
    mailingAptUnit: string;
    mailingZipCode: string;
    mailingCity: string;

    // Step 4: Others
    nmls: string;
    licenseState: string;
    propertiesSold: string;
    dreLicenseNumber: string;
    mlsProvider: string;
    loanOfficerType: string;

    // Step 5: Review & Sign Agreement
    electronicSignature: string;
    agreementConsent: boolean;
}

export function RecruitingProcess({
                                      onBack,
                                      onLoginClick,
                                  }: RecruitingProcessProps) {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        aliasFirstName: "",
        consentSMS: false,
        streetAddress: "",
        aptUnit: "",
        zipCode: "",
        city: "",
        sameAsPersonal: false,
        mailingStreetAddress: "",
        mailingAptUnit: "",
        mailingZipCode: "",
        mailingCity: "",
        nmls: "",
        licenseState: "CA",
        propertiesSold: "",
        dreLicenseNumber: "",
        mlsProvider: "",
        loanOfficerType: "",
        electronicSignature: "",
        agreementConsent: false,
    });

    const totalSteps = 5;

    const updateFormData = (
        field: keyof FormData,
        value: string | boolean,
    ) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            handleSubmit();
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else if (onBack) {
            onBack();
        }
    };

    const handleSubmit = () => {
        console.log("Form submitted:", formData);
        // Handle form submission
        alert("Registration submitted successfully!");
    };

    const handleSameAsPersonal = (checked: boolean) => {
        updateFormData("sameAsPersonal", checked);
        if (checked) {
            updateFormData(
                "mailingStreetAddress",
                formData.streetAddress,
            );
            updateFormData("mailingAptUnit", formData.aptUnit);
            updateFormData("mailingZipCode", formData.zipCode);
            updateFormData("mailingCity", formData.city);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <Navbar onLoginClick={onLoginClick} />

            {/* Header with curved design */}
            <div className="relative bg-[#F36F23] pt-12 pb-40 overflow-hidden z-1">
                {/* Curved bottom edge */}
                <div className="absolute bottom-0 left-0 right-0 h-32">
                    <svg
                        className="absolute bottom-0 w-full h-full"
                        preserveAspectRatio="none"
                        viewBox="0 0 1440 120"
                        fill="none"
                    >
                        <path
                            d="M0 0C240 80 480 120 720 120C960 120 1200 80 1440 0V120H0V0Z"
                            fill="white"
                        />
                    </svg>
                </div>

                {/* Back button */}
                {onBack && (
                    <button
                        onClick={onBack}
                        className="absolute top-6 left-6 flex items-center gap-2 text-white hover:text-white/90 transition-colors"
                    >
                        <ChevronLeft className="size-5" />
                        <span>Back to Home</span>
                    </button>
                )}

                {/* Header content */}
                <div className="relative max-w-2xl mx-auto text-center px-6 py-8">
                    <h1 className="text-white text-4xl mb-3">
                        Register Real Estate Agent
                    </h1>
                    <p className="text-white text-4xl mb-6">(CA only)</p>
                    <p className="text-white text-lg">
                        Complete the steps below to get registered as
                    </p>
                    <p className="text-white text-lg">
                        a California real estate agent.
                    </p>
                </div>
            </div>

            {/* Form Card */}
            <div className="max-w-4xl mx-auto px-6 -mt-24 pb-20">
                <div className="bg-white rounded-lg shadow-xl p-12 relative z-40">
                    {/* Progress indicator */}
                    <div className="mb-10">
                        <p className="text-base text-gray-600 mb-4">
                            Step {currentStep} of {totalSteps}
                        </p>
                        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[#F36F23] transition-all duration-300 rounded-full"
                                style={{
                                    width: `${(currentStep / totalSteps) * 100}%`,
                                }}
                            />
                        </div>
                    </div>

                    {/* Step 1: Basic Information */}
                    {currentStep === 1 && (
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-[#2E2E2E] text-2xl mb-2">
                                    Basic Information
                                </h2>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="firstName" className="text-base mb-2">
                                        First name*
                                    </Label>
                                    <Input
                                        id="firstName"
                                        placeholder="First name"
                                        value={formData.firstName}
                                        onChange={(e) =>
                                            updateFormData(
                                                "firstName",
                                                e.target.value,
                                            )
                                        }
                                        className="h-12 text-base"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="lastName" className="text-base mb-2">
                                        Last name
                                    </Label>
                                    <Input
                                        id="lastName"
                                        placeholder="Last name"
                                        value={formData.lastName}
                                        onChange={(e) =>
                                            updateFormData("lastName", e.target.value)
                                        }
                                        className="h-12 text-base"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="email" className="text-base mb-2">
                                        Email*
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={(e) =>
                                            updateFormData("email", e.target.value)
                                        }
                                        className="h-12 text-base"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="phone" className="text-base mb-2">
                                        Phone*
                                    </Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        placeholder="(+1)"
                                        value={formData.phone}
                                        onChange={(e) =>
                                            updateFormData("phone", e.target.value)
                                        }
                                        className="h-12 text-base"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="aliasFirstName" className="text-base mb-2">
                                    Alias first name
                                </Label>
                                <Input
                                    id="aliasFirstName"
                                    placeholder="Alias first name"
                                    value={formData.aliasFirstName}
                                    onChange={(e) =>
                                        updateFormData(
                                            "aliasFirstName",
                                            e.target.value,
                                        )
                                    }
                                    className="h-12 text-base"
                                />
                            </div>

                            <div className="flex items-start gap-3 pt-2">
                                <Checkbox
                                    id="consent"
                                    checked={formData.consentSMS}
                                    onCheckedChange={(checked) =>
                                        updateFormData(
                                            "consentSMS",
                                            checked as boolean,
                                        )
                                    }
                                    className="mt-1"
                                />
                                <label
                                    htmlFor="consent"
                                    className="text-sm text-gray-600 leading-relaxed cursor-pointer"
                                >
                                    By checking this box, I consent to receive
                                    conversational SMS messages from Loan Factory
                                    related to my mortgage inquiry, application,
                                    documentation, follow-ups and status updates.
                                    Message and data rates may apply. Message
                                    frequency may vary. Visit{" "}
                                    <a
                                        href="https://www.loanfactory.com/sms/usage"
                                        className="text-[#F36F23] underline"
                                    >
                                        https://www.loanfactory.com/sms/usage
                                    </a>{" "}
                                    to see our privacy policy and{" "}
                                    <a
                                        href="https://www.loanfactory.com/terms-and-conditions"
                                        className="text-[#F36F23] underline"
                                    >
                                        https://www.loanfactory.com/terms-and-conditions
                                    </a>{" "}
                                    for our Terms of Service.
                                </label>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Personal Address */}
                    {currentStep === 2 && (
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-[#2E2E2E] text-2xl mb-3">
                                    Personal Address
                                </h2>
                                <p className="text-base text-gray-600">
                                    Note that your current mailing address so be
                                    sure if you want to be delivered accordingly.
                                    Any late notice sent to the registrant to be
                                    reported to the Federal Resources Department.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="streetAddress" className="text-base mb-2">
                                        Street address*
                                    </Label>
                                    <Input
                                        id="streetAddress"
                                        placeholder="Street address"
                                        value={formData.streetAddress}
                                        onChange={(e) =>
                                            updateFormData(
                                                "streetAddress",
                                                e.target.value,
                                            )
                                        }
                                        className="h-12 text-base"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="aptUnit" className="text-base mb-2">
                                        Apt/Unit
                                    </Label>
                                    <Input
                                        id="aptUnit"
                                        placeholder="Apt/Unit"
                                        value={formData.aptUnit}
                                        onChange={(e) =>
                                            updateFormData("aptUnit", e.target.value)
                                        }
                                        className="h-12 text-base"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="zipCode" className="text-base mb-2">
                                        ZIP code*
                                    </Label>
                                    <Input
                                        id="zipCode"
                                        placeholder="ZIP code"
                                        value={formData.zipCode}
                                        onChange={(e) =>
                                            updateFormData("zipCode", e.target.value)
                                        }
                                        className="h-12 text-base"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="city" className="text-base mb-2">
                                        City*
                                    </Label>
                                    <Input
                                        id="city"
                                        placeholder="City"
                                        value={formData.city}
                                        onChange={(e) =>
                                            updateFormData("city", e.target.value)
                                        }
                                        className="h-12 text-base"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Mailing Address */}
                    {currentStep === 3 && (
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-[#2E2E2E] text-2xl mb-3">
                                    Mailing Address
                                </h2>
                                <p className="text-base text-gray-600">
                                    The records will be mailed to the mailing
                                    address at the end of the year. Any late
                                    change regarding the roster will be reported
                                    to the Federal Resources Department.
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <Checkbox
                                    id="sameAsPersonal"
                                    checked={formData.sameAsPersonal}
                                    onCheckedChange={handleSameAsPersonal}
                                />
                                <label
                                    htmlFor="sameAsPersonal"
                                    className="text-base cursor-pointer"
                                >
                                    Same as personal address
                                </label>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="mailingStreetAddress" className="text-base mb-2">
                                        Mailing street address*
                                    </Label>
                                    <Input
                                        id="mailingStreetAddress"
                                        placeholder="Mailing street address"
                                        value={formData.mailingStreetAddress}
                                        onChange={(e) =>
                                            updateFormData(
                                                "mailingStreetAddress",
                                                e.target.value,
                                            )
                                        }
                                        disabled={formData.sameAsPersonal}
                                        className="h-12 text-base"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="mailingAptUnit" className="text-base mb-2">
                                        Mailing Apt/Unit
                                    </Label>
                                    <Input
                                        id="mailingAptUnit"
                                        placeholder="Mailing Apt/Unit"
                                        value={formData.mailingAptUnit}
                                        onChange={(e) =>
                                            updateFormData(
                                                "mailingAptUnit",
                                                e.target.value,
                                            )
                                        }
                                        disabled={formData.sameAsPersonal}
                                        className="h-12 text-base"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="mailingZipCode" className="text-base mb-2">
                                        Mailing ZIP code*
                                    </Label>
                                    <Input
                                        id="mailingZipCode"
                                        placeholder="Mailing ZIP code"
                                        value={formData.mailingZipCode}
                                        onChange={(e) =>
                                            updateFormData(
                                                "mailingZipCode",
                                                e.target.value,
                                            )
                                        }
                                        disabled={formData.sameAsPersonal}
                                        className="h-12 text-base"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="mailingCity" className="text-base mb-2">
                                        Mailing city*
                                    </Label>
                                    <Input
                                        id="mailingCity"
                                        placeholder="Mailing city"
                                        value={formData.mailingCity}
                                        onChange={(e) =>
                                            updateFormData(
                                                "mailingCity",
                                                e.target.value,
                                            )
                                        }
                                        disabled={formData.sameAsPersonal}
                                        className="h-12 text-base"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Others */}
                    {currentStep === 4 && (
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-[#2E2E2E] text-2xl mb-2">
                                    Others
                                </h2>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="nmls" className="text-base mb-2">
                                        NMLS*
                                    </Label>
                                    <Input
                                        id="nmls"
                                        placeholder="NMLS"
                                        value={formData.nmls}
                                        onChange={(e) =>
                                            updateFormData("nmls", e.target.value)
                                        }
                                        className="h-12 text-base"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="licenseState" className="text-base mb-2">
                                        Licensed state*
                                    </Label>
                                    <Input
                                        id="licenseState"
                                        placeholder="CA"
                                        value={formData.licenseState}
                                        onChange={(e) =>
                                            updateFormData(
                                                "licenseState",
                                                e.target.value,
                                            )
                                        }
                                        className="h-12 text-base"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="propertiesSold" className="text-base mb-2">
                                        How many properties have you sold?*
                                    </Label>
                                    <Select
                                        value={formData.propertiesSold}
                                        onValueChange={(value) =>
                                            updateFormData("propertiesSold", value)
                                        }
                                    >
                                        <SelectTrigger className="w-full h-12 text-base">
                                            <SelectValue placeholder="Select">
                                                {formData.propertiesSold || "Select"}
                                            </SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="0-5">0-5</SelectItem>
                                            <SelectItem value="6-10">6-10</SelectItem>
                                            <SelectItem value="11-20">11-20</SelectItem>
                                            <SelectItem value="More than 20">More than 20</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="dreLicenseNumber" className="text-base mb-2">
                                        DRE License Number*
                                    </Label>
                                    <Input
                                        id="dreLicenseNumber"
                                        placeholder="DRE01243434"
                                        value={formData.dreLicenseNumber}
                                        onChange={(e) =>
                                            updateFormData(
                                                "dreLicenseNumber",
                                                e.target.value,
                                            )
                                        }
                                        className="h-12 text-base"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="mlsProvider" className="text-base mb-2">
                                        What MLS Provider you want to join?*
                                    </Label>
                                    <Select
                                        value={formData.mlsProvider}
                                        onValueChange={(value) =>
                                            updateFormData("mlsProvider", value)
                                        }
                                    >
                                        <SelectTrigger className="w-full h-12 text-base">
                                            <SelectValue placeholder="Select">
                                                {formData.mlsProvider || "Select"}
                                            </SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="CRMLS">CRMLS</SelectItem>
                                            <SelectItem value="CLAW">CLAW</SelectItem>
                                            <SelectItem value="CARETS">CARETS</SelectItem>
                                            <SelectItem value="Sandicor">Sandicor</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="loanOfficerType" className="text-base mb-2">
                                        Loan officer type*
                                    </Label>
                                    <Input
                                        id="loanOfficerType"
                                        placeholder="1099"
                                        value={formData.loanOfficerType}
                                        onChange={(e) =>
                                            updateFormData(
                                                "loanOfficerType",
                                                e.target.value,
                                            )
                                        }
                                        className="h-12 text-base"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 5: Review & Sign Agreement */}
                    {currentStep === 5 && (
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-[#2E2E2E] text-2xl mb-3">
                                    Review & Sign Agreement
                                </h2>
                                <p className="text-base text-gray-600">
                                    Please review the agreement below and sign on the signature side. You may refer to this document in the future from our website if you need to.
                                </p>
                            </div>

                            {/* PDF Viewer Placeholder */}
                            <div className="border-2 border-gray-300 rounded-lg p-8 bg-gray-50 min-h-[500px] flex items-center justify-center">
                                <div className="text-center text-gray-600">
                                    <p className="text-lg mb-2">INDEPENDENT CONTRACTOR AGREEMENT</p>
                                    <p className="text-base">PDF document preview would appear here</p>
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="electronicSignature" className="text-base mb-2">
                                    Electronic Signature*
                                </Label>
                                <Input
                                    id="electronicSignature"
                                    placeholder="Type your full name here"
                                    value={formData.electronicSignature}
                                    onChange={(e) =>
                                        updateFormData(
                                            "electronicSignature",
                                            e.target.value,
                                        )
                                    }
                                    className="h-12 text-base"
                                    required
                                />
                                <div className="flex justify-end mt-3">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => updateFormData("electronicSignature", "")}
                                        className="text-base"
                                    >
                                        Clear
                                    </Button>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 pt-2">
                                <Checkbox
                                    id="agreementConsent"
                                    checked={formData.agreementConsent}
                                    onCheckedChange={(checked) =>
                                        updateFormData(
                                            "agreementConsent",
                                            checked as boolean,
                                        )
                                    }
                                    className="mt-1"
                                />
                                <label
                                    htmlFor="agreementConsent"
                                    className="text-sm text-gray-600 leading-relaxed cursor-pointer"
                                >
                                    By electronically signing above, I confirm that I have carefully reviewed and fully understand this Real Estate Agent Referral Agreement (&quot;Agreement&quot;). I acknowledge that this Agreement establishes an independent contractor relationship between myself and [Real Estate Company Name] for the purpose of referring and receiving leads. I understand that I will be compensated solely through the referral commissions detailed in Section 3 of this Agreement. I confirm that I am legally authorized to enter into this Agreement, and that the electronic signature I have provided is legally binding and equivalent to my handwritten signature. I accept and agree to be bound by all terms and conditions outlined in this Agreement.
                                </label>
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-10 pt-8 border-t">
                        <Button
                            variant="outline"
                            onClick={handleBack}
                            className="border-gray-300 h-12 px-8 text-base"
                        >
                            Back
                        </Button>
                        <Button
                            onClick={handleNext}
                            className="bg-[#F36F23] hover:bg-[#D65E1C] text-white h-12 px-10 text-base"
                        >
                            {currentStep === totalSteps ? "Submit" : "Next"}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}