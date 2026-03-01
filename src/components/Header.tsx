
"use client"

import React, { useState, useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Menu, X, Phone, Home, LayoutGrid, ShoppingCart, Heart, Pill, ShieldPlus, PawPrint, Stethoscope, Scissors, ChevronRight, ArrowRight, Building2, Activity, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import NextLink from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { CartDrawer } from '@/components/CartDrawer';
import { AiAssistant } from '@/components/AiAssistant';

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

// Mega menu data for each category
const megaMenuData: Record<string, { subCategories: { name: string; href: string }[]; brands: string[]; description: string }> = {
  'Pharma': {
    subCategories: [
      { name: 'Derma Care', href: '/shop?q=Derma' },
      { name: 'Gastrointestinal', href: '/shop?q=Gastric' },
      { name: 'Pain & Inflammation', href: '/shop?q=Pain' },
      { name: 'Cardiac & BP', href: '/shop?q=Cardiac' },
      { name: 'Respiratory', href: '/shop?q=Respiratory' },
      { name: 'Hormones & Steroids', href: '/shop?q=Hormone' },
    ],
    brands: ["Dr. Reddy's", "Cipla", "Lupin", "Sun Pharma", "Abbott"],
    description: 'Complete range of generic & branded prescription drugs.'
  },
  'OTC': {
    subCategories: [
      { name: 'Cough & Cold', href: '/shop?q=Cough' },
      { name: 'Pain Relief', href: '/shop?q=Pain' },
      { name: 'Digestive Health', href: '/shop?q=Digestive' },
      { name: 'Vitamins & Supplements', href: '/shop?q=Vitamin' },
      { name: 'First Aid', href: '/shop?q=First Aid' },
      { name: 'Oral Care', href: '/shop?q=Oral' },
    ],
    brands: ["GSK", "Abbott", "Dr. Reddy's", "Cipla"],
    description: 'Everyday healthcare essentials & wellness products.'
  },
  'Vet': {
    subCategories: [
      { name: 'Antibiotics', href: '/shop?cat=Veterinary Medicines&q=Antibiotic' },
      { name: 'Anti-Parasitic', href: '/shop?cat=Veterinary Medicines&q=Parasitic' },
      { name: 'Supplements', href: '/shop?cat=Veterinary Medicines&q=Supplement' },
      { name: 'Vaccines', href: '/shop?cat=Veterinary Medicines&q=Vaccine' },
    ],
    brands: ["WellcomeVet Pharma", "Tineta Pharma", "Sushima Pharmaceuticals"],
    description: 'Authorized veterinary medicines & animal health products.'
  },
  'Devices': {
    subCategories: [
      { name: 'BP Monitors', href: '/shop?cat=Medical Devices & Equipment&q=BP' },
      { name: 'Nebulizers', href: '/shop?cat=Medical Devices & Equipment&q=Nebulizer' },
      { name: 'Thermometers', href: '/shop?cat=Medical Devices & Equipment&q=Thermometer' },
      { name: 'Stethoscopes', href: '/shop?cat=Medical Devices & Equipment&q=Stethoscope' },
      { name: 'Glucometers', href: '/shop?cat=Medical Devices & Equipment&q=Glucometer' },
    ],
    brands: ["Omron", "Dr. Trust", "Rossmax"],
    description: 'Reliable diagnostic & monitoring medical devices.'
  },
  'Surgical': {
    subCategories: [
      { name: 'Syringes & Needles', href: '/shop?cat=Surgical & Healthcare Essentials&q=Syringe' },
      { name: 'IV Sets & Cannulas', href: '/shop?cat=Surgical & Healthcare Essentials&q=IV' },
      { name: 'Bandages & Dressings', href: '/shop?cat=Surgical & Healthcare Essentials&q=Bandage' },
      { name: 'Disinfectants', href: '/shop?cat=Surgical & Healthcare Essentials&q=Disinfectant' },
      { name: 'Gloves & Masks', href: '/shop?cat=Surgical & Healthcare Essentials&q=Glove' },
    ],
    brands: ["Hindustan Syringes", "Romsons", "Johnson & Johnson"],
    description: 'Professional surgical supplies & healthcare consumables.'
  },
};

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesHovered, setIsCategoriesHovered] = useState(false);
  const [activeMegaCategory, setActiveMegaCategory] = useState<string>('Pharma');
  const { totalItems, wishlist, isCartOpen, setIsCartOpen } = useCart();
  const [isWhislistOpen, setIsWishlistOpen] = useState(false);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
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

  const handleCategoriesEnter = () => {
    if (megaMenuTimeoutRef.current) {
      clearTimeout(megaMenuTimeoutRef.current);
      megaMenuTimeoutRef.current = null;
    }
    setIsCategoriesHovered(true);
  };

  const handleCategoriesLeave = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setIsCategoriesHovered(false);
    }, 300); // Increased timeout for better stability
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
    { name: 'Vet', icon: <PawPrint size={16} />, href: '/shop?cat=Veterinary Medicines' },
    { name: 'Devices', icon: <Stethoscope size={16} />, href: '/shop?cat=Medical Devices & Equipment' },
    { name: 'Surgical', icon: <Scissors size={16} />, href: '/shop?cat=Surgical & Healthcare Essentials' },
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
      {/* Top Bar */}
      <div className="hidden md:flex bg-secondary text-white text-xs py-1.5 px-4 md:px-8 justify-between items-center z-[1001] relative">
        <div className="flex items-center gap-4">
          <a href="mailto:adarshmedicalstores2020@gmail.com" className="flex items-center gap-1.5 hover:text-white/80 transition-colors">
            <Mail size={12} />
            adarshmedicalstores2020@gmail.com
          </a>
          <a href="tel:+919630080706" className="flex items-center gap-1.5 hover:text-white/80 transition-colors">
            <Phone size={12} />
            +91 9630080706
          </a>
        </div>
        <div className="flex items-center gap-4 text-white/90">
          <span>Garhakota Dist Sagar, MP</span>
          <span className="w-1 h-1 rounded-full bg-white/30" />
          <span>GST: 23AZQPP5467M1ZJ</span>
        </div>
      </div>

      <header className={cn(
        "fixed left-0 right-0 z-[1000] transition-all duration-300",
        isScrolled ? "top-0" : "top-0 md:top-[28px]"
      )}>
        <nav className={cn(
          "transition-all duration-300 px-4 md:px-8 bg-gradient-to-r from-teal-50/90 via-emerald-50/95 to-teal-100/90 backdrop-blur-md shadow-sm border-b border-emerald-200/60",
          isScrolled ? "py-2 shadow-md md:py-2" : "py-2 md:py-3"
        )}>
          <div className="relative max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center md:w-full">
              <button className="md:hidden p-2 text-emerald-700 z-20 relative" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:static md:translate-x-0 md:translate-y-0 md:flex-1 flex justify-center md:justify-start z-10 pointer-events-none md:pointer-events-auto">
                <NextLink href="/" className="flex items-center group whitespace-nowrap pointer-events-auto">
                  <div className="w-32 h-12 md:w-48 md:h-16 flex items-center justify-center shrink-0 overflow-hidden relative">
                    <Image src="/logo.png" alt="Aadarsh Medical Logo" fill className="object-contain" priority />
                  </div>
                </NextLink>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-4 lg:gap-6 shrink-0 h-full">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="relative flex items-center h-full cursor-pointer py-2 md:py-4 -my-2 md:-my-4"
                  onMouseEnter={() => link.name === 'Categories' ? handleCategoriesEnter() : undefined}
                  onMouseLeave={() => link.name === 'Categories' ? handleCategoriesLeave() : undefined}
                >
                  <NextLink
                    href={link.href}
                    className={cn(
                      "font-bold transition-all text-sm lg:text-base py-1.5 flex items-center h-full border-b-2 border-transparent hover:scale-105",
                      isActive(link.href) ? "text-emerald-950 border-emerald-900" : "text-emerald-900/90 hover:text-emerald-950"
                    )}
                  >
                    {link.name}
                  </NextLink>
                </div>
              ))}

              <div className="flex items-center gap-3 ml-2">
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-2 text-emerald-900 hover:scale-110 transition-transform"
                >
                  <ShoppingCart size={24} />
                  {totalItems > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-accent text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-md animate-in zoom-in duration-300">
                      {totalItems}
                    </span>
                  )}
                </button>
                <NextLink
                  href="/shop?wishlist=true"
                  className="relative p-2 text-emerald-900 hover:scale-110 transition-transform flex items-center justify-center border-none"
                  title="Wishlist"
                >
                  <Heart size={24} className={cn("transition-all", wishlist.length > 0 ? "fill-emerald-900 text-emerald-900" : "text-emerald-900/90")} />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-secondary text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-md animate-in zoom-in duration-300">
                      {wishlist.length}
                    </span>
                  )}
                </NextLink>
                <div className="flex flex-col gap-1">
                  <Button asChild className="bg-emerald-500 text-white hover:bg-emerald-600 rounded-full px-4 lg:px-6 shadow-xl transition-all font-bold text-sm lg:text-base border-none h-11 shrink-0 flex items-center gap-2">
                    <NextLink href="https://chat.whatsapp.com/Bo64bJcFyE31vlI4G5onFm?mode=hq2tswa" target="_blank">
                      <WhatsAppIcon className="w-5 h-5" /> Join Group
                    </NextLink>
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-center md:hidden gap-3">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-emerald-900"
              >
                <ShoppingCart size={22} />
                {totalItems > 0 && (
                  <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-accent text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-in zoom-in duration-300">
                    {totalItems}
                  </span>
                )}
              </button>
              <NextLink
                href="/shop?wishlist=true"
                className="relative p-2 text-emerald-900 flex items-center justify-center border-none"
                title="Wishlist"
              >
                <Heart size={22} className={cn("transition-all", wishlist.length > 0 ? "fill-emerald-900 text-emerald-900" : "text-emerald-900/90")} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-secondary text-white text-[8px] font-bold rounded-full flex items-center justify-center animate-in zoom-in duration-300">
                    {wishlist.length}
                  </span>
                )}
              </NextLink>
            </div>
          </div>
        </nav>

        {/* Mega Menu Dropdown */}
        {isCategoriesHovered && (
          <div
            className="absolute left-0 right-0 top-full z-[9999] animate-in fade-in slide-in-from-top-2 duration-200 hidden md:block"
            onMouseEnter={handleCategoriesEnter}
            onMouseLeave={handleCategoriesLeave}
          >
            <div className="bg-white shadow-2xl border-t border-emerald-100">
              <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 flex gap-8">
                {/* Left Sidebar for Categories */}
                <div className="w-64 border-r border-muted/20 pr-6 flex flex-col gap-2 shrink-0">
                  <h3 className="font-bold text-xs uppercase tracking-widest text-muted-foreground mb-4 pl-4">Shop By Category</h3>
                  {['Pharma', 'OTC', 'Vet', 'Devices', 'Surgical'].map(key => {
                    const itemIcon = subNavItems.find(i => i.name === key)?.icon;
                    return (
                      <button
                        key={key}
                        onMouseEnter={() => setActiveMegaCategory(key)}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm w-full text-left",
                          activeMegaCategory === key ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted/30 hover:text-primary"
                        )}
                      >
                        {itemIcon} {key}
                      </button>
                    );
                  })}
                </div>
                {/* Right Content */}
                <div className="flex-1">
                  <div className="grid grid-cols-12 gap-8 h-full">
                    {/* Description & CTA */}
                    <div className="col-span-4 border-r border-muted/10 pr-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center [&_svg]:w-6 [&_svg]:h-6">
                          {subNavItems.find(i => i.name === activeMegaCategory)?.icon}
                        </div>
                        <div>
                          <h3 className="font-headline font-bold text-primary text-xl uppercase tracking-wider">{activeMegaCategory}</h3>
                          <div className="h-1 w-12 bg-secondary rounded-full mt-1" />
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                        {megaMenuData[activeMegaCategory]?.description}
                      </p>
                      <NextLink
                        href={subNavItems.find(i => i.name === activeMegaCategory)?.href || '/shop'}
                        onClick={() => setIsCategoriesHovered(false)}
                        className="inline-flex items-center gap-2 bg-primary text-white font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-primary/90 transition-all shadow-md group"
                      >
                        View All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </NextLink>
                    </div>

                    {/* Sub-Categories (Split into 2 columns) */}
                    <div className="col-span-5 grid grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">Categories</h4>
                        <div className="flex flex-col gap-1">
                          {megaMenuData[activeMegaCategory]?.subCategories.slice(0, Math.ceil(megaMenuData[activeMegaCategory].subCategories.length / 2)).map((sub) => (
                            <NextLink
                              key={sub.name}
                              href={sub.href}
                              onClick={() => setIsCategoriesHovered(false)}
                              className="group flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-emerald-50 transition-all"
                            >
                              <ChevronRight size={12} className="text-secondary opacity-0 group-hover:opacity-100 transition-opacity -ml-1" />
                              <span className="text-sm text-primary font-medium group-hover:text-secondary transition-colors">{sub.name}</span>
                            </NextLink>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="h-[21px] mb-4" /> {/* Spacer */}
                        <div className="flex flex-col gap-1">
                          {megaMenuData[activeMegaCategory]?.subCategories.slice(Math.ceil(megaMenuData[activeMegaCategory].subCategories.length / 2)).map((sub) => (
                            <NextLink
                              key={sub.name}
                              href={sub.href}
                              onClick={() => setIsCategoriesHovered(false)}
                              className="group flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-emerald-50 transition-all"
                            >
                              <ChevronRight size={12} className="text-secondary opacity-0 group-hover:opacity-100 transition-opacity -ml-1" />
                              <span className="text-sm text-primary font-medium group-hover:text-secondary transition-colors">{sub.name}</span>
                            </NextLink>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Brands */}
                    <div className="col-span-3 bg-slate-50/50 rounded-2xl p-6 border border-slate-100 flex flex-col">
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">Featured Brands</h4>
                      <div className="flex flex-col gap-2 flex-1">
                        {megaMenuData[activeMegaCategory]?.brands.map((brand) => (
                          <NextLink
                            key={brand}
                            href={`/shop?brand=${encodeURIComponent(brand)}`}
                            onClick={() => setIsCategoriesHovered(false)}
                            className="group flex items-center justify-between py-2 px-3 bg-white rounded-xl border border-muted/20 hover:border-secondary transition-all"
                          >
                            <span className="text-xs font-bold text-primary group-hover:text-secondary transition-colors">{brand}</span>
                            <ArrowRight size={12} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                          </NextLink>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

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
              asChild
              className="w-full gradient-button text-white mt-8 h-14 font-bold rounded-2xl shadow-lg border-none"
            >
              <NextLink href="https://chat.whatsapp.com/Bo64bJcFyE31vlI4G5onFm?mode=hq2tswa" target="_blank" onClick={() => setIsMobileMenuOpen(false)}>WhatsApp Group</NextLink>
            </Button>
            <div className="h-20 shrink-0" />
          </div>
        )}
        <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />
      </header>

      {/* Bottom Navigation for Mobile */}
      <div className="md:hidden fixed bottom-2 left-6 right-6 z-[102] medical-gradient-dark rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.3)] border border-white/10 p-3 flex justify-around items-center">
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
        <button onClick={() => setIsCartOpen(true)} className="relative flex flex-col items-center gap-1 text-white/60 focus:outline-none">
          <ShoppingCart size={20} />
          <span className="text-[10px] font-bold">Cart</span>
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-accent text-white text-[8px] font-bold rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
        <button
          onClick={() => setIsAiAssistantOpen(true)}
          className="flex flex-col items-center gap-1 text-white/60 hover:text-white"
        >
          <WhatsAppIcon className="w-5 h-5" />
          <span className="text-[10px] font-bold">WhatsApp</span>
        </button>
      </div>
      <AiAssistant externalOpen={isAiAssistantOpen} onClose={() => setIsAiAssistantOpen(false)} />
    </>
  );
}
