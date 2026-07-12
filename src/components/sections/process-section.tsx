'use client';

import React from 'react';
import { Compass, Hammer, Flower } from 'lucide-react';

export function ProcessSection() {
  const steps = [
    {
      num: '01',
      title: 'Sélection Éthique',
      desc: 'Nous sélectionnons des bois centenaires tombés naturellement ou issus de forêts suisses gérées de manière durable, en adaptant nos esquisses aux veines et nœuds uniques de chaque tronc.',
      icon: Compass
    },
    {
      num: '02',
      title: 'Tournage de Précision',
      desc: 'Nos artisans façonnent le bois brut à l\'aide de tours lourds et de gouges guidées à la main, pour révéler des géométries pures tout en préservant le caractère vivant de la matière.',
      icon: Hammer
    },
    {
      num: '03',
      title: 'Finition Naturelle',
      desc: 'Chaque pièce est polie patiemment et nourrie d\'huiles de lin pressées à froid et de cire d\'abeille biologique, laissant respirer le bois et révélant sa patine naturelle au fil des ans.',
      icon: Flower
    }
  ];

  return (
    <section id="process" className="py-[120px] bg-[#F7F5F3] border-b border-[#E8E4E0]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="mb-20">
          <span className="eyebrow text-[#C0784A] mb-4 block text-[11px] font-medium tracking-[0.15em]">
            LE PROCÉDÉ DE L'ATELIER
          </span>
          <h2 className="text-4xl md:text-[42px] font-display text-[#3B2F2F] leading-tight">
            Comment nous traduisons la nature en sculpture.
          </h2>
        </div>

        {/* Process Cards Row (three equal columns) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className="group flex flex-col p-8 bg-[#F7F5F3] border border-[#E8E4E0] hover:border-[#C0784A] rounded-none transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] relative"
              >
                {/* Top-right corner: Small circular icon */}
                <div className="absolute top-8 right-8 w-10 h-10 rounded-full border border-[#E8E4E0] group-hover:border-[#C0784A]/30 flex items-center justify-center text-[#3B2F2F]/60 group-hover:text-[#C0784A] transition-colors duration-300">
                  <Icon className="w-4 h-4 stroke-[1.25]" />
                </div>

                {/* Card Number */}
                <span className="font-display text-4xl text-[#C0784A] font-light mb-8 block">
                  {s.num}
                </span>

                {/* Card Title */}
                <h3 className="font-display text-2xl text-[#3B2F2F] mb-4 font-normal">
                  {s.title}
                </h3>

                {/* Card Description */}
                <p className="font-body text-[14px] text-[#3B2F2F]/80 leading-[1.6] font-light">
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
