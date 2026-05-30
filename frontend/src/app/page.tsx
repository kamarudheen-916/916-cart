'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Gallery from '@/components/Gallery';
import Benefits from '@/components/Benefits';
import Price from '@/components/Price';
import LeadModal from '@/components/LeadModal';
import { parseUtmParams, getCachedUtmParams, getSessionId } from '@/utils/utm';
import { Sparkles, Shield, Heart } from 'lucide-react';

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Initialize tracking and log page visit
  useEffect(() => {
    // Parse UTM parameters from URL and save them
    const utm = parseUtmParams();
    const sessionId = getSessionId();

    // Log the visit event to the analytics API
    const logVisit = async () => {
      try {
        const cachedUtm = getCachedUtmParams();
        await fetch('http://localhost:5000/api/analytics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sessionId,
            eventType: 'page_visit',
            page: window.location.pathname + window.location.search,
            ...cachedUtm,
          }),
        });
      } catch (err) {
        console.error('Analytics page_visit log failed:', err);
      }
    };

    logVisit();
  }, []);

  const handleReserveClick = async (buttonSource: string) => {
    setIsModalOpen(true);
    
    // Log CTA button click analytics
    try {
      const utm = getCachedUtmParams();
      const sessionId = getSessionId();
      await fetch('http://localhost:5000/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          eventType: 'button_click',
          page: window.location.pathname + window.location.search,
          source: utm.source,
          medium: utm.medium,
          campaign: utm.campaign,
        }),
      });
    } catch (err) {
      console.error('Analytics button_click log failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-luxury-darker text-luxury-light flex flex-col justify-between selection:bg-bamboo-600 selection:text-white">
      {/* Sticky Navigation */}
      <Navbar onReserveClick={() => handleReserveClick('navbar')} />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section */}
        <Hero onReserveClick={() => handleReserveClick('hero')} />

        {/* 2. Lifestyle Showcase Gallery */}
        <Gallery />

        {/* 3. Detailed Product Benefits */}
        <Benefits />

        {/* 4. Pricing & Final CTA */}
        <Price onReserveClick={() => handleReserveClick('pricing')} />
      </main>

      {/* Footer Section */}
      <footer className="bg-luxury-dark border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-serif text-sm tracking-[0.2em] uppercase text-white font-light">
              BAMBOO<span className="text-bamboo-500 font-normal">.</span>
            </span>
            <p className="text-[11px] text-luxury-muted">
              © {new Date().getFullYear()} Bamboo Luxury. Elevating everyday details.
            </p>
          </div>

          <div className="flex items-center space-x-6 text-[11px] text-luxury-muted uppercase tracking-wider">
            <a href="#gallery" className="hover:text-white transition-colors">Showcase</a>
            <a href="#benefits" className="hover:text-white transition-colors">Details</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>

          <div className="flex items-center space-x-2 text-[11px] text-luxury-muted">
            <span>Made with</span>
            <Heart className="h-3 w-3 text-bamboo-500 fill-bamboo-500 animate-pulse" />
            <span>for Modern Homes</span>
          </div>
        </div>
      </footer>

      {/* Lead Capture Overlay Modal */}
      <LeadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
