// snap slider + dots; autoplay pauses on hover/hidden/reduced-motion/pause
function initExhibitionSlider() {
  const track = document.querySelector(".exhibition__track");
  const dots = document.querySelectorAll(".exhibition__dot");
  const pauseBtn = document.querySelector(".exhibition__pause-btn");
  if (!track || !dots.length) return;
  const cards = track.querySelectorAll(".exhibition__card");
  if (!cards.length) return;

  const step = () => {
    const card = cards[0];
    if (!card) return 0;
    const gap =
      parseFloat(getComputedStyle(track).columnGap) ||
      parseFloat(getComputedStyle(track).gap) ||
      30;
    return card.getBoundingClientRect().width + gap;
  };

  // snap: card i at i*step, clamped to the scrollable range
  // (dedupe stops so cards that can't align to start share one stop)
  const positions = () => {
    const s = step();
    const maxScroll = track.scrollWidth - track.clientWidth;
    const stops = [];
    for (let i = 0; i < cards.length; i++) {
      const stop = Math.min(i * s, maxScroll);
      if (stops[stops.length - 1] !== stop) stops.push(stop);
    }
    return stops;
  };

  const currentIndex = () => {
    const stops = positions();
    const scroll = track.scrollLeft;
    let index = 0;
    let best = Infinity;
    stops.forEach((stop, i) => {
      const dist = Math.abs(scroll - stop);
      if (dist < best) {
        best = dist;
        index = i;
      }
    });
    if (stops.length && scroll >= stops[stops.length - 1] - 1) {
      index = stops.length - 1;
    }
    return index;
  };

  const updateDots = () => {
    const index = currentIndex();
    dots.forEach((dot, i) => {
      const active = i === index;
      dot.classList.toggle("exhibition__dot--active", active);
      if (active) {
        dot.setAttribute("aria-current", "true");
      } else {
        dot.removeAttribute("aria-current");
      }
    });
  };

  const goTo = (i) => {
    const stops = positions();
    track.scrollTo({
      left: stops[i] ?? 0,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  // hide dots that don't map to a real snap stop (fewer stops on wide screens)
  const syncDots = () => {
    const count = positions().length;
    dots.forEach((dot, i) => {
      dot.style.display = i < count ? "" : "none";
    });
  };

  const prevBtn = document.querySelector(".exhibition__arrow--prev");
  const nextBtn = document.querySelector(".exhibition__arrow--next");
  const stepBy = (delta) => {
    const stops = positions();
    const next = (currentIndex() + delta + stops.length) % stops.length;
    goTo(next);
  };
  prevBtn?.addEventListener("click", () => stepBy(-1));
  nextBtn?.addEventListener("click", () => stepBy(1));

  let reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  let timer = null;

  const isPaused = () =>
    reducedMotion || pauseBtn?.getAttribute("aria-pressed") === "true";

  const start = () => {
    if (isPaused() || timer) return;
    timer = setInterval(() => {
      const stops = positions();
      const next = (currentIndex() + 1) % stops.length;
      goTo(next);
    }, 4000);
  };

  const stop = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  };

  track.addEventListener("scroll", updateDots, { passive: true });
  track.addEventListener("mouseenter", stop);
  track.addEventListener("mouseleave", start);
  track.addEventListener("focusin", stop);
  track.addEventListener("focusout", start);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stop();
    } else {
      start();
    }
  });
  window
    .matchMedia("(prefers-reduced-motion: reduce)")
    .addEventListener?.("change", (e) => {
      reducedMotion = e.matches;
      if (isPaused()) stop();
      else start();
    });

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => goTo(i));
  });

  pauseBtn?.addEventListener("click", () => {
    const paused = pauseBtn.getAttribute("aria-pressed") === "true";
    pauseBtn.setAttribute("aria-pressed", String(!paused));
    pauseBtn.textContent = paused ? "Pause" : "Play";
    if (paused) start();
    else stop();
  });

  window.addEventListener("resize", () => {
    syncDots();
    updateDots();
  });
  syncDots();
  updateDots();
  start();
}
