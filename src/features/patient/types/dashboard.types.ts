/**
 * ============================================================
 * PATIENT DASHBOARD TYPES
 * ============================================================
 * These interfaces represent the complete Dashboard API.
 *
 * Frontend:
 * - Components consume these interfaces.
 *
 * Backend:
 * - Spring Boot API should return this exact structure.
 *
 * NOTE:
 * - Patient name comes from Auth Store.
 * - Greeting is generated on frontend.
 * ============================================================
 */

/* ============================================================
   Welcome
============================================================ */

export interface NextAppointment {
  doctorName: string;
  specialization: string;
  hospital: string;
  date: string;
  time: string;
}

export interface WelcomeData {
  todayDate: string;
  nextAppointment: NextAppointment;
}

/* ============================================================
   Reports
============================================================ */

export type ReportType =
  | "lab"
  | "ecg"
  | "xray"
  | "scan"
  | "other";

export interface ReportItem {
  id: number;
  title: string;
  date: string;
  type: ReportType;
}

export interface ReportsData {
  total: number;
  lastUpdated: string;
  reports: ReportItem[];
}

/* ============================================================
   Prescriptions
============================================================ */

export interface PrescriptionMedicine {
  id: number;
  name: string;
  dosage: string;
  duration: string;
}

export interface PrescriptionData {
  active: number;
  nextRefill: string;
  medicines: PrescriptionMedicine[];
}

/* ============================================================
   Wellness
============================================================ */

export interface WellnessData {
  score: number;
  status: string;
}

/* ============================================================
   KPI Section
============================================================ */

export interface KPIData {
  reports: ReportsData;
  prescriptions: PrescriptionData;
  wellness: WellnessData;
}

/* ============================================================
   Health Profile
============================================================ */

export interface EmergencyContact {
  name: string;
  relation: string;
  phone: string;
}

export interface HealthProfileData {
  patientId: string;
  age: number;
  gender: string;

  bloodGroup: string;

  condition: string;

  allergies: string;

  primaryDoctor: string;

  medication: string;

  lastVisit: string;

  emergencyContact: EmergencyContact;
}

/* ============================================================
   Financial
============================================================ */

export interface InsuranceData {
  provider: string;
  claimNumber: string;
  status: string;
}

export interface RecentPaymentData {
  title: string;
  amount: number;
}

export interface FinancialData {
  outstandingBalance: number;

  billTitle: string;

  insurance: InsuranceData;

  recentPayment: RecentPaymentData;
}

/* ============================================================
   Activity Feed
============================================================ */

export type ActivityType =
  | "appointment"
  | "report"
  | "medication";

export interface ActivityItem {
  id: number;
  title: string;
  description: string;
  type: ActivityType;
  time: string;
}

/* ============================================================
   Complete Dashboard Response
============================================================ */

export interface DashboardData {
  welcome: WelcomeData;

  kpi: KPIData;

  profile: HealthProfileData;

  financial: FinancialData;

  activities: ActivityItem[];
}