import getCookies from "../../../../shared/getCookies.js"

export async function authnCallback(url, request, env) {
  const code    = url.searchParams.get("code");
  const state   = url.searchParams.get("state");
  const cookies = getCookies(request.headers.get("Cookie"));

  if (!code || state !== cookies.oauth_state || !cookies.pkce_verifier) {
    return new Response("Invalid state or missing PKCE verifier", { status: 400 });
  }

  let tokenRes;
  if (cookies.authn_method === "google") {
    const { exchangeTokenWithGoogle } = await import("./authnGoogle.js");
    tokenRes = await exchangeTokenWithGoogle(env, cookies, code);
  } else if (cookies.authn_method === "ms") {
    const { exchangeTokenWithMs } = await import("./authnMs.js");
    tokenRes = await exchangeTokenWithMs(env, cookies, code);
  } else if (cookies.authn_method === "magic-link") {
    return new Response("Moikka botti")
  } else {
    return new Response("Unknown authn_method", { status: 400 });
  }

  if (!tokenRes.ok) {
    const msg = await tokenRes.text();
    return new Response(`Token exchange failed: ${msg}`, { status: 502 });
  }

  const tokenData = await tokenRes.json();
  const idToken   = tokenData.id_token;

  // decode JWT payload
  function b64urlDecode(str) {
    return atob(str.replace(/-/g, '+').replace(/_/g, '/'));
  }
  const [, payloadB64] = idToken.split('.');
  const payload = JSON.parse(b64urlDecode(payloadB64));

  // clear PKCE cookies, set your session cookie...
  // then return the payload
  return new Response(JSON.stringify(payload), {
    headers: { "content-type": "application/json" }
  });
}
