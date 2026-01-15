import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { breadcrumbSchema } from '../data/structuredData';
import { surveys, SurveyData, SurveyQuestion } from '../data/surveyData';
import { SurveyService } from '../services/surveyService';
import logger from '../utils/logger';
import SurveyDebug from '../components/SurveyDebug';

// Lazy load heavy components and icons
const SurveyIcons = lazy(() => import('../components/SurveyIcons'));
const SurveyForm = lazy(() => import('../components/SurveyForm'));
const SurveyThankYou = lazy(() => import('../components/SurveyThankYou'));

export default function SurveyPage() {
  const [searchParams] = useSearchParams();
  const surveyType = searchParams.get('type');

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Update useState hooks to have explicit types
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const currentSurvey = surveyType && surveys[surveyType as keyof typeof surveys];

  const handleInputChange = (questionId: string, value: any) => {
    setResponses((prev: Record<string, any>) => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (currentSurvey && currentStep < currentSurvey.questions.length - 1) {
      setCurrentStep((prev: number) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev: number) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      // Scroll to top to show thank you message
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Prepare survey data
      const surveyData = {
        surveyType: surveyType || 'general',
        responses,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        sessionId: sessionStorage.getItem('exotiq_session_id') || 'unknown'
      };

      logger.debug('Submitting survey data', { surveyType, responseCount: Object.keys(responses).length });

      // Use the survey service to handle submission
      const success = await SurveyService.submitSurvey(surveyData);
      
      if (success) {
        logger.info('Survey submitted successfully', { surveyType });
        
        // Track analytics if available
        if (window.gtag) {
          window.gtag('event', 'survey_completed', {
            survey_type: surveyType,
            response_count: Object.keys(responses).length
          });
        }
      }
    } catch (error) {
      logger.error('Error submitting survey', { error });
      // Still show success to user even if submission fails
    }
    
    setIsSubmitted(true);
  };

  // If survey is submitted, show thank you page
  if (isSubmitted) {
    return (
      <Suspense fallback={<div className="animate-pulse">Loading...</div>}>
        <SurveyThankYou surveyType={surveyType} />
      </Suspense>
    );
  }

  // If no survey type or invalid survey, show survey selection
  if (!currentSurvey) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 dark:from-dark-900 dark:to-dark-800">
        <SEOHead
          title="Fleet Management Survey - Help Shape Exotiq.ai"
          description="Share your fleet management experience and help shape Exotiq.ai's development. Choose from surveys for small fleets (1-5 vehicles), scaling operations (6-50 vehicles), or exotic/luxury fleets."
          keywords="fleet management survey, Turo hosting feedback, vehicle rental insights, fleet operations research, Exotiq.ai development"
          url="https://exotiq.ai/survey"
          structuredData={breadcrumbSchema([
            { name: "Home", url: "https://exotiq.ai" },
            { name: "Survey", url: "https://exotiq.ai/survey" }
          ])}
        />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-20 pt-24 pb-16 sm:pt-28 sm:pb-20">
          <div className="text-center mb-8 sm:mb-12">
            {/* Incentive Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-accent-500/20 dark:bg-accent-500/30 rounded-full text-accent-600 dark:text-accent-400 font-semibold text-sm mb-6 border border-accent-500/30">
              <span>🎁 Get $25 + Priority Beta Access</span>
            </div>
            
            <h1 className="font-dfaalt font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight">
              Join the Founder's Circle
            </h1>
            <p className="font-montserrat text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-4">
              Share your fleet management experience and help shape the platform built for operators like you.
            </p>
            <p className="font-montserrat text-sm text-gray-500 dark:text-gray-400">
              ⏱️ Takes only 5 minutes • Qualified operators receive a $25 gift card
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(surveys).map(([key, survey]) => (
              <Link
                key={key}
                to={`/survey?type=${key}`}
                className="group bg-white dark:bg-dark-800 p-8 rounded-2xl border border-gray-200 dark:border-dark-700 hover:border-primary-300 dark:hover:border-primary-500 transition-all duration-200 hover:shadow-xl hover:scale-[1.02] flex flex-col"
              >
                <div className="text-center flex-1 flex flex-col">
                  {/* Consistent 64x64px icon container */}
                  <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                    <Suspense fallback={<div className="w-8 h-8 bg-gray-300 rounded animate-pulse" />}>
                      <SurveyIcons type={key} />
                    </Suspense>
                  </div>
                  
                  {/* Consistent h3 hierarchy */}
                  <h3 className="font-dfaalt font-bold text-xl text-gray-900 dark:text-white mb-3 leading-tight">
                    {survey.title}
                  </h3>
                  
                  {/* Description with consistent spacing */}
                  <p className="font-montserrat text-base text-gray-600 dark:text-gray-300 mb-6 leading-relaxed flex-1">
                    {survey.description}
                  </p>
                  
                  {/* CTA with consistent sizing */}
                  <div className="flex items-center justify-center text-primary-500 dark:text-primary-400 group-hover:text-primary-600 dark:group-hover:text-primary-300 font-semibold">
                    <span className="text-base">Start Survey</span>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Show the actual survey form
  return (
    <Suspense fallback={<div className="animate-pulse">Loading survey...</div>}>
      <SurveyForm
        survey={currentSurvey}
        responses={responses}
        currentStep={currentStep}
        onInputChange={handleInputChange}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onSubmit={handleSubmit}
      />
    </Suspense>
  );
}
