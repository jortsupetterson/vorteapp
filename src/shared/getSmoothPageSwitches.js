/**
 * Smooth Page Switches – Client-side navigation fade effect handler.
 *
 * This module listens to all click events on anchor tags (`<a>`) and intercepts
 * internal link navigations to apply a smooth fade-out effect before changing the page.
 *
 * Features:
 * - Adds `.fade` class to `<body>` on link click
 * - Delays `window.location.href` by 125ms to allow transition
 * - Prevents default anchor behavior to control timing manually
 *
 * Usage notes:
 * - Intended for pages using CSS transition on `body.fade`
 * - Only works for anchor tags with valid `href`
 * - External links or malformed `<a>` tags are ignored
 */
export default function initSmoothPageSwitches() {
  const handler = e => {
    const link = e.target.closest('a');
    if (!link || !link.href) return;
    e.preventDefault();
    document.body.classList.add('fade');
    setTimeout(() => {
      window.location.href = link.href;
    }, 125);
  };

  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      document.addEventListener('click', handler);
    }, { timeout: 200 });
  } else {
    window.addEventListener('DOMContentLoaded', () => {
      document.addEventListener('click', handler);
    });
  }
}
