// Play/pause toggle for the event video.
function initEventVideo() {
  const video = document.querySelector(".event-video__player");
  const toggle = document.querySelector(".event-video__toggle");
  if (!video || !toggle) return;
  const text = toggle.querySelector(".event-video__toggle-text");
  const icon = toggle.querySelector(".event-video__toggle-icon");

  const sync = () => {
    const playing = !video.paused && !video.ended;
    toggle.setAttribute("aria-pressed", String(!playing));
    text.textContent = playing ? "Pause Event Video" : "Play Event Video";
    icon.textContent = playing ? "❚❚" : "▶";
  };

  toggle.addEventListener("click", () => {
    if (video.paused || video.ended) {
      video.play();
    } else {
      video.pause();
    }
  });

  video.addEventListener("play", sync);
  video.addEventListener("pause", sync);
  video.addEventListener("ended", sync);
  sync();
}
