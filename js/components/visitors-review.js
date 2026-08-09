// play/pause for the review videos
function initVisitorsReview() {
  document.querySelectorAll(".visitors-review__card").forEach((card) => {
    const video = card.querySelector(".visitors-review__video");
    const toggle = card.querySelector(".visitors-review__toggle");
    if (!video || !toggle) return;
    const text = toggle.querySelector(".visitors-review__toggle-text");
    const icon = toggle.querySelector(".visitors-review__toggle-icon");

    const sync = () => {
      const playing = !video.paused && !video.ended;
      const mutedState = video.muted;
      toggle.setAttribute("aria-pressed", String(!playing || mutedState));
      text.textContent = mutedState
        ? "Play Review"
        : playing
          ? "Pause Review"
          : "Play Review";
      icon.textContent = mutedState ? "▶" : playing ? "❚❚" : "▶";
    };

    toggle.addEventListener("click", () => {
      if (video.muted) {
        video.muted = false;
        video.play();
      } else if (video.paused || video.ended) {
        video.play();
      } else {
        video.pause();
      }
    });

    video.addEventListener("play", sync);
    video.addEventListener("pause", sync);
    video.addEventListener("ended", sync);
    video.addEventListener("volumechange", sync);
    sync();
  });

  // circular prev/next arrows scroll the grid by one card (mobile only)
  const grid = document.querySelector(".visitors-review__grid");
  const prevBtn = document.querySelector(".visitors-review__arrow--prev");
  const nextBtn = document.querySelector(".visitors-review__arrow--next");
  if (grid && prevBtn && nextBtn) {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const step = () => {
      const card = grid.querySelector(".visitors-review__card");
      const gap =
        parseFloat(getComputedStyle(grid).columnGap) ||
        parseFloat(getComputedStyle(grid).gap) ||
        30;
      return card ? card.getBoundingClientRect().width + gap : 0;
    };
    const scrollBy = (delta) => {
      grid.scrollBy({
        left: delta,
        behavior: reducedMotion ? "auto" : "smooth",
      });
    };
    prevBtn.addEventListener("click", () => scrollBy(-step()));
    nextBtn.addEventListener("click", () => scrollBy(step()));
  }
}
