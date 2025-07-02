/**
 * Bundles CSS styles using esbuild with built-in CSS loading.
 *
 * External font and SVG assets (e.g. .ttf, .woff, .svg) remain external references.
 * The output is minified, legal comments are removed, and written to disk.
 *
 * @param {string} entry
 *   Path to the entry stylesheet file (e.g. 'src/styles/main.css').
 * @param {string} outDir
 *   Directory where the bundled output will be written (e.g. 'dist/styles').
 * @returns {Promise<import('esbuild').BuildResult>}
 *   A promise that resolves with the esbuild build result when bundling completes.
 * @throws {Error}
 *   If either `entry` or `outDir` is not provided as a non-empty string.
 */

import { build } from "esbuild";

export default async function buildStyleSheets(entry = [], outDir) {
  if (
    typeof entry !== "string" ||
    !entry.trim() ||
    typeof outDir !== "string" ||
    !outDir.trim()
  ) {
    throw new Error("buildStyles: entry and outDir must be non-empty strings");
  }

  return build({
    entryPoints: entry,
    bundle: true,
    outdir: outDir,
    loader: { ".css": "css" },
    external: ["*.ttf", "*.woff", "*.woff2", "*.eot", "*.svg"],
    minify: true,
    legalComments: "none",
    platform: "browser",
    target: ["chrome58", "firefox57", "safari11"],
    write: true,
    logLevel: "info",
  });
}
