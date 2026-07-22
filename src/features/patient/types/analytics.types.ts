/**
 * ============================================================
 * Analytics Types
 * ============================================================
 * Used by:
 * - MedicalRecordsHero
 * - StorageOverview
 * - MedicalRecordAnalytics
 * - AnalyticsGrid
 * - AnalyticsCard
 * ============================================================
 */

import type { LucideIcon } from "lucide-react";

/* ============================================================
 * STORAGE
 * ============================================================
 */

export interface StorageOverview {
  totalStorage: number; // MB

  usedStorage: number; // MB

  availableStorage: number; // MB

  usagePercentage: number;

  totalDocuments: number;
}

/* ============================================================
 * ANALYTICS CARD
 * ============================================================
 */

export interface AnalyticsCard {
  id: string;

  title: string;

  value: number;

  icon: LucideIcon;

  color: string;

  description?: string;

  route?: string;
}

/* ============================================================
 * MEDICAL RECORD ANALYTICS
 * ============================================================
 */

export interface MedicalRecordAnalytics {
  hospitalRecords: number;

  patientUploads: number;

  totalDocuments: number;

  pendingReview: number;

  verifiedByHospital: number;

  reviewedByDoctor: number;

  verifiedPendingReview: number;
}

/* ============================================================
 * HERO SUMMARY
 * ============================================================
 */

export interface DashboardSummary {
  storage: StorageOverview;

  analytics: MedicalRecordAnalytics;

  analyticsCards: AnalyticsCard[];
}