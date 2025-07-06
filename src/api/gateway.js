import { UserDO } from './durable-objects/userDO.js';
export { UserDO };

//src/api/gateway
/**
 |==================|
 |  @module gateway |
 |
 | Ultra-low-latency gateway module for Cloudflare Workers.
 | Big-O: O(1) for every request (constant-time operations on bounded sets and prefixes).
 | Guarantees: Always returns the exact page in the requested or negotiated language,
 | and correctly forwards service API calls with zero compromise on customer experience.
 */

// Dynamic code-splitting imports for optimal bundle size via esbuild
const UI_PREFIXES = new Set(['fi', 'sv', 'en']); // O(1) lookups
const DEFAULT_LANG = 'en'; // Default fallback language
const SERVICE_ROUTE = 'services'; // API prefix for service requests

/**
 |=============================|
 | @function negotiateLanguage |
 |
 | Parse the Accept-Language header and pick the first supported language.
 | Operates in O(1) time because the max number of entries is bounded by the HTTP spec.
 | 
 | @param {string|null} header - The raw Accept-Language header
 | @returns {string} - Negotiated language code
 | 
 */
function negotiateLanguage(header) {
	if (!header) return DEFAULT_LANG;

	// Only a small, bounded number of language tags expected in practice
	const parts = header.split(','); // O(1) on average (header length is constant-bound)
	for (let i = 0, len = parts.length; i < len; i++) {
		const tag = parts[i].trim().split(';', 1)[0].split('-', 1)[0]; // constant operations
		if (UI_PREFIXES.has(tag)) return tag;
	}
	return DEFAULT_LANG;
}

export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		const pathname = url.pathname;
		const segments = pathname.split('/'); // ['','prefix','...']
		const firstSeg = segments[1] || '';

		// O(1) route detection for service APIs
		if (firstSeg === SERVICE_ROUTE) {
			// Dynamic import only when needed -> code-splitting
			const { forwardRequestToServicesRouter } = await import('./routers/servicesRouter.js');
			return forwardRequestToServicesRouter(request, env, segments);
		}

		// UI page routing: ensure a supported language prefix
		let lang = firstSeg;
		let routedPath = pathname;
		if (!UI_PREFIXES.has(lang)) {
			// Negotiate language in constant time
			lang = negotiateLanguage(request.headers.get('Accept-Language'));
			// Prepend negotiated prefix for downstream routers
			routedPath = `/${lang}${pathname}`;
		}

		// Dynamic import for pages router -> code-splitting on demand
		const { forwardRequestToPagesRouter } = await import('./routers/pagesRouter.js');
		return forwardRequestToPagesRouter(request, env, lang, segments, UI_PREFIXES);
	},
};
