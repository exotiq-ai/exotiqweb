import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, CheckCircle, DollarSign } from 'lucide-react';

interface SurveyThankYouProps {
  surveyType: string | null;
}

const SurveyThankYou: React.FC<SurveyThankYouProps> = ({ surveyType }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-success-50 to-success-100 dark:from-success-900/20 dark:to-success-800/20 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Success Animation */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center w-20 h-20 bg-success-600 rounded-full mx-auto mb-4 animate-bounce">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          
          {/* Main Thank You Message */}
          <h1 className="font-dfaalt font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white mb-3 animate-slide-up">
            Thank You! 🎉
          </h1>
          <p className="font-montserrat text-lg text-gray-600 dark:text-gray-300 animate-slide-up" style={{ animationDelay: '200ms' }}>
            Your insights are invaluable in helping us build the perfect fleet management solution.
          </p>
        </div>
        
        {/* What Happens Next Card */}
        <div className="bg-white dark:bg-dark-700 rounded-2xl shadow-xl border border-gray-200 dark:border-dark-600 overflow-hidden animate-slide-up" style={{ animationDelay: '400ms' }}>
          <div className="p-6">
            <h3 className="font-dfaalt font-bold text-xl text-gray-900 dark:text-white mb-4 text-center">
              What happens next?
            </h3>
            
            {/* Incentive Highlight */}
            <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 p-4 rounded-xl mb-4 border border-primary-200 dark:border-primary-800">
              <div className="flex items-center justify-center space-x-2">
                <DollarSign className="w-5 h-5 text-primary-500" />
                <span className="font-dfaalt font-bold text-primary-600 dark:text-primary-300 text-center">
                  First 50 respondents get priority beta access + $25 Amazon gift card
                </span>
              </div>
            </div>
            
            {/* Timeline - Compact */}
            <div className="space-y-3 mb-6">
              <div className="flex items-start space-x-3">
                <div className="flex items-center justify-center w-6 h-6 bg-primary-500 rounded-full flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-xs">1</span>
                </div>
                <div>
                  <h4 className="font-dfaalt font-semibold text-gray-900 dark:text-white text-sm">Analysis Phase</h4>
                  <p className="font-montserrat text-xs text-gray-600 dark:text-gray-300">We'll analyze your responses within 48 hours</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex items-center justify-center w-6 h-6 bg-accent-600 rounded-full flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-xs">2</span>
                </div>
                <div>
                  <h4 className="font-dfaalt font-semibold text-gray-900 dark:text-white text-sm">Beta Access</h4>
                  <p className="font-montserrat text-xs text-gray-600 dark:text-gray-300">You'll receive priority beta access when we launch</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex items-center justify-center w-6 h-6 bg-success-600 rounded-full flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-xs">3</span>
                </div>
                <div>
                  <h4 className="font-dfaalt font-semibold text-gray-900 dark:text-white text-sm">Reward Delivery</h4>
                  <p className="font-montserrat text-xs text-gray-600 dark:text-gray-300">Your incentive will be sent to your email within 5 business days</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="bg-gray-50 dark:bg-dark-600 px-6 py-4 border-t border-gray-200 dark:border-dark-500">
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/"
                className="font-poppins font-bold text-sm uppercase tracking-wide px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-all duration-200 hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>Back to Home</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="font-poppins font-bold text-sm uppercase tracking-wide px-6 py-3 border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <span>Contact Us</span>
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyThankYou;
