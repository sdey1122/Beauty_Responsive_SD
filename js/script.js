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
const podHeart = document.getElementById("pod-heart");

podHeart.addEventListener("click", () => {
  if (podHeart.classList.contains("fa-regular")) {
    podHeart.classList.remove("fa-regular");
    podHeart.classList.add("fa-solid", "liked");
  } else {
    podHeart.classList.remove("fa-solid", "liked");
    podHeart.classList.add("fa-regular");
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
      autoplaySpeed: 3000,
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
