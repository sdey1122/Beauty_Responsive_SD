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
          ? "linear-gradient(to right, #00c922ff, #00eb18ff)"
          : "linear-gradient(to right, #d80000ff, #ff1c1cff)",
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
        background: "linear-gradient(to right, #00c922ff, #00eb18ff)",
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
