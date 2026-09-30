import { readFileSync } from "node:fs";

function normalizePathPrefix(value = "/") {
  const trimmed = String(value).trim();
  if (!trimmed || trimmed === "/") return "/";
  return `/${trimmed.replace(/^\/+|\/+$/g, "")}/`;
}

export default function (eleventyConfig) {
  const pathPrefix = normalizePathPrefix(process.env.PATH_PREFIX);
  const assetManifest = JSON.parse(
    readFileSync(new URL("./src/_data/asset-manifest.json", import.meta.url)),
  );
  const sitePath = (value = "/") => {
    const stringValue = String(value);
    if (
      !stringValue ||
      /^(?:[a-z]+:|#|\/\/)/i.test(stringValue)
    ) {
      return stringValue;
    }
    const localPath = stringValue.startsWith("/") ? stringValue : `/${stringValue}`;
    if (pathPrefix === "/") return localPath;
    return `${pathPrefix.slice(0, -1)}${localPath}`;
  };

  eleventyConfig.addPassthroughCopy({ public: "." });
  eleventyConfig.addWatchTarget("./src/styles/");
  eleventyConfig.addWatchTarget("./src/scripts/");
  eleventyConfig.addFilter("sitePath", sitePath);
  eleventyConfig.addFilter("siteSrcset", (value = "") =>
    String(value)
      .split(",")
      .map((candidate) => {
        const [url, descriptor] = candidate.trim().split(/\s+/, 2);
        return `${sitePath(url)}${descriptor ? ` ${descriptor}` : ""}`;
      })
      .join(", "),
  );
  eleventyConfig.addFilter("absoluteUrl", (value, siteUrl) =>
    `${String(siteUrl).replace(/\/+$/, "")}${sitePath(value)}`,
  );
  eleventyConfig.addFilter("asset", (name) =>
    sitePath(assetManifest[name] ?? name),
  );
  eleventyConfig.addFilter("json", (value) => JSON.stringify(value));
  eleventyConfig.addFilter("dateYear", (value) =>
    new Intl.DateTimeFormat("en", { year: "numeric" }).format(new Date(value)),
  );

  return {
    dir: {
      input: "src",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data",
      output: "_site",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    pathPrefix,
  };
}
