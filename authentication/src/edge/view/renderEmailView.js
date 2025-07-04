export default function renderEmailView(lang, challenge, state, email) {
  const magicLink = `http://localhost:1001/authn/callback?code=${challenge}&state=${state}`;

  const emailPayload = {
    senderAddress: "DoNotReply@mail.vorte.app",
    content: {
      subject: {
        fi: "Kirjaudu sisään yhdellä klikkauksella",
        sv: "Logga in med ett klick",
        en: "Sign in with one click"
      }[lang],

      plainText: `
${{
  fi: "Käytä alla olevaa linkkiä haluamallasi laitteella kirjautuaksesi Vorten-järjestelmään ilman salasanaa. Linkki on voimassa 5 minuuttia.",
  sv: "Använd länken nedan för att logga in i Vorte utan lösenord. Länken är giltig i 5 minuter.",
  en: "Use the link below to sign in to Vorte without a password. The link is valid for 5 minutes."
}[lang]}

${magicLink}

${{
  fi: "Jos et pyytänyt kirjautumislinkkiä, voit jättää tämän viestin huomiotta.",
  sv: "Om du inte begärde den här inloggningslänken kan du ignorera det här meddelandet.",
  en: "If you did not request this sign-in link, you can ignore this message."
}[lang]}

${{
  fi: "Ystävällisin terveisin,",
  sv: "Vänliga hälsningar,",
  en: "Kind regards,"
}[lang]}

${{
  fi: "Vorte-tiimi",
  sv: "Vorte-teamet",
  en: "The Vorte Team"
}[lang]}
      `.trim(),

      html: `
<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8"/>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');
    @media screen {
      body, p, h1, h2, h3, h4, h5, h6, a, span {
        font-family: 'Poppins', Arial, sans-serif !important;
      }
    }
    body { background: #f4f4f4; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; overflow: hidden; }
    .header { background: #199473; color: #ffffff; padding: 20px; text-align: center; }
    .content { padding: 20px; color: #333333; }
    .button { display: inline-block; background: #0B4F60; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 4px; }
    .footer { font-size: 12px; color: #666666; padding: 10px; text-align: center; background: #f0f0f0; }
    a { color: #0B4F60; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Be your own BOSS</h1>
    </div>
    <div class="content">
      <p>${
    {
    fi: "Käytä alla olevaa linkkiä laitteella, jolla haluat kirjautua Vorten-järjestelmään ilman salasanaa. Linkki on voimassa 5 minuuttia.",
    sv: "Använd länken nedan på den enhet du vill logga in i Vorte utan lösenord. Länken är giltig i 5 minuter.",
    en: "Use the link below on the device you want to sign in to Vorte without a password. The link is valid for 5 minutes."
    }[lang]
      }</p>
      <p style="text-align:center; margin: 30px 0;">
        <a href="${magicLink}" class="button">${
          { fi: "Kirjaudu sisään", sv: "Logga in", en: "Sign in" }[lang]
        }</a>
      </p>
      <p>${
        {
          fi: "Jos nappi ei toimi, kopioi ja liitä tämä URL selaimeesi:",
          sv: "Om knappen inte fungerar, kopiera och klistra in denna URL i din webbläsare:",
          en: "If the button doesn’t work, copy and paste this URL into your browser:"
        }[lang]
      }</p>
      <p><a href="${magicLink}">${magicLink}</a></p>
      <p>${
        {
          fi: "Jos et pyytänyt kirjautumislinkkiä, voit jättää tämän viestin huomiotta.",
          sv: "Om du inte begärde den här inloggningslänken kan du ignorera det här meddelandet.",
          en: "If you did not request this sign-in link, you can ignore this message."
        }[lang]
      }</p>
      <p>${
        {
          fi: "Ystävällisin terveisin,",
          sv: "Vänliga hälsningar,",
          en: "Kind regards,"
        }[lang]
      }<br/>${
        {
          fi: "Vorte-tiimi",
          sv: "Vorte-teamet",
          en: "The Vorte Team"
        }[lang]
      }</p>
    </div>
    <div class="footer">
      <p>© 2025 Vorte ERP. Kaikki oikeudet pidätetään.</p>
    </div>
  </div>
</body>
</html>
      `.trim()
    },
    recipients: {
      to: [{ address: email }]
    }
  };

  return emailPayload;
}
