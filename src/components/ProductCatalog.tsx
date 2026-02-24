
"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Filter } from 'lucide-react';

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

export function ProductCatalog() {
  const [filter, setFilter] = useState('');

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(filter.toLowerCase()) || 
    p.cat.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <section id="products" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <span className="text-accent font-bold uppercase tracking-widest text-sm">Our Inventory</span>
            <h2 className="text-primary font-headline font-bold text-4xl md:text-5xl mt-2">Available Wholesale</h2>
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search products..." 
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-muted/50 border-none focus:ring-2 focus:ring-secondary outline-none font-medium text-primary placeholder:text-muted-foreground/50"
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>
            <Button variant="outline" className="rounded-2xl h-12 border-muted hover:bg-muted text-primary">
              <Filter className="mr-2 w-4 h-4" /> Filter
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {filteredProducts.map((p) => (
            <Link 
              key={p.id} 
              href={`/products/${p.id}`}
              className="group relative bg-muted/20 rounded-3xl border border-muted hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 overflow-hidden flex flex-col h-full"
            >
              <div className="relative aspect-square overflow-hidden bg-white">
                <Image 
                  src={p.img} 
                  alt={p.name} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-500" 
                  data-ai-hint="medical product"
                />
                <div className="absolute top-2 left-2 md:top-4 md:left-4">
                  <Badge variant="secondary" className="bg-muted text-secondary font-bold border-none text-[8px] md:text-xs">
                    {p.cat}
                  </Badge>
                </div>
              </div>

              <div className="p-3 md:p-6 flex-1 flex flex-col">
                <h3 className="text-primary font-headline font-bold text-sm md:text-lg mb-1 group-hover:text-secondary transition-colors line-clamp-2">
                  {p.name}
                </h3>
                <p className="text-muted-foreground text-[10px] md:text-xs mb-3 md:mb-4">{p.company}</p>
                
                <div className="mt-auto pt-3 md:pt-4 flex items-center justify-between border-t border-muted/50">
                  <div>
                    <p className="text-[8px] md:text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Wholesale</p>
                    <p className="text-primary font-bold text-base md:text-xl">₹{p.price}</p>
                  </div>
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-muted group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center transition-all">
                    <Plus size={16} className="md:w-5 md:h-5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button variant="outline" className="rounded-full px-12 h-14 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold text-lg">
            View All 2500+ Products
          </Button>
        </div>
      </div>
    </section>
  );
}
