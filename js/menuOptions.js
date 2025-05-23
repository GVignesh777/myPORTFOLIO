
const header_name = document.querySelector('.header');
const nav_name = document.querySelector('#nav');
const menuIcon = document.getElementById("menu-icon");
const menu = document.getElementById("menu");

window.addEventListener('scroll', function () {
  if (window.scrollY > 30) {
    header_name.classList.add('active');
  }
  else if (window.scrollY < 10) {
    header_name.classList.remove('active');
  }
});















// Setting the time limit for menu bar

let closeMenuTimer = null;
const closeDelay = 5000; // 5 seconds

function closeMenu() {
  menu.classList.remove("show");
  menuIconChanger();
  clearCloseTimer();
}

function clearCloseTimer() {
  if (closeMenuTimer) {
    clearTimeout(closeMenuTimer);
    closeMenuTimer = null;
  }
}

function startCloseTimer() {
  clearCloseTimer();
  closeMenuTimer = setTimeout(() => {
    closeMenu();
  }, closeDelay);
}

function toggleMenu() {
  const isShown = menu.classList.toggle("show");
  if (isShown) {
    startCloseTimer();
    menu.focus(); // give focus to menu for accessibility
  } else {
    clearCloseTimer();
  }
}

menuIcon.addEventListener("click", toggleMenu);
menuIcon.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    toggleMenu();
  }
});


// Reset close timer if user interacts with menu: mouseenter, focusin, or clicks on menu items
menu.addEventListener("mouseenter", clearCloseTimer);
menu.addEventListener("focusin", clearCloseTimer);
menu.addEventListener("click", clearCloseTimer);

// Restart timer when user leaves the menu area
menu.addEventListener("mouseleave", () => {
  if (menu.classList.contains("show")) {
    startCloseTimer();
  }
});
menu.addEventListener("focusout", (e) => {
  // If focus moves outside menu, restart timer
  if (menu.classList.contains("show")) {
    if (!menu.contains(e.relatedTarget)) {
      startCloseTimer();
    }
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 1080 && menu.classList.contains("show")) {
    closeMenu();
  }
});

document.addEventListener("click", (e) => {
  if (window.innerWidth <= 1080 && menu.classList.contains("show")) {
    if (!menu.contains(e.target) && !menuIcon.contains(e.target)) {
      closeMenu();
    }
  }
});