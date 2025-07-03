import texts from '../i18n/getAppBannerTextContent.js';

export default function renderAppBanner(lang, title) {
	return `
        <banner role="banner">
      <nav-button
        role="button"
        title="${texts.navButton.title[lang]}"
      >
        <div></div>
        <div></div>
        <div></div>
      </nav-button>

      <location-indicator
        role="status"
        aria-live="polite"
        aria-label="${texts.locationIndicator.ariaLabel[lang]}"
      >
        ${title[lang]}
      </location-indicator>

      <nav-dropdown role="menubar">

          <menu-item 
          role="button"
          title="${texts}"
          >Install Vorte to your device</menu-item>

        <menu-heading>${texts.menuHeading[lang]}</menu-heading>

        <a
          href="/en/control-panel"
          hreflang="en"
          title="Navigate to My Vorte control panel"
        >
          <menu-item>Control panel</menu-item>
        </a>

        <details>
          <summary>
            <menu-item>Apps</menu-item>
          </summary>

          <ul>
            <li>
              <a
                href="/en/road-to-entrepreneurship"
                hreflang="en"
                title="Navigate to road to entrepreneurship application"
              >
                <menu-sub-item>Road to entrepeneurship</menu-item>
              </a>
            </li>

            <li>
              <a
                href="/en/my-vorte/coming-soon"
                hreflang="en"
                title="Navigate to a page listing coming up My Vorte apps"
              >
                <menu-sub-item>Coming soon...</menu-item>
              </a>
            </li>
          </ul>
        </details>

        <menu-heading>VORTEPRENEUR</menu-heading>
        <a
          href="/en/vortepreneur/coming-soon"
          hreflang="en"
          title="Navigate to a page listing coming up Vortepreneur apps"
        >
          <menu-item>Coming soon...</menu-item>
        </a>
      </nav-dropdown>

      <profile-button
        role="button"
        title="Profile settings menu"
      >
        <div></div>
        <div></div>
      </profile-button>

      <profile-dropdown role="menubar">
        <a
          href="/en/my-settings"
          hreflang="en"
          title="Navigate to your settings"
        >
          <menu-item>My settings</menu-item>
        </a>
        <a
          href="/en/sign-out"
          hreflang="en"
          title="Remove authentication cookies"
        >
          <menu-item>Sign out</menu-item>
        </a>
      </profile-dropdown>
    </banner>
    `;
}
