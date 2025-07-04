import buildStyleSheets from './src/shared/builds/buildStyleSheets.js';
import buildMainThread from './src/shared/builds/buildMainThread.js';
import buildEdgeRuntime from './src/shared/builds/buildEdgeRuntime.js';
buildMainThread();
buildEdgeRuntime();
buildStyleSheets(['./src/client/stylesheets/view-specific/landing/landing.css'], './dist/assets/styles');
