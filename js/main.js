// boot the widgets on DOM ready
// one broken init shouldn't kill the rest
document.addEventListener("DOMContentLoaded", () => {
  const inits = [
    "initStickyHeader",
    "initHeroSlider",
    "initSchoolSlider",
    "initEventVideo",
    "initChooseSchoolSlider",
    "initExhibitionSlider",
    "initVisitorsReview",
    "initGallery",
  ];
  inits.forEach((name) => {
    try {
      window[name]?.();
    } catch (err) {
      console.error(`[main] ${name} failed:`, err);
    }
  });
});

// pause/play for the scrolling logos
function initSchoolSlider() {
  const section = document.querySelector(".participating-schools");
  const pauseBtn = section?.querySelector(".participating-schools__pause-btn");
  if (!section || !pauseBtn) return;

  pauseBtn.addEventListener("click", () => {
    const isPaused = section.classList.toggle("participating-schools--paused");
    pauseBtn.setAttribute("aria-pressed", String(isPaused));
    pauseBtn.textContent = isPaused ? "Play" : "Pause";
  });
}
