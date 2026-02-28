'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
    Building2,
    User,
    Phone,
    Mail,
    MessageSquare,
    Send,
    CheckCircle2,
    Clock,
    ShieldCheck,
    ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

export default function InquiryPage() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        organization: '',
        phone: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            setIsSubmitted(true);
            // Construct WhatsApp message as fallback
            const text = `Hi, I am interested in wholesale medicines.\n\nName: ${formData.name}\nOrg: ${formData.organization}\nPhone: ${formData.phone}\nRequirement: ${formData.message}`;
            const waUrl = `https://wa.me/919630080706?text=${encodeURIComponent(text)}`;
            window.open(waUrl, '_blank');
        }, 800);
    };

    return (
        <main className="min-h-screen bg-muted/20">
            <Header />

            <div className="pt-24 md:pt-32 pb-20">
                <div className="max-w-4xl mx-auto px-4 md:px-8">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
                    </Link>

                    {!isSubmitted ? (
                        <div className="bg-white rounded-[2.5rem] border border-muted/30 shadow-2xl overflow-hidden">
                            <div className="grid grid-cols-1 md:grid-cols-5">
                                {/* Information Sidebar */}
                                <div className="md:col-span-2 medical-gradient-dark p-8 md:p-12 text-white">
                                    <h1 className="text-3xl font-headline font-bold mb-6">Wholesale Inquiry</h1>
                                    <p className="text-white/80 text-sm leading-relaxed mb-10">
                                        Partner with Aadarsh MedStore for reliable pharmaceutical distribution. Fill out the form, and our procurement team will contact you within 24 hours.
                                    </p>

                                    <div className="space-y-6">
                                        <div className="flex gap-4 items-start">
                                            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                                                <Clock size={20} className="text-secondary" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-sm">Response Time</h4>
                                                <p className="text-white/60 text-xs mt-1">Under 24 Business Hours</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4 items-start">
                                            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                                                <ShieldCheck size={20} className="text-secondary" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-sm">Authorized Distributor</h4>
                                                <p className="text-white/60 text-xs mt-1">29+ Top Pharma Partners</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-20 pt-10 border-t border-white/10">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Direct Support</p>
                                        <p className="text-lg font-bold mt-2">+91 96300 80706</p>
                                    </div>
                                </div>

                                {/* Form Section */}
                                <div className="md:col-span-3 p-8 md:p-12">
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="organzation" className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                                <Building2 size={14} className="text-secondary" /> Pharmacy / Hospital Name
                                            </Label>
                                            <Input
                                                id="organization"
                                                required
                                                placeholder="Aadarsh Health Clinic"
                                                className="rounded-xl border-muted bg-muted/5 h-12 focus:ring-secondary"
                                                value={formData.organization}
                                                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                                    <User size={14} className="text-secondary" /> Contact Person
                                                </Label>
                                                <Input
                                                    id="name"
                                                    required
                                                    placeholder="John Doe"
                                                    className="rounded-xl border-muted bg-muted/5 h-12 focus:ring-secondary"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                                    <Phone size={14} className="text-secondary" /> Phone Number
                                                </Label>
                                                <Input
                                                    id="phone"
                                                    required
                                                    type="tel"
                                                    placeholder="+91 00000 00000"
                                                    className="rounded-xl border-muted bg-muted/5 h-12 focus:ring-secondary"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                                <Mail size={14} className="text-secondary" /> Email Address
                                            </Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="john@example.com"
                                                className="rounded-xl border-muted bg-muted/5 h-12 focus:ring-secondary"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                                <MessageSquare size={14} className="text-secondary" /> Message / Requirements
                                            </Label>
                                            <Textarea
                                                id="message"
                                                required
                                                placeholder="Please provide details of medicines or bulk requirements..."
                                                className="rounded-xl border-muted bg-muted/5 min-h-[120px] focus:ring-secondary"
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            />
                                        </div>

                                        <Button type="submit" className="w-full h-14 gradient-button text-white rounded-xl font-bold shadow-lg shadow-secondary/20 group">
                                            Submit Inquiry <Send size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-[2.5rem] border border-muted/30 shadow-2xl p-12 text-center">
                            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2 size={40} />
                            </div>
                            <h2 className="text-3xl font-headline font-bold text-primary mb-4">Inquiry Received!</h2>
                            <p className="text-muted-foreground max-w-md mx-auto mb-10 leading-relaxed">
                                Thank you for your interest in Aadarsh MedStore. Our team is reviewing your requirements and will get back to you shortly.
                            </p>
                            <Button asChild className="h-12 px-8 rounded-full gradient-button text-white font-bold">
                                <Link href="/">Return to Home</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </main>
    );
}
