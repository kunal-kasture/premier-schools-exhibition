// Entry point: wire up page behaviours once the DOM is ready.
import { initStickyHeader } from "./components/header.js";
import { initHeroSlider } from "./components/hero.js";

document.addEventListener("DOMContentLoaded", () => {
  initStickyHeader();
  initHeroSlider();
});
