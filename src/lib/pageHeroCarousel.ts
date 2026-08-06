export function initPageHeroCarousels() {

  document.querySelectorAll<HTMLElement>("[data-page-hero]").forEach((hero) => {

    const slides = Array.from(hero.querySelectorAll<HTMLImageElement>("[data-hero-slide]"));
    const dots = Array.from(hero.querySelectorAll<HTMLButtonElement>("[data-hero-dot]"));

    if (slides.length <= 1) {
      return;
    }

    let index = 0;

    function render() {
      slides.forEach((slide, i) => {
        slide.classList.toggle("opacity-100", i === index);
        slide.classList.toggle("opacity-0", i !== index);
        slide.classList.toggle("pointer-events-none", i !== index);
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle("bg-white", i === index);
        dot.classList.toggle("bg-white/40", i !== index);
      });
    }

    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        index = i;
        render();
      });
    });

    let touchStartX = 0;

    hero.addEventListener("touchstart", (event) => {
      touchStartX = event.touches[0].clientX;
    }, { passive: true });

    hero.addEventListener("touchend", (event) => {
      const deltaX = event.changedTouches[0].clientX - touchStartX;
      const threshold = 40;

      if (deltaX > threshold) {
        index = (index - 1 + slides.length) % slides.length;
        render();
      } else if (deltaX < -threshold) {
        index = (index + 1) % slides.length;
        render();
      }
    }, { passive: true });

  });

}
