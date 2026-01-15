import React from 'react';
import { ArrowRight, CheckCircle, Clock, DollarSign, BarChart3, ChevronLeft, ChevronRight } from 'lucide-react';
import { SurveyData, SurveyQuestion } from '../data/surveyData';

interface SurveyFormProps {
  survey: SurveyData;
  responses: Record<string, any>;
  currentStep: number;
  onInputChange: (questionId: string, value: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: () => void;
}

const SurveyForm: React.FC<SurveyFormProps> = ({
  survey,
  responses,
  currentStep,
  onInputChange,
  onNext,
  onPrevious,
  onSubmit
}) => {
  const currentQuestion = survey.questions[currentStep];
  const progress = ((currentStep + 1) / survey.questions.length) * 100;

  const renderQuestion = (question: SurveyQuestion) => {
    const currentValue = responses[question.id];

    switch (question.type) {
      case 'radio':
        return (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {question.options?.map((option, index) => (
              <label key={index} className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors">
                <input
                  type="radio"
                  name={question.id}
                  value={option}
                  checked={currentValue === option}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange(question.id, e.target.value)}
                  className="w-4 h-4 text-primary-500 focus:ring-primary-500"
                />
                <span className="font-montserrat text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        return (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {question.options?.map((option, index) => (
              <label key={index} className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors">
                <input
                  type="checkbox"
                  value={option}
                  checked={currentValue?.includes(option) || false}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const newValue = currentValue || [];
                    if (e.target.checked) {
                      onInputChange(question.id, [...newValue, option]);
                    } else {
                      onInputChange(question.id, newValue.filter((v: string) => v !== option));
                    }
                  }}
                  className="w-4 h-4 text-primary-500 focus:ring-primary-500"
                />
                <span className="font-montserrat text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'scale':
        return (
          <div className="flex flex-wrap gap-2 justify-center">
            {question.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => onInputChange(question.id, option)}
                className={`w-12 h-12 rounded-lg border-2 font-semibold transition-all duration-200 hover:scale-105 ${
                  currentValue === option
                    ? 'border-primary-500 bg-primary-500 text-white shadow-lg'
                    : 'border-gray-300 dark:border-dark-600 text-gray-700 dark:text-gray-300 hover:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        );

      case 'textarea':
        return (
          <textarea
            value={currentValue || ''}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onInputChange(question.id, e.target.value)}
            placeholder={question.placeholder}
            rows={3}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
          />
        );

      case 'text':
        return (
          <input
            type="text"
            value={currentValue || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange(question.id, e.target.value)}
            placeholder={question.placeholder}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 flex flex-col">
      {/* Compact Header - Fixed at top */}
      <div className="bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-dark-700 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-20 py-3">
          <div className="flex items-center justify-between">
            {/* Survey Info */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded" />
              </div>
              <div>
                <h1 className="font-dfaalt font-bold text-lg text-gray-900 dark:text-white leading-tight">
                  {survey.title}
                </h1>
                <p className="font-montserrat text-xs text-gray-600 dark:text-gray-400">
                  {currentStep + 1} of {survey.questions.length} • {survey.estimatedTime}
                </p>
              </div>
            </div>
            
            {/* Progress */}
            <div className="text-right">
              <div className="font-montserrat text-xs text-gray-600 dark:text-gray-400 mb-1">Progress</div>
              <div className="font-dfaalt font-bold text-lg text-primary-500">
                {Math.round(progress)}%
              </div>
            </div>
          </div>
          
          {/* Compact Progress Bar */}
          <div className="mt-3 w-full bg-gray-200 dark:bg-dark-700 rounded-full h-2">
            <div 
              className="bg-primary-500 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Content - Fits in viewport */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {/* Question Card */}
          <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-xl border border-gray-200 dark:border-dark-700 overflow-hidden">
            {/* Question Header */}
            <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 p-6 border-b border-gray-200 dark:border-dark-700">
              <h2 className="font-dfaalt font-bold text-xl sm:text-2xl text-gray-900 dark:text-white mb-2 leading-tight">
                {currentQuestion.question}
              </h2>
              {currentQuestion.required && (
                <p className="text-sm text-primary-500 dark:text-primary-400 font-medium">
                  * Required
                </p>
              )}
            </div>
            
            {/* Question Content */}
            <div className="p-6">
              {renderQuestion(currentQuestion)}
            </div>
            
            {/* Navigation Footer */}
            <div className="bg-gray-50 dark:bg-dark-700 px-6 py-4 border-t border-gray-200 dark:border-dark-600">
              <div className="flex items-center justify-between">
                {/* Previous Button */}
                <button
                  onClick={onPrevious}
                  disabled={currentStep === 0}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    currentStep === 0
                      ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-600'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Previous</span>
                </button>
                
                {/* Question Counter */}
                <div className="text-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {currentStep + 1} of {survey.questions.length}
                  </span>
                </div>
                
                {/* Next/Submit Button */}
                {currentStep === survey.questions.length - 1 ? (
                  <button
                    onClick={onSubmit}
                    className="flex items-center space-x-2 px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-lg"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Submit Survey</span>
                  </button>
                ) : (
                  <button
                    onClick={onNext}
                    className="flex items-center space-x-2 px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-lg"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="bg-white/60 dark:bg-dark-800/60 backdrop-blur-sm rounded-lg p-3 text-center border border-gray-200 dark:border-dark-700">
              <Clock className="w-4 h-4 text-primary-500 mx-auto mb-1" />
              <p className="text-xs text-gray-600 dark:text-gray-400">Time</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{survey.estimatedTime}</p>
            </div>
            <div className="bg-white/60 dark:bg-dark-800/60 backdrop-blur-sm rounded-lg p-3 text-center border border-gray-200 dark:border-dark-700">
              <BarChart3 className="w-4 h-4 text-accent-600 mx-auto mb-1" />
              <p className="text-xs text-gray-600 dark:text-gray-400">Questions</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{survey.questions.length}</p>
            </div>
            <div className="bg-white/60 dark:bg-dark-800/60 backdrop-blur-sm rounded-lg p-3 text-center border border-gray-200 dark:border-dark-700">
              <DollarSign className="w-4 h-4 text-success-600 mx-auto mb-1" />
              <p className="text-xs text-gray-600 dark:text-gray-400">Reward</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Guaranteed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyForm;
