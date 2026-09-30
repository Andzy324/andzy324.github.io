import Ajv2020 from "ajv/dist/2020.js";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import awards from "../src/_data/awards.js";
import education from "../src/_data/education.js";
import experiences from "../src/_data/experiences.js";
import hero from "../src/_data/hero.js";
import homepage from "../src/_data/homepage.js";
import news from "../src/_data/news.js";
import projects from "../src/_data/projects.js";
import publications from "../src/_data/publications.js";
import researchAreas from "../src/_data/researchAreas.js";
import site from "../src/_data/site.js";

const root = resolve(import.meta.dirname, "..");
const schemaId = "https://example.com/schemas/content.schema.json";
const schema = JSON.parse(
  readFileSync(resolve(root, "src/_schemas/content.schema.json"), "utf8"),
);
const ajv = new Ajv2020({ allErrors: true });
ajv.addSchema(schema);

function validateValue(name, reference, value) {
  const validate = ajv.getSchema(`${schemaId}#/$defs/${reference}`);
  if (!validate(value)) {
    throw new Error(
      `${name} is invalid:\n${ajv.errorsText(validate.errors, { separator: "\n" })}`,
    );
  }
}

function validateCollection(name, reference, items) {
  for (const item of items) {
    validateValue(`${name} "${item.id ?? item.title ?? item.date}"`, reference, item);
  }
}

const homepageSections = homepage.sections.map(
  ({ id, template, title, enabled, navigation }) => ({
    id,
    template,
    title,
    enabled,
    navigation,
  }),
);

validateValue("Site configuration", "site", site);
validateValue("Hero content", "hero", hero);
validateCollection("Homepage section", "homepageSection", homepageSections);
validateCollection("News item", "newsItem", news);
validateCollection("Research area", "researchArea", researchAreas);
validateCollection("Publication", "publication", publications);
validateCollection("Experience", "experience", experiences);
validateCollection("Education item", "education", education);
validateCollection("Award", "award", awards);
validateCollection("Project", "project", projects);

const areaIds = new Set(researchAreas.map((area) => area.id));
const resourceTypes = new Set(Object.keys(site.resourceTypes));
const allRecords = [
  ...publications,
  ...experiences,
  ...education,
  ...awards,
  ...projects,
];
const recordIds = new Set();

for (const record of allRecords) {
  if (recordIds.has(record.id)) {
    throw new Error(`Duplicate content id: ${record.id}`);
  }
  recordIds.add(record.id);
  if (record.area && !areaIds.has(record.area)) {
    throw new Error(`Unknown research area "${record.area}" in ${record.id}`);
  }
  for (const link of record.links ?? []) {
    if (!resourceTypes.has(link.type)) {
      throw new Error(`Unknown resource type "${link.type}" in ${record.id}`);
    }
  }
}

const sectionIds = new Set();
for (const section of homepageSections) {
  if (sectionIds.has(section.id)) {
    throw new Error(`Duplicate homepage section id: ${section.id}`);
  }
  sectionIds.add(section.id);
  const includePath = resolve(root, "src/_includes", section.template);
  if (!existsSync(includePath)) {
    throw new Error(`Missing homepage template: ${section.template}`);
  }
}

for (const section of homepage.sections) {
  if (section.enabled && !section.hasContent) {
    console.warn(`Homepage section "${section.id}" is enabled but has no content.`);
  }
}

function assertLocalPath(path, owner) {
  if (!path?.startsWith("/")) return;
  const localPath = resolve(root, "public", path.slice(1));
  if (!existsSync(localPath)) {
    throw new Error(`Missing local file ${path} in ${owner}`);
  }
}

function assertLocalMedia(media, owner) {
  assertLocalPath(media.src, owner);
  assertLocalPath(media.poster, owner);
}

assertLocalMedia(site.owner.portrait, "site.owner.portrait");
for (const item of site.social) assertLocalPath(item.icon, `social link ${item.label}`);
for (const [type, resource] of Object.entries(site.resourceTypes)) {
  assertLocalPath(resource.icon, `resource type ${type}`);
}
for (const publication of publications) {
  assertLocalMedia(publication.media, publication.id);
}
for (const experience of experiences) {
  for (const logo of experience.logos) assertLocalMedia(logo, experience.id);
}
for (const item of education) assertLocalMedia(item.logo, item.id);
for (const project of projects) {
  assertLocalMedia(project.media, project.id);
  if (!project.details) continue;
  assertLocalMedia(project.details.cover, `${project.id} cover`);
  const detailIds = new Set();
  for (const section of project.details.sections) {
    if (detailIds.has(section.id)) {
      throw new Error(`Duplicate project section id "${section.id}" in ${project.id}`);
    }
    detailIds.add(section.id);
    if (section.media) assertLocalMedia(section.media, `${project.id}/${section.id}`);
    for (const item of section.gallery ?? []) {
      assertLocalMedia(item.media, `${project.id}/${section.id}/${item.title}`);
    }
  }
}

console.log(
  `Validated ${allRecords.length} content records, ${homepageSections.length} homepage sections, and all local media.`,
);
