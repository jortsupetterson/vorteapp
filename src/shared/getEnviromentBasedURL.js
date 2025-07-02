export default function getEnvironmentBasedURL(url, path) {

  if (url.protocol === "https:") {
    return `https://vorte.app${path}`;
  }


  if (url.protocol === "http:") {

    if (path === "/luo-vorte" || path === "/skapa-vorte" || path === "/create-a-vorte") {
      return `http://127.0.0.1:1001${path}`;
    }

    if (path === "/hallintapaneeli" || path === "/instrumentpanel" || path === "/dashboard") {
      return `http://127.0.0.1:1002${path}`;
    }

    return path;
  }

  return path;
}
