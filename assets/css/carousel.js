/**
 * 首页轮播：自动播放、指示点、前后按钮
 */
(function () {
  const root = document.querySelector("[data-carousel]");
  if (!root) return;

  const slides = Array.from(root.querySelectorAll(".carousel-slide"));
  const dots = Array.from(root.querySelectorAll(".carousel-dots button"));
  const prev = root.querySelector(".carousel-prev");
  const next = root.querySelector(".carousel-next");
  let index = 0;
  let timer = null;
  const interval = 5500;

  function go(i) {
    index = (i + slides.length) % slides.length;
    slides.forEach((s, j) => {
      s.classList.toggle("active", j === index);
      s.setAttribute("aria-hidden", j === index ? "false" : "true");
    });
    dots.forEach((d, j) => d.setAttribute("aria-current", j === index ? "true" : "false"));
  }

  function nextSlide() {
    go(index + 1);
  }

  function prevSlide() {
    go(index - 1);
  }

  function resetTimer() {
    if (timer) clearInterval(timer);
    timer = setInterval(nextSlide, interval);
  }

  if (next) {
    next.addEventListener("click", () => {
      nextSlide();
      resetTimer();
    });
  }
  if (prev) {
    prev.addEventListener("click", () => {
      prevSlide();
      resetTimer();
    });
  }

  dots.forEach((dot, j) => {
    dot.addEventListener("click", () => {
      go(j);
      resetTimer();
    });
  });

  root.addEventListener("mouseenter", () => timer && clearInterval(timer));
  root.addEventListener("mouseleave", resetTimer);

  go(0);
  resetTimer();
})();
