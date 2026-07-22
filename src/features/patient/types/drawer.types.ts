/**
 * ============================================================
 * Drawer Types
 * ============================================================
 * Used by:
 *
 * - MedicalRecordDrawer
 * - DrawerHeader
 * - DrawerActions
 *
 * NOTE:
 * Component-specific props (DocumentPreviewProps, ClinicalNotesProps,
 * etc.) should live inside their respective components.
 * ============================================================
 */

import type { MedicalRecord } from "./medical-record.types";

/* ============================================================
 * DRAWER TABS
 * ============================================================
 */

export const DrawerTab = {
  PREVIEW: "PREVIEW",
  DETAILS: "DETAILS",
  CLINICAL_NOTES: "CLINICAL_NOTES",
  TIMELINE: "TIMELINE",
} as const;

export type DrawerTab =
  (typeof DrawerTab)[keyof typeof DrawerTab];

/* ============================================================
 * DRAWER MODE
 * ============================================================
 */

export const DrawerMode = {
  VIEW: "VIEW",
  EDIT: "EDIT",
} as const;

export type DrawerMode =
  (typeof DrawerMode)[keyof typeof DrawerMode];

/* ============================================================
 * DRAWER STATE
 * ============================================================
 */

export interface DrawerState {
  open: boolean;

  mode: DrawerMode;

  activeTab: DrawerTab;

  selectedRecord?: MedicalRecord;
}

/* ============================================================
 * DRAWER ACTION
 * ============================================================
 */

export interface DrawerAction {
  id: string;

  label: string;

  icon: string;

  disabled?: boolean;

  danger?: boolean;
}

/* ============================================================
 * DRAWER CONFIG
 * ============================================================
 */

export interface DrawerConfig {
  width?: number | string;

  closeOnOverlayClick?: boolean;

  closeOnEsc?: boolean;

  showTabs?: boolean;

  showActions?: boolean;
}