'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { LOCALES, LOCALE_CONFIGS, type Locale } from '@/lib/i18n/config';

interface LanguageSwitcherProps {
  currentLocale: Locale;
  className?: string;
  inverted?: boolean;
}

export function LanguageSwitcher({ currentLocale, className = '', inverted = false }: LanguageSwitcherProps) {
  const pathname = usePathname();

  // Helper to generate the target pathname for another locale
  const getTargetUrl = (targetLocale: Locale) => {
    if (!pathname) return `/${targetLocale}`;

    const segments = pathname.split('/');
    // segments[0] is "", segments[1] is the locale if present
    if (segments.length > 1 && (LOCALES as readonly string[]).includes(segments[1])) {
      segments[1] = targetLocale;
      return segments.join('/') || `/${targetLocale}`;
    }

    return `/${targetLocale}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
  };

  return (
    <div
      aria-label="Language Selector"
      role="region"
      className={`inline-flex items-center gap-1 text-[11px] font-body tracking-[0.14em] uppercase ${className}`}
    >
      {LOCALES.map((locale, idx) => {
        const isActive = locale === currentLocale;
        return (
          <React.Fragment key={locale}>
            {idx > 0 && (
              <span className={`select-none text-[10px] ${inverted ? 'text-[#FBF9F7]/30' : 'text-[#3B2F2F]/20'}`}>
                /
              </span>
            )}
            <Link
              href={getTargetUrl(locale)}
              hrefLang={locale}
              className={`px-1 py-0.5 transition-colors duration-200 cursor-pointer ${
                isActive
                  ? inverted
                    ? 'text-[#D69D78] font-semibold'
                    : 'text-[#C0784A] font-semibold'
                  : inverted
                  ? 'text-[#FBF9F7]/70 hover:text-[#FBF9F7]'
                  : 'text-[#3B2F2F]/60 hover:text-[#3B2F2F]'
              }`}
              title={LOCALE_CONFIGS[locale].name}
              aria-current={isActive ? 'true' : undefined}
            >
              {locale.toUpperCase()}
            </Link>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default LanguageSwitcher;
