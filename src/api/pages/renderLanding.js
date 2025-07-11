import serverSideRender from '../../shared/serverSideRender.js';
import getPageResponseHeaders from '../../shared/getUserDataRelatedPageResponseHeaders.js';
import renderHeroSection from './sections/renderHeroSection.js';
export function renderLanding(lang, nonce, cookies, visibility = 'noindex') {
	const title = {
		fi: 'Be your own boss.',
		sv: 'Be your own boss.',
		en: 'Be your own boss.',
	};

	const description = {
		fi: 'Vorte on uranhallinnan ja taloudenhallinnan ohjelmisto, joka auttaa sinua rakentamaan itsenäisen tulevaisuuden ilman byrokratiaa.',
		sv: 'Vorte är en plattform för att hantera karriär och ekonomi ett självständigt sätt att nå dina mål utan onödig byråkrati.',
		en: 'Vorte is an intuitive tool for managing your career and finances giving you full control without complexity.',
	};

	const urls = {
		fi: '/fi',
		sv: '/sv',
		en: '/en',
	};

	//Always include a top level style sheet based on if its a Sales or Application page as well as a view specific stylesheet
	const stylesheets = `
    <link rel="stylesheet" href="/styles/view-specific/landing/style.css">
    `;

	const body = `
    ${renderHeroSection(lang)}
    `;

	const events = `<script type="module" src="/events/handleLandingEvents.js" defer></script>`;
	const page = serverSideRender(lang, nonce, cookies, stylesheets, title, description, urls, body, events);

	const headers = getPageResponseHeaders(lang, nonce, visibility);

	return new Response(page, {
		status: 200,
		headers: headers,
	});
}
