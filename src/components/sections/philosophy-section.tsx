'use client';

import React from 'react';
import ClippedMediaGallery from '@/components/ui/clip-path-image';
import { motion } from 'framer-motion';
import { brandConfig } from '@/lib/brand.config';
import type { Locale } from '@/lib/i18n/config';
import type { PhilosophyContent } from '@/lib/i18n/types';

interface PhilosophySectionProps {
  locale?: Locale;
  dict?: PhilosophyContent;
}

export function PhilosophySection({ dict }: PhilosophySectionProps) {
  const content = dict ?? {
    eyebrow: 'NOTRE PHILOSOPHIE',
    titlePrefix: 'Dialogue avec le bois,',
    titleHighlight: 'forme par forme',
    paragraph1:
      `Chaque création de ${brandConfig.name} commence par un tronc brut de noyer ou de chêne issu de forêts locales gérées durablement. Nous n'imposons pas de design prédéfini ; nous écoutons les nœuds, le fil et les failles du bois.`,
    quote:
      "Le bois nous indique où couper. Nous suivons simplement le fil jusqu'à ce que la sculpture révèle sa propre gravité.",
    quoteAuthor: '— MARTA ATELIER, MAÎTRE ARTISAN',
    paragraph2:
      "Nos compositions géométriques et nos totems élancés réintroduisent la force tranquille de la nature dans l'espace habitable.",
  };

  return (
    <section id="philosophy" className="py-[120px] bg-[#F7F5F3] border-b border-[#E8E4E0] relative overflow-hidden">
      {/* Soft background shape */}
      <div className="absolute top-1/4 inset-inline-start-10 w-64 h-64 bg-[#C0784A]/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Column (40% width on desktop) */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="eyebrow text-[#C0784A] mb-4 block text-[11px] font-medium tracking-[0.15em]">
              {content.eyebrow}
            </span>
            <h2 className="text-4xl md:text-[48px] font-display text-[#3B2F2F] mb-8 leading-[1.1] tracking-tight">
              {content.titlePrefix} <br />
              <span className="italic font-light text-[#C0784A]">{content.titleHighlight}</span>.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.1 }}
            className="space-y-6"
          >
            <p className="font-body text-sm text-[#3B2F2F] leading-[1.6] font-light">
              {content.paragraph1}
            </p>
            
            {/* Pull quote in italic serif */}
            <blockquote className="border-s-2 border-[#C0784A] ps-6 py-2 my-8">
              <p className="font-display italic text-[18px] md:text-[20px] text-[#C0784A] leading-relaxed">
                &ldquo;{content.quote}&rdquo;
              </p>
              <cite className="font-body text-[11px] font-medium uppercase tracking-[0.15em] text-[#3B2F2F]/50 block mt-3 not-italic">
                {content.quoteAuthor}
              </cite>
            </blockquote>

            <p className="font-body text-sm text-[#3B2F2F] leading-[1.6] font-light">
              {content.paragraph2}
            </p>
          </motion.div>
        </div>

        {/* Right Column: Clipped Media Gallery (60% width on desktop) */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Organic, overlapping cluster with soft shadows and irregular shapes */}
            <div className="absolute inset-0 bg-[#E8E4E0]/10 translate-x-4 -translate-y-4 rounded-xl -z-10" />
            <ClippedMediaGallery className="shadow-[0_20px_60px_rgba(0,0,0,0.06)]" />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
