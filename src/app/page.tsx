import React from 'react';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { PromoBanner } from '@/components/PromoBanner';
import { LogoSlider } from '@/components/LogoSlider';
import { Categories } from '@/components/Categories';
import { ProductCatalog } from '@/components/ProductCatalog';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { LegalSection } from '@/components/LegalSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { AiAssistant } from '@/components/AiAssistant';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      
      <Hero />
      
      <PromoBanner />
      
      <LogoSlider />
      
      <Categories />
      
      <WhyChooseUs />
      
      <ProductCatalog />
      
      <LegalSection />
      
      <ContactSection />
      
      <Footer />
      
      {/* AI Assistant Tool */}
      <AiAssistant />
    </main>
  );
}