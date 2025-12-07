// location.js
// Combined: locofs Swiper init + single-source gallery/tab wiring
// Fixes: ensures the correct tab is active on initial load (office/coworking/gallery)
    
// -----------------------------
// Swiper init for .locofs-gallery
// (unchanged)
(function () {
  const BREAKPOINT = 768;

  function cleanExistingControls(gallery) {
    const existingPag = gallery.querySelector(".swiper-pagination");
    const existingNext = gallery.querySelector(".swiper-button-next");
    const existingPrev = gallery.querySelector(".swiper-button-prev");
    if (existingPag) existingPag.remove();
    if (existingNext) existingNext.remove();
    if (existingPrev) existingPrev.remove();
  }

  function initLocofsSwiper() {
    const gallery = document.querySelector(".locofs-gallery");
    if (!gallery) return;

    if (gallery.dataset.swiperInitialized === "true" && window.innerWidth <= BREAKPOINT) {
      return;
    }

    if (gallery.dataset.swiperInitialized === "true" && window.innerWidth > BREAKPOINT) {
      if (gallery._swiperInstance && typeof gallery._swiperInstance.destroy === "function") {
        try { gallery._swiperInstance.destroy(true, true); } catch (e) { /* ignore */ }
      }

      const wrapper = gallery.querySelector(".swiper-wrapper");
      if (wrapper) {
        const slides = Array.from(wrapper.children);
        slides.forEach((s) => gallery.appendChild(s));
        wrapper.remove();
      }

      cleanExistingControls(gallery);
      gallery.classList.remove("swiper", "locofs-location-slider");
      gallery.dataset.swiperInitialized = "false";
      delete gallery._swiperInstance;
      return;
    }

    if (window.innerWidth <= BREAKPOINT) {
      cleanExistingControls(gallery);

      gallery.classList.add("swiper", "locofs-location-slider");

      const wrapper = document.createElement("div");
      wrapper.classList.add("swiper-wrapper");
      gallery.insertBefore(wrapper, gallery.firstChild);

      const cards = Array.from(gallery.querySelectorAll(":scope > .card"));
      cards.forEach((card) => {
        card.classList.add("swiper-slide");
        wrapper.appendChild(card);
      });

      gallery.insertAdjacentHTML(
        "beforeend",
        `
        <div class="swiper-pagination"></div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
      `
      );

      requestAnimationFrame(() => {
        const swiperInstance = new Swiper(".locofs-location-slider", {
          slidesPerView: 1,
          spaceBetween: 20,
          loop: true,
          grabCursor: true,
          autoplay: {
            delay: 2500,
            disableOnInteraction: false,
          },
          pagination: {
            el: ".locofs-location-slider .swiper-pagination",
            dynamicBullets: true,
            clickable: true,
          },
          navigation: {
            nextEl: ".locofs-location-slider .swiper-button-next",
            prevEl: ".locofs-location-slider .swiper-button-prev",
          },
          observer: true,
          observeParents: true,
        });

        gallery.dataset.swiperInitialized = "true";
        gallery._swiperInstance = swiperInstance;
      });
    }
  }

  initLocofsSwiper();
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(initLocofsSwiper, 120);
  });
})();


// -----------------------------
// Central Gallery / Tab wiring
// -----------------------------
(function () {
  const GALLERY_ID = "gallerySection";
  const GALLERY_TAB_ID = "galleryTab";
  const OFFICE_LINK_ID = "officeLink";
  const COWORKING_LINK_ID = "coworkingLink";
  const CONTENT_BLOCK_SELECTOR = ".content-block";
  const TAB_SELECTORS = ".tab-btn, .tab-link";
  const ACTIVE_CLASS = "active";

  function $ (sel) { return document.querySelector(sel); }
  function $$ (sel) { return Array.from(document.querySelectorAll(sel)); }

  // Normalize pathnames for comparison:
  // - resolves href relative to current origin
  // - strips trailing slashes
  // - treats /index.html and / as same
  function normalizedPath(href) {
    try {
      const url = new URL(href, location.origin);
      let path = url.pathname.replace(/\/+$/, ""); // remove trailing slash
      // treat empty as root '/'
      if (path === "") path = "/";
      // treat index.html as '/'
      path = path.replace(/\/index\.html$/i, "/");
      return path;
    } catch (e) {
      return null;
    }
  }

  // Helper: normalize filename by lowercasing, removing extension,
  // and collapsing repeated letters (so "cooworking" -> "coworking")
  function normalizeFilenameForFuzzyMatch(filename) {
    if (!filename) return null;
    // strip query/hash
    filename = filename.split("?")[0].split("#")[0];
    // get base name
    const parts = filename.split("/");
    let base = parts.pop() || "";
    // remove extension
    base = base.replace(/\.[^/.]+$/, "");
    base = base.toLowerCase();

    // collapse consecutive duplicate letters (a quick fuzzy heuristic)
    base = base.replace(/(.)\1+/g, "$1");

    // remove non-alphanumeric for extra robustness
    base = base.replace(/[^a-z0-9]/g, "");
    return base || null;
  }

  // Remove active from all known tabs and set on one element
  function setActiveTab(tabElement) {
    $$(TAB_SELECTORS).forEach(t => t.classList.remove(ACTIVE_CLASS));
    if (tabElement) tabElement.classList.add(ACTIVE_CLASS);
  }

  function showGallery(pushHistory = true) {
    $$(CONTENT_BLOCK_SELECTOR).forEach(el => el.style.display = "none");

    const g = document.getElementById(GALLERY_ID);
    if (g) {
      g.style.display = "block";
      const firstImg = g.querySelector("img");
      if (firstImg) {
        firstImg.setAttribute("tabindex", "-1");
        firstImg.focus({ preventScroll: true });
      }
    }

    const galleryTab = document.getElementById(GALLERY_TAB_ID);
    if (galleryTab) {
      galleryTab.classList.add("tab-btn", "tab-link");
      setActiveTab(galleryTab);
      galleryTab.classList.remove("active-tab");
    }

    if (pushHistory) {
      try { history.pushState({ novelGallery: true }, "", "#gallery"); } catch (e) {}
    }
  }

  function hideGallery(replaceHash = true) {
    $$(CONTENT_BLOCK_SELECTOR).forEach(el => el.style.display = "");

    const g = document.getElementById(GALLERY_ID);
    if (g) g.style.display = "none";

    const galleryTab = document.getElementById(GALLERY_TAB_ID);
    if (galleryTab) {
      galleryTab.classList.remove(ACTIVE_CLASS);
      galleryTab.classList.remove("active-tab");
    }

    if (replaceHash && location.hash === "#gallery") {
      try { history.replaceState(null, "", location.pathname + location.search); } catch (e) {}
    }
  }

  function restoreAndActivate(tabElement) {
    hideGallery(true);
    if (tabElement) setActiveTab(tabElement);
  }

  // Set initial active tab based on current URL (office / coworking / gallery)
  function setInitialActive(officeEl, coworkingEl, galleryEl) {
    // 0) If markup already set an active tab, keep that (useful if server rendered)
    const preActive = document.querySelector('.location-tabs .active');
    if (preActive) {
      // ensure gallery hidden if preActive is not the galleryTab
      if (preActive.id === GALLERY_TAB_ID) showGallery(false);
      else hideGallery(false);
      return;
    }

    // gallery takes precedence if #gallery in URL
    if (location.hash === "#gallery" && galleryEl) {
      showGallery(false);
      return;
    }

    const currentPath = normalizedPath(location.href);

    // If office link exists and its normalized path matches current page, set it active
    if (officeEl) {
      const officePath = normalizedPath(officeEl.getAttribute("href") || "");
      if (officePath && officePath === currentPath) {
        setActiveTab(officeEl);
        hideGallery(false);
        return;
      }
    }

    if (coworkingEl) {
      const coworkPath = normalizedPath(coworkingEl.getAttribute("href") || "");
      if (coworkPath && coworkPath === currentPath) {
        setActiveTab(coworkingEl);
        hideGallery(false);
        return;
      }
    }

    // Looser fuzzy filename match: collapse repeated letters and compare
    try {
      const currFile = (new URL(location.href)).pathname.split('/').pop();
      const officeFile = officeEl ? (new URL(officeEl.getAttribute('href') || '', location.origin)).pathname.split('/').pop() : null;
      const coworkFile = coworkingEl ? (new URL(coworkingEl.getAttribute('href') || '', location.origin)).pathname.split('/').pop() : null;

      const normCurr = normalizeFilenameForFuzzyMatch(currFile);
      const normOffice = normalizeFilenameForFuzzyMatch(officeFile);
      const normCowork = normalizeFilenameForFuzzyMatch(coworkFile);

      if (normOffice && normCurr && normOffice === normCurr) { setActiveTab(officeEl); hideGallery(false); return; }
      if (normCowork && normCurr && normCowork === normCurr) { setActiveTab(coworkingEl); hideGallery(false); return; }
    } catch (e) {
      // ignore any URL parsing issues
    }

    // Default: set first visible tab (if any) active — prefer office, then coworking
    if (officeEl) { setActiveTab(officeEl); hideGallery(false); }
    else if (coworkingEl) { setActiveTab(coworkingEl); hideGallery(false); }
  }

  // Wire controls after DOM ready or after header insertion
  function wireControls() {
    const galleryTab = document.getElementById(GALLERY_TAB_ID);
    const gallerySection = document.getElementById(GALLERY_ID);
    const office = document.getElementById(OFFICE_LINK_ID);
    const coworking = document.getElementById(COWORKING_LINK_ID);

    if (!galleryTab || !gallerySection) return;

    galleryTab.classList.add("tab-btn", "tab-link");

    // set initial active tab now that elements exist
    setInitialActive(office, coworking, galleryTab);

    // Toggle gallery on click
    // To avoid duplicate listeners re-attaching when header is injected twice,
    // remove any previously attached simple flag
    if (!galleryTab.__novel_wired) {
      galleryTab.addEventListener("click", function (ev) {
        ev.preventDefault && ev.preventDefault();
        const isOpen = gallerySection.style.display && gallerySection.style.display !== "none";
        if (isOpen) hideGallery(true);
        else showGallery(true);
      });
      galleryTab.__novel_wired = true;
    }

    // Office / Coworking click handlers
    [office, coworking].forEach(link => {
      if (!link) return;

      // Avoid double-attach
      if (link.__novel_wired) return;

      link.addEventListener("click", function (ev) {
        // restore UI and set active
        restoreAndActivate(link);

        // if link is to same page, prevent actual navigation (treat as tab)
        try {
          const href = link.getAttribute("href") || "";
          const linkPath = normalizedPath(href);
          const currentPath = normalizedPath(location.href);

          // If normalized paths match, it's a same-page target; prevent navigation
          if (linkPath && currentPath && linkPath === currentPath) {
            ev.preventDefault && ev.preventDefault();
            if (location.hash === "#gallery") {
              try { history.replaceState(null, "", location.pathname + location.search); } catch(e) {}
            }
          }
          // else allow navigation (to another page)
        } catch (err) {
          // ignore malformed hrefs
        }
      });

      link.__novel_wired = true;
    });

    // ESC closes gallery
    if (!window.__novel_gallery_esc_wired) {
      window.addEventListener("keydown", function (ev) {
        if (ev.key === "Escape" || ev.key === "Esc") {
          const isOpen = gallerySection.style.display && gallerySection.style.display !== "none";
          if (isOpen) hideGallery(true);
        }
      });
      window.__novel_gallery_esc_wired = true;
    }

    // popstate sync (only attach once)
    if (!window.__novel_popstate_wired) {
      window.addEventListener("popstate", function (e) {
        if (e.state && e.state.novelGallery) showGallery(false);
        else hideGallery(false);
      });
      window.__novel_popstate_wired = true;
    }
  }

  // Wire now if header already present
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", wireControls);
  } else {
    wireControls();
  }

  // Re-wire when header partial is inserted (loadLocationHeader dispatches this event)
  document.addEventListener("novel:locationHeaderInserted", function () {
    // short delay to ensure DOM insertion settled
    setTimeout(wireControls, 30);
  });

})();



//=================== MORE SPACE STARTS ===================
document.addEventListener("DOMContentLoaded", () => {
  // selectors aligned with new markup
  const cardSelector = ".office-locations-grid .card";
  const swiperSelector = ".office-locations-swiper";
  const wrapperSelector = swiperSelector + " .swiper-wrapper";

  const desktopCards = Array.from(document.querySelectorAll(cardSelector));
  const swiperWrapper = document.querySelector(wrapperSelector);

  if (!desktopCards.length || !swiperWrapper) {
    // if something went wrong, still attempt to pull cards from grid OR log
    console.warn("No cards or swiper wrapper found for office-locations.");
    return;
  }

  // populate swiper with clones if empty
  if (swiperWrapper.querySelectorAll(".swiper-slide").length === 0) {
    desktopCards.forEach((card) => {
      const clone = card.cloneNode(true);
      const slide = document.createElement("div");
      slide.classList.add("swiper-slide");
      slide.appendChild(clone);
      swiperWrapper.appendChild(slide);
    });
  }

  // ensure Swiper script is loaded
  if (typeof Swiper === "undefined") {
    console.warn("Swiper not found — include swiper-bundle.min.js before this script.");
    return;
  }

  // initialize Swiper for ALL sizes; breakpoints adjust slidesPerView
  const swiper = new Swiper(swiperSelector, {
    slidesPerView: 4,
    spaceBetween: 18,
    loop: true,
    centeredSlides: false,
    grabCursor: true,
    simulateTouch: true,

    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },

    pagination: {
      el: swiperSelector + " .swiper-pagination",
      dynamicBullets: true,
      clickable: true,
    },
    navigation: {
      nextEl: swiperSelector + " .swiper-button-next",
      prevEl: swiperSelector + " .swiper-button-prev",
    },

    breakpoints: {
      0:    { slidesPerView: 1, spaceBetween: 12 },
      540:  { slidesPerView: 2, spaceBetween: 14 },
      820:  { slidesPerView: 3, spaceBetween: 16 },
      1100: { slidesPerView: 4, spaceBetween: 18 }
    },

    speed: 600,
    touchRatio: 1,
    longSwipes: true,
  });

  // expose for debugging if you want: window.officeLocationsSwiper = swiper;
});





//=================== MORE SPACE ENDS ===================
const desktopSwiper = new Swiper("#one", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: false,
        pagination: {
          el: ".desktop-pagination",
          dynamicBullets: true,
          clickable: true,
          renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + "</span>";
          },
        },
      });


/* ============================
 START — SECTION STICKY MODULE (improved: measures heights, updates spacer)
 Replace the previous sticky module in assets/js/location.js with this block
 ============================ */

(function () {
  const NAV_SELECTOR = ".navbar";
  const LOCATION_HEADER_SELECTOR = ".location-header";
  const SPACER_ID = "locationSectionSpacer";
  const HIDE_CLASS = "navbar-hidden";    // class on navbar to slide it up
  const SECTION_STICKY_CLASS = "section-sticky";
  const TRANSITION_MS = 320; // ms - match CSS transitions
  const TOP_FORCE_UNSTICK_PX = 12; // px near top force unstick
  const STICKY_OFFSET = 6; // small extra offset so sticky doesn't flicker

  const navbar = document.querySelector(NAV_SELECTOR);
  const locationHeader = document.querySelector(LOCATION_HEADER_SELECTOR);
  if (!locationHeader) return;

  // Spacer inserted after the entire section
  let spacer = document.getElementById(SPACER_ID);
  if (!spacer) {
    spacer = document.createElement("div");
    spacer.id = SPACER_ID;
    spacer.style.width = "100%";
    spacer.style.height = "0px";
    spacer.style.pointerEvents = "none";
    locationHeader.insertAdjacentElement("afterend", spacer);
  }

  function getNavbarHeight() {
    return navbar ? Math.round(navbar.getBoundingClientRect().height) : 0;
  }

  function getHeaderHeight() {
    return Math.round(locationHeader.getBoundingClientRect().height);
  }

  // update spacer height (animated via CSS)
  function setSpacerHeight(px) {
    spacer.style.height = px + "px";
  }

  // Track original header top (document coordinate) so we can know when it has
  // scrolled back to its original place. This is calculated relative to the document.
  let initialHeaderTop = locationHeader.getBoundingClientRect().top + window.scrollY;

  // scroll direction detection
  let lastScrollY = window.scrollY;

  let ticking = false;
  let isSticky = false;
  let unstickTimeout = null;

  function makeSticky() {
    if (isSticky) return;
    isSticky = true;

    // 1) fix current layout: set spacer to current header height (pre-stick)
    const beforeH = getHeaderHeight();
    spacer.classList.add("active");
    setSpacerHeight(beforeH);

    // 2) add sticky class to section (this will shrink h1 via CSS)
    // use requestAnimationFrame to ensure spacer height applied before class
    requestAnimationFrame(() => {
      locationHeader.classList.add(SECTION_STICKY_CLASS);

      // hide navbar (slide up) after small timeout so visual feels natural
      if (navbar) {
        // allow a tiny delay so browser paints the new class first
        setTimeout(() => navbar.classList.add(HIDE_CLASS), 8);
      }

      // After CSS transitions complete, set spacer to new header height (post-shrink)
      setTimeout(() => {
        const afterH = getHeaderHeight();
        setSpacerHeight(afterH);
      }, TRANSITION_MS + 20);
    });
  }

  function removeSticky() {
    if (!isSticky) return;
    isSticky = false;

    // 1) reveal navbar first (slide down)
    if (navbar) navbar.classList.remove(HIDE_CLASS);

    // 2) after navbar has slid down, remove sticky class so section returns to flow
    if (unstickTimeout) clearTimeout(unstickTimeout);
    unstickTimeout = setTimeout(() => {
      // set spacer to current header height (while still sticky) to avoid jump
      const currentH = getHeaderHeight();
      setSpacerHeight(currentH);

      // now remove sticky class to let header return to normal size
      locationHeader.classList.remove(SECTION_STICKY_CLASS);

      // after header finished expanding back, remove spacer
      setTimeout(() => {
        spacer.classList.remove("active");
        setSpacerHeight(0);

        // When we fully unstick and header returned to normal, recalc its
        // original top in case layout changed while sticky (so future unstick uses correct value).
        initialHeaderTop = locationHeader.getBoundingClientRect().top + window.scrollY;
      }, TRANSITION_MS + 20);

      unstickTimeout = null;
    }, TRANSITION_MS + 8); // wait for navbar slide down to finish
  }

  function forceImmediateUnstick() {
    if (unstickTimeout) { clearTimeout(unstickTimeout); unstickTimeout = null; }
    if (navbar) navbar.classList.remove(HIDE_CLASS);
    locationHeader.classList.remove(SECTION_STICKY_CLASS);
    spacer.classList.remove("active");
    setSpacerHeight(0);
    isSticky = false;

    // recalc original top now that we're back in normal flow
    initialHeaderTop = locationHeader.getBoundingClientRect().top + window.scrollY;
  }

  function checkSticky() {
    // If very near top of page, force immediate unstick (existing logic)
    if (window.scrollY <= TOP_FORCE_UNSTICK_PX) {
      forceImmediateUnstick();
      return;
    }

    const rect = locationHeader.getBoundingClientRect();
    const navbarHeight = getNavbarHeight();

    // Determine scroll direction
    const scrollingUp = window.scrollY < lastScrollY;

    // Compute threshold where header should snap back to original place.
    // initialHeaderTop is the document Y where header normally sits.
    // We subtract navbarHeight + STICKY_OFFSET so it lines up consistently with the sticky condition.
    const unstickThreshold = Math.max(0, Math.round(initialHeaderTop - navbarHeight - STICKY_OFFSET));

    // If header is sticky and user is scrolling up and we've reached the original spot (or above),
    // force immediate unstick so header goes back to its place (no lingering sticky).
    if (isSticky && scrollingUp && window.scrollY <= unstickThreshold) {
      forceImmediateUnstick();
      return;
    }

    // Stick when header top is below or equal to navbarHeight + small offset
    if (rect.top <= navbarHeight + STICKY_OFFSET) {
      makeSticky();
    } else {
      removeSticky();
    }
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        checkSticky();
        // update lastScrollY after check so direction is computed next frame correctly
        lastScrollY = window.scrollY;
        ticking = false;
      });
    }
  }

  function onResize() {
    // On resize we should update the original header top if we're not sticky,
    // otherwise keep it until we unstick (we update on unstick/remove).
    if (!isSticky) {
      initialHeaderTop = locationHeader.getBoundingClientRect().top + window.scrollY;
    } else {
      // While sticky update spacer height to match current sticky header height
      setSpacerHeight(getHeaderHeight());
    }
    checkSticky();
  }

  // initial run (handles mid-page reload)
  setSpacerHeight(0);
  // Recalculate original top at startup (important if loaded mid-page)
  initialHeaderTop = locationHeader.getBoundingClientRect().top + window.scrollY;
  checkSticky();

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);

  // Observe size changes (fonts, images)
  try {
    const ro = new ResizeObserver(() => {
      if (isSticky) setSpacerHeight(getHeaderHeight());
      // when size changes and we're not sticky, recalc original top
      if (!isSticky) initialHeaderTop = locationHeader.getBoundingClientRect().top + window.scrollY;
      checkSticky();
    });
    ro.observe(locationHeader);
    if (navbar) ro.observe(navbar);
  } catch (e) {
    // fallback OK
  }

  // debug helpers
  window.__novel_section_sticky = {
    forceSticky: function () { makeSticky(); },
    forceUnsticky: function () { removeSticky(); },
    forceImmediateUnstick: function () { forceImmediateUnstick(); },
    isSticky: function () { return isSticky; }
  };
})();


/* ============================
 END — SECTION STICKY MODULE
 ============================ */
