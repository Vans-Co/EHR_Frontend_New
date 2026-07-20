import api from "@/config/axios";

import type {
  PatientProfile,
  UpdatePatientProfileRequest,
} from "@/features/patient/types/patient.types";

/**
 * Fetch a patient/user profile by EHR ID.
 * Calls GET /users/{ehrId} on the backend.
 */
export const getPatientProfile = async (
  ehrId: string
): Promise<PatientProfile> => {
  const response = await api.get<PatientProfile>(
    `/users/${ehrId}`
  );

  return response.data;
};

/**
 * Update the patient profile by EHR ID.
 * Calls PUT /users/{ehrId} on the backend.
 */
export const updatePatientProfile = async (
  ehrId: string,
  data: UpdatePatientProfileRequest
): Promise<PatientProfile> => {
  const response = await api.put<PatientProfile>(
    `/users/${ehrId}`,
    data
  );

  return response.data;
};
