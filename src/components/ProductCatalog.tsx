
"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Filter, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';

const products = [
  { id: 1, name: "Augmentin 625 DUO", company: "GlaxoSmithKline", cat: "Antibiotic", price: "120.00", img: "https://picsum.photos/seed/p1/600/600" },
  { id: 2, name: "Calpol 650mg", company: "GSK", cat: "Antipyretic", price: "45.50", img: "https://picsum.photos/seed/p2/600/600" },
  { id: 3, name: "Telma 40", company: "Glenmark", cat: "Cardiac", price: "185.00", img: "https://picsum.photos/seed/p3/600/600" },
  { id: 4, name: "Dolo 650", company: "Micro Labs", cat: "Analgesic", price: "30.00", img: "https://picsum.photos/seed/p4/600/600" },
  { id: 5, name: "Limcee Vitamin C", company: "Himalaya", cat: "Supplements", price: "85.00", img: "https://picsum.photos/seed/p5/600/600" },
  { id: 6, name: "N95 Face Masks", company: "3M", cat: "Surgical", price: "450.00", img: "https://picsum.photos/seed/p6/600/600" },
  { id: 7, name: "Accu-Chek Guide", company: "Roche", cat: "Medical Device", price: "1250.00", img: "https://picsum.photos/seed/p7/600/600" },
  { id: 8, name: "Azithromycin 500mg", company: "Cipla", cat: "Antibiotics", price: "115.00", img: "https://picsum.photos/seed/p8/600/600" }
];

const categories = ["All", "Antibiotic", "Antipyretic", "Cardiac", "Analgesic", "Supplements", "Surgical", "Medical Device"];

export function ProductCatalog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         p.cat.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.cat === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="products" className="py-24 medical-gradient-blue">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <span className="text-secondary font-bold uppercase tracking-widest text-sm">Our Inventory</span>
            <h2 className="text-primary font-headline font-bold text-4xl md:text-5xl mt-2">Available Wholesale</h2>
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search products..." 
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-muted focus:ring-2 focus:ring-secondary outline-none font-medium text-primary placeholder:text-muted-foreground/50 shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className={cn(
                    "rounded-2xl h-12 border-muted hover:bg-secondary/10 text-primary bg-white shadow-sm font-bold min-w-[120px]",
                    selectedCategory !== 'All' && "border-secondary text-secondary"
                  )}
                >
                  <Filter className="mr-2 w-4 h-4" /> 
                  {selectedCategory === 'All' ? 'Filter' : selectedCategory}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2">
                <DropdownMenuLabel className="font-bold text-primary">Select Category</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {categories.map((cat) => (
                  <DropdownMenuItem 
                    key={cat} 
                    className="rounded-xl flex items-center justify-between cursor-pointer"
                    onClick={() => setSelectedCategory(cat)}
                  >
                    <span className={cn(selectedCategory === cat && "font-bold text-secondary")}>{cat}</span>
                    {selectedCategory === cat && <Check className="w-4 h-4 text-secondary" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {filteredProducts.map((p) => (
              <Link 
                key={p.id} 
                href={`/products/${p.id}`}
                className="group relative bg-card rounded-3xl border border-muted hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 overflow-hidden flex flex-col h-full card-wave-pattern"
              >
                <div className="relative aspect-square overflow-hidden bg-muted/10">
                  <Image 
                    src={p.img} 
                    alt={p.name} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-700" 
                    data-ai-hint="medical product"
                  />
                  <div className="absolute top-2 left-2 md:top-4 md:left-4 z-10">
                    <Badge variant="secondary" className="bg-secondary/90 text-white font-bold border-none text-[8px] md:text-[10px] shadow-sm">
                      {p.cat}
                    </Badge>
                  </div>
                </div>

                <div className="p-4 md:p-6 flex-1 flex flex-col space-y-3 relative z-10">
                  <h3 className="text-primary font-headline font-bold text-sm md:text-base group-hover:text-secondary transition-colors line-clamp-2 leading-tight">
                    {p.name}
                  </h3>
                  
                  <p className="text-muted-foreground text-[10px] md:text-xs font-medium">{p.company}</p>

                  <div className="flex flex-col">
                    <span className="text-primary font-bold text-base md:text-xl leading-tight">₹{p.price}</span>
                    <span className="text-[7px] md:text-[9px] text-muted-foreground font-bold uppercase tracking-tight">Wholesale (incl. GST)</span>
                  </div>
                  
                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-muted/20">
                    <span className="text-[9px] md:text-[10px] font-bold text-accent uppercase tracking-tighter">Ready to Ship</span>
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-muted/50 group-hover:bg-primary group-hover:text-white flex items-center justify-center transition-all shadow-sm">
                      <Plus size={16} className="md:w-5 md:h-5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-white/50 rounded-[3rem] border border-dashed border-muted">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
            <h3 className="text-xl font-bold text-primary">No products found</h3>
            <p className="text-muted-foreground mt-2">Try adjusting your search or category filter.</p>
            <Button 
              variant="link" 
              className="mt-4 text-secondary font-bold"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
            >
              Clear all filters
            </Button>
          </div>
        )}

        <div className="mt-16 text-center">
          <Button variant="outline" className="rounded-full px-12 h-14 border-primary text-primary hover:bg-primary hover:text-white font-bold text-lg bg-white shadow-md transition-all">
            View All 2500+ Products
          </Button>
        </div>
      </div>
    </section>
  );
}
