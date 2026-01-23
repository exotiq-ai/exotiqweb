import React from 'react';
import { motion } from 'framer-motion';
import { Link2, Shield, TrendingUp, Users } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const ExoticFleetsSection: React.FC = () => {
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, once: true });

    const features = [
        {
            icon: Link2,
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
        <section ref={ref} className="relative min-h-screen overflow-hidden">
            {/* Background Image - New higher resolution image */}
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ 
                    backgroundImage: 'url(/images/hero/exotic-car-hero.jpg)',
                }}
            />
            
            {/* Darker overlay with stronger gradient for better contrast */}
            <div 
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(to right, rgba(10, 15, 20, 0.97) 0%, rgba(10, 15, 20, 0.85) 50%, rgba(10, 15, 20, 0.5) 100%)'
                }}
            />
            <div 
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(to top, rgba(10, 15, 20, 1) 0%, transparent 30%, transparent 70%, rgba(10, 15, 20, 0.6) 100%)'
                }}
            />

            {/* Content */}
            <div className="container mx-auto px-6 sm:px-8 lg:px-16 py-24 lg:py-32 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="max-w-2xl"
                >
                    {/* Badge - Stronger orange accent */}
                    <span 
                        className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full mb-8 border"
                        style={{
                            backgroundColor: 'rgba(241, 90, 41, 0.2)',
                            borderColor: 'rgba(241, 90, 41, 0.4)',
                            color: '#F15A29'
                        }}
                    >
                        <Link2 className="w-4 h-4" />
                        Purpose-Built for Exotic Fleets
                    </span>

                    {/* Heading - More visual separation */}
                    <h2 className="font-dfaalt font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-8 leading-tight">
                        Not Another{" "}
                        <span style={{ color: '#F15A29' }}>Generic</span>{" "}
                        Fleet Tool
                    </h2>

                    {/* Description - Increased spacing */}
                    <p className="font-inter text-lg text-slate-300 mb-14 max-w-lg leading-relaxed">
                        Exotiq was built from the ground up for professional exotic rental operators. 
                        Every feature is designed around the unique challenges of managing high-value fleets.
                    </p>

                    {/* Feature Grid - Tighter grouping, better structure */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                                className="flex gap-4"
                            >
                                <div 
                                    className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center border"
                                    style={{
                                        backgroundColor: 'rgba(241, 90, 41, 0.1)',
                                        borderColor: 'rgba(241, 90, 41, 0.25)'
                                    }}
                                >
                                    <feature.icon className="w-5 h-5" style={{ color: '#F15A29' }} />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold mb-1 font-dfaalt">{feature.title}</h3>
                                    <p className="text-slate-400 text-sm font-inter leading-relaxed">{feature.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Bottom fade for transition */}
            <div 
                className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
                style={{
                    background: 'linear-gradient(to top, hsl(230 25% 5%), transparent)'
                }}
            />
        </section>
    );
};

export default ExoticFleetsSection;
