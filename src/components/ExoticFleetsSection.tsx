import React from 'react';
import { MobileSection, MobileContainer } from './MobileOptimizations';
import { Car, Shield, TrendingUp, Users } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const ExoticFleetsSection: React.FC = () => {
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.2, once: true });

    const differentiators = [
        {
            icon: Car,
            title: 'Exotic-First Design',
            description: 'Built specifically for high-value vehicles, not retrofitted from economy rental software.'
        },
        {
            icon: TrendingUp,
            title: 'Premium Pricing Intelligence',
            description: 'AI trained on exotic rental market data, events, and luxury demand patterns.'
        },
        {
            icon: Shield,
            title: 'VIP Guest Management',
            description: 'Handle high-net-worth clients with the service level they expect.'
        },
        {
            icon: Users,
            title: 'Operator Community',
            description: 'Join a network of professional fleet operators scaling their businesses.'
        }
    ];

    return (
        <MobileSection ref={ref} className="relative overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <picture>
                    <source
                        media="(min-width: 1025px)"
                        srcSet="/images/hero/mclaren-720s-urban-night-desktop.webp"
                        type="image/webp"
                    />
                    <source
                        media="(min-width: 1025px)"
                        srcSet="/images/hero/mclaren-720s-urban-night-desktop.jpg"
                        type="image/jpeg"
                    />
                    <source
                        media="(min-width: 641px)"
                        srcSet="/images/hero/mclaren-720s-urban-night-tablet.webp"
                        type="image/webp"
                    />
                    <source
                        media="(min-width: 641px)"
                        srcSet="/images/hero/mclaren-720s-urban-night-tablet.jpg"
                        type="image/jpeg"
                    />
                    <source
                        srcSet="/images/hero/mclaren-720s-urban-night-mobile.webp"
                        type="image/webp"
                    />
                    <img
                        src="/images/hero/mclaren-720s-urban-night-mobile.jpg"
                        alt="McLaren 720S supercar representing the exotic fleet industry"
                        className="w-full h-full object-cover object-center"
                        loading="lazy"
                    />
                </picture>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-dark-900/95 via-dark-900/85 to-dark-900/70" />
            </div>

            {/* Content */}
            <MobileContainer className="relative z-10 py-14 lg:py-16">
                <div className="max-w-3xl">
                    {/* Badge */}
                    <div
                        className={`inline-flex items-center px-4 py-2 bg-accent-500/20 rounded-full text-accent-400 font-semibold text-sm mb-4 border border-accent-500/30 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                    >
                        <Car className="w-4 h-4 mr-2" />
                        Purpose-Built for Exotic Fleets
                    </div>

                    {/* Headline */}
                    <h2
                        className={`font-dfaalt font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4 leading-tight transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                        style={{ transitionDelay: '100ms' }}
                    >
                        Not Another <span className="text-accent-400">Generic</span> Fleet Tool
                    </h2>

                    {/* Description */}
                    <p
                        className={`font-inter text-lg text-gray-300 mb-8 leading-relaxed max-w-2xl transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                        style={{ transitionDelay: '200ms' }}
                    >
                        Exotiq was built from the ground up for professional exotic rental operators.
                        Every feature is designed around the unique challenges of managing high-value fleets.
                    </p>

                    {/* Differentiators Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                        {differentiators.map((item, index) => (
                            <div
                                key={item.title}
                                className={`flex items-start space-x-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                                style={{ transitionDelay: `${300 + index * 100}ms` }}
                            >
                                <div className="flex-shrink-0 w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
                                    <item.icon className="w-5 h-5 text-primary-400" />
                                </div>
                                <div>
                                    <h3 className="font-dfaalt font-semibold text-white mb-1">
                                        {item.title}
                                    </h3>
                                    <p className="font-inter text-sm text-gray-400 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </MobileContainer>
        </MobileSection>
    );
};

export default ExoticFleetsSection;
