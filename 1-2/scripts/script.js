const hamburger = document.querySelector(".hamburger-menu");
const mobileNav = document.getElementById("mobileNav");
const closeBtn = mobileNav.querySelector(".close-btn");
const backdrop = document.getElementById("mobileNavBackdrop");

function openMobileNav() {
  mobileNav.classList.add("open");
  backdrop.classList.add("active");
}

function closeMobileNav() {
  mobileNav.classList.remove("open");
  backdrop.classList.remove("active");
}

hamburger.addEventListener("click", openMobileNav);
closeBtn.addEventListener("click", closeMobileNav);
backdrop.addEventListener("click", closeMobileNav);

// Target elements
const headerElements = document.querySelectorAll(".second-div .header h2, .second-div .header p");
const infoElements = document.querySelectorAll(".second-div .info .info-cont");
const bgImage = document.querySelector(".second-div .background-img");

// Observer config: triggers when 40% visible
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.4
};

// Observer callback
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (entry.target.classList.contains("info-cont")) {
        entry.target.classList.add("slide-left");
      } else if (entry.target.classList.contains("background-img")) {
        entry.target.classList.add("slide-up-img");
      } else {
        entry.target.classList.add("slide-up");
      }
      observer.unobserve(entry.target); // Animate once
    }
  });
}, observerOptions);

// Attach observer
headerElements.forEach(el => observer.observe(el));
infoElements.forEach((el, index) => {
  el.style.transitionDelay = `${index * 0.1}s`; // Optional stagger
  observer.observe(el);
});
observer.observe(bgImage);
// Target elements
const thirdHeaderEls = document.querySelectorAll(".third-div .header h2, .third-div .header h1, .third-div .header p");
const thirdCertificateEls = document.querySelectorAll(".third-div .certificate img, .third-div .certificate .body h2, .third-div .certificate .body p");
const thirdBodyEls = document.querySelectorAll(".third-div .body .body-cont");
const thirdBgImg = document.querySelector(".third-div .background");

// Observer config
const thirdObserverOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.4 // 40% visible before triggering
};

const thirdObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Apply slide-up to header and certificate
      if (entry.target.classList.contains("body-cont")) {
        entry.target.classList.add("slide-left");
      } else if (entry.target.classList.contains("background")) {
        entry.target.classList.add("slide-up-img");
      } else {
        entry.target.classList.add("slide-up");
      }
      observer.unobserve(entry.target); // Animate once
    }
  });
}, thirdObserverOptions);

// Attach observer to header elements with stagger
thirdHeaderEls.forEach((el, index) => {
  el.style.transitionDelay = `${index * 0.15}s`;
  thirdObserver.observe(el);
});

// Attach observer to certificate elements with stagger
thirdCertificateEls.forEach((el, index) => {
  el.style.transitionDelay = `${(thirdHeaderEls.length * 0.15) + (index * 0.15)}s`;
  thirdObserver.observe(el);
});

// Attach observer to body-cont elements with stagger
thirdBodyEls.forEach((el, index) => {
  el.style.transitionDelay = `${((thirdHeaderEls.length + thirdCertificateEls.length) * 0.15) + (index * 0.15)}s`;
  thirdObserver.observe(el);
});

// Background image
if (thirdBgImg) {
  thirdObserver.observe(thirdBgImg);
}
// JavaScript: Trigger animations when elements scroll into view
document.addEventListener("DOMContentLoaded", function () {
  // Use IntersectionObserver with a threshold so elements animate once they are—say—half visible
  const observerOptions = {
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add the "in-view" class to trigger CSS transitions
        entry.target.classList.add("in-view");
        // Unobserve the element so the animation triggers only once
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe the header element first (it will slide up)
  const header = document.querySelector(".fourth-div .header");
  if (header) {
    observer.observe(header);
  }

  // Observe each body-cont element for image and text animations
  const bodyContElements = document.querySelectorAll(".fourth-div .body-cont");
  bodyContElements.forEach((element) => {
    observer.observe(element);
  });
});
