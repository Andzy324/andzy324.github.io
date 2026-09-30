import site from "./site.js";

const prefixedPath = (value) => {
  const localPath = value.startsWith("/") ? value : `/${value}`;
  return site.pathPrefix === "/"
    ? localPath
    : `${site.pathPrefix.slice(0, -1)}${localPath}`;
};

const profileId = `${site.url}${prefixedPath("/")}#profile-owner`;

export default {
  jsonLd: {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${site.url}${prefixedPath("/")}#website`,
        url: `${site.url}${prefixedPath("/")}`,
        name: site.title,
        description: site.description,
      },
      {
        "@type": "ProfilePage",
        "@id": `${site.url}${prefixedPath("/")}#profile`,
        url: `${site.url}${prefixedPath("/")}`,
        name: site.title,
        isPartOf: { "@id": `${site.url}${prefixedPath("/")}#website` },
        mainEntity: { "@id": profileId },
      },
      {
        "@type": "Person",
        "@id": profileId,
        name: site.owner.name,
        alternateName: site.owner.alternateNames,
        email: `mailto:${site.owner.email}`,
        image: `${site.url}${prefixedPath(site.owner.portrait.src)}`,
        sameAs: site.social
          .map((item) => item.url)
          .filter((url) => /^https?:\/\//.test(url)),
      },
    ],
  },
};
