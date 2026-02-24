"use client"

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function PromoBanner() {
  const promoImage = PlaceHolderImages.find(img => img.id === 'promo-banner')?.imageUrl;

  return (
    <section className="w-full bg-[#0077C8] overflow-hidden">
      <div className="max-w-[1920px] mx-auto relative flex flex-col md:flex-row items-stretch">
        {/* Left/Center Content: Brand & Product Visuals */}
        <div className="flex-1 relative min-h-[300px] md:min-h-[400px] flex items-center">
          <Image 
            src={promoImage || ''}
            alt="Medical Promo"
            fill
            className="object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0077C8]/40 to-transparent" />
          
          <div className="relative z-10 p-8 md:p-16 flex flex-col justify-center h-full max-w-2xl">
            <div className="bg-white/90 backdrop-blur-sm rounded-full px-6 py-2 w-fit mb-8 shadow-sm">
              <span className="text-[#0077C8] font-bold text-lg md:text-xl">Enterogermina</span>
            </div>
            
            <h2 className="text-white font-headline font-bold text-4xl md:text-6xl leading-tight mb-4 drop-shadow-md">
              HELPS REDUCE <span className="block">DIARRHEA</span>
              <span className="text-3xl md:text-5xl opacity-90">FROM <span className="text-white">DAY 1*</span></span>
            </h2>
          </div>
        </div>

        {/* Right Content: Information & CTA */}
        <div className="w-full md:w-[35%] bg-[#0077C8] p-8 md:p-16 flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/10">
          <h3 className="text-white font-headline font-bold text-3xl md:text-4xl mb-4 leading-tight">
            NPPA Circulars <br />& Current Price List
          </h3>
          <p className="text-white/80 text-lg mb-8">As per DPCO 2013</p>
          
          <Button className="bg-white hover:bg-white/90 text-[#0077C8] rounded-md h-12 px-8 w-fit font-bold text-lg shadow-lg">
            View notices
          </Button>
        </div>

        {/* Navigation Controls Overlay */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-6 bg-white/20 backdrop-blur-md px-6 py-2.5 rounded-full border border-white/10">
          <div className="flex items-center gap-2">
            <button className="text-white/70 hover:text-white transition-colors">
              <ChevronLeft size={20} />
            </button>
            <button className="text-white/70 hover:text-white transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-1.5 bg-white rounded-full" />
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 bg-white/40 rounded-full" />
            ))}
          </div>

          <button className="text-white/70 hover:text-white transition-colors">
            <Pause size={16} fill="currentColor" />
          </button>
        </div>
      </div>
    </section>
  );
}