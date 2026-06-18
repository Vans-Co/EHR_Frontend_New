// Roles
export type UserRole =
  | "PATIENT"
  | "DOCTOR"
  | "ADMIN";

// Login Request
export interface LoginRequest {
  email: string;
  password: string;
}

// Register Request
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
  address: {
    addressLine: string;
    city: string;
    state: string;
    pin_code: number;
  };
  emergencyContact?: {
    contactName: string;
    relationship: string;
    contactPhoneNo: number;
  };
  doctorProfile?: {
    specialization: string;
    licenseNumber: string;
    degrees: string[];
  };
}

// Token Response
export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

// Auth User
export interface AuthUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
}

// Login Response
export interface LoginResponse {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}
