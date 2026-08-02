import type { GalleryImage } from "./photoLightbox";

export function initPhotoCarousels(onOpen: (images: GalleryImage[], index: number) => void) {

  document.querySelectorAll<HTMLElement>("[data-photo-carousel]").forEach((carousel) => {

    const id = carousel.getAttribute("data-photo-carousel");
    const dataEl = document.querySelector(`#photo-gallery-data-${id}`);
    const images: GalleryImage[] = dataEl?.textContent ? JSON.parse(dataEl.textContent) : [];

    if (images.length === 0) {
      return;
    }

    let index = 0;

    const img = carousel.querySelector<HTMLImageElement>("[data-carousel-img]");
    const imageButton = carousel.querySelector<HTMLElement>("[data-carousel-image]");
    const dots = Array.from(carousel.querySelectorAll<HTMLButtonElement>("[data-carousel-dot]"));

    function render() {
      if (img) {
        img.src = images[index].src;
        img.alt = images[index].alt;
      }
      dots.forEach((dot, i) => {
        dot.classList.toggle("bg-white", i === index);
        dot.classList.toggle("bg-white/40", i !== index);
      });
    }

    carousel.querySelector("[data-carousel-prev]")?.addEventListener("click", (event) => {
      event.stopPropagation();
      index = (index - 1 + images.length) % images.length;
      render();
    });

    carousel.querySelector("[data-carousel-next]")?.addEventListener("click", (event) => {
      event.stopPropagation();
      index = (index + 1) % images.length;
      render();
    });

    dots.forEach((dot, i) => {
      dot.addEventListener("click", (event) => {
        event.stopPropagation();
        index = i;
        render();
      });
    });

    let touchStartX = 0;

    carousel.addEventListener("touchstart", (event) => {
      touchStartX = event.touches[0].clientX;
    }, { passive: true });

    carousel.addEventListener("touchend", (event) => {
      const deltaX = event.changedTouches[0].clientX - touchStartX;
      const threshold = 40;

      if (deltaX > threshold) {
        index = (index - 1 + images.length) % images.length;
        render();
      } else if (deltaX < -threshold) {
        index = (index + 1) % images.length;
        render();
      }
    }, { passive: true });

    imageButton?.addEventListener("click", () => onOpen(images, index));

    render();

  });

}
