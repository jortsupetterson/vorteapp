import getSearchEngineCard from "../../../../shared/getSearchEngineCard.js"
import getOpenGraphCard from "../../../../shared/getOpenGraphCard.js"
import getTwitterCard from "../../../../shared/getTwitterCard.js";
export default function renderView(lang, url) {

const title = {
  fi: "Kirjaudu sisään",
  sv: "Logga in",
  en: "Sign In"
};

const description = {
  fi: "Kirjaudu sisään käyttäjätiliisi hallitaksesi talouttasi ja uraasi Vortessa.",
  sv: "Logga in på ditt konto för att hantera din ekonomi och din karriär med Vorte.",
  en: "Sign in to your account to manage your finances and career with Vorte."
};

const urls = {
  fi: "/fi/kirjaudu-sisään",
  sv: "/sv/logga-in",
  en: "/en/sign-in"
};

return `
  <!DOCTYPE html>
<html lang="fi" data-theme="dark" data-contrast="normal">
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="/authn/style.css">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
${getSearchEngineCard(lang, title, description, urls)}
${getOpenGraphCard(lang, title, description, urls)}
${getTwitterCard(lang, title, description, urls)}
</head>
  <body>
  <form class="login" novalidate >
    <header>
      <p>
        ${{
            fi:"Tervetuloa Vorteen",
            sv: "Välkommen till Vorte",
            en: "Welcome to Vorte"
        }[lang]}
      </p>
      <svg xmlns="http://www.w3.org/2000/svg" width="217" height="500" viewBox="0 0 217 500" fill="none">
      <path d="M108.35 343.6L167.85 181.2H201.8L126.55 373H89.45L14.2 181.2H48.5L108.35 343.6Z" fill="var(--text)"/>
      <path d="M108.5 275L87 199H130L108.5 275Z" fill="var(--text)"/>
      <path d="M108.153 178H67.8632L51 149H167L150.592 178H108.153Z" fill="var(--text)"/>
      </svg>
    </header>

    <div>
      <button id="google" type="button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/></svg>
        <span>
            ${{
                fi:"Tunnistaudu Googlella",
                sv:"",
                en:"Autheticate with Google"
            }[lang]}
        </span>
      </button>
    </div>

    <div>
      <button id="microsoft" type="button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M0 32h214.6v214.6H0V32zm233.4 0H448v214.6H233.4V32zM0 265.4h214.6V480H0V265.4zm233.4 0H448V480H233.4V265.4z"/></svg>
        <span>
            ${{
                fi: "Tunnistaudu Microsoftilla",
                sv: "",
                en: "Authenticate with Microsoft"
            }[lang]}
        </span>
      </button>
    </div>

    <div id="email-login">
      <label for="">Muut tavat:</label>
    <input id="email"
      pattern="^[^@\s]+@[^@\s]+\.[a-z]{2,}$"
      name="sähköposti"
      type="email"
      placeholder="Sähköpostiosoite"
      aria-label="Sähköpostiosoite"
      required>
      <button id="passkey">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17l0 80c0 13.3 10.7 24 24 24l80 0c13.3 0 24-10.7 24-24l0-40 40 0c13.3 0 24-10.7 24-24l0-40 40 0c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z"/></svg>
        <span>Passkey</span>
      </button>
      <button id="magic-link">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg>
        <span>Magic Link</span>
      </button>
    </div>

    <div class="cf-turnstile" data-sitekey="0x4AAAAAABfpGcyoBCK_N8CO"></div>

      <div>
      <details>
        <summary>Aseta istunnon kesto +</summary>
        <input id="expiry" name="value"  type="number" aria-label="istunnon-kesto">
        <select name="format" id="expiry-format">
          <option value="d">päivää</option>
          <option value="h">tuntia</option>
          <option value="m">minuuttia</option>
        </select>
      </details>
      </div>
      <div>
        <a href="/">Eikö sinulla ole vielä tiliä?</a>
      </div>
      <output id="feedback"></output>
  </form>
        <script src="/authn/initAuthn.js" async defer></script>
        <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
</body>
</html>
    `
}