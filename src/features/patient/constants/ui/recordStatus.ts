import {
  DocumentStatus,
  VerificationStatus,
} from "../../types";

export const DOCUMENT_STATUS = [
  {
    label: "Active",
    value: DocumentStatus.ACTIVE,
  },
  {
    label: "Archived",
    value: DocumentStatus.ARCHIVED,
  },
];

export const VERIFICATION_STATUS = [
  {
    label: "Verified",
    value: VerificationStatus.VERIFIED,
  },
  {
    label: "Pending",
    value: VerificationStatus.PENDING,
  },
  {
    label: "Rejected",
    value: VerificationStatus.REJECTED,
  },
];

export const STATUS_COLORS = {
  [DocumentStatus.ACTIVE]:
    "bg-green-100 text-green-700",

  [DocumentStatus.ARCHIVED]:
    "bg-yellow-100 text-yellow-700",

  [DocumentStatus.DELETED]:
    "bg-red-100 text-red-700",
};

export const VERIFICATION_COLORS = {
  [VerificationStatus.VERIFIED]:
    "bg-green-100 text-green-700",

  [VerificationStatus.PENDING]:
    "bg-yellow-100 text-yellow-700",

  [VerificationStatus.REJECTED]:
    "bg-red-100 text-red-700",
};