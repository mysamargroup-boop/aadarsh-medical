'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ShopFilters } from '@/components/ShopFilters';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, ChevronRight, LayoutGrid, List, SlidersHorizontal, ChevronLeft } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { products as allProducts, getProductUrl } from '@/lib/product-data';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { Heart } from 'lucide-react';

const ITEMS_PER_PAGE = 24;

function ShopContent() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSubCat, setSelectedSubCat] = useState<string | null>(null);
  const [rxRequired, setRxRequired] = useState<boolean | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);

  useEffect(() => {
    const cat = searchParams.get('cat');
    const brand = searchParams.get('brand');
    const q = searchParams.get('q');
    const subCat = searchParams.get('subCat');

    if (cat) {
      setSelectedCats([cat]);
    } else {
      setSelectedCats([]);
    }

    if (brand) {
      setSelectedBrands([brand]);
    } else {
      setSelectedBrands([]);
    }

    if (q) {
      setSearchQuery(q);
    } else {
      setSearchQuery('');
    }

    setSelectedSubCat(subCat || null);
    setIsLoading(false);
  }, [searchParams]);

  // Debounce logic
  useEffect(() => {
    if (searchQuery !== debouncedSearch) {
      setIsSearching(true);
    }
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setIsSearching(false);
      setCurrentPage(1);
    }, 400); // 400ms delay for feedback

    return () => clearTimeout(handler);
  }, [searchQuery, debouncedSearch]);

  const filteredProducts = useMemo(() => {
    return allProducts.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        p.company.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        (p.molecules && p.molecules.toLowerCase().includes(debouncedSearch.toLowerCase())) ||
        (p.material && p.material.toLowerCase().includes(debouncedSearch.toLowerCase())) ||
        (p.composition && p.composition.toLowerCase().includes(debouncedSearch.toLowerCase())) ||
        (p.subCat && p.subCat.toLowerCase().includes(debouncedSearch.toLowerCase()));
      const matchesCat = selectedCats.length === 0 || selectedCats.includes(p.cat);
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(p.company);
      const matchesSubCat = !selectedSubCat || p.subCat === selectedSubCat;
      const matchesRx = rxRequired === null || p.rx === rxRequired;
      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      return matchesSearch && matchesCat && matchesBrand && matchesSubCat && matchesRx && matchesPrice;
    });
  }, [debouncedSearch, selectedCats, selectedBrands, selectedSubCat, rxRequired, priceRange]);

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

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => {
      const newBrands = prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand];
      setCurrentPage(1);
      return newBrands;
    });
  };

  const clearFilters = () => {
    setSelectedCats([]);
    setSelectedBrands([]);
    setRxRequired(null);
    setSearchQuery('');
    setDebouncedSearch('');
    setPriceRange([0, 5000]);
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
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                {isSearching ? (
                  <div className="w-4 h-4 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin" />
                ) : (
                  <Search className="text-muted-foreground w-4 h-4" />
                )}
              </div>
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
                selectedBrands={selectedBrands}
                toggleBrand={toggleBrand}
                rxRequired={rxRequired}
                setRxRequired={(val) => { setRxRequired(val); setCurrentPage(1); }}
                clearFilters={clearFilters}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
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
                      <Button variant="outline" className="lg:hidden rounded-xl border-muted text-primary font-bold flex gap-2 h-10 hover:text-primary hover:bg-muted/10">
                        <SlidersHorizontal size={16} /> Filters
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[320px] p-0 border-none bg-white z-[150]">
                      <ShopFilters
                        selectedCats={selectedCats}
                        toggleCategory={toggleCategory}
                        selectedBrands={selectedBrands}
                        toggleBrand={toggleBrand}
                        rxRequired={rxRequired}
                        setRxRequired={(val) => { setRxRequired(val); setCurrentPage(1); }}
                        clearFilters={clearFilters}
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                      />
                    </SheetContent>
                  </Sheet>

                  <div className="hidden sm:flex items-center gap-2">
                    <Button variant="ghost" size="icon" className={cn("rounded-lg h-9 w-9", viewMode === 'grid' ? "text-secondary bg-secondary/10" : "text-muted-foreground hover:text-primary")} onClick={() => setViewMode('grid')}>
                      <LayoutGrid size={18} />
                    </Button>
                    <Button variant="ghost" size="icon" className={cn("rounded-lg h-9 w-9", viewMode === 'list' ? "text-secondary bg-secondary/10" : "text-muted-foreground hover:text-primary")} onClick={() => setViewMode('list')}>
                      <List size={18} />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Brand Catalogue Links */}
              {selectedBrands.length === 1 && selectedBrands[0] === 'Macleods' && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50/50 p-6 rounded-[1.5rem] border border-blue-100 mb-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
                  <div>
                    <h3 className="text-secondary font-headline font-bold text-lg md:text-xl">Macleods Pharmaceuticals Full Catalogue</h3>
                    <p className="text-muted-foreground text-sm mt-1">Download or view the complete product list and prices directly from our Drive.</p>
                  </div>
                  <a href="https://drive.google.com/file/d/1yvqoFU5WhHPKqGtogQ-ESFa3wQpHyfBW/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="shrink-0 bg-secondary text-white px-6 py-3 rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:bg-secondary/90 transition-all">
                    View full catalogue (PDF)
                  </a>
                </div>
              )}

              {selectedBrands.length === 1 && selectedBrands[0] === 'Orthopaedics' && (
                <div className="bg-gradient-to-r from-teal-50 to-cyan-50/50 p-6 rounded-[1.5rem] border border-teal-100 mb-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
                  <div>
                    <h3 className="text-secondary font-headline font-bold text-lg md:text-xl">Tynor Orthopaedics Full Catalogue</h3>
                    <p className="text-muted-foreground text-sm mt-1">Download or view the complete product list and dimensions from our Drive.</p>
                  </div>
                  <a href="https://drive.google.com/file/d/17JpLfSUVb2BvQIN20A_sjWW44ufy7XDg/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="shrink-0 bg-secondary text-white px-6 py-3 rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:bg-secondary/90 transition-all">
                    View full catalogue (PDF)
                  </a>
                </div>
              )}

              {selectedBrands.length === 1 && selectedBrands[0] === 'Mankind' && (
                <div className="bg-gradient-to-r from-rose-50 to-orange-50/50 p-6 rounded-[1.5rem] border border-rose-100 mb-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
                  <div>
                    <h3 className="text-secondary font-headline font-bold text-lg md:text-xl">Mankind Pharma Full Catalogue</h3>
                    <p className="text-muted-foreground text-sm mt-1">Access the complete wholesale product list and prices directly from our Drive.</p>
                  </div>
                  <a href="https://drive.google.com/file/d/1i0EYI77eAVmeeUqo36QyBvqyp-r4OvTd/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="shrink-0 bg-secondary text-white px-6 py-3 rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:bg-secondary/90 transition-all">
                    View full catalogue (PDF)
                  </a>
                </div>
              )}

              {selectedBrands.length === 1 && selectedBrands[0] === 'Mankind Prime' && (
                <div className="bg-gradient-to-r from-orange-50 to-yellow-50/50 p-6 rounded-[1.5rem] border border-orange-100 mb-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
                  <div>
                    <h3 className="text-secondary font-headline font-bold text-lg md:text-xl">Mankind Prime Full Catalogue</h3>
                    <p className="text-muted-foreground text-sm mt-1">Access the complete wholesale product list and prices directly from our Drive.</p>
                  </div>
                  <a href="https://drive.google.com/file/d/1LO7b6pW1S0hrZ0ghYI9iRwSsNfQVeONI/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="shrink-0 bg-secondary text-white px-6 py-3 rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:bg-secondary/90 transition-all">
                    View full catalogue (PDF)
                  </a>
                </div>
              )}

              {selectedBrands.some(b => b.includes("Dr. Reddy's")) && (
                <div className="flex flex-col gap-4 mb-6">
                  <div className="bg-gradient-to-r from-purple-50 to-fuchsia-50/50 p-6 rounded-[1.5rem] border border-purple-100 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm w-full">
                    <div>
                      <h3 className="text-secondary font-headline font-bold text-lg md:text-xl">Dr. Reddy's (Max) Full Catalogue</h3>
                      <p className="text-muted-foreground text-sm mt-1">View the wholesale product list and pricing details directly through our Drive.</p>
                    </div>
                    <a href="https://drive.google.com/file/d/1ACwhcefxThaQ0SU1mgv0xYjENfcuF47m/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="shrink-0 bg-secondary text-white px-6 py-3 rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:bg-secondary/90 transition-all">
                      View Max catalogue
                    </a>
                  </div>

                  <div className="bg-gradient-to-r from-fuchsia-50 to-pink-50/50 p-6 rounded-[1.5rem] border border-fuchsia-100 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm w-full">
                    <div>
                      <h3 className="text-secondary font-headline font-bold text-lg md:text-xl">Dr. Reddy's (Leo) Full Catalogue</h3>
                      <p className="text-muted-foreground text-sm mt-1">View the wholesale product list and pricing details directly through our Drive.</p>
                    </div>
                    <a href="https://drive.google.com/file/d/1kjra2x3cZwu1rl6lF0BD9ABGAVZMioTz/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="shrink-0 bg-secondary text-white px-6 py-3 rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:bg-secondary/90 transition-all">
                      View Leo catalogue
                    </a>
                  </div>
                </div>
              )}

              {selectedBrands.length === 1 && selectedBrands[0] === "Aristo" && (
                <div className="bg-gradient-to-r from-red-50 to-rose-50/50 p-6 rounded-[1.5rem] border border-red-100 mb-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
                  <div>
                    <h3 className="text-secondary font-headline font-bold text-lg md:text-xl">Aristo Full Catalogue</h3>
                    <p className="text-muted-foreground text-sm mt-1">View the wholesale product list and pricing details directly through our Drive.</p>
                  </div>
                  <a href="https://drive.google.com/file/d/1EZYt_OMZuT1_UIYfboKwqebDjdNM50NU/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="shrink-0 bg-secondary text-white px-6 py-3 rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:bg-secondary/90 transition-all">
                    View full catalogue (PDF)
                  </a>
                </div>
              )}

              {selectedBrands.length === 1 && (selectedBrands[0] === 'Sushima' || selectedBrands[0] === 'Sushima Pharmaceuticals') && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50/50 p-6 rounded-[1.5rem] border border-emerald-100 mb-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
                  <div>
                    <h3 className="text-secondary font-headline font-bold text-lg md:text-xl">Sushima Pharmaceuticals Full Catalogue</h3>
                    <p className="text-muted-foreground text-sm mt-1">View the wholesale product list and pricing details directly through our Drive.</p>
                  </div>
                  <a href="https://drive.google.com/file/d/1bjnASIxDk0kXRDRUAxRrPZlF3HFZyVEJ/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="shrink-0 bg-secondary text-white px-6 py-3 rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:bg-secondary/90 transition-all">
                    View full catalogue (PDF)
                  </a>
                </div>
              )}

              {selectedBrands.length === 1 && selectedBrands[0] === 'Sarabhai' && (
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50/50 p-6 rounded-[1.5rem] border border-blue-100 mb-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
                  <div>
                    <h3 className="text-secondary font-headline font-bold text-lg md:text-xl">Sarabhai Chemicals Full Catalogue</h3>
                    <p className="text-muted-foreground text-sm mt-1">View the wholesale product list and pricing details directly through our Drive.</p>
                  </div>
                  <a href="https://drive.google.com/file/d/1YrYXoqCngrT5kKqoWH4iuzYtabDrJGit/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="shrink-0 bg-secondary text-white px-6 py-3 rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:bg-secondary/90 transition-all">
                    View full catalogue (PDF)
                  </a>
                </div>
              )}

              {selectedBrands.length === 1 && (selectedBrands[0] === 'Welcomevet Pharma' || selectedBrands[0] === 'Wellcome Vet') && (
                <div className="bg-gradient-to-r from-orange-50 to-amber-50/50 p-6 rounded-[1.5rem] border border-orange-100 mb-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
                  <div>
                    <h3 className="text-secondary font-headline font-bold text-lg md:text-xl">Welcomevet Pharma Full Catalogue</h3>
                    <p className="text-muted-foreground text-sm mt-1">View the wholesale product list and pricing details directly through our Drive.</p>
                  </div>
                  <a href="https://drive.google.com/file/d/1UehpABPuy9NWakVZUYbis6dqqKBls5xz/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="shrink-0 bg-secondary text-white px-6 py-3 rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:bg-secondary/90 transition-all">
                    View full catalogue (PDF)
                  </a>
                </div>
              )}

              {selectedBrands.length === 1 && selectedBrands[0] === 'Univentis' && (
                <div className="bg-gradient-to-r from-indigo-50 to-violet-50/50 p-6 rounded-[1.5rem] border border-indigo-100 mb-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
                  <div>
                    <h3 className="text-secondary font-headline font-bold text-lg md:text-xl">Univentis Full Catalogue</h3>
                    <p className="text-muted-foreground text-sm mt-1">View the wholesale product list and pricing details directly through our Drive.</p>
                  </div>
                  <a href="https://drive.google.com/file/d/1Te1v4TVqBYqhKYls6sRvH3wHtErV20po/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="shrink-0 bg-secondary text-white px-6 py-3 rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:bg-secondary/90 transition-all">
                    View full catalogue (PDF)
                  </a>
                </div>
              )}

              {selectedBrands.length === 1 && selectedBrands[0] === 'Laborate' && (
                <div className="bg-gradient-to-r from-pink-50 to-rose-50/50 p-6 rounded-[1.5rem] border border-pink-100 mb-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
                  <div>
                    <h3 className="text-secondary font-headline font-bold text-lg md:text-xl">Laborate Full Catalogue</h3>
                    <p className="text-muted-foreground text-sm mt-1">View the wholesale product list and pricing details directly through our Drive.</p>
                  </div>
                  <a href="https://drive.google.com/file/d/1NoWyslxTgrgU-Y2gil3h9-94KVhnTuRd/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="shrink-0 bg-secondary text-white px-6 py-3 rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:bg-secondary/90 transition-all">
                    View full catalogue (PDF)
                  </a>
                </div>
              )}

              {selectedBrands.length === 1 && selectedBrands[0] === 'Troikaa' && (
                <div className="bg-gradient-to-r from-slate-50 to-zinc-50/50 p-6 rounded-[1.5rem] border border-slate-200 mb-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
                  <div>
                    <h3 className="text-secondary font-headline font-bold text-lg md:text-xl">Troikaa Full Catalogue</h3>
                    <p className="text-muted-foreground text-sm mt-1">View the wholesale product list and pricing details directly through our Drive.</p>
                  </div>
                  <a href="https://drive.google.com/file/d/16Ls5MKgr7H37UwMWKom3QBTJ2aaZRD9d/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="shrink-0 bg-secondary text-white px-6 py-3 rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:bg-secondary/90 transition-all">
                    View full catalogue (PDF)
                  </a>
                </div>
              )}

              {selectedBrands.length === 1 && selectedBrands[0] === 'Torrent Pharma' && (
                <div className="bg-gradient-to-r from-sky-50 to-blue-50/50 p-6 rounded-[1.5rem] border border-sky-100 mb-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
                  <div>
                    <h3 className="text-secondary font-headline font-bold text-lg md:text-xl">Torrent Pharma Full Catalogue</h3>
                    <p className="text-muted-foreground text-sm mt-1">View the wholesale product list and pricing details directly through our Drive.</p>
                  </div>
                  <a href="https://drive.google.com/file/d/1EpO-kBHhN3sdaw4dCiSQXtD6kkqSEkIn/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="shrink-0 bg-secondary text-white px-6 py-3 rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:bg-secondary/90 transition-all">
                    View full catalogue (PDF)
                  </a>
                </div>
              )}

              {selectedBrands.length === 1 && selectedBrands[0] === 'Alembic' && (
                <div className="bg-gradient-to-r from-cyan-50 to-teal-50/50 p-6 rounded-[1.5rem] border border-cyan-100 mb-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
                  <div>
                    <h3 className="text-secondary font-headline font-bold text-lg md:text-xl">Alembic Full Catalogue</h3>
                    <p className="text-muted-foreground text-sm mt-1">View the wholesale product list and pricing details directly through our Drive.</p>
                  </div>
                  <a href="https://drive.google.com/file/d/1KWHuo0j6T8UKEyOC3TqIrC04A_s_4SXW/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="shrink-0 bg-secondary text-white px-6 py-3 rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:bg-secondary/90 transition-all">
                    View full catalogue (PDF)
                  </a>
                </div>
              )}

              {selectedBrands.includes("Lupin") && (
                <div className="flex flex-col gap-4 mb-6">
                  <div className="bg-gradient-to-r from-emerald-50 to-green-50/50 p-6 rounded-[1.5rem] border border-emerald-100 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm w-full">
                    <div>
                      <h3 className="text-secondary font-headline font-bold text-lg md:text-xl">Lupin Gx Full Catalogue</h3>
                      <p className="text-muted-foreground text-sm mt-1">View the wholesale product list and pricing details directly through our Drive.</p>
                    </div>
                    <a href="https://drive.google.com/file/d/1HuWr4v4ga6z-aYr_NT5supOdCPNzZOj9/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="shrink-0 bg-secondary text-white px-6 py-3 rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:bg-secondary/90 transition-all">
                      View Gx catalogue
                    </a>
                  </div>

                  <div className="bg-gradient-to-r from-teal-50 to-emerald-50/50 p-6 rounded-[1.5rem] border border-teal-100 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm w-full">
                    <div>
                      <h3 className="text-secondary font-headline font-bold text-lg md:text-xl">Lupin OTC Full Catalogue</h3>
                      <p className="text-muted-foreground text-sm mt-1">View the wholesale product list and pricing details directly through our Drive.</p>
                    </div>
                    <a href="https://drive.google.com/file/d/1HJZf1fC2ru2-AXS2vk5JeNg1JLfkeKdg/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="shrink-0 bg-secondary text-white px-6 py-3 rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:bg-secondary/90 transition-all">
                      View OTC catalogue
                    </a>
                  </div>
                </div>
              )}

              {selectedBrands.length === 1 && selectedBrands[0] === 'Medigrip' && (
                <div className="bg-gradient-to-r from-red-50 to-orange-50/50 p-6 rounded-[1.5rem] border border-red-100 mb-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
                  <div>
                    <h3 className="text-secondary font-headline font-bold text-lg md:text-xl">Medigrip Full Catalogue</h3>
                    <p className="text-muted-foreground text-sm mt-1">View the wholesale product list and pricing details directly through our Drive.</p>
                  </div>
                  <a href="https://drive.google.com/file/d/1FGeGGI2MLAgJeXtvwN6b4t1i0QY9VRfd/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="shrink-0 bg-secondary text-white px-6 py-3 rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:bg-secondary/90 transition-all">
                    View full catalogue (PDF)
                  </a>
                </div>
              )}

              {isLoading ? (
                <div className={cn("gap-4 md:gap-6", {
                  "grid grid-cols-2 md:grid-cols-4": viewMode === 'grid',
                  "space-y-4": viewMode === 'list'
                })}>
                  {Array.from({ length: 8 }).map((_, i) => (
                    viewMode === 'grid' ? (
                      <ProductCardSkeleton key={i} />
                    ) : (
                      <ProductListCardSkeleton key={i} />
                    )
                  ))}
                </div>
              ) : paginatedProducts.length > 0 ? (
                <>
                  <div className={cn("gap-4 md:gap-6", {
                    "grid grid-cols-2 md:grid-cols-4": viewMode === 'grid',
                    "space-y-4": viewMode === 'list'
                  })}>
                    {paginatedProducts.map((p) => (
                      viewMode === 'grid' ? (
                        <ShopProductCard key={p.id} product={p} />
                      ) : (
                        <ShopProductListCard key={p.id} product={p} />
                      )
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

function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden">
      <Skeleton className="aspect-square w-full" />
      <div className="p-4">
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-3 w-1/2 mb-4" />
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-3 w-12 mb-1" />
            <Skeleton className="h-5 w-24" />
          </div>
          <Skeleton className="w-8 h-8 rounded-full" />
        </div>
      </div>
    </div>
  );
}

function ProductListCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden flex items-center p-4">
      <Skeleton className="w-24 h-24 flex-shrink-0" />
      <div className="ml-4 flex-1">
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-3 w-1/2 mb-4" />
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-3 w-12 mb-1" />
            <Skeleton className="h-5 w-24" />
          </div>
          <Skeleton className="w-8 h-8 rounded-full" />
        </div>
      </div>
    </div>
  );
}

function ShopProductCard({ product }: { product: any }) {
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart, toggleWishlist, wishlist } = useCart();

  const isWishlisted = wishlist.includes(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-border hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col h-full transform hover:-translate-y-1">
      {/* Absolute Link covering the card */}
      <Link href={getProductUrl(product)} className="absolute inset-0 z-10" />

      <div className="relative aspect-square overflow-hidden bg-muted/30">
        {isLoading && <Skeleton className="absolute inset-0 z-20" />}
        <Image
          src={product.img}
          alt={product.name}
          fill
          onLoad={() => setIsLoading(false)}
          className={`object-cover group-hover:scale-110 transition-transform duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        />
        <div className="absolute top-2 left-2 z-20 flex flex-col gap-1.5">
          <Badge className="bg-white/95 text-primary text-[9px] font-bold border-none shadow-sm px-2.5 py-1 rounded-full">
            {product.cat}
          </Badge>
          {product.rx && (
            <Badge className="bg-destructive text-white border-none text-[8px] px-2 py-0.5 rounded-full uppercase w-fit">
              Rx
            </Badge>
          )}
        </div>

        <button
          onClick={handleToggleWishlist}
          className={cn(
            "absolute top-2 right-2 z-30 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm border",
            isWishlisted
              ? "bg-white text-secondary border-secondary"
              : "bg-white/90 text-muted-foreground hover:text-secondary border-transparent"
          )}
        >
          <Heart size={14} className={isWishlisted ? "fill-secondary" : ""} />
        </button>
      </div>

      <div className="p-3 md:p-4 flex-1 flex flex-col relative z-20 bg-white border-t border-muted/20">
        <h3 className="text-primary font-bold text-sm md:text-base group-hover:text-secondary transition-colors line-clamp-1 leading-tight mb-0.5">
          {product.name}
        </h3>

        <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest mb-2 opacity-80">
          {product.company}
        </p>

        {(product.molecules || product.material || product.composition) && (
          <p className="text-[11px] font-bold text-primary/80 bg-primary/5 border border-primary/10 px-2 py-1 rounded-md mb-2 line-clamp-2 leading-relaxed group-hover:bg-primary/10 transition-colors">
            {product.molecules || product.material || product.composition}
          </p>
        )}

        {product.sizes && (
          <p className="text-[11px] text-secondary font-bold tracking-wider mb-2 bg-secondary/10 inline-block px-2 py-0.5 rounded-md">
            Sizes: {product.sizes}
          </p>
        )}
        <div className="flex-1" />
        <div className="mt-auto flex items-center justify-between">
          <div>
            <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest leading-none mb-1 opacity-70">MRP</p>
            <p className="text-primary font-bold text-base md:text-lg leading-none">₹{product.price.toFixed(2)} <span className="text-[10px] font-normal text-muted-foreground inline-block ml-0.5">/strip</span></p>
          </div>
          <button
            onClick={handleAddToCart}
            className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-muted/80 text-primary hover:gradient-button hover:text-white flex items-center justify-center transition-all duration-300 z-30 relative"
          >
            <Plus className="size-3 md:size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ShopProductListCard({ product }: { product: any }) {
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart, toggleWishlist, wishlist } = useCart();

  const isWishlisted = wishlist.includes(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-border hover:shadow-lg transition-all duration-300 overflow-hidden flex items-center h-full transform hover:-translate-y-1">
      {/* Absolute Link covering the card */}
      <Link href={getProductUrl(product)} className="absolute inset-0 z-10" />

      <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0 bg-muted/30">
        {isLoading && <Skeleton className="absolute inset-0 z-20" />}
        <Image
          src={product.img}
          alt={product.name}
          fill
          onLoad={() => setIsLoading(false)}
          className={`object-cover group-hover:scale-110 transition-transform duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        />
        <div className="absolute top-2 left-2 z-20">
          {product.rx && (
            <Badge className="bg-destructive text-white border-none text-[8px] px-2 py-0.5 rounded-full uppercase">
              Rx
            </Badge>
          )}
        </div>

        <button
          onClick={handleToggleWishlist}
          className={cn(
            "absolute bottom-2 right-2 z-30 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm border",
            isWishlisted
              ? "bg-white text-secondary border-secondary"
              : "bg-white/90 text-muted-foreground hover:text-secondary border-transparent"
          )}
        >
          <Heart size={14} className={isWishlisted ? "fill-secondary" : ""} />
        </button>
      </div>

      <div className="p-4 md:p-6 flex-1 flex flex-col md:flex-row md:items-center justify-between relative z-20">
        <div className="space-y-1">
          <Badge className="bg-secondary/10 text-secondary text-[9px] font-bold border-none px-2.5 py-1 rounded-full w-fit">
            {product.cat}
          </Badge>
          <h3 className="text-primary font-bold text-lg md:text-xl group-hover:text-secondary transition-colors leading-tight">
            {product.name}
          </h3>
          <p className="text-muted-foreground text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-80">
            {product.company}
          </p>
          {(product.molecules || product.material) && (
            <div className="mt-1.5 flex flex-wrap gap-2">
              <span className="text-[11px] font-bold text-primary/80 bg-primary/5 border border-primary/10 px-2.5 py-1 rounded-md inline-block max-w-md line-clamp-2">
                {product.molecules || product.material}
              </span>
            </div>
          )}
          {product.composition && (
            <div className="mt-1.5 hidden md:block">
              <span className="text-[11px] font-bold text-primary/80 bg-primary/5 border border-primary/10 px-2.5 py-1 rounded-md inline-block max-w-md line-clamp-2">
                {product.composition}
              </span>
            </div>
          )}
          {product.sizes && (
            <p className="text-[11px] text-secondary font-bold tracking-wider mt-2 bg-secondary/10 inline-block px-2 py-0.5 rounded-md">
              Sizes: {product.sizes}
            </p>
          )}
        </div>

        <div className="flex items-center gap-4 md:gap-10 mt-4 md:mt-0 relative z-30">
          <div className="text-right">
            <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest leading-none mb-1 opacity-70">MRP</p>
            <p className="text-primary font-bold text-xl leading-none">₹{product.price.toFixed(2)} <span className="text-xs font-normal text-muted-foreground inline-block ml-0.5">/strip</span></p>
          </div>
          <button
            onClick={handleAddToCart}
            className="h-10 px-4 md:px-6 rounded-full gradient-button text-white font-bold text-xs md:text-sm flex items-center gap-2 transition-all shadow-md hover:shadow-secondary/20 relative z-30"
          >
            <Plus size={16} /> <span className="hidden sm:inline">Add to Enquiry</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-muted/20">
        <Header />
        <div className="pt-24 md:pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex flex-col gap-8">
              <Skeleton className="h-12 w-full max-w-md" />
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="hidden lg:block">
                  <Skeleton className="h-[600px] w-full" />
                </div>
                <div className="lg:col-span-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <Skeleton key={i} className="h-80 w-full rounded-[2rem]" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    }>
      <ShopContent />
    </Suspense>
  );
}
