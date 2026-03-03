"use client"

import React from 'react';
import { FileText, ArrowRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CompanyCatalogue() {
    const driveLink = "https://drive.google.com/drive/folders/1Xbx27s68wUzgNaBRH74jSGsAPZ0dvH9u?usp=drive_link";

    return (
        <section className="py-12 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-[2.5rem] p-8 md:p-12 border border-primary/10 shadow-xl relative overflow-hidden group">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                        <FileText size={180} className="text-primary -rotate-12" />
                    </div>

                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
                        <div className="max-w-2xl text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 text-secondary font-bold text-xs uppercase tracking-widest mb-6">
                                <FileText size={14} />
                                Download Resources
                            </div>
                            <h2 className="text-3xl md:text-5xl font-headline font-bold text-primary mb-6">
                                Company <span className="text-secondary">Catalogues</span>
                            </h2>
                            <p className="text-muted-foreground text-lg leading-relaxed mb-8 opacity-90">
                                Access and download complete product catalogues and price lists from all our authorized pharma partners in one place.
                            </p>
                            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                                <Button asChild size="lg" className="gradient-button text-white rounded-2xl px-8 h-14 font-bold shadow-lg border-none group">
                                    <a href={driveLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                        <Download size={20} />
                                        Download All Catalogues
                                        <ArrowRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </Button>
                                <Button asChild variant="outline" size="lg" className="rounded-2xl px-8 h-14 font-bold border-primary text-primary hover:bg-primary/5 hover:text-primary transition-all">
                                    <a href="/brands">View Brands Separately</a>
                                </Button>
                            </div>
                        </div>

                        <div className="hidden lg:block lg:w-1/3">
                            <div className="relative w-full aspect-square bg-white rounded-3xl shadow-2xl border border-muted/20 p-6 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                                <div className="absolute inset-4 border-2 border-dashed border-muted/30 rounded-2xl" />
                                <div className="h-full flex flex-col items-center justify-center text-center p-4">
                                    <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4">
                                        <FileText size={40} />
                                    </div>
                                    <p className="font-bold text-primary text-lg mb-1">Full Inventory</p>
                                    <p className="text-muted-foreground text-sm">PDF, XLXS & Media</p>
                                    <div className="mt-6 flex -space-x-3">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-muted flex items-center justify-center text-[10px] font-bold text-primary shadow-sm overflow-hidden">
                                                <div className="w-full h-full bg-secondary/20 flex items-center justify-center">
                                                    CAT
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
