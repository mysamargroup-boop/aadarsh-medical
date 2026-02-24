
"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, ShoppingBag, MessageCircle, Home, LayoutGrid, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Categories', href: '#categories' },
    { name: 'Products', href: '#products' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <nav 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8 py-4",
          isScrolled ? "bg-white/90 backdrop-blur-md shadow-md py-3" : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:bg-secondary transition-colors">
              A
            </div>
            <span className={cn(
              "font-headline font-bold text-xl md:text-2xl",
              isScrolled || isMobileMenuOpen ? "text-primary" : "text-white"
            )}>
              Aadarsh MedStore
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className={cn(
                  "font-medium transition-colors hover:text-secondary",
                  isScrolled ? "text-primary" : "text-white"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Button className="bg-secondary hover:bg-secondary/90 text-white rounded-full px-6 shadow-lg shadow-secondary/20">
              Enquiry Portal
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className={isScrolled ? "text-primary" : "text-white"} size={28} />
            ) : (
              <Menu className={isScrolled ? "text-primary" : "text-white"} size={28} />
            )}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-2xl p-6 flex flex-col gap-4 animate-in slide-in-from-top duration-300 md:hidden border-t">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-primary font-semibold text-lg py-2 border-b border-muted"
              >
                {link.name}
              </Link>
            ))}
            <Button className="w-full bg-primary mt-4 py-6">Enquiry Portal</Button>
          </div>
        )}
      </nav>

      {/* Mobile Sticky Bottom Bar */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-[60] bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-muted/50 p-3 flex justify-around items-center">
        <Link href="#" className="flex flex-col items-center gap-1 text-primary">
          <Home size={20} />
          <span className="text-[10px] font-bold">Home</span>
        </Link>
        <Link href="#categories" className="flex flex-col items-center gap-1 text-muted-foreground">
          <LayoutGrid size={20} />
          <span className="text-[10px]">Categories</span>
        </Link>
        <button className="bg-secondary w-14 h-14 rounded-full flex items-center justify-center -mt-10 shadow-xl border-4 border-white">
          <Phone className="text-white" size={24} />
        </button>
        <Link href="#products" className="flex flex-col items-center gap-1 text-muted-foreground">
          <Search size={20} />
          <span className="text-[10px]">Search</span>
        </Link>
        <Link href="https://wa.me/919630080706" className="flex flex-col items-center gap-1 text-secondary">
          <MessageCircle size={20} />
          <span className="text-[10px] font-bold">WhatsApp</span>
        </Link>
      </div>
    </>
  );
}
