'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ARTWORKS, getLocalizedArtwork } from '@/data/products';
import { getArtworkAlt } from '@/lib/images';
import { LuxuryShowcase } from './luxury-showcase';
import type { Locale } from '@/lib/i18n/config';
import type { CollectionContent } from '@/lib/i18n/types';

interface CollectionSectionProps {
  locale?: Locale;
  dict?: CollectionContent;
}

/**
 * Editorial Collection Gallery Section — LUXAVÉN
 *
 * Conceived as a contemporary art catalogue / architectural exhibition.
 * Replaces generic ecommerce card grids with asymmetric editorial rhythm,
 * generous negative space, and quiet museum-grade artwork placards.
 */
export function CollectionSection({ locale = 'fr', dict }: CollectionSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  // Localized dictionary content with resilient architectural fallbacks
  const content = dict ?? {
    eyebrow: 'COLLECTION',
    title: 'Des objets façonnés par la matière, le temps et la main.',
    subtitle:
      'Une sélection de pièces sculpturales et de mobilier d’atelier façonnées dans les essences nobles de noyer et de chêne massif.',
    viewArtwork: "Découvrir l'œuvre",
    exploreAll: 'Explorer l’ensemble des œuvres',
    filters: {
      all: 'TOUTES LES ŒUVRES',
      totem: 'Totems',
      mobilier: 'Mobilier',
      vase: 'Vases',
    },
    priceOnRequest: 'Tarif sur demande',
    inquire: "S'INFORMER",
    dimensionsLabel: 'Dimensions',
  };

  const viewArtworkLabel = content.viewArtwork || "Découvrir l'œuvre";

  // Build localized artwork lookup map preserving existing products.ts data integrity
  const artworksMap = useMemo(() => {
    const map = new Map<string, ReturnType<typeof getLocalizedArtwork>>();
    for (const artwork of ARTWORKS) {
      map.set(artwork.slug, getLocalizedArtwork(artwork, locale));
    }
    return map;
  }, [locale]);

  // Curated exhibition artworks
  const featuredVases = artworksMap.get('vases-tournes-lot-7');
  const totemAtelier = artworksMap.get('totem-atelier-1');
  const tableMonolithe = artworksMap.get('table-repas-monolithe');
  const chaiseSphaera = artworksMap.get('chaise-sphaera');
  const piliersChene = artworksMap.get('piliers-totemiques-chene');
  const totemTerracotta = artworksMap.get('totem-sculptural-3');
  const consoleSphaera = artworksMap.get('console-sphaera');

  // Shared reveal animation props
  const revealProps = (delay = 0) =>
    shouldReduceMotion
      ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 28 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-60px' },
          transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section
      id="collection"
      className="py-24 sm:py-32 md:py-40 bg-[#F7F5F3] text-[#221C19] border-t border-[#E8E4E0]/80 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-14">
        {/* ========================================================= */}
        {/* 1. RESTRAINED EDITORIAL SECTION INTRODUCTION              */}
        {/* ========================================================= */}
        <motion.div {...revealProps(0)} className="max-w-3xl mb-20 sm:mb-28 md:mb-36">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <span className="w-8 h-[1px] bg-[#C0784A]/70 inline-block" />
            <span className="font-body text-[11px] sm:text-xs uppercase tracking-[0.24em] text-[#C0784A] font-medium">
              {content.eyebrow}
            </span>
          </div>

          <h2
            className={
              locale === 'ar'
                ? 'font-arabic text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-normal text-[#221C19] leading-[1.28] tracking-normal mb-5'
                : 'font-display text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-light text-[#221C19] leading-[1.1] tracking-tight mb-5'
            }
          >
            {content.title}
          </h2>

          {content.subtitle && (
            <p
              className={
                locale === 'ar'
                  ? 'font-arabic text-sm sm:text-base text-[#221C19]/65 font-light leading-relaxed max-w-2xl'
                  : 'font-body text-sm sm:text-base text-[#221C19]/70 font-light leading-relaxed max-w-2xl'
              }
            >
              {content.subtitle}
            </p>
          )}
        </motion.div>

        {/* ========================================================= */}
        {/* 2. GRAND EXHIBITION ANCHOR — FEATURED PLINTH              */}
        {/* Vases Tournés (Lot de 7) — Pure turned wood materiality   */}
        {/* ========================================================= */}
        {featuredVases && (
          <motion.article
            {...revealProps(0.1)}
            className="mb-24 sm:mb-36 md:mb-44 group"
            aria-label={featuredVases.name}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-end">
              {/* Grand Visual Frame */}
              <div className="lg:col-span-8">
                <Link
                  href={`/${locale}/collection/${featuredVases.slug}`}
                  className="block relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/11] w-full overflow-hidden bg-[#ECE8E3] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C0784A]"
                >
                  <Image
                    src={featuredVases.images[0]}
                    alt={getArtworkAlt(featuredVases.name, locale)}
                    fill
                    sizes="(max-width: 1024px) 100vw, 68vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                  />
                  <div className="absolute inset-0 bg-[#141110]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </Link>
              </div>

              {/* Gallery Placard */}
              <div className="lg:col-span-4 flex flex-col justify-end lg:pb-4">
                <div className="border-t border-[#E8E4E0] pt-6 sm:pt-8">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-[#C0784A] font-body mb-3">
                    <span>{content.filters.vase || 'Vase'}</span>
                    <span className="text-[#221C19]/40">01 / 07</span>
                  </div>

                  <h3
                    className={
                      locale === 'ar'
                        ? 'font-arabic text-2xl sm:text-3xl text-[#221C19] font-normal leading-snug mb-3'
                        : 'font-display text-2xl sm:text-3xl lg:text-4xl text-[#221C19] font-light leading-tight mb-3'
                    }
                  >
                    <Link
                      href={`/${locale}/collection/${featuredVases.slug}`}
                      className="hover:text-[#C0784A] transition-colors duration-300 focus-visible:outline-none"
                    >
                      {featuredVases.name}
                    </Link>
                  </h3>

                  <p className="font-body text-xs sm:text-sm text-[#221C19]/65 font-light leading-relaxed mb-4">
                    {featuredVases.material}
                  </p>

                  {featuredVases.dimensions && (
                    <p className="font-body text-[11px] uppercase tracking-[0.16em] text-[#221C19]/45 mb-6">
                      {content.dimensionsLabel} · {featuredVases.dimensions}
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    <span className="font-body text-xs text-[#221C19]/50 font-light italic">
                      {content.priceOnRequest}
                    </span>

                    <Link
                      href={`/${locale}/collection/${featuredVases.slug}`}
                      className="group/link inline-flex items-center gap-2 font-body text-xs uppercase tracking-[0.18em] text-[#221C19] hover:text-[#C0784A] transition-colors py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C0784A]"
                    >
                      <span className="border-b border-[#221C19]/30 group-hover/link:border-[#C0784A] pb-0.5 transition-colors">
                        {viewArtworkLabel}
                      </span>
                      <span
                        className="inline-block transition-transform duration-300 group-hover/link:translate-x-1 rtl:group-hover/link:-translate-x-1 rtl:rotate-180"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.article>
        )}

        {/* ========================================================= */}
        {/* 3. ASYMMETRIC DUO 1 — ARCHITECTURAL DIALOGUE              */}
        {/* Totem d'Atelier (Vertical Monolith) + Table Monolithe     */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-24 sm:mb-36 md:mb-44">
          {/* Left: Totem d'Atelier N°1 (Vertical Emphasis) */}
          {totemAtelier && (
            <motion.article
              {...revealProps(0.1)}
              className="lg:col-span-5 group"
              aria-label={totemAtelier.name}
            >
              <Link
                href={`/${locale}/collection/${totemAtelier.slug}`}
                className="block relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] w-full overflow-hidden bg-[#ECE8E3] mb-6 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C0784A]"
              >
                <Image
                  src={totemAtelier.images[0]}
                  alt={getArtworkAlt(totemAtelier.name, locale)}
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                />
                <div className="absolute inset-0 bg-[#141110]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </Link>

              {/* Placard */}
              <div className="border-t border-[#E8E4E0] pt-5">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-[#C0784A] font-body mb-2">
                  <span>{content.filters.totem || 'Totem'}</span>
                  <span className="text-[#221C19]/40">02 / 07</span>
                </div>

                <h3
                  className={
                    locale === 'ar'
                      ? 'font-arabic text-xl sm:text-2xl text-[#221C19] font-normal leading-snug mb-2'
                      : 'font-display text-2xl sm:text-3xl text-[#221C19] font-light leading-tight mb-2'
                  }
                >
                  <Link
                    href={`/${locale}/collection/${totemAtelier.slug}`}
                    className="hover:text-[#C0784A] transition-colors duration-300 focus-visible:outline-none"
                  >
                    {totemAtelier.name}
                  </Link>
                </h3>

                <p className="font-body text-xs text-[#221C19]/65 font-light mb-4">
                  {totemAtelier.material}
                  {totemAtelier.dimensions && (
                    <span className="block mt-1 text-[11px] text-[#221C19]/45">
                      {totemAtelier.dimensions}
                    </span>
                  )}
                </p>

                <div className="flex items-center justify-between pt-1">
                  <span className="font-body text-[11px] text-[#221C19]/45 font-light italic">
                    {content.priceOnRequest}
                  </span>
                  <Link
                    href={`/${locale}/collection/${totemAtelier.slug}`}
                    className="group/link inline-flex items-center gap-2 font-body text-xs uppercase tracking-[0.18em] text-[#221C19] hover:text-[#C0784A] transition-colors py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C0784A]"
                  >
                    <span className="border-b border-[#221C19]/30 group-hover/link:border-[#C0784A] pb-0.5 transition-colors">
                      {viewArtworkLabel}
                    </span>
                    <span
                      className="inline-block transition-transform duration-300 group-hover/link:translate-x-1 rtl:group-hover/link:-translate-x-1 rtl:rotate-180"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </motion.article>
          )}

          {/* Right: Table de Repas Monolithe (Offset Downward for Spatial Tension) */}
          {tableMonolithe && (
            <motion.article
              {...revealProps(0.2)}
              className="lg:col-span-7 lg:mt-24 group"
              aria-label={tableMonolithe.name}
            >
              <Link
                href={`/${locale}/collection/${tableMonolithe.slug}`}
                className="block relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] w-full overflow-hidden bg-[#ECE8E3] mb-6 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C0784A]"
              >
                <Image
                  src={tableMonolithe.images[0]}
                  alt={getArtworkAlt(tableMonolithe.name, locale)}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                />
                <div className="absolute inset-0 bg-[#141110]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </Link>

              {/* Placard */}
              <div className="border-t border-[#E8E4E0] pt-5">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-[#C0784A] font-body mb-2">
                  <span>{content.filters.mobilier || 'Mobilier'}</span>
                  <span className="text-[#221C19]/40">03 / 07</span>
                </div>

                <h3
                  className={
                    locale === 'ar'
                      ? 'font-arabic text-xl sm:text-2xl text-[#221C19] font-normal leading-snug mb-2'
                      : 'font-display text-2xl sm:text-3xl text-[#221C19] font-light leading-tight mb-2'
                  }
                >
                  <Link
                    href={`/${locale}/collection/${tableMonolithe.slug}`}
                    className="hover:text-[#C0784A] transition-colors duration-300 focus-visible:outline-none"
                  >
                    {tableMonolithe.name}
                  </Link>
                </h3>

                <p className="font-body text-xs text-[#221C19]/65 font-light mb-4">
                  {tableMonolithe.material}
                  {tableMonolithe.dimensions && (
                    <span className="block mt-1 text-[11px] text-[#221C19]/45">
                      {tableMonolithe.dimensions}
                    </span>
                  )}
                </p>

                <div className="flex items-center justify-between pt-1">
                  <span className="font-body text-[11px] text-[#221C19]/45 font-light italic">
                    {content.priceOnRequest}
                  </span>
                  <Link
                    href={`/${locale}/collection/${tableMonolithe.slug}`}
                    className="group/link inline-flex items-center gap-2 font-body text-xs uppercase tracking-[0.18em] text-[#221C19] hover:text-[#C0784A] transition-colors py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C0784A]"
                  >
                    <span className="border-b border-[#221C19]/30 group-hover/link:border-[#C0784A] pb-0.5 transition-colors">
                      {viewArtworkLabel}
                    </span>
                    <span
                      className="inline-block transition-transform duration-300 group-hover/link:translate-x-1 rtl:group-hover/link:-translate-x-1 rtl:rotate-180"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </motion.article>
          )}
        </div>

        {/* ========================================================= */}
        {/* 4. SOLO ARCHITECTURAL ACCENT — CHAISE SPHAERA             */}
        {/* Museum plinth framing with generous whitespace            */}
        {/* ========================================================= */}
        {chaiseSphaera && (
          <motion.article
            {...revealProps(0.1)}
            className="mb-24 sm:mb-36 md:mb-44 group"
            aria-label={chaiseSphaera.name}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 lg:col-start-3">
                <Link
                  href={`/${locale}/collection/${chaiseSphaera.slug}`}
                  className="block relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] w-full max-w-2xl mx-auto overflow-hidden bg-[#ECE8E3] mb-6 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C0784A]"
                >
                  <Image
                    src={chaiseSphaera.images[0]}
                    alt={getArtworkAlt(chaiseSphaera.name, locale)}
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                  />
                  <div className="absolute inset-0 bg-[#141110]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </Link>

                {/* Centered Gallery Placard */}
                <div className="max-w-xl mx-auto border-t border-[#E8E4E0] pt-6 text-center">
                  <div className="flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.2em] text-[#C0784A] font-body mb-2">
                    <span>{content.filters.mobilier || 'Mobilier'}</span>
                    <span className="text-[#221C19]/40">·</span>
                    <span className="text-[#221C19]/50">04 / 07</span>
                  </div>

                  <h3
                    className={
                      locale === 'ar'
                        ? 'font-arabic text-2xl sm:text-3xl text-[#221C19] font-normal leading-snug mb-2'
                        : 'font-display text-2xl sm:text-3xl lg:text-4xl text-[#221C19] font-light leading-tight mb-2'
                    }
                  >
                    <Link
                      href={`/${locale}/collection/${chaiseSphaera.slug}`}
                      className="hover:text-[#C0784A] transition-colors duration-300 focus-visible:outline-none"
                    >
                      {chaiseSphaera.name}
                    </Link>
                  </h3>

                  <p className="font-body text-xs sm:text-sm text-[#221C19]/70 font-light mb-4">
                    {chaiseSphaera.material}
                  </p>

                  <div className="inline-flex items-center gap-6 pt-2">
                    <span className="font-body text-xs text-[#221C19]/50 font-light italic">
                      {content.priceOnRequest}
                    </span>
                    <Link
                      href={`/${locale}/collection/${chaiseSphaera.slug}`}
                      className="group/link inline-flex items-center gap-2 font-body text-xs uppercase tracking-[0.18em] text-[#221C19] hover:text-[#C0784A] transition-colors py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C0784A]"
                    >
                      <span className="border-b border-[#221C19]/30 group-hover/link:border-[#C0784A] pb-0.5 transition-colors">
                        {viewArtworkLabel}
                      </span>
                      <span
                        className="inline-block transition-transform duration-300 group-hover/link:translate-x-1 rtl:group-hover/link:-translate-x-1 rtl:rotate-180"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.article>
        )}

        {/* ========================================================= */}
        {/* 5. ASYMMETRIC DUO 2 — RAW FORM & MINERAL CONTRAST         */}
        {/* Piliers Totémiques Chêne + Totem Sculptural N°3 (Argile)   */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-24 sm:mb-36 md:mb-44">
          {/* Left: Piliers Totémiques en Chêne */}
          {piliersChene && (
            <motion.article
              {...revealProps(0.1)}
              className="lg:col-span-6 group"
              aria-label={piliersChene.name}
            >
              <Link
                href={`/${locale}/collection/${piliersChene.slug}`}
                className="block relative aspect-square sm:aspect-[4/3] lg:aspect-square w-full overflow-hidden bg-[#ECE8E3] mb-6 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C0784A]"
              >
                <Image
                  src={piliersChene.images[0]}
                  alt={getArtworkAlt(piliersChene.name, locale)}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                />
                <div className="absolute inset-0 bg-[#141110]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </Link>

              {/* Placard */}
              <div className="border-t border-[#E8E4E0] pt-5">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-[#C0784A] font-body mb-2">
                  <span>{content.filters.totem || 'Totem'}</span>
                  <span className="text-[#221C19]/40">05 / 07</span>
                </div>

                <h3
                  className={
                    locale === 'ar'
                      ? 'font-arabic text-xl sm:text-2xl text-[#221C19] font-normal leading-snug mb-2'
                      : 'font-display text-2xl sm:text-3xl text-[#221C19] font-light leading-tight mb-2'
                  }
                >
                  <Link
                    href={`/${locale}/collection/${piliersChene.slug}`}
                    className="hover:text-[#C0784A] transition-colors duration-300 focus-visible:outline-none"
                  >
                    {piliersChene.name}
                  </Link>
                </h3>

                <p className="font-body text-xs text-[#221C19]/65 font-light mb-4">
                  {piliersChene.material}
                  {piliersChene.dimensions && (
                    <span className="block mt-1 text-[11px] text-[#221C19]/45">
                      {piliersChene.dimensions}
                    </span>
                  )}
                </p>

                <div className="flex items-center justify-between pt-1">
                  <span className="font-body text-[11px] text-[#221C19]/45 font-light italic">
                    {content.priceOnRequest}
                  </span>
                  <Link
                    href={`/${locale}/collection/${piliersChene.slug}`}
                    className="group/link inline-flex items-center gap-2 font-body text-xs uppercase tracking-[0.18em] text-[#221C19] hover:text-[#C0784A] transition-colors py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C0784A]"
                  >
                    <span className="border-b border-[#221C19]/30 group-hover/link:border-[#C0784A] pb-0.5 transition-colors">
                      {viewArtworkLabel}
                    </span>
                    <span
                      className="inline-block transition-transform duration-300 group-hover/link:translate-x-1 rtl:group-hover/link:-translate-x-1 rtl:rotate-180"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </motion.article>
          )}

          {/* Right: Totem Sculptural N°3 (Vertical & Staggered) */}
          {totemTerracotta && (
            <motion.article
              {...revealProps(0.2)}
              className="lg:col-span-5 lg:col-start-8 lg:mt-24 group"
              aria-label={totemTerracotta.name}
            >
              <Link
                href={`/${locale}/collection/${totemTerracotta.slug}`}
                className="block relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] w-full overflow-hidden bg-[#ECE8E3] mb-6 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C0784A]"
              >
                <Image
                  src={totemTerracotta.images[0]}
                  alt={getArtworkAlt(totemTerracotta.name, locale)}
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                />
                <div className="absolute inset-0 bg-[#141110]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </Link>

              {/* Placard */}
              <div className="border-t border-[#E8E4E0] pt-5">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-[#C0784A] font-body mb-2">
                  <span>{content.filters.totem || 'Totem'}</span>
                  <span className="text-[#221C19]/40">06 / 07</span>
                </div>

                <h3
                  className={
                    locale === 'ar'
                      ? 'font-arabic text-xl sm:text-2xl text-[#221C19] font-normal leading-snug mb-2'
                      : 'font-display text-2xl sm:text-3xl text-[#221C19] font-light leading-tight mb-2'
                  }
                >
                  <Link
                    href={`/${locale}/collection/${totemTerracotta.slug}`}
                    className="hover:text-[#C0784A] transition-colors duration-300 focus-visible:outline-none"
                  >
                    {totemTerracotta.name}
                  </Link>
                </h3>

                <p className="font-body text-xs text-[#221C19]/65 font-light mb-4">
                  {totemTerracotta.material}
                  {totemTerracotta.dimensions && (
                    <span className="block mt-1 text-[11px] text-[#221C19]/45">
                      {totemTerracotta.dimensions}
                    </span>
                  )}
                </p>

                <div className="flex items-center justify-between pt-1">
                  <span className="font-body text-[11px] text-[#221C19]/45 font-light italic">
                    {content.priceOnRequest}
                  </span>
                  <Link
                    href={`/${locale}/collection/${totemTerracotta.slug}`}
                    className="group/link inline-flex items-center gap-2 font-body text-xs uppercase tracking-[0.18em] text-[#221C19] hover:text-[#C0784A] transition-colors py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C0784A]"
                  >
                    <span className="border-b border-[#221C19]/30 group-hover/link:border-[#C0784A] pb-0.5 transition-colors">
                      {viewArtworkLabel}
                    </span>
                    <span
                      className="inline-block transition-transform duration-300 group-hover/link:translate-x-1 rtl:group-hover/link:-translate-x-1 rtl:rotate-180"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </motion.article>
          )}
        </div>

        {/* ========================================================= */}
        {/* 6. ATELIER BRIDGE — LA TABLE CONSOLE SPHAERA              */}
        {/* Intimate closing gallery presence leading to Masterpiece  */}
        {/* ========================================================= */}
        {consoleSphaera && (
          <motion.article
            {...revealProps(0.1)}
            className="mb-16 sm:mb-24 group"
            aria-label={consoleSphaera.name}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              <div className="lg:col-span-6 lg:col-start-2">
                <Link
                  href={`/${locale}/collection/${consoleSphaera.slug}`}
                  className="block relative aspect-square w-full max-w-lg mx-auto overflow-hidden bg-[#ECE8E3] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C0784A]"
                >
                  <Image
                    src={consoleSphaera.images[0]}
                    alt={getArtworkAlt(consoleSphaera.name, locale)}
                    fill
                    sizes="(max-width: 1024px) 100vw, 48vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                  />
                  <div className="absolute inset-0 bg-[#141110]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </Link>
              </div>

              <div className="lg:col-span-4 flex flex-col justify-center">
                <div className="border-t border-[#E8E4E0] pt-6 sm:pt-8">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-[#C0784A] font-body mb-3">
                    <span>{content.filters.mobilier || 'Mobilier'}</span>
                    <span className="text-[#221C19]/40">07 / 07</span>
                  </div>

                  <h3
                    className={
                      locale === 'ar'
                        ? 'font-arabic text-2xl sm:text-3xl text-[#221C19] font-normal leading-snug mb-3'
                        : 'font-display text-2xl sm:text-3xl lg:text-4xl text-[#221C19] font-light leading-tight mb-3'
                    }
                  >
                    <Link
                      href={`/${locale}/collection/${consoleSphaera.slug}`}
                      className="hover:text-[#C0784A] transition-colors duration-300 focus-visible:outline-none"
                    >
                      {consoleSphaera.name}
                    </Link>
                  </h3>

                  <p className="font-body text-xs sm:text-sm text-[#221C19]/65 font-light leading-relaxed mb-4">
                    {consoleSphaera.material}
                  </p>

                  <div className="flex items-center justify-between pt-2">
                    <span className="font-body text-xs text-[#221C19]/50 font-light italic">
                      {content.priceOnRequest}
                    </span>

                    <Link
                      href={`/${locale}/collection/${consoleSphaera.slug}`}
                      className="group/link inline-flex items-center gap-2 font-body text-xs uppercase tracking-[0.18em] text-[#221C19] hover:text-[#C0784A] transition-colors py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C0784A]"
                    >
                      <span className="border-b border-[#221C19]/30 group-hover/link:border-[#C0784A] pb-0.5 transition-colors">
                        {viewArtworkLabel}
                      </span>
                      <span
                        className="inline-block transition-transform duration-300 group-hover/link:translate-x-1 rtl:group-hover/link:-translate-x-1 rtl:rotate-180"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.article>
        )}

        {/* ========================================================= */}
        {/* 7. HANDCRAFTED LUXURY SHOWCASE — THE ARTISTRY OF WOOD     */}
        {/* Curated salon of 11 master studio sculptures             */}
        {/* ========================================================= */}
        <LuxuryShowcase locale={locale} dict={content.luxuryShowcase} />

        {/* ========================================================= */}
        {/* 8. ARCHIVE EXPLORATION LINK — ATELIER INVITATION          */}
        {/* ========================================================= */}
        <motion.div
          {...revealProps(0.1)}
          className="pt-16 sm:pt-20 border-t border-[#E8E4E0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <p className="font-body text-xs uppercase tracking-[0.2em] text-[#221C19]/50 font-light">
            LUXAVÉN Atelier Genève · Éditions d’Art
          </p>

          <Link
            href={`/${locale}/collection`}
            className="group/all inline-flex items-center gap-3 font-body text-xs uppercase tracking-[0.2em] text-[#221C19] hover:text-[#C0784A] transition-colors py-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C0784A]"
          >
            <span className="border-b border-[#221C19]/40 group-hover/all:border-[#C0784A] pb-0.5 transition-colors">
              {content.exploreAll || 'Explorer l’ensemble des œuvres'}
            </span>
            <span
              className="inline-block transition-transform duration-300 group-hover/all:translate-x-1.5 rtl:group-hover/all:-translate-x-1.5 rtl:rotate-180"
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default CollectionSection;
