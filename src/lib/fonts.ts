import { Cormorant_Garamond, Tenor_Sans, Readex_Pro } from 'next/font/google';

export const fontDisplay = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

export const fontBody = Tenor_Sans({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-body',
  display: 'swap',
});

export const fontArabic = Readex_Pro({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-arabic',
  display: 'swap',
});

/**
 * Returns the font CSS variable class names appropriate for a given locale.
 */
export function getFontVariables(locale: string): string {
  if (locale === 'ar') {
    return `${fontDisplay.variable} ${fontArabic.variable}`;
  }
  return `${fontDisplay.variable} ${fontBody.variable}`;
}
