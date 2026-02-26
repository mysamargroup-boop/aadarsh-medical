"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="medical-gradient-dark text-background pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-white text-primary rounded-xl flex items-center justify-center font-bold text-xl shadow-lg">
                A
              </div>
              <span className="font-headline font-bold text-2xl text-background">
                Aadarsh MedStore
              </span>
            </Link>
            <p className="text-background/60 leading-relaxed max-w-xs">
              Premier pharmaceutical wholesale distributor serving Sagar and Central India with integrity and reliability since 2015.
            </p>
            <div className="flex gap-4">
              <Link href="https://www.facebook.com/share/15ffXat1id/" target="_blank" className="w-10 h-10 rounded-full bg-white/5 hover:bg-secondary flex items-center justify-center transition-colors">
                <Facebook size={18} className="text-background" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-secondary flex items-center justify-center transition-colors">
                <Instagram size={18} className="text-background" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-secondary flex items-center justify-center transition-colors">
                <Twitter size={18} className="text-background" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-secondary flex items-center justify-center transition-colors">
                <Linkedin size={18} className="text-background" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-headline font-bold text-lg mb-8 relative inline-block text-background">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-secondary rounded-full" />
            </h4>
            <ul className="space-y-4 text-background/70">
              {['Home', 'Shop Catalog', 'Categories', 'Wholesale Inquiry', 'Contact Us'].map(item => (
                <li key={item}>
                  <Link href={item === 'Shop Catalog' ? '/shop' : '#'} className="hover:text-secondary hover:translate-x-2 transition-all flex items-center gap-2 group">
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-bold text-lg mb-8 relative inline-block text-background">
              Categories
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-secondary rounded-full" />
            </h4>
            <ul className="space-y-4 text-background/70">
              {['Pharmaceuticals', 'OTC & Healthcare', 'Veterinary Medicines', 'Medical Devices', 'Surgical Essentials'].map(item => (
                <li key={item}>
                  <Link href="/shop" className="hover:text-secondary hover:translate-x-2 transition-all flex items-center gap-2 group">
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-bold text-lg mb-8 relative inline-block text-background">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-secondary rounded-full" />
            </h4>
            <ul className="space-y-4 text-background/70">
              <li className="flex items-start gap-3">
                <MapPin className="text-secondary shrink-0" size={20} />
                <span>Ghanta Ghar, Jagdish ward, Garhakota Dist Sagar, MP, 470229</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-secondary shrink-0" size={20} />
                <span>+91 9630080706</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-secondary shrink-0" size={20} />
                <span className="text-[13px]">adarshmedicalstores2020@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-12 text-center text-background/40 text-sm">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-6 text-xs uppercase tracking-widest font-bold">
            <span>GST: 23AZQPP5467M1ZJ</span>
            <span>Retail DL: 20-223/36/2015</span>
            <span>Wholesale DL: 20B/461/36/2017</span>
          </div>
          <div className="space-y-2">
            <p>© {year || new Date().getFullYear()} Aadarsh Medical Store. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
