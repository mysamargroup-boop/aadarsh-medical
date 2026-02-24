'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ShopFilters } from '@/components/ShopFilters';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, ChevronRight, LayoutGrid, List, SlidersHorizontal, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';

const allProducts = [
  { id: 1, name: "Augmentin 625 DUO", company: "GlaxoSmithKline", cat: "Antibiotics", price: "120.00", img: "https://picsum.photos/seed/p1/600/600", rx: true },
  { id: 2, name: "Calpol 650mg", company: "GSK", cat: "Antipyretic", price: "45.50", img: "https://picsum.photos/seed/p2/600/600", rx: false },
  { id: 3, name: "Telma 40", company: "Glenmark", cat: "Cardiac", price: "185.00", img: "https://picsum.photos/seed/p3/600/600", rx: true },
  { id: 4, name: "Dolo 650", company: "Micro Labs", cat: "Analgesic", price: "30.00", img: "https://picsum.photos/seed/p4/600/600", rx: false },
  { id: 5, name: "Limcee Vitamin C", company: "Himalaya", cat: "Supplements", price: "85.00", img: "https://picsum.photos/seed/p5/600/600", rx: false },
  { id: 6, name: "N95 Face Masks", company: "3M", cat: "Surgical", price: "450.00", img: "https://picsum.photos/seed/p6/600/600", rx: false },
  { id: 7, name: "Accu-Chek Guide", company: "Roche", cat: "Medical Device", price: "1250.00", img: "https://picsum.photos/seed/p7/600/600", rx: false },
  { id: 8, name: "Azithromycin 500mg", company: "Cipla", cat: "Antibiotics", price: "115.00", img: "https://picsum.photos/seed/p8/600/600", rx: true },
  { id: 9, name: "Betadine Ointment", company: "Win-Medicare", cat: "Antiseptic", price: "95.00", img: "https://picsum.photos/seed/p9/600/600", rx: false },
  { id: 10, name: "Pudin Hara Pearls", company: "Dabur", cat: "Digestive", price: "25.00", img: "https://picsum.photos/seed/p10/600/600", rx: false },
  { id: 11, name: "Vicks Vaporub", company: "P&G", cat: "Cold & Cough", price: "145.00", img: "https://picsum.photos/seed/p11/600/600", rx: false },
  { id: 12, name: "Omnigel 30g", company: "Cipla", cat: "Pain Relief", price: "110.00", img: "https://picsum.photos/seed/p12/600/600", rx: false },
];

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [rxRequired, setRxRequired] = useState<boolean | null>(null);

  const filteredProducts = useMemo(() => {
    return allProducts.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.company.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = selectedCats.length === 0 || selectedCats.includes(p.cat);
      const matchesRx = rxRequired === null || p.rx === rxRequired;
      return matchesSearch && matchesCat && matchesRx;
    });
  }, [searchQuery, selectedCats, rxRequired]);

  const toggleCategory = (cat: string) => {
    setSelectedCats(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const clearFilters = () => {
    setSelectedCats([]);
    setRxRequired(null);
    setSearchQuery('');
  };

  return (
    <main className="min-h-screen bg-muted/20">
      <Header />
      
      <div className="pt-28 md:pt-36 pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-primary font-bold">Shop Inventory</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary">Pharmaceutical Products</h1>
              <p className="text-muted-foreground mt-2 max-w-xl">
                Browse our complete catalog of 2500+ products including medicines and surgical essentials.
              </p>
            </div>
            
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search products or brands..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-border focus:ring-2 focus:ring-secondary outline-none font-medium text-primary shadow-sm"
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Sidebar Filters */}
            <aside className="hidden lg:block w-72 shrink-0">
              <ShopFilters 
                selectedCats={selectedCats} 
                toggleCategory={toggleCategory}
                rxRequired={rxRequired}
                setRxRequired={setRxRequired}
                clearFilters={clearFilters}
              />
            </aside>

            {/* Main Product Grid Area */}
            <div className="flex-1">
              <div className="bg-white p-4 rounded-2xl border border-muted/30 shadow-sm mb-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground font-medium">
                    Showing <span className="text-primary font-bold">{filteredProducts.length}</span> Products
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  {/* Mobile Filter Trigger */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="lg:hidden rounded-xl border-muted text-primary font-bold flex gap-2">
                        <SlidersHorizontal size={16} /> Filters
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px] p-0 border-none bg-white">
                      <SheetHeader className="p-6 border-b">
                        <SheetTitle className="text-primary font-headline font-bold">Filters</SheetTitle>
                      </SheetHeader>
                      <div className="h-full overflow-y-auto">
                        <ShopFilters 
                          selectedCats={selectedCats} 
                          toggleCategory={toggleCategory}
                          rxRequired={rxRequired}
                          setRxRequired={setRxRequired}
                          clearFilters={clearFilters}
                        />
                      </div>
                    </SheetContent>
                  </Sheet>

                  <div className="hidden sm:flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="text-secondary bg-secondary/10 rounded-lg">
                      <LayoutGrid size={18} />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary rounded-lg">
                      <List size={18} />
                    </Button>
                  </div>
                </div>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {filteredProducts.map((p) => (
                    <Link 
                      key={p.id} 
                      href={`/products/${p.id}`}
                      className="group relative bg-white rounded-[2rem] border border-border hover:shadow-2xl hover:border-secondary/30 transition-all duration-500 overflow-hidden flex flex-col h-full card-wave-pattern transform hover:-translate-y-1"
                    >
                      <div className="relative aspect-[4/5] overflow-hidden bg-muted/30">
                        <Image 
                          src={p.img} 
                          alt={p.name} 
                          fill 
                          className="object-cover group-hover:scale-110 transition-transform duration-700" 
                          data-ai-hint="medical product"
                        />
                        <div className="absolute top-4 left-4 z-10">
                          <Badge className="bg-white/95 text-primary hover:bg-white text-[10px] font-bold border-none shadow-md backdrop-blur-md px-3 py-1 rounded-full">
                            {p.cat}
                          </Badge>
                        </div>
                        {p.rx && (
                          <div className="absolute top-4 right-4 z-10">
                            <Badge className="bg-destructive text-white border-none text-[8px] px-2 py-0.5 rounded-full uppercase">
                              Rx
                            </Badge>
                          </div>
                        )}
                      </div>

                      <div className="p-6 flex-1 flex flex-col relative z-10 bg-white/70 backdrop-blur-md border-t border-muted/20">
                        <h3 className="text-primary font-headline font-bold text-sm md:text-lg group-hover:text-secondary transition-colors line-clamp-2 leading-tight mb-1">
                          {p.name}
                        </h3>
                        
                        <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest mb-6 opacity-80">
                          {p.company}
                        </p>

                        <div className="mt-auto flex items-center justify-between">
                          <div>
                            <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-[0.1em] leading-none mb-1 opacity-70">Wholesale Price</p>
                            <p className="text-primary font-bold text-lg md:text-2xl leading-none">₹{p.price}</p>
                          </div>
                          <div className="w-11 h-11 rounded-full bg-muted/80 text-primary group-hover:gradient-button group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm border-none">
                            <Plus size={22} />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-border">
                  <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                  <h3 className="text-xl font-bold text-primary">No products match your filters</h3>
                  <p className="text-muted-foreground mt-2">Try adjusting your category or prescription settings.</p>
                  <Button 
                    variant="link" 
                    className="mt-4 text-secondary font-bold"
                    onClick={clearFilters}
                  >
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
