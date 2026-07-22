import {
  dashboardSummary,
  hospitalRecords,
  patientUploads,
  quickActions,
  recentHospitalRecords,
  recentPatientUploads,
} from "../mock";

import type {
  DashboardSummary,
  HospitalRecord,
  PatientUpload,
  QuickAction,
} from "../types";

class MedicalRecordsService {
  /* ==========================================
   * Dashboard
   * ========================================== */

  async getDashboardSummary(): Promise<DashboardSummary> {
    return dashboardSummary;
  }

  async getQuickActions(): Promise<QuickAction[]> {
    return quickActions;
  }

  /* ==========================================
   * Hospital Records
   * ========================================== */

  async getHospitalRecords(): Promise<HospitalRecord[]> {
    return hospitalRecords;
  }

  async getRecentHospitalRecords(): Promise<HospitalRecord[]> {
    return recentHospitalRecords;
  }

  async getHospitalRecordById(
    id: string
  ): Promise<HospitalRecord | undefined> {
    return hospitalRecords.find(
      (record) => record.id === id
    );
  }

  /* ==========================================
   * Patient Uploads
   * ========================================== */

  async getPatientUploads(): Promise<PatientUpload[]> {
    return patientUploads;
  }

  async getRecentPatientUploads(): Promise<PatientUpload[]> {
    return recentPatientUploads;
  }

  async getPatientUploadById(
    id: string
  ): Promise<PatientUpload | undefined> {
    return patientUploads.find(
      (record) => record.id === id
    );
  }

  /* ==========================================
   * Search
   * ========================================== */

  async searchRecords(query: string): Promise<{
    hospitalRecords: HospitalRecord[];
    patientUploads: PatientUpload[];
  }> {
    const search = query.toLowerCase().trim();

    return {
      hospitalRecords: hospitalRecords.filter((record) =>
        [
          record.title,
          record.description,
          record.hospital.hospitalName,
          record.hospital.doctorName,
        ]
          .join(" ")
          .toLowerCase()
          .includes(search)
      ),

      patientUploads: patientUploads.filter((record) =>
        [
          record.title,
          record.description,
          record.patientNotes ?? "",
        ]
          .join(" ")
          .toLowerCase()
          .includes(search)
      ),
    };
  }
}

export const medicalRecordsService =
  new MedicalRecordsService();