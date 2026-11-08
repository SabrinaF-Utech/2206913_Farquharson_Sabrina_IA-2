/* Ticket.html */

document.addEventListener("DOMContentLoaded", () => {
  // Fetch saved registration data from local storage
  const savedData = localStorage.getItem("ticketData");

  // If no registration data exists, send user back to registration page
  if (!savedData) {
    window.location.href = "login.html";
    return;
  }

  const user = JSON.parse(savedData);

  // Populate dynamic ticket values into the DOM
  document.getElementById("ticket-name").textContent = user.fullName;
  document.getElementById("ticket-fullname").textContent = user.fullName;
  document.getElementById("ticket-email").textContent = user.email;
  document.getElementById("ticket-serial").textContent = user.serialNumber;

  // Populate GitHub Link
  const githubLink = document.getElementById("ticket-github");
  githubLink.textContent = user.github;
  githubLink.href = "https://github.com/SabrinaF-Utech/2206913_Farquharson_Sabrina_IA-2";

  // Populate Avatar Image
  if (user.avatar) {
    document.getElementById("ticket-avatar").src = user.avatar;
  }

  // Handle "Register another person" button reset
  const registerAnotherBtn = document.getElementById("register-another");
  if (registerAnotherBtn) {
    registerAnotherBtn.addEventListener("click", () => {
      localStorage.removeItem("ticketData");
      window.location.href = "login.html";
    });
  }
});