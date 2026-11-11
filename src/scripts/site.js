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
      if (view === "globe" && !globe.querySelector("iframe")) {
        const frame = document.createElement("iframe");
        frame.title = "Live visitor globe";
        frame.src = map.dataset.globeUrl;
        frame.addEventListener("load", () => {
          setTimeout(() => {
            const inner = frame.contentDocument?.querySelector(".mmvst_inner");
            if (!inner || window.getComputedStyle(inner).display === "none") {
              globe.textContent = "The globe is unavailable right now. Please use the map view.";
            }
          }, 2500);
        }, { once: true });
        globe.replaceChildren(frame);
      }
    };
    map.querySelector("button").addEventListener("click", () => {
      dialog.showModal();
      selectView("map");
      if (!live.querySelector("img")) {
        const image = document.createElement("img");
        image.alt = "Live map of visitor locations";
        image.addEventListener("load", () => live.replaceChildren(image), { once: true });
        image.addEventListener("error", () => { live.textContent = "Map unavailable. Please try again later."; }, { once: true });
        image.src = `https://mapmyvisitors.com/map.png?d=${encodeURIComponent(map.dataset.widgetKey)}&cl=ffffff&w=470`;
      }
    });
    for (const button of views) button.addEventListener("click", () => selectView(button.dataset.view));
  }
});
