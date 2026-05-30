'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  UserCheck, 
  TrendingUp, 
  Package, 
  LogOut, 
  RefreshCw, 
  MapPin, 
  Compass, 
  ListFilter,
  Lock,
  ArrowLeft,
  Calendar,
  Phone,
  Mail,
  Locate
} from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  mobile: string;
  email: string;
  state: string;
  city?: string;
  quantity: number;
  source?: string;
  campaign?: string;
  medium?: string;
  createdAt: string;
}

interface DashboardStats {
  totalVisitors: number;
  totalLeads: number;
  conversionRate: number;
  totalQuantityRequested: number;
  topStates: { state: string; count: number }[];
  topTrafficSources: { source: string; count: number }[];
  recentLeads: Lead[];
}

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Auto login if password is in storage
  useEffect(() => {
    const savedPassword = sessionStorage.getItem('bamboo_admin_pwd');
    if (savedPassword) {
      fetchStats(savedPassword);
    }
  }, []);

  const fetchStats = async (authPassword: string) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/admin/stats', {
        method: 'GET',
        headers: {
          'x-admin-password': authPassword,
        },
      });

      if (!response.ok) {
        throw new Error(response.status === 401 ? 'Invalid password.' : 'Failed to load dashboard data.');
      }

      const data = await response.json();
      setStats(data);
      setIsLoggedIn(true);
      sessionStorage.setItem('bamboo_admin_pwd', authPassword);
    } catch (err: any) {
      setError(err.message || 'Network error.');
      sessionStorage.removeItem('bamboo_admin_pwd');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError('Password is required.');
      return;
    }
    fetchStats(password);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('bamboo_admin_pwd');
    setIsLoggedIn(false);
    setStats(null);
    setPassword('');
  };

  const handleRefresh = async () => {
    const savedPassword = sessionStorage.getItem('bamboo_admin_pwd');
    if (savedPassword) {
      setRefreshing(true);
      await fetchStats(savedPassword);
      setRefreshing(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-luxury-darker flex items-center justify-center p-6 relative">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 bg-bamboo-600/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="glass-panel w-full max-w-md p-8 md:p-10 rounded-[2rem] border border-white/5 space-y-8 shadow-2xl relative z-10">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-bamboo-500/10 border border-bamboo-500/20 flex items-center justify-center mx-auto mb-2">
              <Lock className="h-5 w-5 text-bamboo-400" />
            </div>
            <h1 className="text-2xl font-serif font-light text-white tracking-wide">Admin Portal</h1>
            <p className="text-xs text-luxury-muted leading-relaxed max-w-xs mx-auto">
              Please enter your security password to view demand validation statistics.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] text-luxury-muted uppercase tracking-widest font-semibold">Security Password</label>
              <Input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••••••"
                className="text-center font-mono tracking-widest placeholder:tracking-normal"
              />
            </div>

            {error && (
              <p className="text-red-400 text-xs text-center border-l border-red-500 pl-2">
                {error}
              </p>
            )}

            <Button type="submit" className="w-full" disabled={loading} size="lg">
              {loading ? 'Authenticating...' : 'Enter Dashboard'}
            </Button>
          </form>

          <div className="text-center pt-2">
            <a 
              href="/" 
              className="inline-flex items-center text-xs text-luxury-muted hover:text-bamboo-400 transition-colors"
            >
              <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
              Back to Landing Page
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Calculate highest count for SVG chart scales
  const maxStateCount = stats?.topStates.reduce((max, item) => item.count > max ? item.count : max, 1) || 1;
  const maxSourceCount = stats?.topTrafficSources.reduce((max, item) => item.count > max ? item.count : max, 1) || 1;

  return (
    <div className="min-h-screen bg-luxury-darker text-luxury-light font-sans selection:bg-bamboo-600 selection:text-white">
      {/* Header */}
      <header className="glass-navbar sticky top-0 z-20 w-full">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src="/images/916cart-logo.png" 
              alt="916 Cart Logo" 
              className="h-9 w-auto object-contain rounded-md" 
            />
            <span className="px-2 py-0.5 rounded bg-bamboo-500/10 border border-bamboo-500/20 text-[9px] uppercase tracking-wider text-bamboo-400">
              Demand Console
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={refreshing}
              className="border-white/5 h-9 w-9 p-0 flex items-center justify-center"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            </Button>
            
            <Button
              variant="glass"
              size="sm"
              onClick={handleLogout}
              className="h-9 text-xs"
            >
              <LogOut className="mr-2 h-3.5 w-3.5" />
              Log Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="max-w-7xl mx-auto p-6 md:p-8 space-y-8">
        {/* KPI Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Card 1: Visitors */}
          <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs text-luxury-muted uppercase tracking-wider font-medium">Total Visitors</span>
              <div className="p-2 rounded-xl bg-bamboo-500/10 border border-bamboo-500/10">
                <Users className="h-4 w-4 text-bamboo-400" />
              </div>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-serif text-white">{stats?.totalVisitors.toLocaleString()}</p>
              <p className="text-[10px] text-luxury-muted mt-1">Unique visitor sessions logged</p>
            </div>
          </div>

          {/* Card 2: Leads */}
          <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs text-luxury-muted uppercase tracking-wider font-medium">Total Reservations</span>
              <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/10">
                <UserCheck className="h-4 w-4 text-emerald-400" />
              </div>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-serif text-white">{stats?.totalLeads.toLocaleString()}</p>
              <p className="text-[10px] text-luxury-muted mt-1">Submitted demand records</p>
            </div>
          </div>

          {/* Card 3: Conversion */}
          <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs text-luxury-muted uppercase tracking-wider font-medium">Conversion Rate</span>
              <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/10">
                <TrendingUp className="h-4 w-4 text-amber-400" />
              </div>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-serif text-white">{stats?.conversionRate}%</p>
              <p className="text-[10px] text-luxury-muted mt-1">Visitors completing pre-order</p>
            </div>
          </div>

          {/* Card 4: Quantity */}
          <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs text-luxury-muted uppercase tracking-wider font-medium">Units Requested</span>
              <div className="p-2 rounded-xl bg-bamboo-500/10 border border-bamboo-500/10">
                <Package className="h-4 w-4 text-bamboo-400" />
              </div>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-serif text-white">{stats?.totalQuantityRequested.toLocaleString()}</p>
              <p className="text-[10px] text-luxury-muted mt-1">Total quantity requested in leads</p>
            </div>
          </div>
        </div>

        {/* Charts & Groupings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart Left: States */}
          <div className="glass-panel p-6 md:p-8 rounded-[1.5rem] border border-white/5 space-y-6">
            <div className="flex items-center space-x-2.5">
              <MapPin className="h-4 w-4 text-bamboo-400" />
              <h3 className="font-serif text-lg text-white font-medium">Demographics by State</h3>
            </div>
            
            <div className="space-y-4">
              {stats && stats.topStates.length > 0 ? (
                stats.topStates.map((item, index) => {
                  const percentage = Math.round((item.count / maxStateCount) * 100);
                  return (
                    <div key={index} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-stone-300">{item.state}</span>
                        <span className="text-bamboo-400 font-semibold">{item.count} units</span>
                      </div>
                      {/* Custom visual progress bar */}
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-bamboo-600 to-bamboo-400 rounded-full transition-all duration-1000"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-xs text-luxury-muted py-6 text-center">No demographic logs yet.</p>
              )}
            </div>
          </div>

          {/* Chart Right: Traffic Channels */}
          <div className="glass-panel p-6 md:p-8 rounded-[1.5rem] border border-white/5 space-y-6">
            <div className="flex items-center space-x-2.5">
              <Compass className="h-4 w-4 text-bamboo-400" />
              <h3 className="font-serif text-lg text-white font-medium">Top Traffic Channels</h3>
            </div>
            
            <div className="space-y-4">
              {stats && stats.topTrafficSources.length > 0 ? (
                stats.topTrafficSources.map((item, index) => {
                  const percentage = Math.round((item.count / maxSourceCount) * 100);
                  return (
                    <div key={index} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-stone-300 capitalize">{item.source}</span>
                        <span className="text-bamboo-400 font-semibold">{item.count} clicks</span>
                      </div>
                      <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-amber-700 to-bamboo-500 rounded-full transition-all duration-1000"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-xs text-luxury-muted py-6 text-center">No marketing attribution records logged.</p>
              )}
            </div>
          </div>
        </div>

        {/* Lead Details Table */}
        <div className="glass-panel rounded-[1.5rem] border border-white/5 overflow-hidden shadow-md">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <ListFilter className="h-4 w-4 text-bamboo-400" />
              <h3 className="font-serif text-lg text-white font-medium">Recent Reservations</h3>
            </div>
            <span className="text-[10px] text-luxury-muted uppercase tracking-wider font-semibold">
              Showing last 20 leads
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-bottom border-white/5 bg-white/[0.01] text-luxury-muted uppercase tracking-wider text-[9px] font-semibold">
                  <th className="p-4 pl-6">Reserved Date</th>
                  <th className="p-4">Customer Details</th>
                  <th className="p-4">Delivery Location</th>
                  <th className="p-4 text-center">Qty</th>
                  <th className="p-4">Marketing Attribution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {stats && stats.recentLeads.length > 0 ? (
                  stats.recentLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                      {/* Date */}
                      <td className="p-4 pl-6 text-luxury-muted">
                        <span className="flex items-center space-x-1.5">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(lead.createdAt).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}</span>
                        </span>
                      </td>
                      {/* Customer info */}
                      <td className="p-4 space-y-1">
                        <div className="font-semibold text-white">{lead.name}</div>
                        <div className="text-luxury-muted space-y-0.5 font-mono">
                          <div className="flex items-center space-x-1 hover:text-white">
                            <Phone className="h-2.5 w-2.5" />
                            <span>{lead.mobile}</span>
                          </div>
                          <div className="flex items-center space-x-1 hover:text-white">
                            <Mail className="h-2.5 w-2.5" />
                            <span>{lead.email}</span>
                          </div>
                        </div>
                      </td>
                      {/* Location */}
                      <td className="p-4">
                        <span className="flex items-start space-x-1 text-stone-200">
                          <Locate className="h-3 w-3 mt-0.5 text-bamboo-400" />
                          <span>
                            {lead.state}
                            {lead.city && <span className="text-luxury-muted text-[10px] block font-mono">{lead.city}</span>}
                          </span>
                        </span>
                      </td>
                      {/* Qty */}
                      <td className="p-4 text-center font-bold text-sm text-bamboo-300">
                        {lead.quantity}
                      </td>
                      {/* Attribution */}
                      <td className="p-4 space-y-0.5 font-mono text-[10px]">
                        <div>
                          <span className="text-luxury-muted">Src:</span>{' '}
                          <span className="text-stone-300">{lead.source || 'Direct'}</span>
                        </div>
                        {lead.medium && (
                          <div>
                            <span className="text-luxury-muted">Med:</span>{' '}
                            <span className="text-stone-300">{lead.medium}</span>
                          </div>
                        )}
                        {lead.campaign && (
                          <div>
                            <span className="text-luxury-muted">Cam:</span>{' '}
                            <span className="text-stone-300">{lead.campaign}</span>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-luxury-muted">
                      No customer reservations registered yet. Launch traffic campaigns to generate bookings.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
