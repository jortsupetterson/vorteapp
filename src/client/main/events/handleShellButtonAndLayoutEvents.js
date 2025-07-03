export default function handleShellButtonAndLayoutEvents() {
	app.shell.layoutButton.addEventListener('click', () => {
		app.shell.layoutButton.classList.toggle('toggled');
		app.shell.classList.toggle('toggled');
		app.sidebar.classList.toggle('toggled');
	});
}
