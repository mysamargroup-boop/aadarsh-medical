
"use client"

import React from 'react';
import { cn } from '@/lib/utils';

const companies = [
  "Dr. Reddy's", "Macleods", "Lupin", "Abbott", "Cipla", "Torrent",
  "WellcomeVet", "Pharma Tineta", "Sushima Pharmaceuticals", "Sun Pharma",
  "Alembic", "Alkem", "Glenmark", "Intas", "Zydus"
];

export function LogoSlider() {
  return (
    <section className="pt-12 pb-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
        <p className="text-muted-foreground font-semibold uppercase tracking-wider text-sm mb-2">Authorized Wholesale Distributor of</p>
        <h2 className="text-primary font-headline font-bold text-3xl">Our Pharma Partners</h2>
      </div>

      <div className="relative">
        <div className="flex animate-scroll hover:pause whitespace-nowrap gap-8 py-4">
          {[...companies, ...companies].map((company, index) => (
            <div
              key={index}
              className="inline-flex items-center justify-center px-10 py-6 bg-white border border-muted rounded-2xl shadow-sm hover:shadow-xl hover:border-secondary/30 transition-all duration-300 min-w-[200px] cursor-default group"
            >
              <span className="font-secondary font-bold text-xl text-primary/60 group-hover:text-secondary transition-colors">
                {company}
              </span>
            </div>
          ))}
        </div>

        {/* Gradient Fades for Smooth Look */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
      </div>
    </section>
  );
}
