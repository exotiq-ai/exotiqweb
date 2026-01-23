import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, DollarSign, Car, Calendar, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface HomeHeroSectionProps {
  isVisible: boolean;
}

// Stat Card Component
const StatCard = ({ icon: Icon, label, value, change }: { icon: React.ElementType; label: string; value: string; change: string }) => (
  <div className="bg-slate-50 rounded-lg p-3">
    <div className="flex items-center gap-2 mb-2">
      <Icon className="w-3.5 h-3.5 text-cyan-500" />
      <span className="text-[10px] text-slate-500 font-inter">{label}</span>
    </div>
    <p className="text-lg font-semibold text-slate-800 font-dfaalt">{value}</p>
    <p className="text-[10px] text-cyan-600 font-inter">{change}</p>
  </div>
);

// Chart Component
const ChartPlaceholder = () => (
  <svg className="w-full h-16" viewBox="0 0 200 40">
    <path
      d="M0 35 Q25 30 50 28 T100 20 T150 15 T200 8"
      fill="none"
      stroke="#06b6d4"
      strokeWidth="2"
      className="drop-shadow-lg"
    />
    <path
      d="M0 35 Q25 30 50 28 T100 20 T150 15 T200 8 L200 40 L0 40 Z"
      fill="url(#gradient-light)"
      opacity="0.3"
    />
    <defs>
      <linearGradient id="gradient-light" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#06b6d4" />
        <stop offset="100%" stopColor="transparent" />
      </linearGradient>
    </defs>
  </svg>
);

// Activity Item Component
const ActivityItem = ({ title, time }: { title: string; time: string }) => (
  <div className="flex items-center justify-between py-2 px-3 bg-slate-50 rounded-lg">
    <span className="text-xs text-slate-700 font-inter">{title}</span>
    <span className="text-[10px] text-slate-400 font-inter">{time}</span>
  </div>
);

// Dashboard Mockup Component - Matches reference design with floating elements
const DashboardMockup: React.FC = () => {
  return (
    <div className="relative">
      {/* Main dashboard card - Light mode with cyan glow */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="bg-white rounded-2xl border border-slate-200 p-6"
        style={{ boxShadow: "0 25px 80px -12px rgba(56, 189, 248, 0.4), 0 10px 40px -8px rgba(56, 189, 248, 0.25)" }}
      >
        {/* Browser header */}
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-200">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 mx-4">
            <div className="bg-slate-100 rounded-md px-4 py-1.5 text-xs text-slate-500 font-inter">
              app.exotiq.ai/dashboard
            </div>
          </div>
        </div>

        {/* Dashboard content */}
        <div className="space-y-4">
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            <StatCard icon={DollarSign} label="Revenue" value="$41,250" change="+12%" />
            <StatCard icon={Car} label="Fleet" value="24" change="+3" />
            <StatCard icon={Calendar} label="Bookings" value="156" change="+18%" />
          </div>

          {/* Chart placeholder */}
          <div className="bg-slate-50 rounded-xl p-4 h-32">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-slate-800 font-dfaalt">Revenue Trends</span>
              <TrendingUp className="w-4 h-4 text-cyan-500" />
            </div>
            <ChartPlaceholder />
          </div>

          {/* Activity list */}
          <div className="space-y-2">
            <ActivityItem title="New booking confirmed" time="2 min ago" />
            <ActivityItem title="Maintenance scheduled" time="1 hour ago" />
          </div>
        </div>
      </motion.div>

      {/* Floating element - +23% This month */}
      <motion.div
        animate={{ y: [0, -12, 0], x: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute -right-4 top-20 bg-white border border-slate-200 rounded-xl p-3"
        style={{ boxShadow: "0 15px 40px -8px rgba(56, 189, 248, 0.35)" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-cyan-600" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-800 font-dfaalt">+23%</p>
            <p className="text-[10px] text-slate-500 font-inter">This month</p>
          </div>
        </div>
      </motion.div>

      {/* Floating element - AI Autopilot Active */}
      <motion.div
        animate={{ y: [0, 8, 0], x: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -left-4 bottom-20 bg-white border border-slate-200 rounded-xl p-3"
        style={{ boxShadow: "0 15px 40px -8px rgba(56, 189, 248, 0.35)" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <p className="text-xs text-slate-700 font-inter">AI Autopilot Active</p>
        </div>
      </motion.div>
    </div>
  );
};

const HomeHeroSection: React.FC<HomeHeroSectionProps> = ({ isVisible }) => {
  const trustItems = ["No commitment", "14-day free trial", "Cancel anytime"];

  return (
    <section
      className="relative overflow-hidden pt-24"
      style={{
        background: 'linear-gradient(135deg, hsl(230 25% 5%) 0%, hsl(220 30% 10%) 50%, hsl(230 25% 5%) 100%)'
      }}
      data-hero-section
      aria-label="Hero section"
    >
      {/* Glow effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(6, 182, 212, 0.15), transparent)'
        }}
      />

      <div className="container mx-auto px-6 sm:px-8 lg:px-16 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <h1 className="font-dfaalt font-bold text-4xl md:text-5xl lg:text-6xl leading-tight text-white">
              Exotic Fleet
              <br />
              Operations on
              <br />
              <span 
                className="bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent"
              >
                Autopilot
              </span>
            </h1>

            <p className="font-inter text-lg text-slate-400 max-w-lg">
              AI-powered platform that automates pricing, guest messaging, and
              maintenance so you can scale without the chaos.
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Link
                  to="/features"
                  className="inline-flex items-center justify-center gap-2 h-12 px-8 text-base font-semibold font-dfaalt rounded-lg bg-cyan-500 text-slate-900 hover:bg-cyan-400 transition-all duration-300"
                  style={{ boxShadow: '0 0 30px -5px rgba(6, 182, 212, 0.4)' }}
                >
                  Explore the Platform
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <a
                  href="https://calendly.com/hello-exotiq/15-minute-meeting?back=1&month=2025-07"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-12 px-8 text-base font-semibold font-dfaalt rounded-lg border border-slate-700 bg-slate-800/50 backdrop-blur-sm text-white hover:bg-slate-800 hover:border-slate-600 transition-all duration-300"
                >
                  Book a Demo
                </a>
              </motion.div>
            </div>

            <div className="flex flex-wrap gap-6 pt-4">
              {trustItems.map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-slate-400 font-inter">
                  <Check className="w-4 h-4 text-cyan-500" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right content - Dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative lg:pl-8"
          >
            <DashboardMockup />
          </motion.div>
        </div>
      </div>

      {/* Bottom fade for smooth transition */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, hsl(230 25% 5%), transparent)'
        }}
      />
    </section>
  );
};

export default HomeHeroSection;
