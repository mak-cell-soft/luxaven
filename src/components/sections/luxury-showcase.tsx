'use client';

import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import {
  LUXURY_SCULPTURES,
  getLocalizedLuxuryPiece,
  type LuxurySculptureCategory,
} from '@/data/luxury-showcase';
import type { Locale } from '@/lib/i18n/config';
import type { LuxuryShowcaseContent } from '@/lib/i18n/types';
import { cn } from '@/lib/utils';

interface LuxuryShowcaseProps {
  locale?: Locale;
  dict?: LuxuryShowcaseContent;
}

type FilterKey = 'all' | LuxurySculptureCategory;

/**
 * Luxury Showcase Section — LUXAVÉN
 *
 * An editorial museum-grade exhibition feature presenting "The Artistry of Wood",
 * a curated collection of 11 master sculptural studies created in noble Swiss woods.
 * Integrates the collection of images located in /images/handmade/luxury/.
 */
export function LuxuryShowcase({ locale = 'fr', dict }: LuxuryShowcaseProps) {
  const shouldReduceMotion = useReducedMotion();
  const [selectedSlug, setSelectedSlug] = useState<string>(LUXURY_SCULPTURES[0].slug);
  const [activeCategory, setActiveCategory] = useState<FilterKey>('all');
  const thumbnailStripRef = useRef<HTMLDivElement>(null);

  // Localized dictionary content with resilient architectural fallbacks
  const content = dict ?? {
    eyebrow: "SÉRIE D'EXCEPTION · CABINET D'ATELIER",
    title: 'The Artistry of Wood',
    subtitle:
      'Onze études sculpturales façonnées au tour et à la gouge dans nos ateliers suisses. Chaque pièce explore la tension entre géométrie architecturale et grain vivant du bois.',
    inquireCta: 'Demander une Présentation Privée',
    viewPlaque: "Plaque d'Atelier",
    dimensionsLabel: 'Proportions',
    materialLabel: 'Essence & Finition',
    seriesBadge: "Édition d'Artisan",
    filters: {
      all: 'Toutes les pièces (11)',
      pedestal: 'Piédestaux (3)',
      vase: 'Vases Sculpturaux (2)',
      column: 'Colonnes & Flèches (4)',
      organic: 'Formes Organiques (2)',
    },
  };

  // Filtered pieces based on active category
  const filteredPieces = useMemo(() => {
    if (activeCategory === 'all') return LUXURY_SCULPTURES;
    return LUXURY_SCULPTURES.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  // Current active piece
  const activePiece = useMemo(() => {
    const found = LUXURY_SCULPTURES.find((p) => p.slug === selectedSlug);
    return found ?? filteredPieces[0] ?? LUXURY_SCULPTURES[0];
  }, [selectedSlug, filteredPieces]);

  // Active index within the filtered list
  const activeFilteredIndex = useMemo(() => {
    const idx = filteredPieces.findIndex((p) => p.slug === activePiece.slug);
    return idx >= 0 ? idx : 0;
  }, [filteredPieces, activePiece]);

  // Localized active piece details
  const localizedPiece = useMemo(
    () => getLocalizedLuxuryPiece(activePiece, locale),
    [activePiece, locale]
  );

  // Auto-switch piece if active piece is filtered out
  const handleCategorySelect = (cat: FilterKey) => {
    setActiveCategory(cat);
    const newFiltered = cat === 'all'
      ? LUXURY_SCULPTURES
      : LUXURY_SCULPTURES.filter((p) => p.category === cat);
    if (!newFiltered.some((p) => p.slug === selectedSlug)) {
      if (newFiltered[0]) {
        setSelectedSlug(newFiltered[0].slug);
      }
    }
  };

  // Previous and next handlers
  const handlePrev = useCallback(() => {
    const prevIdx =
      (activeFilteredIndex - 1 + filteredPieces.length) % filteredPieces.length;
    setSelectedSlug(filteredPieces[prevIdx].slug);
  }, [activeFilteredIndex, filteredPieces]);

  const handleNext = useCallback(() => {
    const nextIdx = (activeFilteredIndex + 1) % filteredPieces.length;
    setSelectedSlug(filteredPieces[nextIdx].slug);
  }, [activeFilteredIndex, filteredPieces]);

  // Scroll active thumbnail into view
  useEffect(() => {
    if (!thumbnailStripRef.current) return;
    const activeBtn = thumbnailStripRef.current.querySelector<HTMLElement>(
      `[data-slug="${activePiece.slug}"]`
    );
    if (activeBtn) {
      activeBtn.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [activePiece.slug]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (locale === 'ar') handleNext();
      else handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      if (locale === 'ar') handlePrev();
      else handleNext();
    }
  };

  const isRtl = locale === 'ar';

  return (
    <section
      aria-label={content.title}
      className="my-20 sm:my-28 md:my-36 pt-16 sm:pt-24 border-t border-[#E8E4E0]/80 relative"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
    >
      {/* Editorial Header */}
      <div className="max-w-4xl mb-12 sm:mb-16">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-[1px] bg-[#C0784A]/70 inline-block" />
          <span className="font-body text-[11px] sm:text-xs uppercase tracking-[0.24em] text-[#C0784A] font-medium">
            {content.eyebrow}
          </span>
        </div>

        <h3
          className={cn(
            'text-3xl sm:text-4xl md:text-5xl text-[#221C19] font-light leading-[1.12] tracking-tight mb-4',
            isRtl ? 'font-arabic' : 'font-display'
          )}
        >
          {content.title}
        </h3>

        <p
          className={cn(
            'text-sm sm:text-base text-[#221C19]/70 font-light leading-relaxed max-w-2xl',
            isRtl ? 'font-arabic' : 'font-body'
          )}
        >
          {content.subtitle}
        </p>

        {/* Form Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-8">
          {(
            [
              { key: 'all', label: content.filters.all },
              { key: 'pedestal', label: content.filters.pedestal },
              { key: 'vase', label: content.filters.vase },
              { key: 'column', label: content.filters.column },
              { key: 'organic', label: content.filters.organic },
            ] as const
          ).map((filter) => {
            const isActive = activeCategory === filter.key;
            return (
              <button
                key={filter.key}
                type="button"
                onClick={() => handleCategorySelect(filter.key)}
                className={cn(
                  'px-3.5 py-1.5 text-[11px] sm:text-xs font-body tracking-[0.14em] uppercase transition-all duration-300 border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C0784A]',
                  isActive
                    ? 'bg-[#221C19] text-[#FBF9F7] border-[#221C19] shadow-sm'
                    : 'bg-transparent text-[#221C19]/70 border-[#E8E4E0] hover:border-[#C0784A] hover:text-[#221C19]'
                )}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Exhibition Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center mb-10">
        {/* Left / Center: Grand Artwork Display */}
        <div className="lg:col-span-8 relative">
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#181412] border border-[#E8E4E0]/80 shadow-[0_20px_50px_rgba(0,0,0,0.08)] group">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePiece.id}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 1.01 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full h-full"
              >
                <Image
                  src={activePiece.image}
                  alt={`${localizedPiece.title} — LUXAVÉN ${activePiece.plaqueTitle}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 68vw"
                  className={cn(
                    'select-none transition-transform duration-700 ease-out group-hover:scale-[1.02]',
                    activePiece.orientation === 'portrait'
                      ? 'object-contain object-center'
                      : 'object-cover object-center'
                  )}
                  priority={false}
                />

                {/* Subtle Luxury Scrim protecting borders */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none opacity-60" />

                {/* Authenticity Plaque Badge overlay */}
                <div className="absolute bottom-4 inset-inline-start-4 sm:bottom-6 sm:inset-inline-start-6 z-10 pointer-events-none">
                  <div className="bg-[#181412]/85 backdrop-blur-md border border-[#D69D78]/30 px-3.5 py-1.5 flex items-center gap-2.5 shadow-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D69D78] inline-block animate-pulse" />
                    <span className="font-display tracking-[0.18em] text-[10px] sm:text-xs text-[#FBF9F7] uppercase font-light">
                      {activePiece.plaqueTitle}
                    </span>
                  </div>
                </div>

                {/* Edition & Number Tag */}
                <div className="absolute top-4 inset-inline-end-4 sm:top-6 sm:inset-inline-end-6 z-10 pointer-events-none">
                  <span className="font-body text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#FBF9F7]/80 bg-[#181412]/75 backdrop-blur-sm px-3 py-1 border border-white/10">
                    {activePiece.number} / 11
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Stage Navigation Arrows */}
            <div className="absolute bottom-4 inset-inline-end-4 sm:bottom-6 sm:inset-inline-end-6 z-20 flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous artwork"
                className="w-10 h-10 rounded-full bg-[#181412]/80 backdrop-blur-md border border-white/20 text-[#FBF9F7] flex items-center justify-center hover:bg-[#C0784A] hover:border-[#C0784A] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C0784A]"
              >
                <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next artwork"
                className="w-10 h-10 rounded-full bg-[#181412]/80 backdrop-blur-md border border-white/20 text-[#FBF9F7] flex items-center justify-center hover:bg-[#C0784A] hover:border-[#C0784A] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C0784A]"
              >
                <ChevronRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Museum Placard & Inquiry Details */}
        <div className="lg:col-span-4 flex flex-col justify-between h-full">
          <div className="border-t border-[#E8E4E0] pt-6 sm:pt-8">
            {/* Meta Category & Serial */}
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-[#C0784A] font-body mb-3">
              <span>{localizedPiece.categoryLabel}</span>
              <span className="text-[#221C19]/40">{content.seriesBadge}</span>
            </div>

            {/* Title */}
            <h4
              className={cn(
                'text-2xl sm:text-3xl text-[#221C19] font-light leading-snug mb-3',
                isRtl ? 'font-arabic' : 'font-display'
              )}
            >
              {localizedPiece.title}
            </h4>

            {/* Brass Plaque Subtitle */}
            <p className="font-body text-[11px] uppercase tracking-[0.18em] text-[#C0784A]/90 font-medium mb-4 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 stroke-[1.5]" />
              <span>{activePiece.plaqueTitle}</span>
            </p>

            {/* Curatorial Description */}
            <p
              className={cn(
                'text-xs sm:text-sm text-[#221C19]/70 font-light leading-relaxed mb-6',
                isRtl ? 'font-arabic' : 'font-body'
              )}
            >
              {localizedPiece.description}
            </p>

            {/* Specifications Card */}
            <div className="border-t border-b border-[#E8E4E0]/80 py-4 my-6 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-body">
                <span className="uppercase tracking-[0.16em] text-[#221C19]/50 text-[10px]">
                  {content.materialLabel}
                </span>
                <span className="text-[#221C19] font-medium text-[11px]">
                  {localizedPiece.material}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs font-body">
                <span className="uppercase tracking-[0.16em] text-[#221C19]/50 text-[10px]">
                  {content.dimensionsLabel}
                </span>
                <span className="text-[#221C19] font-medium text-[11px]">
                  {localizedPiece.dimensions}
                </span>
              </div>
            </div>

            {/* CTA Private Inquiry */}
            <div className="pt-2">
              <Link
                href={`/${locale}/contact?piece=${activePiece.slug}`}
                className="group/cta inline-flex items-center justify-between w-full px-5 py-3.5 bg-[#221C19] text-[#FBF9F7] text-xs font-body uppercase tracking-[0.18em] hover:bg-[#C0784A] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C0784A]"
              >
                <span>{content.inquireCta}</span>
                <span
                  className="inline-block transition-transform duration-300 group-hover/cta:translate-x-1.5 rtl:group-hover/cta:-translate-x-1.5 rtl:rotate-180"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Curated Thumbnail Strip / All 11 Sculptures Ribbons */}
      <div className="pt-6 border-t border-[#E8E4E0]/60">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#221C19]/50 font-body">
            Études d’Atelier · {filteredPieces.length} Pièces
          </span>
          <span className="text-[10px] uppercase tracking-[0.18em] text-[#C0784A] font-body">
            {activeFilteredIndex + 1} / {filteredPieces.length}
          </span>
        </div>

        <div
          ref={thumbnailStripRef}
          className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 pt-1 scrollbar-none snap-x focus-visible:outline-none"
        >
          {filteredPieces.map((piece) => {
            const isCurrent = piece.slug === activePiece.slug;
            return (
              <button
                key={piece.id}
                type="button"
                data-slug={piece.slug}
                onClick={() => setSelectedSlug(piece.slug)}
                aria-label={`View ${piece.plaqueTitle}`}
                aria-current={isCurrent ? 'true' : undefined}
                className={cn(
                  'snap-start shrink-0 text-start group/thumb transition-all duration-300 relative focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C0784A]',
                  'w-[110px] sm:w-[130px] md:w-[145px]'
                )}
              >
                {/* Thumbnail Image Container */}
                <div
                  className={cn(
                    'relative aspect-[4/3] w-full overflow-hidden bg-[#181412] mb-2 transition-all duration-300',
                    isCurrent
                      ? 'ring-2 ring-[#C0784A] shadow-md scale-[1.02]'
                      : 'border border-[#E8E4E0] opacity-75 hover:opacity-100 hover:border-[#C0784A]/60'
                  )}
                >
                  <Image
                    src={piece.image}
                    alt={piece.plaqueTitle}
                    fill
                    sizes="150px"
                    className="object-cover object-center select-none"
                  />
                  <div
                    className={cn(
                      'absolute inset-0 bg-[#C0784A]/20 transition-opacity',
                      isCurrent ? 'opacity-100' : 'opacity-0 group-hover/thumb:opacity-40'
                    )}
                  />
                  <span className="absolute bottom-1 inset-inline-start-1 text-[9px] font-body bg-[#181412]/80 text-[#FBF9F7] px-1.5 py-0.5 tracking-wider">
                    {piece.number}
                  </span>
                </div>

                {/* Miniature Title Label */}
                <span
                  className={cn(
                    'block truncate text-[10px] sm:text-[11px] font-body tracking-wider transition-colors duration-200',
                    isCurrent
                      ? 'text-[#C0784A] font-medium'
                      : 'text-[#221C19]/60 group-hover/thumb:text-[#221C19]'
                  )}
                >
                  {piece.plaqueTitle}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default LuxuryShowcase;
