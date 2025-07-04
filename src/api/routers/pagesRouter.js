//src/api/routers/pagesRouter.js

import getCookies from '../../shared/getCookies.js';
import getNonce from '../../shared/getNonce';
const nonce = getNonce();

export async function forwardRequestToPagesRouter(request, env, lang, segments) {
	const cookies = getCookies(request.headers.get('cookie') || '');

	if (segments.length <= 2) {
		if (cookies['session_verifier'] === env.SESSION_VERIFIER.get()) {
			const { renderDashboard } = await import('../pages/renderDashboard.js');
			return renderDashboard(lang, nonce, cookies, 'index');
		}

		const { renderLanding } = await import('../pages/renderLanding.js');
		return renderLanding(lang, nonce, cookies, 'noindex');
	}

	return new Response(segments.length);
}
