// Boot page behaviours once the DOM is ready.
document.addEventListener("DOMContentLoaded", () => {
  initStickyHeader();
  initHeroSlider();
  initSchoolSlider();
});

// Pause/play toggle for the scrolling school logos.
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
