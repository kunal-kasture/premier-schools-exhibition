// Play/pause toggle for the event video.
function initEventVideo() {
  const video = document.querySelector(".event-video__player");
  const toggle = document.querySelector(".event-video__toggle");
  if (!video || !toggle) return;
  const text = toggle.querySelector(".event-video__toggle-text");
  const icon = toggle.querySelector(".event-video__toggle-icon");

  const sync = () => {
    const playing = !video.paused && !video.ended;
    const mutedState = video.muted;
    toggle.setAttribute("aria-pressed", String(!playing || mutedState));
    text.textContent = mutedState
      ? "Play Event Video"
      : playing
        ? "Pause Event Video"
        : "Play Event Video";
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
}
