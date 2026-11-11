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
    const button = this;
    button.disabled = true;
    button.textContent = "Loading visitor map…";
    window._wau = window._wau || [];
    window._wau.push(["map", "4dpf4o0ka7", "nxt", "200", "100", "night", "cross-pink"]);
    const widget = document.createElement("script");
    widget.id = "_waunxt";
    map.prepend(widget);
    const loader = document.createElement("script");
    loader.async = true;
    loader.src = "https://waust.at/m.js";
    const finish = () => {
      const image = map.querySelector(":scope > span > img");
      if (!image) return;
      if (image.complete && image.naturalWidth) {
        observer.disconnect();
        window.clearTimeout(timeout);
        button.remove();
      } else {
        image.addEventListener("load", finish, { once: true });
      }
    };
    const observer = new window.MutationObserver(finish);
    observer.observe(map, { childList: true, subtree: true });
    const timeout = window.setTimeout(() => { observer.disconnect(); if (button.isConnected) button.textContent = "Map unavailable; reload to retry"; }, 10000);
    loader.addEventListener("error", () => { observer.disconnect(); window.clearTimeout(timeout); button.textContent = "Map unavailable; reload to retry"; });
    map.append(loader);
  });
});
