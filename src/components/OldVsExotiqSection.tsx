import React from 'react';
import { MobileSection, MobileContainer } from './MobileOptimizations';
import { TrendingDown, Zap, CheckCircle2, X, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import Card from './ui/Card';

const OldVsExotiqSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, once: true });

  return (
    <MobileSection ref={ref} className="bg-gray-50 dark:bg-dark-800">
    <MobileContainer>
      <div className="text-center mb-12 sm:mb-16">
        <div className={`inline-flex items-center px-4 py-2 bg-accent-100/80 dark:bg-accent-900/20 rounded-xl text-accent-700 dark:text-accent-300 font-semibold text-sm mb-6 backdrop-blur-sm border border-accent-200/50 dark:border-accent-800/30 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <Zap className="w-4 h-4 mr-2" />
          The Transformation
        </div>
        <h2 className={`font-dfaalt font-bold text-3xl sm:text-4xl md:text-5xl text-gray-900 dark:text-white mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '100ms' }}>
          Manual Chaos vs. Automated Excellence
        </h2>
        <p className={`font-montserrat text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '200ms' }}>
          Every hour spent on manual tasks is revenue lost. See the transformation.
        </p>
      </div>
        {/* Sophisticated Side-by-Side Comparison */}
        <div className="relative max-w-6xl mx-auto">
          {/* Connection Arrow (Desktop Only) */}
          <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className={`px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 rounded-full shadow-2xl transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} style={{ transitionDelay: '600ms' }}>
              <ArrowRight className="w-8 h-8 text-white animate-pulse" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* The Old Way - Neutral Styling */}
            <Card
              variant="elevated"
              className={`bg-white dark:bg-dark-800 border-2 border-gray-200 dark:border-dark-700 transition-all duration-700 hover:shadow-2xl ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
              style={{ transitionDelay: '300ms' }}
            >
              <div className="flex items-center space-x-3 mb-8">
                <div className="flex items-center justify-center w-14 h-14 bg-gray-100 dark:bg-dark-700 rounded-xl">
                  <TrendingDown className="w-7 h-7 text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <h3 className="font-dfaalt font-bold text-2xl text-gray-900 dark:text-white">The Old Way</h3>
                  <p className="font-montserrat text-sm text-gray-500 dark:text-gray-400">Manual & Inefficient</p>
                </div>
              </div>
              <div className="space-y-5">
                {[
                  { text: '20-30% revenue lost', desc: 'to pricing guesswork' },
                  { text: '$2,000+ surprise repairs', desc: 'from missed maintenance' },
                  { text: '25-35% commissions', desc: 'to booking platforms' },
                  { text: '15+ hours weekly', desc: 'on repetitive tasks' },
                  { text: 'Slow responses', desc: 'poor customer experience' }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className={`flex items-start space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-dark-700/50 transition-all duration-500 hover:bg-gray-100 dark:hover:bg-dark-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                    style={{ transitionDelay: `${400 + index * 50}ms` }}
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-200 dark:bg-dark-600 flex items-center justify-center mt-0.5">
                      <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div>
                      <p className="font-montserrat font-semibold text-gray-900 dark:text-white">{item.text}</p>
                      <p className="font-montserrat text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* The Exotiq Way - Premium Styling */}
            <Card
              variant="elevated"
              className={`bg-gradient-to-br from-accent-50 to-primary-50 dark:from-accent-900/20 dark:to-primary-900/20 border-2 border-accent-200 dark:border-accent-800/50 transition-all duration-700 hover:shadow-2xl ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
              style={{ transitionDelay: '400ms' }}
            >
              <div className="flex items-center space-x-3 mb-8">
                <div className="flex items-center justify-center w-14 h-14 bg-accent-500 rounded-xl shadow-lg">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-dfaalt font-bold text-2xl text-gray-900 dark:text-white">The Exotiq Way</h3>
                  <p className="font-montserrat text-sm text-accent-700 dark:text-accent-300 font-semibold">AI-Powered Excellence</p>
                </div>
              </div>
              <div className="space-y-5">
                {[
                  { text: 'AI pricing maximizes revenue', desc: 'dynamic optimization', highlight: false },
                  { text: 'Predictive maintenance alerts', desc: 'prevent costly breakdowns', highlight: false },
                  { text: '100% revenue retention', desc: 'zero platform commissions', highlight: true },
                  { text: '15+ hours saved weekly', desc: 'focus on growth', highlight: false },
                  { text: '24/7 AI communication', desc: 'instant guest responses', highlight: false }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className={`group flex items-start space-x-3 p-3 rounded-lg transition-all duration-500 hover:scale-[1.02] ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'} ${
                      item.highlight 
                        ? 'bg-accent-100 dark:bg-accent-900/30 border-2 border-accent-500 dark:border-accent-600 shadow-md' 
                        : 'bg-white/80 dark:bg-dark-800/50 hover:bg-white dark:hover:bg-dark-800'
                    }`}
                    style={{ transitionDelay: `${500 + index * 50}ms` }}
                  >
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 transition-transform duration-300 group-hover:scale-110 ${
                      item.highlight ? 'bg-accent-500' : 'bg-success-500'
                    }`}>
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className={`font-montserrat font-semibold ${
                        item.highlight ? 'text-accent-900 dark:text-accent-100 text-lg' : 'text-gray-900 dark:text-white'
                      }`}>{item.text}</p>
                      <p className="font-montserrat text-sm text-gray-700 dark:text-gray-300">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </MobileContainer>
    </MobileSection>
  );
};

export default OldVsExotiqSection; 