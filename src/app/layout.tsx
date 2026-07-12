import type { Metadata } from "next";
import "./globals.css";

// Root layout for the Darilux website
// Loads Cormorant Garamond (display/luxury) + Inter (body/clean) via Google Fonts

export const metadata: Metadata = {
  title: "Darilux — Sculptures et Mobilier d'Art en Bois",
  description:
    "Darilux conçoit des objets décoratifs rares et faits main — totems sculpturaux, récipients tournés et mobilier architectural — pour des intérieurs qui valorisent la beauté et la permanence.",
  keywords: [
    "objets décoratifs de luxe",
    "mobilier sculptural",
    "art en bois fait main",
    "sculptures totémiques",
    "décoration d'intérieur designer",
    "mobilier d'art",
  ],
  openGraph: {
    title: "Darilux — Sculptures et Mobilier d'Art en Bois",
    description: "Des objets qui portent le temps et l'espace.",
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
