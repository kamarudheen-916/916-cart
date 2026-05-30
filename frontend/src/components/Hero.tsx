'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroProps {
  onReserveClick: () => void;
}

const SLIDES = [
  {
    src: '/images/bamboo_hero.png',
    alt: 'Premium Bamboo Tissue Box Close-up Shot',
    title: 'Product close-up hero shot',
  },
  {
    src: '/images/bamboo_office.png',
    alt: 'Premium Bamboo Tissue Box in Luxury Office',
    title: 'Luxury office desk placement',
  },
  {
    src: '/images/bamboo_executive.png',
    alt: 'Premium Bamboo Tissue Box on Executive Glass Desk',
    title: 'Executive corporate desk placement',
  },
  {
    src: '/images/bamboo_living_room.png',
    alt: 'Premium Bamboo Tissue Box in Premium Living Room',
    title: 'Premium home styling setting',
  },
  {
    src: '/images/bamboo_car.png',
    alt: 'Premium Bamboo Tissue Box in Luxury Car Interior',
    title: 'Elegant car interior integration',
  },
];

export default function Hero({ onReserveClick }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play interval: switch slide every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  };

  return (
    <section className="relative h-[100dvh] w-full bg-luxury-darker overflow-hidden flex items-end justify-center">
      {/* 1. Carousel Images Wrapper */}
      <div className="absolute inset-0 z-0">
        {SLIDES.map((slide, index) => (
          <div
            key={index}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{
              opacity: index === currentIndex ? 1 : 0,
              zIndex: index === currentIndex ? 1 : 0,
            }}
          >
            {/* Image overlay with modern scale animation on load */}
            <img
              src={slide.src}
              alt={slide.alt}
              className="w-full h-full object-cover object-center transform scale-100 transition-transform duration-[4500ms]"
              style={{
                transform: index === currentIndex ? 'scale(1.04)' : 'scale(1.00)',
              }}
            />
          </div>
        ))}
      </div>

      {/* 2. Premium Luxury Gradient Mask */}
      {/* Protects text readability while keeping top-middle area clean for product visibility */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/30 via-black/45 to-black/95 pointer-events-none" />

      {/* 3. Overlay Content Container */}
      <div className="relative z-20 w-full max-w-5xl px-6 pb-12 md:pb-20 text-center flex flex-col items-center justify-end h-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 50 }}
          className="space-y-6 max-w-xl"
        >
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-bamboo-500/20 bg-bamboo-950/40 text-bamboo-400 text-[10px] tracking-wider uppercase backdrop-blur-sm">
            <Sparkles className="h-3 w-3 stroke-[2] animate-pulse" />
            <span>Exclusive Early Batch Reservation</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light text-white leading-tight">
            Small Details.<br className="sm:hidden" />
            <span className="text-gold-gradient font-normal"> Premium Spaces.</span>
          </h1>

          {/* Price Tag Highlight - Mobile Conversion Focus */}
          <div className="flex items-center justify-center space-x-3 py-1">
            <span className="text-[11px] text-luxury-muted uppercase tracking-widest font-semibold">Special Offer</span>
            <span className="text-2xl sm:text-3xl font-serif text-white font-normal">₹449</span>
            <span className="text-sm text-luxury-muted line-through">₹799</span>
            <span className="text-xs text-emerald-400 font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              Save 43%
            </span>
          </div>

          {/* Subheadline */}
          <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed max-w-md mx-auto">
            Elegant bamboo tissue box designed for modern homes, offices and cars.
          </p>

          {/* CTA Trigger (Full-width on mobile, thumb-friendly) */}
          <div className="pt-2 flex flex-col items-center gap-3">
            <Button
              size="lg"
              onClick={onReserveClick}
              className="w-full sm:w-auto px-10 h-14 text-base shadow-lg shadow-bamboo-950/40"
            >
              Reserve Yours
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <p className="text-[10px] text-luxury-muted uppercase tracking-wider">
              Zero Risk • No payment required today
            </p>
          </div>
        </motion.div>
      </div>

      {/* 4. Manual Carousel Controls (Decorative/Accessible) */}
      <div className="absolute bottom-1/2 -translate-y-1/2 left-4 z-20 hidden md:block">
        <button
          onClick={handlePrev}
          className="p-2 rounded-full border border-white/10 bg-black/40 text-white hover:bg-white/20 hover:border-white/20 transition-all active:scale-95"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      </div>
      <div className="absolute bottom-1/2 -translate-y-1/2 right-4 z-20 hidden md:block">
        <button
          onClick={handleNext}
          className="p-2 rounded-full border border-white/10 bg-black/40 text-white hover:bg-white/20 hover:border-white/20 transition-all active:scale-95"
          aria-label="Next image"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* 5. Slide indicator Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className="w-1.5 h-1.5 rounded-full transition-all duration-300"
            style={{
              backgroundColor: index === currentIndex ? '#be9553' : 'rgba(255, 255, 255, 0.25)',
              width: index === currentIndex ? '16px' : '6px',
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
