import api from "@/config/axios";

export interface MyReport {
  id: number;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  dateTime: string;
  info: string;
  desc: string;
  conclusion: string;
  fileName: string | null;
  fileType: string | null;
}

export const reportsApi = {
  async getMyReports(ehrId: string): Promise<MyReport[]> {
    const { data } = await api.get(`/reports/patient/${ehrId}`);
    return Array.isArray(data) ? data : [];
  },

  async downloadReport(id: number): Promise<Blob> {
    const { data } = await api.get(`/reports/${id}/download`, {
      responseType: "blob",
    });
    return data;
  },
};
