document.addEventListener("DOMContentLoaded", () => {

  // -------------------- NAV MENU --------------------
  const navMenu = document.getElementById("nav-menu");
  const navToggle = document.getElementById("nav-toggle");
  const navClose = document.getElementById("nav-close");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => navMenu.classList.add("show-menu"));
  }

  const navLinks = document.querySelectorAll(".nav__link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu) navMenu.classList.remove("show-menu");
    });
  });

  // -------------------- SKILLS ACCORDION --------------------
  const skillsContent = document.getElementsByClassName("skills__content");
  const skillsHeader = document.querySelectorAll(".skills__header");

  skillsHeader.forEach((el) => {
    el.addEventListener("click", function () {
      for (let i = 0; i < skillsContent.length; i++) {
        skillsContent[i].className = "skills__content skills__close";
      }
      if (this.parentNode.className === "skills__content skills__close") {
        this.parentNode.className = "skills__content skills__open";
      }
    });
  });

  // -------------------- SERVICES MODAL --------------------
  const modalViews = document.querySelectorAll(".services__modal");
  const modalBtns = document.querySelectorAll(".services__button");
  const modalCloses = document.querySelectorAll(".services__modal-close");

  const openModal = (index) => {
    if (modalViews[index]) modalViews[index].classList.add("active-modal");
  };

  modalBtns.forEach((btn, i) => btn.addEventListener("click", () => openModal(i)));

  modalCloses.forEach((btn) => {
    btn.addEventListener("click", () => {
      modalViews.forEach((modal) => modal.classList.remove("active-modal"));
    });
  });

  // -------------------- PORTFOLIO SWIPER --------------------
  if (typeof Swiper !== "undefined") {
    new Swiper(".portfolio__container", {
      cssMode: true,
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  }

  // -------------------- SCROLL FUNCTIONS --------------------
  const sections = document.querySelectorAll("section[id]");
  const scrollUpEl = document.getElementById("scroll-up");
  const header = document.getElementById("header");

  function scrollActive() {
    const scrollY = window.pageYOffset;
    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 50;
      const sectionId = current.getAttribute("id");
      const link = document.querySelector(`.nav__menu a[href*="${sectionId}"]`);
      if (!link) return;
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        link.classList.add("active-link");
      } else {
        link.classList.remove("active-link");
      }
    });
  }

  function scrollHeader() {
    if (!header) return;
    if (window.scrollY >= 80) header.classList.add("scroll-header");
    else header.classList.remove("scroll-header");
  }

  function scrollUp() {
    if (!scrollUpEl) return;
    if (window.scrollY >= 560) scrollUpEl.classList.add("show-scroll");
    else scrollUpEl.classList.remove("show-scroll");
  }

  window.addEventListener("scroll", scrollActive);
  window.addEventListener("scroll", scrollHeader);
  window.addEventListener("scroll", scrollUp);

  // -------------------- DARK/LIGHT THEME --------------------
  const themeButton = document.getElementById("theme-button");
  const darkTheme = "dark-theme";
  const iconTheme = "uil-sun";

  if (themeButton) {
    const selectedTheme = localStorage.getItem("selected-theme");
    const selectedIcon = localStorage.getItem("selected-icon");

    if (selectedTheme) {
      document.body.classList[selectedTheme === "dark" ? "add" : "remove"](darkTheme);
      themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](iconTheme);
    }

    themeButton.addEventListener("click", () => {
      document.body.classList.toggle(darkTheme);
      themeButton.classList.toggle(iconTheme);
      localStorage.setItem("selected-theme", document.body.classList.contains(darkTheme) ? "dark" : "light");
      localStorage.setItem("selected-icon", themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun");
    });
  }

});
