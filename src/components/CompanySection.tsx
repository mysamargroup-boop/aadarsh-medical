'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, FileText } from 'lucide-react';

const companies = [
    {
        name: "Mankind Health Care GX",
        image: "/images/partners/converted-mankind.webp",
        count: "500+ Products",
        pdfUrl: "https://drive.google.com/file/d/1NZL4vl9XgOcmwFQwyyYjS1t3BWGTTIHk/view?usp=drive_link"
    },
    {
        name: "Mankind Prime",
        image: "/images/partners/converted-mankind-prime.webp",
        count: "150+ Products",
        pdfUrl: "https://drive.google.com/file/d/1LO7b6pW1S0hrZ0ghYI9iRwSsNfQVeONI/view?usp=drive_link"
    },
    {
        name: "Dr. Reddy's (Max)",
        image: "/images/partners/converted-dr-reddy.webp",
        count: "450+ Products",
        pdfUrl: "https://drive.google.com/file/d/1ACwhcefxThaQ0SU1mgv0xYjENfcuF47m/view?usp=drive_link"
    },
    {
        name: "Macleods",
        image: "/images/partners/converted-macleods.webp",
        count: "320+ Products",
        pdfUrl: "https://drive.google.com/file/d/1yvqoFU5WhHPKqGtogQ-ESFa3wQpHyfBW/view?usp=drive_link"
    },
    {
        name: "Aristo",
        image: "/images/partners/converted-aristo.webp",
        count: "150+ Products",
        pdfUrl: "https://drive.google.com/file/d/1EZYt_OMZuT1_UIYfboKwqebDjdNM50NU/view?usp=drive_link"
    },
    {
        name: "Lupin Gx",
        image: "/images/partners/converted-lupin.webp",
        count: "210+ Products",
        pdfUrl: "https://drive.google.com/file/d/1HuWr4v4ga6z-aYr_NT5supOdCPNzZOj9/view?usp=drive_link"
    },
    {
        name: "Torrent Pharma",
        image: "/images/partners/converted-torrent-pharma.webp",
        count: "190+ Products",
        pdfUrl: "https://drive.google.com/file/d/1EpO-kBHhN3sdaw4dCiSQXtD6kkqSEkIn/view?usp=drive_link"
    },
    {
        name: "Alembic",
        image: "/images/partners/converted-alembic.webp",
        count: "130+ Products",
        pdfUrl: "https://drive.google.com/file/d/1KWHuo0j6T8UKEyOC3TqIrC04A_s_4SXW/view?usp=drive_link"
    },
    {
        name: "Glenmark",
        image: "/images/partners/converted-glenmark.webp",
        count: "110+ Products",
        pdfUrl: "https://drive.google.com/file/d/1FGeGGI2MLAgJeXtvwN6b4t1i0QY9VRfd/view?usp=drive_link"
    },
    {
        name: "Troikaa",
        image: "/images/partners/converted-troikaa.webp",
        count: "95+ Products",
        pdfUrl: "https://drive.google.com/file/d/16Ls5MKgr7H37UwMWKom3QBTJ2aaZRD9d/view?usp=drive_link"
    },
    {
        name: "Sushima",
        image: "/images/partners/converted-sushima.webp",
        count: "80+ Products",
        pdfUrl: "https://drive.google.com/file/d/1bjnASIxDk0kXRDRUAxRrPZlF3HFZyVEJ/view?usp=drive_link"
    },
    {
        name: "Sarabhai",
        image: "/images/partners/converted-sarabhai.webp",
        count: "75+ Products",
        pdfUrl: "https://drive.google.com/file/d/1YrYXoqCngrT5kKqoWH4iuzYtabDrJGit/view?usp=drive_link"
    },
    {
        name: "Univentis",
        image: "/images/partners/converted-univentis.webp",
        count: "200+ Products",
        pdfUrl: "https://drive.google.com/file/d/1Te1v4TVqBYqhKYls6sRvH3wHtErV20po/view?usp=drive_link"
    },
    {
        name: "Welcomevet Pharma",
        image: "/images/partners/converted-welcomevet.webp",
        count: "120+ Products",
        pdfUrl: "https://drive.google.com/file/d/1UehpABPuy9NWakVZUYbis6dqqKBls5xz/view?usp=drive_link"
    }
];

export function CompanySection() {
    return (
        <section className="py-12 bg-white relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] -mr-64 -mt-64" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -ml-64 -mb-64" />

            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-6">
                            Our <span className="text-secondary italic">Pharma</span> Partners
                        </h2>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            We collaborate with world-class pharmaceutical manufacturing companies to bring you genuine medical supplies at authorized rates.
                        </p>
                    </div>
                    <Link
                        href="/brands"
                        className="group flex items-center gap-2 text-secondary font-bold text-sm uppercase tracking-widest hover:text-primary transition-colors"
                    >
                        View All <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {companies.map((company) => (
                        <a
                            key={company.name}
                            href={company.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
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
                                {/* PDF icon indicator */}
                                <div className="absolute top-2 right-2 w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <FileText size={12} className="text-secondary" />
                                </div>
                            </div>
                            <div>
                                <h3 className="font-bold text-primary group-hover:text-secondary transition-colors truncate w-full text-sm">
                                    {company.name}
                                </h3>
                                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest opacity-60">
                                    {company.count}
                                </p>
                                <p className="text-[9px] text-secondary font-semibold mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    View Catalogue PDF
                                </p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
