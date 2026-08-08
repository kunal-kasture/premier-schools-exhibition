// Swipeable slider + pagination dots for the choose-school grid.
// Desktop wraps the cards; mobile/tablet scrolls one card per swipe.
function initChooseSchoolSlider() {
  const grid = document.querySelector(".choose-school__grid");
  const dots = document.querySelectorAll(".choose-school__dot");
  if (!grid || !dots.length) return;
  const cards = grid.querySelectorAll(".choose-school__card");

  const step = () => {
    const card = cards[0];
    if (!card) return 0;
    const gap =
      parseFloat(getComputedStyle(grid).columnGap) ||
      parseFloat(getComputedStyle(grid).gap) ||
      16;
    return card.getBoundingClientRect().width + gap;
  };

  // Real snap stops: card i starts at i * step, clamped to the scrollable range.
  const positions = () => {
    const s = step();
    const maxScroll = grid.scrollWidth - grid.clientWidth;
    const stops = [];
    for (let i = 0; i < cards.length; i++) {
      stops.push(Math.min(i * s, maxScroll));
    }
    return stops;
  };

  const updateDots = () => {
    const stops = positions();
    const scroll = grid.scrollLeft;
    let index = 0;
    let best = Infinity;
    stops.forEach((stop, i) => {
      const dist = Math.abs(scroll - stop);
      if (dist < best) {
        best = dist;
        index = i;
      }
    });
    // Reaching the end of the scroll always highlights the last dot.
    if (stops.length && scroll >= stops[stops.length - 1] - 1) {
      index = stops.length - 1;
    }
    dots.forEach((dot, i) => {
      const active = i === index;
      dot.classList.toggle("choose-school__dot--active", active);
      if (active) {
        dot.setAttribute("aria-current", "true");
      } else {
        dot.removeAttribute("aria-current");
      }
    });
  };

  grid.addEventListener("scroll", updateDots, { passive: true });

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      const stops = positions();
      grid.scrollTo({ left: stops[i] ?? 0, behavior: "smooth" });
    });
  });

  window.addEventListener("resize", updateDots);
  updateDots();
}
