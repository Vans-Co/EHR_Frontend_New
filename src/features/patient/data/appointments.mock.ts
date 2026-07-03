import type { Appointment } from "../types/appointment.types";

export const appointments: Appointment[] = [
  {
    id: 1,
    initials: "DA",
    doctor: "Dr. Aris",
    department: "Cardiology",

    date: "May 24, 2026 • 10:30 AM",
    rawDate: "2026-05-24",
    rawTime: "10:30",

    reason: "Routine Heart Checkup",

    status: "Confirmed",
    action: "Reschedule",
  },

  {
    id: 2,
    initials: "LM",
    doctor: "Dr. Lawson",
    department: "Orthopedic",

    date: "June 02, 2026 • 02:15 PM",
    rawDate: "2026-06-02",
    rawTime: "14:15",

    reason: "Knee Pain",

    status: "Pending",
    action: "Reschedule",
  },

  {
    id: 3,
    initials: "RK",
    doctor: "Dr. Kapoor",
    department: "Neurology",

    date: "June 12, 2026 • 09:00 AM",
    rawDate: "2026-06-12",
    rawTime: "09:00",

    reason: "Migraine Follow-up",

    status: "Completed",
    action: "View Summary",
  },
];