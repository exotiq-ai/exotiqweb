// Survey service for handling survey submissions
import logger from '../utils/logger';

export interface SurveySubmission {
  surveyType: string;
  responses: Record<string, any>;
  timestamp: string;
  userAgent: string;
  sessionId: string;
}

export class SurveyService {
  // Save survey to localStorage for debugging
  static saveToLocalStorage(data: SurveySubmission): void {
    try {
      const submissions = this.getLocalSubmissions();
      submissions.push(data);
      localStorage.setItem('survey_submissions', JSON.stringify(submissions));
      logger.debug('Survey saved to localStorage', { sessionId: data.sessionId });
    } catch (error) {
      logger.error('Error saving to localStorage', { error });
    }
  }

  // Get all local survey submissions
  static getLocalSubmissions(): SurveySubmission[] {
    try {
      const stored = localStorage.getItem('survey_submissions');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      logger.error('Error reading from localStorage', { error });
      return [];
    }
  }

  // Test backend connection
  static async testBackendConnection(): Promise<boolean> {
    try {
      const response = await fetch('/api/survey-submission', {
        method: 'OPTIONS',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      logger.debug('Backend connection test response', { status: response.status });
      return response.status === 200 || response.status === 404; // 404 means endpoint exists but method not allowed
    } catch (error) {
      logger.error('Backend connection test failed', { error });
      return false;
    }
  }

  // Submit to backend (when available)
  static async submitToBackend(data: SurveySubmission): Promise<boolean> {
    try {
      logger.debug('Attempting to submit to backend', { sessionId: data.sessionId });
      
      const response = await fetch('/api/survey-submission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      logger.debug('Backend response', { 
        status: response.status, 
        headers: Object.fromEntries(response.headers.entries()) 
      });

      if (response.ok) {
        const result = await response.json();
        logger.info('Backend submission successful', { result, sessionId: data.sessionId });
        return true;
      } else {
        const errorText = await response.text();
        logger.error('Backend submission failed', { 
          status: response.status, 
          statusText: response.statusText, 
          errorText,
          sessionId: data.sessionId
        });
        return false;
      }
    } catch (error) {
      logger.error('Backend submission error', { error, sessionId: data.sessionId });
      return false;
    }
  }

  // Submit survey (tries Supabase directly via dynamic import, falls back to localStorage)
  static async submitSurvey(data: SurveySubmission): Promise<boolean> {
    logger.debug('Starting survey submission', { sessionId: data.sessionId, surveyType: data.surveyType });
    
    // Always save to localStorage for debugging
    this.saveToLocalStorage(data);
    logger.debug('Survey saved to localStorage', { sessionId: data.sessionId });

    try {
      // Dynamically import Supabase client to avoid module resolution issues at build time
      const { submitSurveyToSupabase } = await import('./supabaseClient');
      
      const supabaseData = {
        survey_type: data.surveyType,
        responses: data.responses,
        submitted_at: data.timestamp,
        user_agent: data.userAgent,
        session_id: data.sessionId,
        ip_address: 'unknown' // We can't get IP from client-side
      };

      logger.debug('Preparing Supabase submission', { supabaseData });
      
      await submitSurveyToSupabase(supabaseData);
      logger.info('Survey submitted to Supabase successfully', { sessionId: data.sessionId });
      return true;
    } catch (error) {
      logger.warn('Supabase submission failed, using localStorage only', { error, sessionId: data.sessionId });
      return true; // Still return true since we saved locally
    }
  }

  // Get submission count
  static getSubmissionCount(): number {
    return this.getLocalSubmissions().length;
  }

  // Clear local submissions (for testing)
  static clearLocalSubmissions(): void {
    localStorage.removeItem('survey_submissions');
    logger.info('Local survey submissions cleared');
  }
}
