import getUserLanguage from "../../../shared/getUserLanguage.js"
import renderView from "./view/renderView.js";

export default {
	async fetch(request, env) {
        const url = new URL(request.url);
        const path = url.pathname
        

    if (path === "/authn/magic-link") {
        const lang = getUserLanguage(request,url);
        const { requestAuthnViaMagicLink } = await import("./services/authnMagicLink.js");
        return requestAuthnViaMagicLink(url, env, lang)
    }
    if (path === "/authn/google") {
      const { requestAuthnViaGoogle } = await import("./services/authnGoogle.js");
      return requestAuthnViaGoogle(url, env);
    }
    if (path === "/authn/ms") {
      const { requestAuthnViaMs } = await import("./services/authnMs.js");
      return requestAuthnViaMs(url, env);
    }
    if (path === "/authn/callback") {
      const { authnCallback } = await import("./services/authnCallback.js");
      return authnCallback(url, request, env);
    }
       const lang = getUserLanguage(request,url);
        const view = renderView(lang,url)
        return new Response (view, {
            headers: {
                "content-type":"text/html"
            }
        })
	}
};