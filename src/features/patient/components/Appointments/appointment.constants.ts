import {
  CalendarClock,
  CheckCircle2,
  XCircle,
  RotateCcw,
  CalendarDays,
} from "lucide-react";

import type {
  AppointmentStatus,
} from "../../types/appointment.types";

/* =========================================================
   Appointment Status
========================================================= */

export const APPOINTMENT_STATUS = [
  "Upcoming",
  "Completed",
  "Cancelled",
  "Rescheduled",
] as const;

/* =========================================================
   Status Badge Colors
========================================================= */

export const STATUS_STYLES: Record<
  AppointmentStatus,
  string
> = {
  Upcoming:
    "bg-cyan-500/10 text-cyan-700 border-cyan-300 dark:text-cyan-300 dark:border-cyan-500/30",

  Completed:
    "bg-emerald-500/10 text-emerald-700 border-emerald-300 dark:text-emerald-300 dark:border-emerald-500/30",

  Cancelled:
    "bg-red-500/10 text-red-700 border-red-300 dark:text-red-300 dark:border-red-500/30",

  Rescheduled:
    "bg-violet-500/10 text-violet-700 border-violet-300 dark:text-violet-300 dark:border-violet-500/30",
};

/* =========================================================
   Status Icons
========================================================= */

export const STATUS_ICONS = {
  Upcoming: CalendarClock,

  Completed: CheckCircle2,

  Cancelled: XCircle,

  Rescheduled: RotateCcw,
};

/* =========================================================
   Statistics Cards
========================================================= */

export const STAT_CONFIG = [
  {
    key: "upcoming",
    title: "Upcoming",
    icon: CalendarClock,

    gradient:
      "from-cyan-400 via-sky-400 to-blue-500",

    glow:
      "bg-cyan-400/20",
  },

  {
    key: "completed",
    title: "Completed",
    icon: CheckCircle2,

    gradient:
      "from-emerald-400 via-green-400 to-teal-500",

    glow:
      "bg-emerald-400/20",
  },

  {
    key: "cancelled",
    title: "Cancelled",
    icon: XCircle,

    gradient:
      "from-red-400 via-rose-400 to-pink-500",

    glow:
      "bg-red-400/20",
  },

  {
    key: "rescheduled",
    title: "Rescheduled",
    icon: RotateCcw,

    gradient:
      "from-violet-400 via-fuchsia-400 to-indigo-500",

    glow:
      "bg-violet-400/20",
  },
] as const;

/* =========================================================
   Calendar Event Colors
========================================================= */

export const CALENDAR_EVENT_COLORS: Record<
  AppointmentStatus,
  string
> = {
  Upcoming:
    "bg-cyan-500",

  Completed:
    "bg-emerald-500",

  Cancelled:
    "bg-red-500",

  Rescheduled:
    "bg-violet-500",
};

/* =========================================================
   Appointment Type Icons
========================================================= */

export const APPOINTMENT_TYPE_ICONS = {
  "In-Person": CalendarDays,

  "Video Consultation": CalendarClock,
};

/* =========================================================
   Drawer Titles
========================================================= */

export const DRAWER_TITLES = {
  create: "Book Appointment",

  edit: "Edit Appointment",

  view: "Appointment Details",
};