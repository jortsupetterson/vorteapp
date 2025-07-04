import serverSideRender from '../../shared/serverSideRender.js';
import getPageResponseHeaders from '../../shared/getUserDataRelatedPageResponseHeaders.js';
import renderAppBanner from '../../shared/components/renderAppBanner.js';
import renderAppShell from '../../shared/components/renderAppshell.js';
import renderAppSidebar from '../../shared/components/renderAppsidebar.js';
export function renderDashboard(lang, nonce, cookies, visibility = 'noindex') {
	const title = {
		fi: 'Ohjauspaneeli',
		sv: 'Instrumentpanelen',
		en: 'Dashboard',
	};

	const description = {
		fi: 'Hallinnoi talouttasi ja urapolkuasi Vortessa. Ole oman elämäsi pomo ilman kompromisseja.',
		sv: 'Hantera din ekonomi och karriär med Vorte. Bli din egen chef utan kompromisser.',
		en: 'Manage your finances and career with Vorte. Be the boss of your life no compromises.',
	};

	const urls = {
		fi: '/fi/ohjauspaneeli',
		sv: '/sv/instrumentpanelen',
		en: '/en/dashboard',
	};

	//Always include a top level style sheet based on if its a Sales or Application page as well as a view specific stylesheet
	const stylesheets = `
    <link rel="stylesheet" href="/styles/app-layout/app.css">
    `;

	const body = `
        ${renderAppBanner(lang)}
        ${renderAppShell(lang)}
        ${renderAppSidebar(lang)}
    `;
	const events = `<script type="module" src="/events/handleDashboardEvents.js" defer></script>`;
	const page = serverSideRender(lang, nonce, cookies, stylesheets, title, description, urls, body, events);

	const headers = getPageResponseHeaders(lang, nonce, visibility);

	return new Response(page, headers, { status: 200 });
}
