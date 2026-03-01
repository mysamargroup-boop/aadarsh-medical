'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

const companies = [
    {
        name: "Dr. Reddy's",
        image: "/images/partners/converted-dr-reddy.webp",
        count: "450+ Products"
    },
    {
        name: "Macleods",
        image: "/images/partners/converted-macleods.webp",
        count: "320+ Products"
    },
    {
        name: "Cipla",
        image: "/images/partners/converted-cipla.webp",
        count: "280+ Products"
    },
    {
        name: "Mankind",
        image: "/images/partners/converted-mankind.webp",
        count: "500+ Products"
    },
    {
        name: "Aristo",
        image: "/images/partners/converted-aristo.webp",
        count: "150+ Products"
    },
    {
        name: "Lupin",
        image: "/images/partners/converted-lupin.webp",
        count: "210+ Products"
    }
];

export function CompanySection() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] -mr-64 -mt-64" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -ml-64 -mb-64" />

            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-6">
                            Our <span className="text-secondary italic">Pharma</span> Partners
                        </h2>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            We collaborate with world-class pharmaceutical manufacturing companies to bring you genuine medical supplies at authorized wholesale rates.
                        </p>
                    </div>
                    <Link
                        href="/shop"
                        className="group flex items-center gap-2 text-secondary font-bold text-sm uppercase tracking-widest hover:text-primary transition-colors"
                    >
                        All Partners <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {companies.map((company) => (
                        <Link
                            key={company.name}
                            href={`/shop?brand=${encodeURIComponent(company.name)}`}
                            className="group relative flex flex-col items-center text-center space-y-4 p-4 rounded-3xl hover:bg-muted/30 transition-all duration-500 hover:-translate-y-2"
                        >
                            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-muted/50 shadow-sm group-hover:shadow-md transition-all duration-500 p-4">
                                <Image
                                    src={company.image}
                                    alt={company.name}
                                    fill
                                    className="object-contain transition-transform duration-700 p-2"
                                />
                                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div>
                                <h3 className="font-bold text-primary group-hover:text-secondary transition-colors truncate w-full">
                                    {company.name}
                                </h3>
                                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest opacity-60">
                                    {company.count}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
