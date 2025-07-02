export default function getAssetUrl(url, path) {

  if (url.protocol === "https:") {
    return `https://assets.vorte.app${path}`;
  }

  if (url.protocol === "http:") {
    return `https://pub-fbbfbf9b632a4aeba615260efb87d5a2.r2.dev${path}`;
  }

  return path;
}
