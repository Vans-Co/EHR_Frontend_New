import type {
  Appointment,
  AppointmentStats,
  CalendarEvent,
} from "../types/appointment.types";

export const appointments: Appointment[] = [
  {
    id: "APT-1001",
    doctorName: "Dr. Sarah Johnson",
    specialization: "Cardiologist",
    hospital: "City Heart Hospital",
    location: "Ahmedabad",
    date: "2026-07-22",
    time: "10:30 AM",
    appointmentType: "In-Person",
    status: "Upcoming",
    reason: "Routine Heart Checkup",
    notes: "Carry previous ECG reports.",
    prescriptionAvailable: false,
    reportsRequired: true,
    insuranceRequired: true,
  },
  {
    id: "APT-1002",
    doctorName: "Dr. Michael Brown",
    specialization: "Dermatologist",
    hospital: "Skin Care Clinic",
    location: "Ahmedabad",
    date: "2026-07-15",
    time: "04:00 PM",
    appointmentType: "Video Consultation",
    status: "Completed",
    reason: "Skin Allergy Consultation",
    notes: "Prescription uploaded.",
    prescriptionAvailable: true,
    reportsRequired: false,
    insuranceRequired: false,
  },
  {
    id: "APT-1003",
    doctorName: "Dr. Emily Wilson",
    specialization: "Orthopedic",
    hospital: "Sunrise Hospital",
    location: "Ahmedabad",
    date: "2026-07-25",
    time: "02:15 PM",
    appointmentType: "In-Person",
    status: "Rescheduled",
    reason: "Knee Pain",
    notes: "Doctor requested new slot.",
    prescriptionAvailable: false,
    reportsRequired: true,
    insuranceRequired: false,
  },
  {
    id: "APT-1004",
    doctorName: "Dr. David Miller",
    specialization: "Neurologist",
    hospital: "Neuro Care Centre",
    location: "Ahmedabad",
    date: "2026-07-18",
    time: "11:00 AM",
    appointmentType: "Video Consultation",
    status: "Cancelled",
    reason: "Migraine Follow-up",
    notes: "Cancelled by patient.",
    prescriptionAvailable: false,
    reportsRequired: false,
    insuranceRequired: false,
  },
];

export const appointmentStats: AppointmentStats = {
  upcoming: appointments.filter(
    (item) => item.status === "Upcoming"
  ).length,

  completed: appointments.filter(
    (item) => item.status === "Completed"
  ).length,

  cancelled: appointments.filter(
    (item) => item.status === "Cancelled"
  ).length,

  rescheduled: appointments.filter(
    (item) => item.status === "Rescheduled"
  ).length,
};

export const calendarEvents: CalendarEvent[] =
  appointments.map((appointment) => ({
    id: appointment.id,
    title: appointment.doctorName,
    date: appointment.date,
    status: appointment.status,
  }));