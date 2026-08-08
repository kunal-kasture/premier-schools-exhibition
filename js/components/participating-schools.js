document.addEventListener("DOMContentLoaded", function () {
  const slider = document.getElementById("school-slider");

  // This will print to your browser console so you know it's working!
  console.log("Slider found:", slider);

  if (!slider) return;

  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    slider.style.cursor = "grabbing"; // Changes cursor when clicked
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener("mouseleave", () => {
    isDown = false;
    slider.style.cursor = "grab";
  });

  slider.addEventListener("mouseup", () => {
    isDown = false;
    slider.style.cursor = "grab";
  });

  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault(); // Prevents default browser image dragging
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed
    slider.scrollLeft = scrollLeft - walk;
  });
});
