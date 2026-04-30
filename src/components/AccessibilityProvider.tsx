import React, { createContext, useContext, useEffect, useState } from 'react';
import logger from '../utils/logger';

interface AccessibilityContextType {
  highContrast: boolean;
  toggleHighContrast: () => void;
  reducedMotion: boolean;
  toggleReducedMotion: () => void;
  fontSize: 'normal' | 'large' | 'xlarge';
  setFontSize: (size: 'normal' | 'large' | 'xlarge') => void;
  focusVisible: boolean;
  setFocusVisible: (visible: boolean) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [focusVisible, setFocusVisible] = useState(false);

  // Initialize accessibility preferences
  useEffect(() => {
    try {
      // Load saved preferences
      const savedHighContrast = localStorage.getItem('exotiq_high_contrast') === 'true';
      const savedReducedMotion = localStorage.getItem('exotiq_reduced_motion') === 'true';
      const savedFontSize = localStorage.getItem('exotiq_font_size') as 'normal' | 'large' | 'xlarge' || 'normal';
      
      setHighContrast(savedHighContrast);
      setReducedMotion(savedReducedMotion);
      setFontSize(savedFontSize);
      
      // Check system preferences
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        setReducedMotion(true);
      }
      
      // Apply preferences
      applyAccessibilityPreferences(savedHighContrast, savedReducedMotion, savedFontSize);
    } catch (error) {
      logger.warn('Failed to load accessibility preferences', { error });
    }
  }, []);

  // Apply accessibility preferences to DOM
  const applyAccessibilityPreferences = (
    highContrast: boolean,
    reducedMotion: boolean,
    fontSize: 'normal' | 'large' | 'xlarge'
  ) => {
    const root = document.documentElement;
    
    // High contrast mode
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    
    // Reduced motion
    if (reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }
    
    // Font size
    root.classList.remove('font-size-normal', 'font-size-large', 'font-size-xlarge');
    root.classList.add(`font-size-${fontSize}`);
  };

  // Toggle high contrast mode
  const toggleHighContrast = () => {
    const newValue = !highContrast;
    setHighContrast(newValue);
    try {
      localStorage.setItem('exotiq_high_contrast', newValue.toString());
      applyAccessibilityPreferences(newValue, reducedMotion, fontSize);
    } catch (error) {
      logger.warn('Failed to save high contrast preference', { error });
    }
  };

  // Toggle reduced motion
  const toggleReducedMotion = () => {
    const newValue = !reducedMotion;
    setReducedMotion(newValue);
    try {
      localStorage.setItem('exotiq_reduced_motion', newValue.toString());
      applyAccessibilityPreferences(highContrast, newValue, fontSize);
    } catch (error) {
      logger.warn('Failed to save reduced motion preference', { error });
    }
  };

  // Set font size
  const setFontSizeHandler = (size: 'normal' | 'large' | 'xlarge') => {
    setFontSize(size);
    try {
      localStorage.setItem('exotiq_font_size', size);
      applyAccessibilityPreferences(highContrast, reducedMotion, size);
    } catch (error) {
      logger.warn('Failed to save font size preference', { error });
    }
  };

  // Handle focus visibility
  const setFocusVisibleHandler = (visible: boolean) => {
    setFocusVisible(visible);
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Skip if user is typing in an input
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      // Skip if user has text selected (they want to copy)
      if (window.getSelection()?.toString().length > 0) {
        return;
      }

      // Only handle navigation shortcuts with Ctrl/Cmd + Shift to avoid conflicts
      if (!event.shiftKey) {
        return;
      }

      switch (event.key) {
        case 'Tab':
          setFocusVisibleHandler(true);
          break;
        case 'Escape':
          // Close modals, dropdowns, etc.
          const escapeEvent = new CustomEvent('accessibility:escape');
          window.dispatchEvent(escapeEvent);
          break;
      }
    };

    const handleMouseDown = () => {
      setFocusVisibleHandler(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  const value: AccessibilityContextType = {
    highContrast,
    toggleHighContrast,
    reducedMotion,
    toggleReducedMotion,
    fontSize,
    setFontSize: setFontSizeHandler,
    focusVisible,
    setFocusVisible: setFocusVisibleHandler,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}
