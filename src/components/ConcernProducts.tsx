'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Plus, ChevronRight, ArrowRight, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { products, getProductUrl } from '@/lib/product-data';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';

const concerns = [
    { id: 'diabetes', name: 'Diabetes', icon: '🩸' },
    { id: 'heart', name: 'Heart Care', icon: '❤️' },
    { id: 'derma', name: 'Derma Care', icon: '🧴' },
    { id: 'gastric', name: 'Gastric Care', icon: '🥗' },
    { id: 'infective', name: 'Anti-Infectives', icon: '🛡️' },
];

export function ConcernProducts() {
    const [activeConcern, setActiveConcern] = useState(concerns[0].id);
    const { addToCart, toggleWishlist, wishlist } = useCart();

    // Filter products by concern
    // In a real scenario, we'd use product.healthConditions, but for now we search molecules or descriptions
    const filteredProducts = products.filter(p => {
        const concern = concerns.find(c => c.id === activeConcern);
        if (!concern) return false;

        // Simple matching for demo (in production use tags)
        const normalizedDescription = (p.description + ' ' + p.molecules + ' ' + p.cat + ' ' + (p.subCat || '')).toLowerCase();

        const searchWord = concern.name.toLowerCase().split(' ')[0];
        return normalizedDescription.includes(searchWord) || normalizedDescription.includes(concern.id.toLowerCase());
    }).slice(0, 4);

    return (
        <section className="py-24 bg-muted/20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <Badge className="bg-secondary/10 text-secondary border-none px-4 py-1.5 rounded-full font-bold text-xs mb-4 uppercase tracking-[0.2em]">Recommended</Badge>
                        <h2 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-6">
                            Essential Care for <span className="text-secondary italic">Your Concerns</span>
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
                            Carefully curated medical supplies to help you manage specific health conditions more effectively.
                        </p>
                    </div>
                    <Link
                        href="/shop"
                        className="group flex items-center gap-2 text-secondary font-bold text-sm uppercase tracking-widest hover:text-primary transition-colors"
                    >
                        Go to Shop <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Concern Toggles */}
                <div className="flex flex-wrap gap-2 md:gap-3 mb-12">
                    {concerns.map((concern) => (
                        <button
                            key={concern.id}
                            onClick={() => setActiveConcern(concern.id)}
                            className={cn(
                                "flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-sm transition-all duration-300 border-2",
                                activeConcern === concern.id
                                    ? "bg-white border-secondary text-primary shadow-xl shadow-secondary/10 translate-y-[-2px]"
                                    : "bg-white/50 border-transparent text-muted-foreground hover:bg-white hover:border-muted/30"
                            )}
                        >
                            <span className="text-lg">{concern.icon}</span>
                            {concern.name}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredProducts.map((product) => {
                        const isWishlisted = wishlist.includes(product.id);
                        return (
                            <div
                                key={product.id}
                                className="group relative bg-white rounded-[2.5rem] border border-border/50 hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col h-full transform hover:-translate-y-2"
                            >
                                <div className="absolute top-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product.id); }}
                                        className={cn(
                                            "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg border",
                                            isWishlisted
                                                ? "bg-white text-secondary border-secondary"
                                                : "bg-white/90 text-muted-foreground hover:text-secondary border-transparent"
                                        )}
                                    >
                                        <Heart size={16} className={isWishlisted ? "fill-secondary" : ""} />
                                    </button>
                                </div>

                                <div className="relative aspect-[4/3] m-2 rounded-[2rem] overflow-hidden bg-muted/20">
                                    <Image
                                        src={product.img}
                                        alt={product.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                                        <Badge className="bg-white/90 text-primary border-none shadow-sm text-[9px] uppercase font-bold px-2 py-0.5 rounded-full">
                                            {product.cat}
                                        </Badge>
                                    </div>
                                </div>

                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-primary font-bold text-lg mb-1 leading-tight group-hover:text-secondary transition-colors">
                                        {product.name}
                                    </h3>
                                    <p className="text-muted-foreground text-[10px] uppercase font-heavy tracking-widest mb-4">
                                        {product.company}
                                    </p>

                                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-muted/20">
                                        <div>
                                            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest leading-none mb-1 opacity-70">Price</p>
                                            <p className="text-primary font-bold text-xl">₹{product.price.toFixed(2)}</p>
                                        </div>
                                        <button
                                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(product); }}
                                            className="w-10 h-10 rounded-full bg-primary/5 text-primary hover:gradient-button hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm"
                                        >
                                            <Plus size={18} />
                                        </button>
                                    </div>
                                </div>

                                <Link href={getProductUrl(product)} className="absolute inset-0 z-10" />
                            </div>
                        );
                    })}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-muted-foreground text-sm font-medium mb-6 italic opacity-80 italic">
                        "Searching for a specific medication for your condition?"
                    </p>
                    <Link
                        href={`/shop?q=${concerns.find(c => c.id === activeConcern)?.name}`}
                        className="inline-flex items-center gap-3 bg-primary text-white font-bold px-10 py-5 rounded-2xl hover:bg-emerald-600 transition-all shadow-xl shadow-primary/10 group"
                    >
                        Explore All {concerns.find(c => c.id === activeConcern)?.name} Products
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
