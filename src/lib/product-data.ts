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
  molecules?: string;
  material?: string;
  composition?: string;
  sizes?: string;
  packing: string;
  format: 'Tablets' | 'Suspension' | 'Injection' | 'Cream' | 'Ointment' | 'Powder' | 'Shampoo' | 'Soap' | 'Syrup' | 'Sachet' | 'Liquid' | 'Capsule' | 'Gel' | 'Spray' | 'Test Kit' | 'Lozenges' | 'Drops' | 'Dry Syrup' | 'Aid' | 'Support' | 'Belt' | 'Brace' | 'Other';
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
import { aristoProducts } from '@/data/products/aristo';
import { mankindProducts } from '@/data/products/mankind';
import { orthopaedicsProducts } from '@/data/products/orthopaedics';
import { troikaaProducts } from '@/data/products/troikaa';
import { medigripProducts } from '@/data/products/medigrip';
import { torrentProducts } from '@/data/products/torrent';
import { laborateProducts } from '@/data/products/laborate';

// Combine all products from data files
export const allProducts: Product[] = [
  ...drReddyProducts,
  ...macleodsProducts,
  ...aristoProducts,
  ...mankindProducts,
  ...orthopaedicsProducts,
  ...troikaaProducts,
  ...medigripProducts,
  ...torrentProducts,
  ...laborateProducts
];

// Helper to get products by brand
export const getProductsByBrand = (brandName: string) => {
  return allProducts.filter(p => p.company === brandName);
};

export const brands = ["Dr. Reddy's", "WellcomeVet Pharma", "Dr. Best", "Macleods", "Aristo", "Mankind", "Orthopaedics", "Medigrip", "Torrent Pharma", "Troikaa", "Laborate"];

/**
 * Helper to generate SEO friendly URLs
 */
export function getProductUrl(product: Product) {
  if (!product || !product.cat || !product.name) {
    return '/products/';
  }

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

  return `/collections/${catSlug}/${subCatSlug}/${productSlug}-${product.id}/`;
}

/**
 * Helper to generate SEO-friendly category slug
 */
export function getCategorySlug(category: string): string {
  return category.toLowerCase()
    .replace(/ & /g, '-')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

/**
 * Helper to get clean category URL
 */
export function getCategoryUrl(category: string): string {
  return `/shop/${getCategorySlug(category)}/`;
}

/**
 * Helper to find category by slug (reverse lookup)
 */
export function getCategoryBySlug(slug: string): string | undefined {
  const allCats = Array.from(new Set(allProducts.map(p => p.cat)));
  return allCats.find(cat => getCategorySlug(cat) === slug);
}

// Consolidate all products into a single exported list
export const products: Product[] = [
  ...allProducts,
  // Future companies will be added here
];
