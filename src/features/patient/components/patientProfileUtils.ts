import { format } from "date-fns";

import type {
  PatientProfile,
  PatientProfileFormValues,
} from "@/features/patient/types/patient.types";

export const genderOptions = [
  { label: "Select Gender", value: "" },
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Other", value: "Other" },
];

export const maritalStatusOptions = [
  { label: "Select Marital Status", value: "" },
  { label: "Single", value: "Single" },
  { label: "Married", value: "Married" },
  { label: "Divorced", value: "Divorced" },
  { label: "Widowed", value: "Widowed" },
];

export const bloodGroupOptions = [
  { label: "Select Blood Group", value: "" },
  { label: "A+", value: "A+" },
  { label: "A-", value: "A-" },
  { label: "B+", value: "B+" },
  { label: "B-", value: "B-" },
  { label: "AB+", value: "AB+" },
  { label: "AB-", value: "AB-" },
  { label: "O+", value: "O+" },
  { label: "O-", value: "O-" },
];

export const formatProfileDate = (
  value: string
) => {
  if (!value) {
    return "Not provided";
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return value;
  }

  return format(parsedDate, "dd MMM yyyy");
};

export const getProfileInitials = (
  firstName: string,
  lastName: string
) =>
  `${firstName.charAt(0)}${lastName.charAt(0)}`
    .trim()
    .toUpperCase() || "PT";

export const normalizeEhrId = (
  ehrId: string | number | null | undefined
) => String(ehrId ?? "").trim().toUpperCase();

export const mapProfileToFormValues = (
  profile: PatientProfile
): PatientProfileFormValues => ({
  firstName: profile.firstName ?? "",
  lastName: profile.lastName ?? "",
  email: profile.email ?? "",
  ehrId: profile.ehrId ?? "",
  role: profile.role ?? "",
  phoneNo: String(profile.phoneNo ?? ""),
  dob: profile.dob ? profile.dob.slice(0, 10) : "",
  gender: profile.gender ?? "",
  bloodGroup: profile.bloodGroup ?? "",
  maritalStatus: profile.maritalStatus ?? "",
  addressLine: profile.address?.addressLine ?? "",
  city: profile.address?.city ?? "",
  state: profile.address?.state ?? "",
  pin_code: String(profile.address?.pin_code ?? ""),
  contactName:
    profile.emergencyContact?.contactName ?? "",
  contactPhoneNo: String(
    profile.emergencyContact?.contactPhoneNo ?? ""
  ),
  relationship:
    profile.emergencyContact?.relationship ?? "",
});
