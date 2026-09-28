import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F7F5F3] flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center py-20">
        <span className="font-body text-xs tracking-[0.2em] uppercase text-[#C0784A] mb-4 block">
          404 — LUXAVÉN
        </span>
        <h1 className="text-4xl md:text-5xl font-display text-[#3B2F2F] mb-6">
          Page Introuvable
        </h1>
        <p className="font-body text-sm text-[#3B2F2F]/70 mb-10 leading-relaxed font-light">
          L&apos;œuvre ou la page recherchée n&apos;existe pas ou a été déplacée.
        </p>
        <Link
          href="/fr"
          className="inline-block bg-[#5C3D2E] text-[#F7F5F3] px-8 py-3.5 font-body text-xs font-medium tracking-[0.15em] uppercase hover:bg-[#3B2F2F] transition-all"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
