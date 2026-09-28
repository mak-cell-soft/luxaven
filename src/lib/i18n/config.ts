/**
 * i18n Configuration — LUXAVÉN
 *
 * Defines supported locales, default locale, text directions,
 * and locale metadata for the application.
 */

export const LOCALES = ['fr', 'en', 'de', 'ar'] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'fr';

export const RTL_LOCALES: readonly Locale[] = ['ar'] as const;

export type Direction = 'ltr' | 'rtl';

export interface LocaleMeta {
  readonly code: Locale;
  readonly name: string;
  readonly nativeName: string;
  readonly dir: Direction;
  readonly isRtl: boolean;
  readonly htmlLang: string;
}

export const LOCALE_CONFIGS: Record<Locale, LocaleMeta> = {
  fr: {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    dir: 'ltr',
    isRtl: false,
    htmlLang: 'fr',
  },
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    dir: 'ltr',
    isRtl: false,
    htmlLang: 'en',
  },
  de: {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    dir: 'ltr',
    isRtl: false,
    htmlLang: 'de',
  },
  ar: {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    dir: 'rtl',
    isRtl: true,
    htmlLang: 'ar',
  },
} as const;
