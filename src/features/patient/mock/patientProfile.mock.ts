import { normalizeEhrId } from "@/features/patient/components/patientProfileUtils";
import type {
  PatientProfile,
  UpdatePatientProfileRequest,
} from "@/features/patient/types/patient.types";
import { useAuthStore } from "@/store/authStore";

const FALLBACK_STORAGE_KEY =
  "patientProfileFallback";

const getStoredFallbackProfile = () => {
  const storedProfile = localStorage.getItem(
    FALLBACK_STORAGE_KEY
  );

  if (!storedProfile) {
    return null;
  }

  try {
    return JSON.parse(
      storedProfile
    ) as PatientProfile;
  } catch {
    localStorage.removeItem(
      FALLBACK_STORAGE_KEY
    );
    return null;
  }
};

const buildDefaultProfile = (
  ehrId?: string
): PatientProfile => {
  const authUser = useAuthStore.getState().user;
  const normalizedEhrId = normalizeEhrId(
    ehrId ?? authUser?.ehrId ?? "EHR202657"
  );

  return {
    email:
      authUser?.email ??
      "john.doe@example.com",
    ehrId: normalizedEhrId,
    firstName:
      authUser?.firstName ?? "John",
    lastName:
      authUser?.lastName ?? "Doe",
    phoneNo:
      authUser?.phoneNo ?? 9876543210,
    dob: authUser?.dob ?? "1994-08-16",
    gender:
      authUser?.gender ?? "Male",
    role: authUser?.role ?? "PATIENT",
    bloodGroup:
      authUser?.bloodGroup ?? "O+",
    maritalStatus: "Single",
    address: {
      addressLine: "221B Baker Street",
      city: authUser?.address?.city ?? "Mumbai",
      state:
        authUser?.address?.state ??
        "Maharashtra",
      pin_code:
        authUser?.address?.pin_code ?? 400001,
    },
    emergencyContact: {
      contactName: "Jane Doe",
      contactPhoneNo: 9876501234,
      relationship: "Sister",
    },
  };
};

export const getFallbackPatientProfile = (
  ehrId?: string
) => {
  const storedProfile =
    getStoredFallbackProfile();

  if (storedProfile) {
    return {
      ...storedProfile,
      ehrId: normalizeEhrId(
        storedProfile.ehrId || ehrId
      ),
    };
  }

  const fallbackProfile =
    buildDefaultProfile(ehrId);

  localStorage.setItem(
    FALLBACK_STORAGE_KEY,
    JSON.stringify(fallbackProfile)
  );

  return fallbackProfile;
};

export const saveFallbackPatientProfile = (
  updates: UpdatePatientProfileRequest,
  ehrId?: string
) => {
  const currentProfile =
    getFallbackPatientProfile(ehrId);

  const nextProfile: PatientProfile = {
    ...currentProfile,
    ...updates,
    ehrId: normalizeEhrId(
      currentProfile.ehrId || ehrId
    ),
  };

  localStorage.setItem(
    FALLBACK_STORAGE_KEY,
    JSON.stringify(nextProfile)
  );

  return nextProfile;
};
