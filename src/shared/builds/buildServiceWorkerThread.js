/**
 * Bundles scripts for browser runtime using esbuild.
 *
 * @param {string} entry
 *   The relative path to the entry script file (e.g. './src/browser/index.js').
 * @param {string} outDir
 *   The directory where the bundled output should be written (e.g. './dist').
 * @returns {Promise<import('esbuild').BuildResult>}
 *   A promise that resolves with the esbuild build result when bundling completes.
 */

import { build } from "esbuild";

export default async function buildServiceWorkerThread(entry, outDir) {
  if (
    typeof entry !== "string" ||
    !entry.trim() ||
    typeof outDir !== "string" ||
    !outDir.trim()
  ) {
    throw new Error(
      "buildBrowserRuntime: both entry and outDir must be non-empty strings"
    );
  }

  return build({
    entryPoints: [entry],
    bundle: true,
    platform: "browser",
    format: "esm",
    target: ["es2024"],
    minify: true,
    splitting: true,
    outdir: outDir,
    logLevel: "info",
  });
}
