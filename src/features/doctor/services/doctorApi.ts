import api from "@/config/axios";

export const WEEK_DAYS = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
] as const;

export type WeekDay = (typeof WEEK_DAYS)[number];

export interface ScheduleEntry {
  day: WeekDay;
  startTime: string; // HH:mm:ss
  endTime: string; // HH:mm:ss
}

export interface PatientAllergy {
  allergenName?: string;
  allergyType?: string;
  severity?: string;
  reaction?: string;
  diagnosedOn?: string;
}

/** Attributes a doctor can ask the patient to unlock. */
export const REQUESTABLE_ATTRIBUTES = [
  "phoneNo",
  "dob",
  "bloodGroup",
  "address",
  "emergencyContact",
  "maritalStatus",
  "allergies",
] as const;

export interface DoctorAppointment {
  token: number;
  tokenNumber: number | null;
  patientId: string;
  patientName: string | null;
  date: string; // ISO yyyy-MM-dd in responses
  startTime: string;
  lastTime: string;
  status: "SCHEDULED" | "CANCELLED" | "COMPLETED" | "ON_HOLD";
}

export interface DoctorProfileData {
  firstName?: string;
  lastName?: string;
  phoneNo?: number;
  specialization?: string;
  licenseNumber?: string;
  aboutDoctor?: string;
  degrees?: string[];
}

export const doctorApi = {
  /** Doctor's queue: all appointments, or a single day (date = MM-dd-yyyy). */
  async getAppointments(
    doctorId: string,
    date?: string
  ): Promise<DoctorAppointment[]> {
    const { data } = await api.get(`/appointments/doctor/${doctorId}`, {
      params: date ? { date } : {},
    });
    return Array.isArray(data) ? data : [];
  },

  async getProfile(doctorId: string) {
    const { data } = await api.get(`/doctors/${doctorId}/profile`);
    return data;
  },

  updateProfile(doctorId: string, profile: DoctorProfileData) {
    const { specialization, licenseNumber, aboutDoctor, degrees, ...user } =
      profile;
    return api.put(`/doctors/${doctorId}/profile`, {
      ...user,
      doctorProfile: { specialization, licenseNumber, aboutDoctor, degrees },
    });
  },

  async getSchedule(doctorId: string): Promise<ScheduleEntry[]> {
    const { data } = await api.get(`/doctors/${doctorId}/schedule`);
    return Array.isArray(data) ? data : [];
  },

  setSchedule(doctorId: string, schedule: ScheduleEntry[]) {
    return api.put(`/doctors/${doctorId}/schedule`, schedule);
  },

  async getPatientProfile(ehrId: string) {
    const { data } = await api.get(`/users/${ehrId}`);
    return data;
  },

  async getPatientAllergies(patientId: string): Promise<PatientAllergy[]> {
    const { data } = await api.get(`/patients/${patientId}/allergies`);
    return Array.isArray(data) ? data : [];
  },

  /** Ask the patient to unlock restricted profile attributes (incl. allergies). */
  requestProfileAccess(
    patientId: string,
    accessorId: string,
    attributes: string[]
  ) {
    return api.post("/restrictions/request", {
      patientId,
      accessorId,
      restrictedAttributes: attributes,
    });
  },

  /** Ask the patient for access to their medical reports. */
  requestReportAccess(doctorId: string, patientId: string) {
    return api.post("/reports/access/request", { doctorId, patientId });
  },
};
