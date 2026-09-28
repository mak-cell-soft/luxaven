import type { Locale } from './config';
import type { Dictionary } from './types';

const dictionaries: Record<Locale, () => Promise<{ default: Dictionary }>> = {
  fr: () => import('@/content/fr/dictionary'),
  en: () => import('@/content/en/dictionary'),
  de: () => import('@/content/de/dictionary'),
  ar: () => import('@/content/ar/dictionary'),
};

/**
 * Type-safe dictionary loader for server components.
 */
export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const loadFn = dictionaries[locale] ?? dictionaries.fr;
  const dictModule = await loadFn();
  return dictModule.default;
}
