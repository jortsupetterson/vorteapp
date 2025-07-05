// src/api/routers/pagesRouter.js

/**
 |=====================|
 | @module pagesRouter |
 | 
 |
 */

import getCookies from '../../shared/getCookies.js';
import getNonce from '../../shared/getNonce.js';

const nonce = getNonce();

/**
 * 1) Define route configurations as a flat array:
 *    • names: array of all alias segments for a given route
 *    • handler: async function that performs a dynamic import and calls the renderer
 *
 * This keeps code DRY and maintainable when dealing with hundreds of routes.
 * Big-O: building this array is O(R), where R is number of route definitions (cold start only).
 */
const routeDefinitions = [
	{
		names: ['landing', 'koti', 'hem', 'home'],
		handler: async (lang, cookies) => {
			const { renderLanding } = await import('../pages/renderLanding.js');
			return renderLanding(lang, nonce, cookies, 'noindex');
		},
	},
	{
		names: ['dashboard', 'ohjauspaneeli', 'instrument-panel'],
		handler: async (lang, cookies) => {
			const { renderDashboard } = await import('../pages/renderDashboard.js');
			return renderDashboard(lang, nonce, cookies, 'noindex');
		},
	},
	{
		names: ['tulossa', 'komming-soon', 'coming-soon'],
		handler: async (lang, cookies) => {
			const { renderLanding } = await import('../pages/renderLanding.js');
			return renderLanding(lang, nonce, cookies, 'noindex');
		},
	},
	// …add additional route definitions here…
];

/**
 * 2) Build a prototypeless handlers map for O(1) lookups:
 *    • Each alias points to its route handler
 *    • Cold start overhead: O(R * S), where S is average aliases per route (one-time setup)
 */
const handlers = Object.create(null);
for (const def of routeDefinitions) {
	for (const name of def.names) {
		handlers[name] = def.handler;
	}
}

/**
 * 3) Main router function: constant-time operations per request
 *    • Root paths ("/", "/fi"): check session in O(1)
 *    • Last segment lookup: single map access in O(1)
 *    • Fallback: direct map access in O(1)
 */
export async function forwardRequestToPagesRouter(request, env, lang, segments) {
	const cookieHeader = request.headers.get('cookie') || '';
	const cookies = getCookies(cookieHeader);
	const sessionValid = cookies['session_verifier'] === env.SESSION_VERIFIER.get();

	// 3a) Root or lang root
	if (segments.length <= 2) {
		const key = sessionValid ? 'dashboard' : 'landing';
		return handlers[key](lang, cookies);
	}

	// 3b) Lookup last segment directly in handlers map
	let lastSeg = segments[segments.length - 1];

	if (lastSeg === '') {
		lastSeg = segments[segments.length - 2];
	}

	const handler = handlers[lastSeg];

	if (handler) {
		return handler(lang, cookies);
	}

	// 3c) Fallback route
	const fallbackKey = sessionValid ? 'dashboard' : 'landing';
	return handlers[fallbackKey](lang, cookies);
}

/**
 * Performance and maintainability notes:
 * - Dynamic import within handlers ensures code-splitting: only the required page modules are loaded per request.
 * - Handlers map access is the only operation in the hot path: a single O(1) lookup.
 * - routeDefinitions array is maintained in one place, making it easy to add or remove routes without duplicating loops.
 * - All Big-O complexities in the request path are O(1), satisfying low-latency requirements even with hundreds of routes.
 */
