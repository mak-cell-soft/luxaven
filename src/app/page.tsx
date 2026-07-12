import React from 'react';
import { Navbar } from '@/components/shared/navbar';
import { HeroSection } from '@/components/sections/hero-section';
import { PhilosophySection } from '@/components/sections/philosophy-section';
import { CollectionSection } from '@/components/sections/collection-section';
import { FeaturedSection } from '@/components/sections/featured-section';
import { ProcessSection } from '@/components/sections/process-section';
import { ContactSection } from '@/components/sections/contact-section';
import { Footer } from '@/components/shared/footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        <HeroSection />
        <PhilosophySection />
        <CollectionSection />
        <FeaturedSection />
        <ProcessSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
