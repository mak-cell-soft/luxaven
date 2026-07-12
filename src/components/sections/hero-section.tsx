'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-[#F7F5F3] flex items-center pt-28 pb-16 overflow-hidden">
      {/* Decorative architectural grid lines */}
      <div className="absolute top-0 right-1/3 w-[1px] h-full bg-[#E8E4E0]/40 hidden lg:block" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Right Column (Image First on Mobile) */}
          <div className="lg:col-span-5 order-first lg:order-last relative flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-[380px] aspect-[3/4]"
            >
              {/* Overlapping back decorative offset card (12px offset) */}
              <div className="absolute inset-0 bg-[#E8E4E0] border border-[#E8E4E0] translate-x-3 translate-y-3 rounded-[16px] -z-10" />

              {/* Main image card (16px rounded corners, shadow 0 20px 60px) */}
              <div className="w-full h-full bg-[#E8E4E0]/30 border border-[#E8E4E0] overflow-hidden rounded-[16px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] relative group">
                <img
                  src="/images/darilux5.jpeg"
                  alt="Sculptures Totems Darilux"
                  className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-103"
                />
                
                {/* Caption overlay at bottom */}
                <div className="absolute bottom-6 left-6 right-6 bg-[#FFFFFF]/90 backdrop-blur-md border border-[#E8E4E0] p-4 rounded-lg shadow-md flex items-center justify-between">
                  <div>
                    <span className="block font-display text-sm text-[#3B2F2F] font-medium">Totems N°5 & N°6</span>
                    <span className="block font-body text-[9px] uppercase tracking-[0.15em] text-[#C0784A] mt-0.5">
                      BOIS DE FRÊNE HUILÉ
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-[#E8E4E0] flex items-center justify-center">
                    <span className="font-display text-[10px] text-[#3B2F2F]">Ltd.</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Left Column: Text & Content */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="eyebrow text-[#C0784A] text-[11px] font-medium tracking-[0.15em]">
                — L'ATELIER DES OBJETS RARES
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl md:text-[64px] font-display text-[#3B2F2F] leading-[1.1] tracking-tight mb-8"
            >
              Des objets qui <br />
              <span className="italic font-light text-[#C0784A]">portent le temps et l'espace</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="font-body text-sm md:text-base text-[#3B2F2F] max-w-[380px] mb-10 leading-[1.6] font-light"
            >
              Créés en Suisse dans des essences nobles de noyer et de chêne massif, façonnés à la main pour capturer le silence et la permanence du bois.
            </motion.p>

            {/* CTA row (Two buttons side by side) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-8 mb-16"
            >
              <a
                href="#collection"
                className="bg-[#5C3D2E] text-[#F7F5F3] px-8 py-4 font-body text-xs font-medium tracking-[0.15em] uppercase rounded-none hover:bg-[#3B2F2F] hover:translate-y-[-2px] transition-all duration-300 shadow-sm cursor-pointer"
              >
                EXPLORER LA COLLECTION
              </a>
              <a
                href="#philosophy"
                className="group font-body text-[11px] font-medium tracking-[0.15em] text-[#3B2F2F] hover:text-[#C0784A] uppercase relative py-1 cursor-pointer"
              >
                NOTRE PROCÉDÉ
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#3B2F2F] scale-x-100 group-hover:scale-x-0 group-hover:bg-[#C0784A] transition-transform duration-300 origin-left" />
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#C0784A] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </a>
            </motion.div>

            {/* Stats row (horizontal scroll or 2x2 grid on mobile) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex gap-12 overflow-x-auto pb-4 lg:pb-0 scrollbar-none snap-x max-w-lg border-t border-[#E8E4E0] pt-8"
            >
              <div className="snap-start shrink-0 min-w-[100px]">
                <span className="block font-display text-3xl text-[#3B2F2F] font-light">100%</span>
                <span className="block font-body text-[10px] uppercase tracking-[0.15em] text-[#3B2F2F]/50 mt-1">
                  BOIS SUISSE
                </span>
              </div>
              <div className="snap-start shrink-0 min-w-[120px]">
                <span className="block font-display text-3xl text-[#3B2F2F] font-light font-italic italic">Main</span>
                <span className="block font-body text-[10px] uppercase tracking-[0.15em] text-[#3B2F2F]/50 mt-1">
                  SCULPTÉ & TOURNÉ
                </span>
              </div>
              <div className="snap-start shrink-0 min-w-[120px]">
                <span className="block font-display text-3xl text-[#3B2F2F] font-light">Lim.</span>
                <span className="block font-body text-[10px] uppercase tracking-[0.15em] text-[#3B2F2F]/50 mt-1">
                  ÉDITIONS LIMITÉES
                </span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
