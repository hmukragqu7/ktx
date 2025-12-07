// ========== INFINITE SCROLLER ==========
const sliderTrack2 = document.getElementById("lookInsideTrack");

if (sliderTrack2) {
  let slides2 = Array.from(sliderTrack2.children);
  const slideCount2 = slides2.length;

  // Clone slides2 to allow seamless loop
  for (let i = 0; i < 2; i++) {
    slides2.forEach((slide) => {
      const clone = slide.cloneNode(true);
      sliderTrack2.appendChild(clone);
    });
  }

  // Calculate widths
  let slideWidth2 = slides2[0].offsetWidth + 20; // width + gap
  let totalWidth2 = slideWidth2 * slideCount2;

  let position2 = 0;
  const speed2 = window.innerWidth <= 768 ? 60 : 90; // pixels per second

  function animate() {
    position2 += speed2 / 60;
    if (position2 >= totalWidth2) {
      position2 -= totalWidth2;
    }
    sliderTrack2.style.transform = `translateX(${-position2}px)`;
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);

  window.addEventListener("resize", () => {
    slides2 = Array.from(sliderTrack2.children).slice(0, slideCount2);
    slideWidth2 = slides2[0].offsetWidth + 20;
    totalWidth2 = slideWidth2 * slideCount2;
  });
}
// ========== END SCROLLER ==========
