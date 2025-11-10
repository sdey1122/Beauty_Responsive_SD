// Search Input
const searchInput = document.querySelector(".search-input");
const searchWrap = document.querySelector(".search-wrap");

searchInput.addEventListener("focus", () => {
  searchWrap.classList.add("active");
});
searchInput.addEventListener("blur", () => {
  if (searchInput.value.trim() === "") {
    searchWrap.classList.remove("active");
  }
});

// Heart Icon Toggle Color
const heartIcon = document.getElementById("heartIcon");

heartIcon.addEventListener("click", () => {
  if (heartIcon.classList.contains("fa-regular")) {
    heartIcon.classList.remove("fa-regular");
    heartIcon.classList.add("fa-solid", "liked");
  } else {
    heartIcon.classList.remove("fa-solid", "liked");
    heartIcon.classList.add("fa-regular");
  }
});

// Active Page
const currentPage = window.location.pathname.split("/").pop();
const navLinks = document.querySelectorAll(".hover-link");

navLinks.forEach((link) => {
  const linkPage = link.getAttribute("href").split("/").pop();

  if (linkPage === currentPage) {
    link.classList.add("active");
  } else {
    link.classList.remove("active");
  }
});

// Contact Us Validation
(function () {
  const form = document.getElementById("contactForm");
  const nameEl = document.getElementById("name");
  const mailEl = document.getElementById("email");
  const msgEl = document.getElementById("message");
  const btn = document.getElementById("submitBtn");

  const emailOK = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v || "");
  const trim = (v) => (v || "").trim();

  let loadingTimer;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    [nameEl, mailEl, msgEl].forEach((i) => i.setCustomValidity(""));

    if (trim(nameEl.value).length < 2) {
      nameEl.setCustomValidity("Please enter your full name.");
    }
    if (!emailOK(trim(mailEl.value))) {
      mailEl.setCustomValidity("Please enter a valid email.");
    }
    if (trim(msgEl.value).length < 10) {
      msgEl.setCustomValidity("Message should be at least 10 characters.");
    }

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    if (btn.classList.contains("is-loading")) return;

    btn.classList.add("is-loading");
    btn.setAttribute("aria-disabled", "true");

    loadingTimer = setTimeout(() => {
      const modal = new bootstrap.Modal(
        document.getElementById("thankYouModal")
      );
      modal.show();

      form.reset();
      form.classList.remove("was-validated");

      setTimeout(() => {
        btn.classList.remove("is-loading");
        btn.removeAttribute("aria-disabled");
      }, 300);
    }, 1700);
  });

  window.addEventListener("beforeunload", () => clearTimeout(loadingTimer));
})();

// Contact Us MAP FancyBox
const MAP_DEFAULT =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8915.056928213513!2d10.1888!3d56.1572!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464c3f8f81b2c5a1%3A0x656bbd0457f0c6a4!2sTage-Hansens%20Gade%2035%2C%208000%20Aarhus!5e0!3m2!1sen!2sin!4v1731257300000!5m2!1sen!2sin";

const MAP_SAT =
  "https://www.google.com/maps?hl=en&q=Tage-Hansens%20Gade%2035%2C%208000%20Aarhus&layer=c&cbll=56.1572,10.1888&cbp=12,0,0,0,0&output=embed";

const frame = document.getElementById("gmapFrame");
const buttons = document.querySelectorAll(".toggle-style");

buttons.forEach((b) => b.classList.remove("active"));
document
  .querySelector('.toggle-style[data-style="default"]')
  .classList.add("active");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const style = btn.getAttribute("data-style");
    frame.src = style === "sat" ? MAP_SAT : MAP_DEFAULT;

    buttons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

// Scroll Lock While Offcanvas is opened
document.addEventListener("DOMContentLoaded", () => {
  const oc = document.getElementById("offcanvasNavbar");
  if (!oc) return;

  let savedScrollY = 0;

  function lockBody() {
    savedScrollY = window.scrollY || document.documentElement.scrollTop;

    const sb = window.innerWidth - document.documentElement.clientWidth;
    if (sb > 0) document.body.style.paddingRight = sb + "px";

    document.body.style.position = "fixed";
    document.body.style.top = `-${savedScrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
  }

  function unlockBody() {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    document.body.style.paddingRight = "";
    window.scrollTo(0, savedScrollY);
  }

  oc.addEventListener("show.bs.offcanvas", lockBody);
  oc.addEventListener("hidden.bs.offcanvas", unlockBody);
});
