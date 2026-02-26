'use client'

import React from 'react';
import { SlidersHorizontal, Check, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { cn } from '@/lib/utils';

interface ShopFiltersProps {
  selectedCats: string[];
  toggleCategory: (cat: string) => void;
  selectedBrands: string[];
  toggleBrand: (brand: string) => void;
  rxRequired: boolean | null;
  setRxRequired: (val: boolean | null) => void;
  clearFilters: () => void;
}

export function ShopFilters({ 
  selectedCats, 
  toggleCategory, 
  selectedBrands,
  toggleBrand,
  rxRequired, 
  setRxRequired, 
  clearFilters 
}: ShopFiltersProps) {
  const categories = [
    { label: "Pharmaceuticals", id: "Pharmaceuticals" },
    { label: "OTC & Healthcare", id: "OTC & Healthcare" },
    { label: "Veterinary Medicines", id: "Veterinary Medicines" },
    { label: "Medical Devices & Equipment", id: "Medical Devices & Equipment" },
    { label: "Surgical & Healthcare Essentials", id: "Surgical & Healthcare Essentials" },
  ];

  const brands = [
    "Dr. Reddy's", "Glaxo Smith Kline", "Wellcome Vet", "Tineta Pharma", "Sushima Pharmaceuticals", "Cipla", "Omron", "Rajvaidya", "Dr. Trust"
  ];

  const dosageForms = [
    "Tablets", "Capsules", "Syrups", "Injections", "Ointments", "Devices"
  ];

  return (
    <div className="bg-white rounded-[2rem] border border-muted/30 shadow-sm overflow-hidden flex flex-col h-full max-h-[85vh] md:max-h-[calc(100vh-10rem)]">
      <div className="p-6 border-b flex items-center justify-between bg-white/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={18} className="text-secondary" />
          <span className="font-headline font-bold text-primary">Refine Search</span>
        </div>
        <Button 
          variant="link" 
          onClick={clearFilters}
          className="text-xs font-bold text-secondary p-0 h-auto hover:text-primary transition-colors"
        >
          Reset
        </Button>
      </div>

      <div className="p-6 flex-1 overflow-y-auto no-scrollbar space-y-8">
        <div className="space-y-4">
          <h3 className="font-bold text-primary text-[10px] uppercase tracking-[0.2em]">Stock Availability</h3>
          <div className="flex items-center space-x-3 group cursor-pointer">
            <Checkbox id="in-stock-filter" defaultChecked className="border-muted-foreground/30 data-[state=checked]:bg-secondary" />
            <Label htmlFor="in-stock-filter" className="text-sm text-muted-foreground cursor-pointer group-hover:text-primary transition-colors">In Stock Only</Label>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-primary text-[10px] uppercase tracking-[0.2em]">Prescription</h3>
          <div className="grid grid-cols-1 gap-3">
            <button 
              onClick={() => setRxRequired(true)}
              className={cn(
                "flex items-center justify-between p-3 rounded-xl border text-xs font-bold transition-all",
                rxRequired === true ? "bg-destructive/5 border-destructive text-destructive" : "bg-muted/10 border-transparent text-muted-foreground"
              )}
            >
              Prescription Required {rxRequired === true && <Check size={14} />}
            </button>
            <button 
              onClick={() => setRxRequired(false)}
              className={cn(
                "flex items-center justify-between p-3 rounded-xl border text-xs font-bold transition-all",
                rxRequired === false ? "bg-secondary/5 border-secondary text-secondary" : "bg-muted/10 border-transparent text-muted-foreground"
              )}
            >
              OTC / Non-Rx {rxRequired === false && <Check size={14} />}
            </button>
          </div>
        </div>

        <Accordion type="multiple" defaultValue={["Category", "Brand"]} className="w-full">
          <AccordionItem value="Category" className="border-muted/30">
            <AccordionTrigger className="hover:no-underline py-4 text-primary font-bold text-[10px] uppercase tracking-[0.2em]">
              Product Segments
            </AccordionTrigger>
            <AccordionContent className="space-y-3 pt-1">
              {categories.map((cat) => (
                <div 
                  key={cat.id} 
                  className="flex items-center justify-between group cursor-pointer"
                  onClick={() => toggleCategory(cat.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={cn(
                      "w-4 h-4 rounded border flex items-center justify-center transition-all",
                      selectedCats.includes(cat.id) ? "bg-secondary border-secondary shadow-sm shadow-secondary/20" : "border-muted-foreground/30 bg-card"
                    )}>
                      {selectedCats.includes(cat.id) && <Check size={12} className="text-white" />}
                    </div>
                    <Label className={cn(
                      "text-sm transition-colors cursor-pointer",
                      selectedCats.includes(cat.id) ? "text-primary font-bold" : "text-muted-foreground group-hover:text-primary"
                    )}>
                      {cat.label}
                    </Label>
                  </div>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="Brand" className="border-muted/30">
            <AccordionTrigger className="hover:no-underline py-4 text-primary font-bold text-[10px] uppercase tracking-[0.2em]">
              Pharma Partners
            </AccordionTrigger>
            <AccordionContent className="space-y-3 pt-1">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-3 h-3" />
                <input type="text" placeholder="Search brands..." className="w-full pl-8 pr-3 py-2 bg-muted/20 border-none rounded-lg text-xs outline-none" />
              </div>
              <div className="max-h-48 overflow-y-auto no-scrollbar space-y-3">
                {brands.map((brand) => (
                  <div key={brand} className="flex items-center space-x-3 group cursor-pointer" onClick={() => toggleBrand(brand)}>
                    <Checkbox 
                      id={`brand-${brand}`}
                      checked={selectedBrands.includes(brand)}
                      className="border-muted-foreground/30" 
                    />
                    <Label 
                      htmlFor={`brand-${brand}`} 
                      className={cn(
                        "text-sm transition-colors cursor-pointer",
                        selectedBrands.includes(brand) ? "text-primary font-bold" : "text-muted-foreground group-hover:text-primary"
                      )}
                    >
                      {brand}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="Dosage" className="border-muted/30">
            <AccordionTrigger className="hover:no-underline py-4 text-primary font-bold text-[10px] uppercase tracking-[0.2em]">
              Dosage Form
            </AccordionTrigger>
            <AccordionContent className="grid grid-cols-2 gap-2 pt-1">
              {dosageForms.map((form) => (
                <button key={form} className="px-3 py-2 rounded-lg bg-muted/20 text-[10px] font-bold text-muted-foreground hover:bg-secondary/10 hover:text-secondary border border-transparent transition-all">
                  {form}
                </button>
              ))}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="Price" className="border-none">
            <AccordionTrigger className="hover:no-underline py-4 text-primary font-bold text-[10px] uppercase tracking-[0.2em]">
              Wholesale Price
            </AccordionTrigger>
            <AccordionContent className="space-y-6 pt-4 px-1">
              <Slider defaultValue={[1000]} max={5000} step={100} className="text-secondary" />
              <div className="flex items-center justify-between text-[11px] font-bold text-muted-foreground">
                <span>Min: ₹0</span>
                <span>Max: ₹5000</span>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      
      <div className="p-6 border-t lg:hidden bg-muted/10">
        <Button className="w-full h-12 gradient-button text-white rounded-xl font-bold shadow-lg shadow-secondary/20">
          Apply Filters <Check size={18} className="ml-2" />
        </Button>
      </div>
    </div>
  );
}
