import React, { useState, useEffect } from 'react';
import { SurveyService } from '../services/surveyService';
import { supabase } from '../services/supabaseClient';
import logger from '../utils/logger';

export default function SurveyDebug() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<string>('');

  useEffect(() => {
    // Only show in development
    if (import.meta.env.DEV) {
      setIsVisible(true);
    }
  }, []);

  const loadSubmissions = () => {
    const localSubmissions = SurveyService.getLocalSubmissions();
    setSubmissions(localSubmissions);
  };

  const clearSubmissions = () => {
    SurveyService.clearLocalSubmissions();
    setSubmissions([]);
  };

  const testSupabaseConnection = async () => {
    try {
      setConnectionStatus('Testing connection...');
      logger.debug('Testing Supabase connection');
      
      // Test basic connection
      const { data, error } = await supabase
        .from('survey_submissions')
        .select('count')
        .limit(1);

      if (error) {
        logger.error('Supabase connection test failed', { error });
        setConnectionStatus(`❌ Connection failed: ${error.message}`);
        
        // Log detailed error info
        logger.error('Supabase error details', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
      } else {
        logger.info('Supabase connection test successful', { data });
        setConnectionStatus('✅ Connection successful');
      }
    } catch (error) {
      logger.error('Supabase connection test error', { error });
      setConnectionStatus(`❌ Connection error: ${error}`);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className="bg-white dark:bg-dark-800 border border-gray-300 dark:border-dark-600 rounded-lg shadow-lg p-4 max-w-md">
        <h3 className="font-dfaalt font-bold text-lg text-gray-900 dark:text-white mb-3">
          Survey Debug (Dev Only)
        </h3>
        
        <div className="space-y-2 mb-4">
          <button
            onClick={testSupabaseConnection}
            className="w-full px-3 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
          >
            Test Supabase Connection
          </button>
          {connectionStatus && (
            <div className="text-xs p-2 bg-gray-100 dark:bg-dark-700 rounded">
              {connectionStatus}
            </div>
          )}
          <button
            onClick={loadSubmissions}
            className="w-full px-3 py-2 bg-primary-500 text-white rounded text-sm hover:bg-primary-600"
          >
            Load Submissions ({SurveyService.getSubmissionCount()})
          </button>
          <button
            onClick={clearSubmissions}
            className="w-full px-3 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700"
          >
            Clear All
          </button>
        </div>

        {submissions.length > 0 && (
          <div className="max-h-64 overflow-y-auto">
            <h4 className="font-semibold text-sm text-gray-700 dark:text-gray-300 mb-2">
              Local Submissions:
            </h4>
            {submissions.map((submission, index) => (
              <div key={index} className="bg-gray-50 dark:bg-dark-700 p-2 rounded text-xs mb-2">
                <div className="font-semibold">Type: {submission.surveyType}</div>
                <div>Time: {new Date(submission.timestamp).toLocaleString()}</div>
                <div>Questions: {Object.keys(submission.responses).length}</div>
                <details className="mt-1">
                  <summary className="cursor-pointer text-primary-500">View Responses</summary>
                  <pre className="mt-1 text-xs overflow-x-auto">
                    {JSON.stringify(submission.responses, null, 2)}
                  </pre>
                </details>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 