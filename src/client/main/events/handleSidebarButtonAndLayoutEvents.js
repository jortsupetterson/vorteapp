export default function handleSidebarButtonAndLayoutEvents() {
	app.sidebar.header.hideSidebarButton.addEventListener('click', () => {
		app.sidebar.header.hideSidebarButton.classList.toggle('toggled');
		app.shell.classList.toggle('toggled');
		app.sidebar.classList.toggle('toggled');
	});
}
