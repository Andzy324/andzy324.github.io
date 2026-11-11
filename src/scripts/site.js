import { Site } from "./modules/core.js";
import "./features/liquid-glass-navigation.js";

Site.initInitialScrollPosition();

Site.ready(function () {
  Site.initMobileNavbar();
  Site.initNewsArchiveDisclosure();
  Site.initSmoothScroll();
  Site.initSiteGlassNav?.();
  const map = document.getElementById("visitor-map");
  if (map) {
    const dialog = document.getElementById("visitor-map-dialog");
    const live = document.getElementById("visitor-map-live");
    const globe = document.getElementById("visitor-globe-live");
    const views = dialog.querySelectorAll("[data-view]");
    const selectView = (view) => {
      live.hidden = view !== "map";
      globe.hidden = view !== "globe";
      for (const button of views) button.setAttribute("aria-pressed", String(button.dataset.view === view));
      if (view === "map" && !live.querySelector("img")) {
        const image = document.createElement("img");
        image.alt = "Live map of visitor locations";
        image.addEventListener("load", () => live.replaceChildren(image), { once: true });
        image.addEventListener("error", () => { live.textContent = "Map unavailable. Please try again later."; }, { once: true });
        image.src = `https://mapmyvisitors.com/map.png?d=${encodeURIComponent(map.dataset.widgetKey)}&cl=ffffff`;
      }
      if (view === "globe" && !globe.querySelector("script")) {
        const script = document.createElement("script");
        script.id = "mmvst_globe";
        script.src = `https://mapmyvisitors.com/globe.js?d=${encodeURIComponent(map.dataset.globeKey)}`;
        script.addEventListener("error", () => { globe.textContent = "Globe unavailable. Please try again later."; }, { once: true });
        globe.append(script);
      }
    };
    map.querySelector("button").addEventListener("click", () => { dialog.showModal(); selectView("map"); });
    for (const button of views) button.addEventListener("click", () => selectView(button.dataset.view));
  }
});
