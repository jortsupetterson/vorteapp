/**
 * Navigation and UI panel state controller for Vorte ERP interface.
 *
 * This module handles:
 * - Sidebar (`.app-sidebar`) and main content (`<main>`) visibility toggling.
 * - Functional logic for sidebar-related buttons: `#toggle`, `#applications`, and `#hide-sidebar`.
 * - Banner (`.app-banner`) toggling using the `#burger` and `#hide-banner` buttons.
 * - Persists UI state using `history.replaceState`, enabling consistent behavior on back/forward navigation.
 * - Reacts to device orientation changes (`landscape`/`portrait`) to adjust UI layout accordingly.
 *
 * DOM elements used:
 * - `.app-sidebar`: The sidebar element.
 * - `main`: Main content area.
 * - `#toggle`: Primary sidebar toggle button.
 * - `#applications`: Secondary sidebar toggle trigger.
 * - `#hide-sidebar`: Button to hide the sidebar.
 * - `.app-banner`: Top banner/navigation panel.
 * - `#burger`: Banner open toggle (hamburger icon).
 * - `#hide-banner`: Button to hide the banner.
 *
 * State management:
 * - Uses `history.replaceState()` to persist:
 *    - `sidebarOpen`: `true` or `false`
 *    - `bannerOpen`: `true` or `false`
 *
 * Responsive behavior:
 * - `matchMedia('(orientation: landscape)')`: Restores saved sidebar state and hides the banner.
 * - `matchMedia('(orientation: portrait)')`: Forces banner closed and sidebar open.
 *
 * All state changes are reflected via `classList.toggle('toggled', boolean)` to toggle visibility.
 */
export default function manageDefaultLayoutToggleBehavior() {
  const aside           = document.querySelector('.app-sidebar');
  const main            = document.querySelector('main');
  const toggleBtn       = document.getElementById('toggle');
  const appsBtn         = document.getElementById('applications');
  const hideSidebarBtn  = document.getElementById('hide-sidebar');
  const appBanner       = document.querySelector('.app-banner');
  const burgerBtn       = document.getElementById('burger');
  const hideBannerBtn   = document.getElementById('hide-banner');

  if (!aside || !main || !toggleBtn || !appsBtn || !hideSidebarBtn ||
      !appBanner || !burgerBtn || !hideBannerBtn) return;

  function replaceState(partial) {
    const prev = history.state || {};
    history.replaceState({ ...prev, ...partial }, '', location.href);
  }

  function setSidebar(open, push = true) {
    aside.classList.toggle('toggled', !open);
    toggleBtn.classList.toggle('toggled', !open);
    main.classList.toggle('toggled', !open);
    if (push) replaceState({ sidebarOpen: open });
  }

  function setBanner(open, push = true) {
    appBanner.classList.toggle('toggled', open);
    if (push) replaceState({ bannerOpen: open });
  }

  function applyState() {
    const s = history.state || {};
    setSidebar(s.sidebarOpen !== false, false);
    setBanner(s.bannerOpen === true, false);
  }

  window.addEventListener('DOMContentLoaded', applyState);
  window.addEventListener('popstate', applyState);

  toggleBtn.addEventListener('click', () => {
    const isOpen = history.state?.sidebarOpen !== false;
    setSidebar(!isOpen, true);
  });
  appsBtn.addEventListener('click', () => {
    const isOpen = history.state?.sidebarOpen !== false;
    setSidebar(!isOpen, true);
  });
  hideSidebarBtn.addEventListener('click', () => {
    const isOpen = history.state?.sidebarOpen !== false;
    setSidebar(!isOpen, true);
  });
  burgerBtn.addEventListener('click', () => {
    const isOpen = history.state?.bannerOpen === true;
    setBanner(!isOpen, true);
  });
  hideBannerBtn.addEventListener('click', () => {
    const isOpen = history.state?.bannerOpen === true;
    setBanner(!isOpen, true);
  });

  window.matchMedia('(orientation: landscape)')
    .addEventListener('change', e => {
      if (e.matches) {
        applyState();
        appBanner.classList.remove('toggled');
        document.body.focus();
      }
    });

  window.matchMedia('(orientation: portrait)')
    .addEventListener('change', e => {
      if (e.matches) {
        applyState();
        setBanner(false, false);
        setSidebar(true, false);
      }
    });
}
