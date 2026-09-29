'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { brandConfig } from '@/lib/brand.config';
import { IMAGE_SIZES, HERO_SEQUENCE } from '@/lib/images';
import { cn } from '@/lib/utils';
import type { Locale } from '@/lib/i18n/config';
import type { HeroContent } from '@/lib/i18n/types';

interface HeroSectionProps {
  locale?: Locale;
  dict?: HeroContent;
}

const SLOGAN_LINES: Record<Locale, [string, string]> = {
  en: ['Where Material', 'Becomes Form.'],
  fr: ['Quand la matière', 'devient forme.'],
  de: ['Wo Materie', 'zur Form wird.'],
  ar: ['حيث تتحول المادة', 'إلى شكل'],
};

/**
 * Editorial Timing Configuration:
 * - DISPLAY_DURATION_MS: Time each artwork stays prominent before crossfade starts (~3.6s)
 * - TRANSITION_DURATION_S: Slow, nearly imperceptible film crossfade duration (~1.4s)
 * - TOTAL_BREATH_DURATION_S: Continuous slow Ken Burns drift duration while on screen (5.0s)
 *
 * Exact 5.0s cycle: 3600ms display + 1400ms crossfade = 5000ms between transitions.
 */
const DISPLAY_DURATION_MS = 3600;
const TRANSITION_DURATION_S = 1.4;
const TOTAL_BREATH_DURATION_S = 5.0;

export function HeroSection({ locale = 'fr', dict }: HeroSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Sequence state: active base index and incoming crossfade index
  const [activeIndex, setActiveIndex] = useState(0);
  const [incomingIndex, setIncomingIndex] = useState<number | null>(null);

  // Progressive preloader: eagerly fetches only the next upcoming slide into browser cache
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const nextIdx = (activeIndex + 1) % HERO_SEQUENCE.length;
    const img = new window.Image();
    img.src = HERO_SEQUENCE[nextIdx].src;
  }, [activeIndex]);

  // Cinematic gallery sequence timer: alternates base and incoming crossfade layers
  useEffect(() => {
    // Under reduced motion: sequence is disabled to preserve visual calm
    if (shouldReduceMotion) return;

    if (incomingIndex === null) {
      // In steady exhibition state: wait for display duration, then trigger next artwork dissolve
      const timer = setTimeout(() => {
        const nextIdx = (activeIndex + 1) % HERO_SEQUENCE.length;
        setIncomingIndex(nextIdx);
      }, DISPLAY_DURATION_MS);

      return () => clearTimeout(timer);
    } else {
      // During active crossfade: once incoming layer is 100% opaque, commit it as the new base layer
      const timer = setTimeout(() => {
        setActiveIndex(incomingIndex);
        setIncomingIndex(null);
      }, TRANSITION_DURATION_S * 1000);

      return () => clearTimeout(timer);
    }
  }, [activeIndex, incomingIndex, shouldReduceMotion]);

  // Gentle scroll-driven depth
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '6%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const content = dict ?? {
    eyebrow: "L'ATELIER DES OBJETS RARES",
    titlePrefix: 'Des objets qui',
    titleHighlight: "portent le temps et l'espace",
    description:
      'Créés en Suisse dans des essences nobles de noyer et de chêne massif, façonnés à la main pour capturer le silence et la permanence du bois.',
    ctaCollection: 'EXPLORER LA COLLECTION',
    ctaProcess: 'NOTRE PROCÉDÉ',
    imageCaptionTitle: 'The Cascade Form',
    imageCaptionMaterial: 'NOYER MASSIF SUISSE',
    stats: {
      swissWoodValue: '100%',
      swissWoodLabel: 'BOIS SUISSE',
      handCraftedValue: 'Main',
      handCraftedLabel: 'SCULPTÉ & TOURNÉ',
      limitedValue: 'Atelier',
      limitedLabel: 'PIÈCES D’ATELIER',
    },
  };

  const [sloganLine1, sloganLine2] = SLOGAN_LINES[locale] ?? SLOGAN_LINES.fr;
  const fullTagline = brandConfig.tagline[locale] ?? brandConfig.tagline.fr;

  const baseSlide = HERO_SEQUENCE[activeIndex];
  const incomingSlide = incomingIndex !== null ? HERO_SEQUENCE[incomingIndex] : null;

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] w-full flex items-end overflow-hidden text-[#FBF9F7]"
    >
      {/* Fallback solid background strictly behind image layers */}
      <div className="absolute inset-0 bg-[#141110] -z-10" />

      {/* Background Cinematic Visual Sequence: Scroll parallax container */}
      <motion.div
        style={shouldReduceMotion ? undefined : { scale: imageScale, y: imageY }}
        className="absolute inset-0 w-full h-full z-0 origin-center overflow-hidden"
        aria-hidden="true"
      >
        {/* Layer 1: Base Slide (Always 100% opaque, zero black flash) */}
        <motion.div
          key={baseSlide.id}
          className="absolute inset-0 w-full h-full z-[1]"
          initial={false}
          animate={
            shouldReduceMotion
              ? { opacity: 1, scale: 1, y: '0%' }
              : {
                  opacity: 1,
                  scale: baseSlide.targetScale,
                  y: baseSlide.translateY,
                }
          }
          transition={
            shouldReduceMotion
              ? { opacity: { duration: 0.5 } }
              : {
                  opacity: { duration: TRANSITION_DURATION_S, ease: [0.22, 1, 0.36, 1] },
                  scale: { duration: TOTAL_BREATH_DURATION_S, ease: 'easeOut' },
                  y: { duration: TOTAL_BREATH_DURATION_S, ease: 'easeOut' },
                }
          }
        >
          <Image
            src={baseSlide.src}
            alt={baseSlide.alt}
            fill
            priority={activeIndex === 0}
            sizes={IMAGE_SIZES.hero}
            className={cn(
              'object-cover select-none',
              baseSlide.mobilePositionClass,
              baseSlide.desktopPositionClass
            )}
          />
        </motion.div>

        {/* Layer 2: Incoming Slide (Dissolves over base layer during transition) */}
        {incomingSlide && (
          <motion.div
            key={incomingSlide.id}
            className="absolute inset-0 w-full h-full z-[2]"
            initial={
              shouldReduceMotion
                ? { opacity: 0, scale: 1, y: '0%' }
                : {
                    opacity: 0,
                    scale: incomingSlide.initialScale,
                    y: '0%',
                  }
            }
            animate={
              shouldReduceMotion
                ? { opacity: 1, scale: 1, y: '0%' }
                : {
                    opacity: 1,
                    scale: incomingSlide.targetScale,
                    y: incomingSlide.translateY,
                  }
            }
            transition={
              shouldReduceMotion
                ? { opacity: { duration: 0.8 } }
                : {
                    opacity: { duration: TRANSITION_DURATION_S, ease: [0.22, 1, 0.36, 1] },
                    scale: { duration: TOTAL_BREATH_DURATION_S, ease: 'easeOut' },
                    y: { duration: TOTAL_BREATH_DURATION_S, ease: 'easeOut' },
                  }
            }
          >
            <Image
              src={incomingSlide.src}
              alt={incomingSlide.alt}
              fill
              sizes={IMAGE_SIZES.hero}
              className={cn(
                'object-cover select-none',
                incomingSlide.mobilePositionClass,
                incomingSlide.desktopPositionClass
              )}
            />
          </motion.div>
        )}
      </motion.div>

      {/* Directional Luxury Scrim: Preserves authentic timber grain and ambient daylight while maintaining typography readability across all slides */}
      <div className="absolute inset-0 pointer-events-none z-[3]">
        {/* Bottom-to-top gradient protecting typography and CTA */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141110]/85 via-[#141110]/25 to-[#141110]/30" />

        {/* Directional lateral scrim: extra contrast behind title and slogan in LTR / RTL */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#141110]/40 via-[#141110]/10 to-transparent rtl:bg-gradient-to-l" />

        {/* Top scrim protecting navbar readability */}
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#141110]/45 to-transparent" />

        {/* Subtle ambient warmth wash unifies tonal temperature */}
        <div className="absolute inset-0 bg-[#161210]/10 mix-blend-multiply" />
      </div>

      {/* Main Hero Content Composition: Asymmetric, generous negative space — Typography is FIXED and never re-animates */}
      <motion.div
        style={shouldReduceMotion ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-14 pb-14 sm:pb-18 md:pb-20 pt-32"
      >
        <div className="max-w-3xl">
          {/* Subtle Editorial Eyebrow */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 mb-4 sm:mb-6"
          >
            <span className="w-6 h-[1px] bg-[#D69D78]/60 inline-block" />
            <span className="font-body text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-[#D69D78] font-medium">
              {content.eyebrow}
            </span>
          </motion.div>

          {/* Primary Slogan: The Architectural Focal Point */}
          <motion.h1
            aria-label={fullTagline}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className={
              locale === 'ar'
                ? 'font-arabic text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-[#FBF9F7] leading-[1.25] tracking-normal mb-4'
                : 'font-display text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-normal text-[#FBF9F7] leading-[1.04] tracking-tight mb-4'
            }
          >
            <span className="block">{sloganLine1}</span>
            <span className="block text-[#FBF9F7]/95 italic font-light font-display">
              {sloganLine2}
            </span>
          </motion.h1>

          {/* Secondary Arabic Craft Statement */}
          {locale === 'ar' && (
            <motion.p
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="font-arabic text-sm sm:text-base text-[#D69D78] font-light tracking-wide mb-6"
            >
              {brandConfig.craftStatement.ar}
            </motion.p>
          )}

          {/* Quiet Editorial CTA Navigation Cue */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="pt-4"
          >
            <Link
              href={`/${locale}/collection`}
              className="group inline-flex items-center gap-3 font-body text-xs uppercase tracking-[0.2em] text-[#FBF9F7]/90 hover:text-[#D69D78] transition-colors duration-300 py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C0784A]"
            >
              <span className="border-b border-transparent group-hover:border-[#D69D78]/60 pb-0.5 transition-colors">
                {content.ctaCollection}
              </span>
              <span
                className="inline-block transition-transform duration-300 group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5 rtl:rotate-180"
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          </motion.div>

          {/* Provenance Label: Authentic, localized craft specification truthful across all sequence slides */}
          <motion.p
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="font-body text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-[#FBF9F7]/50 mt-10 sm:mt-14 font-light"
          >
            {content.stats.handCraftedLabel} <span className="opacity-40 mx-2">·</span> {content.stats.limitedLabel}
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}

export default HeroSection;

