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

// Counter
(() => {
  const DUR_TO_999 = 5000;
  const DUR_TO_K = 5000;
  const STEP_MS = 28;
  const IO_THRESHOLD = 0.25;

  const itemTimers = new WeakMap();

  function initCounters() {
    const section = document.querySelector(".counter-section");
    const items = Array.from(document.querySelectorAll(".counter-item"));
    if (!section || items.length === 0) return;

    const resetItem = (item) => {
      const t = itemTimers.get(item);
      if (t) {
        t.forEach((id) => clearInterval(id));
        itemTimers.delete(item);
      }
      const valueEl = item.querySelector(".counter-value");
      const unitEl = item.querySelector(".counter-unit");
      if (valueEl) valueEl.textContent = "0";
      if (unitEl) unitEl.style.visibility = "hidden";
    };

    const animateItem = (item) => {
      resetItem(item);
      const valueEl = item.querySelector(".counter-value");
      const unitEl = item.querySelector(".counter-unit");
      if (!valueEl || !unitEl) return;

      const targetK = Math.max(1, Number(valueEl.dataset.target || 1));

      const timers = [];

      let cur1 = 0;
      const steps1 = Math.max(1, Math.ceil(DUR_TO_999 / STEP_MS));
      const inc1 = 999 / steps1;

      valueEl.textContent = "0";
      unitEl.style.visibility = "hidden";

      const id1 = setInterval(() => {
        cur1 += inc1;
        if (cur1 >= 999) {
          valueEl.textContent = "999";
          clearInterval(id1);

          setTimeout(() => {
            let cur2 = 1;
            const steps2 = Math.max(1, Math.ceil(DUR_TO_K / STEP_MS));
            const inc2 = Math.max((targetK - 1) / steps2, 0.1);

            unitEl.style.visibility = "visible";
            valueEl.textContent = "1";

            const id2 = setInterval(() => {
              cur2 += inc2;
              if (cur2 >= targetK) {
                valueEl.textContent = String(targetK);
                clearInterval(id2);
              } else {
                valueEl.textContent = String(Math.floor(cur2));
              }
            }, STEP_MS);

            const arr = itemTimers.get(item) || [];
            arr.push(id2);
            itemTimers.set(item, arr);
          }, STEP_MS * 2);
        } else {
          valueEl.textContent = String(Math.floor(cur1));
        }
      }, STEP_MS);

      timers.push(id1);
      itemTimers.set(item, timers);
    };

    const onEnter = () => items.forEach(animateItem);
    const onExit = () => items.forEach(resetItem);

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => (e.isIntersecting ? onEnter() : onExit()));
        },
        { threshold: IO_THRESHOLD }
      );
      io.observe(section);
    } else {
      const check = () => {
        const r = section.getBoundingClientRect();
        const inView =
          r.top < innerHeight * 0.85 && r.bottom > innerHeight * 0.15;
        inView ? onEnter() : onExit();
      };
      addEventListener("scroll", check, { passive: true });
      addEventListener("resize", check);
      check();
    }

    items.forEach(resetItem);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCounters, { once: true });
  } else {
    initCounters();
  }

  window.AboutPage = Object.assign(window.AboutPage || {}, { initCounters });
})();

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

// Special Card Animation
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const cards = gsap.utils.toArray(".team-card-anim");

  if (!cards.length) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".team-section",
      start: "top 80%",
      toggleActions: "restart none restart reset",
    },
  });

  cards.forEach((card, index) => {
    const fromRight = index % 2 === 0;

    tl.from(
      card,
      {
        opacity: 0,
        x: fromRight ? 80 : -80,
        rotateZ: fromRight ? 4 : -4,
        duration: 0.8,
        ease: "power3.out",
      },
      index * 0.95
    );
  });
});
