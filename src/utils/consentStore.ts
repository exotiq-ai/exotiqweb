/**
 * Durable consent storage.
 *
 * The consent record itself is strictly necessary, so it is kept in a
 * first-party cookie FIRST: in-app browsers (Instagram/Facebook), Safari
 * private mode and "block all cookies" profiles frequently make localStorage
 * throw or make it ephemeral, which silently drops the record and re-prompts
 * the visitor on every page load. Cookie -> localStorage -> memory, each layer
 * best-effort and non-throwing, so a blocked layer can never surface as a
 * consent loop.
 */

export interface CookiePreferences {
  essential: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: number | null;
}

export const CONSENT_COOKIE = 'exotiq_consent';
export const CONSENT_STORAGE_KEY = 'exotiq_cookie_preferences';
const MAX_AGE_SECONDS = 60 * 60 * 24 * 180; // 180 days

/** Last-resort mirror: keeps consent stable for the rest of the page view. */
let memoryConsent: CookiePreferences | null = null;

const isBrowser = () => typeof document !== 'undefined';

function isValid(value: unknown): value is CookiePreferences {
  if (!value || typeof value !== 'object') return false;
  const p = value as Record<string, unknown>;
  return (
    typeof p.essential === 'boolean' &&
    typeof p.functional === 'boolean' &&
    typeof p.analytics === 'boolean' &&
    typeof p.marketing === 'boolean'
  );
}

function readCookie(): CookiePreferences | null {
  if (!isBrowser()) return null;
  try {
    const match = document.cookie
      .split(';')
      .map((c) => c.trim())
      .find((c) => c.startsWith(`${CONSENT_COOKIE}=`));
    if (!match) return null;
    const parsed = JSON.parse(decodeURIComponent(match.slice(CONSENT_COOKIE.length + 1)));
    return isValid(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function writeCookie(prefs: CookiePreferences): void {
  if (!isBrowser()) return;
  try {
    const secure = window.location.protocol === 'https:' ? '; Secure' : '';
    document.cookie =
      `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(prefs))}` +
      `; Max-Age=${MAX_AGE_SECONDS}; Path=/; SameSite=Lax${secure}`;
  } catch {
    /* cookies unavailable — later layers still apply */
  }
}

function readStorage(): CookiePreferences | null {
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return isValid(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function writeStorage(prefs: CookiePreferences): void {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    /* storage blocked or full — the cookie is the source of truth */
  }
}

/** Returns the stored consent, or null if the visitor has not decided yet. */
export function readConsent(): CookiePreferences | null {
  const found = readCookie() ?? readStorage() ?? memoryConsent;
  if (found) memoryConsent = found;
  return found;
}

/** Persists consent across every available layer. Never throws. */
export function writeConsent(prefs: CookiePreferences): CookiePreferences {
  const record: CookiePreferences = { ...prefs, timestamp: Date.now() };
  memoryConsent = record;
  writeCookie(record);
  writeStorage(record);
  return record;
}

/**
 * True when the decision survived to a layer that outlives this page view.
 * Used to warn (not to block) when every persistence layer is unavailable.
 */
export function consentIsDurable(): boolean {
  return readCookie() !== null || readStorage() !== null;
}
