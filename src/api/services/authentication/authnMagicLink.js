import getCachedAzureToken from "../../../../shared/getCachedAzureToken.js";
import renderEmailView from "../view/renderEmailView.js";

export async function requestAuthnViaMagicLink(url, env, lang) {

    const challenge = url.searchParams.get("code_challenge");
    const state     = url.searchParams.get("state");

   if (!challenge || !state) {
     return new Response("Missing code_challenge or state", { status: 400 });
   }

    const token = await getCachedAzureToken(env);

      const email =url.searchParams.get("email");


      const emailPayload = renderEmailView(lang, challenge, state, email)

        const sendRes = await fetch(
      `${env.AZURE_COMMUNICATIONS_ENDPOINT}/emails:send?api-version=2023-03-31`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(emailPayload)
      }
    );


  const result = await sendRes.json();
    return new Response(JSON.stringify(result, null, 2), {
      status: sendRes.status,
      headers: { "Content-Type": "application/json" }
    });
  };
