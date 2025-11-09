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
  const DUR_TO_999 = 6000;
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
