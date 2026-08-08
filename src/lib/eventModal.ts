import { formatEventDate, formatEventTime, type CalendarEvent } from "./calendar";
import { trapTabFocus } from "./focusTrap";

function formatDateTime(date: Date): string {
  return `${formatEventDate(date)}, ${formatEventTime(date)} Uhr`;
}

function formatAddress(location: NonNullable<CalendarEvent["location"]>): string {
  return [location.street, [location.zip, location.city].filter(Boolean).join(" ")]
    .filter(Boolean)
    .join(", ");
}

export function initEventModal() {

  const dialogEl = document.querySelector<HTMLDialogElement>("#event-modal");

  if (!dialogEl) {
    return null;
  }

  const dialog = dialogEl;

  const imageWrap = dialog.querySelector<HTMLElement>("#event-modal-image-wrap");
  const image = dialog.querySelector<HTMLImageElement>("#event-modal-image");
  const title = dialog.querySelector<HTMLElement>("#event-modal-title");
  const start = dialog.querySelector<HTMLElement>("#event-modal-start");
  const endRow = dialog.querySelector<HTMLElement>("#event-modal-end-row");
  const end = dialog.querySelector<HTMLElement>("#event-modal-end");
  const description = dialog.querySelector<HTMLElement>("#event-modal-description");
  const locationWrap = dialog.querySelector<HTMLElement>("#event-modal-location");
  const locationName = dialog.querySelector<HTMLElement>("#event-modal-location-name");
  const locationAddress = dialog.querySelector<HTMLElement>("#event-modal-location-address");
  const admissionWrap = dialog.querySelector<HTMLElement>("#event-modal-admission");
  const closeButtons = dialog.querySelectorAll<HTMLElement>("[data-event-modal-close]");

  trapTabFocus(dialog);

  closeButtons.forEach((button) => {
    button.addEventListener("click", () => dialog.close());
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });

  function open(calendarEvent: CalendarEvent) {

    if (title) title.textContent = calendarEvent.title;
    if (start) start.textContent = formatDateTime(calendarEvent.start);

    if (calendarEvent.end) {
      endRow?.classList.remove("hidden");
      if (end) end.textContent = formatDateTime(calendarEvent.end);
    } else {
      endRow?.classList.add("hidden");
    }

    if (description) {
      if (calendarEvent.description) {
        description.textContent = calendarEvent.description;
        description.classList.remove("hidden");
      } else {
        description.classList.add("hidden");
      }
    }

    if (calendarEvent.location) {
      locationWrap?.classList.remove("hidden");
      if (locationName) locationName.textContent = calendarEvent.location.name;

      const address = formatAddress(calendarEvent.location);
      if (locationAddress) {
        locationAddress.textContent = address;
        locationAddress.classList.toggle("hidden", !address);
      }
    } else {
      locationWrap?.classList.add("hidden");
    }

    if (admissionWrap) {
      admissionWrap.innerHTML = "";
      calendarEvent.admission?.forEach((line) => {
        const p = document.createElement("p");
        p.textContent = line;
        admissionWrap.appendChild(p);
      });
      admissionWrap.classList.toggle("hidden", !calendarEvent.admission?.length);
    }

    if (imageWrap && image) {
      if (calendarEvent.image) {
        image.src = calendarEvent.image.src;
        image.alt = calendarEvent.title;
        imageWrap.classList.remove("hidden");
      } else {
        imageWrap.classList.add("hidden");
      }
    }

    dialog.showModal();

  }

  return { open };

}
