import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale } from '@/lib/i18n/locale';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { Navbar } from '@/components/shared/navbar';
import { ProcessSection } from '@/components/sections/process-section';
import { PhilosophySection } from '@/components/sections/philosophy-section';
import { Footer } from '@/components/shared/footer';

interface AtelierPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: AtelierPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const dict = await getDictionary(locale);
  return generatePageMetadata({
    locale,
    path: '/atelier',
    title: dict.atelier.title,
    description: dict.atelier.description,
  });
}

export default async function AtelierPage({ params }: AtelierPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dict = await getDictionary(locale);

  return (
    <>
      <Navbar locale={locale} dict={dict.navigation} />
      <main className="pt-24 flex-grow bg-[#F7F5F3]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-12 border-b border-[#E8E4E0]">
          <span className="eyebrow text-[#C0784A] mb-4 block text-[11px] font-medium tracking-[0.2em] uppercase">
            {dict.atelier.eyebrow} — LUXAVÉN
          </span>
          <h1 className="text-4xl md:text-6xl font-display text-[#3B2F2F] tracking-tight mb-6">
            {dict.atelier.title}
          </h1>
          <p className="font-body text-base text-[#3B2F2F]/75 max-w-2xl font-light leading-relaxed">
            {dict.atelier.subtitle}
          </p>
        </div>

        <PhilosophySection locale={locale} dict={dict.philosophy} />
        <ProcessSection locale={locale} dict={dict.process} />

        {/* Studio pillars */}
        <section className="py-24 bg-[#5C3D2E] text-[#F7F5F3]">
          <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <span className="block font-display text-2xl mb-4 text-[#C0784A]">
                {dict.atelier.craftsmanshipTitle}
              </span>
              <p className="font-body text-xs leading-relaxed text-[#F7F5F3]/80 font-light">
                {dict.atelier.craftsmanshipDesc}
              </p>
            </div>
            <div>
              <span className="block font-display text-2xl mb-4 text-[#C0784A]">
                {dict.atelier.materialsTitle}
              </span>
              <p className="font-body text-xs leading-relaxed text-[#F7F5F3]/80 font-light">
                {dict.atelier.materialsDesc}
              </p>
            </div>
            <div>
              <span className="block font-display text-2xl mb-4 text-[#C0784A]">
                {dict.atelier.provenanceTitle}
              </span>
              <p className="font-body text-xs leading-relaxed text-[#F7F5F3]/80 font-light">
                {dict.atelier.provenanceDesc}
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} dict={dict.footer} />
    </>
  );
}
