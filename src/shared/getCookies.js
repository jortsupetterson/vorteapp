export default function getCookies(header = "") {
  return Object.fromEntries(
    header.split("; ")
      .filter(Boolean)
      .map(pair => {
        const [k, v] = pair.split("=");
        return [decodeURIComponent(k), decodeURIComponent(v)];
      })
  );
}
