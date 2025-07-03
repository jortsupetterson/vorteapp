export default function handleSidebarButtonAndLayoutEvents() {
	app.sidebar.hideSidebarButton.addEventListener('click', () => {
		app.sidebar.hideSidebarButton.classList.toggle('toggled');
		app.shell.classList.toggle('toggled');
		app.sidebar.classList.toggle('toggled');
	});
}
