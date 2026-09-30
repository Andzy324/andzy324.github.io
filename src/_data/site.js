function normalizePathPrefix(value = "/") {
  const trimmed = String(value).trim();
  if (!trimmed || trimmed === "/") return "/";
  return `/${trimmed.replace(/^\/+|\/+$/g, "")}/`;
}

const pathPrefix = normalizePathPrefix(process.env.PATH_PREFIX);
const buildDate = new Date().toISOString().slice(0, 10);

export default {
  url: (process.env.SITE_URL || "https://andzy324.github.io").replace(/\/+$/, ""),
  pathPrefix,
  title: "Boyang Zhong",
  description:
    "Boyang Zhong is an M.Sc. researcher at TUM working on 3D vision, embodied AI, generative world models, and robotic manipulation.",
  language: "en",
  updated: buildDate,
  owner: {
    name: "Boyang Zhong",
    alternateNames: ["钟伯扬"],
    email: "boyang.zhong@tum.de",
    portrait: {
      src: "/assets/profile-linkedin.png",
      width: 800,
      height: 800,
      alt: "Portrait of Boyang Zhong",
    },
  },
  labels: {
    skipToContent: "Skip to content",
    primaryNavigation: "Primary navigation",
    openNavigation: "Open navigation menu",
    closeNavigation: "Close navigation menu",
    profileResources: "Profile resources",
    moreNews: "More news",
    lastUpdated: "Last updated",
    backHome: "Back to homepage",
  },
  utilityLinks: [],
  social: [
    {
      label: "Email",
      url: "mailto:boyang.zhong@tum.de",
      icon: "/assets/misc/email-logo.svg",
    },
    {
      label: "Google Scholar",
      url: "https://scholar.google.com/citations?user=VI0i7c0AAAAJ",
      icon: "/assets/misc/google-scholar.svg",
      external: true,
    },
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/boyang-zhong",
      icon: "/assets/misc/linkedin-logo.svg",
      external: true,
    },
  ],
  resourceTypes: {
    arxiv: { label: "Preprint", icon: "/assets/misc/arxiv_logo.svg" },
    paper: { label: "Paper", icon: "/assets/misc/paper_logo.svg" },
    poster: { label: "Poster", icon: "/assets/misc/poster-logo.svg" },
    project: {
      label: "Project website",
      icon: "/assets/misc/website_logo.png",
    },
    code: { label: "Source code", icon: "/assets/misc/github-logo.png" },
    video: { label: "Video", icon: "/assets/misc/yotube_logo.png" },
    ieee: {
      label: "Publisher",
      icon: "/assets/misc/ieee-logo.svg",
      className: "ieee-inline-logo",
    },
    pdf: { label: "Document", icon: "/assets/misc/paper_logo.svg" },
  },
  features: {
    liquidGlassNavigation: true,
  },
};
