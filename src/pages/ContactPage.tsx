import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useFormSubmission } from '../hooks/useFormSubmission';
import LoadingSpinner from '../components/LoadingSpinner';
import SEOHead from '../components/SEOHead';
import { breadcrumbSchema } from '../data/structuredData';
import SMSConsentCheckboxes from '../components/SMSConsentCheckboxes';
import { buildSmsConsentFields } from '../types/smsConsent';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  fleetSize: string;
  message: string;
  smsConsentTransactional: boolean;
  smsConsentMarketing: boolean;
}

export default function ContactPage() {
  const { isSubmitting, isSubmitted, error, submitForm } = useFormSubmission();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    fleetSize: '',
    message: '',
    smsConsentTransactional: false,
    smsConsentMarketing: false,
  });

  useEffect(() => {
    if (!formData.phone.trim() && (formData.smsConsentTransactional || formData.smsConsentMarketing)) {
      setFormData((prev) => ({
        ...prev,
        smsConsentTransactional: false,
        smsConsentMarketing: false,
      }));
    }
  }, [formData.phone, formData.smsConsentTransactional, formData.smsConsentMarketing]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSmsConsentChange = (
    field: 'smsConsentTransactional' | 'smsConsentMarketing',
    value: boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const phoneTrim = formData.phone.trim();
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      subject: formData.subject,
      fleetSize: formData.fleetSize,
      message: formData.message,
      ...(phoneTrim
        ? {
            phone: phoneTrim,
            ...buildSmsConsentFields(
              formData.phone,
              formData.smsConsentTransactional,
              formData.smsConsentMarketing
            ),
          }
        : {}),
    };
    await submitForm(payload, 'contact');
  };

  return (
    <div className="pt-16">
      <SEOHead
        title="Contact Exotiq.ai - Get in Touch with Our Team"
        description="Contact Exotiq.ai for beta access, partnerships, investor relations, or support. We respond to general inquiries within 24-48 hours and partnership inquiries same day."
        keywords="contact Exotiq.ai, fleet management support, beta access request, partnership inquiry, investor relations, customer support"
        url="https://exotiq.ai/contact"
        structuredData={breadcrumbSchema([
          { name: "Home", url: "https://exotiq.ai" },
          { name: "Contact", url: "https://exotiq.ai/contact" }
        ])}
      />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-dark-800 dark:to-dark-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-20 text-center">
          <h1 className="font-dfaalt font-bold text-5xl md:text-6xl text-gray-900 dark:text-white mb-6 animate-slide-up">
            Let's Connect
          </h1>
          <p className="font-montserrat text-xl text-gray-600 dark:text-gray-300 mb-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
            Ready to transform your fleet management? Have questions about Exotiq? 
            We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-white dark:bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-gray-50 dark:bg-dark-800 p-8 rounded-2xl animate-slide-up">
              <h2 className="font-dfaalt font-bold text-3xl text-gray-900 dark:text-white mb-6">
                Send Us a Message
              </h2>
              
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="flex items-center justify-center w-16 h-16 bg-success-600 rounded-full mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-dfaalt font-bold text-2xl text-gray-900 dark:text-white mb-4">
                    Message Sent Successfully!
                  </h3>
                  <p className="font-montserrat text-gray-600 dark:text-gray-300 mb-6">
                    Thanks {formData.firstName}! We have received your message and will get back to you within 24 hours.
                  </p>
                  <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg">
                    <p className="font-montserrat text-sm text-primary-600 dark:text-primary-300">
                      We’ll reply to {formData.email}. We don’t send an automatic confirmation email from this form yet.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div role="alert" className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center space-x-2">
                      <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                      <span className="font-montserrat text-red-700 dark:text-red-300">{error}</span>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="group">
                      <label className="block font-montserrat font-medium text-gray-700 dark:text-gray-300 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200 group-hover:shadow-md disabled:opacity-50"
                      />
                    </div>
                    <div className="group">
                      <label className="block font-montserrat font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200 group-hover:shadow-md disabled:opacity-50"
                      />
                    </div>
                  </div>
                  
                  <div className="group">
                    <label className="block font-montserrat font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200 group-hover:shadow-md disabled:opacity-50"
                    />
                  </div>

                  <div className="group">
                    <label className="block font-montserrat font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone <span className="text-gray-500 font-normal">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      autoComplete="tel"
                      disabled={isSubmitting}
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200 group-hover:shadow-md disabled:opacity-50"
                    />
                  </div>

                  <SMSConsentCheckboxes
                    visible={formData.phone.trim() !== ''}
                    smsTransactional={formData.smsConsentTransactional}
                    smsMarketing={formData.smsConsentMarketing}
                    onChange={handleSmsConsentChange}
                    disabled={isSubmitting}
                  />
                  
                  <div className="group">
                    <label className="block font-montserrat font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subject
                    </label>
                    <select 
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200 group-hover:shadow-md disabled:opacity-50"
                    >
                      <option value="">Select a topic</option>
                      <option value="beta">Beta Access</option>
                      <option value="partnership">Partnership Inquiry</option>
                      <option value="investor">Investor Relations</option>
                      <option value="press">Press & Media</option>
                      <option value="support">Technical Support</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="group">
                    <label className="block font-montserrat font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Fleet Size (Optional)
                    </label>
                    <select 
                      name="fleetSize"
                      value={formData.fleetSize}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200 group-hover:shadow-md disabled:opacity-50"
                    >
                      <option value="">Select fleet size</option>
                      <option value="1-5">1-5 vehicles</option>
                      <option value="6-15">6-15 vehicles</option>
                      <option value="16-50">16-50 vehicles</option>
                      <option value="50+">50+ vehicles</option>
                      <option value="planning">Planning to start</option>
                    </select>
                  </div>
                  
                  <div className="group">
                    <label className="block font-montserrat font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      required
                      disabled={isSubmitting}
                      placeholder="Tell us about your fleet management needs, partnership ideas, or any questions you have..."
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200 group-hover:shadow-md disabled:opacity-50 resize-none"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full font-poppins font-bold text-sm uppercase tracking-wide px-8 py-4 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-400 text-white rounded-lg transition-all duration-200 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <LoadingSpinner size="sm" color="white" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Information */}
            <div className="space-y-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
              <div>
                <h2 className="font-dfaalt font-bold text-3xl text-gray-900 dark:text-white mb-6">
                  Get in Touch
                </h2>
                <p className="font-montserrat text-lg text-gray-600 dark:text-gray-300 mb-8">
                  Whether you are a fleet owner looking to scale, an investor interested in the future 
                  of car sharing, or a partner wanting to collaborate, we want to hear from you.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4 group">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="font-dfaalt font-semibold text-xl text-gray-900 dark:text-white mb-1">
                      Email
                    </h3>
                    <p className="font-montserrat text-gray-600 dark:text-gray-300 mb-1">
                      For all inquiries
                    </p>
                    <a 
                      href="mailto:hello@exotiq.ai"
                      className="font-montserrat text-primary-500 dark:text-primary-400 hover:underline"
                    >
                      hello@exotiq.ai
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group">
                  <div className="flex items-center justify-center w-12 h-12 bg-accent-100 dark:bg-accent-900/30 rounded-lg group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6 text-accent-600" />
                  </div>
                  <div>
                    <h3 className="font-dfaalt font-semibold text-xl text-gray-900 dark:text-white mb-1">
                      Phone
                    </h3>
                    <p className="font-montserrat text-gray-600 dark:text-gray-300 mb-1">
                      For urgent matters
                    </p>
                    <a 
                      href="tel:+19703439634"
                      className="font-montserrat text-accent-600 dark:text-accent-400 hover:underline"
                    >
                      +1 970.343.9634
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group">
                  <div className="flex items-center justify-center w-12 h-12 bg-secondary-100 dark:bg-secondary-900/30 rounded-lg group-hover:scale-110 transition-transform">
                    <MapPin className="w-6 h-6 text-secondary-600" />
                  </div>
                  <div>
                    <h3 className="font-dfaalt font-semibold text-xl text-gray-900 dark:text-white mb-1">
                      Office
                    </h3>
                    <p className="font-montserrat text-gray-600 dark:text-gray-300">
                      San Francisco, CA<br />
                      United States
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 p-6 rounded-xl">
                <h3 className="font-dfaalt font-semibold text-xl text-gray-900 dark:text-white mb-3">
                  Response Times
                </h3>
                <div className="space-y-2 font-montserrat text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex justify-between">
                    <span>General inquiries:</span>
                    <span className="font-medium">24-48 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Partnership inquiries:</span>
                    <span className="font-medium">Same day</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Investor relations:</span>
                    <span className="font-medium">Same day</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Technical support:</span>
                    <span className="font-medium">4-6 hours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}