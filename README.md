# vorteapp
Vorte – A lightweight, intuitive, open-source ERP platform tailored for small businesses and entrepreneurs from Finland. Modular, offline-support, and powered by Cloudflare Workers.

# note

A version written in Finnish is in the same file, just scroll down to find it.

This is true for all markdown files JS docs and comments should be written in English only.

# vision

Empowering finnish working force by automating annoying and mundane byrcarcy tasks related owning your own business selling products or services.

# other use cases

1. Making large scale organization operation management more cost efficent and clear.
2. Tools that make employees jobs easier and finding jobs easier with automated cv creation etc.

# development

Read the other markdown files from the "docs" directory for detailed picture before you start contributing, but basically the sourcecode at "src" directory is split between "client" and "server" directories based on runtime. 

"shared" directory includes JavaScript assets that can be used across directories via ES module imports. 

They are bundled and minified then into the "dist" directory start by checking "docs/PROJECT_STRUCTURE.md" and then other docs.


