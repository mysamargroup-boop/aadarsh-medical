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
    bannerTitle: "NPPA Circulars & Current Price List",
    imageUrl: PlaceHolderImages.find(img => img.id === 'promo-banner')?.imageUrl,
  },
  {
    id: 2,
    tag: "Pain Relief",
    title: "FAST ACTION AGAINST CHRONIC PAIN",
    description: "New Batch Available",
    bannerTitle: "Wholesale Pharmaceutical Inventory",
    imageUrl: PlaceHolderImages.find(img => img.id === 'hero-1')?.imageUrl,
  },
  {
    id: 3,
    tag: "Wellness",
    title: "COMPLETE VITAMIN CARE FOR FAMILIES",
    description: "Authorized Distributor",
    bannerTitle: "Authorized Healthcare Supplies",
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
    <section className="w-full bg-[#0077C8] overflow-hidden">
      <div className="max-w-[1920px] mx-auto relative flex flex-col md:flex-row items-stretch min-h-[400px]">
        {/* Left/Center Content: Brand & Product Visuals */}
        <div className="flex-1 relative min-h-[300px] md:min-h-[400px] flex items-center transition-all duration-700">
          <Image 
            src={currentPromo.imageUrl || ''}
            alt={currentPromo.tag}
            fill
            className="object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0077C8]/40 to-transparent" />
          
          <div className="relative z-10 p-8 md:p-16 flex flex-col justify-center h-full max-w-2xl">
            <div className="bg-white/90 backdrop-blur-sm rounded-full px-6 py-2 w-fit mb-8 shadow-sm animate-in fade-in slide-in-from-left duration-500">
              <span className="text-[#0077C8] font-bold text-lg md:text-xl">{currentPromo.tag}</span>
            </div>
            
            <h2 className="text-white font-headline font-bold text-4xl md:text-6xl leading-tight mb-4 drop-shadow-md animate-in fade-in slide-in-from-bottom duration-700">
              {currentPromo.title}
            </h2>
          </div>
        </div>

        {/* Right Content: Information & CTA */}
        <div className="w-full md:w-[35%] bg-[#0077C8] p-8 md:p-16 flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/10 z-20">
          <h3 className="text-white font-headline font-bold text-3xl md:text-4xl mb-4 leading-tight animate-in fade-in duration-1000">
            {currentPromo.bannerTitle}
          </h3>
          <p className="text-white/80 text-lg mb-8">{currentPromo.description}</p>
          
          <Button className="bg-white hover:bg-white/90 text-[#0077C8] rounded-md h-12 px-8 w-fit font-bold text-lg shadow-lg">
            View notices
          </Button>
        </div>

        {/* Navigation Controls Overlay */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-6 bg-white/20 backdrop-blur-md px-6 py-2.5 rounded-full border border-white/10">
          <div className="flex items-center gap-2">
            <button 
              onClick={prevSlide}
              className="text-white/70 hover:text-white transition-colors p-1"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={nextSlide}
              className="text-white/70 hover:text-white transition-colors p-1"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-1.5 bg-white rounded-full transition-all duration-300" />
            {promos.map((_, i) => (
              <div 
                key={i} 
                onClick={() => setCurrentIndex(i)}
                className={cn(
                  "h-1.5 rounded-full cursor-pointer transition-all duration-300",
                  currentIndex === i ? "w-8 bg-white" : "w-1.5 bg-white/40"
                )} 
              />
            ))}
          </div>

          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-white/70 hover:text-white transition-colors p-1"
          >
            {isPlaying ? (
              <Pause size={16} fill="currentColor" />
            ) : (
              <Play size={16} fill="currentColor" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
