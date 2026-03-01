"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop Catalog', href: '/shop' },
    { name: 'Categories', href: '/categories' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Bank Details', href: '/bank-details' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <footer className="bg-gradient-to-br from-emerald-950 via-teal-900 to-emerald-800 text-teal-50 pt-24 pb-28 md:pb-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-secondary/10 mix-blend-multiply" />
      <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.png')]" />
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group mb-6">
              <div className="w-48 h-16 flex items-center justify-start relative -ml-2 md:ml-0">
                <Image src="/logo.png" alt="Aadarsh Medical Logo" fill className="object-contain object-left md:object-center" priority />
              </div>
            </Link>
            <p className="text-teal-100/80 leading-relaxed max-w-xs">
              Premier pharmaceutical wholesale distributor serving Sagar and Central India with integrity and reliability since 2015.
            </p>
            <div className="flex gap-4">
              <Link href="https://www.facebook.com/share/15ffXat1id/" target="_blank" className="w-10 h-10 rounded-full bg-white/5 hover:bg-secondary flex items-center justify-center transition-colors">
                <Facebook size={18} className="text-white" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-secondary flex items-center justify-center transition-colors">
                <Instagram size={18} className="text-white" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-secondary flex items-center justify-center transition-colors">
                <Twitter size={18} className="text-white" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-secondary flex items-center justify-center transition-colors">
                <Linkedin size={18} className="text-white" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-headline font-bold text-lg mb-8 relative inline-block text-white">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-secondary rounded-full" />
            </h4>
            <ul className="space-y-4 text-teal-100/80">
              {quickLinks.map(item => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-accent hover:translate-x-2 transition-all flex items-center gap-2 group">
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-bold text-lg mb-8 relative inline-block text-white">
              Categories
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-secondary rounded-full" />
            </h4>
            <ul className="space-y-4 text-teal-100/80">
              {['Pharmaceuticals', 'OTC & Healthcare', 'Veterinary Medicines', 'Medical Devices', 'Surgical Essentials'].map(item => (
                <li key={item}>
                  <Link href="/shop" className="hover:text-accent hover:translate-x-2 transition-all flex items-center gap-2 group">
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-bold text-lg mb-8 relative inline-block text-white">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-secondary rounded-full" />
            </h4>
            <ul className="space-y-4 text-teal-100/80">
              <li className="flex items-start gap-3">
                <MapPin className="text-secondary shrink-0" size={20} />
                <span>Ghanta Ghar, Jagdish ward, Garhakota Dist Sagar, MP, 470229</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-secondary shrink-0" size={20} />
                <div className="flex flex-col">
                  <span className="text-white">+91 9630080706</span>
                  <span className="text-xs text-zinc-400">+91 9243967137</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-secondary shrink-0" size={20} />
                <span className="text-[13px] text-white">adarshmedicalstores2020@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-12 text-center text-teal-100/60 text-sm">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-6 text-xs uppercase tracking-widest font-bold">
            <span>GST: 23AZQPP5467M1ZJ</span>
            <span>Retail DL: 20-223/36/2015</span>
            <span>Wholesale DL: 20B/461/36/2017</span>
          </div>
          <div className="space-y-2">
            <p className="text-teal-100/50">© {year || new Date().getFullYear()} Aadarsh Medical Store. All Rights Reserved.</p>
            <Link
              href="https://www.instagram.com/shubham__nema"
              target="_blank"
              className="text-secondary font-medium hover:text-white transition-colors"
            >
              Designed By Samar
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
