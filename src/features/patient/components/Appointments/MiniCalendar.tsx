import { useMemo, useState } from "react";

import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import type {
  CalendarEvent,
} from "../../types/appointment.types";

import {
  CALENDAR_EVENT_COLORS,
} from "./appointment.constants";

interface MiniCalendarProps {
  events: CalendarEvent[];

  selectedDate?: string;

  onDateSelect?: (
    date: string
  ) => void;
}

const DAYS = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

const MiniCalendar = ({
  events,
  selectedDate,
  onDateSelect,
}: MiniCalendarProps) => {
  const [currentMonth, setCurrentMonth] =
    useState(new Date());

  const year =
    currentMonth.getFullYear();

  const month =
    currentMonth.getMonth();

  const monthName =
    currentMonth.toLocaleString(
      "default",
      {
        month: "long",
      }
    );

  const firstDay =
    new Date(
      year,
      month,
      1
    ).getDay();

  const totalDays =
    new Date(
      year,
      month + 1,
      0
    ).getDate();

  const eventMap = useMemo(() => {
    const map = new Map<
      string,
      CalendarEvent
    >();

    events.forEach((event) => {
      map.set(event.date, event);
    });

    return map;
  }, [events]);

  const previousMonth = () =>
    setCurrentMonth(
      new Date(
        year,
        month - 1,
        1
      )
    );

  const nextMonth = () =>
    setCurrentMonth(
      new Date(
        year,
        month + 1,
        1
      )
    );

  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-[30px]
        border
        border-white/30
        bg-gradient-to-br
        from-cyan-500/5
        via-white/70
        to-violet-500/5
        p-6
        shadow-[0_15px_40px_rgba(15,23,42,.06)]
        backdrop-blur-2xl
        dark:bg-white/5
      "
    >
      {/* Ambient Glow */}

      <div
        className="
          absolute
          -right-16
          -top-16
          h-40
          w-40
          rounded-full
          bg-cyan-400/10
          blur-3xl
        "
      />

      <div
        className="
          absolute
          -bottom-16
          -left-16
          h-40
          w-40
          rounded-full
          bg-violet-400/10
          blur-3xl
        "
      />

      <div className="relative">

        {/* Header */}

        <div className="mb-6 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-br
                from-cyan-500/20
                to-violet-500/20
                backdrop-blur-xl
              "
            >
              <CalendarDays
                size={22}
                className="text-primary"
              />
            </div>

            <div>

              <p
                className="
                  text-xs
                  font-medium
                  uppercase
                  tracking-[0.18em]
                  text-on-surface-variant
                "
              >
                Appointment Calendar
              </p>

              <h3
                className="
                  mt-1
                  text-xl
                  font-bold
                  text-on-background
                "
              >
                {monthName} {year}
              </h3>

            </div>

          </div>

          <div className="flex gap-2">

            <button
              onClick={previousMonth}
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-2xl
                border
                border-cyan-200/40
                bg-cyan-500/10
                backdrop-blur-xl
                transition-all
                hover:scale-105
                hover:bg-cyan-500/20
              "
            >
              <ChevronLeft
                size={18}
                className="text-cyan-700"
              />
            </button>

            <button
              onClick={nextMonth}
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-2xl
                border
                border-violet-200/40
                bg-violet-500/10
                backdrop-blur-xl
                transition-all
                hover:scale-105
                hover:bg-violet-500/20
              "
            >
              <ChevronRight
                size={18}
                className="text-violet-700"
              />
            </button>

          </div>

        </div>

        {/* Week Days */}

        <div
          className="
            mb-4
            grid
            grid-cols-7
            gap-2
          "
        >
          {DAYS.map((day) => (
            <div
              key={day}
              className="
                text-center
                text-[11px]
                font-semibold
                uppercase
                tracking-wider
                text-on-surface-variant
              "
            >
              {day}
            </div>
          ))}
        </div>

        {/* Dates */}

        <div
          className="
            grid
            grid-cols-7
            gap-2
          "
        >
          {Array.from({
            length: firstDay,
          }).map((_, index) => (
            <div
              key={index}
              className="h-11"
            />
          ))}
                    {Array.from({
            length: totalDays,
          }).map((_, index) => {
            const day = index + 1;

            const date = `${year}-${String(
              month + 1
            ).padStart(2, "0")}-${String(
              day
            ).padStart(2, "0")}`;

            const event =
              eventMap.get(date);

            const isSelected =
              selectedDate === date;

            return (
              <button
                key={day}
                onClick={() =>
                  onDateSelect?.(date)
                }
                className={`
                  relative
                  flex
                  h-11
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  text-sm
                  font-semibold
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:scale-[1.04]

                  ${
                    isSelected
                      ? `
                        border-cyan-300/50
                        bg-gradient-to-br
                        from-cyan-500/25
                        to-violet-500/20
                        text-cyan-700
                        shadow-lg
                        backdrop-blur-xl
                      `
                      : event
                      ? event.status === "Upcoming"
                        ? `
                          border-cyan-300/40
                          bg-cyan-500/18
                          text-cyan-700
                          backdrop-blur-xl
                        `
                        : event.status === "Completed"
                        ? `
                          border-emerald-300/40
                          bg-emerald-500/18
                          text-emerald-700
                          backdrop-blur-xl
                        `
                        : event.status === "Cancelled"
                        ? `
                          border-rose-300/40
                          bg-rose-500/18
                          text-rose-700
                          backdrop-blur-xl
                        `
                        : `
                          border-violet-300/40
                          bg-violet-500/18
                          text-violet-700
                          backdrop-blur-xl
                        `
                      : `
                        border-transparent
                        text-on-background
                        hover:border-primary/20
                        hover:bg-primary/8
                      `
                  }
                `}
              >
                {day}
              </button>
            );
          })}
        </div>

        {/* Legend */}

        <div
          className="
            mt-6
            flex
            flex-wrap
            gap-2
          "
        >
          {[
            {
              label: "Upcoming",
              style:
                "border-cyan-300/40 bg-cyan-500/15 text-cyan-700",
            },
            {
              label: "Completed",
              style:
                "border-emerald-300/40 bg-emerald-500/15 text-emerald-700",
            },
            {
              label: "Cancelled",
              style:
                "border-rose-300/40 bg-rose-500/15 text-rose-700",
            },
            {
              label: "Rescheduled",
              style:
                "border-violet-300/40 bg-violet-500/15 text-violet-700",
            },
          ].map((item) => (
            <span
              key={item.label}
              className={`
                rounded-full
                border
                px-3
                py-1
                text-[11px]
                font-medium
                backdrop-blur-xl
                ${item.style}
              `}
            >
              {item.label}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
};

export default MiniCalendar;