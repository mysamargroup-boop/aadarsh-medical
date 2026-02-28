
"use client"

import React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';

const concerns = [
  { id: 'gastric', title: "Gastric Care", color: "bg-[#FFF7ED]", image: "https://images.unsplash.com/photo-1519802772250-a52a9af0eacb?auto=format&fit=crop&q=80&w=400&h=400" },
  { id: 'diabetes', title: "Diabetes", color: "bg-[#F0FDFA]", image: "https://images.unsplash.com/photo-1508847154043-be5407fcaa5a?auto=format&fit=crop&q=80&w=400&h=400" },
  { id: 'heart', title: "Heart Care", color: "bg-[#FDF2F8]", image: "https://images.unsplash.com/photo-1628595354825-d97ad2a1d337?auto=format&fit=crop&q=80&w=400&h=400" },
  { id: 'stomach', title: "Stomach Care", color: "bg-[#F0FDF4]", image: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&q=80&w=400&h=400" },
  { id: 'liver', title: "Liver Care", color: "bg-[#FFF7ED]", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=400&h=400" },
  { id: 'bone', title: "Bone & Joint", color: "bg-[#F5F3FF]", image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=400&h=400" },
  { id: 'kidney', title: "Kidney Care", color: "bg-[#ECFEFF]", image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=400&h=400" },
  { id: 'derma', title: "Derma Care", color: "bg-[#FFF1F2]", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=400&h=400" },
  { id: 'respiratory', title: "Respiratory", color: "bg-[#FEFCE8]", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=400&h=400" },
];

export function HealthConcerns() {
  return (
    <section className="pt-6 pb-14 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-[#1a1a1a] mb-2 font-headline">Shop by health concerns</h2>
          <div className="w-12 h-0.5 bg-emerald-500 rounded-full" />
        </div>

        <div className="flex overflow-x-auto pb-6 gap-4 md:gap-5 scroll-smooth snap-x no-scrollbar">
          {concerns.map((item) => {
            return (
              <Link
                href={item.id === 'derma' ? '/shop?q=Derma' : `/shop?q=${item.title}`}
                key={item.id}
                className="flex-shrink-0 w-28 md:w-36 snap-start group cursor-pointer"
              >
                <div className={`aspect-square rounded-2xl ${item.color} overflow-hidden mb-3 border border-border/20 group-hover:shadow-md transition-all relative`}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-center text-[11px] md:text-xs font-bold text-primary leading-tight group-hover:text-emerald-600 transition-colors h-8 flex items-start justify-center px-1 uppercase tracking-tight">
                  {item.title}
                </h3>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
