import getSearchEngineCard from '../shared/getSearchEngineCard.js';
import getOpenGraphCard from '../shared/getOpenGraphCard.js';
import getTwitterCard from '../shared/getTwitterCard.js';
import getSchemaLD from '../shared/getSchemaLD.js';
import getPwa from './getPwa.js';

export default function serverSideRender(lang, nonce, cookies, stylesheets, title, description, urls, body, events) {
	return `
    <!doctype html>
    <html 
    lang="${lang}" 
    data-theme="${cookies['data_theme'] || 'dark'}" 
    data-contrast="${cookies['data_contrast'] || 'normal'}">

    <head>
    <meta charset="UTF-8">
    ${stylesheets}
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ${getSearchEngineCard(lang, title, description, urls)}
    ${getOpenGraphCard(lang, title, description, urls)}
    ${getTwitterCard(lang, title, description, urls)}
    ${getSchemaLD(lang, nonce, title, description, urls)}
    ${getPwa(lang)}
    </head>
    <body>
    ${body}
        <script type="module" src="/scripts/app.js" defer></script>
    ${events}
    </body>
    </html>
    `;
}
