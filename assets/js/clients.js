//  ================= TRUSTED CLIENTS STARTS ================= 

const sliderTrack = document.getElementById("clientsSliderTrack");

if (sliderTrack) {
  let slides = Array.from(sliderTrack.children);
  const slideCount = slides.length;

  // Clone slides multiple times to allow seamless loop
  for (let i = 0; i < 2; i++) {
    slides.forEach((slide) => {
      const clone = slide.cloneNode(true);
      sliderTrack.appendChild(clone);
    });
  }

  // Calculate widths
  let slideWidth = slides[0].offsetWidth + 40; // width + margin. Keep this number and margin-right (.clients__slide) same.
  let totalWidth = slideWidth * slideCount;

  // Animation variables
  let position = 0;
  const speed = window.innerWidth <= 768 ? 60 : 90; // pixels per second

  function animate() {
    position += speed / 60; // approximate 60fps
    if (position >= totalWidth) {
      position -= totalWidth; // wrap seamlessly
    }
    sliderTrack.style.transform = `translateX(${-position}px)`;
    requestAnimationFrame(animate);
  }

  // Start animation
  requestAnimationFrame(animate);

  // Update widths on resize
  window.addEventListener("resize", () => {
    slides = Array.from(sliderTrack.children).slice(0, slideCount);
    slideWidth = slides[0].offsetWidth + 40;
    totalWidth = slideWidth * slideCount;
  });
}

//  ================= TRUSTED CLIENTS ENDS ================= 
