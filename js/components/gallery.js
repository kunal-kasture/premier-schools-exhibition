// Drag to scroll, touch swipes on its own.
function initGallery() {
  const track = document.querySelector(".gallery-track");
  if (!track) return;

  let isDown = false;
  let startX = 0;
  let startScroll = 0;

  track.addEventListener("pointerdown", (e) => {
    if (e.pointerType !== "mouse") return; // touch scrolls natively
    isDown = true;
    startX = e.clientX;
    startScroll = track.scrollLeft;
    track.classList.add("gallery-track--dragging");
  });

  track.addEventListener("pointermove", (e) => {
    if (!isDown) return;
    track.scrollLeft = startScroll - (e.clientX - startX);
  });

  const stop = () => {
    if (!isDown) return;
    isDown = false;
    track.classList.remove("gallery-track--dragging");
  };

  track.addEventListener("pointerup", stop);
  track.addEventListener("pointercancel", stop);
}
