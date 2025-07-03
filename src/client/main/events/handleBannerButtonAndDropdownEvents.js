export default function handleBannerButtonAndDropDownEvents() {
	app.banner.navButton.addEventListener('click', () => {
		app.banner.navButton.classList.toggle('toggled');
		app.banner.navDropdown.classList.toggle('toggled');
		app.banner.profileButton.classList.remove('toggled');
		app.banner.profileDropdown.classList.remove('toggled');
	});

	app.banner.profileButton.addEventListener('click', () => {
		app.banner.profileButton.classList.toggle('toggled');
		app.banner.profileDropdown.classList.toggle('toggled');
		app.banner.navButton.classList.remove('toggled');
		app.banner.navDropdown.classList.remove('toggled');
	});
}

app.shell.addEventListener('click', () => {
	app.banner.navButton.classList.remove('toggled');
	app.banner.navDropdown.classList.remove('toggled');
	app.banner.profileButton.classList.remove('toggled');
	app.banner.profileDropdown.classList.remove('toggled');
});

app.sidebar.addEventListener('click', () => {
	app.banner.navButton.classList.remove('toggled');
	app.banner.navDropdown.classList.remove('toggled');
	app.banner.profileButton.classList.remove('toggled');
	app.banner.profileDropdown.classList.remove('toggled');
});
