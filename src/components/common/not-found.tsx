"use client";

import { useRouter } from "next/navigation";
import { Home, ArrowLeft, Search } from "lucide-react";
import {Button} from "@/components/ui/button";

export const NotFoundComponent = () => {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                {/* 404 Illustration */}
                <div className="mb-8">
                    <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-orange-100 mb-6">
                        <Search className="size-16 text-[#F36F23]" />
                    </div>
                    <h1 className="text-6xl text-[#F36F23] mb-4">404</h1>
                    <h2 className="text-2xl text-[#2E2E2E] mb-3">Page Not Found</h2>
                    <p className="text-gray-600 mb-8">
                        Sorry, we couldn't find the page you're looking for. The page may have been moved or deleted.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                        onClick={() => router.back()}
                        variant="outline"
                        className="border-[1.5px] border-gray-400 hover:bg-gray-50"
                    >
                        <ArrowLeft className="size-4 mr-2" />
                        Go Back
                    </Button>
                    <Button
                        onClick={() => router.push("/dashboard")}
                        className="bg-[#F36F23] hover:bg-[#E05D15] text-white"
                    >
                        <Home className="size-4 mr-2" />
                        Back to Dashboard
                    </Button>
                </div>

                {/* Help Text */}
                <p className="text-sm text-gray-500 mt-8">
                    If you believe this is an error, please contact support.
                </p>
            </div>
        </div>
    );
}
