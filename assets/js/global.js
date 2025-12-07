document.addEventListener("DOMContentLoaded", function () {
  // --- Query elements safely ---
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileOverlay = document.getElementById("mobileOverlay");
  const mainMenu = document.getElementById("mainMenu");

  const servicesSubmenu = document.getElementById("servicesSubmenu");
  const queensRoadSubmenu = document.getElementById("queensRoadSubmenu");
  const mgRoadSubmenu = document.getElementById("mgRoadSubmenu");
  const solutionsSubmenu = document.getElementById("solutionsSubmenu");
  const techparksSubmenu = document.getElementById("techparksSubmenu");
  const aboutSubmenu = document.getElementById("aboutSubmenu");

  // sanity checks
  if (!hamburger) console.warn("Missing element: #hamburger");
  if (!mobileMenu) console.warn("Missing element: #mobileMenu");
  if (!mobileOverlay) console.warn("Missing element: #mobileOverlay");
  if (!mainMenu) console.warn("Missing element: #mainMenu");

  // Track current menu state
  let currentMenu = "main";
  let previousMenu = "main";

  // --- Helpers ---
  function safeClassListRemove(el, ...classes) {
    if (!el) return;
    try {
      classes.forEach(c => el.classList.remove(c));
    } catch (e) {
      console.warn("safeClassListRemove failed:", e, el);
    }
  }
  function safeClassListAdd(el, ...classes) {
    if (!el) return;
    try {
      classes.forEach(c => el.classList.add(c));
    } catch (e) {
      console.warn("safeClassListAdd failed:", e, el);
    }
  }

  // Reset to main menu
  function resetToMainMenu() {
    // avoid errors if any panel is missing
    safeClassListRemove(mainMenu, "slide-out");

    safeClassListRemove(servicesSubmenu, "slide-in", "slide-out");
    safeClassListRemove(queensRoadSubmenu, "slide-in", "slide-out");
    safeClassListRemove(mgRoadSubmenu, "slide-in", "slide-out");
    safeClassListRemove(solutionsSubmenu, "slide-in", "slide-out");
    safeClassListRemove(techparksSubmenu, "slide-in", "slide-out");
    safeClassListRemove(aboutSubmenu, "slide-in", "slide-out");

    currentMenu = "main";
    previousMenu = "main";
  }

  // --- Toggle mobile menu (only attach if hamburger exists) ---
  if (hamburger) {
    hamburger.addEventListener("click", function () {
      // if mobileMenu missing, just toggle body overflow + warn
      if (!mobileMenu) {
        console.warn("#mobileMenu element missing — cannot toggle visual state.");
        // as fallback toggle a class on body so user still can see something if desired
        document.body.classList.toggle("mobile-menu-fallback");
        return;
      }

      if (mobileMenu.classList.contains("active")) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  // Open mobile menu
  function openMobileMenu() {
    if (!mobileMenu || !mobileOverlay || !hamburger) {
      // still attempt to set body overflow, but warn
      console.warn("openMobileMenu: one or more elements missing (#mobileMenu, #mobileOverlay, #hamburger).");
      if (document.body) document.body.style.overflow = "hidden";
      resetToMainMenu();
      return;
    }

    safeClassListAdd(mobileMenu, "active");
    safeClassListAdd(mobileOverlay, "active");
    safeClassListAdd(hamburger, "active");
    document.body.style.overflow = "hidden";
    resetToMainMenu();
  }

  // Close mobile menu
  function closeMobileMenu() {
    if (!mobileMenu || !mobileOverlay || !hamburger) {
      console.warn("closeMobileMenu: one or more elements missing.");
      if (document.body) document.body.style.overflow = "auto";
      resetToMainMenu();
      return;
    }

    safeClassListRemove(mobileMenu, "active");
    safeClassListRemove(mobileOverlay, "active");
    safeClassListRemove(hamburger, "active");
    document.body.style.overflow = "auto";

    // Reset to main menu
    resetToMainMenu();
  }

  if (mobileOverlay) mobileOverlay.addEventListener("click", closeMobileMenu);

  // --- Open submenu links ---
  const submenuLinks = document.querySelectorAll(".mobile-nav-link[data-submenu]");
  if (!submenuLinks || submenuLinks.length === 0) {
    // not an error — maybe site variant without mobile nav
    // console.info("No .mobile-nav-link[data-submenu] found.");
  } else {
    submenuLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();

        const submenuType = this.getAttribute("data-submenu");
        let targetSubmenu = null;

        if (submenuType === "services") {
          targetSubmenu = servicesSubmenu;
          previousMenu = currentMenu;
          currentMenu = "services";
        } else if (submenuType === "queens-road") {
          targetSubmenu = queensRoadSubmenu;
          previousMenu = currentMenu;
          currentMenu = "queens-road";
        } else if (submenuType === "mg-road") {
          targetSubmenu = mgRoadSubmenu;
          previousMenu = currentMenu;
          currentMenu = "mg-road";
        } else if (submenuType === "solutions") {
          targetSubmenu = solutionsSubmenu;
          previousMenu = currentMenu;
          currentMenu = "solutions";
        } else if (submenuType === "techparks") {
          targetSubmenu = techparksSubmenu;
          previousMenu = currentMenu;
          currentMenu = "techparks";
        } else if (submenuType === "about") {
          targetSubmenu = aboutSubmenu;
          previousMenu = currentMenu;
          currentMenu = "about";
        } else {
          console.warn("Unknown data-submenu:", submenuType);
        }

        // Slide out current panel safely
        if (
          currentMenu === "services" ||
          currentMenu === "solutions" ||
          currentMenu === "techparks" ||
          currentMenu === "about"
        ) {
          // Coming from main menu
          safeClassListAdd(mainMenu, "slide-out");
        } else if (currentMenu === "queens-road" || currentMenu === "mg-road") {
          // Coming from services submenu
          safeClassListAdd(servicesSubmenu, "slide-out");
        }

        // Slide in target submenu only if it exists
        if (targetSubmenu) {
          setTimeout(() => {
            safeClassListAdd(targetSubmenu, "slide-in");
          }, 50);
        } else {
          console.warn("Target submenu not found for", submenuType);
        }
      });
    });
  }

  // --- Back button functionality ---
  const backButtons = document.querySelectorAll(".back-button");
  if (!backButtons || backButtons.length === 0) {
    // no back buttons present — no issue
  } else {
    backButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        e.preventDefault();

        const targetMenu = this.getAttribute("data-back");

        // Slide out current panel — find closest panel safely
        let currentPanel = null;
        try {
          currentPanel = this.closest ? this.closest(".menu-panel") : null;
        } catch (err) {
          currentPanel = null;
        }

        if (currentPanel) {
          safeClassListRemove(currentPanel, "slide-in");
        } else {
          console.warn("Back button click: current .menu-panel not found for button", this);
        }

        setTimeout(() => {
          if (targetMenu === "main") {
            safeClassListRemove(mainMenu, "slide-out");
          } else if (targetMenu === "services") {
            safeClassListRemove(servicesSubmenu, "slide-out");
          } else {
            // unknown target - warn but don't crash
            console.warn("Unknown back target:", targetMenu);
          }
        }, 50);
      });
    });
  }
});
