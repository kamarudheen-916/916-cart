'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getCachedUtmParams, getSessionId } from '@/utils/utm';
import { CheckCircle2, Loader2 } from 'lucide-react';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessSubmit?: () => void;
}

const INDIAN_STATES = [
  'Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Telangana', 
  'Uttar Pradesh', 'Gujarat', 'West Bengal', 'Rajasthan', 'Haryana', 
  'Kerala', 'Andhra Pradesh', 'Madhya Pradesh', 'Punjab', 'Bihar'
];

export default function LeadModal({ isOpen, onClose, onSuccessSubmit }: LeadModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    state: '',
    city: '',
    quantity: 1,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Track modal open analytics
  useEffect(() => {
    if (isOpen) {
      setSuccess(false);
      setError('');
      logModalOpenEvent();
    }
  }, [isOpen]);

  const logModalOpenEvent = async () => {
    try {
      const utm = getCachedUtmParams();
      const sessionId = getSessionId();
      await fetch('http://localhost:5000/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          eventType: 'modal_open',
          page: window.location.pathname + window.location.search,
          ...utm,
        }),
      });
    } catch (e) {
      console.error('Analytics tracking failed:', e);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const utm = getCachedUtmParams();
    const sessionId = getSessionId();

    try {
      // 1. Submit lead to database
      const response = await fetch('http://localhost:5000/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          ...utm,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Submission failed');
      }

      // 2. Track lead submission event
      await fetch('http://localhost:5000/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          eventType: 'lead_submission',
          page: window.location.pathname + window.location.search,
          ...utm,
        }),
      });

      setSuccess(true);
      if (onSuccessSubmit) {
        onSuccessSubmit();
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please check details and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="glass-modal max-w-md w-[92vw] overflow-y-auto max-h-[90vh]">
        {!success ? (
          <>
            <DialogHeader className="space-y-3">
              <DialogTitle className="text-2xl font-serif text-gold-gradient font-normal tracking-wide text-center">
                Reserve Your Bamboo Tissue Box
              </DialogTitle>
              <div className="p-4 rounded-2xl bg-bamboo-950/20 border border-bamboo-500/10 text-stone-300 text-sm leading-relaxed space-y-2">
                <p className="font-semibold text-bamboo-400">Our first batch is currently being prepared.</p>
                <p>Reserve your quantity now and we'll notify you as soon as stock becomes available.</p>
                <p className="font-medium text-white/90">No payment is required today.</p>
              </div>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              <div className="space-y-1.5">
                <label className="text-xs text-luxury-muted uppercase tracking-wider">Full Name</label>
                <Input
                  required
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Aravind Sharma"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-luxury-muted uppercase tracking-wider">Mobile Number</label>
                  <Input
                    required
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    placeholder="10-digit mobile"
                    pattern="[0-9]{10}"
                    title="Please enter a valid 10-digit phone number"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-luxury-muted uppercase tracking-wider">Email Address</label>
                  <Input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-luxury-muted uppercase tracking-wider">State</label>
                  <select
                    required
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="flex h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-luxury-muted focus:border-bamboo-500/50 focus:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-bamboo-500/20"
                  >
                    <option value="" disabled className="bg-luxury-dark text-luxury-muted">Select State</option>
                    {INDIAN_STATES.map((st) => (
                      <option key={st} value={st} className="bg-luxury-dark text-white">
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-luxury-muted uppercase tracking-wider">City (Optional)</label>
                  <Input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="e.g. Mumbai"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-luxury-muted uppercase tracking-wider">Quantity Required</label>
                <select
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  className="flex h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-bamboo-500/50 focus:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-bamboo-500/20"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num} className="bg-luxury-dark text-white">
                      {num} {num === 1 ? 'Unit' : 'Units'}
                    </option>
                  ))}
                </select>
              </div>

              {error && (
                <div className="text-red-400 text-xs py-1 border-l-2 border-red-500 pl-3">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full mt-4"
                size="lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Registering Reservation...
                  </>
                ) : (
                  'Reserve Now'
                )}
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center py-10 space-y-4 animate-fade-in">
            <div className="flex justify-center">
              <CheckCircle2 className="h-16 w-16 text-bamboo-400 stroke-[1.5]" />
            </div>
            <h3 className="text-2xl font-serif text-white font-normal">Reservation Registered!</h3>
            <p className="text-stone-300 text-sm leading-relaxed max-w-sm mx-auto">
              Thank you, <strong className="text-bamboo-300">{formData.name}</strong>. We have reserved{' '}
              <strong className="text-bamboo-300">{formData.quantity} {formData.quantity === 1 ? 'unit' : 'units'}</strong>{' '}
              for you. 
            </p>
            <p className="text-stone-400 text-xs max-w-xs mx-auto">
              A confirmation email has been sent to <strong>{formData.email}</strong>. We will notify you via email and phone as soon as your batch is ready.
            </p>
            <Button
              onClick={onClose}
              variant="outline"
              className="mt-6"
            >
              Back to Home
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
