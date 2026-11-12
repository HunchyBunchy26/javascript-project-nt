const contactForm = document.getElementById("contact-form");
const formFeedback = document.getElementById("form-feedback");

contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    console.log("Contact form submitted!");

});