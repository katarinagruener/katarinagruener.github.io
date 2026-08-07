export interface GalleryImage {
  src: string;
  alt: string;
}

export function initPhotoLightbox() {

  const dialog = document.querySelector<HTMLDialogElement>("#photo-lightbox");
  const image = document.querySelector<HTMLImageElement>("#lightbox-image");
  const counter = document.querySelector<HTMLElement>("#lightbox-counter");

  if (!dialog || !image) {
    return null;
  }

  let images: GalleryImage[] = [];
  let currentIndex = 0;

  function show(index: number) {
    currentIndex = (index + images.length) % images.length;
    const current = images[currentIndex];
    image!.src = current.src;
    image!.alt = current.alt;
    if (counter) counter.textContent = `${currentIndex + 1} / ${images.length}`;
  }

  dialog.querySelector("[data-lightbox-close]")?.addEventListener("click", () => dialog.close());
  dialog.querySelector("[data-lightbox-prev]")?.addEventListener("click", () => show(currentIndex - 1));
  dialog.querySelector("[data-lightbox-next]")?.addEventListener("click", () => show(currentIndex + 1));

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });

  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") show(currentIndex - 1);
    if (event.key === "ArrowRight") show(currentIndex + 1);
  });

  function open(newImages: GalleryImage[], index: number) {
    images = newImages;
    show(index);
    dialog!.showModal();
  }

  return { open };

}
