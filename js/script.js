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

// Heart Icon Toggle Color (Product Page Card)
// const podHeart = document.getElementById("pod-heart");

// podHeart.addEventListener("click", () => {
//   if (podHeart.classList.contains("fa-regular")) {
//     podHeart.classList.remove("fa-regular");
//     podHeart.classList.add("fa-solid", "liked");
//   } else {
//     podHeart.classList.remove("fa-solid", "liked");
//     podHeart.classList.add("fa-regular");
//   }
// });

// Toggle Heart + Toastify Popup (Our Product Section)
document.addEventListener("click", (e) => {
  const heartBtn = e.target.closest(".prod-heart");
  const bagBtn = e.target.closest(".mini-bag");

  if (heartBtn) {
    const liked = heartBtn.classList.toggle("liked");
    heartBtn.setAttribute("aria-pressed", liked ? "true" : "false");

    Toastify({
      text: liked ? "Added to wishlist" : "Removed from wishlist",
      duration: 2500,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: liked
          ? "linear-gradient(to right, #00cc22ff, #00cf15ff)"
          : "linear-gradient(to right, #d80000ff, #e50000ff)",
        color: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      },
    }).showToast();
  }

  if (bagBtn) {
    Toastify({
      text: "Item added to cart",
      duration: 2500,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to right, #00cc22ff, #00cf15ff)",
        color: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      },
    }).showToast();
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

// jQuery (Our Product Scetion)
function initProductsSlider() {
  const $slider = $(".autoplay");
  if (!$slider.hasClass("slick-initialized")) {
    $slider.slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 2000,
      prevArrow: $(".left_btn"),
      nextArrow: $(".right_btn"),
      responsive: [
        { breakpoint: 1200, settings: { slidesToShow: 3 } },
        { breakpoint: 992, settings: { slidesToShow: 3 } },
        { breakpoint: 860, settings: { slidesToShow: 2 } },
        { breakpoint: 768, settings: { slidesToShow: 2 } },
        { breakpoint: 576, settings: { slidesToShow: 1 } },
      ],
    });
  } else {
    $slider.slick("setPosition");
  }
}
$(function () {
  $(window).on("load", initProductsSlider);
});

// jQuery (Beauty Journal Scetion)
function initJournalSlider() {
  const $slider = $(".autoplay-jrnl");
  if (!$slider.hasClass("slick-initialized")) {
    $slider.slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 2000,
      prevArrow: $(".left_btn_jrnl"),
      nextArrow: $(".right_btn_jrnl"),
      responsive: [
        { breakpoint: 1200, settings: { slidesToShow: 3 } },
        { breakpoint: 992, settings: { slidesToShow: 3 } },
        { breakpoint: 860, settings: { slidesToShow: 2 } },
        { breakpoint: 768, settings: { slidesToShow: 2 } },
        { breakpoint: 576, settings: { slidesToShow: 1 } },
      ],
    });
  } else {
    $slider.slick("setPosition");
  }
}
$(function () {
  $(window).on("load", initJournalSlider);
});

// Toggle Heart (Our Product Section) (jQuery)
$(document).on("click", ".prod-heart", function (e) {
  e.preventDefault();
  const $btn = $(this);
  const $icon = $btn.find("i");
  const pressed = $btn.attr("aria-pressed") === "true";
  $btn.attr("aria-pressed", !pressed);

  $icon.toggleClass("liked");

  $icon.toggleClass("fa-regular fa-solid");
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

// GSAP
// Cursor + Sparkle
gsap.set(".flair", { xPercent: -50, yPercent: -50 });

let xTo = gsap.quickTo(".flair", "x", { duration: 0.6, ease: "power3" }),
  yTo = gsap.quickTo(".flair", "y", { duration: 0.6, ease: "power3" });

const flairEl = document.querySelector(".flair");
const rootStyles = getComputedStyle(document.documentElement);
const secondaryColor = rootStyles
  .getPropertyValue("--secondary-text-color")
  .trim();

function getBackgroundColorAtPoint(x, y) {
  let el = document.elementFromPoint(x, y);

  while (el && el !== document.documentElement) {
    const bg = getComputedStyle(el).backgroundColor;
    if (bg && !bg.includes("0, 0, 0, 0")) {
      return bg;
    }

    el = el.parentElement;
  }
  return (
    getComputedStyle(document.body).backgroundColor || "rgb(255, 255, 255)"
  );
}

function isAlmostWhite(rgbString) {
  const match = rgbString.match(/(\d+),\s*(\d+),\s*(\d+)/);
  if (!match) return false;

  const [r, g, b] = match.slice(1).map(Number);
  const threshold = 240;

  return r >= threshold && g >= threshold && b >= threshold;
}

window.addEventListener("mousemove", (e) => {
  xTo(e.clientX);
  yTo(e.clientY);

  const bg = getBackgroundColorAtPoint(e.clientX, e.clientY);

  if (isAlmostWhite(bg)) {
    flairEl.style.backgroundColor = secondaryColor;
  } else {
    flairEl.style.backgroundColor = "#ffffff";
  }
});

// Sparkle
function createSparkle(x, y, isLightBackground) {
  const sparkle = document.createElement("div");
  sparkle.classList.add("sparkle");

  if (isLightBackground) {
    sparkle.classList.add("sparkle-gold");
  } else {
    sparkle.classList.add("sparkle-white");
  }

  sparkle.style.left = `${x}px`;
  sparkle.style.top = `${y}px`;

  document.body.appendChild(sparkle);

  const angle = Math.random() * Math.PI * 2;
  const distance = 40 + Math.random() * 20;

  gsap.to(sparkle, {
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance,
    opacity: 0,
    scale: 0,
    duration: 0.6,
    ease: "power2.out",
    onComplete: () => sparkle.remove(),
  });
}

window.addEventListener("click", (e) => {
  const bg = getBackgroundColorAtPoint(e.clientX, e.clientY);
  const isLightBg = isAlmostWhite(bg);

  for (let i = 0; i < 12; i++) {
    createSparkle(e.clientX, e.clientY, isLightBg);
  }
});

// AOS Animation
AOS.init({
  duration: 700,
  once: false,
  easing: "ease-out-cubic",
  offset: 120,
});

// Animated Paragraphs
document.addEventListener("DOMContentLoaded", () => {
  const animatedTexts = document.querySelectorAll(".animated-text");

  animatedTexts.forEach((el) => {
    const text = el.textContent;
    el.textContent = "";

    const chars = text.split("");

    chars.forEach((char) => {
      const span = document.createElement("span");
      span.textContent = char;
      el.appendChild(span);
    });

    const spans = el.querySelectorAll("span");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              spans,
              { opacity: 0, y: 6 },
              {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.015,
                ease: "power2.out",
              }
            );
          } else {
            gsap.set(spans, { opacity: 0, y: 10 });
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
  });
});

// Specific Animated paragraph (Only for index)
document.addEventListener("DOMContentLoaded", () => {
  const el = document.querySelector(".luxury-animated-text");
  if (!el) return;

  const text = el.textContent.trim();
  el.textContent = "";

  [...text].forEach((char) => {
    const span = document.createElement("span");
    span.textContent = char;
    el.appendChild(span);
  });

  const spans = el.querySelectorAll("span");

  gsap.set(spans, { opacity: 0, y: 6 });

  const tl = gsap.timeline({
    repeat: -1,
    repeatDelay: 0.7,
  });

  tl.to(spans, {
    opacity: 1,
    y: 0,
    duration: 1,
    stagger: 0.025,
    ease: "power2.out",
  });
});

// Loader
document.addEventListener("DOMContentLoaded", () => {
  const loader = document.querySelector(".luxshop-loader");

  if (!loader) return;

  const alreadyShown = sessionStorage.getItem("luxshopIntroShown");

  if (alreadyShown === "true") {
    loader.classList.add("luxshop-loader--hide-immediate");
    document.body.classList.remove("luxshop-loader-active");
    return;
  }

  document.body.classList.add("luxshop-loader-active");
  sessionStorage.setItem("luxshopIntroShown", "true");

  setTimeout(() => {
    loader.classList.add("luxshop-loader--hide");
    document.body.classList.remove("luxshop-loader-active");
  }, 1400);
});

