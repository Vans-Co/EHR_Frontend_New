import api from "@/config/axios";
import {
  getFallbackPatientProfile,
  saveFallbackPatientProfile,
} from "@/features/patient/mock/patientProfile.mock";

import type {
  PatientProfile,
  UpdatePatientProfileRequest,
} from "@/features/patient/types/patient.types";

export const getPatientProfile =
  async (
    ehrId: string
  ): Promise<PatientProfile> => {
    try {
      const response = await api.get(
        `/users/${ehrId}`
      );

      return response.data;
    } catch (error) {
      console.warn(
        "Using fallback patient profile data because the backend request failed.",
        error
      );

      return getFallbackPatientProfile(ehrId);
    }
  };

export const updatePatientProfile = async (
  data: UpdatePatientProfileRequest
): Promise<PatientProfile> => {
  try {
    const response = await api.put(
      "/patient/profile",
      data
    );

    return response.data;
  } catch (error) {
    console.warn(
      "Saving patient profile to fallback storage because the backend update failed.",
      error
    );

    return saveFallbackPatientProfile(data);
  }
};
