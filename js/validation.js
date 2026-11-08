/* Form Validation & Registration Logic (login.html)*/
  

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("ticket-form");
  const avatarInput = document.getElementById("avatar");
  const avatarPreview = document.getElementById("avatar-preview");
  const dropzoneText = document.getElementById("dropzone-text");

  let uploadedAvatarUrl = ""; // Holds the image string

  // 1. Image Upload Preview (FileReader)
  avatarInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    const avatarError = document.getElementById("avatar-error");
    avatarError.textContent = "";

    if (file) {
      // file size check (500KB limit)
      if (file.size > 500 * 1024) {
        avatarError.textContent = "File size must be less than 500KB.";
        avatarInput.value = "";
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        uploadedAvatarUrl = event.target.result;
        avatarPreview.src = uploadedAvatarUrl;
        avatarPreview.hidden = false;
        dropzoneText.hidden = true;
      };
      reader.readAsDataURL(file);
    }
  });

  // 2. Form Submission & Validation
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Stop default form page reload

    // Get values
    const fullName = document.getElementById("full-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const github = document.getElementById("github").value.trim();

    // Clear previous error messages
    document.querySelectorAll(".error").forEach((el) => (el.textContent = ""));

    let isValid = true;

    // Validate Full Name
    if (!fullName) {
      document.getElementById("name-error").textContent = "Please enter your name.";
      isValid = false;
    }

    // Validate Email
    if (!email || !email.includes("@")) {
      document.getElementById("email-error").textContent = "Please enter a valid email address.";
      isValid = false;
    }

    // Validate GitHub Username
    if (!github) {
      document.getElementById("github-error").textContent = "Please enter your GitHub username.";
      isValid = false;
    }

    if (!isValid) return;

    // 3. Save the user Data to localStorage
    const ticketData = {
      fullName: fullName,
      email: email,
      github: github.startsWith("@") ? github : `@${github}`,
      avatar: uploadedAvatarUrl || "../assets/images/image-avatar.jpg",
      serialNumber: "#" + Math.floor(10000 + Math.random() * 90000) // Random ticket number
    };

    localStorage.setItem("ticketData", JSON.stringify(ticketData));

    // 4. Redirect to the ticket page
    window.location.href = "ticket.html";
  });
});