export default function renderAppSidebar(lang) {
	return `
<sidebar class="toggled" role="menubar">
      <header>
        <hide-sidebar-button role="button"title="Hide sidebar">
        </hide-sidebar-button>
      </header>

      <main>
        <menu-heading>APPS:</menu-heading>

        <a
          href="/en/road-to-entrepreneurship"
          hreflang="en"
          title="Navigate to a page listing coming up Vortepreneur apps"
        >
          <menu-item>Road to entrepreneurship</menu-item>
        </a>


        <a
          href="/en/vortepreneur/coming-soon"
          hreflang="en"
          title="Navigate to a page listing coming up Vortepreneur apps"
        >
          <menu-item>Coming soon...</menu-item>
        </a>
        </main>
    </sidebar>
    `;
}
