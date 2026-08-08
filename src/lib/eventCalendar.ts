import {
  buildMonthGrid,
  getMonthLabel,
  getUpcomingEvents,
  getWeekBars,
  formatEventDate,
  formatEventTime,
  WEEKDAY_LABELS,
  type CalendarDay,
  type CalendarEvent
} from "./calendar";

interface EventCalendarOptions {
  showUpcoming?: boolean;
  onSelect: (event: CalendarEvent) => void;
}

const ARROW_LEFT_PATH = "M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18";
const ARROW_RIGHT_PATH = "M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3";

function iconSvg(path: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="h-4 w-4" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="${path}" /></svg>`;
}

export function initEventCalendar(container: HTMLElement, events: CalendarEvent[], options: EventCalendarOptions) {

  const { showUpcoming = false, onSelect } = options;

  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();

  container.innerHTML = `
    <div class="${showUpcoming ? "lg:flex lg:items-start lg:gap-10" : ""}">

      <div class="${showUpcoming ? "lg:flex-[3]" : ""}">
        <div class="flex items-center justify-between">
          <button type="button" data-cal-prev aria-label="Vorheriger Monat" class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">${iconSvg(ARROW_LEFT_PATH)}</button>
          <h3 data-cal-label aria-live="polite" class="text-lg font-bold text-gray-900 dark:text-gray-100"></h3>
          <button type="button" data-cal-next aria-label="Nächster Monat" class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">${iconSvg(ARROW_RIGHT_PATH)}</button>
        </div>
        <div data-cal-weekdays class="mt-4 grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-500 dark:text-gray-400"></div>
        <div data-cal-grid class="mt-1 space-y-1"></div>
      </div>

      ${showUpcoming ? `
        <div class="mt-8 lg:mt-0 lg:flex-[2]">
          <h4 class="text-sm font-semibold text-gray-900 dark:text-gray-100">Nächste Termine</h4>
          <div data-cal-upcoming class="mt-3 divide-y divide-gray-100 dark:divide-gray-800"></div>
        </div>
      ` : ""}

    </div>
  `;

  const labelEl = container.querySelector<HTMLElement>("[data-cal-label]");
  const weekdaysEl = container.querySelector<HTMLElement>("[data-cal-weekdays]");
  const gridEl = container.querySelector<HTMLElement>("[data-cal-grid]");
  const upcomingEl = container.querySelector<HTMLElement>("[data-cal-upcoming]");
  const prevButton = container.querySelector<HTMLElement>("[data-cal-prev]");
  const nextButton = container.querySelector<HTMLElement>("[data-cal-next]");

  if (weekdaysEl) {
    weekdaysEl.innerHTML = WEEKDAY_LABELS.map((label) => `<div>${label}</div>`).join("");
  }

  function renderWeek(week: CalendarDay[], bars: ReturnType<typeof getWeekBars>, barRowCount: number): HTMLElement {

    const barRowHeight = "1rem";

    const weekGrid = document.createElement("div");
    weekGrid.className = "grid grid-cols-7 gap-1";
    weekGrid.style.gridTemplateRows = `auto repeat(${barRowCount}, ${barRowHeight})`;

    week.forEach((day, dayIndex) => {

      const cell = document.createElement("div");
      cell.style.gridColumn = String(dayIndex + 1);
      cell.style.gridRow = "1";
      cell.className = day.inMonth ? "" : "opacity-30";

      const dateNumber = document.createElement("span");
      dateNumber.className = day.isToday
        ? "flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-white"
        : "flex h-5 w-5 items-center justify-center text-xs font-semibold text-gray-700 dark:text-gray-300";
      dateNumber.textContent = String(day.date.getDate());
      cell.appendChild(dateNumber);

      weekGrid.appendChild(cell);

    });

    bars.forEach((bar) => {

      const barEl = document.createElement("button");
      barEl.type = "button";
      barEl.style.gridColumn = `${bar.startCol + 1} / ${bar.endCol + 2}`;
      barEl.style.gridRow = String(bar.row + 2);
      barEl.className = [
        "cursor-pointer truncate bg-primary/15 px-2 text-left text-[11px] font-medium text-primary-dark dark:text-primary transition hover:bg-primary/25",
        bar.continuesBefore ? "" : "rounded-l",
        bar.continuesAfter ? "" : "rounded-r"
      ].filter(Boolean).join(" ");
      barEl.textContent = bar.event.title;
      // The bar's grid position conveys the date visually; a screen reader
      // linearizes it away, so state the date explicitly for that audience.
      barEl.setAttribute("aria-label", `${bar.event.title}, ${formatEventDate(bar.event.start)}`);
      barEl.addEventListener("click", () => onSelect(bar.event));

      weekGrid.appendChild(barEl);

    });

    return weekGrid;

  }

  function renderGrid() {

    if (labelEl) labelEl.textContent = getMonthLabel(year, month);
    if (!gridEl) return;

    gridEl.innerHTML = "";
    gridEl.className = "mt-1 space-y-1";

    const weeks = buildMonthGrid(year, month, events);
    const weekBars = weeks.map((week) => getWeekBars(week, events));

    const maxBarRows = Math.max(
      1,
      ...weekBars.map((bars) => bars.reduce((max, bar) => Math.max(max, bar.row + 1), 0))
    );

    weeks.forEach((week, index) => {

      gridEl.appendChild(renderWeek(week, weekBars[index], maxBarRows));

    });

    if (showUpcoming) {
      renderUpcoming();
    }

  }

  function renderUpcoming() {

    if (!upcomingEl) return;

    upcomingEl.innerHTML = "";

    const upcoming = getUpcomingEvents(events, 5);

    if (upcoming.length === 0) {
      const empty = document.createElement("p");
      empty.className = "text-sm text-gray-500 dark:text-gray-400";
      empty.textContent = "Aktuell sind keine Veranstaltungen geplant.";
      upcomingEl.appendChild(empty);
      return;
    }

    upcoming.forEach((event) => {

      const item = document.createElement("button");
      item.type = "button";
      item.className = "group flex w-full cursor-pointer items-center justify-between gap-3 py-3 text-left transition";

      const textWrap = document.createElement("span");
      textWrap.className = "flex min-w-0 flex-col items-start gap-0.5";

      const titleEl = document.createElement("span");
      titleEl.className = "text-sm font-semibold text-gray-900 dark:text-gray-100 transition group-hover:text-primary";
      titleEl.textContent = event.title;

      const meta = document.createElement("span");
      meta.className = "text-xs text-gray-500 dark:text-gray-400";
      meta.textContent = `${formatEventDate(event.start)} · ${formatEventTime(event.start)} Uhr`;

      textWrap.append(titleEl, meta);

      const arrow = document.createElement("span");
      arrow.className = "shrink-0 text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-primary dark:text-gray-600";
      arrow.innerHTML = iconSvg(ARROW_RIGHT_PATH);

      item.append(textWrap, arrow);
      item.addEventListener("click", () => onSelect(event));

      upcomingEl.appendChild(item);

    });

  }

  prevButton?.addEventListener("click", () => {
    month -= 1;
    if (month < 0) {
      month = 11;
      year -= 1;
    }
    renderGrid();
  });

  nextButton?.addEventListener("click", () => {
    month += 1;
    if (month > 11) {
      month = 0;
      year += 1;
    }
    renderGrid();
  });

  renderGrid();

}
