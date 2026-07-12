'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export function FeaturedSection() {
  return (
    <section id="featured" className="py-28 md:py-36 bg-[#5C3D2E] text-[#F7F5F3] overflow-hidden relative border-b border-[#E8E4E0]/15">
      {/* Editorial background gradient overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_70%_120%,rgba(192,120,74,0.15),transparent_50%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          
          {/* Left Column: Image Side */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/5] bg-[#F7F5F3]/5 border border-[#F7F5F3]/10 rounded-xl overflow-hidden shadow-2xl group cursor-pointer"
            >
              <img
                src="/images/sarilux2.jpeg"
                alt="Table d'Accent Sculpturale Sphaera"
                className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-700" />
            </motion.div>
          </div>

          {/* Right Column: Text & Specs Side */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <span className="font-body text-xs tracking-[0.25em] text-[#C0784A] uppercase mb-4 block font-medium">
                ŒUVRE MAÎTRESSE
              </span>
              <h2 className="text-4xl md:text-5xl font-display text-[#F7F5F3] mb-8 leading-tight tracking-tight">
                La Table Console Sphaera
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.1 }}
              className="space-y-6"
            >
              <p className="font-body text-sm text-[#F7F5F3]/85 leading-relaxed font-light">
                Formée par la superposition de sphères en noyer suisse massif, la console Sphaera se dresse comme un monument d'équilibre et de matière. Chaque sphère est tournée à la main par nos maîtres artisans, capturant la tension dynamique de la gravité.
              </p>
              <p className="font-body text-sm text-[#F7F5F3]/75 leading-relaxed font-light">
                Conçue pour être le point focal d'une entrée majestueuse ou d'une galerie d'art, cette œuvre en édition limitée représente le sommet des explorations matérielles actuelles de notre atelier.
              </p>
              
              {/* Specs Table */}
              <div className="grid grid-cols-2 gap-8 my-8 border-y border-[#F7F5F3]/10 py-8">
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-[#F7F5F3]/50 mb-2 font-medium">
                    Édition
                  </span>
                  <span className="font-display text-xl text-[#F7F5F3] font-light">
                    Série limitée à 12 exemplaires
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-[#F7F5F3]/50 mb-2 font-medium">
                    Matériau
                  </span>
                  <span className="font-display text-xl text-[#F7F5F3] font-light">
                    Noyer Massif Suisse
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <Button variant="outline" className="h-12 px-8 border-[#F7F5F3]/30 text-[#F7F5F3] hover:bg-[#F7F5F3] hover:text-[#5C3D2E] transition-colors duration-300 cursor-pointer" asChild>
                  <a href="#contact">Demander une Visite Privée</a>
                </Button>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
