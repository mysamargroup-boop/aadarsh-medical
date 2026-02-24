
"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { Pill, HeartPulse, ShieldPlus, Microscope, Syringe, ArrowRight } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';

const categories = [
  {
    title: "Pharmaceuticals",
    desc: "Complete range of generic and branded prescription drugs from top pharma giants.",
    icon: <Pill className="w-8 h-8" />,
    color: "from-blue-500/10 to-blue-600/10",
    image: PlaceHolderImages.find(img => img.id === 'pharma-cat')?.imageUrl,
    href: "/shop?cat=Pharmaceuticals"
  },
  {
    title: "OTC & Healthcare",
    desc: "Everyday essentials: ENO, Crocin, Iodex, Sensodyne, Godrej OTC, and Hempushpa.",
    icon: <ShieldPlus className="w-8 h-8" />,
    color: "from-teal-500/10 to-teal-600/10",
    image: PlaceHolderImages.find(img => img.id === 'otc-cat')?.imageUrl,
    href: "/shop?cat=OTC & Healthcare"
  },
  {
    title: "Veterinary Medicines",
    desc: "WellcomeVet Pharma, Tineta Pharma, and Sushima Pharmaceuticals authorized products.",
    icon: <HeartPulse className="w-8 h-8" />,
    color: "from-green-500/10 to-green-600/10",
    image: PlaceHolderImages.find(img => img.id === 'vet-cat')?.imageUrl,
    href: "/shop?cat=Veterinary Medicines"
  },
  {
    title: "Medical Devices & Equipment",
    desc: "Reliable BP Machines, Nebulizers, Stethoscopes, and Digital Thermometers.",
    icon: <Microscope className="w-8 h-8" />,
    color: "from-cyan-500/10 to-cyan-600/10",
    image: PlaceHolderImages.find(img => img.id === 'device-cat')?.imageUrl,
    href: "/shop?cat=Medical Devices & Equipment"
  },
  {
    title: "Surgical & Healthcare Essentials",
    desc: "Professional Syringes, IV Sets, Cotton Bandages, and high-grade Disinfectants.",
    icon: <Syringe className="w-8 h-8" />,
    color: "from-sky-500/10 to-sky-600/10",
    image: PlaceHolderImages.find(img => img.id === 'surgical-cat')?.imageUrl,
    href: "/shop?cat=Surgical & Healthcare Essentials"
  }
];

export function Categories() {
  return (
    <section id="categories" className="py-20 medical-gradient-mint relative">
      <div className="faint-pattern absolute inset-0 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-secondary font-bold uppercase tracking-widest text-xs">Product Segments</span>
            <h2 className="text-primary font-headline font-bold text-3xl md:text-4xl mt-1">Comprehensive Catalog</h2>
          </div>
          <p className="text-muted-foreground max-w-md text-base opacity-80">
            Authorized wholesale distributor for hospitals and retail pharmacies across Central India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <Link 
              key={idx}
              href={cat.href}
              className="group relative overflow-hidden rounded-3xl bg-white border border-border hover:border-secondary/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl flex flex-col"
            >
              <CategoryImage image={cat.image || ''} title={cat.title} icon={cat.icon} />

              <div className="p-7 pt-4 flex-1 flex flex-col">
                <h3 className="text-primary font-headline font-bold text-xl mb-2 group-hover:text-secondary transition-colors">
                  {cat.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1 opacity-90">
                  {cat.desc}
                </p>
                <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-widest text-secondary group/btn w-fit">
                  Explore Now
                  <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryImage({ image, title, icon }: { image: string, title: string, icon: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="h-44 relative overflow-hidden bg-muted/20">
      {isLoading && <Skeleton className="absolute inset-0 z-10" />}
      <Image 
        src={image} 
        alt={title} 
        fill 
        onLoad={() => setIsLoading(false)}
        className={`object-cover group-hover:scale-110 transition-transform duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`} 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
      <div className="absolute bottom-4 left-6 p-2.5 bg-white/95 backdrop-blur-md rounded-xl text-secondary shadow-lg group-hover:gradient-button group-hover:text-white transition-all duration-300 z-20">
        {icon}
      </div>
    </div>
  );
}
