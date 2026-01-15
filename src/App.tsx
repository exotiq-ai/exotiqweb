import React, { useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './contexts/ThemeContext';
import { AccessibilityProvider } from './components/AccessibilityProvider';
import { ToastProvider } from './contexts/ToastContext';
import AccessibilityControls from './components/AccessibilityControls';
import Header from './components/Header';
import Footer from './components/Footer';
import CookieConsentBanner from './components/CookieConsentBanner';
import LoadingSpinner from './components/LoadingSpinner';
import ThemeAwareLogo from './components/ThemeAwareLogo';
import ErrorBoundary from './utils/errorBoundary';
import { PerformanceMonitor } from './services/analytics';
import logger from './utils/logger';

// Lazy load page components for better performance
const HomePage = React.lazy(() => import('./pages/HomePage'));
const FeaturesPage = React.lazy(() => import('./pages/FeaturesPage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const SurveyPage = React.lazy(() => import('./pages/SurveyPage'));
const PricingPage = React.lazy(() => import('./pages/PricingPage'));
const InvestorPage = React.lazy(() => import('./pages/InvestorPageNew'));
const TestPage = React.lazy(() => import('./pages/TestPage'));
const GTMTestPage = React.lazy(() => import('./pages/GTMTestPage'));
const SimpleGTMTest = React.lazy(() => import('./pages/SimpleGTMTest'));
const CookiePolicyPage = React.lazy(() => import('./pages/CookiePolicyPage'));
const TermsAndConditionsPage = React.lazy(() => import('./pages/TermsAndConditionsPage'));
const PrivacyPolicyPage = React.lazy(() => import('./pages/PrivacyPolicyPage'));
const FleetCopilotDemoPage = React.lazy(() => import('./pages/FleetCopilotDemoPage'));

// Loading fallback component
const PageLoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-900">
    <div className="text-center">
      <div className="mb-6 animate-bounce-subtle">
        <ThemeAwareLogo size="loading" />
      </div>
      <LoadingSpinner size="lg" color="primary" />
      <p className="font-inter text-gray-600 dark:text-gray-400 mt-4 animate-pulse">Loading...</p>
    </div>
  </div>
);

export default function App() {
  // Mobile debugging
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  useEffect(() => {
    if (isMobile) {
      logger.debug('App component mounted on mobile');
    }
  }, [isMobile]);
  
  // Initialize performance monitoring
  useEffect(() => {
    logger.info('App initialized');
    PerformanceMonitor.trackWebVitals();
    
    // Check performance budgets periodically
    const interval = setInterval(() => {
      const violations = PerformanceMonitor.checkPerformanceBudgets();
      if (violations && violations.length > 0) {
        logger.warn('Performance budget violations detected', { violations });
        
        // Send to analytics
        if (window.gtag) {
          window.gtag('event', 'performance_budget_violation', {
            event_category: 'Performance',
            event_label: violations.join(', '),
            value: violations.length,
          });
        }
      }
    }, 30000); // Check every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <ThemeProvider>
          <ToastProvider>
            <AccessibilityProvider>
              <Router>
              <div className="App">
                <Header />
                <main id="main-content">
                  <Suspense fallback={<PageLoadingFallback />}>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/about" element={<AboutPage />} />
                      <Route path="/features" element={<FeaturesPage />} />
                      <Route path="/pricing" element={<PricingPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/survey" element={<SurveyPage />} />
                      <Route path="/investors" element={<InvestorPage />} />
                      <Route path="/fleetcopilot" element={<FleetCopilotDemoPage />} />
                      <Route path="/terms" element={<TermsAndConditionsPage />} />
                      <Route path="/privacy" element={<PrivacyPolicyPage />} />
                      <Route path="/cookies" element={<CookiePolicyPage />} />
                      <Route path="/test" element={<TestPage />} />
                      <Route path="/gtm-test" element={<GTMTestPage />} />
                      <Route path="/simple-gtm" element={<SimpleGTMTest />} />
                    </Routes>
                  </Suspense>
                </main>
                <Footer />
                <AccessibilityControls />
                <CookieConsentBanner />
              </div>
            </Router>
          </AccessibilityProvider>
          </ToastProvider>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}