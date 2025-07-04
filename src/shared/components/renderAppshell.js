export default function renderAppShell(lang, content = 'Add some content bruh :p') {
	return `
	<shell class="toggled" role="main">
		<header>
			<layout-button 
            role="button" 
            title="${
							{
								fi: 'Mukauta näkymää',
								sv: 'Anpassa vy',
								en: 'Adjust layout',
							}[lang]
						}"

            </layout-button>
		</header>
		<main>${content}</main>
	</shell>;
    `;
}
