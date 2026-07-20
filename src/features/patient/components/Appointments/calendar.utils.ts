import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";

export type CalendarStatus =
  | "Upcoming"
  | "Completed"
  | "Cancelled"
  | "Rescheduled";

export interface CalendarEvent {
  date: string;
  status: CalendarStatus;
}

export const getCalendarDays = (
  currentMonth: Date
) => {
  const monthStart =
    startOfMonth(currentMonth);

  const monthEnd =
    endOfMonth(currentMonth);

  const startDate =
    startOfWeek(monthStart, {
      weekStartsOn: 1,
    });

  const endDate =
    endOfWeek(monthEnd, {
      weekStartsOn: 1,
    });

  return eachDayOfInterval({
    start: startDate,
    end: endDate,
  });
};

export const getEvent = (
  date: Date,
  events: CalendarEvent[]
) =>
  events.find((event) =>
    isSameDay(new Date(event.date), date)
  );

export const isToday = (
  date: Date
) => isSameDay(date, new Date());

export const isCurrentMonth = (
  date: Date,
  currentMonth: Date
) =>
  isSameMonth(date, currentMonth);

export const formatDay = (
  date: Date
) => format(date, "d");

export const previousMonth = (
  currentMonth: Date
) => subMonths(currentMonth, 1);

export const nextMonth = (
  currentMonth: Date
) => addMonths(currentMonth, 1);