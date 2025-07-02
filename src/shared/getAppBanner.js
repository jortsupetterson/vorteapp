/**
 * Generates the application banner markup with interactive controls and localization.
 *
 * This function builds a fully accessible banner including:
 * - A pair of menu buttons for opening the applications menu and banner.
 * - A close button to hide the banner.
 * - A logo link directing to the dashboard.
 * - A personal settings link, localized by language.
 * - A language selector to switch between FI, SV, and EN.
 * - A sign-out link that clears the session and redirects to login, with a localized title and aria-label.
 *
 * All IDs and CSS classes match the existing style rules:
 * - Menu buttons: #applications, #burger inside .menu-buttons
 * - Banner container: .app-banner with role="banner"
 * - Close button: #hide-banner
 * - Logo block: h1 > a[href=dashLinks[lang]]
 * - User settings: #user-settings
 * - Language selector: .language-selector
 * - Sign-out: #sign-out
 *
 * @param {string} lang  Two-letter language code ('fi', 'sv', 'en').
 * @returns {string}     HTML string for insertion into the page.
 */
export default function getAppBanner(lang) {
	const dashLinks = {
		fi: '/fi/ohjauspaneeli',
		sv: '/sv/kontrollpanel',
		en: '/en/control-panel',
	};

	const personalSettingsLinks = {
		fi: '/fi/omat-asetukset',
		sv: '/sv/mina-inställningar',
		en: '/en/my-settings',
	};

	const logOutLinks = {
		fi: '/fi/kirjaudu-ulos',
		sv: '/sv/logga-ut',
		en: '/en/sign-out',
	};

	return `
    <div class="menu-buttons" role="navigation" aria-label="main controls">
      <button id="applications" aria-label="open applications menu">
        <div class="rectangle"></div>
        <div class="triangle"></div>
        <div class="circle"></div>
        <div class="soft-rectangle"></div>
      </button>
      <button id="burger" aria-label="open banner">
        <div class="bun"></div>
        <div class="beef"></div>
        <div class="bun"></div>
      </button>
    </div>

    <header class="app-banner" role="banner">
      <button id="hide-banner" aria-label="close banner">✕</button>

      <div id="first-half">
        <h1>
          <span aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>
          </span>
          <a href="${dashLinks[lang]}" aria-label="go to dashboard">Botti Example</a>
        </h1>
        <a
          href="${personalSettingsLinks[lang]}"
          id="user-settings"
          aria-label="${{ fi: 'omat asetukset', sv: 'mina inställningar', en: 'my settings' }[lang]}"
        >
          ${{ fi: 'omat asetukset', sv: 'mina inställningar', en: 'my settings' }[lang]}
        </a>
      </div>

      <div id="second-half">
        <nav role="navigation" aria-label="language selector">
          <ul class="language-selector">
            <li><a href="${dashLinks.fi}">FI</a></li>
            <li><a href="${dashLinks.sv}">SV</a></li>
            <li><a href="${dashLinks.en}">EN</a></li>
          </ul>
        </nav>

        <a
          href="${logOutLinks[lang]}"
          id="sign-out"
          title="${
						{
							fi: 'Poistaa istuntoevästeen ja uudelleen ohjaa sisäänkirjautumissivulle',
							sv: 'Tar bort sessionskakan och omdirigerar till inloggningssidan',
							en: 'Removes the session cookie and redirects to the login page',
						}[lang]
					}"
          aria-label="${{ fi: 'kirjaudu ulos', sv: 'logga ut', en: 'sign out' }[lang]}"
        >
          <strong>${{ fi: 'kirjaudu ulos', sv: 'logga ut', en: 'sign out' }[lang]}</strong>
        </a>
      </div>
    </header>
  `;
}
