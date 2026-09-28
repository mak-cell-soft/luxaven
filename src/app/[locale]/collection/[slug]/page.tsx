import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { LOCALES, type Locale } from '@/lib/i18n/config';
import { isLocale } from '@/lib/i18n/locale';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { getAllArtworks, getArtworkBySlug, getLocalizedArtwork } from '@/data/products';
import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';
import { ArtworkJsonLd } from '@/components/seo/json-ld';
import { ArrowLeft } from 'lucide-react';
import { brandConfig } from '@/lib/brand.config';
import { IMAGE_SIZES, getArtworkAlt } from '@/lib/images';

interface ArtworkPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const artworks = getAllArtworks();
  const params: Array<{ locale: string; slug: string }> = [];

  for (const locale of LOCALES) {
    for (const artwork of artworks) {
      params.push({
        locale,
        slug: artwork.slug,
      });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: ArtworkPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};

  const artwork = getArtworkBySlug(slug);
  if (!artwork) return {};

  const localized = getLocalizedArtwork(artwork, locale as Locale);

  return generatePageMetadata({
    locale: locale as Locale,
    path: `/collection/${slug}`,
    title: localized.name,
    description: localized.description,
  });
}

export default async function ArtworkDetailPage({ params }: ArtworkPageProps) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const artwork = getArtworkBySlug(slug);
  if (!artwork) {
    notFound();
  }

  const dict = await getDictionary(locale);
  const localized = getLocalizedArtwork(artwork, locale);

  return (
    <>
      <ArtworkJsonLd
        name={localized.name}
        description={localized.description}
        image={localized.images[0] ? `${brandConfig.url}${localized.images[0]}` : undefined}
        material={localized.material}
        url={`${brandConfig.url}/${locale}/collection/${slug}`}
      />
      <Navbar locale={locale} dict={dict.navigation} />
      <main className="pt-28 pb-20 bg-[#F7F5F3] flex-grow">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Back Navigation */}
          <div className="py-6">
            <Link
              href={`/${locale}/collection`}
              className="inline-flex items-center gap-2 font-body text-xs uppercase tracking-[0.15em] text-[#3B2F2F]/70 hover:text-[#C0784A] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
              <span>{dict.common.backToCollection}</span>
            </Link>
          </div>

          {/* Exhibition Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mt-6">
            {/* Left: Artwork Visual */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[3/4] bg-white border border-[#E8E4E0] rounded-[16px] overflow-hidden shadow-sm">
                <Image
                  src={localized.images[0]}
                  alt={getArtworkAlt(localized.name, locale)}
                  fill
                  priority
                  sizes={IMAGE_SIZES.detail}
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right: Artwork Technical & Provenance Specifications */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-8 lg:ps-6">
              <div>
                <span className="font-body text-[11px] tracking-[0.2em] uppercase text-[#C0784A] font-medium block mb-3">
                  {dict.collection.filters[localized.category] || localized.category} — LUXAVÉN
                </span>
                <h1 className="font-display text-4xl md:text-5xl text-[#3B2F2F] leading-tight font-medium">
                  {localized.name}
                </h1>
              </div>

              <p className="font-body text-sm text-[#3B2F2F]/80 leading-relaxed font-light">
                {localized.description}
              </p>

              {/* Technical Specifications */}
              <div className="border-t border-b border-[#E8E4E0] py-6 space-y-4">
                <div className="flex justify-between items-center text-xs font-body">
                  <span className="uppercase tracking-[0.15em] text-[#3B2F2F]/50 font-medium">
                    {dict.featured.materialLabel}
                  </span>
                  <span className="text-[#3B2F2F] font-medium">{localized.material}</span>
                </div>

                {localized.dimensions && (
                  <div className="flex justify-between items-center text-xs font-body">
                    <span className="uppercase tracking-[0.15em] text-[#3B2F2F]/50 font-medium">
                      {dict.collection.dimensionsLabel}
                    </span>
                    <span className="text-[#3B2F2F] font-medium">{localized.dimensions}</span>
                  </div>
                )}

                {localized.edition && (
                  <div className="flex justify-between items-center text-xs font-body">
                    <span className="uppercase tracking-[0.15em] text-[#3B2F2F]/50 font-medium">
                      {dict.featured.editionLabel}
                    </span>
                    <span className="text-[#3B2F2F] font-medium">{localized.edition}</span>
                  </div>
                )}

                <div className="flex justify-between items-center text-xs font-body">
                  <span className="uppercase tracking-[0.15em] text-[#3B2F2F]/50 font-medium">
                    Statut
                  </span>
                  <span className="text-[#C0784A] font-medium uppercase tracking-wider text-[11px]">
                    {dict.common.priceOnRequest}
                  </span>
                </div>
              </div>

              {/* Inquire CTA */}
              <div className="pt-4">
                <Link
                  href={`/${locale}/contact`}
                  className="block w-full text-center bg-[#5C3D2E] text-[#F7F5F3] px-8 py-4 font-body text-xs font-medium tracking-[0.15em] uppercase hover:bg-[#3B2F2F] transition-all shadow-sm"
                >
                  {dict.common.inquire}
                </Link>
              </div>
            </div>
          </div>

        </div>
      </main>
      <Footer locale={locale} dict={dict.footer} />
    </>
  );
}
