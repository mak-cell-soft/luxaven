'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 py-6 border-b border-transparent",
        isScrolled ? "bg-[#F7F5F3]/95 backdrop-blur-md py-4 border-[#E8E4E0] shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand wordmark */}
        <a href="#" className="font-display text-xl tracking-[0.2em] text-[#3B2F2F] font-semibold uppercase">
          DARILUX
        </a>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#philosophy" className="nav-link font-body text-[11px] font-medium tracking-[0.12em] text-[#3B2F2F]/80 hover:text-[#C0784A] uppercase transition-colors duration-300">
            PHILOSOPHIE
          </a>
          <a href="#collection" className="nav-link font-body text-[11px] font-medium tracking-[0.12em] text-[#3B2F2F]/80 hover:text-[#C0784A] uppercase transition-colors duration-300">
            COLLECTION
          </a>
          <a href="#featured" className="nav-link font-body text-[11px] font-medium tracking-[0.12em] text-[#3B2F2F]/80 hover:text-[#C0784A] uppercase transition-colors duration-300">
            PIÈCE MAÎTRESSE
          </a>
          <a href="#process" className="nav-link font-body text-[11px] font-medium tracking-[0.12em] text-[#3B2F2F]/80 hover:text-[#C0784A] uppercase transition-colors duration-300">
            LE PROCÉDÉ
          </a>
          <a href="#contact" className="nav-link font-body text-[11px] font-medium tracking-[0.12em] text-[#3B2F2F]/80 hover:text-[#C0784A] uppercase transition-colors duration-300">
            ATELIER
          </a>
        </div>

        {/* Right Button */}
        <div className="hidden md:block">
          <a
            href="#contact"
            className="border border-[#3B2F2F]/40 px-5 py-2 font-body text-[11px] tracking-[0.15em] uppercase text-[#3B2F2F] hover:bg-[#5C3D2E] hover:text-[#F7F5F3] hover:border-[#5C3D2E] transition-all duration-300 cursor-pointer"
          >
            S'INFORMER
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-[#3B2F2F] hover:text-[#C0784A] transition-colors cursor-pointer"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#F7F5F3] border-b border-[#E8E4E0] py-8 px-6 space-y-6 flex flex-col shadow-lg animate-fade-in-up">
          <a
            href="#philosophy"
            onClick={() => setIsMenuOpen(false)}
            className="font-body text-xs font-medium tracking-[0.12em] text-[#3B2F2F] hover:text-[#C0784A] uppercase"
          >
            PHILOSOPHIE
          </a>
          <a
            href="#collection"
            onClick={() => setIsMenuOpen(false)}
            className="font-body text-xs font-medium tracking-[0.12em] text-[#3B2F2F] hover:text-[#C0784A] uppercase"
          >
            COLLECTION
          </a>
          <a
            href="#featured"
            onClick={() => setIsMenuOpen(false)}
            className="font-body text-xs font-medium tracking-[0.12em] text-[#3B2F2F] hover:text-[#C0784A] uppercase"
          >
            PIÈCE MAÎTRESSE
          </a>
          <a
            href="#process"
            onClick={() => setIsMenuOpen(false)}
            className="font-body text-xs font-medium tracking-[0.12em] text-[#3B2F2F] hover:text-[#C0784A] uppercase"
          >
            LE PROCÉDÉ
          </a>
          <a
            href="#contact"
            onClick={() => setIsMenuOpen(false)}
            className="font-body text-xs font-medium tracking-[0.12em] text-[#3B2F2F] hover:text-[#C0784A] uppercase"
          >
            ATELIER
          </a>
          <a
            href="#contact"
            onClick={() => setIsMenuOpen(false)}
            className="border border-[#3B2F2F]/40 text-center py-3 font-body text-xs tracking-[0.15em] uppercase text-[#3B2F2F] hover:bg-[#5C3D2E] hover:text-[#F7F5F3]"
          >
            S'INFORMER
          </a>
        </div>
      )}
    </nav>
  );
}
