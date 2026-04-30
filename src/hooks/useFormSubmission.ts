import { useState } from 'react';
import { trackBetaSignup, trackContactForm } from '../components/Analytics';

interface FormSubmissionState {
  isSubmitting: boolean;
  isSubmitted: boolean;
  error: string | null;
}

interface FormData {
  [key: string]: any;
}

export function useFormSubmission() {
  const [state, setState] = useState<FormSubmissionState>({
    isSubmitting: false,
    isSubmitted: false,
    error: null
  });

  const submitForm = async (formData: FormData, formType: 'beta' | 'contact') => {
    setState({ isSubmitting: true, isSubmitted: false, error: null });

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      
      if (!supabaseUrl) {
        throw new Error('Supabase configuration missing');
      }

      const response = await fetch(`${supabaseUrl}/functions/v1/handle-form-submission`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          type: formType,
          formData: formData
        })
      });

      let result: { success?: boolean; error?: string } = {};
      const text = await response.text();
      try {
        result = text ? JSON.parse(text) : {};
      } catch {
        throw new Error(response.ok ? 'Invalid response from server' : text || `Request failed (${response.status})`);
      }

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to submit form');
      }
      
      if (import.meta.env.DEV) {
        console.info('[Form submission]', 'success', { formType, result });
      }
      
      // Track analytics events
      if (formType === 'beta') {
        trackBetaSignup(formData.email || '');
      } else if (formType === 'contact') {
        trackContactForm(formData.subject || 'general');
      }
      
      setState({ isSubmitting: false, isSubmitted: true, error: null });
      
      // Reset after 5 seconds
      setTimeout(() => {
        setState(prev => ({ ...prev, isSubmitted: false }));
      }, 5000);
      
    } catch (error) {
      console.error('[Form submission]', formType, error);
      setState({ 
        isSubmitting: false, 
        isSubmitted: false, 
        error: error instanceof Error ? error.message : 'An error occurred while submitting the form' 
      });
    }
  };

  const resetForm = () => {
    setState({ isSubmitting: false, isSubmitted: false, error: null });
  };

  return {
    ...state,
    submitForm,
    resetForm
  };
}