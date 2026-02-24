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
    <section id="products" className="py-20 medical-gradient-blue">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <span className="text-secondary font-bold uppercase tracking-widest text-xs">Our Inventory</span>
            <h2 className="text-primary font-headline font-bold text-3xl md:text-4xl mt-1">Available Wholesale</h2>
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search products..." 
                className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white border border-border focus:ring-2 focus:ring-secondary outline-none font-medium text-primary text-sm shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className={cn(
                    "rounded-xl h-11 border-border hover:border-secondary hover:bg-secondary/5 text-primary transition-all font-bold text-xs bg-white",
                    selectedCategory !== 'All' && "border-secondary text-secondary bg-secondary/5"
                  )}
                >
                  <Filter className="mr-2 w-3.5 h-3.5" /> 
                  {selectedCategory === 'All' ? 'Filter' : selectedCategory}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52 rounded-xl p-1.5">
                <DropdownMenuLabel className="font-bold text-primary text-xs">Category</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {categories.map((cat) => (
                  <DropdownMenuItem 
                    key={cat} 
                    className="rounded-lg flex items-center justify-between cursor-pointer py-2"
                    onClick={() => setSelectedCategory(cat)}
                  >
                    <span className={cn("text-sm", selectedCategory === cat && "font-bold text-secondary")}>{cat}</span>
                    {selectedCategory === cat && <Check className="w-3.5 h-3.5 text-secondary" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((p) => (
              <Link 
                key={p.id} 
                href={`/products/${p.id}`}
                className="group relative bg-white rounded-2xl border border-border hover:shadow-xl hover:border-secondary/20 transition-all duration-300 overflow-hidden flex flex-col h-full card-wave-pattern"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-muted/30">
                  <Image 
                    src={p.img} 
                    alt={p.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                    data-ai-hint="medical product"
                  />
                  <div className="absolute top-3 left-3 z-10">
                    <Badge className="bg-white/90 text-primary hover:bg-white text-[9px] font-bold border-none shadow-sm backdrop-blur-sm">
                      {p.cat}
                    </Badge>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col relative z-10 bg-white/40 backdrop-blur-sm">
                  <h3 className="text-primary font-headline font-bold text-sm group-hover:text-secondary transition-colors line-clamp-2 leading-[1.3] mb-1">
                    {p.name}
                  </h3>
                  
                  <p className="text-muted-foreground text-[10px] font-medium uppercase tracking-tight mb-3">
                    {p.company}
                  </p>

                  <div className="mt-auto flex items-end justify-between">
                    <div>
                      <p className="text-[8px] text-muted-foreground font-bold uppercase tracking-widest leading-none mb-1">Wholesale</p>
                      <p className="text-primary font-bold text-base md:text-lg leading-none">₹{p.price}</p>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-muted/50 group-hover:gradient-button group-hover:text-white flex items-center justify-center transition-all shadow-sm">
                      <Plus size={18} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-white/50 rounded-3xl border border-dashed border-border">
            <Search className="w-10 h-10 text-muted-foreground mx-auto mb-4 opacity-20" />
            <h3 className="text-lg font-bold text-primary">No products found</h3>
            <p className="text-sm text-muted-foreground mt-1">Try a different search term or category.</p>
            <Button 
              variant="link" 
              className="mt-4 text-secondary font-bold text-sm"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
            >
              Clear filters
            </Button>
          </div>
        )}

        <div className="mt-14 text-center">
          <Button variant="outline" className="rounded-full px-10 h-12 border-primary text-primary hover:gradient-button hover:text-white hover:border-none font-bold text-base bg-white shadow-sm transition-all">
            Browse All 2500+ Items
          </Button>
        </div>
      </div>
    </section>
  );
}