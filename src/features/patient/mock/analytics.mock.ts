import {
  Activity,
  Clock,
  FileCheck2,
  FileText,
  Hospital,
  Upload,
} from "lucide-react";

import type {
  AnalyticsCard,
  DashboardSummary,
  MedicalRecordAnalytics,
  StorageOverview,
} from "../types";

/* ============================================================
 * STORAGE OVERVIEW
 * ============================================================
 */

export const storageOverview: StorageOverview = {
  totalStorage: 5120, // 5 GB (MB)

  usedStorage: 1890,

  availableStorage: 3230,

  usagePercentage: 37,

  totalDocuments: 148,
};

/* ============================================================
 * MEDICAL RECORD ANALYTICS
 * ============================================================
 */

export const medicalRecordAnalytics: MedicalRecordAnalytics = {
  hospitalRecords: 112,

  patientUploads: 36,

  totalDocuments: 148,

  pendingReview: 16,

  verifiedByHospital: 128,

  reviewedByDoctor: 94,

  verifiedPendingReview: 34,
};

/* ============================================================
 * ANALYTICS CARDS
 * ============================================================
 */

export const analyticsCards: AnalyticsCard[] = [
  {
    id: "hospital-records",
    title: "Hospital Records",
    value: 112,
    icon: Hospital,
    color: "#2563EB",
    description: "Records received from hospitals",
    route: "/patient/medical-records/hospital",
  },
  {
    id: "patient-uploads",
    title: "Patient Uploads",
    value: 36,
    icon: Upload,
    color: "#16A34A",
    description: "Documents uploaded by you",
    route: "/patient/medical-records/uploads",
  },
  {
    id: "verified",
    title: "Verified",
    value: 128,
    icon: FileCheck2,
    color: "#7C3AED",
    description: "Hospital verified documents",
  },
  {
    id: "pending",
    title: "Pending Review",
    value: 16,
    icon: Clock,
    color: "#EA580C",
    description: "Waiting for verification",
  },
  {
    id: "reviewed",
    title: "Doctor Reviewed",
    value: 94,
    icon: Activity,
    color: "#DC2626",
    description: "Reviewed by doctors",
  },
  {
    id: "total",
    title: "Total Documents",
    value: 148,
    icon: FileText,
    color: "#0891B2",
    description: "All medical records",
  },
];

/* ============================================================
 * DASHBOARD SUMMARY
 * ============================================================
 */

export const dashboardSummary: DashboardSummary = {
  storage: storageOverview,

  analytics: medicalRecordAnalytics,

  analyticsCards,
};