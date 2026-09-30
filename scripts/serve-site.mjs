import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, resolve, sep } from "node:path";

const siteRoot = resolve(import.meta.dirname, "..", "_site");
const port = Number.parseInt(process.env.E2E_PORT || "4173", 10);
const pathPrefix = (() => {
  const value = String(process.env.PATH_PREFIX || "/").trim();
  if (!value || value === "/") return "/";
  return `/${value.replace(/^\/+|\/+$/g, "")}/`;
})();
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mp4": "video/mp4",
  ".obj": "text/plain; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
};

function localPathname(requestUrl) {
  let pathname = decodeURIComponent(new URL(requestUrl, "http://localhost").pathname);
  if (pathPrefix !== "/") {
    if (pathname === pathPrefix.slice(0, -1)) return { redirect: pathPrefix };
    if (!pathname.startsWith(pathPrefix)) return null;
    pathname = `/${pathname.slice(pathPrefix.length)}`;
  }
  return { pathname };
}

createServer(async (request, response) => {
  const local = localPathname(request.url || "/");
  if (!local) {
    response.writeHead(404).end("Not found");
    return;
  }
  if (local.redirect) {
    response.writeHead(301, { Location: local.redirect }).end();
    return;
  }

  let pathname = local.pathname;
  if (pathname.endsWith("/")) pathname += "index.html";
  const filePath = resolve(siteRoot, `.${pathname}`);
  if (filePath !== siteRoot && !filePath.startsWith(`${siteRoot}${sep}`)) {
    response.writeHead(403).end("Forbidden");
    return;
  }

  try {
    const fileStats = await stat(filePath);
    if (!fileStats.isFile()) throw new Error("Not a file");
    response.writeHead(200, {
      "Content-Length": fileStats.size,
      "Content-Type": contentTypes[extname(filePath)] || "application/octet-stream",
    });
    createReadStream(filePath).pipe(response);
  } catch {
    response.writeHead(404).end("Not found");
  }
}).listen(port, "127.0.0.1");
