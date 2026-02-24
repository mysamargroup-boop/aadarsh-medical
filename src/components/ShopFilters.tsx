"use client"

import React from 'react';
import { SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FilterSectionProps {
  title: string;
  items: { label: string; count?: number; id: string }[];
}

const FilterSection = ({ title, items }: FilterSectionProps) => (
  <AccordionItem value={title} className="border-none">
    <AccordionTrigger className="hover:no-underline py-3 text-primary font-bold text-sm">
      {title}
    </AccordionTrigger>
    <AccordionContent className="space-y-3 pt-1">
      {items.map((item) => (
        <div key={item.id} className="flex items-center justify-between group cursor-pointer">
          <div className="flex items-center space-x-3">
            <Checkbox id={item.id} className="border-muted-foreground/30 data-[state=checked]:bg-secondary data-[state=checked]:border-secondary" />
            <Label htmlFor={item.id} className="text-sm text-muted-foreground group-hover:text-primary transition-colors cursor-pointer">
              {item.label}
            </Label>
          </div>
          {item.count !== undefined && (
            <span className="text-[10px] text-muted-foreground/60 font-medium">({item.count})</span>
          )}
        </div>
      ))}
    </AccordionContent>
  </AccordionItem>
);

export function ShopFilters() {
  return (
    <div className="bg-white rounded-[1.5rem] border border-muted/30 shadow-sm overflow-hidden sticky top-32">
      <div className="p-5 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={18} className="text-secondary" />
          <span className="font-headline font-bold text-primary">Filters</span>
        </div>
        <Button variant="link" className="text-xs font-bold text-secondary p-0 h-auto">
          Clear All
        </Button>
      </div>

      <div className="p-5 space-y-6">
        {/* Prescription Status */}
        <div className="space-y-4">
          <h3 className="font-bold text-primary text-sm">Prescription Status</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Checkbox id="rx-required" className="border-muted-foreground/30 data-[state=checked]:bg-secondary" />
              <Label htmlFor="rx-required" className="text-sm text-muted-foreground cursor-pointer">Prescription Required</Label>
            </div>
            <div className="flex items-center space-x-3">
              <Checkbox id="rx-not-required" defaultChecked className="border-muted-foreground/30 data-[state=checked]:bg-secondary" />
              <Label htmlFor="rx-not-required" className="text-sm text-muted-foreground cursor-pointer">Rx Not Required (OTC)</Label>
            </div>
          </div>
        </div>

        <Accordion type="multiple" defaultValue={["Product Category"]} className="w-full">
          <FilterSection 
            title="Product Category" 
            items={[
              { label: "Analgesics", count: 124, id: "cat-1" },
              { label: "Anti-inflammatory", count: 86, id: "cat-2" },
              { label: "Muscle Relaxants", count: 42, id: "cat-3" },
              { label: "Topical Gels", count: 55, id: "cat-4" },
            ]} 
          />
          <FilterSection 
            title="Brand / Manufacturer" 
            items={[
              { label: "GSK", id: "brand-1" },
              { label: "Cipla", id: "brand-2" },
              { label: "Abbott", id: "brand-3" },
              { label: "Sun Pharma", id: "brand-4" },
            ]} 
          />
          <FilterSection 
            title="Dosage Form" 
            items={[
              { label: "Tablets", id: "form-1" },
              { label: "Capsules", id: "form-2" },
              { label: "Syrups", id: "form-3" },
              { label: "Injections", id: "form-4" },
            ]} 
          />
          <FilterSection 
            title="Age Group" 
            items={[
              { label: "Adults", id: "age-1" },
              { label: "Children", id: "age-2" },
              { label: "Infants", id: "age-3" },
              { label: "Elderly", id: "age-4" },
            ]} 
          />
          <FilterSection 
            title="Health Concern" 
            items={[
              { label: "Diabetes", id: "hc-1" },
              { label: "Heart Care", id: "hc-2" },
              { label: "Fever", id: "hc-3" },
              { label: "Pain Relief", id: "hc-4" },
            ]} 
          />
        </Accordion>
      </div>
    </div>
  );
}
