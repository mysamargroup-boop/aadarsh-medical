"use client"

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { allProducts, getProductUrl } from '@/lib/product-data';
import { Search, X, ExternalLink, ChevronDown, ChevronUp, Building2, Package, Pill, Info } from 'lucide-react';

// Map company names to their logo files in /images/partners/
const companyLogos: Record<string, string> = {
  "Aristo": "/images/partners/converted-aristo.webp",
  "Dr. Reddy's": "/images/partners/converted-dr-reddy.webp",
  "Macleods": "/images/partners/converted-macleods.webp",
  "Mankind": "/images/partners/converted-mankind.webp",
  "Medigrip": "/images/partners/converted-medigrip.webp",
  "Torrent Pharma": "/images/partners/converted-torrent-pharma.webp",
  "Troikaa": "/images/partners/converted-troikaa.webp",
};

export default function ProductsListClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [expandedCompanies, setExpandedCompanies] = useState<Set<string>>(new Set());
  const [activeCompanyFilter, setActiveCompanyFilter] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Group products by company
  const productsByCompany = useMemo(() => {
    const grouped: Record<string, any[]> = {};
    allProducts.forEach(p => {
      if (!grouped[p.company]) {
        grouped[p.company] = [];
      }
      grouped[p.company].push(p);
    });
    // Sort products within each company alphabetically
    Object.keys(grouped).forEach(company => {
      grouped[company].sort((a, b) => a.name.localeCompare(b.name));
    });
    return grouped;
  }, []);

  // Get sorted company names
  const companyNames = useMemo(() => {
    return Object.keys(productsByCompany).sort();
  }, [productsByCompany]);

  // Filter based on search query and company filter
  const filteredByCompany = useMemo(() => {
    const filtered: Record<string, any[]> = {};
    const lowerQuery = searchQuery.toLowerCase().trim();

    const companiesToShow = activeCompanyFilter ? [activeCompanyFilter] : companyNames;

    companiesToShow.forEach(company => {
      if (!productsByCompany[company]) return;
      const products = productsByCompany[company].filter(p =>
        lowerQuery ? p.name.toLowerCase().includes(lowerQuery) : true
      );
      if (products.length > 0) {
        filtered[company] = products;
      }
    });

    return filtered;
  }, [productsByCompany, searchQuery, activeCompanyFilter, companyNames]);

  const filteredCompanyNames = useMemo(() => {
    return Object.keys(filteredByCompany).sort();
  }, [filteredByCompany]);

  // Total filtered count
  const totalFiltered = useMemo(() => {
    return Object.values(filteredByCompany).reduce((sum, list) => sum + list.length, 0);
  }, [filteredByCompany]);

  // Toggle company expand/collapse
  const toggleCompany = (company: string) => {
    setExpandedCompanies(prev => {
      const next = new Set(prev);
      if (next.has(company)) {
        next.delete(company);
      } else {
        next.add(company);
      }
      return next;
    });
  };

  // Expand all by default for filtered results or single company filter
  useEffect(() => {
    if (searchQuery || activeCompanyFilter) {
      setExpandedCompanies(new Set(filteredCompanyNames));
    } else {
      setExpandedCompanies(new Set());
    }
  }, [searchQuery, activeCompanyFilter, filteredCompanyNames]);

  // Click outside to close modal
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setSelectedProduct(null);
      }
    };
    if (selectedProduct) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [selectedProduct]);

  // ESC to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProduct(null);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="pt-24 md:pt-36 pb-20">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 mb-10">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-secondary/20 mb-4">
            <Package size={14} /> Product Catalogue
          </span>
          <h1 className="font-headline font-bold text-3xl md:text-4xl text-primary leading-tight">
            Our Complete Product List
          </h1>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
            Browse all products from our partner pharmaceutical companies. Click on any product to place your order.
          </p>
        </div>

        {/* Search + Filter Bar */}
        <div className="max-w-2xl mx-auto">
          <div className="relative mb-4">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products by name..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-3.5 rounded-2xl border border-border bg-white text-sm font-medium text-primary placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary shadow-sm transition-all"
              id="product-search"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Company Filter Pills */}
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setActiveCompanyFilter(null)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                !activeCompanyFilter
                  ? 'bg-primary text-white border-primary shadow-md'
                  : 'bg-white text-muted-foreground border-border hover:border-secondary hover:text-secondary'
              }`}
            >
              All Companies
            </button>
            {companyNames.map(company => (
              <button
                key={company}
                onClick={() => setActiveCompanyFilter(activeCompanyFilter === company ? null : company)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                  activeCompanyFilter === company
                    ? 'bg-secondary text-white border-secondary shadow-md'
                    : 'bg-white text-muted-foreground border-border hover:border-secondary hover:text-secondary'
                }`}
              >
                {company}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="text-center mt-6">
          <span className="text-sm text-muted-foreground">
            Showing <strong className="text-primary">{totalFiltered}</strong> products from{' '}
            <strong className="text-primary">{filteredCompanyNames.length}</strong> companies
          </span>
        </div>
      </section>

      {/* Product List by Company */}
      <section className="max-w-6xl mx-auto px-4 md:px-8">
        {filteredCompanyNames.length === 0 ? (
          <div className="text-center py-20">
            <Pill size={48} className="mx-auto text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground text-lg font-medium">No products found</p>
            <p className="text-muted-foreground/60 text-sm mt-1">Try adjusting your search or filter</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCompanyNames.map(company => {
              const products = filteredByCompany[company];
              const isExpanded = expandedCompanies.has(company);
              const logoSrc = companyLogos[company];

              return (
                <div
                  key={company}
                  className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  {/* Company Header */}
                  <button
                    onClick={() => toggleCompany(company)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left group"
                    id={`company-${company.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Company Logo or Fallback Icon */}
                      {logoSrc ? (
                        <div className="w-14 h-11 rounded-xl bg-white border border-muted/50 flex items-center justify-center overflow-hidden shrink-0 p-1.5">
                          <Image
                            src={logoSrc}
                            alt={`${company} logo`}
                            width={48}
                            height={36}
                            className="object-contain w-full h-full"
                          />
                        </div>
                      ) : (
                        <div className="w-11 h-11 rounded-xl gradient-button flex items-center justify-center text-white shrink-0">
                          <Building2 size={20} />
                        </div>
                      )}
                      <div>
                        <h2 className="font-headline font-bold text-primary text-lg group-hover:text-secondary transition-colors">
                          {company}
                        </h2>
                        <p className="text-xs text-muted-foreground">
                          {products.length} product{products.length > 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                    <div className="text-muted-foreground group-hover:text-secondary transition-colors">
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </button>

                  {/* Product List */}
                  {isExpanded && (
                    <div className="border-t border-border/50">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border/30">
                        {products.map((product, idx) => {
                          const productUrl = getProductUrl(product as any);
                          return (
                            <div
                              key={`${product.company}-${product.name}-${idx}`}
                              className="bg-white group/item relative flex items-center gap-3 border-b border-r border-border/10 last:border-b-0"
                            >
                              <button
                                onClick={() => setSelectedProduct(product)}
                                className="flex-1 px-5 py-3.5 text-left hover:bg-emerald-50/50 transition-all flex items-center gap-3"
                                id={`product-${product.name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`}
                              >
                                <div className="w-2 h-2 rounded-full bg-secondary/40 group-hover/item:bg-secondary shrink-0 transition-colors" />
                                <span className="text-sm font-medium text-primary group-hover/item:text-secondary transition-colors truncate">
                                  {product.name}
                                </span>
                              </button>
                              
                              <Link 
                                href={productUrl}
                                className="p-2 mr-2 text-muted-foreground hover:text-secondary opacity-0 group-hover/item:opacity-100 transition-all"
                                title="View Product Details"
                              >
                                <Info size={16} />
                              </Link>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Order Modal/Popup */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            ref={modalRef}
            className="bg-white rounded-3xl shadow-2xl border border-border max-w-md w-full p-8 relative animate-in zoom-in-95 duration-300"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-muted/50 hover:bg-muted text-muted-foreground hover:text-primary transition-all"
            >
              <X size={18} />
            </button>

            {/* Content */}
            <div className="text-center">
              {/* Show company logo in popup too */}
              {companyLogos[selectedProduct.company] ? (
                <div className="w-16 h-16 rounded-2xl bg-white border border-muted/50 flex items-center justify-center mx-auto mb-5 p-2">
                  <Image
                    src={companyLogos[selectedProduct.company]}
                    alt={`${selectedProduct.company} logo`}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 gradient-button rounded-2xl flex items-center justify-center text-white mx-auto mb-5">
                  <Pill size={28} />
                </div>
              )}

              <h3 className="font-headline font-bold text-xl text-primary mb-1">
                {selectedProduct.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                by <strong>{selectedProduct.company}</strong>
              </p>

              <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-6" />

              <p className="text-muted-foreground text-sm mb-6">
                To place an order for this product, click the button below to visit our ordering portal.
              </p>

              <div className="flex flex-col gap-3">
                <a
                  href="https://davabazar24.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full gradient-button text-white font-bold text-base py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all"
                >
                  <ExternalLink size={18} />
                  For Order Click Here
                </a>

                <Link
                  href={getProductUrl(selectedProduct as any)}
                  className="inline-flex items-center justify-center gap-2 w-full bg-muted/50 text-primary font-bold text-sm py-3 rounded-2xl hover:bg-muted transition-all border border-border"
                >
                  <Info size={16} />
                  View Full Technical Details
                </Link>
              </div>

              <button
                onClick={() => setSelectedProduct(null)}
                className="mt-3 text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
