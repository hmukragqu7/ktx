const buttons = document.querySelectorAll(".wave-btn");

buttons.forEach(btn => {
  const circles = btn.querySelectorAll(".wave-btn__circle");

  const tl = gsap.timeline({
    paused: true,
    defaults: { duration: 1 }
  });

  // Animate circles for all buttons
  tl.to(circles, {
    scale: 2.8,
    y: -40,
    opacity: 1,
    stagger: { each: 0.1, from: "start" }
  }, 0);

  // 🔥 Only apply the label color animation if button contains .white class
  if (btn.classList.contains("white")) {
    const label = btn.querySelector(".wave-btn__label");

    tl.fromTo(label, {
      color: "#39b3ba"
    }, {
      color: "#ffffff",
      duration: 1
    }, 0);
  }

  btn.addEventListener("mouseenter", () => {
    tl.timeScale(1).play();
  });

  btn.addEventListener("mouseleave", () => {
    tl.timeScale(1.3).reverse();
  });
});
