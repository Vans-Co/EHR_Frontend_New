import api from "@/config/axios";

import type { PatientAllergy } from "@/features/patient/types/allergy.types";

/* ============================================================
   Appointment types (from backend)
============================================================ */

export type AppointmentStatus =
  | "SCHEDULED"
  | "CANCELLED"
  | "COMPLETED"
  | "ON_HOLD";

export interface AppointmentResponse {
  token: number;
  patientId: string;
  doctorId: string;
  date: string;
  startTime: string;
  lastTime: string;
  charge: number;
  status: AppointmentStatus;
  total_seat: number;
  available_seat: number;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

/* ============================================================
   Medicine types (from backend)
============================================================ */

export type MedicineShift =
  | "MORNING_BeforeFood"
  | "MORNING_AfterFood"
  | "EVENING_BeforeFood"
  | "EVENING_AfterFood"
  | "NIGHT_BeforeFood"
  | "NIGHT_AfterFood";

export interface MedicineDetails {
  dosageMg: number;
  isActive: boolean;
  expire: string;
  tenure: number;
  medicineName: string;
  notes: string;
  shift: MedicineShift;
}

export interface MedicineResponse {
  id: number;
  prescribedBy: string;
  prescribedOn: string;
  details: MedicineDetails[];
  patient: string;
}

/* ============================================================
   API calls
============================================================ */

/**
 * Fetch paginated appointments for a patient.
 * GET /appointments/all/{user_id}
 */
export const getPatientAppointments = async (
  patientId: string,
  page = 0,
  size = 5
): Promise<PaginatedResponse<AppointmentResponse>> => {
  const response = await api.get<PaginatedResponse<AppointmentResponse>>(
    `/appointments/all/${patientId}`,
    { params: { page, size, sortBy: "appointmentTime" } }
  );

  return response.data;
};

/**
 * Fetch paginated medical records for a patient.
 * GET /patients/{patient_id}/medical-records
 */
export const getPatientMedicalRecords = async (
  patientId: string,
  page = 0,
  size = 5
): Promise<PaginatedResponse<MedicineResponse>> => {
  const response = await api.get<PaginatedResponse<MedicineResponse>>(
    `/patients/${patientId}/medical-records`,
    { params: { page_no: page, size, property: "prescribedOn" } }
  );

  return response.data;
};

/**
 * Fetch all allergies for a patient (re-exported for dashboard use).
 * GET /patients/{patientId}/allergies
 */
export const getDashboardAllergies = async (
  patientId: string
): Promise<PatientAllergy[]> => {
  const response = await api.get(
    `/patients/${patientId}/allergies`
  );

  const rawData = Array.isArray(response.data)
    ? response.data
    : [];

  return rawData.map((item: Record<string, unknown>) => ({
    allergyId: String(item.allergyid ?? item.allergyId ?? item.id ?? ""),
    patientId: String(item.patientId ?? item.patientid ?? patientId),
    category: String(item.category ?? ""),
    allergyItem: String(item.allergyItem ?? item.allergyitem ?? item.items ?? item.item ?? item.category ?? ""),
    allergyType: String(item.allergyType ?? item.allergytype ?? "OTHER"),
    severity: String(item.severity ?? "MODERATE"),
    description: String(item.description ?? ""),
  })) as PatientAllergy[];
};
