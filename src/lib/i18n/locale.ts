import { DEFAULT_LOCALE, LOCALES, LOCALE_CONFIGS, type Direction, type Locale, type LocaleMeta } from './config';

/**
 * Type guard to check if a given string is a supported Locale.
 */
export function isLocale(value: unknown): value is Locale {
  if (typeof value !== 'string') return false;
  return (LOCALES as readonly string[]).includes(value);
}

/**
 * Returns the text direction ('ltr' or 'rtl') for a given locale.
 */
export function getDirection(locale: Locale): Direction {
  return LOCALE_CONFIGS[locale]?.dir ?? 'ltr';
}

/**
 * Returns the full locale metadata configuration.
 */
export function getLocaleConfig(locale: Locale): LocaleMeta {
  return LOCALE_CONFIGS[locale] ?? LOCALE_CONFIGS[DEFAULT_LOCALE];
}

/**
 * Checks if the locale is right-to-left.
 */
export function isRtl(locale: Locale): boolean {
  return LOCALE_CONFIGS[locale]?.isRtl ?? false;
}
