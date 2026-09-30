import { build, context } from "esbuild";
import {
  createHash,
} from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  renameSync,
  writeFileSync,
} from "node:fs";
import { basename, extname, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const outputDirectory = resolve(root, "public/assets/generated");
const manifestPath = resolve(root, "src/_data/asset-manifest.json");
const watching = process.argv.includes("--watch");

const entryPoints = {
  "site.css": "src/styles/main.css",
  "site.js": "src/scripts/site.js",
  "project.css": "src/styles/pages/project.css",
};

const availableEntries = Object.fromEntries(
  Object.entries(entryPoints).filter(([, source]) => existsSync(resolve(root, source))),
);

function fingerprintOutputs() {
  const manifest = {};

  for (const filename of readdirSync(outputDirectory)) {
    if (filename.includes(".")) {
      const extension = extname(filename);
      const logicalName = basename(filename, extension) + extension;
      const path = resolve(outputDirectory, filename);
      const hash = createHash("sha256")
        .update(readFileSync(path))
        .digest("hex")
        .slice(0, 10);
      const fingerprintedName = `${basename(filename, extension)}.${hash}${extension}`;
      renameSync(path, resolve(outputDirectory, fingerprintedName));
      manifest[logicalName] = `/assets/generated/${fingerprintedName}`;
    }
  }

  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
}

async function buildOnce() {
  rmSync(outputDirectory, { recursive: true, force: true });
  mkdirSync(outputDirectory, { recursive: true });

  await Promise.all(
    Object.entries(availableEntries).map(async ([logicalName, source]) => {
      await build({
        entryPoints: [resolve(root, source)],
        outfile: resolve(outputDirectory, logicalName),
        bundle: true,
        minify: true,
        sourcemap: false,
        target: ["es2020"],
        format: logicalName.endsWith(".js") ? "esm" : undefined,
        external: ["/assets/*"],
        legalComments: "none",
      });
    }),
  );

  fingerprintOutputs();
}

if (watching) {
  rmSync(outputDirectory, { recursive: true, force: true });
  mkdirSync(outputDirectory, { recursive: true });
  const manifest = Object.fromEntries(
    Object.keys(availableEntries).map((logicalName) => [
      logicalName,
      `/assets/generated/${logicalName}`,
    ]),
  );
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  const contexts = await Promise.all(
    Object.entries(availableEntries).map(([logicalName, source]) =>
      context({
        entryPoints: [resolve(root, source)],
        outfile: resolve(outputDirectory, logicalName),
        bundle: true,
        minify: false,
        sourcemap: true,
        target: ["es2020"],
        format: logicalName.endsWith(".js") ? "esm" : undefined,
        external: ["/assets/*"],
        legalComments: "none",
      }),
    ),
  );
  await Promise.all(contexts.map((item) => item.watch()));
  console.log("Asset watcher ready.");
} else {
  await buildOnce();
}
