import React from 'react';
import { notFound } from 'next/navigation';
import { isLocale } from '@/lib/i18n/locale';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { Navbar } from '@/components/shared/navbar';
import { HeroSection } from '@/components/sections/hero-section';
import { PhilosophySection } from '@/components/sections/philosophy-section';
import { CollectionSection } from '@/components/sections/collection-section';
import { FeaturedSection } from '@/components/sections/featured-section';
import { ProcessSection } from '@/components/sections/process-section';
import { ContactSection } from '@/components/sections/contact-section';
import { Footer } from '@/components/shared/footer';

interface LocalePageProps {
  params: Promise<{ locale: string }>;
}

export default async function LocaleHomePage({ params }: LocalePageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dict = await getDictionary(locale);

  return (
    <>
      <Navbar locale={locale} dict={dict.navigation} />
      <main className="overflow-hidden flex-grow">
        <HeroSection locale={locale} dict={dict.hero} />
        <PhilosophySection locale={locale} dict={dict.philosophy} />
        <CollectionSection locale={locale} dict={dict.collection} />
        <FeaturedSection locale={locale} dict={dict.featured} />
        <ProcessSection locale={locale} dict={dict.process} />
        <ContactSection locale={locale} dict={dict.contact} />
      </main>
      <Footer locale={locale} dict={dict.footer} />
    </>
  );
}
