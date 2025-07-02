/**
 * Converts a hexadecimal color code to an RGBA string with fixed alpha value (0.6).
 *
 * @function getGhostFromHex
 * @param {string} hexColorCode - The input HEX color string (e.g. "#abc" or "#aabbcc").
 * Can optionally include the leading hash (#), and supports both 3- and 6-digit shorthand.
 *
 * @returns {string} A CSS-compatible `rgba(r, g, b, a)` string with alpha set to 0.6.
 *
 * @throws {Error} If the input is not a valid 3- or 6-digit hex color.
 *
 * @example
 * getGhostFromHex("#3498db"); // "rgba(52, 152, 219, 0.6)"
 * getGhostFromHex("f80");     // "rgba(255, 136, 0, 0.6)"
 */
export default function getGhostFromHex(hexColorCode) {
	let hex = hexColorCode.replace(/^#/, '');

	if (hex.length === 3) {
		hex = hex
			.split('')
			.map((c) => c + c)
			.join('');
	}

	if (hex.length !== 6) throw new Error('Invalid HEX color');

	const r = parseInt(hex.slice(0, 2), 16);
	const g = parseInt(hex.slice(2, 4), 16);
	const b = parseInt(hex.slice(4, 6), 16);

	return `rgba(${r}, ${g}, ${b}, 0.6)`;
}
