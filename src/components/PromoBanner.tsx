"use client"

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

const promos = [
  {
    id: 1,
    tag: "Enterogermina",
    title: "HELPS REDUCE DIARRHEA FROM DAY 1*",
    description: "As per DPCO 2013",
    bannerTitle: "NPPA Circulars & Price List",
    imageUrl: PlaceHolderImages.find(img => img.id === 'promo-banner')?.imageUrl,
  },
  {
    id: 2,
    tag: "Pain Relief",
    title: "FAST ACTION AGAINST CHRONIC PAIN",
    description: "New Batch Available",
    bannerTitle: "Wholesale Pharma Inventory",
    imageUrl: PlaceHolderImages.find(img => img.id === 'hero-1')?.imageUrl,
  },
  {
    id: 3,
    tag: "Wellness",
    title: "COMPLETE VITAMIN CARE FOR FAMILIES",
    description: "Authorized Distributor",
    bannerTitle: "Authorized Health Supplies",
    imageUrl: PlaceHolderImages.find(img => img.id === 'hero-2')?.imageUrl,
  }
];

export function PromoBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % promos.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + promos.length) % promos.length);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, nextSlide]);

  const currentPromo = promos[currentIndex];

  return (
    <section className="w-full gradient-emerald-teal overflow-hidden">
      <div className="max-w-[1920px] mx-auto relative flex flex-col md:flex-row items-stretch min-h-[360px]">
        {/* Left/Center Content: Brand & Product Visuals */}
        <div className="flex-1 relative min-h-[280px] md:min-h-[360px] flex items-center transition-all duration-700">
          <Image
            src={currentPromo.imageUrl || ''}
            alt={currentPromo.tag}
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#064E3B]/60 to-transparent" />

          <div className="relative z-10 p-6 md:p-14 flex flex-col justify-center h-full max-w-2xl">
            <div className="bg-white/95 backdrop-blur-sm rounded-full px-5 py-1.5 w-fit mb-6 shadow-sm animate-in fade-in slide-in-from-left duration-500">
              <span className="text-emerald-700 font-bold text-sm md:text-base uppercase tracking-widest">{currentPromo.tag}</span>
            </div>

            <h2 className="text-white font-headline font-bold text-3xl md:text-4xl lg:text-5xl leading-tight mb-3 drop-shadow-md animate-in fade-in slide-in-from-bottom duration-700">
              {currentPromo.title}
            </h2>
          </div>
        </div>

        {/* Right Content: Information & CTA */}
        <div className="w-full md:w-[35%] bg-[#047857]/50 backdrop-blur-sm p-8 md:p-14 flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/10 z-20">
          <h3 className="text-white font-headline font-bold text-2xl md:text-3xl mb-4 leading-tight animate-in fade-in duration-1000">
            {currentPromo.bannerTitle}
          </h3>
          <p className="text-white/80 text-sm md:text-base mb-8 leading-relaxed">{currentPromo.description}</p>

          <Button className="bg-white hover:bg-white/90 text-emerald-800 rounded-lg h-11 px-7 w-fit font-bold text-base shadow-lg border-none">
            View notices
          </Button>
        </div>

        {/* Navigation Controls Overlay */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-5 bg-gradient-to-r from-emerald-700 to-teal-800 px-5 py-2 rounded-full border border-emerald-500/30 shadow-xl">
          <div className="flex items-center gap-1.5">
            <button
              onClick={prevSlide}
              className="text-white/70 hover:text-white transition-colors p-1"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextSlide}
              className="text-white/70 hover:text-white transition-colors p-1"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            {promos.map((_, i) => (
              <div
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={cn(
                  "h-1 rounded-full cursor-pointer transition-all duration-300",
                  currentIndex === i ? "w-6 bg-white" : "w-1.5 bg-white/40"
                )}
              />
            ))}
          </div>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-white/70 hover:text-white transition-colors p-1"
          >
            {isPlaying ? (
              <Pause size={14} fill="currentColor" />
            ) : (
              <Play size={14} fill="currentColor" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}