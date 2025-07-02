export default function getSalesPageResponseHeaders(lang, nonce) {
  // Staattisen sivun cache-asetukset:
  // - max-age: selaimen cache 86400 s (1 päivä)
  // - s-maxage: CDN-cache 86400 s (1 päivä)
  // - stale-while-revalidate: tarjoa vanha versio taustalla haettaessa uutta (1 tunti = 3600 s)
  // - stale-if-error: tarjoa vanha versio, jos backend ei vastaa (1 päivä = 86400 s)
const cacheControlValue = 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=3600, stale-if-error=86400';

  // Jos eri kieliversiot samaa URL:ia kohden valitaan Accept-Language-pohjaisesti,
  // lisää Vary: Accept-Language. Jos erilliset URLit (/fi/, /en/) käytössä, voi jättää pois.
  const varyValue = 'Accept-Encoding, Accept-Language';

  // Link-header esimerkkinä preconnect/preload: parantaa latausnopeutta,
  // jos sivu luottaa assets-vorte.app:iin. Voit lisätä useita rel=preconnect/link-preload -rivejä tarpeen mukaan.
  const linkHeaderValue = '<https://assets.vorte.app>; rel=preconnect';

  return {
    "Content-Security-Policy":
      `default-src 'self'; base-uri 'none'; form-action 'self'; ` +
      `script-src 'self' 'nonce-${nonce}'; style-src 'self' 'nonce-${nonce}'; ` +
      `img-src 'self' data: https://assets.vorte.app; font-src 'self' https://assets.vorte.app; ` +
      `connect-src 'self'; frame-ancestors 'none'; object-src 'none'`,
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    // X-XSS-Protection on legacy; voidaan poistaa, kun CSP on tiukka. Jos halutaan, voi asettaa "0" tai jättää pois:
    "X-XSS-Protection": "0",
    "Permissions-Policy": "geolocation=(), microphone=(), camera=(), payment=(), usb=()",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
    "Cross-Origin-Embedder-Policy": "require-corp",
    "Cross-Origin-Opener-Policy": "same-origin",
    "Cross-Origin-Resource-Policy": "same-origin",
    // X-UA-Compatible on vanha; voidaan poistaa, mutta ei haittaa, jos säilyttää:
    "X-UA-Compatible": "IE=edge",

    // Päivitetty cache-strategia:
    "Cache-Control": cacheControlValue,
    // ETag: varmista tuotannossa, että ETag generoidaan sisällön hashin tai version perusteella
    "ETag": `"autogenerate-if-needed"`,
    // Vary sisältää Accept-Language, jos sama URL tuottaa eri kieliversion:
    "Vary": varyValue,
    // Link-header: preconnect/preload tms. parantaa UX:ää ja epäsuorasti SEO:ta latausnopeuden kautta
    "Link": linkHeaderValue,

    // Jos käytössä Last-Modified, voit asettaa esimerkiksi:
    // "Last-Modified": new Date(lastUpdateTimestamp).toUTCString(),
    // mutta funktio saa tällöin parametrinä tai muu palvelinlogiikka huolehtii arvon laskusta.

    "Content-Type": "text/html; charset=utf-8",
    "Content-Language": lang
  };
}
