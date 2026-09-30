import { Buffer } from "node:buffer";
import { readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const minimumHomepageBytes = 1024;
const fallbackMarker = "data-pages-configuration-error";
const deployedMode = process.argv.includes("--deployed");

function validateGeneratedHomepage(html, source, byteLength) {
  const errors = [];

  if (byteLength < minimumHomepageBytes) {
    errors.push(
      `${source} is ${byteLength} bytes; expected at least ${minimumHomepageBytes} bytes`,
    );
  }
  if (!/<!doctype html>/i.test(html)) {
    errors.push(`${source} is missing an HTML doctype`);
  }
  if (!/\sid=["']main-content["']/.test(html)) {
    errors.push(`${source} is missing #main-content`);
  }
  if (!/assets\/generated\/site\.[a-f0-9]+\.css/.test(html)) {
    errors.push(`${source} is missing the generated homepage stylesheet`);
  }
  if (!/assets\/generated\/site\.[a-f0-9]+\.js/.test(html)) {
    errors.push(`${source} is missing the generated homepage script`);
  }
  if (html.includes(fallbackMarker)) {
    errors.push(`${source} contains the branch-deployment fallback page`);
  }

  if (errors.length) {
    throw new Error(
      `GitHub Pages output validation failed:\n${errors.join("\n")}`,
    );
  }
}

function validateFallback() {
  const fallbackPath = resolve(root, "index.html");
  const fallback = readFileSync(fallbackPath, "utf8");
  const jekyllConfig = readFileSync(resolve(root, "_config.yml"), "utf8");
  const errors = [];

  if (!fallback.includes(fallbackMarker)) {
    errors.push("root index.html is missing the deployment-error marker");
  }
  if (!/name=["']robots["'][^>]+noindex/i.test(fallback)) {
    errors.push("root index.html must remain excluded from search indexing");
  }
  if (!fallback.includes("Settings → Pages")) {
    errors.push("root index.html is missing the Pages configuration path");
  }
  if (!/^\s*- src\s*$/m.test(jekyllConfig)) {
    errors.push("_config.yml must exclude src from branch-based Jekyll builds");
  }

  if (errors.length) {
    throw new Error(
      `Branch-deployment fallback validation failed:\n${errors.join("\n")}`,
    );
  }
}

async function checkDeployedHomepage() {
  const deployedUrl = process.env.DEPLOYED_URL;
  if (!deployedUrl) {
    throw new Error("DEPLOYED_URL is required for --deployed validation");
  }

  const attempts = 8;
  const retryDelayMs = 5000;
  let lastError;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const url = new URL(deployedUrl);
    url.searchParams.set(
      "pages-check",
      `${process.env.PAGES_CHECK_ID || Date.now()}-${attempt}`,
    );

    try {
      const response = await fetch(url, {
        cache: "no-store",
        headers: { "cache-control": "no-cache" },
        signal: globalThis.AbortSignal.timeout(15000),
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText}`);
      }

      const html = await response.text();
      validateGeneratedHomepage(
        html,
        response.url,
        Buffer.byteLength(html, "utf8"),
      );
      console.log(`Validated deployed homepage at ${response.url}.`);
      return;
    } catch (error) {
      lastError = error;
      if (attempt < attempts) {
        console.warn(
          `Deployment check ${attempt}/${attempts} failed: ${error.message}. Retrying...`,
        );
        await new Promise((resolveDelay) =>
          setTimeout(resolveDelay, retryDelayMs),
        );
      }
    }
  }

  throw lastError;
}

if (deployedMode) {
  await checkDeployedHomepage();
} else {
  const homepagePath = resolve(root, "_site/index.html");
  const homepage = readFileSync(homepagePath, "utf8");
  validateGeneratedHomepage(
    homepage,
    "_site/index.html",
    statSync(homepagePath).size,
  );
  validateFallback();
  console.log("Validated generated homepage and branch-deployment fallback.");
}
