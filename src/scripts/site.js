import { Site } from "./modules/core.js";
import "./features/liquid-glass-navigation.js";

Site.initInitialScrollPosition();

Site.ready(function () {
  Site.initMobileNavbar();
  Site.initNewsArchiveDisclosure();
  Site.initSmoothScroll();
  Site.initSiteGlassNav?.();
});
