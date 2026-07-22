/**
 * ============================================================
 * Medical Records Types
 * ============================================================
 * Shared domain models for the Medical Records module.
 * ============================================================
 */

import type { LucideIcon } from "lucide-react";

/* ============================================================
 * RECORD SOURCE
 * ============================================================
 */

export const RecordSource = {
  HOSPITAL: "HOSPITAL",
  PATIENT: "PATIENT",
} as const;

export type RecordSource =
  (typeof RecordSource)[keyof typeof RecordSource];

/* ============================================================
 * DOCUMENT TYPE
 * ============================================================
 */

export const DocumentType = {
  CONSULTATION: "CONSULTATION",
  LAB_REPORT: "LAB_REPORT",
  RADIOLOGY: "RADIOLOGY",
  PRESCRIPTION: "PRESCRIPTION",
  DISCHARGE_SUMMARY: "DISCHARGE_SUMMARY",
  PROCEDURE_NOTE: "PROCEDURE_NOTE",
  SURGERY_REPORT: "SURGERY_REPORT",
  ECG: "ECG",
  CERTIFICATE: "CERTIFICATE",
  VACCINATION: "VACCINATION",
  INSURANCE: "INSURANCE",
  OTHER: "OTHER",
} as const;

export type DocumentType =
  (typeof DocumentType)[keyof typeof DocumentType];

/* ============================================================
 * DOCUMENT STATUS
 * ============================================================
 */

export const DocumentStatus = {
  ACTIVE: "ACTIVE",
  ARCHIVED: "ARCHIVED",
  DELETED: "DELETED",
} as const;

export type DocumentStatus =
  (typeof DocumentStatus)[keyof typeof DocumentStatus];

/* ============================================================
 * VERIFICATION STATUS
 * ============================================================
 */

export const VerificationStatus = {
  PENDING: "PENDING",
  VERIFIED: "VERIFIED",
  REJECTED: "REJECTED",
} as const;

export type VerificationStatus =
  (typeof VerificationStatus)[keyof typeof VerificationStatus];

/* ============================================================
 * DOCTOR REVIEW STATUS
 * ============================================================
 */

export const DoctorReviewStatus = {
  NOT_REVIEWED: "NOT_REVIEWED",
  UNDER_REVIEW: "UNDER_REVIEW",
  REVIEWED: "REVIEWED",
} as const;

export type DoctorReviewStatus =
  (typeof DoctorReviewStatus)[keyof typeof DoctorReviewStatus];

/* ============================================================
 * FILE TYPE
 * ============================================================
 */

export const FileType = {
  PDF: "PDF",
  IMAGE: "IMAGE",
  DICOM: "DICOM",
  WORD: "WORD",
  EXCEL: "EXCEL",
  TEXT: "TEXT",
  OTHER: "OTHER",
} as const;

export type FileType =
  (typeof FileType)[keyof typeof FileType];

/* ============================================================
 * TIMELINE EVENT TYPE
 * ============================================================
 */

export const TimelineEventType = {
  CREATED: "CREATED",
  UPLOADED: "UPLOADED",
  VERIFIED: "VERIFIED",
  REVIEWED: "REVIEWED",
  SHARED: "SHARED",
  DOWNLOADED: "DOWNLOADED",
  UPDATED: "UPDATED",
} as const;

export type TimelineEventType =
  (typeof TimelineEventType)[keyof typeof TimelineEventType];

/* ============================================================
 * DEPARTMENT
 * ============================================================
 */

export const Department = {
  GENERAL_MEDICINE: "General Medicine",
  CARDIOLOGY: "Cardiology",
  NEUROLOGY: "Neurology",
  ORTHOPEDICS: "Orthopedics",
  PEDIATRICS: "Pediatrics",
  DERMATOLOGY: "Dermatology",
  RADIOLOGY: "Radiology",
  PATHOLOGY: "Pathology",
  GYNECOLOGY: "Gynecology",
  ENT: "ENT",
  OTHER: "Other",
} as const;

export type Department =
  (typeof Department)[keyof typeof Department];

/* ============================================================
 * FILE INFORMATION
 * ============================================================
 */

export interface FileInformation {
  id: string;

  fileName: string;

  originalFileName: string;

  fileType: FileType;

  extension: string;

  mimeType: string;

  fileSize: number;

  totalPages?: number;

  thumbnailUrl?: string;

  previewUrl?: string;

  downloadUrl?: string;
}

/* ============================================================
 * HOSPITAL INFORMATION
 * ============================================================
 */

export interface HospitalInformation {
  hospitalId: string;

  hospitalName: string;

  department: Department;

  doctorId: string;

  doctorName: string;

  doctorSpecialization: string;

  encounterId?: string;

  visitDate: Date;
}

/* ============================================================
 * MEDICAL INFORMATION
 * ============================================================
 */

export interface MedicalInformation {
  chiefComplaint?: string;

  diagnosis?: string;

  treatment?: string;

  clinicalNotes?: string;

  followUpAdvice?: string;

  medications?: string[];

  allergies?: string[];
}

/* ============================================================
 * VERIFICATION INFORMATION
 * ============================================================
 */

export interface VerificationInformation {
  status: VerificationStatus;

  verifiedBy?: string;

  verifiedDate?: Date;

  remarks?: string;
}

/* ============================================================
 * DOCTOR REVIEW
 * ============================================================
 */

export interface DoctorReview {
  status: DoctorReviewStatus;

  reviewedBy?: string;

  reviewDate?: Date;

  notes?: string;
}

/* ============================================================
 * TIMELINE EVENT
 * ============================================================
 */

export interface TimelineEvent {
  id: string;

  title: string;

  description: string;

  type: TimelineEventType;

  performedBy: string;

  date: Date;
}
/* ============================================================
 * MEDICAL RECORD
 * ============================================================
 */

export interface MedicalRecord {
  /* ---------- Identity ---------- */

  id: string;

  title: string;

  description?: string;

  source: RecordSource;

  documentType: DocumentType;

  status: DocumentStatus;

  /* ---------- File ---------- */

  file: FileInformation;

  /* ---------- Hospital ---------- */

  hospital?: HospitalInformation;

  /* ---------- Medical ---------- */

  medical?: MedicalInformation;

  /* ---------- Verification ---------- */

  verification: VerificationInformation;

  /* ---------- Doctor Review ---------- */

  review?: DoctorReview;

  /* ---------- Timeline ---------- */

  timeline: TimelineEvent[];

  /* ---------- Metadata ---------- */

  tags?: string[];

  isFavorite: boolean;

  isShared: boolean;

  shareCount: number;

  downloadCount: number;

  viewCount: number;

  /* ---------- Audit ---------- */

  createdAt: Date;

  updatedAt: Date;

  uploadedAt: Date;

  createdBy: string;

  updatedBy?: string;
}

/* ============================================================
 * HOSPITAL RECORD
 * ============================================================
 */

export interface HospitalRecord extends MedicalRecord {
  source: typeof RecordSource.HOSPITAL;

  hospital: HospitalInformation;

  medical: MedicalInformation;
}

/* ============================================================
 * PATIENT UPLOAD
 * ============================================================
 */

export interface PatientUpload extends MedicalRecord {
  source: typeof RecordSource.PATIENT;

  uploadedByPatient: boolean;

  patientNotes?: string;

  verifiedByHospital?: boolean;
}
/* ============================================================
 * DATE RANGE
 * ============================================================
 */

export interface DateRange {
  startDate?: Date;

  endDate?: Date;
}

/* ============================================================
 * MEDICAL RECORD FILTERS
 * ============================================================
 */

export interface MedicalRecordFilters {
  search: string;

  hospital?: string;

  doctor?: string;

  department?: Department;

  documentType?: DocumentType;

  verificationStatus?: VerificationStatus;

  reviewStatus?: DoctorReviewStatus;

  source?: RecordSource;

  dateRange?: DateRange;

  sortBy?:
    | "latest"
    | "oldest"
    | "title"
    | "hospital"
    | "doctor"
    | "documentType";

  sortOrder?: "asc" | "desc";
}

/* ============================================================
 * RECENT RECORD
 * ============================================================
 */

export interface RecentRecord {
  id: string;

  title: string;

  source: RecordSource;

  documentType: DocumentType;

  uploadedAt: Date;

  hospitalName?: string;

  doctorName?: string;

  thumbnailUrl?: string;

  verificationStatus: VerificationStatus;
}

/* ============================================================
 * QUICK ACTION
 * ============================================================
 */

export interface QuickAction {
  id: string;

  title: string;

  description: string;

  icon: LucideIcon;

  color: string;

  action:
    | "upload"
    | "download-summary"
    | "share-records"
    | "request-records";

  disabled?: boolean;
}

/* ============================================================
 * NAVIGATION CARD
 * ============================================================
 */

export interface NavigationCard {
  id: string;

  title: string;

  description: string;

  totalRecords: number;

  icon: LucideIcon;

  route: string;

  color: string;
}

/* ============================================================
 * EMPTY STATE CONFIG
 * ============================================================
 */

export interface EmptyStateConfig {
  title: string;

  description: string;

  image?: string;

  actionLabel?: string;

  action?: string;
}

/* ============================================================
 * SEARCH RESULT
 * ============================================================
 */

export interface SearchResult {
  total: number;

  records: MedicalRecord[];
}

/* ============================================================
 * PAGINATION
 * ============================================================
 */

export interface Pagination {
  page: number;

  pageSize: number;

  totalItems: number;

  totalPages: number;

  hasNext: boolean;

  hasPrevious: boolean;
}