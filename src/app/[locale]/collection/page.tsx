import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale } from '@/lib/i18n/locale';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { Navbar } from '@/components/shared/navbar';
import { CollectionSection } from '@/components/sections/collection-section';
import { Footer } from '@/components/shared/footer';

interface CollectionPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const dict = await getDictionary(locale);
  return generatePageMetadata({
    locale,
    path: '/collection',
    title: dict.collection.title,
    description: dict.collection.eyebrow,
  });
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dict = await getDictionary(locale);

  return (
    <>
      <Navbar locale={locale} dict={dict.navigation} />
      <main className="pt-24 flex-grow bg-[#F7F5F3]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-8 border-b border-[#E8E4E0]">
          <span className="eyebrow text-[#C0784A] mb-4 block text-[11px] font-medium tracking-[0.2em] uppercase">
            {dict.collection.eyebrow} — LUXAVÉN
          </span>
          <h1 className="text-4xl md:text-6xl font-display text-[#3B2F2F] tracking-tight">
            {dict.collection.title}
          </h1>
        </div>
        <CollectionSection locale={locale} dict={dict.collection} />
      </main>
      <Footer locale={locale} dict={dict.footer} />
    </>
  );
}
