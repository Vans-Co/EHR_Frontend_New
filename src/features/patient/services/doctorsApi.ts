import api from "@/config/axios";

export interface DoctorDirectoryEntry {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  specialization: string;
  aboutDoctor: string;
  degrees: string[];
  consultationFee: number | null;
}

export interface DoctorScheduleEntry {
  day: string; // e.g. "MONDAY"
  startTime: string; // HH:mm:ss
  endTime: string; // HH:mm:ss
}

interface DoctorSummaryResponse {
  id: string;
  firstName?: string;
  lastName?: string;
  specialization?: string;
  aboutDoctor?: string;
  degrees?: string[];
  consultationFee?: number | null;
}

const toEntry = (d: DoctorSummaryResponse): DoctorDirectoryEntry => ({
  id: d.id,
  firstName: d.firstName ?? "",
  lastName: d.lastName ?? "",
  name: `Dr. ${d.firstName ?? ""} ${d.lastName ?? ""}`.trim(),
  specialization: d.specialization ?? "",
  aboutDoctor: d.aboutDoctor ?? "",
  degrees: Array.isArray(d.degrees) ? d.degrees : [],
  consultationFee: d.consultationFee ?? null,
});

// yyyy-MM-dd -> MM-dd-yyyy (backend parse format)
const toBackendDate = (d: string) => {
  const [y, m, day] = (d || "").split("-");
  return y && m && day ? `${m}-${day}-${y}` : d;
};

const addMinutes = (hms: string, mins: number) => {
  const [h, m] = hms.split(":").map(Number);
  const total = h * 60 + m + mins;
  const hh = Math.floor((total % 1440) / 60);
  const mm = total % 60;
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}:00`;
};

export interface BookAppointmentInput {
  doctorId: string;
  patientId: string;
  date: string; // yyyy-MM-dd
  startTime: string; // HH:mm:ss
  charge: number | null;
}

export const doctorsApi = {
  async list(): Promise<DoctorDirectoryEntry[]> {
    const { data } = await api.get("/doctors/all");
    return Array.isArray(data) ? data.map(toEntry) : [];
  },

  async getSchedule(doctorId: string): Promise<DoctorScheduleEntry[]> {
    const { data } = await api.get(`/doctors/${doctorId}/schedule`);
    return Array.isArray(data) ? data : [];
  },

  book({ doctorId, patientId, date, startTime, charge }: BookAppointmentInput) {
    return api.post("/appointments", {
      patientId,
      doctorId,
      status: "SCHEDULED",
      date: toBackendDate(date),
      startTime,
      lastTime: addMinutes(startTime, 30),
      charge: charge ?? 0,
      total_seat: 1,
      available_seat: 1,
    });
  },
};
