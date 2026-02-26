"use client"

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ChevronRight, 
  Heart, 
  ShoppingCart, 
  Rotate3D, 
  PlayCircle,
  ThermometerSnowflake,
  FileText,
  BadgeCheck,
  Plus,
  Minus,
  Stethoscope,
  Info,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { products } from '@/lib/product-data';

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

export default function ProductDetailPage() {
  const params = useParams();
  const [quantity, setQuantity] = useState(1);

  const product = useMemo(() => {
    const slugArray = params.slug as string[];
    const lastPart = slugArray[slugArray.length - 1];
    const productId = lastPart.split('-').pop(); // Extracts ID from 'product-name-id'
    return products.find(p => p.id === productId) || products[0];
  }, [params.slug]);

  const handleEnquiry = () => {
    const message = encodeURIComponent(`I am interested in ${product.name}. Quantity: ${quantity}.`);
    window.open(`https://wa.me/919630080706?text=${message}`, '_blank');
  };

  return (
    <main className="min-h-screen bg-muted/20">
      <Header />
      
      <div className="pt-24 md:pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link href="/shop" className="hover:text-primary transition-colors">{product.cat}</Link>
            <ChevronRight size={14} />
            <span className="text-primary font-bold">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-8">
              {/* Product Image Section */}
              <div className="relative aspect-square bg-white rounded-[2rem] overflow-hidden border border-muted shadow-sm group">
                <div className="absolute top-6 left-6 z-10 space-y-2">
                  {product.rx && (
                    <Badge className="bg-destructive hover:bg-destructive/90 text-white border-none px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
                      Prescription Required
                    </Badge>
                  )}
                  <br />
                  <Badge className="bg-accent hover:bg-accent/90 text-white border-none px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
                    {product.format}
                  </Badge>
                </div>

                <div className="absolute inset-0">
                  <Image 
                    src={product.img}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="secondary" size="sm" className="bg-white/90 backdrop-blur-sm text-secondary rounded-full shadow-lg border-none">
                    <Rotate3D className="mr-2" size={16} /> 360°
                  </Button>
                  <Button variant="secondary" size="sm" className="bg-white/90 backdrop-blur-sm text-secondary rounded-full shadow-lg border-none">
                    <PlayCircle className="mr-2" size={16} /> Video
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {/* Title Section */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary">{product.name}</h1>
                  <button className="p-3 bg-white rounded-full text-muted-foreground hover:text-destructive transition-colors border shadow-sm">
                    <Heart size={20} />
                  </button>
                </div>
                <p className="text-lg text-muted-foreground mb-4 font-medium">{product.molecules}</p>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs uppercase font-bold tracking-widest">
                  <span className="text-muted-foreground">Manufacturer: <span className="text-secondary">{product.company}</span></span>
                  <span className="text-muted-foreground">Packing: <span className="text-primary">{product.packing}</span></span>
                  <span className="flex items-center gap-1.5 text-green-600">
                    <div className="w-2 h-2 rounded-full bg-green-600 animate-pulse" /> In Stock
                  </span>
                </div>
              </div>

              {/* Description & Usage */}
              <div className="space-y-6">
                <div className="bg-white p-8 rounded-[2rem] border border-muted shadow-sm">
                  <h3 className="text-primary font-bold text-lg mb-4 flex items-center gap-2">
                    <Info className="text-secondary" size={20} /> Product Information
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{product.description}</p>
                </div>

                {product.usage && (
                  <div className="bg-secondary/5 p-8 rounded-[2rem] border border-secondary/20 shadow-sm">
                    <h3 className="text-secondary font-bold text-lg mb-4 flex items-center gap-2">
                      <Stethoscope size={20} /> Usage & Indications
                    </h3>
                    <p className="text-primary font-medium text-sm leading-relaxed">{product.usage}</p>
                  </div>
                )}
              </div>

              {/* Pricing Section */}
              <Card className="rounded-[2.5rem] border-muted overflow-hidden shadow-none bg-muted/10 border-none">
                <CardContent className="p-8 space-y-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-1">Maximum Retail Price</p>
                      <div className="flex items-end gap-1">
                        <span className="text-4xl font-headline font-bold text-primary">₹{product.price.toFixed(2)}</span>
                        <span className="text-muted-foreground font-bold text-xs mb-1">/ unit</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-1 font-bold italic">*Incl. of all taxes (GST)</p>
                    </div>
                    <div className="bg-white px-4 py-2 rounded-xl border border-muted shadow-sm">
                       <p className="text-[8px] font-bold uppercase text-secondary mb-1">Availability</p>
                       <p className="text-[10px] font-bold text-primary">Ready for Supply</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 pt-6 border-t border-muted/30">
                    <div className="flex-1">
                      <Label className="text-[10px] uppercase font-bold text-muted-foreground mb-2 block">Order Quantity</Label>
                      <div className="flex items-center bg-white rounded-xl p-1 border shadow-inner w-fit">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-9 w-9 rounded-lg hover:bg-secondary/10"
                          onClick={() => setQuantity(q => Math.max(1, q - 1))}
                        >
                          <Minus size={14} className="text-primary" />
                        </Button>
                        <input 
                          type="number" 
                          value={quantity} 
                          onChange={(e) => setQuantity(Number(e.target.value))}
                          className="w-14 text-center bg-transparent font-bold text-primary border-none outline-none text-sm"
                        />
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-9 w-9 rounded-lg hover:bg-secondary/10"
                          onClick={() => setQuantity(q => q + 1)}
                        >
                          <Plus size={14} className="text-primary" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="text-right">
                       <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Total MRP</p>
                       <p className="text-2xl font-bold text-secondary">₹{(product.price * quantity).toLocaleString('en-IN')}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button 
                      onClick={handleEnquiry}
                      size="lg" className="gradient-button text-white rounded-2xl h-14 font-bold text-base group border-none">
                      <ShoppingCart className="mr-2 group-hover:scale-110 transition-transform" size={20} /> Add to Enquiry
                    </Button>
                    <Button 
                      onClick={() => window.open('https://wa.me/919630080706', '_blank')}
                      size="lg" className="bg-[#25D366] hover:bg-[#1DA851] text-white rounded-2xl h-14 font-bold text-base shadow-lg shadow-green-500/10 border-none">
                      <WhatsAppIcon className="mr-2 w-6 h-6" /> WhatsApp Chat
                    </Button>
                  </div>

                  <p className="text-[10px] text-center text-muted-foreground flex items-center justify-center gap-2">
                    <Clock size={12} /> Same-day processing for orders before 4 PM
                  </p>
                </CardContent>
              </Card>

              {/* Quality Badges Section */}
              <div className="bg-white p-8 rounded-[2rem] border border-muted shadow-sm flex flex-col gap-6">
                <h3 className="text-primary font-bold text-lg mb-2 flex items-center gap-2">
                  <ShieldCheck className="text-secondary" /> Quality Assurance
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent shrink-0 group-hover:bg-accent group-hover:text-white transition-all">
                      <ThermometerSnowflake size={24} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm text-primary leading-tight">Cold Chain</h4>
                      <p className="text-[11px] text-muted-foreground leading-tight">Strict temperature controls.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary shrink-0 group-hover:bg-secondary group-hover:text-white transition-all">
                      <BadgeCheck size={24} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm text-primary leading-tight">Authentic Supply</h4>
                      <p className="text-[11px] text-muted-foreground leading-tight">Direct from partners.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                      <FileText size={24} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm text-primary leading-tight">Traceability</h4>
                      <p className="text-[11px] text-muted-foreground leading-tight">Full batch details.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
