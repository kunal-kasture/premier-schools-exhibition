// Auto-playing hero slider: cycles through slides on a timer and supports
// prev/next buttons, a pause/play toggle, and touch swipes.
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".hero__slide");
  const slidesContainer = document.getElementById("hero-slides");
  // Controls are optional (guarded with ?.) so the slider still works
  // even when these buttons aren't in the markup.
  const prevBtn = document.querySelector(".hero__btn--prev");
  const nextBtn = document.querySelector(".hero__btn--next");
  const pauseBtn = document.querySelector(".hero__btn--pause");
  const heroSlider = document.getElementById("hero-slider");

  let currentSlide = 0;
  let isPlaying = true;
  let slideInterval = null;

  // Moves to the requested slide and keeps active/aria state in sync
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

  // Starts the slideshow advancing every 5 seconds
  function startAutoPlay() {
    if (!slideInterval) {
      slideInterval = setInterval(nextSlide, 5000);
    }
  }

  // Stops the timer, keeping the current slide visible
  function stopAutoPlay() {
    clearInterval(slideInterval);
    slideInterval = null;
  }

  // Pause/play button toggle, updating its aria state and icon
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

  // Manual navigation restarts the auto-play timer
  prevBtn?.addEventListener("click", () => {
    prevSlide();
    if (isPlaying) startAutoPlay();
  });

  nextBtn?.addEventListener("click", () => {
    nextSlide();
    if (isPlaying) startAutoPlay();
  });

  // Pause while hovering or focusing the slider, resume afterwards
  heroSlider?.addEventListener("mouseenter", stopAutoPlay);
  heroSlider?.addEventListener("mouseleave", () => {
    if (isPlaying) startAutoPlay();
  });
  heroSlider?.addEventListener("focusin", stopAutoPlay);
  heroSlider?.addEventListener("focusout", () => {
    if (isPlaying) startAutoPlay();
  });

  // Swipe left/right on touch devices to change slides
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
});
