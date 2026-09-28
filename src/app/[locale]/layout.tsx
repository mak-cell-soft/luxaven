import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import '../globals.css';
import { LOCALES } from '@/lib/i18n/config';
import { isLocale, getDirection } from '@/lib/i18n/locale';
import { getFontVariables } from '@/lib/fonts';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { OrganizationJsonLd } from '@/components/seo/json-ld';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return {};
  }
  return generatePageMetadata({ locale });
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dir = getDirection(locale);
  const fontClasses = getFontVariables(locale);

  return (
    <html lang={locale} dir={dir} className={fontClasses}>
      <body className="antialiased min-h-screen flex flex-col">
        <OrganizationJsonLd locale={locale} />
        {children}
      </body>
    </html>
  );
}
