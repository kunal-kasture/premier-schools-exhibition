// boot the widgets on DOM ready
// one broken init shouldn't kill the rest
document.addEventListener("DOMContentLoaded", () => {
  const inits = [
    "initStickyHeader",
    "initHeroSlider",
    "initSchoolSlider",
    "initEventVideo",
    "initChooseSchoolSlider",
    "initExhibitionSlider",
    "initVisitorsReview",
    "initGallery",
  ];
  inits.forEach((name) => {
    try {
      window[name]?.();
    } catch (err) {
      console.error(`[main] ${name} failed:`, err);
    }
  });
});
