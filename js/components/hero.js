// Auto-playing hero slider with arrow-key, touch, and pause support.
function initHeroSlider() {
  const slides = document.querySelectorAll(".hero__slide");
  const slidesContainer = document.getElementById("hero-slides");
  // Controls are optional, so guard against missing buttons.
  const prevBtn = document.querySelector(".hero__btn--prev");
  const nextBtn = document.querySelector(".hero__btn--next");
  const pauseBtn = document.querySelector(".hero__btn--pause");
  const heroSlider = document.getElementById("hero-slider");

  let currentSlide = 0;
  let isPlaying = true;
  let slideInterval = null;

  // Move to a slide and keep active/aria state in sync
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

  // Start auto-advancing every 5s
  function startAutoPlay() {
    if (!slideInterval) {
      slideInterval = setInterval(nextSlide, 5000);
    }
  }

  function stopAutoPlay() {
    clearInterval(slideInterval);
    slideInterval = null;
  }

  // Pause/play toggle, keeping aria state updated
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

  // Manual nav restarts the auto-play timer
  prevBtn?.addEventListener("click", () => {
    prevSlide();
    if (isPlaying) startAutoPlay();
  });

  nextBtn?.addEventListener("click", () => {
    nextSlide();
    if (isPlaying) startAutoPlay();
  });

  // Arrow keys navigate slides for keyboard users
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

  // Pause while hovered/focused, resume after
  heroSlider?.addEventListener("mouseenter", stopAutoPlay);
  heroSlider?.addEventListener("mouseleave", () => {
    if (isPlaying) startAutoPlay();
  });
  heroSlider?.addEventListener("focusin", stopAutoPlay);
  heroSlider?.addEventListener("focusout", () => {
    if (isPlaying) startAutoPlay();
  });

  // Swipe support for touch
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
}
