# Firebase Auth ja Cloudflare Workers – autentikointiarkkitehtuuri

Tämä dokumentaatio kuvaa syvällisesti Firebase Auth -pohjaista käyttäjien tunnistautumista Cloudflare Workers -ympäristössä. Arkkitehtuuri perustuu tunnistautumisen (authentication) ja valtuutuksen/sessionhallinnan (authorization) eriyttämiseen. Firebase Auth hoitaa pelkästään käyttäjän todentamisen, ja Cloudflare Worker vastaa oman istunnon (sessio) hallinnasta. Tämä mahdollistaa turvallisen, modulaarisen ja skaalautuvan toteutuksen ilman erillistä istuntotallennusta.

## 1. Miksi valitsemme Firebase Authin

Firebase Auth tarjoaa:

- **Valmiit SDK:t ja UI‑komponentit** eri alustoille (web, iOS, Android).  
- **Useita kirjautumistapoja**: sähköposti/salasana, puhelinvahvistus, Google, Apple, Facebook, GitHub, Microsoft jne.  
- **Luotettavuuden ja turvallisuuden** Googlen infrastruktuurissa.  
- **Ilmaisen Spark‑tason**, jossa rekisteröityjen käyttäjien määrää ei rajoiteta.

## 2. Arkkitehtuurin ydinperiaate: tunnistus vs. autorisointi

1. **Tunnistus (Authentication)** – Firebase Auth palauttaa ID‑tokenin (JWT) onnistuneesta kirjautumisesta.  
2. **Istunnon hallinta (Session)** – Cloudflare Worker validoi ID‑tokenin, poimii `sub`‑kentästä UID:n ja luo oman `vorte-session`‑evästeen (HttpOnly, Secure, SameSite=Strict).  
3. **Valtuutus (Authorization)** – Kaikki jatkopyynnöt käyttävät `vorte-session`‑evästettä; Firebasea ei kutsuta enää.

## 3. ID‑tokenin validointi ilman kirjastoja

1. Hae JWKS‑avaimet:  
   `https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com`  
2. Valitse `kid`:in perusteella oikea avain.  
3. Importoi Web Crypto API:lla (`RSASSA-PKCS1-v1_5`, `SHA-256`).  
4. Verifioi allekirjoitus και claims (`exp`, `iat`, `aud`, `iss`, `sub`).  
5. Välimuistita JWKS `caches.default`‑säilössä.

## 4. `vorte-session`‑evästeen luominen

```js
const payload = { uid, exp: Date.now()/1000 + 3600 };
const token = hmacSign(payload, SECRET_KEY);
return new Response(null, {
  headers: {
    "Set-Cookie": [
      \`vorte-session=\${token}\`,
      "Path=/",
      "Max-Age=3600",
      "Secure",
      "HttpOnly",
      "SameSite=Strict"
    ].join("; ")
  }
});
```

## 5. UID ja deterministinen Durable Object -reititys

```js
function createUID(provider, sub) {
  return \`\${provider}:\${encodeURIComponent(sub).replace(/[^a-zA-Z0-9]/g,"_")}\`;
}
const uid = createUID("firebase", decoded.sub);
const id = env.USER_DO.idFromName(uid);
```

## 6. Stateless‑luottamusmalli

- Ei ulkoista sessiotietokantaa – eväste kantaa istuntodatan.  
- Jokainen Worker/DO validoi `vorte-session`‑evästeen allekirjoituksen.  
- Käyttäjäkohtainen pysyvä data tallentuu UID‑pohjaisiin Durable Objecteihin.

## 7. Laajennettavuus: Magic Link & WebAuthn

- **Magic Link:** sähköpostissa JWT, jonka `sub = "magic:user@example.com"` → validoi → `vorte-session`.  
- **WebAuthn:** asiakkaan allekirjoitus → validoi public‑keyllä → `vorte-session`.

## 8. Turvallisuus ja skaalautuvuus

- **HttpOnly + Secure + SameSite=Strict** estää XSS/CSRF.  
- **Stateless** istuntomalli skaalautuu ilman Redis/DB:tä.  
- **Deterministinen DO‑routing** varmistaa, että sama käyttäjä ohjataan samaan instanssiin.  
- **Modulaarinen** – uudet tunnistusmenetelmät liitetään luomalla sama `vorte-session`.

---

**Yhteenveto:**  
Firebase Auth tarjoaa vahvan tunnistuksen, Cloudflare Workers kevyen staattisen istunnon. `vorte-session`‑eväste mahdollistaa turvallisen ja skaalautuvan käyttäjähallinnan sekä deterministisen Durable Object ‑reitityksen ilman keskitettyä sessiovarastoa.
