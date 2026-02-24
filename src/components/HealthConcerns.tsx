"use client"

import React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const concerns = [
  { id: 'diabetes', title: "Diabetes", color: "bg-[#F0FDFA]", imageId: "concern-diabetes" },
  { id: 'heart', title: "Heart Care", color: "bg-[#FDF2F8]", imageId: "concern-heart" },
  { id: 'stomach', title: "Stomach Care", color: "bg-[#F0FDF4]", imageId: "concern-stomach" },
  { id: 'liver', title: "Liver Care", color: "bg-[#FFF7ED]", imageId: "concern-liver" },
  { id: 'bone', title: "Bone & Joint", color: "bg-[#F5F3FF]", imageId: "concern-bone" },
  { id: 'kidney', title: "Kidney Care", color: "bg-[#ECFEFF]", imageId: "concern-kidney" },
  { id: 'derma', title: "Derma Care", color: "bg-[#FFF1F2]", imageId: "concern-derma" },
  { id: 'respiratory', title: "Respiratory", color: "bg-[#FEFCE8]", imageId: "concern-respiratory" },
];

export function HealthConcerns() {
  return (
    <section className="py-14 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-[#1a1a1a] mb-2 font-headline">Shop by health concerns</h2>
          <div className="w-12 h-0.5 bg-emerald-500 rounded-full" />
        </div>

        <div className="flex overflow-x-auto pb-6 gap-4 md:gap-5 scroll-smooth snap-x no-scrollbar">
          {concerns.map((item) => {
            const img = PlaceHolderImages.find(p => p.id === item.imageId)?.imageUrl;
            return (
              <div 
                key={item.id} 
                className="flex-shrink-0 w-28 md:w-36 snap-start group cursor-pointer"
              >
                <div className={`aspect-square rounded-2xl ${item.color} overflow-hidden mb-3 border border-border/20 group-hover:shadow-md transition-all relative`}>
                  <Image 
                    src={img || `https://picsum.photos/seed/${item.id}/400/400`}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    data-ai-hint={item.title}
                  />
                </div>
                <h3 className="text-center text-[11px] md:text-xs font-bold text-primary leading-tight group-hover:text-emerald-600 transition-colors h-8 flex items-start justify-center px-1 uppercase tracking-tight">
                  {item.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}