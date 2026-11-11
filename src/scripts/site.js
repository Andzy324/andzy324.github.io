import { Site } from "./modules/core.js";
import "./features/liquid-glass-navigation.js";

Site.initInitialScrollPosition();

Site.ready(function () {
  Site.initMobileNavbar();
  Site.initNewsArchiveDisclosure();
  Site.initSmoothScroll();
  Site.initSiteGlassNav?.();
  const map = document.getElementById("visitor-map");
  map?.querySelector("button")?.addEventListener("click", function () {
    this.remove();
    window._wau = window._wau || [];
    window._wau.push(["map", "4dpf4o0ka7", "nxt", "200", "100", "night", "cross-pink"]);
    const widget = document.createElement("script");
    widget.id = "_waunxt";
    map.prepend(widget);
    const loader = document.createElement("script");
    loader.async = true;
    loader.src = "https://waust.at/m.js";
    map.append(loader);
  });
});
