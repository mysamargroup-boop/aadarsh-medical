"use client"

import React from 'react';
import { SlidersHorizontal, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from '@/lib/utils';

interface ShopFiltersProps {
  selectedCats: string[];
  toggleCategory: (cat: string) => void;
  rxRequired: boolean | null;
  setRxRequired: (val: boolean | null) => void;
  clearFilters: () => void;
}

export function ShopFilters({ selectedCats, toggleCategory, rxRequired, setRxRequired, clearFilters }: ShopFiltersProps) {
  const categories = [
    { label: "Antibiotics", id: "Antibiotics" },
    { label: "Antipyretic", id: "Antipyretic" },
    { label: "Cardiac", id: "Cardiac" },
    { label: "Analgesic", id: "Analgesic" },
    { label: "Supplements", id: "Supplements" },
    { label: "Surgical", id: "Surgical" },
    { label: "Medical Device", id: "Medical Device" },
    { label: "Pain Relief", id: "Pain Relief" },
    { label: "Antiseptic", id: "Antiseptic" },
    { label: "Digestive", id: "Digestive" },
    { label: "Cold & Cough", id: "Cold & Cough" },
  ];

  return (
    <div className="bg-white rounded-[1.5rem] border border-muted/30 shadow-sm overflow-hidden h-full">
      <div className="p-5 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={18} className="text-secondary" />
          <span className="font-headline font-bold text-primary">Filters</span>
        </div>
        <Button 
          variant="link" 
          onClick={clearFilters}
          className="text-xs font-bold text-secondary p-0 h-auto hover:text-primary transition-colors"
        >
          Reset All
        </Button>
      </div>

      <div className="p-5 space-y-8 no-scrollbar">
        {/* Prescription Status */}
        <div className="space-y-4">
          <h3 className="font-bold text-primary text-sm uppercase tracking-wider text-[11px]">Prescription Needed?</h3>
          <div className="space-y-3">
            <div 
              className="flex items-center space-x-3 group cursor-pointer"
              onClick={() => setRxRequired(rxRequired === true ? null : true)}
            >
              <div className={cn(
                "w-4 h-4 rounded border flex items-center justify-center transition-all",
                rxRequired === true ? "bg-secondary border-secondary" : "border-muted-foreground/30"
              )}>
                {rxRequired === true && <Check size={12} className="text-white" />}
              </div>
              <Label className="text-sm text-muted-foreground group-hover:text-primary transition-colors cursor-pointer">
                Yes (Prescription Required)
              </Label>
            </div>
            
            <div 
              className="flex items-center space-x-3 group cursor-pointer"
              onClick={() => setRxRequired(rxRequired === false ? null : false)}
            >
              <div className={cn(
                "w-4 h-4 rounded border flex items-center justify-center transition-all",
                rxRequired === false ? "bg-secondary border-secondary" : "border-muted-foreground/30"
              )}>
                {rxRequired === false && <Check size={12} className="text-white" />}
              </div>
              <Label className="text-sm text-muted-foreground group-hover:text-primary transition-colors cursor-pointer">
                No (OTC Products)
              </Label>
            </div>
          </div>
        </div>

        <Accordion type="multiple" defaultValue={["Category"]} className="w-full">
          <AccordionItem value="Category" className="border-none">
            <AccordionTrigger className="hover:no-underline py-3 text-primary font-bold text-sm uppercase tracking-wider text-[11px]">
              Filter by Category
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
                      selectedCats.includes(cat.id) ? "bg-secondary border-secondary" : "border-muted-foreground/30"
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
          
          <AccordionItem value="Availability" className="border-none">
            <AccordionTrigger className="hover:no-underline py-3 text-primary font-bold text-sm uppercase tracking-wider text-[11px]">
              Availability
            </AccordionTrigger>
            <AccordionContent className="space-y-3 pt-1">
              <div className="flex items-center space-x-3">
                <Checkbox id="in-stock" defaultChecked className="border-muted-foreground/30 data-[state=checked]:bg-secondary" />
                <Label htmlFor="in-stock" className="text-sm text-muted-foreground">In Stock Only</Label>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
