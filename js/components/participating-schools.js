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
