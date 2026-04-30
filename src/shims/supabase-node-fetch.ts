/**
 * Browser shim for @supabase/node-fetch (npm package omits browser.js; Vite cannot resolve it).
 * Supabase client uses native fetch in the browser.
 */
const g = globalThis;

export default g.fetch.bind(g);
export const Headers = g.Headers;
export const Request = g.Request;
export const Response = g.Response;
