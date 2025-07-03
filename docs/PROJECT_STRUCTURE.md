
# docs/PROJECT_STRUCTURE.md

vorteapp
|
|   
|\_dist ?) Directory for bundled and minified production ready code updates automatically when running "$ npx wrangler dev".
|   |
|   |
|   |\_assets ?) Production directory for static assets and browser/client runtime code.
|   |   |
|   |   
|    \_worker ?) Production directory for dynamic edge runtime scripts including authn, autho, 
|       |           database querys and server-side renders.
|       |
|       |\_gateway.js ?) Handles requests that are not intercepted by client-side scripts.
|
|\_docs
|   |
|   |
|   |\_CONTRIBUTION.md ?) Instrucions on how your contribution work should be done and conufusion.
|   |
|   |
|   |\_GLOBALS.md ?) Includes a detailed log of globalized variables to avoid name conflicts.
|   |
|   |
|   |\_PROGRAM_FLOW.md ?) Visualization and explanation on how this software is intented to work.
|   |
|   |
|   |\_PROJECT_STRUCTURE.md ?) Visualizes and explains project structure (CURRENT)
|
|
|\_node_modules ?) Directory for dependencies determined in package.json installed via "$ npm install".
|
|          
|\_src ?) Directory for source code development.
|   |
|   |
|   |\_client ?) Client/Browser runtime code development directory.
|   |   |
|   |   |
|   |   |\_dedicated-worker ?) Worker-thread code development direcory, used for heavy background compute.
|   |   |
|   |   |
|   |   |\main ?) Main-thread code development directory, used user-interface reletad logic.
|   |   |   |
|   |   |   |
|   |   |   |\_events ?) Main-threads event handling modules
|   |   |   |
|   |   |   |
|   |   |   |\_modules ?) Main-threads top-level logic modules
|   |   |   |   |
|   |   |   |   |
|   |   |   |   |\virtualization.js ?) Recursively makes the dom accessible via 
|   |   |   |                           a reactive virtual DOM proxy for a given root element in realtime.
|   |   |   |
|   |   |   |
|   |   |    \_app.js ?) Main-threads enrty-point
|   |   |
|   |   |
|   |   |\service-worker ?) Network-thread code development directory, used for caching and background-sync operations.
|   |
|   |
|   |\_server ?) Server/Edge runtime code development directory
|   |
|   |
|   |\_shared ?) Workspace/Development/Utility code that can be used accross different files.