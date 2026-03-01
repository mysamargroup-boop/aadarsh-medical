import React from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { PromoBanner } from '@/components/PromoBanner';
import { LogoSlider } from '@/components/LogoSlider';
import { Categories } from '@/components/Categories';
import { HealthConcerns } from '@/components/HealthConcerns';
import { ProductCatalog } from '@/components/ProductCatalog';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { CompanySection } from '@/components/CompanySection';
import { ConcernProducts } from '@/components/ConcernProducts';
import { LegalSection } from '@/components/LegalSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { AiAssistant } from '@/components/AiAssistant';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />

      <Hero />

      <PromoBanner />

      <LogoSlider />

      <HealthConcerns />

      <ConcernProducts />

      <CompanySection />

      <Categories />

      <WhyChooseUs />

      <ProductCatalog />

      <LegalSection />

      <ContactSection />

      <Footer />

    </main>
  );
}
