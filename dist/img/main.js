// ambil id humberger untuk menampilkan tombol

window.onscroll = function () {
  const header = document.querySelector("header");
  const fixedNav = header.offsetTop;
  if (window.pageYOffset > fixedNav) {
    header.classList.add("navbar-fixed");
  } else {
    header.classList.remove("navbar-fixed");
  }
};

const hamburger = document.getElementById("hamburger");
const hamburgerList = document.getElementById("hamburger-list");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("hamburger-active");
  hamburgerList.classList.toggle("hidden");
});

// SMTPJS API

const form = document.getElementsByClassName("form-contact")[0];

function sendEmail() {
  Email.send({
    SecureToken: "4614b777-7ff7-4136-9129-2b673fbf285a",
    To: "bintangkapala@gmail.com",
    From: "bintangkapala@gmail.com",
    Subject: "This is the subject",
    Body: `Name: ${document.getElementById("name").value} <br> Email: ${document.getElementById("email").value} <br> Message: ${document.getElementById("message").value}`,
  }).then((message) => {
    if (message == "OK") {
      Swal.fire({
        title: "Good job!",
        text: "Successfully sent the message!",
        icon: "success",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("clicked");

  sendEmail();
});
