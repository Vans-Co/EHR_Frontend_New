import api from "../../../config/axios";

// Doctor Profile
export const getDoctorProfile = async (id: string) => {
  const response = await api.get(`/doctors/${id}/profile`);
  return response.data;
};

export const updateDoctorProfile = async (id: string, data: any) => {
  const response = await api.put(`/doctors/${id}/profile`, data);
  return response.data;
};

export const updateDoctorPassword = async (id: string, data: any) => {
  const response = await api.patch(`/doctors/${id}/password`, data);
  return response.data;
};

export const updateDoctorDegrees = async (id: string, data: any) => {
  const response = await api.put(`/doctors/${id}/degrees`, data);
  return response.data;
};

// Search Patients
export const searchPatients = async (query: string) => {
  const response = await api.get("/users/search-patients", {
    params: { query },
  });
  return response.data;
};

// Report Access Request
export const requestReportAccess = async (dto: { doctorId: string; patientId: string }) => {
  const response = await api.post("/reports/access/request", dto);
  return response.data;
};

export const getReportAccessRequestsForDoctor = async (doctorId: string) => {
  const response = await api.get(`/reports/access/doctor/${doctorId}`);
  return response.data;
};

// Report upload
export const addReport = async (dto: any) => {
  const response = await api.post("/reports", dto);
  return response.data;
};

// Prescriptions & Medications
export const addMedication = async (dto: any) => {
  const response = await api.post("/patients/medications", dto);
  return response.data;
};

export const updateMedication = async (medicationId: number, dto: any) => {
  const response = await api.put(`/patients/${medicationId}/medications`, dto);
  return response.data;
};

// Diet Instructions
export const addDietInstruction = async (patientId: string, dto: any) => {
  const response = await api.post(`/patient/${patientId}/diet_instruction`, dto);
  return response.data;
};

export const getDietInstruction = async (dietId: number) => {
  const response = await api.get(`/patient/${dietId}/diet_instruction`);
  return response.data;
};

export const updateDietInstruction = async (patientId: string, dietId: number, dto: any) => {
  const response = await api.put(`/patient/${patientId}/${dietId}/diet_instruction`, dto);
  return response.data;
};

export const deleteDietInstruction = async (patientId: string, dietId: number) => {
  const response = await api.delete(`/patient/${patientId}/diet_instruction`, {
    params: { dietId },
  });
  return response.data;
};
