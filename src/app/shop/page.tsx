import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ShopFilters } from '@/components/ShopFilters';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, ChevronRight, LayoutGrid, List } from 'lucide-react';

const allProducts = [
  { id: 1, name: "Augmentin 625 DUO", company: "GlaxoSmithKline", cat: "Antibiotic", price: "120.00", img: "https://picsum.photos/seed/p1/600/600" },
  { id: 2, name: "Calpol 650mg", company: "GSK", cat: "Antipyretic", price: "45.50", img: "https://picsum.photos/seed/p2/600/600" },
  { id: 3, name: "Telma 40", company: "Glenmark", cat: "Cardiac", price: "185.00", img: "https://picsum.photos/seed/p3/600/600" },
  { id: 4, name: "Dolo 650", company: "Micro Labs", cat: "Analgesic", price: "30.00", img: "https://picsum.photos/seed/p4/600/600" },
  { id: 5, name: "Limcee Vitamin C", company: "Himalaya", cat: "Supplements", price: "85.00", img: "https://picsum.photos/seed/p5/600/600" },
  { id: 6, name: "N95 Face Masks", company: "3M", cat: "Surgical", price: "450.00", img: "https://picsum.photos/seed/p6/600/600" },
  { id: 7, name: "Accu-Chek Guide", company: "Roche", cat: "Medical Device", price: "1250.00", img: "https://picsum.photos/seed/p7/600/600" },
  { id: 8, name: "Azithromycin 500mg", company: "Cipla", cat: "Antibiotics", price: "115.00", img: "https://picsum.photos/seed/p8/600/600" },
  { id: 9, name: "Betadine Ointment", company: "Win-Medicare", cat: "Antiseptic", price: "95.00", img: "https://picsum.photos/seed/p9/600/600" },
  { id: 10, name: "Pudin Hara Pearls", company: "Dabur", cat: "Digestive", price: "25.00", img: "https://picsum.photos/seed/p10/600/600" },
  { id: 11, name: "Vicks Vaporub", company: "P&G", cat: "Cold & Cough", price: "145.00", img: "https://picsum.photos/seed/p11/600/600" },
  { id: 12, name: "Omnigel 30g", company: "Cipla", cat: "Pain Relief", price: "110.00", img: "https://picsum.photos/seed/p12/600/600" },
];

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-muted/20">
      <Header />
      
      <div className="pt-28 md:pt-36 pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Page Header & Breadcrumbs */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                <ChevronRight size={14} />
                <span className="text-primary font-bold">Shop Inventory</span>
              </nav>
              <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary">All Pharmaceutical Products</h1>
              <p className="text-muted-foreground mt-2 max-w-xl">
                Browse our complete catalog of 2500+ products including medicines, surgical essentials, and diagnostic equipment.
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar Filters */}
            <aside className="w-full lg:w-72 shrink-0">
              <ShopFilters />
            </aside>

            {/* Main Product Grid Area */}
            <div className="flex-1">
              <div className="bg-white p-4 rounded-2xl border border-muted/30 shadow-sm mb-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground font-medium">Showing {allProducts.length} Products</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="text-secondary bg-secondary/10 rounded-lg">
                    <LayoutGrid size={18} />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary rounded-lg">
                    <List size={18} />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-6">
                {allProducts.map((p) => (
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

              {/* Pagination Placeholder */}
              <div className="mt-12 flex justify-center">
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="rounded-xl border-muted text-muted-foreground hover:border-secondary hover:text-secondary">Previous</Button>
                  {[1, 2, 3].map(num => (
                    <Button key={num} variant={num === 1 ? "default" : "outline"} className={num === 1 ? "rounded-xl gradient-button text-white" : "rounded-xl border-muted text-muted-foreground hover:border-secondary"}>
                      {num}
                    </Button>
                  ))}
                  <Button variant="outline" className="rounded-xl border-muted text-muted-foreground hover:border-secondary hover:text-secondary">Next</Button>
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
