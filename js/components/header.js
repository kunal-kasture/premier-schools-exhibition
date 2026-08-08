// Toggles a "scrolled" state class on the header once the page has been
// scrolled past a small threshold, ready for any scrolled styling.
document.addEventListener("DOMContentLoaded", () => {
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
});
