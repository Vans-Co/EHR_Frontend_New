import api from "../../../config/axios";

// User profile endpoints
export const getUserById = async (id: string) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const updateUserProfile = async (id: string, data: any) => {
  const response = await api.put(`/users/${id}`, data);
  return response.data;
};

export const updateUserBloodGroup = async (id: string, bloodGroup: string) => {
  const response = await api.patch(`/users/${id}/BloodGroup`, { bloodGroup });
  return response.data;
};

// Appointments
export const listAppointmentsByPatient = async (
  userId: string,
  page = 0,
  size = 5,
  sortBy = "appointmentTime"
) => {
  const response = await api.get(`/appointments/all/${userId}`, {
    params: { page, size, sortBy },
  });
  return response.data;
};

export const createAppointment = async (dto: any) => {
  const response = await api.post("/appointments", dto);
  return response.data;
};

export const rescheduleAppointment = async (id: number, dto: any) => {
  const response = await api.put(`/appointments/${id}/reschedule`, dto);
  return response.data;
};

export const cancelAppointment = async (id: number) => {
  const response = await api.patch(`/appointments/${id}/cancel`);
  return response.data;
};

// Medical Records & Medications
export const getMedicalRecords = async (
  patientId: string,
  page = 0,
  size = 5,
  sortBy = "prescribedOn"
) => {
  const response = await api.get(`/patients/${patientId}/medical-records`, {
    params: { page_no: page, size, property: sortBy },
  });
  return response.data;
};

export const getMedicalRecordById = async (recordId: number) => {
  const response = await api.get(`/patients/medical-records/${recordId}`);
  return response.data;
};

export const getActiveMedications = async (
  patientId: string,
  page = 0,
  size = 5,
  sortBy = "prescribedOn"
) => {
  const response = await api.get(`/patients/${patientId}/medications`, {
    params: { page_no: page, size, property: sortBy },
  });
  return response.data;
};

export const getMedicationHistory = async (
  patientId: string,
  page = 0,
  size = 5,
  sortBy = "prescribedOn"
) => {
  const response = await api.get(`/patients/${patientId}/medication/history`, {
    params: { page_no: page, size, property: sortBy },
  });
  return response.data;
};

export const getDietInstructionsByPatient = async (patientId: string) => {
  const response = await api.get(`/patients/${patientId}/diet-instructions`);
  return response.data;
};

// Allergies
export const getPatientAllergies = async (patientId: string) => {
  const response = await api.get(`/patients/${patientId}/allergies`);
  return response.data;
};

export const createAllergy = async (patientId: string, dto: any) => {
  const response = await api.post(`/patients/${patientId}/allergies`, dto);
  return response.data;
};

export const updateAllergy = async (patientId: string, dto: any) => {
  const response = await api.put(`/patients/${patientId}/allergies`, dto);
  return response.data;
};

export const deleteAllergy = async (patientId: string, allergyId: number) => {
  const response = await api.delete(`/patients/${patientId}/allergies/${allergyId}`);
  return response.data;
};

// Reports and Report Access requests
export const getReportsByPatient = async (patientId: string) => {
  const response = await api.get(`/reports/patient/${patientId}`);
  return response.data;
};

export const downloadReportFile = async (id: number) => {
  const response = await api.get(`/reports/${id}/download`, {
    responseType: "blob",
  });
  return response.data;
};

export const getReportAccessRequestsForPatient = async (patientId: string) => {
  const response = await api.get(`/reports/access/patient/${patientId}`);
  return response.data;
};

export const approveReportAccess = async (requestId: number) => {
  const response = await api.put(`/reports/access/approve/${requestId}`);
  return response.data;
};

export const rejectReportAccess = async (requestId: number) => {
  const response = await api.put(`/reports/access/reject/${requestId}`);
  return response.data;
};

// Restriction Grants
export const getRestrictionGrantsForPatient = async (patientId: string) => {
  const response = await api.get(`/restrictions/patient/${patientId}`);
  return response.data;
};

export const approveRestrictionGrant = async (requestId: number, attributes: string[]) => {
  const response = await api.put(`/restrictions/approve/${requestId}`, attributes);
  return response.data;
};

export const rejectRestrictionGrant = async (requestId: number) => {
  const response = await api.put(`/restrictions/reject/${requestId}`);
  return response.data;
};

// Notifications
export const getNotificationsForUser = async (patientId: string) => {
  const response = await api.get(`/notifications/patient/${patientId}`);
  return response.data;
};

export const markNotificationAsRead = async (id: number) => {
  const response = await api.put(`/notifications/${id}/read`);
  return response.data;
};
