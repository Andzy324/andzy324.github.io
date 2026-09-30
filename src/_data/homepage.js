import awards from "./awards.js";
import education from "./education.js";
import experiences from "./experiences.js";
import hero from "./hero.js";
import news from "./news.js";
import projects from "./projects.js";
import publications from "./publications.js";
import researchAreas from "./researchAreas.js";
import trajectory from "./researchTrajectory.js";

const contentBySection = {
  hero,
  news,
  research: researchAreas,
  publications,
  experiences,
  education,
  awards,
  projects,
};

const sections = [
  {
    id: "hero",
    template: "sections/hero.njk",
    title: "Profile",
    enabled: true,
    navigation: false,
  },
  {
    id: "news",
    template: "sections/news.njk",
    title: "News",
    enabled: true,
    navigation: false,
  },
  {
    id: "research",
    template: "sections/research.njk",
    title: "Research Interests",
    enabled: true,
    navigation: true,
  },
  {
    id: "publications",
    template: "sections/publications.njk",
    title: "Selected Publications",
    enabled: true,
    navigation: true,
  },
  {
    id: "experiences",
    template: "sections/experiences.njk",
    title: "Experiences",
    enabled: true,
    navigation: true,
  },
  {
    id: "education",
    template: "sections/education.njk",
    title: "Education",
    enabled: true,
    navigation: true,
  },
  {
    id: "awards",
    template: "sections/awards.njk",
    title: "Selected Awards",
    enabled: true,
    navigation: false,
  },
  {
    id: "projects",
    template: "sections/projects.njk",
    title: "Projects",
    enabled: true,
    navigation: false,
  },
];

function hasContent(id, content) {
  if (id === "hero") {
    return Boolean(content?.bio?.length || content?.highlight || content?.note);
  }
  return Array.isArray(content) && content.length > 0;
}

const resolvedSections = sections.map((section) => ({
  ...section,
  content: contentBySection[section.id],
  ...(section.id === "research" ? { trajectory } : {}),
  hasContent: hasContent(section.id, contentBySection[section.id]),
}));

export default {
  sections: resolvedSections,
  enabled: Object.fromEntries(
    resolvedSections.map((section) => [
      section.id,
      section.enabled && section.hasContent,
    ]),
  ),
};
