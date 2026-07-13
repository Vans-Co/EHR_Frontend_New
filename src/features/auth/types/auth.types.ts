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
export interface Address {
  addressLine: string;
  pin_code: number;
  city: string;
  state: string;
}

export interface AuthUser {
  email: string;
  ehrId: number;
  firstName: string;
  lastName: string;
  phoneNo: number;
  dob: string;
  gender: string;
  role: string;
  bloodGroup: string;
  address: Address;
}

export interface TokenResponse {
  generateAccessToken: string;
  generateRefreshToken: string;
}

export interface LoginResponse {
  loginResponse: {
    status: boolean;
    message: string;
    userResponseDTO: AuthUser;
  };
  tokenResponse: TokenResponse;
}
