export interface PatientAddress {
  addressLine: string;
  city: string;
  state: string;
  pin_code: number;
}

export interface PatientEmergencyContact {
  contactName: string;
  contactPhoneNo: number;
  relationship: string;
}

export interface DoctorProfile {
  aadhaarNumber: string;
  panNumber: string;
  specialization: string;
  licenseNumber: string;
  aboutDoctor: string;
  degrees: string[];
}

export interface PatientProfile {
  email: string;
  ehrId: string;
  firstName: string;
  lastName: string;
  phoneNo: number;
  dob: string;
  gender: string;
  role: string;
  bloodGroup: string;
  maritalStatus: string;
  address: PatientAddress;
  emergencyContact: PatientEmergencyContact;
  doctorProfile?: DoctorProfile;
}

export interface UpdatePatientProfileRequest {
  firstName: string;
  lastName: string;
  phoneNo: number;
  dob: string;
  gender: string;
  bloodGroup: string;
  maritalStatus: string;
  address: PatientAddress;
  emergencyContact: PatientEmergencyContact;
}

export interface PatientProfileFormValues {
  firstName: string;
  lastName: string;
  email: string;
  ehrId: string;
  role: string;
  phoneNo: string;
  dob: string;
  gender: string;
  bloodGroup: string;
  maritalStatus: string;
  addressLine: string;
  city: string;
  state: string;
  pin_code: string;
  contactName: string;
  contactPhoneNo: string;
  relationship: string;
}

export interface PatientProfileFieldErrors {
  firstName?: string;
  lastName?: string;
  phoneNo?: string;
  dob?: string;
  gender?: string;
  bloodGroup?: string;
  maritalStatus?: string;
  addressLine?: string;
  city?: string;
  state?: string;
  pin_code?: string;
  contactName?: string;
  contactPhoneNo?: string;
  relationship?: string;
}
