
"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
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
  ShieldCheck,
  ThermometerSnowflake,
  FileText,
  BadgeCheck,
  Microscope,
  Plus,
  Minus,
  ChevronLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

export default function ProductDetailPage() {
  const [quantity, setQuantity] = useState(100);
  const [priceTier, setPriceTier] = useState('tier2');

  const tiers = [
    { id: 'tier1', label: '1 - 49 Strips', price: 201.50 },
    { id: 'tier2', label: '50 - 199 Strips', price: 185.00, popular: true },
    { id: 'tier3', label: '200+ Strips', price: 172.00 },
  ];

  const currentPrice = tiers.find(t => t.id === priceTier)?.price || 0;
  const totalPrice = (currentPrice * quantity).toLocaleString('en-IN');

  return (
    <main className="min-h-screen bg-muted/20">
      <Navigation />
      
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link href="/#products" className="hover:text-primary transition-colors">Pharmaceuticals</Link>
            <ChevronRight size={14} />
            <span className="text-primary font-bold">Augmentin 625 Duo</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <div className="relative aspect-square bg-white rounded-[2rem] overflow-hidden border border-muted shadow-sm group">
                <div className="absolute top-6 left-6 z-10 space-y-2">
                  <Badge className="bg-destructive hover:bg-destructive/90 text-destructive-foreground border-none px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-tight">
                    Prescription Required
                  </Badge>
                  <br />
                  <Badge className="bg-accent hover:bg-accent/90 text-accent-foreground border-none px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-tight">
                    Cold Chain
                  </Badge>
                </div>

                <div className="absolute inset-0">
                  <Image 
                    src="https://picsum.photos/seed/augmentin/800/800"
                    alt="Augmentin 625 Duo"
                    fill
                    className="object-cover"
                    data-ai-hint="medicine box"
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

              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className={cn(
                    "aspect-square rounded-2xl bg-white border cursor-pointer hover:border-secondary transition-all overflow-hidden",
                    i === 1 ? "border-secondary ring-2 ring-secondary/20" : "border-muted"
                  )}>
                    <Image 
                      src={`https://picsum.photos/seed/augmentin-${i}/200/200`}
                      alt="Thumbnail"
                      width={200}
                      height={200}
                      className="object-cover h-full w-full"
                    />
                  </div>
                ))}
                <div className="aspect-square rounded-2xl bg-white border border-muted flex items-center justify-center text-muted-foreground hover:border-secondary transition-all cursor-pointer">
                  <PlayCircle size={32} />
                </div>
              </div>

              {/* Quality Badges Section - Refined sizes and gaps */}
              <div className="bg-white p-5 rounded-[2rem] border border-muted shadow-sm flex flex-col gap-5">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 bg-accent/10 rounded-xl flex items-center justify-center text-accent shrink-0">
                    <ThermometerSnowflake size={22} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm md:text-base text-primary">Cold Chain Maintained</h4>
                    <p className="text-[11px] md:text-xs text-muted-foreground leading-tight">Stored between 2°C - 8°C throughout the supply chain.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary shrink-0">
                    <BadgeCheck size={22} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm md:text-base text-primary">WHO-GMP Certified</h4>
                    <p className="text-[11px] md:text-xs text-muted-foreground leading-tight">Sourced directly from authorized manufacturers.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                    <FileText size={22} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm md:text-base text-primary">Batch Tracking</h4>
                    <p className="text-[11px] md:text-xs text-muted-foreground leading-tight">Full traceability with Batch No. and Expiry Date.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary shrink-0">
                    <Microscope size={22} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm md:text-base text-primary">Lab Tested</h4>
                    <p className="text-[11px] md:text-xs text-muted-foreground leading-tight">Every batch passes rigorous quality checks.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">Augmentin 625 Duo</h1>
                  <button className="p-3 bg-muted rounded-full text-muted-foreground hover:text-destructive transition-colors border shadow-sm">
                    <Heart size={20} />
                  </button>
                </div>
                <p className="text-lg text-muted-foreground mb-4 font-medium">Amoxycillin (500mg) + Clavulanic Acid (125mg)</p>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                  <span className="text-muted-foreground">Manufacturer: <span className="text-secondary font-bold">GlaxoSmithKline</span></span>
                  <span className="text-muted-foreground">SKU: <span className="text-primary font-bold">AUG-625-D</span></span>
                  <span className="flex items-center gap-1 text-green-600 font-bold">
                    <div className="w-2 h-2 rounded-full bg-green-600 animate-pulse" /> In Stock
                  </span>
                </div>
              </div>

              <Card className="rounded-[2rem] border-muted overflow-hidden shadow-none bg-muted/10">
                <CardContent className="p-8 space-y-6">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Wholesale Pricing Tiers</p>
                  
                  <RadioGroup value={priceTier} onValueChange={setPriceTier} className="space-y-3">
                    {tiers.map((tier) => (
                      <div 
                        key={tier.id}
                        className={cn(
                          "relative flex items-center justify-between p-5 rounded-2xl border transition-all cursor-pointer",
                          priceTier === tier.id 
                            ? "border-primary bg-primary/5 ring-1 ring-primary/50" 
                            : "border-muted bg-white hover:border-primary/30"
                        )}
                      >
                        {tier.popular && (
                          <div className="absolute -top-2.5 right-6 bg-primary text-primary-foreground text-[8px] px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                            Most Popular
                          </div>
                        )}
                        <div className="flex items-center gap-4">
                          <RadioGroupItem value={tier.id} id={tier.id} className="border-primary" />
                          <Label htmlFor={tier.id} className="font-bold text-primary cursor-pointer">{tier.label}</Label>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-primary text-lg">₹{tier.price.toFixed(2)}</span>
                          <span className="text-[10px] text-muted-foreground ml-1">/strip</span>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-muted">
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-bold text-muted-foreground">Quantity:</span>
                      <div className="flex items-center bg-muted rounded-xl p-1 border">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-lg"
                          onClick={() => setQuantity(q => Math.max(1, q - 10))}
                        >
                          <Minus size={14} />
                        </Button>
                        <input 
                          type="number" 
                          value={quantity} 
                          onChange={(e) => setQuantity(Number(e.target.value))}
                          className="w-16 text-center bg-transparent font-bold text-primary border-none outline-none"
                        />
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-lg"
                          onClick={() => setQuantity(q => q + 10)}
                        >
                          <Plus size={14} />
                        </Button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground font-bold">Total (excl. GST)</p>
                      <p className="text-4xl font-headline font-bold text-primary">₹{totalPrice}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button size="lg" className="bg-primary hover:bg-primary/95 text-primary-foreground rounded-2xl h-14 font-bold text-lg">
                      <ShoppingCart className="mr-2" size={20} /> Add to Enquiry
                    </Button>
                    <Button size="lg" className="bg-[#25D366] hover:bg-[#1DA851] text-secondary-foreground rounded-2xl h-14 font-bold text-lg shadow-lg shadow-green-500/10">
                      <WhatsAppIcon className="mr-2 w-6 h-6" /> WhatsApp Chat
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed">
                <p>
                  Augmentin 625 Duo Tablet is a penicillin-type of antibiotic that helps your body fight infections caused by bacteria. It is used to treat infections of the lungs (e.g., pneumonia), ear, nasal sinus, urinary tract, skin, and soft tissue. It will not work for viral infections such as the common cold.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-16 border-t">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-headline font-bold text-primary">Complete Your Surgical Kit</h2>
                <p className="text-muted-foreground mt-1">Frequently bought together by hospitals and retailers.</p>
              </div>
              <div className="hidden md:flex gap-2">
                <Button variant="outline" size="icon" className="rounded-full"><ChevronLeft size={20} /></Button>
                <Button variant="outline" size="icon" className="rounded-full"><ChevronRight size={20} /></Button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              {[
                { name: "Paracetamol 650mg - 50 Strip Box", cat: "Analgesic", price: "120.00", img: "https://picsum.photos/seed/p1/400/400" },
                { name: "Limcee Vitamin C Chewable", cat: "Supplements", price: "85.00", img: "https://picsum.photos/seed/p5/400/400" },
                { name: "N95 Face Masks - Box of 50", cat: "Surgical", price: "450.00", img: "https://picsum.photos/seed/p6/400/400" },
                { name: "Azithromycin 500mg Tablets", cat: "Antibiotics", price: "115.00", img: "https://picsum.photos/seed/p8/400/400" }
              ].map((p, i) => (
                <div key={i} className="group bg-white rounded-3xl border border-muted p-4 md:p-6 hover:shadow-xl transition-all">
                  <div className="relative aspect-square bg-muted/20 rounded-2xl mb-4 overflow-hidden">
                    <Image src={p.img} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform" />
                  </div>
                  <Badge variant="secondary" className="bg-muted text-secondary border-none text-[8px] md:text-[10px] mb-2">{p.cat}</Badge>
                  <h3 className="font-bold text-primary mb-4 line-clamp-1 text-sm md:text-base">{p.name}</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[8px] text-muted-foreground font-bold uppercase">Wholesale</p>
                      <p className="font-bold text-primary text-sm md:text-base">₹{p.price}</p>
                    </div>
                    <Button size="icon" variant="ghost" className="bg-muted hover:bg-primary hover:text-primary-foreground rounded-xl w-8 h-8 md:w-10 md:h-10">
                      <Plus size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
