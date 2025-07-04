export default function renderHeroSection(lang) {
	return `
        <section id="hero">
            <h1 class="highlight">
                Be your own<br><strong>BOSS<span class="primary">.</span></strong>
            </h1>

<p>
  ${
		{
			fi: 'Vorte on verkkosovellus, joka sisältää oman talouselämäsi hallinnan, sekä omistamasi yrityksen kokonaisvaltaisen toiminnan ohjauksen. Näin pystyt hallitsemaan koko talouselämääsi helposti - Vortella.',
			sv: 'Vorte är en webbapplikation som innehåller hanteringen av din personliga ekonomi samt den heltäckande styrningen av ditt företag. På så sätt kan du enkelt ta kontroll över hela din ekonomiska värld – med Vorte.',
			en: 'Vorte is a web application that includes management of your personal finances as well as complete control over your business operations. This way, you can easily take charge of your entire financial world – with Vorte.',
		}[lang]
	}
</p>

            <form>
              <header>
                <h2>Liity odotuslistalle saadaksesi<br>parhaat yritystyökalut käyttöön ensimmäisenä:</h2>
              </header>
                <input 
                name="waitlist" 
                type="text" 
                placeholder="
                ${
									{
										fi: 'Etunimi',
										sv: 'Firstnamn',
										en: 'Firstname',
									}[lang]
								}
                ">

                <input
                name="Sukunimi" 
                type="text" 
                placeholder="
                ${
									{
										fi: 'Sukunimi',
										sv: 'Surnamn',
										en: 'Lastname',
									}[lang]
								}
                ">
                
                <input
                name="waitlist" 
                type="email" 
                placeholder="
                ${
									{
										fi: 'Sähköpostiosoite',
										sv: 'E-postadress',
										en: 'Email address',
									}[lang]
								}
                ">

                <div id="optInWrapper">
                <input id="option" type="checkbox">
                <label for="option">haluan luoda ilmaisen Vorte käyttäjän</label>
                </div>

                <button type="submit">
                ${
									{
										fi: 'LIITY',
										sv: 'ANSLUT',
										en: 'JOIN',
									}[lang]
								}
                </button>
            </form>

            <nav aria-label="Sosiaalisen median linkit">
              <ul>
                  <li><a href="https://tiktok.com/@vorte.org" target="_blank">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0l88 0a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z"/></svg>
                  @vorteapp</a></li>
                  <li><a href="https://x.com/vorteapp" target="_blank">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>
                  @vorteapp</a></li>
                  <li><a href="mailto:contact@vorte.app">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg>
                  contact@vorte.app</a></li>
              </ul>
            </nav>

            <button class="join">liity odotuslistalle</button>


<a href="#info" id="info-link">
<svg xmlns="http://www.w3.org/2000/svg" width="25" height="13" viewBox="0 0 50 26" fill="none">
  <rect
    width="31.4931"
    height="7.72541"
    rx="3.8627"
    transform="matrix(0.799238 -0.601015 0.683477 0.729972 19.5494 18.9279)"
    fill="#797676"
  />
  <rect
    width="31.4931"
    height="7.72541"
    rx="3.8627"
    transform="matrix(-0.799238 -0.601015 0.683477 -0.729972 25.1705 25.1119)"
    fill="#797676"
  />
</svg>
</a>

<div id="hero-background">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 2000 1020"
    preserveAspectRatio="xMidYMid meet"
  >
    <g filter="url(#filter0_f_525_89)">
      <path
        d="M198 503L-0.5 644.5V964L259.5 920L402 694L549.5 503L796 442H974.5L1160.75 617.5L1583.25 442L1727 234V-4.5H1489L1444 30.5L1297 234L1141.5 270L1014.5 155.5L614 -4.5L402 314.5L259.5 412.5L198 503Z"
        fill="#0B4F60"
        fill-opacity="0.15"
      />
    </g>
    <defs>
      <filter
        id="filter0_f_525_89"
        x="-200.5"
        y="-204.5"
        width="5127.5"
        height="1300.5"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="100"
          result="effect1_foregroundBlur_525_89"
        />
      </filter>
    </defs>
  </svg>
</div>
        </section>
    `;
}
