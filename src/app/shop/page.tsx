'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ShopFilters } from '@/components/ShopFilters';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, ChevronRight, LayoutGrid, List, SlidersHorizontal, ChevronLeft } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { products as allProducts } from '@/lib/product-data';
import { cn } from '@/lib/utils';

const ITEMS_PER_PAGE = 24;

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [rxRequired, setRxRequired] = useState<boolean | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Debounce logic: 100ms delay as requested
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1); // Reset to first page on new search
    }, 100);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  const filteredProducts = useMemo(() => {
    return allProducts.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(debouncedSearch.toLowerCase()) || 
                           p.company.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                           p.molecules.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchesCat = selectedCats.length === 0 || selectedCats.includes(p.cat);
      const matchesRx = rxRequired === null || p.rx === rxRequired;
      return matchesSearch && matchesCat && matchesRx;
    });
  }, [debouncedSearch, selectedCats, rxRequired]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const toggleCategory = (cat: string) => {
    setSelectedCats(prev => {
      const newCats = prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat];
      setCurrentPage(1);
      return newCats;
    });
  };

  const clearFilters = () => {
    setSelectedCats([]);
    setRxRequired(null);
    setSearchQuery('');
    setDebouncedSearch('');
    setCurrentPage(1);
  };

  return (
    <main className="min-h-screen bg-muted/20">
      <Header />
      
      <div className="pt-24 md:pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-primary font-bold">Inventory Catalog</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary">Pharma Inventory</h1>
              <p className="text-muted-foreground mt-2 max-w-xl text-sm leading-relaxed">
                Browse our complete wholesale range of medicines, veterinary supplies, and surgical essentials.
              </p>
            </div>
            
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search medicines, formula..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-[1.25rem] bg-white border border-border focus:ring-2 focus:ring-secondary outline-none font-medium text-primary shadow-sm"
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <aside className="hidden lg:block w-72 shrink-0 sticky top-36">
              <ShopFilters 
                selectedCats={selectedCats} 
                toggleCategory={toggleCategory}
                rxRequired={rxRequired}
                setRxRequired={(val) => { setRxRequired(val); setCurrentPage(1); }}
                clearFilters={clearFilters}
              />
            </aside>

            <div className="flex-1 w-full">
              <div className="bg-white p-4 rounded-[1.5rem] border border-muted/30 shadow-sm mb-6 flex items-center justify-between">
                <span className="text-sm text-muted-foreground font-medium">
                  Showing <span className="text-primary font-bold">{paginatedProducts.length}</span> of <span className="text-primary font-bold">{filteredProducts.length}</span> items
                </span>
                
                <div className="flex items-center gap-2">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="lg:hidden rounded-xl border-muted text-primary font-bold flex gap-2 h-10">
                        <SlidersHorizontal size={16} /> Filters
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[320px] p-0 border-none bg-white z-[150]">
                      <ShopFilters 
                        selectedCats={selectedCats} 
                        toggleCategory={toggleCategory}
                        rxRequired={rxRequired}
                        setRxRequired={(val) => { setRxRequired(val); setCurrentPage(1); }}
                        clearFilters={clearFilters}
                      />
                    </SheetContent>
                  </Sheet>

                  <div className="hidden sm:flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="text-secondary bg-secondary/10 rounded-lg h-9 w-9">
                      <LayoutGrid size={18} />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary rounded-lg h-9 w-9">
                      <List size={18} />
                    </Button>
                  </div>
                </div>
              </div>

              {paginatedProducts.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-3 gap-4 md:gap-6">
                    {paginatedProducts.map((p) => (
                      <ShopProductCard key={p.id} product={p} />
                    ))}
                  </div>

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="mt-12 flex items-center justify-center gap-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="rounded-xl border-muted"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      >
                        <ChevronLeft size={18} />
                      </Button>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          className={cn(
                            "rounded-xl h-10 w-10 p-0 font-bold border-muted",
                            currentPage === page ? "gradient-button border-none" : "bg-white text-primary"
                          )}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </Button>
                      ))}

                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="rounded-xl border-muted"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      >
                        <ChevronRight size={18} />
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-border">
                  <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                  <h3 className="text-xl font-bold text-primary">No matching items found</h3>
                  <p className="text-muted-foreground mt-2">Adjust your filters to see more medical supplies.</p>
                  <Button variant="link" className="mt-4 text-secondary font-bold" onClick={clearFilters}>
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

function ShopProductCard({ product }: { product: any }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Link 
      href={`/products/${product.id}`}
      className="group relative bg-white rounded-2xl border border-border hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col h-full transform hover:-translate-y-1"
    >
      <div className="relative aspect-square overflow-hidden bg-muted/30">
        {isLoading && <Skeleton className="absolute inset-0 z-10" />}
        <Image 
          src={product.img} 
          alt={product.name} 
          fill 
          onLoad={() => setIsLoading(false)}
          className={`object-cover group-hover:scale-110 transition-transform duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`} 
        />
        <div className="absolute top-3 left-3 z-10">
          <Badge className="bg-white/95 text-primary text-[9px] font-bold border-none shadow-sm px-2.5 py-1 rounded-full">
            {product.cat}
          </Badge>
        </div>
        {product.rx && (
          <div className="absolute top-3 right-3 z-10">
            <Badge className="bg-destructive text-white border-none text-[8px] px-2 py-0.5 rounded-full uppercase">
              Rx
            </Badge>
          </div>
        )}
      </div>

      <div className="p-3 md:p-4 flex-1 flex flex-col relative z-10 bg-white border-t border-muted/20">
        <h3 className="text-primary font-bold text-sm md:text-base group-hover:text-secondary transition-colors line-clamp-1 leading-tight mb-0.5">
          {product.name}
        </h3>
        
        <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest mb-4 opacity-80">
          {product.company}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <div>
            <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest leading-none mb-1 opacity-70">MRP</p>
            <p className="text-primary font-bold text-base md:text-lg leading-none">₹{product.price.toFixed(2)}</p>
          </div>
          <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-muted/80 text-primary group-hover:gradient-button group-hover:text-white flex items-center justify-center transition-all duration-300">
            <Plus className="size-3 md:size-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}