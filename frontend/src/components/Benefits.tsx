'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Feather, Smartphone, ShieldCheck, Gem } from 'lucide-react';

const BENEFITS = [
  {
    icon: Leaf,
    title: 'Premium Bamboo Finish',
    description: 'Sustainably sourced natural bamboo, polished to a rich, warm tactile finish with unique grain highlights.',
  },
  {
    icon: Feather,
    title: 'Elegant Modern Design',
    description: 'Minimalist clean aesthetic inspired by leading consumer-tech brands, blending seamlessly into modern spaces.',
  },
  {
    icon: Smartphone,
    title: 'Perfect for Home, Office & Car',
    description: 'Specially proportioned dimensions to fit executive office tables, living room side desks, or car center consoles.',
  },
  {
    icon: ShieldCheck,
    title: 'Durable Construction',
    description: 'Sturdy, long-lasting wood assembly that resists wear and retains its luxury feel through daily use.',
  },
  {
    icon: Gem,
    title: 'Luxury Aesthetic',
    description: 'Elevates everyday basic necessities into a premium decor highlight, changing the vibe of your spaces.',
  },
];

export default function Benefits() {
  return (
    <section id="benefits" className="py-24 px-6 bg-luxury-dark relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-bamboo-600/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-bamboo-500">
            Exceptional Quality
          </h2>
          <h3 className="text-3xl sm:text-4xl font-serif font-light text-white leading-tight">
            Elevating the Everyday
          </h3>
          <p className="text-luxury-muted font-light text-sm sm:text-base leading-relaxed">
            Our tissue boxes are built on principles of clean industrial design, fine craftsmanship, and organic sustainability.
          </p>
        </div>

        {/* Benefits Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {BENEFITS.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <motion.div
                key={index}
                className="glass-panel p-8 rounded-3xl border border-white/5 hover:border-bamboo-500/25 hover:bg-white/[0.03] transition-all duration-300 group flex flex-col justify-between"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="space-y-6">
                  {/* Icon with glowing effect */}
                  <div className="w-12 h-12 rounded-2xl bg-bamboo-500/10 flex items-center justify-center border border-bamboo-500/20 group-hover:bg-bamboo-500/20 group-hover:border-bamboo-500/40 transition-all duration-300">
                    <IconComponent className="h-6 w-6 text-bamboo-400 stroke-[1.5]" />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-lg font-serif text-white font-medium group-hover:text-bamboo-300 transition-colors">
                      {benefit.title}
                    </h4>
                    <p className="text-sm text-luxury-muted font-light leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
