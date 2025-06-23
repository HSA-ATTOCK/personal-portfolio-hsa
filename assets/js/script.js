// Scroll to top on page load
/*(function () {
  // Prevent scroll restoration on page reload
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  // Scroll to top immediately when page loads
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant", // or 'auto' if 'instant' isn't supported
    });
  };*/

/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }
};
showMenu("nav-toggle", "nav-menu");

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

const scrollActive = () => {
  const scrollDown = window.scrollY;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id"),
      sectionsClass = document.querySelector(
        ".nav__menu a[href*=" + sectionId + "]"
      );

    if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
      sectionsClass.classList.add("active-link");
    } else {
      sectionsClass.classList.remove("active-link");
    }
  });
};
window.addEventListener("scroll", scrollActive);

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2000,
  delay: 200,
  //     reset: true
});

sr.reveal(".home__data, .about__img, .skills__subtitle, .skills__text", {});
sr.reveal(".home__img, .about__subtitle, .about__text, .skills__img", {
  delay: 400,
});
sr.reveal(".home__social-icon", { interval: 200 });
sr.reveal(".skills__data, .work__img, .contact__input", { interval: 200 });

// for contact form submission and don't leave the page
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent default form behavior

  const form = e.target;
  const formData = new FormData(form);

  fetch("https://formsubmit.co/ajax/hsaattock@gmail.com", {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        document.getElementById("formMessage").style.display = "block";
        form.reset(); // Clear the form
      } else {
        alert("There was a problem submitting the form.");
      }
    })
    .catch((error) => {
      alert("Something went wrong.");
      console.error(error);
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const sliderTrack = document.querySelector(".work__slider-track");
  const prevBtn = document.querySelector(".work__nav--prev");
  const nextBtn = document.querySelector(".work__nav--next");
  const workItems = document.querySelectorAll(".work__img");
  const itemWidth = workItems[0].offsetWidth + 24; // width + gap
  let currentPosition = 0;
  const maxPosition = -(
    workItems.length * itemWidth -
    sliderTrack.parentElement.offsetWidth
  );

  function updateButtons() {
    // Show/hide prev button
    if (currentPosition >= 0) {
      prevBtn.classList.remove("visible");
    } else {
      prevBtn.classList.add("visible");
    }

    // Show/hide next button
    if (currentPosition <= maxPosition) {
      nextBtn.classList.remove("visible");
    } else {
      nextBtn.classList.add("visible");
    }
  }

  prevBtn.addEventListener("click", () => {
    currentPosition = Math.min(currentPosition + itemWidth * 1, 0);
    sliderTrack.style.transform = `translateX(${currentPosition}px)`;
    updateButtons();
  });

  nextBtn.addEventListener("click", () => {
    currentPosition = Math.max(currentPosition - itemWidth * 1, maxPosition);
    sliderTrack.style.transform = `translateX(${currentPosition}px)`;
    updateButtons();
  });

  // Initial check
  updateButtons();

  // Handle window resize
  window.addEventListener("resize", () => {
    const newMaxPosition = -(
      workItems.length * itemWidth -
      sliderTrack.parentElement.offsetWidth
    );
    currentPosition = Math.max(currentPosition, newMaxPosition);
    sliderTrack.style.transform = `translateX(${currentPosition}px)`;
    updateButtons();
  });
});
