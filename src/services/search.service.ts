import api from "@/config/axios";

export interface PatientSearchResult {
  ehrId: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface DoctorSearchResult {
  id: string;
  firstName?: string;
  lastName?: string;
  specialization?: string;
}

export const searchService = {
  /** Doctor/Admin: search patients by name, email or ehrId. */
  async searchPatients(query: string): Promise<PatientSearchResult[]> {
    const { data } = await api.get("/users/search-patients", {
      params: { query },
    });
    return Array.isArray(data) ? data : [];
  },

  /** Anyone: search doctors by name, email or specialization. */
  async searchDoctors(query: string): Promise<DoctorSearchResult[]> {
    const { data } = await api.get("/doctors/search", {
      params: { query },
    });
    return Array.isArray(data) ? data : [];
  },
};
