/**
 * Dedicated WebWorker for generating OAuth2 PKCE parameters and a CSRF state token.
 *
 * Listens for messages with `cmd: 'generatePkce'` and responds with:
 *   - codeVerifier: A 128-character base64url string (code_verifier).
 *   - codeChallenge: SHA-256 digest of the verifier, encoded as base64url (code_challenge).
 *   - state: A 16-byte hexadecimal nonce for CSRF protection.
 *
 * Usage:
 *   worker.postMessage({ cmd: 'generatePkce' });
 *   worker.onmessage = e => {
 *     const { codeVerifier, codeChallenge, state } = e.data;
 *     // Use these values to initiate the OAuth2 authorization request.
 *   };
 */
self.addEventListener('message', async (e) => {
	if (e.data.cmd !== 'generatePkce') return;

	// 1) Generate code_verifier: random 128-character base64url string
	const array = new Uint8Array(96);
	crypto.getRandomValues(array);
	const codeVerifier = btoa(String.fromCharCode(...array))
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
		.replace(/=+$/, '');

	// 2) Derive code_challenge: SHA-256(verifier) → base64url
	const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(codeVerifier));
	const base64 = btoa(String.fromCharCode(...new Uint8Array(buf)))
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
		.replace(/=+$/, '');

	// 3) Generate state: random 16-byte hex string
	const stateArray = new Uint8Array(16);
	crypto.getRandomValues(stateArray);
	const state = Array.from(stateArray)
		.map((b) => b.toString(16).padStart(2, '0'))
		.join('');

	// Post back the PKCE parameters and CSRF state
	postMessage({ codeVerifier, codeChallenge: base64, state });
});
