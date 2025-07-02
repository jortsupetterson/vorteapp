/**
 * Generates secure HTTP response headers for application pages.
 *
 * This function defines a strict Content Security Policy (CSP) and other HTTP headers
 * that enhance security, privacy, and caching behavior for app-like HTML pages.
 *
 * Key features:
 * - Prevents search engine indexing via X-Robots-Tag and meta-robots ("noindex, follow")
 * - Enforces strict CSP with support for inline styles/scripts using a dynamic nonce
 * - Allows images and fonts to be loaded from Vorte’s asset domain
 * - Prevents iframe embedding and legacy plugin usage (frame-ancestors, object-src)
 * - Sets cache policy to private, no-cache with revalidation
 * - Ensures modern browser behavior (COEP, CORP, HSTS, etc.)
 *
 * @param {string} lang - The content language (e.g. "en", "fi")
 * @param {string} nonce - A unique nonce used for inline scripts/styles
 * @returns {Object} A dictionary of HTTP headers
 */

export default function getAppPageResponseHeaders(lang, nonce) {
  const cacheControlValue = 'private, no-cache, must-revalidate';
  const varyValue = 'Accept-Encoding, Accept-Language';
  const referrerPolicyValue = 'no-referrer';
  const robotsTagValue = 'noindex, follow';
  const connectSrcValue = `'self'`;

  return {
    "Content-Security-Policy":
      `default-src 'self'; base-uri 'none'; form-action 'self'; ` +
      `script-src 'self' 'nonce-${nonce}'; style-src 'self' 'nonce-${nonce}'; ` +
      `img-src 'self' data: https://assets.vorte.app; font-src 'self' https://assets.vorte.app; ` +
      `connect-src ${connectSrcValue}; frame-ancestors 'none'; object-src 'none'`,
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "0",
    "Permissions-Policy": "geolocation=(), microphone=(), camera=(), payment=(), usb=()",
    "Referrer-Policy": referrerPolicyValue,
    "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
    "Cross-Origin-Embedder-Policy": "require-corp",
    "Cross-Origin-Opener-Policy": "same-origin",
    "Cross-Origin-Resource-Policy": "same-origin",
    "X-UA-Compatible": "IE=edge",
    "X-Robots-Tag": robotsTagValue,
    "Cache-Control": cacheControlValue,
    "ETag": `"autogenerate-if-needed"`,
    "Vary": varyValue,
    "Content-Type": "text/html; charset=utf-8",
    "Content-Language": lang
  };
}
