'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  onReserveClick: () => void;
}

export default function Navbar({ onReserveClick }: NavbarProps) {
  return (
    <header className="absolute top-0 left-0 z-40 w-full bg-gradient-to-b from-black/50 to-transparent border-b border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center">
          <img 
            src="/images/916cart-logo.jpg" 
            alt="916 Cart Logo" 
            className="h-10 w-auto object-contain rounded-md" 
          />
        </div>

        {/* Center Links (Decorative/Minimalist) */}
        <nav className="hidden md:flex space-x-8 text-xs uppercase tracking-[0.2em] text-luxury-light/75 font-medium">
          <a href="#gallery" className="hover:text-white transition-colors duration-200">Gallery</a>
          <a href="#benefits" className="hover:text-white transition-colors duration-200">Details</a>
          <a href="#pricing" className="hover:text-white transition-colors duration-200">Pricing</a>
        </nav>

        {/* Call to Action */}
        <div className="flex items-center">
          <Button 
            variant="outline" 
            size="sm"
            onClick={onReserveClick}
            className="border-white/20 hover:border-bamboo-500/50 hover:bg-bamboo-500/5 text-luxury-light text-[10px] backdrop-blur-sm"
          >
            Reserve Yours
          </Button>
        </div>
      </div>
    </header>
  );
}
