import { appointments } from "../data/appointments.mock";
import type { Appointment } from "../types/appointment.types";

export const getAppointments = (): Appointment[] => {
  return appointments;
};