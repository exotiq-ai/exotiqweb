/// <reference types="vite/client" />

import type { DetailedHTMLProps, HTMLAttributes } from 'react';

// Extend Window interface for external scripts
declare global {
  interface ImportMetaEnv {
    readonly VITE_GA_MEASUREMENT_ID?: string;
    readonly VITE_SUPABASE_URL?: string;
    readonly VITE_SUPABASE_ANON_KEY?: string;
    readonly VITE_BLOG_CONTENT_SOURCE?: 'hybrid' | 'supabase' | 'mdx';
    readonly VITE_BLOG_BREAK_GLASS?: 'true' | 'false';
    readonly VITE_BLOG_BREAK_GLASS_ALLOWLIST?: string;
    readonly VITE_BLOG_BREAK_GLASS_TOKEN?: string;
    readonly VITE_BLOG_BREAK_GLASS_EXPIRES_AT?: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }

  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    mixpanel?: any;
  }
  
  // Custom element types
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        'agent-id'?: string;
      };
    }
  }
}

export {};
