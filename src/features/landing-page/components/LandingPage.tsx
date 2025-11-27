import { Button } from "@/components/button";
import {CheckCircle2, Clock, FileText, Users, TrendingUp, Shield, Zap, Mail, Phone, Star} from 'lucide-react';
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { Navbar } from "@/shared/components/Navbar";
import { Footer } from "@/shared/components/Footer";

interface LandingPageProps {
    onLoginClick: () => void;
    onRecruitingClick: () => void;
    onLogoClick?: () => void;
}

const testimonials = [
    {
        name: 'Mei Mei',
        date: 'June 2025',
        rating: 5,
        text: 'Very fast and professional, would work with again.',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
    },
    {
        name: 'Lockhart',
        date: 'May 2025',
        rating: 5,
        text: 'Outstanding! The app changed the game for me. It was brilliant and excellent work to get my last fall and last purchase built with it.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
    },
    {
        name: 'Antoy Hause',
        date: 'April 2025',
        rating: 5,
        text: 'I love MOSO. Since I had a great experience, it helped me a lot to choose the right package and customer.',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
    }
];
export function LandingPage({ onLoginClick , onRecruitingClick, onLogoClick}: LandingPageProps) {
    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <Navbar onLoginClick={onLoginClick} onLogoClick={onLogoClick} />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-b from-gray-50 to-white py-20 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-block mb-4">
                <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full" style={{ fontSize: '14px' }}>
                  Trusted by Real Estate Professionals
                </span>
                            </div>
                            <h1 className="text-gray-900 mb-6" style={{ fontSize: '48px', fontWeight: '700', lineHeight: '1.1' }}>
                                Streamline Your Real Estate Transactions
                            </h1>
                            <p className="text-gray-600 mb-8" style={{ fontSize: '20px', lineHeight: '1.6' }}>
                                The complete admin system designed for real estate professionals. Manage transactions, track commissions, coordinate paperwork, and close deals faster.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Button
                                    onClick={onRecruitingClick}
                                    className="bg-orange-500 hover:bg-orange-600 text-white !rounded-full"
                                    style={{ fontSize: '18px', padding: '24px 32px', height: 'auto' }}
                                >
                                    Join Us Now
                                </Button>
                                <Button
                                    variant="outline"
                                    className="border-gray-300 text-gray-700 !rounded-full"
                                    style={{ fontSize: '18px', padding: '24px 32px', height: 'auto' }}
                                >
                                    Contact Our Team
                                </Button>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                                <ImageWithFallback
                                    src="/landingpage-top-image.jpg"
                                    alt="Real Estate Office"
                                    className="w-full h-auto"
                                />
                            </div>
                            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6 border border-gray-100">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                        <TrendingUp className="w-6 h-6 text-orange-600" />
                                    </div>
                                    <div>
                                        <div className="text-gray-900" style={{ fontSize: '24px', fontWeight: '700' }}>98%</div>
                                        <div className="text-gray-600" style={{ fontSize: '14px' }}>Success Transactions</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-2 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-gray-900 mb-4" style={{ fontSize: '40px', fontWeight: '700' }}>
                            Everything You Need to Close Deals
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto" style={{ fontSize: '18px' }}>
                            Powerful features designed to help real estate professionals manage transactions from start to finish
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                                <FileText className="w-6 h-6 text-orange-600" />
                            </div>
                            <h3 className="text-gray-900 mb-3" style={{ fontSize: '22px', fontWeight: '600' }}>
                                Transaction Management
                            </h3>
                            <p className="text-gray-600">
                                Track all your deals in one place with detailed transaction cards, status updates, and quick access to critical information.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                                <Users className="w-6 h-6 text-orange-600" />
                            </div>
                            <h3 className="text-gray-900 mb-3" style={{ fontSize: '22px', fontWeight: '600' }}>
                                Commission Splitting
                            </h3>
                            <p className="text-gray-600">
                                Easily split commissions between loan factory, agents, and other parties with flexible, customizable calculations.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                                <Clock className="w-6 h-6 text-orange-600" />
                            </div>
                            <h3 className="text-gray-900 mb-3" style={{ fontSize: '22px', fontWeight: '600' }}>
                                Timeline Tracking
                            </h3>
                            <p className="text-gray-600">
                                Stay on top of every milestone with visual timelines, task management, and automated deadline reminders.
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                                <Shield className="w-6 h-6 text-orange-600" />
                            </div>
                            <h3 className="text-gray-900 mb-3" style={{ fontSize: '22px', fontWeight: '600' }}>
                                Document Management
                            </h3>
                            <p className="text-gray-600">
                                Organize and access all paperwork in one secure location. Upload, categorize, and share documents seamlessly.
                            </p>
                        </div>

                        {/* Feature 5 */}
                        <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                                <Zap className="w-6 h-6 text-orange-600" />
                            </div>
                            <h3 className="text-gray-900 mb-3" style={{ fontSize: '22px', fontWeight: '600' }}>
                                Quick Actions
                            </h3>
                            <p className="text-gray-600">
                                Speed up your workflow with customizable quick actions for common tasks and automated status updates.
                            </p>
                        </div>

                        {/* Feature 6 */}
                        <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                                <TrendingUp className="w-6 h-6 text-orange-600" />
                            </div>
                            <h3 className="text-gray-900 mb-3" style={{ fontSize: '22px', fontWeight: '600' }}>
                                Analytics & Insights
                            </h3>
                            <p className="text-gray-600">
                                Make data-driven decisions with comprehensive reports, performance metrics, and transaction analytics.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-[#F36F23]">
                <div className="max-w-7xl mx-auto px-8 lg:px-20">
                    <div className="text-center mb-16">
                        <h2 className="text-white mb-4" style={{ fontSize: '50px', fontWeight: '600' }}>
                            What our customers say
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-6 shadow-lg"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                                        <ImageWithFallback
                                            src={testimonial.avatar}
                                            alt={testimonial.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-[#2E2E2E]">{testimonial.name}</div>
                                        <div className="text-[#868E96] text-sm">{testimonial.date}</div>
                                    </div>
                                </div>

                                <div className="flex gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="size-4 fill-[#F36F23] text-[#F36F23]" />
                                    ))}
                                </div>

                                <p className="text-[#2E2E2E]">
                                    {testimonial.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-24 mx-8 lg:mx-20 ">
                <div className="max-w-7xl mx-auto">
                    <div className="relative rounded-[32px] overflow-hidden h-[436px]">
                        {/* Background Image with Gradient Overlay */}
                        <div className="absolute inset-0">
                            <ImageWithFallback
                                src="/landingpage-bottom-image.png"
                                alt="Professional Business"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,0,0,0.82)] via-[rgba(0,0,0,0.61)] to-[rgba(0,0,0,0.05)]" />
                        </div>

                        {/* Content */}
                        <div className="relative h-full flex items-center px-14">
                            <div className="max-w-xl space-y-12">
                                <div className="space-y-4">
                                    <h2 className="text-white text-[26px]">
                                        Ready to Experience the Difference?
                                    </h2>
                                    <p className="text-white text-lg opacity-90">
                                        Our team is ready to guide you with the expertise and integrity that MOSO is known for.
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-4">
                                    <Button
                                        variant="outline"
                                        className="bg-transparent border-white text-white hover:bg-white hover:text-[#F36F23] px-5 py-6 !rounded-full h-auto"
                                    >
                                        <Phone className="size-5 mr-2" />
                                        1-800-686-6868
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="bg-transparent border-white text-white hover:bg-white hover:text-[#F36F23] px-5 py-6 !rounded-full h-auto"
                                    >
                                        <Mail className="size-5 mr-2" />
                                        realestate@moso.com
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
}