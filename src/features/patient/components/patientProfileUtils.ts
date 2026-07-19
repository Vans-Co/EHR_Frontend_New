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
  { label: "A+", value: "A_POSITIVE" },
  { label: "A-", value: "A_NEGATIVE" },
  { label: "B+", value: "B_POSITIVE" },
  { label: "B-", value: "B_NEGATIVE" },
  { label: "AB+", value: "AB_POSITIVE" },
  { label: "AB-", value: "AB_NEGATIVE" },
  { label: "O+", value: "O_POSITIVE" },
  { label: "O-", value: "O_NEGATIVE" },
];

const bloodGroupDisplayMap: Record<string, string> = {
  A_POSITIVE: "A+",
  A_NEGATIVE: "A-",
  B_POSITIVE: "B+",
  B_NEGATIVE: "B-",
  AB_POSITIVE: "AB+",
  AB_NEGATIVE: "AB-",
  O_POSITIVE: "O+",
  O_NEGATIVE: "O-",
};

export const formatBloodGroup = (value: string) =>
  bloodGroupDisplayMap[value] ?? value;

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
) => {
  const id = String(ehrId ?? "").trim().toLowerCase();
  return id.charAt(0).toUpperCase() + id.slice(1);
};

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
