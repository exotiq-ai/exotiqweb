export interface SMSConsentState {
  smsConsentTransactional: boolean;
  smsConsentMarketing: boolean;
}

/**
 * Consent audit fields to merge when the user entered a phone number.
 * Does not include `phone` — parent should send trimmed phone separately when non-empty.
 */
export function buildSmsConsentFields(
  phone: string | undefined,
  transactional: boolean,
  marketing: boolean
): Record<string, string | boolean> {
  const trimmed = phone?.trim() ?? '';
  if (!trimmed) {
    return {};
  }
  return {
    smsConsentTransactional: transactional,
    smsConsentMarketing: marketing,
    smsConsentTimestamp: new Date().toISOString(),
  };
}
