export type PrimaryCategory =
  | 'Prescription Medicines'
  | 'OTC'
  | 'Vitamins & Supplements'
  | 'Ayurvedic & Herbal'
  | 'Medical Devices & Equipments'
  | 'Personal Care & Wellness';

export interface Product {
  id: string;
  name: string;
  company: string;
  price: number;
  img: string;
  rx: boolean;
  molecules: string;
  packing: string;
  format: 'Tablets' | 'Suspension' | 'Injection' | 'Cream' | 'Ointment' | 'Powder' | 'Shampoo' | 'Soap' | 'Syrup' | 'Sachet' | 'Liquid' | 'Capsule' | 'Gel' | 'Spray' | 'Test Kit' | 'Lozenges' | 'Other';
  description: string;
  usage?: string;
  type?: 'Popular' | 'Focus';
  benefits?: string;
  sideEffects?: string;
  storage?: string;

  // New Categorization
  cat: string; // Legacy field for compatibility
  subCat?: string; // Legacy field for compatibility
  primaryCategory?: string;
  healthConditions?: string[];
  targetAudience?: string[];
}

import { drReddyProducts } from '@/data/products/dr-reddy';
import { macleodsProducts } from '@/data/products/macleods';

// Combine all products from data files
export const allProducts: Product[] = [
  ...drReddyProducts,
  ...macleodsProducts
];

// Helper to get products by brand
export const getProductsByBrand = (brandName: string) => {
  return allProducts.filter(p => p.company === brandName);
};

export const brands = ["Dr. Reddy's", "WellcomeVet Pharma", "Dr. Best", "Macleods"];

/**
 * Helper to generate SEO friendly URLs
 */
export function getProductUrl(product: Product) {
  const catSlug = product.cat.toLowerCase()
    .replace(/ & /g, '-')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

  const subCatSlug = (product.subCat || 'general').toLowerCase()
    .replace(/ & /g, '-')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

  const productSlug = product.name.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

  return `/collections/${catSlug}/${subCatSlug}/${productSlug}-${product.id}`;
}

// Consolidate all products into a single exported list
export const products: Product[] = [
  ...allProducts,
  // Future companies will be added here
];
