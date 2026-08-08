// Play/pause toggle for the visitor review videos.
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
}
