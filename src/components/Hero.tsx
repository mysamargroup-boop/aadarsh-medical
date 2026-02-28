"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import NextLink from 'next/link';
import { Button } from '@/components/ui/button';
import { Pill, Activity, PlusCircle, ChevronRight, ChevronLeft } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

const slides = [
  {
    title: "Aadarsh Medical Store – Trusted Wholesale Pharmacy",
    subtitle: "Authorized Wholesale Distributor of 29+ Leading Pharma Companies serving the nation.",
    image: PlaceHolderImages.find(img => img.id === 'hero-1')?.imageUrl,
    cta: "View Products"
  },
  {
    title: "2500+ Running Products in Stock",
    subtitle: "Medicines | OTC | Surgical | Veterinary Supplies. Everything your medical facility needs.",
    image: PlaceHolderImages.find(img => img.id === 'hero-2')?.imageUrl,
    cta: "Download Catalog"
  },
  {
    title: "Reliable & Fast Supply Chain",
    subtitle: "Serving Pharmacies, Hospitals & Medical Institutions with precision and care since 2015.",
    image: PlaceHolderImages.find(img => img.id === 'hero-3')?.imageUrl,
    cta: "Contact Us Now"
  }
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[80vh] md:h-screen w-full overflow-hidden medical-gradient-hero">
      {/* Background Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <Pill className="absolute top-20 left-[10%] text-background/10 w-24 h-24 animate-float-slow rotate-45" />
        <Activity className="absolute bottom-20 left-[20%] text-background/10 w-32 h-32 animate-float-medium" />
        <PlusCircle className="absolute top-40 right-[15%] text-background/10 w-16 h-16 animate-float-slow" />
        <Pill className="absolute bottom-40 right-[10%] text-background/10 w-20 h-20 animate-float-medium -rotate-12" />
      </div>

      {slides.map((slide, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 flex items-center",
            currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
          )}
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <Image
              src={slide.image || ''}
              alt={slide.title}
              fill
              className="object-cover opacity-30 mix-blend-overlay"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/40 to-transparent" />
          </div>

          <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-8 w-full">
            <div className="max-w-2xl text-background">
              <h1 className="font-headline font-bold text-3xl md:text-5xl lg:text-6xl mb-6 leading-tight animate-in slide-in-from-bottom duration-700">
                {slide.title}
              </h1>
              <p className="font-body text-base md:text-lg lg:text-xl mb-8 opacity-90 leading-relaxed animate-in slide-in-from-bottom delay-100 duration-700">
                {slide.subtitle}
              </p>
              <div className="flex flex-wrap gap-4 animate-in slide-in-from-bottom delay-200 duration-700">
                <NextLink href="/shop">
                  <Button size="lg" className="gradient-button text-white px-8 h-12 md:h-14 rounded-full text-base md:text-lg shadow-xl shadow-secondary/20 group border-none">
                    {slide.cta}
                    <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </NextLink>
                <NextLink href="/shop">
                  <Button variant="outline" size="lg" className="bg-white/10 backdrop-blur-md border-white/30 text-background hover:bg-white/20 h-12 md:h-14 rounded-full px-8 text-base md:text-lg">
                    Learn More
                  </Button>
                </NextLink>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Slide Navigation */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              currentSlide === index ? "bg-background w-8" : "bg-background/40 w-1.5"
            )}
          />
        ))}
      </div>

      {/* Wave Separator */}
      <div className="wave-separator absolute bottom-0 z-40" />
    </section>
  );
}