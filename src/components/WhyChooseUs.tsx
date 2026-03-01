"use client"

import React from 'react';
import { CheckCircle2, Package, Truck, Building2 } from 'lucide-react';

const highlights = [
  {
    icon: <Building2 className="w-9 h-9" />,
    title: "29+ Authorized Companies",
    desc: "Direct partnership with leading pharma giants ensuring authentic supply."
  },
  {
    icon: <Package className="w-9 h-9" />,
    title: "2500+ Active Products",
    desc: "Vast inventory of medicines, surgical items and veterinary products."
  },
  {
    icon: <Truck className="w-9 h-9" />,
    title: "Fast & Reliable Supply",
    desc: "Optimized logistics chain for on-time delivery to hospitals & stores."
  },
  {
    icon: <CheckCircle2 className="w-9 h-9" />,
    title: "Trusted Credentials",
    desc: "Serving since 2015 with valid Wholesale & Retail drug licenses."
  }
];

export function WhyChooseUs() {
  return (
    <section id="why-us" className="py-20 relative overflow-hidden">
      {/* Background Gradient Strip */}
      <div className="absolute inset-0 bg-secondary/5 -skew-y-3 translate-y-24 scale-110 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-14">
          <span className="text-secondary font-bold uppercase tracking-widest text-xs">Our Strength</span>
          <h2 className="text-primary font-headline font-bold text-3xl md:text-4xl mt-1">Why Choose Aadarsh MedStore?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-3xl border border-border shadow-lg shadow-primary/5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mb-6 group-hover:gradient-button group-hover:text-white transition-all duration-300">
                {item.icon}
              </div>
              <h3 className="text-primary font-headline font-bold text-lg mb-3 leading-tight">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed opacity-90">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
