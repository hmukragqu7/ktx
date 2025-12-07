//  ================= FEATURE STARTS ================= 

if (document.querySelector(".feature")) {
  // Initialize Swiper
  const featureSwiper = new Swiper(".feature", {
    slidesPerView: 4,
    spaceBetween: 20,
    loop: true,
    speed: 800,
    grabCursor: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    pagination: {
      el: ".feature .swiper-pagination",
      dynamicBullets: true,
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      977: { slidesPerView: 4 },
      768: { slidesPerView: 2 },
      0: { slidesPerView: 1 },
    },
    on: {
      init: equalizeFeatureSlideHeights,
      resize: equalizeFeatureSlideHeights,
    },
  });

  // Equalize card heights dynamically
  function equalizeFeatureSlideHeights() {
    const slides = document.querySelectorAll(".feature-slide");
    if (!slides.length) return;

    slides.forEach((s) => (s.style.height = "auto"));
    let maxHeight = 0;
    slides.forEach((s) => {
      const h = s.offsetHeight;
      if (h > maxHeight) maxHeight = h;
    });
    slides.forEach((s) => (s.style.height = `${maxHeight}px`));
  }
}

//  ================= FEATURE ENDS ================= 


//  ================= PERSONALIZE STARTS ================= 

document.addEventListener("DOMContentLoaded", () => {
  /* --- 1️⃣ Initialize Swiper Safely --- */
  if (typeof Swiper !== "undefined" && document.querySelector(".personalize__swiper")) {
    try {
      const personalizeSwiper = new Swiper(".personalize__swiper", {
        loop: true,
        allowTouchMove: false,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        effect: "fade",
        fadeEffect: { crossFade: true },
        speed: 800,
        on: {
          slideChangeTransitionStart(swiper) {
            swiper.slides.forEach((slide) => {
              slide.classList.remove("animate-in", "animate-out");
            });
          },
          slideChangeTransitionEnd(swiper) {
            const activeSlide = swiper.slides[swiper.activeIndex];
            if (!activeSlide) return;
            activeSlide
              .querySelectorAll(".personalize__info-container, .personalize__gif-container")
              .forEach((el) => {
                if (el && el.style) {
                  el.style.animation = "personalize__slideInUp 1s ease forwards";
                }
              });
          },
        },
      });

      // Mobile behavior
      if (window.innerWidth <= 768) {
        personalizeSwiper.autoplay.stop();
        personalizeSwiper.params.allowTouchMove = true;
      }
    } catch (err) {
      console.error("❌ Swiper initialization error:", err);
    }
  } else {
    console.warn("⚠️ Swiper not loaded or .personalize__swiper element missing.");
  }

  /* --- 2️⃣ Initialize Lottie animations Safely --- */
  if (typeof lottie !== "undefined") {
    const initLottie = (id, jsonPath, speed = 1, loop = true, autoplay = true) => {
      const container = document.getElementById(id);
      if (!container) {
        console.warn(`⚠️ Missing Lottie container: #${id}`);
        return null;
      }

      try {
        const anim = lottie.loadAnimation({
          container,
          renderer: "svg",
          loop,
          autoplay,
          path: jsonPath,
        });

        if (anim && typeof anim.setSpeed === "function") {
          anim.setSpeed(speed);
        }

        return anim;
      } catch (err) {
        console.error(`❌ Lottie initialization error for ${jsonPath}:`, err);
        return null;
      }
    };



    // Initialize your 3 animations
    const anim1 = initLottie("lottie1", "/wp-content/uploads/2025/12/Flow-1.json", 1.5);
    const anim2 = initLottie("lottie2", "/wp-content/uploads/2025/12/Flow-2.json", 1.5);
    const anim3 = initLottie("lottie3", "/wp-content/uploads/2025/12/Flow-3.json", 1.5);
  } else {
    console.warn("⚠️ Lottie library not loaded.");
  }
});

//  ================= PERSONALIZE ENDS ================= 


//  ================= SPACE STARTS =================

document.addEventListener("DOMContentLoaded", function () {
  // Ensure Swiper is loaded safely
  if (typeof Swiper === "undefined") {
    console.warn("Swiper library not found — skipping space slider init.");
    return;
  }

  const spaceSection = document.querySelector(".space");
  if (!spaceSection) return;

  try {
    const spaceSwiper = new Swiper(spaceSection, {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      grabCursor: true,
      speed: 800, // Smooth transition duration (in ms)
      autoplay: {
        delay: 5000, // Slower autoplay - 5 seconds between slides
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      pagination: {
        el: spaceSection.querySelector(".swiper-pagination"),
        dynamicBullets: true,
        clickable: true,
      },
      navigation: {
        nextEl: spaceSection.querySelector(".swiper-button-next"),
        prevEl: spaceSection.querySelector(".swiper-button-prev"),
      },
      breakpoints: {
        977: { slidesPerView: 3 },
        768: { slidesPerView: 2 },
        0: { slidesPerView: 1 },
      },
    });

    const slides = spaceSection.querySelectorAll(".space-slide");
    if (!slides.length) return;

    // === Mobile Overlay Logic ===
    if (window.innerWidth <= 768) {
      slides.forEach((slide) => {
        slide.addEventListener("click", (e) => {
          const linkClicked = e.target.closest("a");
          if (linkClicked) return; // don't trigger overlay if button/link clicked

          const isActive = slide.classList.contains("mobile-active");

          // Remove active from all slides first
          slides.forEach((s) => s.classList.remove("mobile-active"));

          if (!isActive) {
            // Open overlay
            slide.classList.add("mobile-active");
            if (spaceSwiper?.autoplay?.running) spaceSwiper.autoplay.stop();
          } else {
            // Close overlay and restart autoplay
            if (spaceSwiper && !spaceSwiper.autoplay.running)
              spaceSwiper.autoplay.start();
          }
        });
      });

      // === Close overlay + resume autoplay when user drags/swipes ===
      spaceSwiper.on("touchMove", () => {
        slides.forEach((s) => s.classList.remove("mobile-active"));
        if (spaceSwiper && !spaceSwiper.autoplay.running)
          spaceSwiper.autoplay.start();
      });

      // === Also reset on slide change ===
      spaceSwiper.on("slideChange", () => {
        slides.forEach((s) => s.classList.remove("mobile-active"));
        if (spaceSwiper && !spaceSwiper.autoplay.running)
          spaceSwiper.autoplay.start();
      });
    }
  } catch (err) {
    console.error("Error initializing space swiper:", err);
  }
});

//  ================= SPACE ENDS =================


//  ================= PRIME STARTS =================

if (document.querySelector(".prime-location-slider")) {
  const primeSwiper = new Swiper(".prime-location-slider", {
    slidesPerView: 1,
    spaceBetween: 20,
    pauseOnMouseEnter: true,
    loop: true,
    grabCursor: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    pagination: {
      el: ".prime-location-slider .swiper-pagination",
      dynamicBullets: true,
      clickable: true,
    },
    navigation: {
      nextEl: ".prime-location-slider .swiper-button-next",
      prevEl: ".prime-location-slider .swiper-button-prev",
    },
  });

  let mobileBuilt = false;
  function initMobilePrimeSlides() {
    const swiperWrapper = document.querySelector(".prime-location-slider .swiper-wrapper");
    if (!swiperWrapper) return;
    if (window.innerWidth < 768 && !mobileBuilt) {
      const items = document.querySelectorAll(".prime-gallery .item");
      if (!items.length) return;
      swiperWrapper.innerHTML = "";

      items.forEach((item) => {
        const clone = item.cloneNode(true);
        const frameLink = clone.querySelector(".frame-link");
        if (!frameLink) return;
        const slide = document.createElement("div");
        slide.classList.add("swiper-slide", "prime-slider-card");
        slide.appendChild(frameLink);
        swiperWrapper.appendChild(slide);
      });

      // --- BEGIN: Minimal robust Swiper re-init/update after DOM change ---
      // Give the browser a tiny moment to reflect DOM changes, then inform Swiper.
      // This ensures pagination bullets, loop clones and autoplay behave correctly.
      setTimeout(() => {
        try {
          if (primeSwiper && typeof primeSwiper.update === "function") {
            // Update internal sizes / slide list
            primeSwiper.update();

            // If loop is enabled, safely recreate loop clones so loop works
            if (primeSwiper.params && primeSwiper.params.loop) {
              try {
                if (typeof primeSwiper.loopDestroy === "function") primeSwiper.loopDestroy();
              } catch (e) { /* ignore */ }
              try {
                if (typeof primeSwiper.loopCreate === "function") primeSwiper.loopCreate();
              } catch (e) { /* ignore */ }
              // Final update after loop recreate
              primeSwiper.update();
            }

            // Restart autoplay in case it didn't start or was stopped
            if (primeSwiper.autoplay && typeof primeSwiper.autoplay.start === "function") {
              primeSwiper.autoplay.start();
            }
          }
        } catch (err) {
          // Fail quietly — do not alter any feature if something unexpected happens
          // (keeps original behavior intact)
          // console.warn('Swiper update after dynamic slides failed', err);
        }
      }, 50);
      // --- END: Minimal robust Swiper re-init/update ---

      const mobileFrames = swiperWrapper.querySelectorAll(".frame");
      mobileFrames.forEach((frame) => {
        frame.addEventListener("click", (e) => {
          const alreadyActive = frame.classList.contains("active");
          const viewBtn = frame.querySelector(".view-btn");

          if (!alreadyActive) {
            mobileFrames.forEach((f) => f.classList.remove("active"));
            frame.classList.add("active");
            primeSwiper.autoplay.stop();
            e.stopPropagation();
            return;
          }

          if (viewBtn && (e.target === viewBtn || viewBtn.contains(e.target))) return;
          frame.classList.remove("active");
          primeSwiper.autoplay.start();
        });
      });

      primeSwiper.on("slideChangeTransitionStart", () => {
        mobileFrames.forEach((f) => f.classList.remove("active"));
        primeSwiper.autoplay.start();
      });

      mobileBuilt = true;
    }
  }

  initMobilePrimeSlides();
  window.addEventListener("resize", () => {
    if (window.innerWidth < 768 && !mobileBuilt) initMobilePrimeSlides();
  });
}


//  ================= PRIME ENDS =================


// ================= TESTIMONIAL ANIMATION STARTS================

if (document.querySelector(".testimonial-swiper")) {
  const testimonialSwiper = new Swiper(".testimonial-swiper", {
    slidesPerView: 2,
    spaceBetween: 20,
    loop: true,
    grabCursor: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    pagination: { el: ".swiper-pagination", dynamicBullets: true, clickable: true },
    navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
    breakpoints: {
      0: { slidesPerView: 1, spaceBetween: 15 },
      976: { slidesPerView: 2, spaceBetween: 20 },
    },
  });

  document.querySelectorAll(".testimonial-slider-card").forEach((card) => {
    const circles = card.querySelectorAll(".testimonial_circle-rotator span");
    if (!circles.length) return;
    card.addEventListener("mouseenter", () =>
      gsap.to(circles, { rotation: 350, duration: 1.8, ease: "power2.out" })
    );
    card.addEventListener("mouseleave", () =>
      gsap.to(circles, { rotation: 0, duration: 1.5, ease: "power2.inOut" })
    );
  });
}

// ================= TESTIMONIAL ANIMATION ENDS ================


// ========================================================= OFFICE SPACE ===================================================== 

if (document.querySelectorAll(".hero-and-reviews-common-swiper").length) {
  const commonSwiperConfig = {
    loop: true,
    grabCursor: true,
    spaceBetween: 20,
    speed: 800,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    slidesPerView: 1,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
      clickable: true,
    },
  };

  document.querySelectorAll(".hero-and-reviews-common-swiper").forEach((el) => {
    new Swiper(el, commonSwiperConfig);
  });
}

//=================== FIND US ACCROSS BENGALURU STARTS ===================
document.addEventListener("DOMContentLoaded", () => {
  const desktopCards = document.querySelectorAll(".business .grid .card");
  const swiperWrapper = document.querySelector(".business .swiper .swiper-wrapper");
  if (!desktopCards.length || !swiperWrapper) return;

  desktopCards.forEach((card) => {
    const clone = card.cloneNode(true);
    const slide = document.createElement("div");
    slide.classList.add("swiper-slide");
    slide.appendChild(clone);
    swiperWrapper.appendChild(slide);
  });

  const swiper = new Swiper(".business .swiper", {
    slidesPerView: 2,
    spaceBetween: 20,
    loop: true,
    autoplay: { delay: 3000, disableOnInteraction: false },
    pagination: { el: ".business .swiper-pagination", dynamicBullets: true, clickable: true },
    navigation: {
      nextEl: ".business .swiper-button-next",
      prevEl: ".business .swiper-button-prev",
    },
    breakpoints: {
      0: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      967: false,
    },
  });

  const cards = document.querySelectorAll(".business .swiper .card");
  cards.forEach((card) => {
    const overlay = card.querySelector(".overlay");
    const viewBtn = card.querySelector(".view-btn");
    if (!overlay || !viewBtn) return;

    overlay.addEventListener("mouseenter", () => swiper.autoplay.stop());
    overlay.addEventListener("mouseleave", () => swiper.autoplay.start());

    card.addEventListener("click", (e) => {
      const alreadyActive = card.classList.contains("active");
      if (!alreadyActive) {
        document.querySelectorAll(".business .swiper .card.active").forEach((c) =>
          c.classList.remove("active")
        );
        card.classList.add("active");
        swiper.autoplay.stop();
        e.stopPropagation();
        return;
      }
      if (viewBtn && (e.target === viewBtn || viewBtn.contains(e.target))) return;
      card.classList.remove("active");
      swiper.autoplay.start();
    });
  });

  swiper.on("slideChangeTransitionStart", () => {
    document
      .querySelectorAll(".business .swiper .card.active")
      .forEach((c) => c.classList.remove("active"));
    swiper.autoplay.start();
  });
});

//=================== FIND US ACCROSS BENGALURU ENDS ===================


// ========================================================= BUSINESS SPACE ===================================================

if (document.querySelector(".business-centers-in-blr")) {
  new Swiper(".business-centers-in-blr", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      0: { slidesPerView: 1, spaceBetween: 15 },
      768: { slidesPerView: 2, spaceBetween: 20 },
      976: { slidesPerView: 3, spaceBetween: 30 },
    },
  });
}

// ========================================================= ABOUT US ===================================================== 

if (document.querySelector("#cateringContent")) {
  document.querySelectorAll("#cateringContent .catering").forEach((item) => {
    const { icon, alt, title, desc } = item.dataset;
    item.innerHTML = `
      <div class="icon-circle">
        <img src="${icon}" alt="${alt}" />
      </div>
      <h5 class="font-montserrat">${title}</h5>
      <p class="font-poppins">${desc}</p>
    `;
  });

  const swiperWrapper = document.querySelector(".catering.swiper .swiper-wrapper");
  if (swiperWrapper) {
    document.querySelectorAll("#cateringContent .catering").forEach((item) => {
      const slide = document.createElement("div");
      slide.classList.add("swiper-slide");
      slide.innerHTML = item.innerHTML;
      swiperWrapper.appendChild(slide);
    });
  }

  function initMobileSwiper() {
    if (window.innerWidth <= 766) {
      return new Swiper(".catering-section .swiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        navigation: {
          nextEl: ".catering-section .swiper-button-next",
          prevEl: ".catering-section .swiper-button-prev",
        },
        pagination: {
          el: ".catering-section .swiper-pagination",
          dynamicBullets: true,
          clickable: true,
        },
      });
    }
    return null;
  }

  let mobileSwiper = initMobileSwiper();
  window.addEventListener("resize", () => {
    if (window.innerWidth <= 766 && !mobileSwiper) {
      mobileSwiper = initMobileSwiper();
    } else if (window.innerWidth > 766 && mobileSwiper) {
      mobileSwiper.destroy(true, true);
      mobileSwiper = null;
    }
  });
}

// ================= MISSION VISION VALUE STARTS ================= 

function setEqualMVCardHeight() {
  const cards = document.querySelectorAll(".mv-section .mv-card");
  if (!cards.length) return;
  let maxHeight = 0;
  cards.forEach((card) => (card.style.height = "auto"));
  cards.forEach((card) => {
    const cardHeight = card.offsetHeight;
    if (cardHeight > maxHeight) maxHeight = cardHeight;
  });
  cards.forEach((card) => (card.style.height = maxHeight + "px"));
}

window.addEventListener("load", setEqualMVCardHeight);
window.addEventListener("resize", setEqualMVCardHeight);

const mvSection = document.querySelector(".mv-section");
if (mvSection) {
  const circleGroups = mvSection.querySelectorAll(".circle-group");
  circleGroups.forEach((group) => {
    group.addEventListener("mouseenter", () => {
      const spans = group.querySelectorAll("span");
      gsap.to(spans, {
        rotation: 360,
        duration: 2,
        ease: "power2.out",
        transformOrigin: (i, target) =>
          getComputedStyle(target).transformOrigin,
      });
    });
    group.addEventListener("mouseleave", () => {
      const spans = group.querySelectorAll("span");
      gsap.to(spans, {
        rotation: 0,
        duration: 2,
        ease: "power2.inOut",
        transformOrigin: (i, target) =>
          getComputedStyle(target).transformOrigin,
      });
    });
  });
}

// ================= MISSION VISION VALUE ENDS ================= 



document.addEventListener("DOMContentLoaded", function () {
  // Safely select elements
  const cards = document.querySelectorAll(".service-card");
  const popup = document.getElementById("formPopup");
  const closePopup = document.getElementById("closePopup");

  // If no cards found, exit silently
  if (!cards || cards.length === 0) return;

  // Loop through cards safely
  cards.forEach((card) => {
    // Click on card (accordion behaviour)
    card.addEventListener("click", (e) => {
      if (window.innerWidth <= 976) {
        e.stopPropagation();
        cards.forEach((c) => c.classList.remove("active"));
        card.classList.toggle("active");
      }
    });

    // Safely check for .view-btn inside card
    const viewBtn = card.querySelector(".view-btn");

    if (viewBtn) {
      viewBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Open popup only if popup exists
        if (popup) popup.classList.add("active");
      });
    }
  });

  // Safe close button check
  if (closePopup && popup) {
    closePopup.addEventListener("click", () => popup.classList.remove("active"));
  }

  // Click outside popup to close
  if (popup) {
    popup.addEventListener("click", (e) => {
      if (e.target === popup) popup.classList.remove("active");
    });
  }
});



// ==================== ALL LOCATION =========================

document.addEventListener("DOMContentLoaded", function () {
  // ensure Swiper is loaded
  if (typeof Swiper === "undefined") {
    console.warn("Swiper library not loaded.");
    return;
  }

  // Grab data items (the single source of truth)
  const dataContainer = document.getElementById("locoffice-data");
  if (!dataContainer) {
    console.warn("No #locoffice-data container found — nothing to build.");
    return;
  }

  const nodeList = dataContainer.querySelectorAll(".locoffice-item");
  const dataItems = nodeList ? Array.from(nodeList) : [];

  if (dataItems.length === 0) {
    console.warn("No .locoffice-item elements found inside #locoffice-data.");
    // still try to initialize empty swipers (optional) — here we simply return
    return;
  }

  // Helper: create the exact card HTML structure you had originally
  function createCardNode(item) {
    const card = document.createElement("div");
    card.className = "locoffice-card";

    // image (clone)
    const imgEl = item.querySelector("img");
    if (imgEl && imgEl.src) {
      const img = document.createElement("img");
      img.src = imgEl.src;
      img.alt = imgEl.alt || "";
      card.appendChild(img);
    } else if (imgEl) {
      // if image exists but missing src, still clone attributes safely
      const img = document.createElement("img");
      img.alt = imgEl.alt || "";
      if (imgEl.getAttribute && imgEl.getAttribute("data-src")) {
        img.src = imgEl.getAttribute("data-src");
      }
      card.appendChild(img);
    }

    // content (use the inner HTML you gave)
    const contentSrc = item.querySelector(".locoffice-content");
    if (contentSrc) {
      // clone content markup exactly
      const content = document.createElement("div");
      content.className = "locoffice-content";
      content.innerHTML = contentSrc.innerHTML;
      card.appendChild(content);
    }

    return card;
  }

  // ---------- BUILD DESKTOP SWIPER ----------
  // Per your original HTML, each desktop slide contains a div.locoffice-grid with 6 cards
  const DESKTOP_PER_SLIDE = 6;
  const desktopWrapper = document.querySelector("#one .swiper-wrapper");

  if (desktopWrapper && DESKTOP_PER_SLIDE > 0) {
    for (let i = 0; i < dataItems.length; i += DESKTOP_PER_SLIDE) {
      const chunk = dataItems.slice(i, i + DESKTOP_PER_SLIDE);

      const slide = document.createElement("div");
      slide.className = "swiper-slide";

      const grid = document.createElement("div");
      grid.className = "locoffice-grid";

      // append cards (exact markup)
      chunk.forEach(item => {
        try {
          const card = createCardNode(item);
          grid.appendChild(card);
        } catch (err) {
          console.warn("Failed to create/append a card for an item:", err);
        }
      });

      slide.appendChild(grid);
      desktopWrapper.appendChild(slide);
    }
  } else {
    console.warn("Desktop swiper wrapper '#one .swiper-wrapper' not found or invalid DESKTOP_PER_SLIDE.");
  }

  // ---------- BUILD MOBILE SWIPER ----------
  const mobileWrapper = document.querySelector("#two .swiper-wrapper");
  if (mobileWrapper) {
    dataItems.forEach(item => {
      try {
        const slide = document.createElement("div");
        slide.className = "swiper-slide";

        const card = createCardNode(item);
        slide.appendChild(card);

        mobileWrapper.appendChild(slide);
      } catch (err) {
        console.warn("Failed to create/append mobile slide for an item:", err);
      }
    });
  } else {
    console.warn("Mobile swiper wrapper '#two .swiper-wrapper' not found.");
  }

  // ---------- INIT SWIPERS ----------
  // Helper to check presence of element for pagination/navigation before passing to Swiper
  function elExists(selector) {
    try {
      return !!document.querySelector(selector);
    } catch (e) {
      return false;
    }
  }

  // Desktop Swiper (uses desktop pagination)
  try {
    const desktopPaginationSelector = ".desktop-pagination";
    const desktopPaginationConfig = elExists(desktopPaginationSelector)
      ? {
        el: desktopPaginationSelector,
        clickable: true,
        renderBullet: function (index, className) {
          // numbered bullets like original style
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        }
      }
      : false;

    new Swiper("#one", {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      grabCursor: true,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      // only include pagination if element exists
      ...(desktopPaginationConfig ? { pagination: desktopPaginationConfig } : {})
    });
  } catch (err) {
    console.error("Error initializing desktop swiper:", err);
  }

  // Mobile Swiper (uses mobile pagination + nav)
  try {
    const mobilePaginationSelector = ".mobile-pagination";
    const hasMobilePagination = elExists(mobilePaginationSelector);
    const hasNext = elExists(".swiper-button-next");
    const hasPrev = elExists(".swiper-button-prev");

    const mobileConfig = {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      grabCursor: true,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      ...(hasMobilePagination ? { pagination: { el: mobilePaginationSelector, dynamicBullets: true, clickable: true } } : {}),
      ...(hasNext && hasPrev ? { navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" } } : {})
    };

    new Swiper("#two", mobileConfig);
  } catch (err) {
    console.error("Error initializing mobile swiper:", err);
  }

});

