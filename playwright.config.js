import { defineConfig } from "@playwright/test";

const serverPathPrefix = (() => {
  const value = String(
    process.env.PLAYWRIGHT_PATH_PREFIX || process.env.PATH_PREFIX || "/",
  ).trim();
  if (!value || value === "/") return "/";
  return `/${value.replace(/^\/+|\/+$/g, "")}/`;
})();

const viewports = [
  ["desktop-1440", 1440, 900],
  ["desktop-1024", 1024, 900],
  ["desktop-901", 901, 900],
  ["mobile-900", 900, 900],
  ["tablet-768", 768, 900],
  ["mobile-390", 390, 844],
];

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  retries: 0,
  reporter: "line",
  use: {
    baseURL: "http://127.0.0.1:4173",
    channel: "chrome",
    trace: "retain-on-failure",
  },
  projects: viewports.map(([name, width, height]) => ({
    name,
    use: { viewport: { width, height } },
  })),
  webServer: {
    command: "node scripts/serve-site.mjs",
    url: `http://127.0.0.1:4173${serverPathPrefix}`,
    reuseExistingServer: true,
  },
});
