import buildStyleSheets from './src/shared/builds/buildStyleSheets.js';
import buildMainThread from './src/shared/builds/buildMainThread.js';
import buildEdgeRuntime from './src/shared/builds/buildEdgeRuntime.js';
buildMainThread(['./src/client/main/app.js', './src/client/main/events/handleDashboardEvents.js']);
buildEdgeRuntime();
buildStyleSheets(
	['./src/client/stylesheets/view-specific/landing/style.css', './src/client/stylesheets/app-layout/app.css'],
	'./dist/assets/styles'
);
