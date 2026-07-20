export type AppointmentStatus =
  | "Upcoming"
  | "Completed"
  | "Cancelled"
  | "Rescheduled";

export type AppointmentType =
  | "In-Person"
  | "Video Consultation";

export type DrawerMode =
  | "create"
  | "edit"
  | "view";

/* =========================================
   Doctor
========================================= */

export interface Doctor {
  id?: string;

  name: string;

  specialization: string;

  hospital: string;

  location: string;
}

/* =========================================
   Appointment
========================================= */

export interface Appointment {
  id: string;

  doctorName: string;

  specialization: string;

  hospital: string;

  location: string;

  date: string;

  time: string;

  appointmentType: AppointmentType;

  status: AppointmentStatus;

  reason: string;

  notes?: string;

  prescriptionAvailable: boolean;

  reportsRequired: boolean;

  insuranceRequired: boolean;
}

/* =========================================
   Dashboard Stats
========================================= */

export interface AppointmentStats {
  upcoming: number;

  completed: number;

  cancelled: number;

  rescheduled: number;
}
/* =========================================
   Analytics
========================================= */
export interface AppointmentTrend {
  month: string;

  appointments: number;
}
export interface AppointmentAnalytics {
  total: number;

  average: number;

  growth: number;
}

/* =========================================
   Calendar
========================================= */

export interface CalendarEvent {
  id: string;

  title: string;

  date: string;

  status: AppointmentStatus;
}

/* =========================================
   Filters
========================================= */

export interface AppointmentFilters {
  search: string;

  status:
    | "all"
    | AppointmentStatus;

  sort:
    | "newest"
    | "oldest"
    | "doctor"
    | "status";

  date: string;
}

/* =========================================
   Form
========================================= */

export interface AppointmentFormData {
  doctorName: string;

  specialization: string;

  hospital: string;

  location: string;

  date: string;

  time: string;

  appointmentType: AppointmentType;

  reason: string;

  notes: string;
}
