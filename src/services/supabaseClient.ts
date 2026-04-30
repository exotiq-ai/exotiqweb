import { createClient } from '@supabase/supabase-js';
import logger from '../utils/logger';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  logger.warn('Supabase environment variables are missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
}

export const supabase = createClient(supabaseUrl ?? '', supabaseAnonKey ?? '');

// Interface for survey submission
export interface SurveySubmission {
  survey_type: string;
  responses: Record<string, any>;
  submitted_at: string;
  user_agent: string;
  session_id: string;
  ip_address?: string;
}

// Function to submit survey directly to Supabase
export async function submitSurveyToSupabase(data: SurveySubmission) {
  try {
    logger.debug('Supabase client - Starting submission', { url: supabaseUrl, data });
    
    const { data: result, error } = await supabase
      .from('survey_submissions')
      .insert([data])
      .select();

    if (error) {
      logger.error('Supabase error', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      throw error;
    }

    logger.info('Survey submitted to Supabase successfully', { result });
    return result;
  } catch (error) {
    logger.error('Failed to submit to Supabase', { error });
    throw error;
  }
}

// Function to get all survey submissions
export async function getSurveySubmissions() {
  try {
    const { data, error } = await supabase
      .from('survey_submissions')
      .select('*')
      .order('submitted_at', { ascending: false });

    if (error) {
      logger.error('Supabase error', { error });
      throw error;
    }

    return data;
  } catch (error) {
    logger.error('Failed to get survey submissions', { error });
    throw error;
  }
} 