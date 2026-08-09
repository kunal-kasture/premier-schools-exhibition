// auto-playing hero slider
function initHeroSlider() {
  const slides = document.querySelectorAll(".hero__slide");
  const slidesContainer = document.getElementById("hero-slides");
  // buttons are optional - guard
  const prevBtn = document.querySelector(".hero__btn--prev");
  const nextBtn = document.querySelector(".hero__btn--next");
  const pauseBtn = document.querySelector(".hero__btn--pause");
  const heroSlider = document.getElementById("hero-slider");

  let currentSlide = 0;
  let reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  let isPlaying = !reduceMotion;
  let slideInterval = null;

  // go to slide i, keep aria in sync
  function updateSlide(index) {
    currentSlide = (index + slides.length) % slides.length;
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;

    slides.forEach((slide, idx) => {
      slide.classList.toggle("is-active", idx === currentSlide);
      slide.setAttribute("aria-hidden", idx !== currentSlide);
    });
  }

  function nextSlide() {
    updateSlide(currentSlide + 1);
  }

  function prevSlide() {
    updateSlide(currentSlide - 1);
  }

  // auto-advance every 5s (unless reduced motion)
  function startAutoPlay() {
    if (reduceMotion) return;
    if (!slideInterval) {
      slideInterval = setInterval(nextSlide, 5000);
    }
  }

  function stopAutoPlay() {
    clearInterval(slideInterval);
    slideInterval = null;
  }

  // pause/play toggle + aria
  pauseBtn?.addEventListener("click", () => {
    if (isPlaying) {
      stopAutoPlay();
      pauseBtn.setAttribute("aria-pressed", "true");
      pauseBtn.setAttribute("aria-label", "Play slideshow");
      pauseBtn.textContent = "▶";
    } else {
      startAutoPlay();
      pauseBtn.setAttribute("aria-pressed", "false");
      pauseBtn.setAttribute("aria-label", "Pause slideshow");
      pauseBtn.textContent = "⏸";
    }
    isPlaying = !isPlaying;
  });

  // manual nav resets the timer
  prevBtn?.addEventListener("click", () => {
    prevSlide();
    if (isPlaying) startAutoPlay();
  });

  nextBtn?.addEventListener("click", () => {
    nextSlide();
    if (isPlaying) startAutoPlay();
  });

  // arrow keys for keyboard users
  heroSlider?.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevSlide();
      if (isPlaying) startAutoPlay();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      nextSlide();
      if (isPlaying) startAutoPlay();
    }
  });

  // pause on hover/focus
  heroSlider?.addEventListener("mouseenter", stopAutoPlay);
  heroSlider?.addEventListener("mouseleave", () => {
    if (isPlaying) startAutoPlay();
  });
  heroSlider?.addEventListener("focusin", stopAutoPlay);
  heroSlider?.addEventListener("focusout", () => {
    if (isPlaying) startAutoPlay();
  });

  // touch swipe
  let startX = 0;
  heroSlider?.addEventListener(
    "touchstart",
    (e) => {
      startX = e.touches[0].clientX;
    },
    { passive: true },
  );

  heroSlider?.addEventListener(
    "touchend",
    (e) => {
      const endX = e.changedTouches[0].clientX;
      if (startX - endX > 50) nextSlide();
      if (endX - startX > 50) prevSlide();
    },
    { passive: true },
  );

  startAutoPlay();
  if (reduceMotion) {
    pauseBtn?.setAttribute("aria-pressed", "true");
    pauseBtn?.setAttribute("aria-label", "Play slideshow");
    if (pauseBtn) pauseBtn.textContent = "▶";
  }

  // keep in sync if the reduced-motion preference changes at runtime
  window
    .matchMedia("(prefers-reduced-motion: reduce)")
    .addEventListener?.("change", (e) => {
      reduceMotion = e.matches;
      if (reduceMotion) {
        stopAutoPlay();
        isPlaying = false;
        pauseBtn?.setAttribute("aria-pressed", "true");
        pauseBtn?.setAttribute("aria-label", "Play slideshow");
        if (pauseBtn) pauseBtn.textContent = "▶";
      } else {
        isPlaying = true;
        startAutoPlay();
        pauseBtn?.setAttribute("aria-pressed", "false");
        pauseBtn?.setAttribute("aria-label", "Pause slideshow");
        if (pauseBtn) pauseBtn.textContent = "⏸";
      }
    });
}
