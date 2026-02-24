
"use client"

import React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const concerns = [
  { id: 'diabetes', title: "Diabetes", color: "bg-[#FFF4E5]", imageId: "concern-diabetes" },
  { id: 'heart', title: "Heart Care", color: "bg-[#F3E8FF]", imageId: "concern-heart" },
  { id: 'stomach', title: "Stomach Care", color: "bg-[#E6F9F1]", imageId: "concern-stomach" },
  { id: 'liver', title: "Liver Care", color: "bg-[#FFEBEB]", imageId: "concern-liver" },
  { id: 'bone', title: "Bone, Joint & Muscle Care", color: "bg-[#FFF0F5]", imageId: "concern-bone" },
  { id: 'kidney', title: "Kidney Care", color: "bg-[#E0F7FA]", imageId: "concern-kidney" },
  { id: 'derma', title: "Derma Care", color: "bg-[#FCE4EC]", imageId: "concern-derma" },
  { id: 'respiratory', title: "Respiratory Care", color: "bg-[#FFF9C4]", imageId: "concern-respiratory" },
];

export function HealthConcerns() {
  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-2 font-headline">Shop by health concerns</h2>
          <div className="w-16 h-1 bg-[#EB5B3C] rounded-full" />
        </div>

        <div className="flex overflow-x-auto pb-8 gap-4 md:gap-6 no-scrollbar scroll-smooth snap-x">
          {concerns.map((item) => {
            const img = PlaceHolderImages.find(p => p.id === item.imageId)?.imageUrl;
            return (
              <div 
                key={item.id} 
                className="flex-shrink-0 w-32 md:w-44 snap-start group cursor-pointer"
              >
                <div className={`aspect-square rounded-[2rem] ${item.color} overflow-hidden mb-4 border border-muted/20 group-hover:shadow-lg transition-all relative`}>
                  <Image 
                    src={img || `https://picsum.photos/seed/${item.id}/400/400`}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    data-ai-hint={item.title}
                  />
                </div>
                <h3 className="text-center text-[13px] md:text-sm font-bold text-[#444] leading-tight group-hover:text-primary transition-colors h-10 flex items-start justify-center px-1">
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
