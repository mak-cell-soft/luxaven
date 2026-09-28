'use client';

import React, { useState } from 'react';
import type { Locale } from '@/lib/i18n/config';
import type { ContactContent } from '@/lib/i18n/types';

interface ContactSectionProps {
  locale?: Locale;
  dict?: ContactContent;
}

export function ContactSection({ dict }: ContactSectionProps) {
  const [submitted, setSubmitted] = useState(false);

  const content = dict ?? {
    eyebrow: 'COMMISSIONS & CONCIERGERIE',
    title: "S'informer ou Visiter l'Atelier",
    description:
      "Vous souhaitez acquérir une œuvre existante ou commander une pièce sur mesure pour votre projet d'architecture d'intérieur ? Contactez notre atelier ci-dessous.",
    successTitle: 'Demande reçue',
    successMessage:
      "Merci pour votre intérêt. Un représentant de l'atelier vous répondra dans un délai de 48 heures.",
    fields: {
      nameLabel: 'NOM COMPLET',
      namePlaceholder: 'Ex. Jean Dupont',
      emailLabel: 'ADRESSE E-MAIL',
      emailPlaceholder: 'nom@domaine.com',
      requestTypeLabel: 'TYPE DE DEMANDE',
      options: [
        'Acquérir une œuvre de la collection',
        'Projet de commande résidentielle sur mesure',
        "Demander une visite privée de l'atelier",
        "Collaboration avec architecte d'intérieur",
      ],
      messageLabel: 'MESSAGE / NOTES DE SPÉCIFICATION',
      messagePlaceholder:
        'Décrivez votre espace, vos dimensions ou vos essences de bois préférées...',
      submit: 'ENVOYER LA DEMANDE',
    },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-[120px] bg-[#F7F5F3] px-6 md:px-12">
      <div className="max-w-4xl mx-auto border border-[#E8E4E0] bg-white p-8 md:p-16 rounded-none shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
        <div className="text-center mb-16">
          <span className="eyebrow text-[#C0784A] mb-4 block text-[11px] font-medium tracking-[0.15em]">
            {content.eyebrow}
          </span>
          <h2 className="text-4xl md:text-[42px] font-display text-[#3B2F2F] mb-4 leading-tight">
            {content.title}
          </h2>
          <p className="font-body text-sm text-[#3B2F2F]/70 max-w-[500px] mx-auto leading-relaxed font-light">
            {content.description}
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-12">
            <h3 className="font-display text-2xl text-[#C0784A] mb-4">{content.successTitle}</h3>
            <p className="font-body text-sm text-[#3B2F2F]/80">
              {content.successMessage}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-10 font-body">
            {/* Form fields side by side on desktop, stacked on mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-[11px] uppercase tracking-[0.15em] text-[#3B2F2F] mb-2 font-medium">
                  {content.fields.nameLabel}
                </label>
                <input
                  type="text"
                  required
                  placeholder={content.fields.namePlaceholder}
                  className="w-full bg-transparent border-t-0 border-x-0 border-b border-[#E8E4E0] px-0 py-3 text-sm focus:outline-none focus:border-[#C0784A] transition-colors rounded-none placeholder-[#3B2F2F]/30"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-[0.15em] text-[#3B2F2F] mb-2 font-medium">
                  {content.fields.emailLabel}
                </label>
                <input
                  type="email"
                  required
                  placeholder={content.fields.emailPlaceholder}
                  className="w-full bg-transparent border-t-0 border-x-0 border-b border-[#E8E4E0] px-0 py-3 text-sm focus:outline-none focus:border-[#C0784A] transition-colors rounded-none placeholder-[#3B2F2F]/30"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-[0.15em] text-[#3B2F2F] mb-2 font-medium">
                {content.fields.requestTypeLabel}
              </label>
              <select className="w-full bg-transparent border-t-0 border-x-0 border-b border-[#E8E4E0] px-0 py-3 text-sm focus:outline-none focus:border-[#C0784A] transition-colors rounded-none text-[#3B2F2F]/80">
                {content.fields.options.map((option, idx) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-[0.15em] text-[#3B2F2F] mb-2 font-medium">
                {content.fields.messageLabel}
              </label>
              <textarea
                rows={4}
                required
                placeholder={content.fields.messagePlaceholder}
                className="w-full bg-transparent border-t-0 border-x-0 border-b border-[#E8E4E0] px-0 py-3 text-sm focus:outline-none focus:border-[#C0784A] transition-colors rounded-none placeholder-[#3B2F2F]/30 resize-none"
              />
            </div>

            {/* Submit */}
            <div className="text-center pt-4">
              <button
                type="submit"
                className="w-full md:w-auto bg-[#5C3D2E] text-[#F7F5F3] px-10 py-4 font-body text-xs font-medium tracking-[0.15em] uppercase rounded-none hover:bg-[#3B2F2F] hover:translate-y-[-2px] transition-all duration-300 shadow-sm cursor-pointer"
              >
                {content.fields.submit}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
