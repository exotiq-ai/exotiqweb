import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Linkedin, Shield } from 'lucide-react';
import ThemeAwareLogo from './ThemeAwareLogo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-black border-t border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-20 py-5 sm:py-6">
        {/* Main Grid - Logo spans full on mobile, then links in 2-col layout */}
        <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 md:grid-cols-12 sm:gap-5 md:gap-6 mb-4">
          
          {/* Logo & Description - Full width on mobile */}
          <div className="md:col-span-5 pb-4 sm:pb-0 border-b sm:border-b-0 border-white/10">
            <div className="mb-2">
              <Link to="/" className="inline-block group">
                <ThemeAwareLogo size="footer" />
              </Link>
            </div>
            <p className="font-montserrat text-gray-400 text-sm leading-snug max-w-md mb-3">
              AI-powered fleet management for exotic car rental operators. Built by operators who scaled to 15+ vehicles.
            </p>
            
            {/* Contact - inline on mobile */}
            <div className="flex items-center gap-4 sm:gap-6">
              <a
                href="mailto:hello@exotiq.ai"
                className="group flex items-center space-x-2 text-gray-400 hover:text-primary-500 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="font-montserrat text-sm">hello@exotiq.ai</span>
              </a>
              <a
                href="#"
                className="group flex items-center space-x-2 text-gray-400 hover:text-primary-500 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
                <span className="font-montserrat text-sm">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Links Section - 2 columns on mobile: Platform left, Resources+Security right */}
          <div className="grid grid-cols-2 gap-4 sm:contents">
            {/* Platform Links - Left column on mobile */}
            <div className="md:col-span-2">
              <h3 className="font-dfaalt font-semibold text-sm mb-1 text-white">Platform</h3>
              <nav className="flex flex-col">
                <Link to="/" className="text-gray-400 hover:text-primary-500 transition-colors font-montserrat text-sm leading-5">
                  Home
                </Link>
                <Link to="/features" className="text-gray-400 hover:text-primary-500 transition-colors font-montserrat text-sm leading-5">
                  Features
                </Link>
                <Link to="/pricing" className="text-gray-400 hover:text-primary-500 transition-colors font-montserrat text-sm leading-5">
                  Pricing
                </Link>
                <Link to="/about" className="text-gray-400 hover:text-primary-500 transition-colors font-montserrat text-sm leading-5">
                  About Us
                </Link>
                <Link to="/contact" className="text-gray-400 hover:text-primary-500 transition-colors font-montserrat text-sm leading-5">
                  Contact
                </Link>
                <Link to="/survey" className="text-gray-400 hover:text-primary-500 transition-colors font-montserrat text-sm leading-5">
                  Beta Survey
                </Link>
              </nav>
            </div>

            {/* Right column on mobile: Resources + Security stacked */}
            <div className="space-y-3 md:contents">
              {/* Resources Links */}
              <div className="md:col-span-2">
                <h3 className="font-dfaalt font-semibold text-sm mb-1 text-white">Resources</h3>
                <nav className="flex flex-col">
                  <Link to="/investors" className="text-gray-400 hover:text-primary-500 transition-colors font-montserrat text-sm leading-5">
                    Investors
                  </Link>
                  <span className="text-gray-500 font-montserrat text-sm leading-5 cursor-not-allowed">
                    Blog <span className="text-xs text-gray-600">(Soon)</span>
                  </span>
                  <span className="text-gray-500 font-montserrat text-sm leading-5 cursor-not-allowed">
                    Help Center <span className="text-xs text-gray-600">(Soon)</span>
                  </span>
                  <span className="text-gray-500 font-montserrat text-sm leading-5 cursor-not-allowed">
                    API Docs <span className="text-xs text-gray-600">(Soon)</span>
                  </span>
                </nav>
              </div>

              {/* Security Badge */}
              <div className="md:col-span-3">
                <h3 className="font-dfaalt font-semibold text-sm mb-1 text-white">Security</h3>
                <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-start space-x-2">
                    <Shield className="w-4 h-4 text-success-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-montserrat font-medium text-xs text-white mb-0.5">Enterprise Grade</div>
                      <div className="font-montserrat text-xs text-gray-400 leading-snug">SOC 2 · GDPR · 256-bit</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-3">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6">
              <p className="font-montserrat text-xs text-gray-400">
                © {currentYear} Exotiq Inc. All rights reserved.
              </p>
              <nav className="flex items-center gap-4 text-xs">
                <Link to="/terms" className="text-gray-400 hover:text-primary-500 transition-colors font-montserrat">
                  Terms
                </Link>
                <Link to="/privacy" className="text-gray-400 hover:text-primary-500 transition-colors font-montserrat">
                  Privacy
                </Link>
                <Link to="/cookie-policy" className="text-gray-400 hover:text-primary-500 transition-colors font-montserrat">
                  Cookies
                </Link>
              </nav>
            </div>
            <p className="font-montserrat text-xs text-gray-400">
              Built for Operators, by Operators
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
