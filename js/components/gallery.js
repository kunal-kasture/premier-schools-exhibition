// Drag to scroll, touch swipes on its own.
function initGallery() {
  const track = document.querySelector(".gallery__track");
  if (!track) return;

  let isDown = false;
  let startX = 0;
  let startScroll = 0;

  track.addEventListener("pointerdown", (e) => {
    if (e.pointerType !== "mouse") return; // touch scrolls natively
    isDown = true;
    startX = e.clientX;
    startScroll = track.scrollLeft;
    track.classList.add("gallery__track--dragging");
  });

  track.addEventListener("pointermove", (e) => {
    if (!isDown) return;
    track.scrollLeft = startScroll - (e.clientX - startX);
  });

  const stop = () => {
    if (!isDown) return;
    isDown = false;
    track.classList.remove("gallery__track--dragging");
  };

  track.addEventListener("pointerup", stop);
  track.addEventListener("pointercancel", stop);

  // Auto-scroll back and forth on mobile only
  if (!window.matchMedia("(max-width: 48rem)").matches) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let raf = 0;
  let dir = 1;
  let paused = false;
  let resumeTimer = null;

  const step = () => {
    if (!paused && track.scrollWidth > track.clientWidth) {
      track.scrollLeft += dir * 0.7;
      if (track.scrollLeft >= track.scrollWidth - track.clientWidth) dir = -1;
      if (track.scrollLeft <= 0) dir = 1;
    }
    raf = requestAnimationFrame(step);
  };

  const pause = () => {
    paused = true;
    clearTimeout(resumeTimer);
  };

  const resume = () => {
    clearTimeout(resumeTimer);
    resumeTimer = setTimeout(() => {
      paused = false;
    }, 2000);
  };

  track.addEventListener("pointerdown", pause);
  track.addEventListener("pointermove", () => {
    if (isDown) pause();
  });
  track.addEventListener("pointerup", resume);
  track.addEventListener("pointercancel", resume);
  track.addEventListener("mouseenter", pause);
  track.addEventListener("mouseleave", resume);
  track.addEventListener("touchstart", pause, { passive: true });
  track.addEventListener("touchend", resume, { passive: true });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(raf);
      raf = 0;
    } else if (!raf) {
      raf = requestAnimationFrame(step);
    }
  });

  raf = requestAnimationFrame(step);
}
