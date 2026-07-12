import React from 'react';
import { Mail, Compass, Shield } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#5C3D2E] text-[#F7F5F3]/80 border-t border-[#E8E4E0]/15">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        
        {/* Three Columns Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {/* Column 1: Left */}
          <div>
            <h3 className="font-display text-xl tracking-[0.25em] text-[#F7F5F3] mb-6">
              DARILUX
            </h3>
            <p className="font-body text-xs leading-[1.6] text-[#F7F5F3]/70 max-w-xs font-light">
              Des objets qui portent le temps et l'espace. Façonnés à la main dans le respect de la matière brute et de la permanence.
            </p>
          </div>

          {/* Column 2: Center */}
          <div>
            <h4 className="font-body text-xs font-semibold tracking-[0.15em] uppercase text-[#C0784A] mb-6">
              L'ATELIER
            </h4>
            <ul className="space-y-3 font-body text-xs text-[#F7F5F3]/70 font-light">
              <li>Marta Atelier, 42</li>
              <li>Genève, Suisse</li>
              <li>inquiries@darilux.com</li>
            </ul>
          </div>

          {/* Column 3: Right */}
          <div>
            <h4 className="font-body text-xs font-semibold tracking-[0.15em] uppercase text-[#C0784A] mb-6">
              CONTACT & RÉSEAUX
            </h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-[#F7F5F3]/20 flex items-center justify-center text-[#F7F5F3] hover:bg-[#C0784A] hover:text-[#F7F5F3] hover:border-[#C0784A] transition-all duration-300"
              >
                <Compass className="w-4 h-4 stroke-[1.25]" />
              </a>
              <a
                href="mailto:inquiries@darilux.com"
                className="w-10 h-10 rounded-full border border-[#F7F5F3]/20 flex items-center justify-center text-[#F7F5F3] hover:bg-[#C0784A] hover:text-[#F7F5F3] hover:border-[#C0784A] transition-all duration-300"
              >
                <Mail className="w-4 h-4 stroke-[1.25]" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-[#F7F5F3]/20 flex items-center justify-center text-[#F7F5F3] hover:bg-[#C0784A] hover:text-[#F7F5F3] hover:border-[#C0784A] transition-all duration-300"
              >
                <Shield className="w-4 h-4 stroke-[1.25]" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#F7F5F3]/10 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between font-body text-[11px] text-[#F7F5F3]/50">
          <p>© {new Date().getFullYear()} Darilux. Tous droits réservés.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-[#F7F5F3] transition-colors">Confidentialité</a>
            <a href="#" className="hover:text-[#F7F5F3] transition-colors">Conditions d'Utilisation</a>
            <a href="#" className="hover:text-[#F7F5F3] transition-colors">Dossier de Presse</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
