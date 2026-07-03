export type AppointmentStatus =
  | "Confirmed"
  | "Pending"
  | "Completed"
  | "Cancelled";

export interface Appointment {
  id: number;

  initials: string;
  doctor: string;
  department: string;

  // Used in UI table
  date: string;

  // Backend Ready
  rawDate: string;
  rawTime: string;

  reason?: string;

  status: AppointmentStatus;

  action: string;
}