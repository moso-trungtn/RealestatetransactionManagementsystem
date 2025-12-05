import {useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
} from "lucide-react";
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";

interface LoginModalProps {
    open: boolean;
    onClose: () => void;
    onLogin: () => void;
}

export function LoginModal({open, onClose, onLogin}: LoginModalProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    // Demo account credentials
    const DEMO_EMAIL = "";
    const DEMO_PASSWORD = "";

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        onLogin();

        // Validate credentials
        if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
            // Set login state in localStorage
            localStorage.setItem('isLoggedIn', 'true');
        } else {
            setError("Invalid email or password. Try demo@moso.com / demo123");
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md p-0 overflow-hidden gap-0">
                <VisuallyHidden>
                    <DialogTitle>Sign In to TransactPro</DialogTitle>
                    <DialogDescription>
                        Enter your email and password to access your
                        transaction management dashboard
                    </DialogDescription>
                </VisuallyHidden>

                {/* Orange Header */}
                <div className="bg-gradient-to-r white px-8 pt-6 pb-4">
                    <div className="flex items-center justify-center gap-3 mb-3"></div>
                    <img
                        src="/main-logo.svg"
                        alt="Moso Logo"
                        className="h-12 w-auto mx-auto mb-1"
                    />
                    <p
                        className="text-orange-500 text-center"
                        style={{fontSize: "14px"}}
                    >
                        Real Estate Transaction Management
                    </p>
                </div>

                {/* Login Form */}
                <div className="px-8 py-6 bg-white">
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                            <p className="text-red-600 text-sm">{error}</p>
                        </div>
                    )}

                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <Label
                                htmlFor="email"
                                className="text-gray-700"
                                style={{fontSize: "13px", fontWeight: "500"}}
                            >
                                Email Address
                            </Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"/>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10 h-10 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <Label
                                    htmlFor="password"
                                    className="text-gray-700"
                                    style={{
                                        fontSize: "13px",
                                        fontWeight: "500",
                                    }}
                                >
                                    Password
                                </Label>
                                <a
                                    href="#"
                                    className="text-orange-500 hover:text-orange-600 transition-colors"
                                    style={{
                                        fontSize: "12px",
                                        fontWeight: "500",
                                    }}
                                >
                                    Forgot password?
                                </a>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"/>
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10 pr-10 h-10 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-4 h-4"/>
                                    ) : (
                                        <Eye className="w-4 h-4"/>
                                    )}
                                </button>
                            </div>
                        </div>

                        <Button
                            type="button"
                            className="w-full h-10 bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20 transition-all hover:shadow-orange-500/30"
                            style={{fontSize: "14px", fontWeight: "600"}}
                            onClick={(e) => handleSubmit(e)}
                        >
                            Sign In
                        </Button>
                    </div>

                    <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div
                            className="relative flex justify-center"
                            style={{fontSize: "12px"}}
                        >
              <span className="px-4 bg-white text-gray-500">
                Or continue with
              </span>
                        </div>
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        className="w-full h-10 border-2 border-orange-200 hover:border-orange-300 hover:bg-orange-50 text-gray-700 transition-all"
                        style={{fontSize: "14px", fontWeight: "600"}}
                    >
                        Single Sign-On with LoanFactory
                    </Button>

                    <div className="mt-4 text-center">
                        <p
                            className="text-gray-500"
                            style={{fontSize: "13px"}}
                        >
                            Don&apos;t have an account?{" "}
                            <a
                                href="#"
                                className="text-orange-500 hover:text-orange-600 transition-colors"
                                style={{fontWeight: "600"}}
                            >
                                Contact Admin
                            </a>
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-8 py-3 bg-gray-50 border-t border-gray-100">
                    <p
                        className="text-gray-400 text-center"
                        style={{fontSize: "11px"}}
                    >
                        Secured with industry-standard encryption
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
}