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

  const updateDots = () => {
    const s = step();
    const index = s > 0 ? Math.round(grid.scrollLeft / s) : 0;
    dots.forEach((dot, i) => {
      const active = i === Math.max(0, Math.min(index, dots.length - 1));
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
      grid.scrollTo({ left: i * step(), behavior: "smooth" });
    });
  });

  window.addEventListener("resize", updateDots);
  updateDots();
}
