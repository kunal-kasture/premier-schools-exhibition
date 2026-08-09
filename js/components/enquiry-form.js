// client-side submit placeholder (no backend yet)
function initEnquiryForm() {
  const form = document.querySelector(".enquiry-form");
  const success = form?.querySelector(".hero__form-success");
  if (!form || !success) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    form.reset();
    success.hidden = false;
    setTimeout(() => {
      success.hidden = true;
    }, 6000);
  });
}
