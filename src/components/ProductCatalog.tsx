"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Filter, Check, ArrowRight } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { products, getProductUrl } from '@/lib/product-data';
import { useCart } from '@/context/CartContext';

const categories = ["All", "Pharmaceuticals", "OTC & Healthcare", "Veterinary Medicines", "Medical Devices & Equipment", "Surgical & Healthcare Essentials"];

export function ProductCatalog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsInitialLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = products.slice(0, 10).filter(p => {
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
            <span className="text-secondary font-bold uppercase tracking-widest text-[10px]">Our Inventory</span>
            <h2 className="text-primary font-headline font-bold text-2xl md:text-3xl mt-1">Featured Products</h2>
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

        {isInitialLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="bg-white rounded-[1.5rem] border border-border p-4 h-[350px] animate-pulse">
                <Skeleton className="aspect-square w-full rounded-2xl mb-4" />
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-3 w-1/2 mb-4" />
                <div className="flex justify-between items-end">
                  <Skeleton className="h-8 w-1/3" />
                  <Skeleton className="h-9 w-9 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
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
          <Button asChild variant="outline" className="rounded-full px-10 h-12 border-primary text-primary hover:gradient-button hover:text-white hover:border-none font-bold text-base bg-white shadow-md transition-all">
            <Link href="/shop">
              Browse All 2500+ Items <ArrowRight className="ml-2" size={18} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: any }) {
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="group relative bg-white rounded-[1.5rem] border border-border hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col h-full transform hover:-translate-y-1">
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
          data-ai-hint="medical product"
        />
        <div className="absolute top-3 left-3 z-20">
          <Badge className="bg-white/95 text-primary text-[9px] font-bold border-none shadow-sm px-2.5 py-1 rounded-full">
            {product.cat}
          </Badge>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col relative z-20 bg-white border-t border-muted/20">
        <h3 className="text-primary font-bold text-sm md:text-base group-hover:text-secondary transition-colors line-clamp-1 leading-tight mb-0.5">
          {product.name}
        </h3>

        <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider mb-4 opacity-80">
          {product.company}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <div>
            <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest leading-none mb-1 opacity-70">MRP</p>
            <p className="text-primary font-bold text-base md:text-lg leading-none">₹{product.price.toFixed(2)}</p>
          </div>
          <button
            onClick={handleAddToCart}
            className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-muted/80 text-primary hover:gradient-button hover:text-white flex items-center justify-center transition-all duration-300 z-30 relative"
          >
            <Plus className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
