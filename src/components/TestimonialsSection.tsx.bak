import React from 'react';
import { MobileSection, MobileContainer } from './MobileOptimizations';
import { Users, Star, BadgeCheck, Quote } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import Card from './ui/Card';

const testimonials = [
  {
    name: 'Mike R.',
    initials: 'MR',
    color: 'primary',
    text: 'Finally, a platform built specifically for us! Current tools treat us like hobbyists, but Exotiq understands we are running real businesses. This is exactly what Power Hosts have been waiting for.',
    subtitle: 'Multi-Market Host',
    fleet: '28 vehicles · Denver/Phoenix',
    verified: true,
  },
  {
    name: 'David K.',
    initials: 'DK',
    color: 'accent',
    text: 'If Exotiq can save me even 10 hours a week, that would be incredibly helpful. I find myself spending way too much time on monotonous tasks rather than focusing on scaling my Turo rental fleet.',
    subtitle: 'Turo Power Host',
    fleet: '14 vehicles · Miami/Orlando',
    verified: true,
  },
  {
    name: 'Alex R.',
    initials: 'AR',
    color: 'success',
    text: 'I have tried piecing together different tools, but nothing truly supports the way P2P rental hosts operate. Exotiq looks like the first platform built for us. I am ready to use it today.',
    subtitle: 'Turo Host',
    fleet: '12 vehicles · Austin',
    verified: true,
  },
  {
    name: 'Sarah M.',
    initials: 'SM',
    color: 'platinum',
    text: 'Take my money already! This will absolutely change the game. I have been waiting for something like this for years. I eagerly await the launch of Exotiq.',
    subtitle: 'Exotic Car Rental Owner',
    fleet: '50+ vehicles · Los Angeles',
    verified: true,
  },
];

const TestimonialsSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, once: true });

  const colorClasses = {
    primary: {
      bg: 'bg-primary-100',
      bgDark: 'dark:bg-primary-900/30',
      text: 'text-primary-600',
      textDark: 'dark:text-primary-400',
      gradient: 'from-primary-500 to-primary-600',
    },
    accent: {
      bg: 'bg-accent-100',
      bgDark: 'dark:bg-accent-900/30',
      text: 'text-accent-600',
      textDark: 'dark:text-accent-400',
      gradient: 'from-accent-500 to-accent-600',
    },
    success: {
      bg: 'bg-success-100',
      bgDark: 'dark:bg-success-900/30',
      text: 'text-success-600',
      textDark: 'dark:text-success-400',
      gradient: 'from-success-500 to-success-600',
    },
    platinum: {
      bg: 'bg-platinum-100',
      bgDark: 'dark:bg-platinum-900/30',
      text: 'text-platinum-600',
      textDark: 'dark:text-platinum-400',
      gradient: 'from-platinum-400 to-platinum-500',
    },
  };

  return (
    <MobileSection ref={ref} className="bg-gray-50 dark:bg-dark-800">
      <MobileContainer>
        <div className="text-center mb-12 sm:mb-16">
          <div className={`inline-flex items-center px-4 py-2 bg-success-100/80 dark:bg-success-900/20 rounded-xl text-success-700 dark:text-success-300 font-semibold text-sm mb-6 backdrop-blur-sm border border-success-200/50 dark:border-success-800/30 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Users className="w-4 h-4 mr-2" />
            Validation from Real Operators
          </div>
          <h2 className={`font-space font-bold text-3xl sm:text-4xl md:text-5xl text-gray-900 dark:text-white mb-4 px-2 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '100ms' }}>
            Trusted by Industry Leaders
          </h2>
          <p className={`font-inter text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '200ms' }}>
            Hear from operators managing 100+ vehicles across major markets
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {testimonials.map((t, i) => {
            const colors = colorClasses[t.color as keyof typeof colorClasses];
            return (
              <Card
                key={i}
                variant="elevated"
                hover
                className={`group relative overflow-hidden transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${200 + i * 100}ms` }}
              >
                {/* Premium quote mark */}
                <div className="absolute top-4 right-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                  <Quote className="w-24 h-24 text-gray-900 dark:text-white" fill="currentColor" />
                </div>

                {/* Star rating with premium styling */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star 
                      key={j} 
                      className="w-5 h-5 text-accent-500 fill-current transition-all duration-300 hover:scale-125" 
                      style={{ transitionDelay: `${300 + i * 100 + j * 30}ms` }} 
                    />
                  ))}
                </div>

                {/* Testimonial text with premium typography */}
                <p className="font-inter text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-6 relative z-10">
                  "{t.text}"
                </p>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent mb-6"></div>

                {/* Author info with premium treatment */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Avatar with gradient border */}
                    <div className={`relative group-hover:scale-105 transition-transform duration-300`}>
                      <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} rounded-full blur-sm opacity-50 group-hover:opacity-75 transition-opacity`}></div>
                      <div className={`relative w-14 h-14 ${colors.bg} ${colors.bgDark} rounded-full flex items-center justify-center border-2 border-white dark:border-dark-800 shadow-lg`}>
                        <span className={`font-space font-bold text-xl ${colors.text} ${colors.textDark}`}>{t.initials}</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <div className="font-space font-bold text-gray-900 dark:text-white">{t.name}</div>
                        {t.verified && (
                          <BadgeCheck className="w-5 h-5 text-primary-600 dark:text-primary-400 fill-current" />
                        )}
                      </div>
                      <div className="font-inter text-sm font-medium text-gray-600 dark:text-gray-400">{t.subtitle}</div>
                      <div className="font-inter text-xs text-gray-500 dark:text-gray-500">{t.fleet}</div>
                    </div>
                  </div>
                </div>

                {/* Hover glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}></div>
              </Card>
            );
          })}
        </div>
      </MobileContainer>
    </MobileSection>
  );
};

export default TestimonialsSection; 