//src/api/routers/serviceRouter.js

/**
 |========================|
 | @module servicesRouter |
 |
 | Map-based dynamic-import dispatcher for service operations (read/write/delete).
 | Uses a static import map so esbuild can detect split points at build time.
 | Dispatch remains O(1): single lookup in object map, single import, single handler invocation.
 |
 */

// Constant, bounded set of supported operations
const SUPPORTED_OPS = new Set(['read', 'write', 'delete']);

/**
 |
 | Map of resource name -> dynamic-import function for that service module.
 | Each property is a lambda returning the import Promise
 | so esbuild can statically identify bundle split points.
 |
 */
const SERVICE_MODULE_LOADERS = {
	user: () => import('../services/userService.js'),
	order: () => import('../services/orderService.js'),
	// Add additional services here:
	// invoice: () => import('../services/invoiceService.js'),
};

/**
 * Forwards a service API request to the correct handler using a static import map.
 *
 * URL structure: /services/:operation/:resource
 *   - operation: 'read' | 'write' | 'delete'
 *   - resource: entity name (e.g. 'user', 'order')
 *
 * Big-O: O(1) per request — one map lookup, one import, one handler call.
 *
 * @param {Request} request
 * @param {Object} env
 * @param {string[]} segments
 * @returns {Promise<Response>}
 */
export async function forwardRequestToServicesRouter(request, env, segments) {
	const [, , operation, resource] = segments;

	// 1. Validate operation in constant time
	if (!SUPPORTED_OPS.has(operation)) {
		return new Response(JSON.stringify({ error: `Unsupported operation: ${operation}` }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	// 2. Lookup service loader in constant time
	const loader = SERVICE_MODULE_LOADERS[resource];
	if (!loader) {
		return new Response(JSON.stringify({ error: `Service not found: ${resource}` }), {
			status: 404,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	// 3. Parse payload (bounded by JSON size)
	let payload;
	try {
		payload = await request.json();
	} catch (_) {
		return new Response(JSON.stringify({ error: 'Invalid JSON payload' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	// 4. Dynamically import the module (esbuild split)
	let serviceModule;
	try {
		serviceModule = await loader();
	} catch (err) {
		return new Response(JSON.stringify({ error: `Failed to load service: ${resource}` }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	// 5. Identify handler function name
	const handlerName = `${operation}${resource.charAt(0).toUpperCase() + resource.slice(1)}`;
	const handler = serviceModule[handlerName];
	if (typeof handler !== 'function') {
		return new Response(JSON.stringify({ error: `Handler not implemented: ${handlerName}` }), {
			status: 501,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	// 6. Invoke handler and return result
	try {
		const result = await handler(payload, { request, env });
		return new Response(JSON.stringify(result), { status: 200, headers: { 'Content-Type': 'application/json' } });
	} catch (err) {
		return new Response(JSON.stringify({ error: err.message || 'Internal service error' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}
}
