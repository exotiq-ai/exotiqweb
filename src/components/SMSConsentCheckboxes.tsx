import React from 'react';
import { Link } from 'react-router-dom';

export interface SMSConsentCheckboxesProps {
  smsTransactional: boolean;
  smsMarketing: boolean;
  onChange: (field: 'smsConsentTransactional' | 'smsConsentMarketing', value: boolean) => void;
  disabled?: boolean;
  /** When false, nothing is rendered (e.g. no phone number yet). */
  visible: boolean;
  className?: string;
}

export default function SMSConsentCheckboxes({
  smsTransactional,
  smsMarketing,
  onChange,
  disabled = false,
  visible,
  className = '',
}: SMSConsentCheckboxesProps) {
  if (!visible) {
    return null;
  }

  return (
    <div
      className={`rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700/50 p-4 space-y-4 ${className}`}
      role="group"
      aria-label="SMS text message consent (optional)"
    >
      <p className="font-montserrat text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
        Providing your phone number does not opt you in to text messages. Optional checkboxes below are
        the only way to consent. SMS consent data is not sold or shared with third parties except our SMS
        delivery providers. See our{' '}
        <Link to="/privacy" className="text-primary-500 hover:text-primary-600 underline">
          Privacy Policy
        </Link>{' '}
        and{' '}
        <Link to="/sms-terms" className="text-primary-500 hover:text-primary-600 underline">
          SMS Terms
        </Link>
        .
      </p>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          name="smsConsentTransactional"
          checked={smsTransactional}
          onChange={(e) => onChange('smsConsentTransactional', e.target.checked)}
          disabled={disabled}
          className="mt-1 h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500 disabled:opacity-50"
        />
        <span className="font-montserrat text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          I consent to receive transactional text messages from Exotiq at the phone number provided (e.g.,
          booking confirmations, reminders, account alerts). Message frequency may vary. Message and data
          rates may apply. Reply HELP for help or STOP to opt out.
        </span>
      </label>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          name="smsConsentMarketing"
          checked={smsMarketing}
          onChange={(e) => onChange('smsConsentMarketing', e.target.checked)}
          disabled={disabled}
          className="mt-1 h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500 disabled:opacity-50"
        />
        <span className="font-montserrat text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          I consent to receive marketing and promotional text messages from Exotiq at the phone number
          provided. Message frequency may vary. Message and data rates may apply. Reply HELP for help or
          STOP to opt out.
        </span>
      </label>
    </div>
  );
}
