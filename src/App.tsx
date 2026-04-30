import React, { useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './contexts/ThemeContext';
import { AccessibilityProvider } from './components/AccessibilityProvider';
import AccessibilityControls from './components/AccessibilityControls';
import Header from './components/Header';
import Footer from './components/Footer';
import CookieConsentBanner from './components/CookieConsentBanner';
import LoadingSpinner from './components/LoadingSpinner';
import ThemeAwareLogo from './components/ThemeAwareLogo';
import RouteScrollManager from './components/RouteScrollManager';
import AdminAuthGuard from './components/AdminAuthGuard';
import { PerformanceMonitor } from './services/analytics';

// Lazy load page components for better performance
const HomePage = React.lazy(() => import('./pages/HomePage'));
const FeaturesPage = React.lazy(() => import('./pages/FeaturesPage'));
const PricingPage = React.lazy(() => import('./pages/PricingPage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const SurveyPage = React.lazy(() => import('./pages/SurveyPage'));
const InvestorPage = React.lazy(() => import('./pages/InvestorPage'));
const TestPage = React.lazy(() => import('./pages/TestPage'));
const GTMTestPage = React.lazy(() => import('./pages/GTMTestPage'));
const SimpleGTMTest = React.lazy(() => import('./pages/SimpleGTMTest'));
const CookiePolicyPage = React.lazy(() => import('./pages/CookiePolicyPage'));
const TermsAndConditionsPage = React.lazy(() => import('./pages/TermsAndConditionsPage'));
const PrivacyPolicyPage = React.lazy(() => import('./pages/PrivacyPolicyPage'));
const FleetCopilotDemoPage = React.lazy(() => import('./pages/FleetCopilotDemoPage'));
const DMCAPage = React.lazy(() => import('./pages/DMCAPage'));
const SMSTermsPage = React.lazy(() => import('./pages/SMSTermsPage'));
const BlogPage = React.lazy(() => import('./pages/BlogPage'));
const BlogPostPage = React.lazy(() => import('./pages/BlogPostPage'));
const BlogCategoryPage = React.lazy(() => import('./pages/BlogCategoryPage'));
const BlogTagPage = React.lazy(() => import('./pages/BlogTagPage'));
const AdminLoginPage = React.lazy(() => import('./pages/AdminLoginPage'));
const AdminBlogListPage = React.lazy(() => import('./pages/AdminBlogListPage'));
const AdminBlogEditorPage = React.lazy(() => import('./pages/AdminBlogEditorPage'));

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

// Lightweight 404 fallback so unknown routes don't render a blank <main>
const NotFoundRoute = () => {
  useEffect(() => {
    document.title = 'Page Not Found - Exotiq.ai';
    if (typeof window !== 'undefined') {
      const w = window as typeof window & {
        dataLayer?: Array<Record<string, unknown>>;
      };
      if (w.dataLayer) {
        w.dataLayer.push({
          event: '404_view',
          path: window.location.pathname,
        });
      }
    }
  }, []);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 bg-gray-50 dark:bg-dark-900">
      <div className="text-center max-w-lg">
        <p className="font-poppins font-bold text-sm uppercase tracking-wider text-primary-600 dark:text-primary-400 mb-3">
          404
        </p>
        <h1 className="font-dfaalt font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white mb-4">
          We couldn't find that page
        </h1>
        <p className="font-inter text-gray-600 dark:text-gray-300 mb-8">
          The link may be broken, or the page may have moved. Try heading back to the homepage or jump to one of the most-visited pages below.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-inter font-semibold transition-colors"
          >
            Back to Home
          </Link>
          <Link
            to="/pricing"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white dark:bg-dark-800 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-dark-700 font-inter font-semibold transition-colors hover:border-primary-500"
          >
            See Pricing
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white dark:bg-dark-800 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-dark-700 font-inter font-semibold transition-colors hover:border-primary-500"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  // Initialize performance monitoring
  useEffect(() => {
    PerformanceMonitor.trackWebVitals();
    
    // Check performance budgets periodically
    const interval = setInterval(() => {
      const violations = PerformanceMonitor.checkPerformanceBudgets();
      if (violations && violations.length > 0) {
        console.warn('🚨 Performance budget violations:', violations);
        
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
    <HelmetProvider>
      <ThemeProvider>
        <AccessibilityProvider>
          <Router>
            <RouteScrollManager />
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
                    <Route path="/dmca" element={<DMCAPage />} />
                    <Route path="/sms-terms" element={<SMSTermsPage />} />
                    <Route path="/blog" element={<BlogPage />} />
                    <Route path="/blog/category/:category" element={<BlogCategoryPage />} />
                    <Route path="/blog/tag/:tag" element={<BlogTagPage />} />
                    <Route path="/blog/:slug" element={<BlogPostPage />} />
                    <Route path="/admin/login" element={<AdminLoginPage />} />
                    <Route
                      path="/admin/blog"
                      element={
                        <AdminAuthGuard>
                          <AdminBlogListPage />
                        </AdminAuthGuard>
                      }
                    />
                    <Route
                      path="/admin/blog/new"
                      element={
                        <AdminAuthGuard>
                          <AdminBlogEditorPage />
                        </AdminAuthGuard>
                      }
                    />
                    <Route
                      path="/admin/blog/:id/edit"
                      element={
                        <AdminAuthGuard>
                          <AdminBlogEditorPage />
                        </AdminAuthGuard>
                      }
                    />
                    <Route path="/test" element={<TestPage />} />
                    <Route path="/gtm-test" element={<GTMTestPage />} />
                    <Route path="/simple-gtm" element={<SimpleGTMTest />} />
                    <Route path="*" element={<NotFoundRoute />} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
              <AccessibilityControls />
              <CookieConsentBanner />
            </div>
          </Router>
        </AccessibilityProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}