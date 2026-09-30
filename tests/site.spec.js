import { expect, test } from "@playwright/test";
import homepage from "../src/_data/homepage.js";
import projectPages from "../src/_data/projectPages.js";
import site from "../src/_data/site.js";

const pathPrefix = (() => {
  const value = String(process.env.PLAYWRIGHT_PATH_PREFIX || "/").trim();
  if (!value || value === "/") return "/";
  return `/${value.replace(/^\/+|\/+$/g, "")}/`;
})();
const sitePath = (value) =>
  pathPrefix === "/" ? value : `${pathPrefix.slice(0, -1)}${value}`;

const enabledSections = homepage.sections.filter(
  (section) => section.enabled && section.hasContent,
);
const navigationSections = enabledSections.filter(
  (section) => section.navigation,
);
const publicPages = [
  "/",
  ...projectPages.map((project) => `/projects/${project.id}/`),
];

test("all configured public pages are reachable", async ({ page }) => {
  for (const path of publicPages) {
    const response = await page.goto(sitePath(path), {
      waitUntil: "domcontentloaded",
    });
    expect(response?.ok(), path).toBeTruthy();
  }
});

test("removed personal experiment routes stay absent", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-1440");
  for (const path of [
    "/render_arts/",
    "/three_js_arts/jelly_receipt/",
    "/three_js_arts/water_pool/",
  ]) {
    const response = await page.goto(sitePath(path));
    expect(response?.status(), path).toBe(404);
  }
});

test("homepage follows the section registry", async ({ page }) => {
  const consoleErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  await page.goto(sitePath("/"), { waitUntil: "networkidle" });

  await expect(page.locator("h1")).toContainText(site.owner.name);
  const renderedIds = await page
    .locator("main .home-section")
    .evaluateAll((sections) => sections.map((section) => section.id));
  expect(renderedIds).toEqual(enabledSections.map((section) => section.id));

  const overflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth -
      document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(1);
  expect(consoleErrors).toEqual([]);
});

test("homepage content roles follow the shared hierarchy contract", async ({
  page,
}, testInfo) => {
  await page.goto(sitePath("/"));

  const width = testInfo.project.use.viewport.width;
  const isCompact = width <= 900;
  const pageTitleSize = isCompact
    ? Math.min(32, Math.max(27, width * 0.074))
    : 36;
  const expected = {
    pageTitle: {
      selector: ".type-page-title",
      size: pageTitleSize,
      weight: 700,
      leading: 1.15,
    },
    sectionTitle: {
      selector: ".type-section-title",
      size: isCompact ? 23 : 28,
      weight: 700,
      leading: 1.18,
    },
    entryTitle: {
      selector: ".type-entry-title",
      size: 20,
      weight: 700,
      leading: 1.25,
    },
    groupLabel: {
      selector: ".type-group-label",
      size: isCompact ? 14 : 16,
      weight: 700,
      leading: 1.35,
      tracking: (isCompact ? 14 : 16) * 0.1,
      transform: "uppercase",
    },
    body: {
      selector: ".type-body:not(.type-body--emphasis)",
      size: 16,
      weight: 400,
      leading: 1.65,
    },
    bodyEmphasis: {
      selector: ".type-body--emphasis",
      size: 16,
      weight: 700,
      leading: 1.65,
    },
    secondary: {
      selector: ".type-secondary",
      size: 14,
      weight: 400,
      leading: 1.5,
    },
    meta: {
      selector: ".type-meta:not(.type-meta--uppercase)",
      size: 13,
      weight: 600,
      leading: 1.45,
    },
    metaUppercase: {
      selector: ".type-meta--uppercase",
      size: 13,
      weight: 600,
      leading: 1.45,
      transform: "uppercase",
    },
    caption: { selector: ".type-caption", size: 13, weight: 400, leading: 1.5 },
    tag: { selector: ".type-tag", size: 14, weight: 700, leading: 1.4 },
    control: { selector: ".type-control", size: 15, weight: 600, leading: 1.4 },
  };

  for (const [role, contract] of Object.entries(expected)) {
    const styles = await page.locator(contract.selector).evaluateAll((nodes) =>
      nodes.map((node) => {
        const computed = getComputedStyle(node);
        return {
          family: computed.fontFamily,
          fontStyle: computed.fontStyle,
          size: Number.parseFloat(computed.fontSize),
          weight: Number.parseInt(computed.fontWeight, 10),
          lineHeight: Number.parseFloat(computed.lineHeight),
          tracking: computed.letterSpacing,
          transform: computed.textTransform,
        };
      }),
    );
    expect(styles.length, `${role} has no rendered example`).toBeGreaterThan(0);
    for (const style of styles) {
      expect(style.family, role).toContain("Lato");
      expect(style.fontStyle, role).toBe("normal");
      expect(style.size, role).toBeCloseTo(contract.size, 1);
      expect(style.weight, role).toBe(contract.weight);
      expect(style.lineHeight, role).toBeCloseTo(
        contract.size * contract.leading,
        1,
      );
      expect(style.transform, role).toBe(contract.transform || "none");
      if (contract.tracking) {
        expect(Number.parseFloat(style.tracking), role).toBeCloseTo(
          contract.tracking,
          1,
        );
      } else {
        expect(style.tracking, role).toBe("normal");
      }
    }
  }

  expect(expected.pageTitle.size).toBeGreaterThan(expected.sectionTitle.size);
  expect(expected.sectionTitle.size).toBeGreaterThan(expected.entryTitle.size);
  expect(expected.entryTitle.size).toBeGreaterThan(expected.body.size);
  if (isCompact)
    expect(expected.body.size).toBeGreaterThan(expected.groupLabel.size);
  else expect(expected.body.size).toBe(expected.groupLabel.size);
});

test("homepage headings preserve the semantic content outline", async ({
  page,
}) => {
  await page.goto(sitePath("/"));

  await expect(page.locator("h1.type-page-title")).toHaveCount(1);
  await expect(page.locator("h2.type-section-title")).toHaveCount(
    enabledSections.filter((section) => section.id !== "hero").length,
  );
  expect(
    await page.locator("article h3.type-entry-title").count(),
  ).toBeGreaterThan(0);
  expect(
    await page.locator("article h4.type-group-label").count(),
  ).toBeGreaterThan(0);

  const levels = await page
    .locator("main h1, main h2, main h3, main h4")
    .evaluateAll((headings) =>
      headings.map((heading) => Number(heading.tagName.slice(1))),
    );
  for (let index = 1; index < levels.length; index += 1) {
    expect(levels[index] - levels[index - 1]).toBeLessThanOrEqual(1);
  }
});

test("entry descriptions and inline links inherit their declared roles", async ({
  page,
}, testInfo) => {
  await page.goto(sitePath("/"));

  const articleMetrics = await page
    .locator("main article")
    .evaluateAll((articles) =>
      articles
        .map((article) => {
          const title = article.querySelector(".type-entry-title");
          const body = article.querySelector(".type-body");
          const group = article.querySelector(".type-group-label");
          if (!title || (!body && !group)) return null;
          return {
            title: Number.parseFloat(getComputedStyle(title).fontSize),
            body: body
              ? Number.parseFloat(getComputedStyle(body).fontSize)
              : null,
            group: group
              ? Number.parseFloat(getComputedStyle(group).fontSize)
              : null,
          };
        })
        .filter(Boolean),
    );
  expect(articleMetrics.length).toBeGreaterThan(0);
  for (const metrics of articleMetrics) {
    if (metrics.body !== null) expect(metrics.body).toBeLessThan(metrics.title);
    if (metrics.group !== null)
      expect(metrics.group).toBeLessThan(metrics.title);
    if (
      testInfo.project.use.viewport.width <= 900 &&
      metrics.body !== null &&
      metrics.group !== null
    ) {
      expect(metrics.group).toBeLessThan(metrics.body);
    }
  }

  const inheritedLinks = await page
    .locator(".type-body a, .type-secondary a, .type-meta a, .type-caption a")
    .evaluateAll((links) =>
      links.map((link) => {
        const parent = link.closest(
          ".type-body, .type-secondary, .type-meta, .type-caption",
        );
        const linkStyle = getComputedStyle(link);
        const parentStyle = getComputedStyle(parent);
        return {
          link: [
            linkStyle.fontSize,
            linkStyle.fontWeight,
            linkStyle.lineHeight,
          ],
          parent: [
            parentStyle.fontSize,
            parentStyle.fontWeight,
            parentStyle.lineHeight,
          ],
        };
      }),
    );
  expect(inheritedLinks.length).toBeGreaterThan(0);
  for (const styles of inheritedLinks)
    expect(styles.link).toEqual(styles.parent);
});

test("navigation is derived from configured utility and section links", async ({
  page,
}) => {
  await page.goto(sitePath("/"));
  const links = page.locator("#site-nav > a");
  const expectedLabels = [
    ...site.utilityLinks.filter((item) => item.url).map((item) => item.label),
    ...navigationSections.map((section) => section.title),
  ];
  await expect(links).toHaveCount(expectedLabels.length);
  expect((await links.allTextContents()).map((label) => label.trim())).toEqual(
    expectedLabels,
  );

  for (const section of navigationSections) {
    await expect(
      page.locator(`#site-nav a[href="#${section.id}"]`),
    ).toHaveCount(1);
  }
});

test("mobile navigation supports keyboard dismissal", async ({
  page,
}, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("mobile-"));
  await page.goto(sitePath("/"));
  const toggle = page.locator(".navbar-toggle");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(toggle).toBeFocused();
});

test("profile resources keep links and static placeholders distinct", async ({
  page,
}) => {
  await page.goto(sitePath("/"));
  const linked = site.social.filter((item) => item.url);
  const staticItems = site.social.filter((item) => !item.url);
  await expect(page.locator("#avatar-icons .avatar-resource")).toHaveCount(
    site.social.length,
  );
  await expect(page.locator("#avatar-icons a")).toHaveCount(linked.length);
  const staticResources = page.locator(
    "#avatar-icons .avatar-resource--static",
  );
  await expect(staticResources).toHaveCount(staticItems.length);
  expect(
    await staticResources.evaluateAll((items) =>
      items.every(
        (item) => !item.hasAttribute("href") && !item.hasAttribute("tabindex"),
      ),
    ),
  ).toBe(true);
});

test("homepage remains readable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(sitePath("/"));

  for (const section of enabledSections) {
    await expect(page.locator(`#${section.id}`)).toBeVisible();
  }
  await expect(page.locator("#site-nav")).toBeVisible();
  await context.close();
});

test("liquid glass is progressive enhancement", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("desktop-"));
  await page.goto(sitePath("/"));
  const navigation = page.locator(".navbar");
  await expect(navigation).toBeVisible();

  if (site.features.liquidGlassNavigation) {
    await expect(navigation).toHaveAttribute("data-site-glass-nav", "");
    await expect(navigation).toHaveAttribute("data-site-glass-ready", "true");
  } else {
    await expect(navigation).not.toHaveAttribute("data-site-glass-nav", "");
  }
});

test("project details are generated from project data", async ({ page }) => {
  test.skip(projectPages.length === 0, "No project detail pages configured.");
  const project = projectPages[0];
  const consoleErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  await page.goto(sitePath(`/projects/${project.id}/`));
  await expect(page.locator("h1")).toHaveText(project.title);
  await expect(page.locator(".project-cover img")).toHaveAttribute(
    "alt",
    project.details.cover.alt,
  );
  await expect(page.locator(".project-section")).toHaveCount(
    project.details.sections.length,
  );
  await expect(page.locator(".project-nav a")).toHaveAttribute(
    "href",
    sitePath("/"),
  );
  const overflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth -
      document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(1);
  expect(consoleErrors).toEqual([]);
});

test("generated metadata contains only public template routes", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-1440");

  const buildDate = new Date().toISOString().slice(0, 10);
  const sitemap = await (
    await page.request.get(sitePath("/sitemap.xml"))
  ).text();
  const llms = await (await page.request.get(sitePath("/llms.txt"))).text();

  expect(site.updated).toBe(buildDate);
  expect(sitemap).toContain(`<lastmod>${buildDate}</lastmod>`);
  await page.goto(sitePath("/"));
  await expect(page.locator(".site-footer")).toContainText(
    buildDate.replaceAll("-", "/"),
  );

  for (const project of projectPages) {
    expect(sitemap).toContain(`/projects/${project.id}/`);
    expect(llms).toContain(`/projects/${project.id}/`);
  }
  for (const removed of ["render_arts", "three_js_arts", "jelly_receipt"]) {
    expect(sitemap).not.toContain(removed);
    expect(llms).not.toContain(removed);
  }
});
