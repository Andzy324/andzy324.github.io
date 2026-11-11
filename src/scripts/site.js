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
    const globe = document.getElementById("visitor-globe-live");
    map.querySelector("button").addEventListener("click", () => {
      dialog.showModal();
      if (!globe.querySelector("iframe")) {
        const frame = document.createElement("iframe");
        frame.title = "Live visitor globe";
        frame.src = map.dataset.globeUrl;
        frame.addEventListener("load", () => {
          setTimeout(() => {
            const inner = frame.contentDocument?.querySelector(".mmvst_inner");
            if (!inner || window.getComputedStyle(inner).display === "none") {
              globe.textContent = "The globe is unavailable right now. Please view the full visitor statistics.";
            }
          }, 2500);
        }, { once: true });
        globe.replaceChildren(frame);
      }
    });
  }
});
