/**
 |=====================================| 
 | @function getServiceResponseHeaders |
 |
 | Generates HTTP headers for REST API responses.
 | Includes JSON content type, security headers, CORS and cache control.
 |
 | @param {Object} [options={}] - Optional overrides
 | @param {string} [options.contentType='application/json'] - MIME type
 | @param {string} [options.allowOrigin='*'] - CORS origin (use exact origin in prod)
 | @param {number} [options.ttl=0] - TTL in seconds for Cache-Control
 | @returns {Record<string, string>}
 |
 */
export default function getServiceResponseHeaders(options = {}) {
	const {
		contentType = 'application/json',
		allowOrigin = '*',
		ttl = 0,
	} = options;

	return {
		'Content-Type': `${contentType}; charset=utf-8`,
		'Access-Control-Allow-Origin': allowOrigin,
		'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type, Authorization',
		'Access-Control-Allow-Credentials': 'true',
		'Cache-Control': `no-store, max-age=${ttl}`,
		'X-Content-Type-Options': 'nosniff',
		'X-Frame-Options': 'DENY',
		'Referrer-Policy': 'no-referrer',
		'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
		'Vary': 'Origin, Accept, Authorization',
		'Permissions-Policy': 'interest-cohort=()',
	};
}
