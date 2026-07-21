import api from "@/config/axios";

export type RequestStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface RestrictionRequest {
  id: number;
  patientId: string;
  patientName: string;
  accessorId: string;
  accessorName: string;
  status: RequestStatus;
  restrictedAttributes: string[];
  requestedAt: string;
  respondedAt: string | null;
}

export interface ReportAccessRequest {
  id: number;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  status: RequestStatus;
  requestedAt: string;
  respondedAt: string | null;
}

export const permissionsApi = {
  async getRestrictionRequests(patientId: string): Promise<RestrictionRequest[]> {
    const { data } = await api.get(`/restrictions/patient/${patientId}`);
    return Array.isArray(data) ? data : [];
  },

  approveRestriction(requestId: number, attributes: string[]) {
    return api.put(`/restrictions/approve/${requestId}`, attributes);
  },

  rejectRestriction(requestId: number) {
    return api.put(`/restrictions/reject/${requestId}`);
  },

  async getReportAccessRequests(patientId: string): Promise<ReportAccessRequest[]> {
    const { data } = await api.get(`/reports/access/patient/${patientId}`);
    return Array.isArray(data) ? data : [];
  },

  approveReportAccess(requestId: number) {
    return api.put(`/reports/access/approve/${requestId}`);
  },

  rejectReportAccess(requestId: number) {
    return api.put(`/reports/access/reject/${requestId}`);
  },
};
