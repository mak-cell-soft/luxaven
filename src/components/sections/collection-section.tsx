'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface ProductItem {
  id: string;
  name: string;
  category: 'totem' | 'mobilier' | 'vase';
  material: string;
  dimensions: string;
  image: string;
  price: string;
}

const PRODUCTS: ProductItem[] = [
  {
    id: 'p1',
    name: 'Totem d\'Atelier N°1',
    category: 'totem',
    material: 'Chêne Massif Tourné',
    dimensions: '180 x 30 x 30 cm',
    image: '/images/darilux5.jpeg',
    price: 'Tarif sur demande'
  },
  {
    id: 'p2',
    name: 'Totem Sculptural N°3',
    category: 'totem',
    material: 'Terre Cuite Naturelle & Argile',
    dimensions: '190 x 35 x 35 cm',
    image: '/images/darilux3.jpeg',
    price: 'Tarif sur demande'
  },
  {
    id: 'p3',
    name: 'Table de Repas Monolithe',
    category: 'mobilier',
    material: 'Noyer Brossé & Chêne',
    dimensions: '220 x 100 x 75 cm',
    image: '/images/darilux7.jpeg',
    price: 'Tarif sur demande'
  },
  {
    id: 'p4',
    name: 'Piliers Totémiques en Chêne',
    category: 'totem',
    material: 'Chêne Huilé Tourné',
    dimensions: '160 x 28 x 28 cm',
    image: '/images/darilux4.jpeg',
    price: 'Tarif sur demande'
  },
  {
    id: 'p5',
    name: 'Vases Tournés (Lot de 7)',
    category: 'vase',
    material: 'Frêne, Chêne & Noyer Mixtes',
    dimensions: 'Hauteurs variables (30-80cm)',
    image: '/images/darilux6.jpeg',
    price: 'Tarif sur demande'
  },
  {
    id: 'p6',
    name: 'Chaise Sphaera',
    category: 'mobilier',
    material: 'Chêne Sculpté & Velours Bouclé',
    dimensions: '85 x 60 x 65 cm',
    image: '/images/darilux8.jpeg',
    price: 'Tarif sur demande'
  }
];

export function CollectionSection() {
  const [filter, setFilter] = useState<'all' | 'totem' | 'mobilier' | 'vase'>('all');

  const filteredProducts = PRODUCTS.filter(
    (p) => filter === 'all' || p.category === filter
  );

  return (
    <section id="collection" className="py-[120px] bg-[#F7F5F3] border-b border-[#E8E4E0]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <span className="eyebrow text-[#C0784A] mb-4 block text-[11px] font-medium tracking-[0.15em]">
              L'ATELIER
            </span>
            <h2 className="text-4xl md:text-[48px] font-display text-[#3B2F2F] leading-none tracking-tight">
              Collections Actuelles
            </h2>
          </div>

          {/* Filter Tabs (uppercase, 11px, active has underline) */}
          <div className="flex items-center gap-4 md:gap-8 border-b border-[#E8E4E0] pb-2">
            {(['all', 'totem', 'mobilier', 'vase'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`font-body text-[11px] tracking-[0.12em] uppercase pb-2 px-1 relative transition-all duration-300 cursor-pointer font-medium ${
                  filter === cat ? 'text-[#C0784A]' : 'text-[#3B2F2F]/60 hover:text-[#3B2F2F]'
                }`}
              >
                {cat === 'all' ? 'TOUTES LES ŒUVRES' : cat + 's'}
                {filter === cat && (
                  <motion.div
                    layoutId="activeFilterUnderline"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C0784A]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid (3 columns, gap 24px) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((p) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              key={p.id}
              className="group flex flex-col bg-white border border-[#E8E4E0] hover:border-[#C0784A]/60 p-4 rounded-[12px] transition-all duration-500 cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)]"
            >
              {/* Product Card Image container (~3:4 aspect ratio, rounded corners 12px) */}
              <div className="relative overflow-hidden aspect-[3/4] bg-[#F7F5F3] rounded-[12px] mb-5 border border-[#E8E4E0]/40">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-[#3B2F2F]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Category Badge */}
                <span className="absolute top-4 right-4 bg-[#FFFFFF]/90 backdrop-blur-md border border-[#E8E4E0] px-3 py-1 font-body text-[9px] tracking-[0.15em] uppercase text-[#3B2F2F] rounded-full font-medium shadow-sm">
                  {p.category}
                </span>
              </div>

              {/* Card Meta Content */}
              <div className="flex flex-col flex-grow">
                <h3 className="font-display text-2xl text-[#3B2F2F] group-hover:text-[#C0784A] transition-colors duration-300 leading-tight font-medium">
                  {p.name}
                </h3>
                <p className="font-body text-xs text-[#3B2F2F]/70 mt-2 leading-relaxed">
                  {p.material}
                </p>
                <p className="font-body text-[10px] uppercase tracking-[0.15em] text-[#3B2F2F]/45 mt-1">
                  Dimensions: {p.dimensions}
                </p>
              </div>

              {/* Action area */}
              <div className="mt-5 pt-4 border-t border-[#E8E4E0] flex justify-between items-center">
                <span className="font-body text-xs text-[#3B2F2F]/80 font-light">{p.price}</span>
                <Button variant="link" className="p-0 text-[#3B2F2F] hover:text-[#C0784A] font-body text-xs uppercase tracking-[0.15em] font-medium cursor-pointer" asChild>
                  <a href="#contact">S'INFORMER</a>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation Arrows at bottom-left */}
        <div className="flex items-center gap-3 mt-12">
          <button className="w-10 h-10 rounded-full border border-[#3B2F2F]/30 flex items-center justify-center text-[#3B2F2F] hover:bg-[#5C3D2E] hover:text-[#F7F5F3] hover:border-[#5C3D2E] transition-all duration-300 cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button className="w-10 h-10 rounded-full border border-[#3B2F2F]/30 flex items-center justify-center text-[#3B2F2F] hover:bg-[#5C3D2E] hover:text-[#F7F5F3] hover:border-[#5C3D2E] transition-all duration-300 cursor-pointer">
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
