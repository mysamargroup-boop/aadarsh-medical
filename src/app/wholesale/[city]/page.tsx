import React from 'react';
import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import { ChevronRight, MapPin, Phone, Truck, ShieldCheck, ArrowRight, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-static';

const cities = [
    { slug: 'sagar', name: 'Sagar' },
    { slug: 'damoh', name: 'Damoh' },
    { slug: 'bina', name: 'Bina' },
    { slug: 'khurai', name: 'Khurai' },
    { slug: 'rahatgarh', name: 'Rahatgarh' },
    { slug: 'rehli', name: 'Rehli' },
    { slug: 'banda', name: 'Banda' },
    { slug: 'chhatarpur', name: 'Chhatarpur' },
];

export function generateStaticParams() {
    return cities.map((city) => ({
        city: city.slug,
    }));
}

export async function generateMetadata({ params }: { params: { city: string } }): Promise<Metadata> {
    const { city } = await params;
    const cityData = cities.find(c => c.slug === city);
    const cityName = cityData ? cityData.name : 'Central India';

    return {
        title: `Wholesale Medicine Distributor in ${cityName} | Adarsh Medical Store`,
        description: `Looking for a reliable bulk medicine supplier in ${cityName}? Adarsh Medical Store is the authorized distributor for Dr. Reddy's, Mankind, and 29+ brands with fast delivery.`,
        keywords: [`wholesale medicine ${cityName}`, `pharma distributor ${cityName}`, `medical agency in ${cityName}`, `bulk medicines supply ${cityName}`, 'Adarsh Medical Store'],
        openGraph: {
            title: `Wholesale Medicine Distributor serving ${cityName}`,
            description: `Authorized distributor for 29+ top pharmaceutical brands. Bulk orders and fast delivery to clinics and pharmacies in ${cityName}.`,
        }
    };
}

export default async function WholesaleCityPage({ params }: { params: { city: string } }) {
    const { city } = await params;
    const cityData = cities.find(c => c.slug === city);
    const cityName = cityData ? cityData.name : 'Central India';

    return (
        <main className="min-h-screen bg-muted/20">
            <Header />
            
            <div className="pt-28 md:pt-36 pb-20">
                <div className="max-w-6xl mx-auto px-4 md:px-8">
                    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                        <ChevronRight size={14} />
                        <span className="text-primary font-bold">Wholesale in {cityName}</span>
                    </nav>

                    {/* Hero Section */}
                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-muted relative overflow-hidden mb-12">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                        <div className="relative z-10 max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/15 text-secondary text-xs font-bold uppercase tracking-widest rounded-full mb-6">
                                <MapPin size={14} /> Serving {cityName}
                            </div>
                            <h1 className="text-3xl md:text-5xl font-headline font-bold text-primary mb-6 leading-tight">
                                Top Wholesale Medicine Distributor in {cityName}
                            </h1>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                Adarsh Medical Store is your trusted B2B pharmaceutical partner. We supply genuine medicines, surgical equipment, and veterinary products from 29+ international brands directly to clinics, hospitals, and retail pharmacies in <strong>{cityName}</strong>.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Button asChild className="bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full px-8 h-12 font-bold transition-all shadow-lg border-none hover:-translate-y-1">
                                    <a href={`https://wa.me/919630080706?text=I%20want%20to%20order%20wholesale%20medicines%20in%20${cityName}`} target="_blank" rel="noopener noreferrer">
                                        <Phone className="w-5 h-5 mr-2" /> Order via WhatsApp
                                    </a>
                                </Button>
                                <Button asChild variant="outline" className="rounded-full px-8 h-12 font-bold text-primary border-primary/20 hover:bg-primary/5 hover:text-primary transition-all">
                                    <Link href="/brands">View Partner Catalogues</Link>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Features Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-muted/50 hover:border-secondary/30 transition-colors">
                            <div className="w-12 h-12 rounded-full bg-secondary/15 text-secondary flex items-center justify-center mb-6">
                                <ShieldCheck size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-3">100% Genuine Products</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">Direct authorized distributors for Dr. Reddy's, Mankind, Macleods, and more. Zero counterfeit risk.</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-muted/50 hover:border-secondary/30 transition-colors">
                            <div className="w-12 h-12 rounded-full bg-secondary/15 text-secondary flex items-center justify-center mb-6">
                                <Truck size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-3">Fast Delivery to {cityName}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">Efficient logistics network ensuring your pharmaceutical stock reaches you on time, every time.</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-muted/50 hover:border-secondary/30 transition-colors">
                            <div className="w-12 h-12 rounded-full bg-secondary/15 text-secondary flex items-center justify-center mb-6">
                                <FileText size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-3">Transparent B2B Pricing</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">Get the best wholesale margins and bulk discounts directly from the authorized source.</p>
                        </div>
                    </div>

                    {/* How to Order */}
                    <div className="bg-primary text-white rounded-3xl p-8 md:p-12 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
                        <div className="relative z-10 text-center max-w-3xl mx-auto">
                            <h2 className="text-3xl font-headline font-bold mb-6">Start Ordering for Your Pharmacy in {cityName}</h2>
                            <p className="text-blue-100 mb-8 text-lg">Send us your drug license (DL) copy and GST number over WhatsApp. Once verified, we will share the wholesale price list and you can easily place daily orders.</p>
                            <Button asChild className="bg-secondary hover:bg-white hover:text-primary text-white rounded-full px-10 h-14 font-bold text-lg transition-all shadow-xl border-none">
                                <Link href="/inquiry">Fill Wholesale Inquiry Form <ArrowRight className="ml-2 w-5 h-5" /></Link>
                            </Button>
                        </div>
                    </div>

                </div>
            </div>

            <Footer />
        </main>
    );
}

// Ensure lucide icon 'FileText' import since I used it above
// Adding this via replace if it fails, but I should probably import it. I'll fix the import.
