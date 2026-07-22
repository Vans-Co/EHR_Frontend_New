import {
  hospitalRecords,
} from "./hospitalRecords.mock";

import {
  patientUploads,
} from "./patientUploads.mock";

import type {
  HospitalRecord,
  PatientUpload,
} from "../types";

/* ============================================================
 * RECENT HOSPITAL RECORDS
 * ============================================================
 */

export const recentHospitalRecords: HospitalRecord[] =
  [...hospitalRecords]
    .sort(
      (a, b) =>
        b.uploadedAt.getTime() -
        a.uploadedAt.getTime()
    )
    .slice(0, 5);

/* ============================================================
 * RECENT PATIENT UPLOADS
 * ============================================================
 */

export const recentPatientUploads: PatientUpload[] =
  [...patientUploads]
    .sort(
      (a, b) =>
        b.uploadedAt.getTime() -
        a.uploadedAt.getTime()
    )
    .slice(0, 5);