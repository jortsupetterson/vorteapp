export default function handleShellButtonAndLayoutEvents() {
	app.shell.header.layoutButton.addEventListener('click', () => {
		app.shell.header.layoutButton.classList.toggle('toggled');
		app.shell.classList.toggle('toggled');
		app.sidebar.classList.toggle('toggled');
	});
}
