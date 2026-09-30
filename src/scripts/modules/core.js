import { Site } from "./state.js";

function toArray(list) {
  return Array.from(list || []);
}

function ready(callback) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", callback, { once: true });
    return;
  }
  callback();
}

function addClass(element, className) {
  element?.classList.add(className);
}

function removeClass(element, className) {
  element?.classList.remove(className);
}

function prefersReducedMotion() {
  return Boolean(
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
  );
}

function initInitialScrollPosition() {
  if (window.location.hash) return;
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }
  window.scrollTo(0, 0);
}

function initMobileNavbar() {
  const navbar = document.querySelector(".navbar");
  const toggle = document.querySelector(".navbar-toggle");
  const navLinks = document.getElementById("site-nav");
  if (!navbar || !toggle || !navLinks) return;

  const setOpen = (isOpen) => {
    navbar.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute(
      "aria-label",
      isOpen ? toggle.dataset.closeLabel : toggle.dataset.openLabel,
    );
  };

  toggle.addEventListener("click", (event) => {
    event.stopPropagation();
    setOpen(!navbar.classList.contains("is-open"));
  });
  toArray(navLinks.querySelectorAll("a")).forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setOpen(false);
      toggle.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (navbar.classList.contains("is-open") && !navbar.contains(event.target)) {
      setOpen(false);
    }
  });
  window.matchMedia?.("(min-width: 901px)").addEventListener("change", (event) => {
    if (event.matches) setOpen(false);
  });
}

function initNewsArchiveDisclosure() {
  const archive = document.getElementById("old-news");
  const mobileQuery = window.matchMedia?.("(max-width: 900px)");
  if (!archive || !mobileQuery) return;

  const sync = (event) => {
    archive.open = !event.matches;
  };
  sync(mobileQuery);
  mobileQuery.addEventListener("change", sync);
}

function initSmoothScroll() {
  const getOffset = () => {
    const navigation = document.querySelector(".navbar");
    if (!navigation) return 12;
    const bounds = navigation.getBoundingClientRect();
    return Math.max(0, bounds.top) + bounds.height + 16;
  };

  const scrollToHash = (hash) => {
    if (!hash || hash === "#") return;
    let target;
    try {
      target = document.querySelector(hash);
    } catch {
      return;
    }
    if (!target) return;

    const top = target.getBoundingClientRect().top + window.scrollY - getOffset();
    window.scrollTo({
      top,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  toArray(document.querySelectorAll('.navbar a[href^="#"]')).forEach((link) => {
    link.addEventListener("click", (event) => {
      const hash = link.getAttribute("href");
      if (!hash || hash.length < 2) return;
      event.preventDefault();
      scrollToHash(hash);
      window.history.replaceState(null, "", hash);
    });
  });

  if (window.location.hash) {
    window.requestAnimationFrame(() => scrollToHash(window.location.hash));
  }
  window.addEventListener("hashchange", () => scrollToHash(window.location.hash));
}

Object.assign(Site, {
  toArray,
  ready,
  addClass,
  removeClass,
  prefersReducedMotion,
  initInitialScrollPosition,
  initMobileNavbar,
  initNewsArchiveDisclosure,
  initSmoothScroll,
});

export { Site };
