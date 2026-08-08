const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Chromium's native <dialog> focus containment can let focus fall through to
// <body> when Tab-ing past the last (or Shift+Tab-ing past the first)
// focusable element instead of wrapping back around — confirmed via
// automated keyboard testing on this site's modals. This manually enforces
// the wrap so keyboard focus can never escape an open dialog.
export function trapTabFocus(dialog: HTMLDialogElement) {
  dialog.addEventListener("keydown", (event) => {
    if (event.key !== "Tab") return;

    const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
      (el) => el.offsetParent !== null
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
}
