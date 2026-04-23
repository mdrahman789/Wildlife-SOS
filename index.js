document.addEventListener("DOMContentLoaded", () => {
  const themeBtn = document.getElementById("toggle-theme");
  const rsvpButton = document.getElementById("rsvp-button");

  // Dark Mode Toggle: adds or removes the dark-mode class from body
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });

  // Variables for animating the modal image
  let rotateFactor = 0;
  const modalImage = document.getElementById("modal-image");

  // Function to rotate the modal image back and forth
  const animateImage = () => {
    rotateFactor = rotateFactor === 0 ? -10 : 0;
    modalImage.style.transform = `rotate(${rotateFactor}deg)`;
  };

  // Function to show the modal after a successful RSVP
  const toggleModal = (person) => {
    const modal = document.getElementById("success-modal");
    const modalText = document.getElementById("modal-text");

    // Display the modal and update the text with user's info
    modal.style.display = "flex";
    modalText.textContent = `Thank you, ${person.name}! We can't wait to see you from ${person.state}.`;

    // Start the image animation
    let intervalId = setInterval(animateImage, 500);

    // Hide the modal and stop animation after 5 seconds
    setTimeout(() => {
      modal.style.display = "none";
      clearInterval(intervalId);
    }, 5000);
  };

  // Function to add a new participant to the RSVP list
  const addParticipant = (person) => {
    const newP = document.createElement("p");
    newP.textContent = `${person.name} from ${person.state} has RSVP'd.`;
    document.getElementById("rsvp-list").appendChild(newP);
  };

  // Function to validate the form inputs
  const validateForm = () => {
    let containsErrors = false;
    const inputs = document.getElementById("rsvp-form").elements;

    // Create an object for the person's information
    const person = {
      name: document.getElementById("name").value.trim(),
      state: document.getElementById("state").value.trim(),
      email: document.getElementById("email").value.trim()
    };

    // Loop through inputs to check if any are too short
    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];
      input.classList.remove("error");

      if (input.value.trim().length < 2) {
        input.classList.add("error");
        containsErrors = true;
      }
    }

    // If no errors, add participant, show modal, and clear form
    if (!containsErrors) {
      addParticipant(person);
      toggleModal(person);

      for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
      }
    }
  };

  // Listen for RSVP button click to validate and submit form
  rsvpButton.addEventListener("click", (event) => {
    event.preventDefault();
    validateForm();
  });
});
