/**
 * Determines the request’s language based on the URL path and the Accept-Language header.
 * @param {Request} request – The Fetch API Request object, which provides properties like .url and .headers
 * @returns {'fi'|'sv'|'en'} – A supported language code, defaulting to 'fi'
 */
export default function getUserLanguage(request, url) {
  const pathLang = url.pathname.split("/")[1];

  const supportedLanguages = ["fi", "sv", "en"];
  const acceptLangHeader = request.headers.get("accept-language") || "";
  const browserLang = acceptLangHeader.split(",")[0].split("-")[0];

  if (supportedLanguages.includes(pathLang)) {
    return pathLang;
  }
  if (supportedLanguages.includes(browserLang)) {
    return browserLang;
  }
  return "fi";
}

// Use example:
// import getUserLanguage from "../../shared/getUserLanguage.js"
// const lang = getUserLanguage(request, url);