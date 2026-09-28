import React from 'react';
import Link from 'next/link';
import { Mail, Compass, Shield } from 'lucide-react';
import { brandConfig } from '@/lib/brand.config';
import type { Locale } from '@/lib/i18n/config';
import type { FooterContent } from '@/lib/i18n/types';

interface FooterProps {
  locale?: Locale;
  dict?: FooterContent;
}

export function Footer({ locale = 'fr', dict }: FooterProps) {
  const content = dict ?? {
    description:
      "Des objets qui portent le temps et l'espace. Façonnés à la main dans le respect de la matière brute et de la permanence.",
    tagline: brandConfig.tagline[locale],
    atelierTitle: "L'ATELIER",
    contactTitle: 'CONTACT & RÉSEAUX',
    copyrightSuffix: 'Tous droits réservés.',
    privacy: 'Confidentialité',
    terms: "Conditions d'Utilisation",
    pressKit: 'Dossier de Presse',
  };

  return (
    <footer className="bg-[#5C3D2E] text-[#F7F5F3]/80 border-t border-[#E8E4E0]/15 mt-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        
        {/* Three Columns Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {/* Column 1: Left */}
          <div>
            <h3 className="font-display text-xl tracking-[0.25em] text-[#F7F5F3] mb-2">
              {brandConfig.name}
            </h3>
            <p className="font-body text-[11px] tracking-[0.12em] text-[#C0784A] mb-4 font-normal">
              {content.tagline || brandConfig.tagline[locale]}
            </p>
            <p className="font-body text-xs leading-[1.6] text-[#F7F5F3]/70 max-w-xs font-light">
              {content.description}
            </p>
          </div>

          {/* Column 2: Center */}
          <div>
            <h4 className="font-body text-xs font-semibold tracking-[0.15em] uppercase text-[#C0784A] mb-6">
              {content.atelierTitle}
            </h4>
            <ul className="space-y-3 font-body text-xs text-[#F7F5F3]/70 font-light">
              <li>{brandConfig.atelier.address}</li>
              <li>{brandConfig.atelier.city}, {brandConfig.atelier.country}</li>
              <li>{brandConfig.contactEmail}</li>
            </ul>
          </div>

          {/* Column 3: Right */}
          <div>
            <h4 className="font-body text-xs font-semibold tracking-[0.15em] uppercase text-[#C0784A] mb-6">
              {content.contactTitle}
            </h4>
            <div className="flex gap-4">
              <a
                href="#"
                aria-label="Compass"
                className="w-10 h-10 rounded-full border border-[#F7F5F3]/20 flex items-center justify-center text-[#F7F5F3] hover:bg-[#C0784A] hover:text-[#F7F5F3] hover:border-[#C0784A] transition-all duration-300"
              >
                <Compass className="w-4 h-4 stroke-[1.25]" />
              </a>
              <a
                href={`mailto:${brandConfig.contactEmail}`}
                aria-label="Mail"
                className="w-10 h-10 rounded-full border border-[#F7F5F3]/20 flex items-center justify-center text-[#F7F5F3] hover:bg-[#C0784A] hover:text-[#F7F5F3] hover:border-[#C0784A] transition-all duration-300"
              >
                <Mail className="w-4 h-4 stroke-[1.25]" />
              </a>
              <a
                href="#"
                aria-label="Certification"
                className="w-10 h-10 rounded-full border border-[#F7F5F3]/20 flex items-center justify-center text-[#F7F5F3] hover:bg-[#C0784A] hover:text-[#F7F5F3] hover:border-[#C0784A] transition-all duration-300"
              >
                <Shield className="w-4 h-4 stroke-[1.25]" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#F7F5F3]/10 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between font-body text-[11px] text-[#F7F5F3]/50">
          <p>© {new Date().getFullYear()} {brandConfig.name}. {content.copyrightSuffix}</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href={`/${locale}/contact`} className="hover:text-[#F7F5F3] transition-colors">
              {content.privacy}
            </Link>
            <Link href={`/${locale}/contact`} className="hover:text-[#F7F5F3] transition-colors">
              {content.terms}
            </Link>
            <Link href={`/${locale}/contact`} className="hover:text-[#F7F5F3] transition-colors">
              {content.pressKit}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
