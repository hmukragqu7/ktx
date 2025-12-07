//  ================= HERO STARTS ================= 

const imgUrls = [
  "./wp-content/uploads/2025/12/tailor-made-office-space.webp",
  "./wp-content/uploads/2025/12/fast-setup-office-space.webp",
  "./wp-content/uploads/2025/12/customizable-office-space-solutions.webp",
  "./wp-content/uploads/2025/12/fully-managed-workspace-services.webp",
  "./wp-content/uploads/2025/12/flexible-workspace-plans.webp",
  "./wp-content/uploads/2025/12/flexible-office-space-bangalore.webp",
  "./wp-content/uploads/2025/12/hassle-free-office-setup.webp",
  "./wp-content/uploads/2025/12/plug-and-play-office-space.webp",
  "./wp-content/uploads/2025/12/managed-office-space-bangalore.webp",
  "./wp-content/uploads/2025/12/modern-flexible-workspace-design.webp",  
  "./wp-content/uploads/2025/12/premium-managed-office-space.webp",
  "./wp-content/uploads/2025/12/scalable-flexible-office-solutions.webp",
  "./wp-content/uploads/2025/12/ready-to-move-office-space.webp",
];

let mobileSwiper = null;

function initDesktopGSAP() {
  gsap.registerPlugin(ScrollTrigger);
  const stage = document.getElementById("imageStage");
  stage.innerHTML = "";

  const cards = imgUrls.map((url) => {
    const d = document.createElement("div");
    d.className = "img-card";
    d.innerHTML = `<img src="${url}">`;
    stage.appendChild(d);
    return d;
  });

  gsap.killTweensOf("#scrollLine");
  gsap.set("#scrollLine", { scaleY: 1 });

  gsap.to("#scrollLine", {
    scaleY: 0.6,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    duration: 1,
    transformOrigin: "top",
  });

  const tl = gsap.timeline({ defaults: { ease: "power1.out" } });

  // Animate batches like original
  function addEntry(group) {
    gsap.set(group, { y: window.innerHeight, opacity: 1 });
    tl.to(group, { y: 0, duration: 40, ease: "power1.out" }, ">");
  }

  addEntry(cards.slice(0, 4));
  addEntry(cards.slice(4, 8));
  addEntry(cards.slice(8, 13)); // last batch includes 13th card

  // Fade out text
  tl.to(
    [".hero-heading", "#scrollLine", ".desktop-hero p"],
    { autoAlpha: 0, duration: 10.5 },
    ">0"
  );

  // Spread layout with 13th card in center
  const colCount = 5;
  const colWidth = 320;
  const rowHeight = 390;
  const layout = [3, 2, 3, 2, 3];
  let index = 0;
  const targets = [];

  // Compute positions for first 12 cards (skip center for 13th)
  for (let col = 0; col < colCount; col++) {
    const count = layout[col];
    for (let r = 0; r < count; r++) {
      if (index >= cards.length - 1) break; // last card is center
      if (col === 2 && r === 1) continue; // reserve center
      const x = (col - 2) * colWidth;
      const y = (count === 3 ? r - 1 : r - 0.5) * rowHeight;
      targets.push({ card: cards[index], x, y });
      index++;
    }
  }

  // 13th card in center
  targets.push({ card: cards[12], x: 0, y: 0 });

  // Animate all cards to final positions
  tl.to(
    targets.map((t) => t.card),
    {
      x: (i) => targets[i].x,
      y: (i) => targets[i].y,
      scale: 1,
      rotation: 0,
      opacity: 1,
      duration: 150,
      ease: "power1.out",
    },
    ">0.9"
  );

  ScrollTrigger.create({
    animation: tl,
    trigger: "#heroSection",
    start: "top top",
    end: "+=2500",
    scrub: 4,
    pin: true,
  });
}

function initMobileSwiper() {
  const swiperWrapper = document.getElementById("swiperWrapper");
  swiperWrapper.innerHTML = "";

  imgUrls.forEach((url) => {
    const slide = document.createElement("div");
    slide.className = "swiper-slide";
    slide.innerHTML = `<img src="${url}" />`;
    swiperWrapper.appendChild(slide);
  });

  mobileSwiper = new Swiper("#mobileSwiper", {
    loop: true,
    slidesPerView: 1,
    grabCursor: true,
    spaceBetween: 20,
    speed: 800,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
  });
}

function handleResponsive() {
  const isMobile = window.innerWidth < 768;

  if (isMobile) {
    ScrollTrigger.getAll().forEach((st) => st.kill());
    document.getElementById("imageStage").innerHTML = "";
    if (!mobileSwiper) initMobileSwiper();
  } else {
    if (mobileSwiper) {
      mobileSwiper.destroy(true, true);
      mobileSwiper = null;
    }
    ScrollTrigger.getAll().forEach((st) => st.kill());
    initDesktopGSAP();
  }
}

handleResponsive();
window.addEventListener("resize", handleResponsive);

//  ================= HERO ENDS ================= 
