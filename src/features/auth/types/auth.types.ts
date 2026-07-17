// ===============================
// User Roles
// ===============================

export type UserRole =
  | "PATIENT"
  | "DOCTOR"
  | "ADMIN";

// ===============================
// Login Request
// ===============================

export interface LoginRequest {
  email: string;
  password: string;
}

// ===============================
// Address
// ===============================

export interface Address {
  addressLine: string;
  city: string;
  state: string;
  pin_code: number;
}

// ===============================
// Emergency Contact
// ===============================

export interface EmergencyContact {
  contactName: string;
  relationship: string;
  contactPhoneNo: number;
}

// ===============================
// Doctor Profile
// ===============================

export interface DoctorProfile {
  specialization: string;
  licenseNumber: string;
  degrees: string[];
}

// ===============================
// Register Request
// ===============================

export interface RegisterRequest {
  firstName: string;
  lastName: string;

  email: string;
  password: string;

  role: UserRole;

  dob: string;

  gender: "Male" | "Female" | "Other";

  phoneNo: number;

  bloodGroup: string;

  address: Address;

  emergencyContact?: EmergencyContact;

  doctorProfile?: DoctorProfile;
}

// ===============================
// Logged In User
// ===============================

export interface AuthUser {
  ehrId: number;

  firstName: string;
  lastName: string;

  email: string;

  phoneNo: number;

  dob: string;

  gender: string;

  role: UserRole;

  bloodGroup: string;

  address: Address;
}

// ===============================
// Token Response
// ===============================

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

// ===============================
// Login Response
// ===============================

export interface LoginResponse {
  loginResponse: {
    status: boolean;
    message: string;
    user: AuthUser;
  };

  tokenResponse: TokenResponse;
}