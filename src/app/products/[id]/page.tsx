
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
  ArrowLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { products } from '@/lib/product-data';

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [quantity, setQuantity] = useState(100);
  const [priceTier, setPriceTier] = useState('tier2');

  const product = useMemo(() => {
    return products.find(p => p.id === params.id) || products[0];
  }, [params.id]);

  const tiers = [
    { id: 'tier1', label: '1 - 49 units', price: product.price * 1.05 },
    { id: 'tier2', label: '50 - 199 units', price: product.price, popular: true },
    { id: 'tier3', label: '200+ units', price: product.price * 0.95 },
  ];

  const currentPrice = tiers.find(t => t.id === priceTier)?.price || product.price;
  const totalPrice = (currentPrice * quantity).toLocaleString('en-IN');

  const handleEnquiry = () => {
    const message = encodeURIComponent(`I am interested in ${product.name}. Quantity: ${quantity}. Price Tier: ${priceTier}.`);
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
              <div className="relative aspect-square bg-card rounded-[2rem] overflow-hidden border border-muted shadow-sm group">
                <div className="absolute top-6 left-6 z-10 space-y-2">
                  {product.rx && (
                    <Badge className="bg-destructive hover:bg-destructive/90 text-white border-none px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-tight">
                      Prescription Required
                    </Badge>
                  )}
                  <br />
                  <Badge className="bg-accent hover:bg-accent/90 text-white border-none px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-tight">
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
                  <Button variant="secondary" size="sm" className="bg-muted text-secondary rounded-full shadow-lg hover:bg-muted/90">
                    <Rotate3D className="mr-2" size={16} /> 360° View
                  </Button>
                  <Button variant="secondary" size="sm" className="bg-muted text-secondary rounded-full shadow-lg hover:bg-muted/90">
                    <PlayCircle className="mr-2" size={16} /> Video
                  </Button>
                </div>
              </div>

              {/* Quality Badges Section (Left Side) */}
              <div className="bg-white p-6 rounded-[2rem] border border-muted shadow-sm flex flex-col gap-6">
                <h3 className="text-primary font-bold text-lg mb-2">Quality Assurance</h3>
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 bg-accent/10 rounded-xl flex items-center justify-center text-accent shrink-0">
                    <ThermometerSnowflake size={22} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm text-primary leading-tight">Controlled Storage</h4>
                    <p className="text-[11px] text-muted-foreground leading-tight">Maintained under optimal conditions for efficacy.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary shrink-0">
                    <BadgeCheck size={22} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm text-primary leading-tight">Authentic Supply</h4>
                    <p className="text-[11px] text-muted-foreground leading-tight">Sourced from authorized pharmaceutical channels.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                    <FileText size={22} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm text-primary leading-tight">Full Traceability</h4>
                    <p className="text-[11px] text-muted-foreground leading-tight">Complete batch details and expiry tracking.</p>
                  </div>
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
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                  <span className="text-muted-foreground">Manufacturer: <span className="text-secondary font-bold">{product.company}</span></span>
                  <span className="text-muted-foreground">Packing: <span className="text-primary font-bold">{product.packing}</span></span>
                  <span className="flex items-center gap-1 text-green-600 font-bold">
                    <div className="w-2 h-2 rounded-full bg-green-600 animate-pulse" /> In Stock
                  </span>
                </div>
              </div>

              {/* Description Section (Above Pricing) */}
              <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed bg-card p-8 rounded-[2rem] border border-muted shadow-sm">
                <h3 className="text-primary font-bold text-lg mb-4">Product Description</h3>
                <p>{product.description}</p>
              </div>

              {/* Wholesale Pricing Tiers Card */}
              <Card className="rounded-[2rem] border-muted overflow-hidden shadow-none bg-muted/10">
                <CardContent className="p-8 space-y-6">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Wholesale Pricing Tiers (Incl. GST)</p>
                  
                  <RadioGroup value={priceTier} onValueChange={setPriceTier} className="space-y-3">
                    {tiers.map((tier) => (
                      <div 
                        key={tier.id}
                        className={cn(
                          "relative flex items-center justify-between p-5 rounded-2xl border transition-all cursor-pointer",
                          priceTier === tier.id 
                            ? "border-primary bg-primary/5 ring-1 ring-primary/50" 
                            : "border-muted bg-card hover:border-primary/30"
                        )}
                      >
                        {tier.popular && (
                          <div className="absolute -top-2.5 right-6 bg-primary text-white text-[8px] px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                            Most Popular
                          </div>
                        )}
                        <div className="flex items-center gap-4">
                          <RadioGroupItem value={tier.id} id={tier.id} className="border-primary" />
                          <Label htmlFor={tier.id} className="font-bold text-primary cursor-pointer">{tier.label}</Label>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-primary text-lg">₹{tier.price.toFixed(2)}</span>
                          <span className="text-[10px] text-muted-foreground ml-1">/unit</span>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>

                  <div className="flex flex-row items-center justify-between gap-4 pt-6 border-t border-muted w-full">
                    <div className="text-left">
                      <p className="text-[10px] text-muted-foreground font-bold uppercase">Total (incl. GST)</p>
                      <p className="text-2xl sm:text-3xl font-headline font-bold text-primary">₹{totalPrice}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center bg-white rounded-xl p-0.5 border shadow-sm">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-lg hover:bg-secondary/10"
                          onClick={() => setQuantity(q => Math.max(1, q - 10))}
                        >
                          <Minus size={14} className="text-primary" />
                        </Button>
                        <input 
                          type="number" 
                          value={quantity} 
                          onChange={(e) => setQuantity(Number(e.target.value))}
                          className="w-12 text-center bg-transparent font-bold text-primary border-none outline-none text-sm"
                        />
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-lg hover:bg-secondary/10"
                          onClick={() => setQuantity(q => q + 10)}
                        >
                          <Plus size={14} className="text-primary" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button 
                      onClick={handleEnquiry}
                      size="lg" className="gradient-button text-white rounded-2xl h-14 font-bold text-lg group border-none">
                      <ShoppingCart className="mr-2 group-hover:scale-110 transition-transform" size={20} /> Add to Enquiry
                    </Button>
                    <Button 
                      onClick={() => window.open('https://wa.me/919630080706', '_blank')}
                      size="lg" className="bg-[#25D366] hover:bg-[#1DA851] text-white rounded-2xl h-14 font-bold text-lg shadow-lg shadow-green-500/10 border-none">
                      <WhatsAppIcon className="mr-2 w-6 h-6" /> WhatsApp Chat
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
