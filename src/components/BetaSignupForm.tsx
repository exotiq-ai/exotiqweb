import React, { useState } from 'react';
import { CheckCircle, AlertCircle, Check } from 'lucide-react';
import { useFormSubmission } from '../hooks/useFormSubmission';
import LoadingSpinner from './LoadingSpinner';

interface BetaFormData {
  fullName: string;
  email: string;
  fleetSize: string;
  currentPlatform: string;
  challenge: string;
}

export default function BetaSignupForm() {
  const { isSubmitting, isSubmitted, error, submitForm } = useFormSubmission();
  const [formData, setFormData] = useState<BetaFormData>({
    fullName: '',
    email: '',
    fleetSize: '',
    currentPlatform: '',
    challenge: ''
  });
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});
  const [validFields, setValidFields] = useState<{[key: string]: boolean}>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateField = (name: string, value: string) => {
    let error = '';
    let isValid = false;

    switch (name) {
      case 'fullName':
        if (value.length < 2) {
          error = 'Name must be at least 2 characters';
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          error = 'Name should only contain letters';
        } else {
          isValid = true;
        }
        break;
      case 'email':
        if (!validateEmail(value)) {
          error = 'Please enter a valid email address';
        } else {
          isValid = true;
        }
        break;
      case 'fleetSize':
        isValid = value.length > 0;
        break;
    }

    setValidationErrors(prev => ({
      ...prev,
      [name]: error
    }));
    setValidFields(prev => ({
      ...prev,
      [name]: isValid
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Validate on change for better UX
    if (value) {
      validateField(name, value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm(formData, 'beta');
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto text-center animate-slide-up">
        <div className="flex items-center justify-center w-12 sm:w-16 h-12 sm:h-16 bg-success-600 rounded-full mx-auto mb-4">
          <CheckCircle className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
        </div>
        <h3 className="font-dfaalt font-bold text-xl sm:text-2xl text-white mb-4">
          Welcome to the Beta!
        </h3>
        <p className="font-montserrat text-base sm:text-lg opacity-90 mb-6">
          Thanks {formData.fullName}! We've secured your spot and you'll receive an email with next steps within 24 hours.
        </p>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <p className="font-montserrat text-sm opacity-75">
            🎉 You're now #79 on our exclusive beta list
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <span className="font-montserrat text-red-400 text-sm">{error}</span>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
        {/* Full Name - Floating Label with Validation */}
        <div className="relative group">
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder=" "
            className={`peer font-montserrat w-full px-4 pt-6 pb-2 pr-12 rounded-xl bg-white dark:bg-dark-800 text-gray-900 dark:text-white border-2 ${
              validFields.fullName ? 'border-success-500 dark:border-success-500' :
              validationErrors.fullName ? 'border-red-500 dark:border-red-500' : 
              'border-gray-300 dark:border-dark-600'
            } focus:border-primary-500 dark:focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all duration-250 text-base min-h-[56px]`}
            required
            disabled={isSubmitting}
          />
          <label 
            htmlFor="fullName"
            className="absolute left-4 top-1/2 -translate-y-1/2 font-montserrat text-gray-500 dark:text-gray-400 transition-all duration-250 pointer-events-none peer-focus:top-3 peer-focus:text-xs peer-focus:text-primary-600 dark:peer-focus:text-primary-400 peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-600 dark:peer-[:not(:placeholder-shown)]:text-gray-400"
          >
            Full Name
          </label>
          {validFields.fullName && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <Check className="w-5 h-5 text-success-500" />
            </div>
          )}
          {validationErrors.fullName && (
            <p className="absolute -bottom-5 left-0 text-xs text-red-500 dark:text-red-400">{validationErrors.fullName}</p>
          )}
        </div>

        {/* Email - Floating Label with Validation */}
        <div className="relative group">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder=" "
            className={`peer font-montserrat w-full px-4 pt-6 pb-2 pr-12 rounded-xl bg-white dark:bg-dark-800 text-gray-900 dark:text-white border-2 ${
              validFields.email ? 'border-success-500 dark:border-success-500' :
              validationErrors.email ? 'border-red-500 dark:border-red-500' : 
              'border-gray-300 dark:border-dark-600'
            } focus:border-primary-500 dark:focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all duration-250 text-base min-h-[56px]`}
            required
            disabled={isSubmitting}
          />
          <label 
            htmlFor="email"
            className="absolute left-4 top-1/2 -translate-y-1/2 font-montserrat text-gray-500 dark:text-gray-400 transition-all duration-250 pointer-events-none peer-focus:top-3 peer-focus:text-xs peer-focus:text-primary-600 dark:peer-focus:text-primary-400 peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-600 dark:peer-[:not(:placeholder-shown)]:text-gray-400"
          >
            Email Address
          </label>
          {validFields.email && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <Check className="w-5 h-5 text-success-500" />
            </div>
          )}
          {validationErrors.email && (
            <p className="absolute -bottom-5 left-0 text-xs text-red-500 dark:text-red-400">{validationErrors.email}</p>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
        {/* Fleet Size - Premium Select */}
        <div className="relative group">
          <select 
            name="fleetSize"
            value={formData.fleetSize}
            onChange={handleInputChange}
            className="font-montserrat w-full px-4 pt-6 pb-2 rounded-xl bg-white dark:bg-dark-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-dark-600 focus:border-accent-500 dark:focus:border-accent-500 focus:outline-none transition-all duration-250 text-base min-h-[56px] appearance-none cursor-pointer"
            required
            disabled={isSubmitting}
          >
            <option value="">Select fleet size</option>
            <option value="1-5">1-5 vehicles</option>
            <option value="6-15">6-15 vehicles</option>
            <option value="16-50">16-50 vehicles</option>
            <option value="50+">50+ vehicles</option>
          </select>
          <label 
            className="absolute left-4 top-3 font-montserrat text-xs text-gray-600 dark:text-gray-400 pointer-events-none"
          >
            Fleet Size
          </label>
          {/* Custom dropdown arrow */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Current Platform - Floating Label */}
        <div className="relative group">
          <input
            type="text"
            name="currentPlatform"
            value={formData.currentPlatform}
            onChange={handleInputChange}
            placeholder=" "
            className="peer font-montserrat w-full px-4 pt-6 pb-2 rounded-xl bg-white dark:bg-dark-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-dark-600 focus:border-accent-500 dark:focus:border-accent-500 focus:outline-none transition-all duration-250 text-base min-h-[56px]"
            disabled={isSubmitting}
          />
          <label 
            htmlFor="currentPlatform"
            className="absolute left-4 top-1/2 -translate-y-1/2 font-montserrat text-gray-500 dark:text-gray-400 transition-all duration-250 pointer-events-none peer-focus:top-3 peer-focus:text-xs peer-focus:text-primary-600 dark:peer-focus:text-primary-400 peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-600 dark:peer-[:not(:placeholder-shown)]:text-gray-400"
          >
            Current Platform (Optional)
          </label>
        </div>
      </div>
      
      {/* Challenge - Floating Label Textarea */}
      <div className="relative mb-8 group">
        <textarea
          name="challenge"
          value={formData.challenge}
          onChange={handleInputChange}
          placeholder=" "
          rows={4}
          className="peer font-montserrat w-full px-4 pt-6 pb-3 rounded-xl bg-white dark:bg-dark-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-dark-600 focus:border-accent-500 dark:focus:border-accent-500 focus:outline-none transition-all duration-250 resize-none text-base"
          disabled={isSubmitting}
        />
        <label 
          htmlFor="challenge"
          className="absolute left-4 top-3 font-montserrat text-xs text-gray-600 dark:text-gray-400 transition-all duration-250 pointer-events-none peer-focus:text-primary-600 dark:peer-focus:text-primary-400"
        >
          Your Biggest Challenge (Optional)
        </label>
      </div>
      
      {/* Premium Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="group relative w-full font-montserrat font-semibold text-base px-8 py-4 bg-accent-600 hover:bg-accent-700 disabled:bg-accent-400 text-white rounded-xl transition-all duration-250 hover:scale-[1.02] active:scale-[0.98] disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2.5 min-h-[56px] shadow-xl hover:shadow-2xl overflow-hidden"
      >
        <span className="absolute inset-0 bg-white/20 scale-0 group-active:scale-100 transition-transform duration-500 rounded-xl"></span>
        <span className="relative z-10 flex items-center space-x-2.5">
          {isSubmitting ? (
            <>
              <LoadingSpinner size="sm" color="white" variant="dots" />
              <span>Securing Your Spot...</span>
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5 transition-transform duration-250 group-hover:scale-110" />
              <span>Secure My Beta Spot</span>
            </>
          )}
        </span>
      </button>
      
      {/* Social Proof Below Form */}
      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4 font-montserrat">
        Join <span className="font-semibold text-accent-600 dark:text-accent-400">79+ operators</span> already in our exclusive beta
      </p>
    </form>
  );
}