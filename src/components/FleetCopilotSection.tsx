import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, MessageSquare, Wrench, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

// Phone Mockup Component - Clean standalone mobile UI
const PhoneMockup: React.FC = () => (
  <div className="relative w-64 h-[500px]">
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="absolute inset-0"
    >
      {/* Phone frame - Light mode with cyan glow */}
      <div 
        className="absolute inset-0 bg-white rounded-[3rem] border border-slate-200 overflow-hidden"
        style={{ boxShadow: "0 25px 80px -12px rgba(56, 189, 248, 0.4), 0 10px 40px -8px rgba(56, 189, 248, 0.25)" }}
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-slate-800 rounded-b-2xl" />
        
        {/* Screen content */}
        <div className="absolute inset-4 top-8 bg-slate-50 rounded-[2rem] p-4 overflow-hidden">
          {/* App header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="text-sm font-semibold text-slate-800 font-dfaalt">FleetCopilot</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-200" />
          </div>

          {/* Chat interface */}
          <div className="space-y-3">
            <div className="bg-white rounded-xl p-3 max-w-[80%] border border-slate-100">
              <p className="text-xs text-slate-700 font-inter">Good morning! Your fleet is 95% booked this week.</p>
            </div>
            <div className="bg-cyan-500 rounded-xl p-3 max-w-[80%] ml-auto">
              <p className="text-xs text-white font-inter">Show me today's schedule</p>
            </div>
            <div className="bg-white rounded-xl p-3 border border-slate-100">
              <p className="text-xs text-slate-700 mb-2 font-inter">Here's your schedule:</p>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-[10px] text-slate-600 font-inter">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <span>9 AM - Pickup: Tesla Model S</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-600 font-inter">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                  <span>2 PM - Return: Porsche 911</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-600 font-inter">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                  <span>5 PM - Maintenance check</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
);

// Feature Card Component - Floating cards around the phone
const FeatureCard: React.FC<{
  icon: React.ElementType;
  title: string;
  description: string;
  position: string;
  index: number;
}> = ({ icon: Icon, title, description, position, index }) => {
  const positionClasses: Record<string, string> = {
    "right-top": "md:absolute md:right-0 md:top-8 md:-translate-x-4 lg:-translate-x-8",
    "left-bottom": "md:absolute md:left-0 md:bottom-32 md:translate-x-4 lg:translate-x-8",
    "right-bottom": "md:absolute md:right-0 md:bottom-8 md:-translate-x-4 lg:-translate-x-8",
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: position.includes("right") ? 30 : -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className={`mt-6 md:mt-0 md:w-72 ${positionClasses[position] || ''}`}
    >
      <div 
        className="bg-white border border-slate-200 rounded-xl p-5 hover:border-cyan-300 transition-colors duration-300"
        style={{ boxShadow: "0 15px 40px -8px rgba(56, 189, 248, 0.3)" }}
      >
        <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center mb-4">
          <Icon className="w-5 h-5 text-cyan-600" />
        </div>
        <h3 className="text-lg font-semibold text-slate-800 mb-2 font-dfaalt">{title}</h3>
        <p className="text-sm text-slate-500 font-inter">{description}</p>
      </div>
    </motion.div>
  );
};

const FleetCopilotSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, once: true });

  const features = [
    {
      icon: TrendingUp,
      title: 'Revenue Optimization',
      description: 'AI analyzes competitors and demand to maximize your daily rates automatically.',
      position: 'right-top',
    },
    {
      icon: MessageSquare,
      title: 'Guest Automation',
      description: 'Handle all your bookings with automated inquiries, check-ins, and VIP escalations.',
      position: 'left-bottom',
    },
    {
      icon: Wrench,
      title: 'Predictive Maintenance',
      description: 'Get alerts before breakdowns happen. Schedule service during booking gaps.',
      position: 'right-bottom',
    }
  ];

  return (
    <section 
      ref={ref}
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, hsl(230 25% 5%) 0%, hsl(220 30% 10%) 50%, hsl(230 25% 5%) 100%)'
      }}
    >
      {/* Glow effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(6, 182, 212, 0.15), transparent)'
        }}
      />

      <div className="container mx-auto px-6 sm:px-8 lg:px-16 relative z-10">
        {/* Section header - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-400 font-medium font-inter">Meet FleetCopilot™ AI</span>
          </div>
          
          {/* Headline */}
          <h2 className="font-dfaalt font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-6">
            Your AI Operations Partner
          </h2>
          
          {/* Description */}
          <p className="font-inter text-lg text-slate-400 max-w-2xl mx-auto mb-8">
            FleetCopilot delivers the strategic capacity of a dedicated analyst, ops manager, 
            and guest coordinator, without expanding your team.
          </p>

          {/* CTA Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block"
          >
            <Link
              to="/fleetcopilot"
              className="inline-flex items-center gap-2 h-12 px-8 text-base font-semibold font-dfaalt rounded-lg border border-slate-700 bg-slate-800/50 backdrop-blur-sm text-white hover:bg-slate-800 hover:border-slate-600 transition-all duration-300"
            >
              Talk to your FleetCopilot
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Features layout with phone in center */}
        <div className="relative max-w-5xl mx-auto">
          {/* Center phone mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <PhoneMockup />
          </motion.div>

          {/* Feature cards positioned around the phone */}
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              position={feature.position}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FleetCopilotSection;
