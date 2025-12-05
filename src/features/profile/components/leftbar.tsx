import React, {FC} from 'react'
import {Check, Upload, User} from "lucide-react";
import {Label} from "@/components/ui/label";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {ImageWithFallback} from "@/components/custom/image-with-fallback";
import {Button} from "@/components/ui/button";
import {initDataFormType, menuItemsType} from "@/features/profile/components/Profile";
import {PrimaryButton} from "@/components/custom/primary-button";

type LeftBarProps = {
    primaryColor: string;
    formData:initDataFormType
    menuItems: menuItemsType
    handleSaveProfile: () => void;
    toast: any
    activeSection:string;
    scrollToSection: (ref: React.RefObject<HTMLDivElement | null>, id:string) => void;
}

export const LeftBar:FC<LeftBarProps> = ({toast,menuItems,handleSaveProfile,formData,primaryColor,scrollToSection,activeSection}) => {
    return (
        <aside className="min-w-fit p-4 sticky top-[86px] flex flex-col ">
            <div className="w-80 bg-white border border-gray-200 shadow-md rounded-xl h-fit min-h-[600px] flex flex-col">

                {/*<div className="p-6 border-b">*/}
                {/*    <h1 className="text-2xl">Admin Profile</h1>*/}
                {/*    <p className="text-sm text-gray-500 mt-1">Manage your account settings</p>*/}
                {/*</div>*/}

                {/* Profile Summary */}
                <div className="p-6 border-b">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16 ring-2 ring-offset-2" style={{ borderColor: primaryColor }}>
                            <AvatarImage src={formData.profilePicture} />
                            <AvatarFallback style={{ backgroundColor: primaryColor }}>
                                <ImageWithFallback
                                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&h=200&fit=crop"
                                    alt="Profile"
                                    className="h-full w-full object-cover"
                                />
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <p className="truncate">{formData.firstName} {formData.lastName}</p>
                            <p className="text-sm text-gray-500 truncate">{formData.personalEmail}</p>
                        </div>
                    </div>
                </div>

                {/* Navigation Menu */}
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {menuItems.map((item:any) => {
                        const Icon = item.icon;
                        const isActive = activeSection === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.ref, item.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                                    isActive
                                        ? 'text-white shadow-md'
                                        : 'text-gray-700 hover:bg-gray-100'
                                }`}
                                style={isActive ? { backgroundColor: primaryColor } : {}}
                            >
                                <Icon className="h-5 w-5 flex-shrink-0" />
                                <span className="text-sm">{item.label}</span>
                            </button>
                        );
                    })}
                </nav>

                {/* Bottom Action Buttons */}
                <div className="p-4 border-t space-y-2">
                    <PrimaryButton onClick={handleSaveProfile} className="w-full">
                        <Check className="h-4 w-4 mr-2" />
                        Save Changes
                    </PrimaryButton>
                    <Button variant="outline" onClick={() => toast.info('Changes discarded')} className="w-full">
                        Cancel
                    </Button>
                </div>
            </div>

        </aside>
    )
}
