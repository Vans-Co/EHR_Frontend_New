import api from "@/config/axios";
import type {
  Appointment,
  AppointmentFormData,
  Doctor,
} from "@/features/patient/types/appointment.types";

/* Backend DTO */
interface AppointmentResponseDTO {
  token: number;
  patientId: string;
  doctorId: string;
  date: string; // MM-dd-yyyy
  startTime: string; // HH:mm:ss
  lastTime: string; // HH:mm:ss
  charge: number | null;
  status: "SCHEDULED" | "CANCELLED" | "COMPLETED" | "ON_HOLD";
  total_seat: number | null;
  available_seat: number | null;
}

const STATUS_TO_UI: Record<AppointmentResponseDTO["status"], Appointment["status"]> = {
  SCHEDULED: "Upcoming",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
  ON_HOLD: "Rescheduled",
};

/* ---- date/time helpers ----
   GET responses serialize the date as ISO yyyy-MM-dd and time as HH:mm (Jackson
   default for LocalDate/LocalTime), but the create/reschedule request must send
   the date as MM-dd-yyyy and time as HH:mm:ss (the backend parses those formats). */

const ymdToBackend = (d: string) => {
  const [y, m, day] = (d || "").split("-");
  return y && m && day ? `${m}-${day}-${y}` : d;
};

// "09:00:00" -> "9:00 AM"
const to12h = (hms: string) => {
  const [h, min] = (hms || "").split(":").map(Number);
  if (Number.isNaN(h)) return hms;
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(min ?? 0).padStart(2, "0")} ${period}`;
};

// "09:00 AM" or "09:00" -> "09:00:00"
const to24h = (t: string) => {
  const m = (t || "").trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
  if (!m) return t;
  let h = Number(m[1]);
  const min = m[2];
  const period = m[3]?.toUpperCase();
  if (period === "PM" && h < 12) h += 12;
  if (period === "AM" && h === 12) h = 0;
  return `${String(h).padStart(2, "0")}:${min}:00`;
};

const addMinutes = (hms: string, mins: number) => {
  const [h, m] = hms.split(":").map(Number);
  const total = h * 60 + m + mins;
  const hh = Math.floor((total % 1440) / 60);
  const mm = total % 60;
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}:00`;
};

/* ---- mappers ---- */

export const dtoToAppointment = (
  dto: AppointmentResponseDTO,
  doctorsById: Record<string, Doctor>
): Appointment => {
  const doctor = doctorsById[dto.doctorId];
  return {
    id: String(dto.token),
    doctorName: doctor?.name ?? dto.doctorId,
    specialization: doctor?.specialization ?? "",
    hospital: doctor?.hospital ?? "",
    location: doctor?.location ?? "",
    date: dto.date, // already ISO yyyy-MM-dd
    time: to12h(dto.startTime),
    appointmentType: "In-Person",
    status: STATUS_TO_UI[dto.status] ?? "Upcoming",
    reason: "",
    notes: "",
    prescriptionAvailable: false,
    reportsRequired: false,
    insuranceRequired: false,
  };
};

const formToRequest = (
  form: AppointmentFormData,
  patientId: string,
  doctorId: string
) => {
  const startTime = to24h(form.time);
  return {
    patientId,
    doctorId,
    status: "SCHEDULED",
    date: ymdToBackend(form.date),
    startTime,
    lastTime: addMinutes(startTime, 30),
    charge: 0,
    total_seat: 1,
    available_seat: 1,
  };
};

/* ---- API ---- */

export const appointmentService = {
  async getAppointments(ehrId: string): Promise<AppointmentResponseDTO[]> {
    // sortBy must be a real field on AppointmentBook; "token" is the id (newest last)
    const { data } = await api.get(`/appointments/all/${ehrId}`, {
      params: { size: 50, page: 0, sortBy: "token" },
    });
    return Array.isArray(data) ? data : [];
  },

  async getDoctors(): Promise<Doctor[]> {
    const { data } = await api.get("/doctors/all");
    if (!Array.isArray(data)) return [];
    return data.map(
      (d: {
        id: string;
        user?: { firstName?: string; lastName?: string };
        doctorProfile?: { specialization?: string };
      }): Doctor => ({
        id: d.id,
        name: `Dr. ${d.user?.firstName ?? ""} ${d.user?.lastName ?? ""}`.trim(),
        specialization: d.doctorProfile?.specialization ?? "",
        hospital: "",
        location: "",
      })
    );
  },

  createAppointment(form: AppointmentFormData, patientId: string, doctorId: string) {
    return api.post("/appointments", formToRequest(form, patientId, doctorId));
  },

  rescheduleAppointment(token: string, form: AppointmentFormData, patientId: string, doctorId: string) {
    return api.put(`/appointments/${token}/reschedule`, formToRequest(form, patientId, doctorId));
  },

  cancelAppointment(token: string) {
    return api.patch(`/appointments/${token}/cancel`);
  },
};
