import React, { useCallback, useEffect, useRef } from 'react';
import { Settings, Eye, Type, Zap, X } from 'lucide-react';
import { useAccessibility } from './AccessibilityProvider';

/** Below lg the panel is a bottom sheet opened from the mobile menu, not from a floating gear. */
const MOBILE_MEDIA = '(max-width: 1023.98px)';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const AccessibilityControls: React.FC = () => {
  const {
    highContrast,
    toggleHighContrast,
    reducedMotion,
    toggleReducedMotion,
    fontSize,
    setFontSize,
    isPanelOpen: isOpen,
    closePanel,
    togglePanel,
  } = useAccessibility();
  const gearRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  // Move focus into the dialog when it opens and hand it back when it closes.
  // Below lg the opener (a row in the mobile menu) has already unmounted, so
  // focus returns to the menu button instead of dropping to <body>.
  useEffect(() => {
    if (isOpen) {
      wasOpen.current = true;
      closeButtonRef.current?.focus();
      return;
    }
    if (!wasOpen.current) return;
    wasOpen.current = false;
    const gear = gearRef.current;
    const target =
      gear && gear.getClientRects().length > 0
        ? gear
        : document.querySelector<HTMLElement>('button[aria-label="Toggle menu"]');
    target?.focus();
  }, [isOpen]);

  // The sheet covers the page on phones, so the page must not scroll behind it.
  // Desktop keeps its current behaviour (the floating card never locked scroll).
  useEffect(() => {
    if (!isOpen || !window.matchMedia(MOBILE_MEDIA).matches) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  // Escape closes; Tab cycles inside the dialog (aria-modal promises as much).
  // Registered on the document, not the dialog, so Escape still works after a
  // tap on non-interactive text has moved focus to <body>.
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closePanel();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (element) => element.getClientRects().length > 0,
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || !dialogRef.current.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !dialogRef.current.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    },
    [closePanel],
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleKeyDown]);

  return (
    <>
      {/* Skip to content link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Accessibility toggle button. Desktop only: on phones it sat in the thumb zone
          beside the hero's orange CTA, so the same panel is reached from the mobile
          menu ("Accessibility settings") instead. */}
      <button
        ref={gearRef}
        onClick={togglePanel}
        className="hidden lg:block fixed bottom-4 right-4 z-50 p-3 bg-primary-500 hover:bg-primary-600 text-white rounded-full shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        aria-label="Accessibility controls"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        <Settings className="w-6 h-6" />
      </button>

      {/* Accessibility panel: a bottom sheet below lg, the floating card next to the gear at lg+.
          z-[60] keeps the sheet above the cookie banner and the pill header (both z-50). */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] lg:z-40">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={closePanel} />

          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="accessibility-panel-title"
            className="fixed inset-x-0 bottom-0 w-full max-h-[90vh] overflow-y-auto rounded-t-2xl lg:inset-x-auto lg:bottom-20 lg:right-4 lg:w-80 lg:max-w-[calc(100vw-2rem)] lg:max-h-none lg:overflow-hidden lg:rounded-2xl bg-white dark:bg-dark-800 shadow-2xl border border-gray-200 dark:border-dark-700"
            style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-dark-700">
              <h3
                id="accessibility-panel-title"
                className="font-dfaalt font-bold text-lg text-gray-900 dark:text-white"
              >
                Accessibility
              </h3>
              <button
                ref={closeButtonRef}
                onClick={closePanel}
                className="p-2 min-w-[44px] lg:min-w-0 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
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
