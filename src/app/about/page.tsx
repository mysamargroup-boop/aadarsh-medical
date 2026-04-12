import React from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About Us | Adarsh Medical Store - Abhishek Kumar Patel',
  description: 'Learn about Abhishek Kumar Patel, Owner of Adarsh Medical Stores and Secretary of Aushadhi Vikreta Sangh, Garhakota. 25+ years of pharmaceutical industry experience with M.Pharm qualification.',
  keywords: ['Abhishek Kumar Patel', 'Adarsh Medical Store', 'pharmacist Garhakota', 'M.Pharm', 'Aushadhi Vikreta Sangh', 'pharmacy Sagar MP'],
  alternates: {
    canonical: 'https://ad2025.in/about/',
  },
  openGraph: {
    title: 'About Us | Adarsh Medical Store',
    description: 'Abhishek Kumar Patel - 25+ years of pharmaceutical excellence. M.Pharm qualified, trusted pharma professional in Garhakota, Sagar MP.',
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <AboutClient />
      <Footer />
    </main>
  );
}
