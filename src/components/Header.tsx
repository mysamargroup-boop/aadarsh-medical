
"use client"

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Home, LayoutGrid, ShoppingCart, Pill, ShieldPlus, HeartPulse, Microscope, Syringe, ChevronRight } from 'lucide-react';
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
    { name: 'Shop', href: '/shop' },
    { name: 'Categories', href: '/#categories' },
    { name: 'Why Us', href: '/#why-us' },
    { name: 'Contact', href: '/#contact' },
  ];

  const subNavItems = [
    { name: 'Pharma', icon: <Pill size={16} />, href: '/shop' },
    { name: 'OTC', icon: <ShieldPlus size={16} />, href: '/shop' },
    { name: 'Vet', icon: <HeartPulse size={16} />, href: '/shop' },
    { name: 'Devices', icon: <Microscope size={16} />, href: '/shop' },
    { name: 'Surgical', icon: <Syringe size={16} />, href: '/shop' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    if (path.startsWith('/#') && pathname === '/') return true;
    return false;
  };

  return (
    <>
      {/* Header increased to z-[110] to overlay bottom navigation when menu is open */}
      <header className="fixed top-0 left-0 right-0 z-[110]">
        <nav className={cn("transition-all duration-300 px-4 md:px-8 py-4 medical-gradient-subnav shadow-lg", isScrolled ? "py-3 opacity-100" : "opacity-95")}>
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 md:gap-4 shrink-0">
              <button className="md:hidden p-2 text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <NextLink href="/" className="flex items-center gap-2 group whitespace-nowrap">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-lg flex items-center justify-center text-primary font-bold text-lg md:text-xl shadow-lg shrink-0">A</div>
                <span className="font-headline font-bold text-base sm:text-lg md:text-xl lg:text-2xl text-white">Aadarsh MedStore</span>
              </NextLink>
            </div>
            <div className="hidden md:flex items-center gap-6 lg:gap-8 shrink-0">
              {navLinks.map((link) => (
                <NextLink key={link.name} href={link.href} className={cn("font-bold transition-colors text-sm lg:text-base", isActive(link.href) ? "text-white" : "text-white/80 hover:text-white")}>
                  {link.name}
                </NextLink>
              ))}
              <div className="flex items-center gap-4">
                <NextLink href="/shop" className="relative p-2 text-white hover:opacity-80">
                  <ShoppingCart size={24} />
                  <span className="absolute top-0 right-0 w-4 h-4 bg-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-md">0</span>
                </NextLink>
                <Button onClick={handleEnquiryClick} className="bg-white text-primary hover:bg-white/90 rounded-full px-4 lg:px-6 shadow-lg transition-all font-bold text-sm lg:text-base border-none">
                  Enquiry Portal
                </Button>
              </div>
            </div>
            <div className="flex items-center md:hidden gap-3">
               <NextLink href="/shop" className="relative p-2 text-white">
                  <ShoppingCart size={22} />
                  <span className="absolute top-0 right-0 w-4 h-4 bg-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center">0</span>
                </NextLink>
            </div>
          </div>
        </nav>

        <div className={cn("bg-white/10 backdrop-blur-md hidden md:block border-t border-white/10 transition-all duration-300", isScrolled ? "h-0 overflow-hidden opacity-0" : "h-auto py-2.5 opacity-100")}>
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex items-center justify-center gap-8 lg:gap-12">
              {subNavItems.map((item) => (
                <NextLink key={item.name} href={item.href} className="flex items-center gap-2 text-white/80 hover:text-white transition-all group">
                  <span className="group-hover:scale-110 transition-transform">{item.icon}</span>
                  <span className="text-[11px] lg:text-[12px] font-bold tracking-tight whitespace-nowrap uppercase">{item.name}</span>
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
                  "font-bold text-base py-3 border-b border-muted/10 flex items-center justify-between", 
                  isActive(link.href) ? "text-primary" : "text-muted-foreground"
                )}
              >
                {link.name}
                <ChevronRight size={16} className="opacity-30" />
              </NextLink>
            ))}
            <div className="grid grid-cols-2 gap-2 mt-4">
              {subNavItems.map((item) => (
                <NextLink 
                  key={item.name} 
                  href={item.href} 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="flex items-center gap-2 p-3 bg-muted/40 rounded-xl text-[11px] font-bold text-primary border border-transparent hover:border-secondary/20 transition-all"
                >
                  <span className="text-secondary">{item.icon}</span> {item.name}
                </NextLink>
              ))}
            </div>
            <Button 
              onClick={handleEnquiryClick} 
              className="w-full gradient-button text-white mt-6 h-14 font-bold rounded-xl shadow-lg border-none"
            >
              Enquiry Portal
            </Button>
            {/* Safe area spacer for mobile bottom navigation */}
            <div className="h-20 shrink-0" />
          </div>
        )}
      </header>

      {/* Bottom Navigation for Mobile (z-index below the open mobile menu) */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-[102] medical-gradient-dark rounded-2xl shadow-2xl border border-white/10 p-2.5 flex justify-around items-center">
        <NextLink href="/" className={cn("flex flex-col items-center gap-1 transition-colors", isActive('/') ? "text-white opacity-100" : "text-white/60 opacity-80")}>
          <Home size={20} className={cn(isActive('/') && "stroke-[2.5px]")} />
          <span className="text-[10px] font-bold">Home</span>
        </NextLink>
        <NextLink href="/shop" className={cn("flex flex-col items-center gap-1 transition-colors", isActive('/shop') ? "text-white opacity-100" : "text-white/60 opacity-80")}>
          <LayoutGrid size={20} className={cn(isActive('/shop') && "stroke-[2.5px]")} />
          <span className="text-[10px] font-bold">Shop</span>
        </NextLink>
        <button onClick={() => window.location.href = 'tel:+919630080706'} className="bg-white w-14 h-14 rounded-full flex items-center justify-center -mt-10 shadow-xl border-4 border-primary relative z-[103]">
          <Phone className="text-primary" size={24} />
        </button>
        <NextLink href="/shop" className="relative flex flex-col items-center gap-1 text-white/60">
          <ShoppingCart size={20} />
          <span className="text-[10px] font-bold">Cart</span>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent text-white text-[8px] font-bold rounded-full flex items-center justify-center">0</span>
        </NextLink>
        <NextLink href="https://wa.me/919630080706" className="flex flex-col items-center gap-1 text-white/60 hover:text-white">
          <WhatsAppIcon className="w-5 h-5" />
          <span className="text-[10px] font-bold">WhatsApp</span>
        </NextLink>
      </div>
    </>
  );
}
