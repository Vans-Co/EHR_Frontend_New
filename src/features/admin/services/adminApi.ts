import api from "../../../config/axios";

// Doctors Management
export const getAllDoctors = async () => {
  const response = await api.get("/doctors/all");
  return response.data;
};

export const searchDoctors = async (query: string) => {
  const response = await api.get("/doctors/search", {
    params: { query },
  });
  return response.data;
};

export const deleteDoctor = async (id: string) => {
  const response = await api.delete(`/doctors/${id}`);
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};

// Restriction Management
export const requestRestrictionGrant = async (dto: {
  patientId: string;
  accessorId: string;
  restrictedAttributes: string[];
}) => {
  const response = await api.post("/restrictions/request", dto);
  return response.data;
};

// Create Doctor
export const createDoctor = async (dto: any) => {
  const response = await api.post("/auth/register", dto);
  return response.data;
};

// Appointment Management
export const deleteAppointment = async (id: number) => {
  const response = await api.delete(`/appointments/${id}`);
  return response.data;
};
