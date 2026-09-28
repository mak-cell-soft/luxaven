import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale } from '@/lib/i18n/locale';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { Navbar } from '@/components/shared/navbar';
import { ContactSection } from '@/components/sections/contact-section';
import { Footer } from '@/components/shared/footer';
import { brandConfig } from '@/lib/brand.config';

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const dict = await getDictionary(locale);
  return generatePageMetadata({
    locale,
    path: '/contact',
    title: dict.contact.title,
    description: dict.contact.description,
  });
}

export default async function ContactPage({ params }: ContactPageProps) {
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
            {dict.contact.eyebrow} — LUXAVÉN
          </span>
          <h1 className="text-4xl md:text-6xl font-display text-[#3B2F2F] tracking-tight mb-4">
            {dict.contact.title}
          </h1>
          <p className="font-body text-sm text-[#3B2F2F]/70 max-w-xl font-light leading-relaxed">
            {brandConfig.atelier.name} · {brandConfig.atelier.address}, {brandConfig.atelier.city}, {brandConfig.atelier.country}
          </p>
        </div>

        <ContactSection locale={locale} dict={dict.contact} />
      </main>
      <Footer locale={locale} dict={dict.footer} />
    </>
  );
}
