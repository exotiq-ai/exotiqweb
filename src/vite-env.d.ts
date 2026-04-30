/// <reference types="vite/client" />

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

// Extend Window interface for external scripts
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    mixpanel?: any;
  }
  
  // Custom element types
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'agent-id'?: string;
      };
    }
  }
}
