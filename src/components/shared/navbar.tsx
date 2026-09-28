'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { brandConfig } from '@/lib/brand.config';
import type { Locale } from '@/lib/i18n/config';
import type { NavigationContent } from '@/lib/i18n/types';
import { LanguageSwitcher } from '@/components/navigation/language-switcher';

interface NavbarProps {
  locale?: Locale;
  dict?: NavigationContent;
}

export function Navbar({ locale = 'fr', dict }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Scroll listener to transition navbar from hero overlay to scrolled state
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll and handle escape key when mobile menu is open
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') closeMenu();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isMenuOpen, closeMenu]);

  const labels = dict ?? {
    home: 'Accueil',
    collection: 'Collection',
    masterpiece: 'Pièce Maîtresse',
    process: 'Le Procédé',
    atelier: 'Atelier',
    contact: 'Contact',
    inquire: "S'informer",
  };

  const navLinks = [
    { href: `/${locale}/collection`, label: labels.collection },
    { href: `/${locale}/atelier`, label: labels.atelier },
    { href: `/${locale}/contact`, label: labels.contact },
  ];

  return (
    <>
      <header
        role="banner"
        className={cn(
          'fixed top-0 left-0 w-full z-40 transition-all duration-500',
          isScrolled
            ? 'bg-[#FAF8F5]/92 backdrop-blur-md py-4 border-b border-[#E8E4E0]/60 shadow-[0_2px_24px_rgba(0,0,0,0.03)] text-[#2A2421]'
            : 'bg-gradient-to-b from-[#141110]/55 via-[#141110]/20 to-transparent py-6 md:py-7 text-[#FBF9F7]'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-14 flex items-center justify-between">
          {/* Left: LUXAVÉN wordmark */}
          <Link
            href={`/${locale}`}
            className={cn(
              'font-display text-lg sm:text-xl tracking-[0.24em] uppercase font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C0784A]',
              isScrolled
                ? 'text-[#2A2421] hover:text-[#C0784A]'
                : 'text-[#FBF9F7] hover:text-[#D69D78]'
            )}
            aria-label={`${brandConfig.name} — Accueil`}
          >
            {brandConfig.name}
          </Link>

          {/* Center: Restrained Editorial Navigation Links */}
          <nav
            aria-label="Navigation principale"
            className="hidden md:flex items-center gap-10 lg:gap-14"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'font-body text-[11px] font-normal tracking-[0.16em] uppercase transition-colors duration-300 relative py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C0784A]',
                  isScrolled
                    ? 'text-[#2A2421]/80 hover:text-[#C0784A]'
                    : 'text-[#FBF9F7]/85 hover:text-[#FBF9F7]'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: Language Selector (Desktop) */}
          <div className="hidden md:flex items-center">
            <LanguageSwitcher currentLocale={locale} inverted={!isScrolled} />
          </div>

          {/* Mobile minimal menu trigger */}
          <div className="md:hidden flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className={cn(
                'p-2 -mr-2 transition-colors duration-300 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C0784A]',
                isScrolled ? 'text-[#2A2421]' : 'text-[#FBF9F7]'
              )}
              aria-expanded={isMenuOpen}
              aria-controls="luxaven-mobile-menu"
              aria-label="Ouvrir le menu de navigation"
            >
              <span className="font-body text-[10px] uppercase tracking-[0.2em] font-medium">
                Menu
              </span>
              <span className="w-5 flex flex-col gap-1 items-end">
                <span className="h-[1px] w-5 bg-current" />
                <span className="h-[1px] w-3.5 bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Editorial Mobile Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="luxaven-mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-[#141110]/98 backdrop-blur-2xl text-[#FBF9F7] flex flex-col justify-between p-6 sm:p-10 md:hidden"
          >
            {/* Top Bar inside Overlay */}
            <div className="flex items-center justify-between w-full border-b border-[#FBF9F7]/10 pb-5">
              <Link
                href={`/${locale}`}
                onClick={closeMenu}
                className="font-display text-lg tracking-[0.24em] uppercase font-medium text-[#FBF9F7]"
              >
                {brandConfig.name}
              </Link>
              <button
                type="button"
                onClick={closeMenu}
                className="p-2 text-[#FBF9F7]/80 hover:text-[#FBF9F7] flex items-center gap-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C0784A]"
                aria-label="Fermer le menu"
              >
                <span className="font-body text-[10px] uppercase tracking-[0.2em]">
                  Fermer
                </span>
                <span className="w-4 h-4 relative flex items-center justify-center">
                  <span className="absolute w-4 h-[1px] bg-current rotate-45" />
                  <span className="absolute w-4 h-[1px] bg-current -rotate-45" />
                </span>
              </button>
            </div>

            {/* Center Navigation Links with editorial cadence */}
            <nav className="flex flex-col py-10 space-y-7">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.href}
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + idx * 0.08, duration: 0.5 }}
                >
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className="group inline-flex items-baseline gap-4 font-display text-3xl sm:text-4xl font-light tracking-[0.04em] text-[#FBF9F7] hover:text-[#D69D78] transition-colors"
                  >
                    <span className="font-body text-[10px] tracking-[0.2em] text-[#D69D78] opacity-60">
                      0{idx + 1}
                    </span>
                    <span>{link.label}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom Section: Slogan & Language Switcher */}
            <div className="border-t border-[#FBF9F7]/10 pt-6 flex flex-col gap-4">
              <p className="font-body text-[10px] uppercase tracking-[0.22em] text-[#FBF9F7]/50">
                {brandConfig.tagline[locale]}
              </p>
              {locale === 'ar' && (
                <p className="font-arabic text-xs text-[#D69D78]/80 font-light">
                  {brandConfig.craftStatement.ar}
                </p>
              )}
              <div className="pt-2">
                <LanguageSwitcher currentLocale={locale} inverted={true} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
