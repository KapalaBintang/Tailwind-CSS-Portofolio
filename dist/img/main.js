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

// ambil id humberger untuk menampilkan tombol
