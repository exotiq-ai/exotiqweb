import React from 'react';
import SEOHead from '../components/SEOHead';

export default function GTMTestPage() {
  return (
    <>
      <SEOHead 
        title="GTM Test Page - Exotiq.ai"
        description="Google Tag Manager test page for Exotiq.ai"
      />
      <div className="min-h-screen bg-white dark:bg-dark-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
              GTM Test Page
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              This page is used for testing Google Tag Manager integration.
            </p>
            <div className="bg-gray-100 dark:bg-dark-800 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Test Events
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Check your browser's developer tools to see if GTM events are firing correctly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
