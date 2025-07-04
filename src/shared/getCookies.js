export default function getCookies(header) {
	if (typeof header !== 'string') return {};
	return Object.fromEntries(
		header
			.split('; ')
			.filter(Boolean)
			.map((pair) => {
				const [k, v] = pair.split('=');
				return [decodeURIComponent(k), decodeURIComponent(v)];
			})
	);
}
