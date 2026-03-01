"use client"

import React from 'react';
import { Building2, CreditCard, Hash, Landmark, ArrowLeft, Copy, Check } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function BankDetailsPage() {
    const [copied, setCopied] = useState<string | null>(null);

    const bankDetails = [
        { label: 'Bank Name', value: 'State Bank of India (SBI)', icon: Landmark },
        { label: 'Account Holder', value: 'Aadarsh Medical Store', icon: Building2 },
        { label: 'Account No.', value: '44782773381', icon: Hash },
        { label: 'IFSC Code', value: 'SBIN0006138', icon: CreditCard },
    ];

    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        setCopied(label);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <>
            <Header />
            <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-4">
                <div className="max-w-2xl mx-auto">
                    <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-secondary font-bold mb-8 transition-colors group">
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>

                    <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-100">
                        <div className="medical-gradient-subnav p-10 text-white text-center">
                            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto mb-6">
                                <Landmark size={40} className="text-white" />
                            </div>
                            <h1 className="text-3xl font-headline font-bold mb-2">Bank Details</h1>
                            <p className="text-white/80">Official bank account information for payments</p>
                        </div>

                        <div className="p-8 md:p-12 space-y-6">
                            {bankDetails.map((detail) => (
                                <div key={detail.label} className="group flex flex-col md:flex-row md:items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-secondary/30 transition-all">
                                    <div className="flex items-center gap-4 mb-3 md:mb-0">
                                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary group-hover:text-secondary transition-colors">
                                            <detail.icon size={24} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{detail.label}</p>
                                            <p className="text-lg font-bold text-primary">{detail.value}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => copyToClipboard(detail.value, detail.label)}
                                        className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl text-xs font-bold text-primary border border-slate-200 hover:border-secondary hover:text-secondary transition-all shadow-sm"
                                    >
                                        {copied === detail.label ? (
                                            <>
                                                <Check size={14} className="text-emerald-500" />
                                                Copied!
                                            </>
                                        ) : (
                                            <>
                                                <Copy size={14} />
                                                Copy
                                            </>
                                        )}
                                    </button>
                                </div>
                            ))}

                            <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100 mt-8">
                                <p className="text-sm font-medium text-emerald-800 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                    Note: Please share a screenshot of the payment confirmation on our WhatsApp number (+91 9630080706) after successful transfer.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
