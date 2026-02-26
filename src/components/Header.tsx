
"use client"

import React, { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Menu, X, Phone, Home, LayoutGrid, ShoppingCart, Pill, ShieldPlus, HeartPulse, Microscope, Syringe, ChevronRight, ArrowRight, Building2, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import NextLink from 'next/link';

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEnquiryClick = () => {
    window.open('https://wa.me/919630080706?text=Hi Abhishek, I want to inquire about wholesale medicine supply for my organization.', '_blank');
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Inventory', href: '/shop' },
    { name: 'Categories', href: '/categories' },
    { name: 'Why Us', href: '/#why-us' },
    { name: 'Contact', href: '/#contact' },
  ];

  const subNavItems = [
    { name: 'Pharma', icon: <Pill size={16} />, href: '/shop?cat=Pharmaceuticals' },
    { name: 'OTC', icon: <ShieldPlus size={16} />, href: '/shop?cat=OTC & Healthcare' },
    { name: 'Vet', icon: <HeartPulse size={16} />, href: '/shop?cat=Veterinary Medicines' },
    { name: 'Devices', icon: <Microscope size={16} />, href: '/shop?cat=Medical Devices & Equipment' },
    { name: 'Surgical', icon: <Syringe size={16} />, href: '/shop?cat=Surgical & Healthcare Essentials' },
  ];

  const brands = [
    "Dr. Reddy's", "Macleods", "Lupin", "Abbott", "Cipla", "Torrent", "Sun Pharma", "Alkem"
  ];

  const isActive = (path: string) => {
    // Hash links should never be considered active.
    if (path.includes('#')) {
      return false;
    }
    // For the home page, require an exact match.
    if (path === '/') {
      return pathname === '/';
    }
    // For all other links (e.g., /shop), use startsWith to handle query params.
    return pathname.startsWith(path);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[1000]">
        <nav className={cn(
          "transition-all duration-300 px-4 md:px-8 py-4 medical-gradient-subnav shadow-lg",
          isScrolled ? "py-2.5" : "py-4"
        )}>
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 md:gap-4 shrink-0">
              <button className="md:hidden p-2 text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <NextLink href="/" className="flex items-center gap-2 group whitespace-nowrap">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-lg flex items-center justify-center text-primary font-bold text-lg md:text-xl shadow-lg shrink-0">A</div>
                <span className="font-headline font-bold text-sm sm:text-lg md:text-xl lg:text-2xl text-white">Aadarsh MedStore</span>
              </NextLink>
            </div>
            
            <div className="hidden md:flex items-center gap-4 lg:gap-6 shrink-0 h-full">
              {navLinks.map((link) => (
                <div 
                  key={link.name}
                  className="relative flex items-center h-full"
                >
                  <NextLink 
                    href={link.href} 
                    className={cn(
                      "font-bold transition-all text-sm lg:text-base py-4 flex items-center h-full border-b-2 border-transparent", 
                      isActive(link.href) ? "text-white border-white" : "text-white/80 hover:text-white"
                    )}
                  >
                    {link.name}
                  </NextLink>
                </div>
              ))}
              
              <div className="flex items-center gap-3 ml-2">
                <NextLink href="/shop" className="relative p-2 text-white hover:scale-110 transition-transform">
                  <ShoppingCart size={24} />
                  <span className="absolute top-1 right-1 w-4 h-4 bg-accent text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-md">0</span>
                </NextLink>
                <Button onClick={handleEnquiryClick} className="bg-white text-primary hover:bg-white/90 rounded-full px-4 lg:px-6 shadow-xl transition-all font-bold text-sm lg:text-base border-none h-11 shrink-0">
                  Enquiry Portal
                </Button>
              </div>
            </div>

            <div className="flex items-center md:hidden gap-3">
               <NextLink href="/shop" className="relative p-2 text-white">
                  <ShoppingCart size={22} />
                  <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-accent text-white text-[9px] font-bold rounded-full flex items-center justify-center">0</span>
                </NextLink>
            </div>
          </div>
        </nav>

        {/* Sub-Navigation for Desktop */}
        <div className={cn(
          "bg-white/10 backdrop-blur-md hidden md:block border-t border-white/5 transition-all duration-300",
          isScrolled ? "h-0 overflow-hidden opacity-0" : "h-auto py-2.5 opacity-100"
        )}>
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex items-center justify-center gap-8 lg:gap-12">
              {subNavItems.map((item) => (
                <NextLink key={item.name} href={item.href} className="flex items-center gap-2 text-white/70 hover:text-white transition-all group">
                  <span className="group-hover:scale-110 transition-transform opacity-80 group-hover:opacity-100">{item.icon}</span>
                  <span className="text-[11px] font-bold tracking-tight whitespace-nowrap uppercase">{item.name}</span>
                </NextLink>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-2xl p-5 flex flex-col gap-1 animate-in slide-in-from-top duration-300 md:hidden border-t border-muted/20 max-h-[90vh] overflow-y-auto no-scrollbar pb-32">
            {navLinks.map((link) => (
              <NextLink 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)} 
                className={cn(
                  "font-bold text-base py-4 border-b border-muted/10 flex items-center justify-between", 
                  isActive(link.href) ? "text-primary" : "text-muted-foreground"
                )}
              >
                {link.name}
                <ChevronRight size={16} className="opacity-30" />
              </NextLink>
            ))}
            <div className="grid grid-cols-2 gap-3 mt-6">
              {subNavItems.map((item) => (
                <NextLink 
                  key={item.name} 
                  href={item.href} 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl text-xs font-bold text-primary border border-slate-100 hover:border-secondary/20 transition-all"
                >
                  <span className="text-secondary">{item.icon}</span> {item.name}
                </NextLink>
              ))}
            </div>
            <Button 
              onClick={handleEnquiryClick} 
              className="w-full gradient-button text-white mt-8 h-14 font-bold rounded-2xl shadow-lg border-none"
            >
              Enquiry Portal
            </Button>
            <div className="h-20 shrink-0" />
          </div>
        )}
      </header>

      {/* Bottom Navigation for Mobile */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 z-[102] medical-gradient-dark rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.3)] border border-white/10 p-3 flex justify-around items-center">
        <NextLink href="/" className={cn("flex flex-col items-center gap-1 transition-colors", isActive('/') ? "text-white opacity-100" : "text-white/60 opacity-80")}>
          <Home size={20} className={cn(isActive('/') && "stroke-[2.5px]")} />
          <span className="text-[10px] font-bold">Home</span>
        </NextLink>
        <NextLink href="/shop" className={cn("flex flex-col items-center gap-1 transition-colors", isActive('/shop') ? "text-white opacity-100" : "text-white/60 opacity-80")}>
          <LayoutGrid size={20} className={cn(isActive('/shop') && "stroke-[2.5px]")} />
          <span className="text-[10px] font-bold">Shop</span>
        </NextLink>
        <button onClick={() => window.location.href = 'tel:+919630080706'} className="bg-white w-14 h-14 rounded-full flex items-center justify-center -mt-12 shadow-2xl border-4 border-primary relative z-[103] group active:scale-95 transition-transform">
          <Phone className="text-primary group-hover:rotate-12 transition-transform" size={24} />
        </button>
        <NextLink href="/shop" className="relative flex flex-col items-center gap-1 text-white/60">
          <ShoppingCart size={20} />
          <span className="text-[10px] font-bold">Cart</span>
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-accent text-white text-[8px] font-bold rounded-full flex items-center justify-center">0</span>
        </NextLink>
        <NextLink href="https://wa.me/919630080706" className="flex flex-col items-center gap-1 text-white/60 hover:text-white">
          <WhatsAppIcon className="w-5 h-5" />
          <span className="text-[10px] font-bold">WhatsApp</span>
        </NextLink>
      </div>
    </>
  );
}
