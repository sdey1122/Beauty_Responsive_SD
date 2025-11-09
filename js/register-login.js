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

// Form Validation
const form = document.getElementById("authForm");
const u = document.getElementById("username");
const e = document.getElementById("email");
const p = document.getElementById("password");

const uErr = document.getElementById("usernameError");
const eErr = document.getElementById("emailError");
const pErr = document.getElementById("passwordError");

const btnRegister = document.querySelector(".btn-register");
const btnLogin = document.querySelector(".btn-login");

const reUser = /^(?!\d)[A-Za-z][A-Za-z0-9_]{4,}$/;
const reEmail =
  /^(?!\d)[A-Za-z][A-Za-z0-9._%+-]*@[A-Za-z0-9.-]+\.(com|in|org)$/i;
const rePass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{10,}$/;

function setErr(node, msg) {
  node.textContent = msg;
}
function clearErr(node) {
  node.textContent = "";
}

function validateUsername() {
  const val = u.value.trim();
  if (!reUser.test(val)) {
    setErr(
      uErr,
      "Username must have 5 or more characters, no spaces, and cannot start with a number."
    );
    return false;
  }
  clearErr(uErr);
  return true;
}

function validateEmail() {
  const val = e.value.trim();
  if (!reEmail.test(val)) {
    setErr(
      eErr,
      "Enter a valid email (must end with .com, .in or .org and cannot start with a number)."
    );
    return false;
  }
  clearErr(eErr);
  return true;
}

function validatePassword() {
  const val = p.value;
  if (!rePass.test(val)) {
    setErr(
      pErr,
      "Password must have 10 or more characters, and must include 1 lowercase, 1 uppercase, and 1 special character."
    );
    return false;
  }
  clearErr(pErr);
  return true;
}

function validateAll() {
  const a = validateUsername();
  const b = validateEmail();
  const c = validatePassword();
  return a && b && c;
}

u.addEventListener("input", validateUsername);
e.addEventListener("input", validateEmail);
p.addEventListener("input", validatePassword);

function showModal(message) {
  let overlay = document.getElementById("authModalOverlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "authModalOverlay";
    overlay.innerHTML = `
        <div id="authModalBox" role="dialog" aria-live="assertive" aria-modal="true">
          <p id="authModalMsg"></p>
          <button id="authModalClose" class="button" type="button">OK</button>
        </div>`;
    document.body.appendChild(overlay);

    overlay.addEventListener("click", (ev) => {
      if (ev.target.id === "authModalOverlay") overlay.classList.remove("show");
    });
    document.addEventListener("click", (ev) => {
      if (ev.target.id === "authModalClose") overlay.classList.remove("show");
    });
  }
  document.getElementById("authModalMsg").textContent = message;
  overlay.classList.add("show");
}

form.addEventListener("submit", function (ev) {
  ev.preventDefault();
  if (!validateAll()) return;
  showModal("Registration Successful !!");
  form.reset();
});

btnLogin.addEventListener("click", function () {
  if (!validateAll()) return;
  showModal("Login Successful");
  form.reset();
});
