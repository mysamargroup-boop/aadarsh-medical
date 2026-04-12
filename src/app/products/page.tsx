import React from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import ProductsListClient from './ProductsListClient';

export const metadata: Metadata = {
  title: 'Product List | Adarsh Medical Store - All Medicines & Products',
  description: 'Browse the complete product list of Adarsh Medical Store. 2500+ products from leading pharmaceutical companies including Dr. Reddy\'s, Macleods, Aristo, Mankind, Torrent Pharma and more.',
  keywords: ['medicine list', 'pharmaceutical products', 'Adarsh Medical products', 'Dr Reddys products', 'Mankind medicines', 'Macleods products', 'pharmacy Garhakota'],
  alternates: {
    canonical: 'https://ad2025.in/products/',
  },
  openGraph: {
    title: 'Product List | Adarsh Medical Store',
    description: 'Browse our complete range of medicines, surgical equipment, and healthcare products from 29+ leading pharmaceutical companies.',
  },
};

export default function ProductsPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <ProductsListClient />
      <Footer />
    </main>
  );
}
