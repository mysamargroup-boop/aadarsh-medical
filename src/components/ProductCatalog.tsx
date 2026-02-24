
"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, ShoppingCart, Eye, Filter } from 'lucide-react';
import { PlaceHolderImages } from '@/app/lib/placeholder-images';

const products = [
  { id: 1, name: "Augmentin 625 DUO", company: "GlaxoSmithKline", cat: "Antibiotic", img: "https://picsum.photos/seed/p1/400/400" },
  { id: 2, name: "Calpol 650mg", company: "GSK", cat: "Antipyretic", img: "https://picsum.photos/seed/p2/400/400" },
  { id: 3, name: "Telma 40", company: "Glenmark", cat: "Cardiac", img: "https://picsum.photos/seed/p3/400/400" },
  { id: 4, name: "Dolo 650", company: "Micro Labs", cat: "Analgesic", img: "https://picsum.photos/seed/p4/400/400" },
  { id: 5, name: "Liv 52", company: "Himalaya", cat: "OTC", img: "https://picsum.photos/seed/p5/400/400" },
  { id: 6, name: "Ezee Wash", company: "WellcomeVet", cat: "Veterinary", img: "https://picsum.photos/seed/p6/400/400" },
  { id: 7, name: "Accu-Chek Guide", company: "Roche", cat: "Medical Device", img: "https://picsum.photos/seed/p7/400/400" },
  { id: 8, name: "Surgical Gloves", company: "Romsons", cat: "Surgical", img: "https://picsum.photos/seed/p8/400/400" }
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
                placeholder="Search products, companies..." 
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-muted/50 border-none focus:ring-2 focus:ring-secondary outline-none font-medium"
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>
            <Button variant="outline" className="rounded-2xl h-12 border-muted hover:bg-muted text-primary">
              <Filter className="mr-2 w-4 h-4" /> Filter
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((p) => (
            <div key={p.id} className="group relative bg-white rounded-3xl border border-muted hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 overflow-hidden flex flex-col h-full">
              <div className="relative aspect-square overflow-hidden bg-muted/30">
                <Image 
                  src={p.img} 
                  alt={p.name} 
                  fill 
                  className="object-contain p-8 group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <Badge className="bg-secondary/10 text-secondary border-none hover:bg-secondary/20">{p.cat}</Badge>
                </div>
                
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <Button variant="secondary" size="icon" className="rounded-full shadow-lg">
                    <Eye size={20} />
                  </Button>
                  <Button variant="default" size="icon" className="rounded-full shadow-lg bg-primary">
                    <ShoppingCart size={20} />
                  </Button>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <p className="text-muted-foreground text-xs font-bold uppercase tracking-tight mb-1">{p.company}</p>
                <h3 className="text-primary font-headline font-bold text-lg mb-4 line-clamp-1">{p.name}</h3>
                
                <div className="mt-auto">
                  <Button className="w-full bg-white border border-secondary text-secondary hover:bg-secondary hover:text-white rounded-xl transition-all duration-300 font-bold group">
                    Inquiry Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button variant="outline" className="rounded-full px-12 h-14 border-primary text-primary hover:bg-primary hover:text-white font-bold text-lg">
            View All 2500+ Products
          </Button>
        </div>
      </div>
    </section>
  );
}
