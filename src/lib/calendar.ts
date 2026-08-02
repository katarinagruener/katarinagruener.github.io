export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  start: Date;
  end?: Date;
  location?: {
    name: string;
    street?: string;
    zip?: string;
    city?: string;
  };
  admission?: string[];
  image?: {
    src: string;
    width: number;
    height: number;
  };
}

export interface CalendarDay {
  date: Date;
  inMonth: boolean;
  isToday: boolean;
  events: CalendarEvent[];
}

export const WEEKDAY_LABELS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

const MONTH_LABELS = [
  "Januar", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember"
];

export function getMonthLabel(year: number, month: number): string {
  return `${MONTH_LABELS[month]} ${year}`;
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function startOfDay(date: Date): Date {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function occursOnDay(event: CalendarEvent, date: Date): boolean {
  const day = startOfDay(date).getTime();
  const start = startOfDay(event.start).getTime();
  const end = startOfDay(event.end ?? event.start).getTime();
  return day >= start && day <= end;
}

export function buildMonthGrid(year: number, month: number, events: CalendarEvent[]): CalendarDay[][] {

  const firstOfMonth = new Date(year, month, 1);
  // getDay(): 0 = Sunday .. 6 = Saturday. Shift so the week starts on Monday.
  const firstWeekday = (firstOfMonth.getDay() + 6) % 7;
  const today = startOfDay(new Date());

  const cursor = new Date(year, month, 1 - firstWeekday);
  const weeks: CalendarDay[][] = [];

  for (let week = 0; week < 6; week++) {

    const days: CalendarDay[] = [];

    for (let day = 0; day < 7; day++) {

      const date = new Date(cursor);

      days.push({
        date,
        inMonth: date.getMonth() === month,
        isToday: isSameDay(date, today),
        events: events
          .filter((event) => occursOnDay(event, date))
          .sort((a, b) => a.start.getTime() - b.start.getTime())
      });

      cursor.setDate(cursor.getDate() + 1);

    }

    weeks.push(days);

  }

  return weeks;

}

export interface WeekBar {
  event: CalendarEvent;
  startCol: number;
  endCol: number;
  continuesBefore: boolean;
  continuesAfter: boolean;
  row: number;
}

/**
 * Lays out every event overlapping this week as a bar spanning its day columns (0-6).
 * A single-day event simply gets startCol === endCol (one cell wide) — same mechanism
 * as a multi-day event, just narrower, so both render identically.
 */
export function getWeekBars(week: CalendarDay[], events: CalendarEvent[]): WeekBar[] {

  const dayMs = 24 * 60 * 60 * 1000;
  const weekStart = startOfDay(week[0].date).getTime();
  const weekEnd = startOfDay(week[6].date).getTime();

  const bars: WeekBar[] = [];

  events.forEach((event) => {

    const eventStart = startOfDay(event.start).getTime();
    const eventEnd = startOfDay(event.end ?? event.start).getTime();

    if (eventEnd < weekStart || eventStart > weekEnd) return;

    const startCol = eventStart <= weekStart ? 0 : Math.round((eventStart - weekStart) / dayMs);
    const endCol = eventEnd >= weekEnd ? 6 : Math.round((eventEnd - weekStart) / dayMs);

    bars.push({
      event,
      startCol,
      endCol,
      continuesBefore: eventStart < weekStart,
      continuesAfter: eventEnd > weekEnd,
      row: 0
    });

  });

  bars.sort((a, b) => a.startCol - b.startCol);

  const rowEnds: number[] = [];

  bars.forEach((bar) => {
    let row = 0;
    while (rowEnds[row] !== undefined && rowEnds[row] >= bar.startCol) {
      row++;
    }
    bar.row = row;
    rowEnds[row] = bar.endCol;
  });

  return bars;

}

export function getUpcomingEvents(events: CalendarEvent[], count: number, from: Date = new Date()): CalendarEvent[] {

  const cutoff = startOfDay(from);

  return events
    .filter((event) => (event.end ?? event.start).getTime() >= cutoff.getTime())
    .sort((a, b) => a.start.getTime() - b.start.getTime())
    .slice(0, count);

}

export function formatEventDate(date: Date): string {
  return date.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export function formatEventTime(date: Date): string {
  return date.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });
}

export function parseCalendarEvent(raw: any): CalendarEvent {
  return {
    ...raw,
    start: new Date(raw.start),
    end: raw.end ? new Date(raw.end) : undefined
  };
}
