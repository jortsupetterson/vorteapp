//src/client/main/app.js

/**
 |=============|
 | @module app |
 |
 | Bootstraps Client SPA: sets up global state, scheduler, routes,
 | a virtual DOM proxy, and starts the router—*without* an initial redraw.
 |
 */

import virtualize from './modules/virtualize.js';

// Make the reactive DOM proxy avaible everywhere:
globalThis.app = virtualize();

// Create a Object map of active routes:
const routes = {};

// Start the router (no intial Client-side render, SSR HTML remains until user action):

// Attach top-level layout events:
document.addEventListener('DOMContentLoaded', async () => {
	await import('./events/handleBannerButtonAndDropdownEvents.js').then((m) => m.default());

	await import('./events/handleShellButtonAndLayoutEvents.js').then((m) => m.default());

	await import('./events/handleSidebarButtonAndLayoutEvents.js').then((m) => m.default());
});
