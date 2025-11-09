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
  const START = 1;
  const DURATION = 1400;
  const STEP_MS = 28;

  function initCounters() {
    const section = document.querySelector(".counter-section");
    const counters = Array.from(document.querySelectorAll(".counter-value"));
    if (!section || counters.length === 0) return;

    const timers = new WeakMap();
    const setNumber = (el, n) => {
      if (el.firstChild && el.firstChild.nodeType === Node.TEXT_NODE) {
        el.firstChild.nodeValue = String(n);
      } else {
        el.textContent = String(n);
      }
    };

    const reset = (el) => {
      const t = timers.get(el);
      if (t) {
        clearInterval(t);
        timers.delete(el);
      }
      setNumber(el, START);
    };

    const animate = (el) => {
      const prev = timers.get(el);
      if (prev) {
        clearInterval(prev);
        timers.delete(el);
      }

      const target = Number(el.dataset.target || START);
      const totalSteps = Math.max(1, Math.ceil(DURATION / STEP_MS));
      const inc = Math.max((target - START) / totalSteps, 0.1);
      let cur = START;

      setNumber(el, START);

      const id = setInterval(() => {
        cur += inc;
        if (cur >= target) {
          setNumber(el, target);
          clearInterval(id);
          timers.delete(el);
        } else {
          setNumber(el, Math.floor(cur));
        }
      }, STEP_MS);
      timers.set(el, id);
    };

    const onEnter = () => counters.forEach(animate);
    const onExit = () => counters.forEach(reset);
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => (e.isIntersecting ? onEnter() : onExit()));
        },
        { threshold: 0.2 }
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

    counters.forEach((el) => setNumber(el, START));
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCounters, { once: true });
  } else {
    initCounters();
  }
  window.AboutPage = Object.assign(window.AboutPage || {}, { initCounters });
})();
