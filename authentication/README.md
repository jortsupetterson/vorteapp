# Firebase Auth and Cloudflare Workers – Authentication Architecture

This document provides an in‑depth explanation of a Firebase Auth–based user authentication architecture in a Cloudflare Workers environment. The design separates **authentication** from **authorization/session management**. Firebase Auth only verifies the user, while the Cloudflare Worker manages the session cookie. The result is a secure, modular, and highly scalable implementation with no external session store.

## 1. Why We Choose Firebase Auth

Firebase Auth offers:

- **Ready‑made SDKs and UI components** for Web, iOS, and Android.  
- **Multiple sign‑in methods**: email/password, phone verification, Google, Apple, Facebook, GitHub, Microsoft, etc.  
- **Reliability and security** backed by Google infrastructure.  
- **Free Spark tier** with unlimited registered users; only phone/SMS verification may incur cost.

## 2. Core Principle: Authentication vs. Authorization

1. **Authentication** – Firebase Auth returns an **ID token** (JWT) after a successful login.  
2. **Session management** – A Cloudflare Worker validates the ID token, extracts the `sub` as UID, and issues its own **`vorte-session` cookie** (HttpOnly, Secure, SameSite = Strict).  
3. **Authorization** – All further requests rely on the `vorte-session` cookie; no additional calls to Firebase are required.

## 3. ID Token Validation without Libraries

1. Fetch JWKS keys:  
   `https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com`  
2. Select the key whose `kid` matches the token header.  
3. Import with Web Crypto (`RSASSA-PKCS1-v1_5`, `SHA-256`).  
4. Verify the signature **and** claims (`exp`, `iat`, `aud`, `iss`, `sub`).  
5. Cache the JWKS response using `caches.default` honoring `Cache-Control: max-age`.

## 4. Creating the `vorte-session` Cookie

```js
const payload = { uid, exp: Date.now() / 1000 + 3600 };
const token = hmacSign(payload, SECRET_KEY);
return new Response(null, {
  headers: {
    "Set-Cookie": [
      `vorte-session=${token}`,
      "Path=/",
      "Max-Age=3600",
      "Secure",
      "HttpOnly",
      "SameSite=Strict"
    ].join("; ")
  }
});
```

- **HttpOnly** blocks JavaScript access.  
- **Secure** enforces HTTPS.  
- **SameSite = Strict** offers maximum CSRF protection.

## 5. UID and Deterministic Durable Object Routing

```js
function createUID(provider, sub) {
  return `${provider}:${encodeURIComponent(sub).replace(/[^a-zA-Z0-9]/g, "_")}`;
}
const uid = createUID("firebase", decoded.sub);
const id  = env.USER_DO.idFromName(uid);
```

Deterministic routing ensures the same user always hits the same Durable Object instance worldwide.

## 6. Stateless Trust Model

- **No external session store** – all session data travels inside the cookie.  
- Each Worker/DO **validates** the `vorte-session` signature and expiry.  
- **User‑specific durable data** is stored in UID‑named Durable Objects, not in the cookie itself.

## 7. Extensibility: Magic Link & WebAuthn

- **Magic Link** – Send a JWT link via email (`sub = "magic:user@example.com"`). Validate and issue `vorte-session`.  
- **WebAuthn** – Client performs `navigator.credentials.get()`. Validate the signature server‑side and issue `vorte-session`.

> All evidence types (ID token, magic link, WebAuthn) ultimately produce **the same cookie** and reuse the same UID routing.

## 8. Security and Scalability

- **HttpOnly + Secure + SameSite = Strict** protects against XSS and CSRF.  
- **Stateless** sessions scale horizontally without Redis/DB.  
- **Deterministic DO routing** via `idFromName(uid)` everywhere.  
- **Modular design** – new auth methods integrate by issuing the same `vorte-session`.

---

**Summary:**  
Firebase Auth delivers robust identity verification; Cloudflare Workers provide a lightweight, stateless session layer. The `vorte-session` cookie enables secure, scalable user management and deterministic Durable Object routing without a central session store.
