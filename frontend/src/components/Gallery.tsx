'use client';

import React from 'react';
import { motion } from 'framer-motion';

const SCENARIOS = [
  {
    title: 'Luxury Office Desk',
    description: 'Brings natural warmth to clean, modern workspaces.',
    src: '/images/bamboo_office.png',
    gridArea: 'col-span-12 md:col-span-8',
  },
  {
    title: 'Elegant Car Interior',
    description: 'Fits seamlessly in premium executive consoles.',
    src: '/images/bamboo_car.png',
    gridArea: 'col-span-12 md:col-span-4',
  },
  {
    title: 'Modern Coffee Table',
    description: 'A quiet statement piece for Scandinavian-style living rooms.',
    src: '/images/bamboo_coffee_table.png',
    gridArea: 'col-span-12 md:col-span-4',
  },
  {
    title: 'Executive Workspace',
    description: 'Perfect accent detail for glass corporate desks.',
    src: '/images/bamboo_executive.png',
    gridArea: 'col-span-12 md:col-span-4',
  },
  {
    title: 'Premium Living Room',
    description: 'Elegant wood finishes that complement soft textures.',
    src: '/images/bamboo_living_room.png',
    gridArea: 'col-span-12 md:col-span-4',
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 px-6 bg-luxury-darker relative">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-bamboo-500">
            Aesthetic Integration
          </h2>
          <h3 className="text-3xl sm:text-4xl font-serif font-light text-white leading-tight">
            Designed for Elevated Spaces
          </h3>
          <p className="text-luxury-muted font-light text-sm sm:text-base leading-relaxed">
            Every space tells a story. The organic textures and clean lines of our tissue box enrich any setting—from your workspace to your weekend drive.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-12 gap-6 md:gap-8">
          {SCENARIOS.map((scenario, index) => (
            <motion.div
              key={index}
              className={`${scenario.gridArea} relative group overflow-hidden rounded-[1.5rem] border border-white/5 bg-luxury-dark aspect-[4/3] md:aspect-auto md:h-[350px] shadow-lg`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              {/* Image with zoom-on-hover */}
              <img
                src={scenario.src}
                alt={scenario.title}
                className="w-full h-full object-cover object-center transform transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                loading="lazy"
              />

              {/* Elegant Bottom Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-8 opacity-90 group-hover:opacity-100 transition-opacity">
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h4 className="font-serif text-lg text-white font-medium mb-1">
                    {scenario.title}
                  </h4>
                  <p className="text-xs text-luxury-muted font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-w-xs">
                    {scenario.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
