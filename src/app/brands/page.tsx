import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ChevronRight, FileText, ArrowRight } from 'lucide-react';

const brands = [
    {
        name: 'Mankind',
        src: '/images/partners/converted-mankind.webp',
        pdfUrl: 'https://drive.google.com/file/d/1i0EYI77eAVmeeUqo36QyBvqyp-r4OvTd/view?usp=drive_link',
        description: 'Explore the complete wholesale catalog for Mankind Pharma products.'
    },
    {
        name: 'Mankind Prime',
        src: '',
        pdfUrl: 'https://drive.google.com/file/d/1LO7b6pW1S0hrZ0ghYI9iRwSsNfQVeONI/view?usp=drive_link',
        description: 'Explore the complete wholesale catalog for Mankind Prime products.'
    },
    {
        name: "Dr. Reddy's (Max)",
        src: '/images/partners/converted-dr-reddy.webp',
        pdfUrl: 'https://drive.google.com/file/d/1ACwhcefxThaQ0SU1mgv0xYjENfcuF47m/view?usp=drive_link',
        description: "Detailed product list and pricing for Dr. Reddy's Max wholesale distribution."
    },
    {
        name: "Dr. Reddy's (Leo)",
        src: '/images/partners/converted-dr-reddy.webp',
        pdfUrl: 'https://drive.google.com/file/d/1kjra2x3cZwu1rl6lF0BD9ABGAVZMioTz/view?usp=drive_link',
        description: "Detailed product list and pricing for Dr. Reddy's Leo wholesale distribution."
    },
    {
        name: 'Macleods',
        src: '/images/partners/converted-macleods.webp',
        pdfUrl: 'https://drive.google.com/file/d/1yvqoFU5WhHPKqGtogQ-ESFa3wQpHyfBW/view?usp=drive_link',
        description: 'Comprehensive wholesale catalogue of Macleods Pharmaceutical products.'
    },
    {
        name: 'Tynor (Orthopaedics)',
        src: '/images/partners/converted-tynor.webp',
        pdfUrl: 'https://drive.google.com/file/d/17JpLfSUVb2BvQIN20A_sjWW44ufy7XDg/view?usp=drive_link',
        description: 'Discover the full range of Tynor orthopaedic appliances and fracture aids.'
    },
    {
        name: 'Aristo',
        src: '/images/partners/converted-aristo.webp',
        pdfUrl: 'https://drive.google.com/file/d/1EZYt_OMZuT1_UIYfboKwqebDjdNM50NU/view?usp=drive_link',
        description: 'Complete wholesale catalog for Aristo products.'
    },
    {
        name: 'Sushima',
        src: '/images/partners/converted-sushima.webp',
        pdfUrl: 'https://drive.google.com/file/d/1bjnASIxDk0kXRDRUAxRrPZlF3HFZyVEJ/view?usp=drive_link',
        description: 'Comprehensive wholesale catalogue of Sushima Pharmaceuticals products.'
    },
    {
        name: 'Sarabhai',
        src: '/images/partners/converted-sarabhai.webp',
        pdfUrl: 'https://drive.google.com/file/d/1YrYXoqCngrT5kKqoWH4iuzYtabDrJGit/view?usp=drive_link',
        description: 'Detailed product list and pricing for Sarabhai Chemicals wholesale.'
    },
    {
        name: 'Welcomevet Pharma',
        src: '',
        pdfUrl: 'https://drive.google.com/file/d/1UehpABPuy9NWakVZUYbis6dqqKBls5xz/view?usp=drive_link',
        description: 'Explore the complete wholesale catalog for Welcomevet Pharma.'
    },
    {
        name: 'Univentis',
        src: '',
        pdfUrl: 'https://drive.google.com/file/d/1Te1v4TVqBYqhKYls6sRvH3wHtErV20po/view?usp=drive_link',
        description: 'Comprehensive wholesale catalogue of Univentis products.'
    },
    { name: 'Cipla', src: '/images/partners/converted-cipla.webp' },
    {
        name: 'Lupin Gx',
        src: '/images/partners/converted-lupin.webp',
        pdfUrl: 'https://drive.google.com/file/d/1HuWr4v4ga6z-aYr_NT5supOdCPNzZOj9/view?usp=drive_link',
        description: 'Comprehensive wholesale catalogue of Lupin Gx products.'
    },
    {
        name: 'Lupin OTC',
        src: '/images/partners/converted-lupin.webp',
        pdfUrl: 'https://drive.google.com/file/d/1HJZf1fC2ru2-AXS2vk5JeNg1JLfkeKdg/view?usp=drive_link',
        description: 'Comprehensive wholesale catalogue of Lupin OTC products.'
    },
    {
        name: 'Torrent Pharma',
        src: '/images/partners/converted-torrent-pharma.webp',
        pdfUrl: 'https://drive.google.com/file/d/1EpO-kBHhN3sdaw4dCiSQXtD6kkqSEkIn/view?usp=drive_link',
        description: 'Comprehensive wholesale catalogue of Torrent Pharma products.'
    },
    {
        name: 'Troikaa',
        src: '/images/partners/converted-troikaa.webp',
        pdfUrl: 'https://drive.google.com/file/d/16Ls5MKgr7H37UwMWKom3QBTJ2aaZRD9d/view?usp=drive_link',
        description: 'Comprehensive wholesale catalogue of Troikaa products.'
    },
    {
        name: 'Alembic',
        src: '/images/partners/converted-alembic.webp',
        pdfUrl: 'https://drive.google.com/file/d/1KWHuo0j6T8UKEyOC3TqIrC04A_s_4SXW/view?usp=drive_link',
        description: 'Comprehensive wholesale catalogue of Alembic products.'
    },
    {
        name: 'Medigrip',
        src: '/images/partners/converted-medigrip.webp',
        pdfUrl: 'https://drive.google.com/file/d/1FGeGGI2MLAgJeXtvwN6b4t1i0QY9VRfd/view?usp=drive_link',
        description: 'Comprehensive wholesale catalogue of Medigrip products.'
    },
];

export const metadata = {
    title: 'Our Pharma Partners | Aadarsh Medical',
    description: 'View and download the complete product catalogs for our trusted pharmaceutical partners.',
};

export default function BrandsPage() {
    return (
        <main className="min-h-screen bg-muted/20">
            <Header />

            <div className="pt-24 md:pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                        <ChevronRight size={14} />
                        <span className="text-primary font-bold">Our Pharma Partners</span>
                    </nav>

                    <div className="mb-12">
                        <h1 className="text-3xl md:text-5xl font-headline font-bold text-primary mb-4">Our Pharma Partners</h1>
                        <p className="text-muted-foreground text-lg max-w-2xl">
                            We are authorized wholesale distributors for India's leading pharmaceutical companies. Browse our partners below and download their complete product catalogs and price lists.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {brands.map((brand, idx) => {
                            const Content = (
                                <div className="bg-white rounded-[2rem] border border-muted/30 p-8 shadow-sm hover:shadow-xl hover:border-secondary/30 transition-all duration-300 h-full flex flex-col group relative overflow-hidden">
                                    <div className="h-24 relative mb-6 flex items-center justify-start">
                                        {brand.src ? (
                                            <Image
                                                src={brand.src}
                                                alt={`${brand.name} logo`}
                                                fill
                                                className="object-contain object-left scale-110 opacity-80 group-hover:opacity-100 transition-opacity"
                                            />
                                        ) : (
                                            <div className="flex items-center h-full text-2xl md:text-3xl font-bold text-muted-foreground/30">
                                                {brand.name}
                                            </div>
                                        )}
                                    </div>

                                    <h3 className="text-xl font-bold text-primary mb-2">{brand.name}</h3>

                                    {brand.description ? (
                                        <p className="text-muted-foreground text-sm flex-1">{brand.description}</p>
                                    ) : (
                                        <p className="text-muted-foreground text-sm flex-1">View the products available from {brand.name}.</p>
                                    )}

                                    {brand.pdfUrl && (
                                        <div className="mt-6 flex items-center gap-2 text-secondary font-bold text-sm group-hover:underline">
                                            <FileText size={18} />
                                            View Full Catalogue PDF
                                            <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    )}

                                    {/* Subtle Gradient Hover Effect */}
                                    <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-secondary to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                                </div>
                            );

                            if (brand.pdfUrl) {
                                return (
                                    <a href={brand.pdfUrl} target="_blank" rel="noopener noreferrer" key={idx} className="block w-full h-full">
                                        {Content}
                                    </a>
                                );
                            }

                            return (
                                <Link href={`/shop?brand=${encodeURIComponent(brand.name)}`} key={idx} className="block w-full h-full">
                                    {Content}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
