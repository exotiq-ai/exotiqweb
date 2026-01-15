import React, { useState, useEffect } from 'react';

export default function SimpleGTMTest() {
  const [gtmStatus, setGtmStatus] = useState<string>('Checking...');
  const [dataLayerStatus, setDataLayerStatus] = useState<string>('Checking...');
  const [testResults, setTestResults] = useState<string[]>([]);

  useEffect(() => {
    checkGTMStatus();
  }, []);

  const checkGTMStatus = () => {
    // Check if GTM is loaded
    if (typeof window.gtag !== 'undefined') {
      setGtmStatus('✅ GTM Loaded');
    } else {
      setGtmStatus('❌ GTM Not Found');
    }

    // Check if dataLayer exists
    if (typeof window.dataLayer !== 'undefined') {
      setDataLayerStatus('✅ DataLayer Available');
    } else {
      setDataLayerStatus('❌ DataLayer Not Found');
    }
  };

  const testGTMEvents = () => {
    const results: string[] = [];
    
    try {
      // Test basic GTM event
      if (typeof window.gtag !== 'undefined') {
        window.gtag('event', 'test_event', {
          event_category: 'GTM Test',
          event_label: 'Simple Test',
          value: 1
        });
        results.push('✅ GTM Event Sent');
      } else {
        results.push('❌ GTM Not Available');
      }

      // Test dataLayer push
      if (typeof window.dataLayer !== 'undefined') {
        window.dataLayer.push({
          event: 'test_dataLayer_event',
          category: 'GTM Test',
          label: 'DataLayer Test'
        });
        results.push('✅ DataLayer Event Pushed');
      } else {
        results.push('❌ DataLayer Not Available');
      }

      // Test custom event
      if (typeof window.gtag !== 'undefined') {
        window.gtag('event', 'custom_event', {
          event_category: 'Custom',
          event_label: 'User Action',
          custom_parameter: 'test_value'
        });
        results.push('✅ Custom Event Sent');
      }

    } catch (error: any) {
      results.push(`❌ Error: ${error.message}`);
    }

    setTestResults(results);
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-20">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Simple GTM Test Page
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-blue-900 mb-2">GTM Status</h2>
              <p className="text-blue-800">{gtmStatus}</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-green-900 mb-2">DataLayer Status</h2>
              <p className="text-green-800">{dataLayerStatus}</p>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={testGTMEvents}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Test GTM Events
            </button>
            
            <button
              onClick={clearResults}
              className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors ml-2"
            >
              Clear Results
            </button>
          </div>

          {testResults.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Test Results:</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                {testResults.map((result, index) => (
                  <div key={index} className="text-sm text-gray-700 mb-1">
                    {result}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
            <h3 className="text-lg font-semibold text-yellow-900 mb-2">Next Steps:</h3>
            <ol className="list-decimal list-inside text-yellow-800 space-y-1">
              <li>Open Google Tag Manager</li>
              <li>Go to Preview mode</li>
              <li>Navigate to this page</li>
              <li>Click "Test GTM Events" button</li>
              <li>Check if events appear in GTM preview</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
