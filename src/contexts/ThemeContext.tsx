import React, { createContext, useContext, useEffect, useState } from 'react';
import logger from '../utils/logger';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Always force dark theme - brand identity requires dark-first approach
  const [theme] = useState<Theme>('dark');

  useEffect(() => {
    // Always apply dark theme class
    document.documentElement.classList.add('dark');
  }, []);

  // No-op function to maintain compatibility with existing code
  const toggleTheme = () => {
    // Theme is locked to dark mode
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}