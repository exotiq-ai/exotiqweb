import React, { useState } from 'react';
import { Settings, Eye, Type, Zap, X } from 'lucide-react';
import { useAccessibility } from './AccessibilityProvider';

const AccessibilityControls: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    highContrast,
    toggleHighContrast,
    reducedMotion,
    toggleReducedMotion,
    fontSize,
    setFontSize,
  } = useAccessibility();

  return (
    <>
      {/* Skip to content link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Accessibility toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 p-3 bg-primary-500 hover:bg-primary-600 text-white rounded-full shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        aria-label="Accessibility controls"
        aria-expanded={isOpen}
      >
        <Settings className="w-6 h-6" />
      </button>

      {/* Accessibility panel - Now works on all devices */}
      {isOpen && (
        <div className="fixed inset-0 z-40">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Panel - Responsive positioning */}
          <div className="fixed bottom-20 right-4 w-80 max-w-[calc(100vw-2rem)] bg-white dark:bg-dark-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-dark-700 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-dark-700">
              <h3 className="font-dfaalt font-bold text-lg text-gray-900 dark:text-white">
                Accessibility
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
                aria-label="Close accessibility panel"
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* Controls */}
            <div className="p-4 space-y-4">
              {/* High Contrast */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Eye className="w-5 h-5 text-primary-500" />
                  <div>
                    <h4 className="font-montserrat font-semibold text-gray-900 dark:text-white">
                      High Contrast
                    </h4>
                    <p className="font-montserrat text-sm text-gray-600 dark:text-gray-400">
                      Better visibility
                    </p>
                  </div>
                </div>
                <button
                  onClick={toggleHighContrast}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                    highContrast ? 'bg-primary-500' : 'bg-gray-200 dark:bg-dark-600'
                  }`}
                  aria-label={`${highContrast ? 'Disable' : 'Enable'} high contrast mode`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      highContrast ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Reduced Motion */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Zap className="w-5 h-5 text-accent-600" />
                  <div>
                    <h4 className="font-montserrat font-semibold text-gray-900 dark:text-white">
                      Reduced Motion
                    </h4>
                    <p className="font-montserrat text-sm text-gray-600 dark:text-gray-400">
                      Less animations
                    </p>
                  </div>
                </div>
                <button
                  onClick={toggleReducedMotion}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 ${
                    reducedMotion ? 'bg-accent-600' : 'bg-gray-200 dark:bg-dark-600'
                  }`}
                  aria-label={`${reducedMotion ? 'Disable' : 'Enable'} reduced motion`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      reducedMotion ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Font Size */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Type className="w-5 h-5 text-success-600" />
                  <div>
                    <h4 className="font-montserrat font-semibold text-gray-900 dark:text-white">
                      Font Size
                    </h4>
                    <p className="font-montserrat text-sm text-gray-600 dark:text-gray-400">
                      Adjust text size
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {(['normal', 'large', 'xlarge'] as const).map((size) => (
                    <button
                      key={size}
                      onClick={() => setFontSize(size)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        fontSize === size
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-600'
                      }`}
                      aria-label={`Set font size to ${size}`}
                    >
                      {size === 'normal' ? 'A' : size === 'large' ? 'A+' : 'A++'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Keyboard shortcuts info */}
              <div className="pt-4 border-t border-gray-200 dark:border-dark-700">
                <h4 className="font-montserrat font-semibold text-gray-900 dark:text-white mb-2">
                  Keyboard Shortcuts
                </h4>
                <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <p>• <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-dark-700 rounded text-xs">Ctrl/Cmd + Shift + H</kbd> Go to Home</p>
                  <p>• <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-dark-700 rounded text-xs">Ctrl/Cmd + Shift + F</kbd> Go to Features</p>
                  <p>• <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-dark-700 rounded text-xs">Ctrl/Cmd + Shift + A</kbd> Go to About</p>
                  <p>• <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-dark-700 rounded text-xs">Ctrl/Cmd + Shift + C</kbd> Go to Contact</p>
                  <p>• <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-dark-700 rounded text-xs">Escape</kbd> Close modals</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccessibilityControls;
