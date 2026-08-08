// Toggle a "scrolled" class on the header past a small scroll threshold.
function initStickyHeader() {
  const header = document.getElementById("header");

  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 40) {
        header.classList.add("header--scrolled");
      } else {
        header.classList.remove("header--scrolled");
      }
    });
  }
}
