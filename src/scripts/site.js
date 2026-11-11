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
    map.querySelector("button").addEventListener("click", () => {
      dialog.showModal();
      if (!live.querySelector("img")) {
        const image = document.createElement("img");
        image.alt = "Live map of visitor locations";
        image.addEventListener("load", () => live.replaceChildren(image), { once: true });
        image.addEventListener("error", () => { live.textContent = "Map unavailable. Please try again later."; }, { once: true });
        image.src = `https://mapmyvisitors.com/map.png?d=${encodeURIComponent(map.dataset.widgetKey)}&cl=ffffff`;
      }
    });
  }
});
