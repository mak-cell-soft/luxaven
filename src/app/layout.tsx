import type { Metadata } from "next";
import "./globals.css";
import { brandConfig } from "@/lib/brand.config";

// Root layout for LUXAVÉN website
// Loads Cormorant Garamond (display/luxury) + Inter (body/clean) via Google Fonts

export const metadata: Metadata = {
  metadataBase: new URL(brandConfig.url),
  title: `${brandConfig.name} — ${brandConfig.tagline}`,
  description: brandConfig.description,
  keywords: [
    "objets décoratifs de luxe",
    "mobilier sculptural",
    "art en bois fait main",
    "sculptures totémiques",
    "décoration d'intérieur designer",
    "mobilier d'art",
  ],
  openGraph: {
    title: `${brandConfig.name} — ${brandConfig.tagline}`,
    description: "Des objets qui portent le temps et l'espace.",
    url: brandConfig.url,
    siteName: brandConfig.name,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        {/* Google Fonts: Cormorant Garamond for display / Inter for body */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
