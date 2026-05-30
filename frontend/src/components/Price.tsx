'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Shield, Sparkles } from 'lucide-react';

interface PriceProps {
  onReserveClick: () => void;
}

export default function Price({ onReserveClick }: PriceProps) {
  return (
    <section id="pricing" className="py-24 px-6 bg-luxury-darker relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-bamboo-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">
        
        {/* Header */}
        <div className="space-y-4">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-bamboo-500">
            Exclusive Offer
          </span>
          <h3 className="text-3xl sm:text-5xl font-serif font-light text-white leading-tight">
            Claim Your Special Pricing
          </h3>
          <p className="text-luxury-muted font-light text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            Pre-register your interest today to unlock exclusive early-bird rates. No deposit is required.
          </p>
        </div>

        {/* Price Card */}
        <motion.div 
          className="glass-panel max-w-md mx-auto p-10 md:p-12 rounded-[2.5rem] border border-bamboo-500/10 shadow-2xl relative"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Tag */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-bamboo-500 text-luxury-darker text-[10px] uppercase font-bold tracking-widest flex items-center space-x-1">
            <Sparkles className="h-3 w-3 fill-luxury-darker" />
            <span>Early-bird Launch Discount</span>
          </div>

          <div className="space-y-8">
            {/* Price digits */}
            <div className="space-y-1">
              <p className="text-xs text-luxury-muted uppercase tracking-wider">Launch Price</p>
              <div className="flex items-baseline justify-center space-x-3">
                <span className="text-5xl sm:text-6xl font-serif text-white font-normal">₹449</span>
                <span className="text-lg text-luxury-muted line-through">₹799</span>
              </div>
              <p className="text-xs text-emerald-400 font-medium tracking-wide">Save 43% off regular price</p>
            </div>

            {/* Notification message */}
            <div className="py-4 border-t border-b border-white/5 space-y-1.5">
              <p className="text-sm font-semibold text-bamboo-300">First batch currently being prepared.</p>
              <p className="text-xs text-luxury-muted leading-relaxed">
                Production starts soon using premium organic bamboo. Reservations will be fulfilled sequentially.
              </p>
            </div>

            {/* CTA Reserve button */}
            <div className="space-y-4">
              <Button size="lg" className="w-full" onClick={onReserveClick}>
                Reserve Your Quantity
              </Button>
              
              <div className="flex items-center justify-center space-x-2 text-[11px] text-luxury-muted">
                <Shield className="h-3.5 w-3.5 text-bamboo-500" />
                <span>Zero Risk • No Credit Card Required</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer message */}
        <p className="text-[11px] text-luxury-muted tracking-wider uppercase">
          Crafting in progress • limited quantities per production batch
        </p>
      </div>
    </section>
  );
}
