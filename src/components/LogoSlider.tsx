
"use client"

import React from 'react';
import { cn } from '@/lib/utils';

import Image from 'next/image';

const companies = [
  { name: 'Mankind', src: '/images/partners/converted-mankind.webp' },
  { name: 'Aristo', src: '/images/partners/converted-aristo.webp' },
  { name: 'Cipla', src: '/images/partners/converted-cipla.webp' },
  { name: "Dr. Reddy's", src: '/images/partners/converted-dr-reddy.webp' },
  { name: 'Lupin', src: '/images/partners/converted-lupin.webp' },
  { name: 'Macleods', src: '/images/partners/converted-macleods.webp' },
  { name: 'Sarabhai', src: '/images/partners/converted-sarabhai.webp' },
  { name: 'Sushima', src: '/images/partners/converted-sushima.webp' },
  { name: 'Torrent Pharma', src: '/images/partners/converted-torrent-pharma.webp' },
  { name: 'Tynor', src: '/images/partners/converted-tynor.webp' },
];

export function LogoSlider() {
  return (
    <section className="pt-12 pb-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
        <p className="text-muted-foreground font-semibold uppercase tracking-wider text-sm mb-2">Authorized Wholesale Distributor of</p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 mt-2">
          <h2 className="text-primary font-headline font-bold text-3xl">Our Pharma Partners</h2>
          <a href="/brands" className="text-secondary text-sm font-semibold hover:underline bg-secondary/10 px-4 py-1.5 rounded-full inline-block">View All</a>
        </div>
      </div>

      <div className="relative">
        <div className="flex animate-scroll hover:pause whitespace-nowrap gap-8 py-4 w-max">
          {[...companies, ...companies].map((company, index) => (
            <div
              key={index}
              className="inline-flex items-center justify-center p-6 bg-white border border-muted rounded-2xl shadow-sm hover:shadow-xl hover:border-secondary/30 transition-all duration-300 min-w-[200px] h-[100px] cursor-default group relative"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={company.src}
                  alt={`${company.name} logo`}
                  fill
                  className="object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300 scale-110"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
