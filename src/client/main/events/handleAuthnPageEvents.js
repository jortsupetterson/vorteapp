const pkceWorker = new Worker('/authn/pkceWorker.js');

async function startAuthnFlow({ method, email = null }) {
	// 1) Generoi PKCE + CSRF-state WebWorkerilla
	const { codeVerifier, codeChallenge, state } = await new Promise((resolve) => {
		pkceWorker.postMessage({ cmd: 'generatePkce' });
		pkceWorker.onmessage = (e) => resolve(e.data);
	});

	// 2) Tallenna evästeisiin
	const secureAttrs = location.protocol === 'https:' ? 'Secure; SameSite=Lax' : 'SameSite=Lax';

	document.cookie = `pkce_verifier=${codeVerifier}; Path=/; ${secureAttrs}`;
	document.cookie = `oauth_state=${state}; Path=/; ${secureAttrs}`;
	document.cookie = `authn_method=${method}; Path=/; ${secureAttrs}`;

	// 3) Ohjaa oikeaan endpointiin
	let url = `/authn/${method}?code_challenge=${codeChallenge}&state=${state}`;

	if (method === 'magic-link') {
		// magic-link vaatii myös emailin queryssa
		url += `&email=${encodeURIComponent(email)}`;
	}

	window.location.href = url;
}

document.addEventListener('DOMContentLoaded', () => {
	const emailInput = document.getElementById('email');
	let userEmail = '';

	emailInput.addEventListener('input', (e) => {
		userEmail = e.target.value.trim();
	});

	// sidotaan nappi
	document.getElementById('google').addEventListener('click', () => {
		startAuthnFlow({ method: 'google' });
	});
	document.getElementById('microsoft').addEventListener('click', () => {
		startAuthnFlow({ method: 'ms' });
	});
	document.getElementById('magic-link').addEventListener('click', () => {
		startAuthnFlow({ method: 'magic-link', email: userEmail });
	});
});
