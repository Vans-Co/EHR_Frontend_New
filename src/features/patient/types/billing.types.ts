export type BillingServiceType =
  | "Appointment"
  | "Consultation"
  | "Lab Test"
  | "Scan"
  | "Medication"
  | "Procedure";

export type BillingStatus =
  | "paid"
  | "dueSoon"
  | "pending"
  | "overdue";

export interface BillingCharge {
  id: string;
  label: string;
  amount: number;
}

export interface BillingItem {
  id: string;
  invoiceId: string;
  invoiceNumber: string;
  serviceType: BillingServiceType;
  date: string;
  dueDate: string;
  description: string;
  amount: number;
  status: BillingStatus;
  doctor: string;
  patient: string;
}

export interface BillingInvoice {
  id: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  doctor: string;
  patient: string;
  charges: BillingCharge[];
  discounts: number;
  insuranceCoverage: number;
  finalAmount: number;
  paymentStatus: BillingStatus;
  paymentMethod?: string;
  transactionId?: string;
  receiptNumber?: string;
}

export interface BillingPaymentHistoryItem {
  id: string;
  date: string;
  invoiceId: string;
  invoiceNumber: string;
  amount: number;
  paymentMethod: string;
  transactionId: string;
  status: "paid";
}

export interface RecurringBill {
  id: string;
  serviceName: string;
  frequency: string;
  nextBillingDate: string;
  amount: number;
  status: "active" | "dueSoon" | "paused";
  details: string;
}

export interface BillingReminder {
  id: string;
  title: string;
  description: string;
  status: BillingStatus;
}

export interface InsuranceBillingSummary {
  totalBill: number;
  insuranceCovered: number;
  patientPayable: number;
  claimStatus: string;
}

export interface BillingSummary {
  totalOutstanding: number;
  totalPaid: number;
  upcomingDue: number;
  activeRecurringBills: number;
}

export interface PatientBillingData {
  summary: BillingSummary;
  items: BillingItem[];
  invoices: BillingInvoice[];
  payments: BillingPaymentHistoryItem[];
  recurringBills: RecurringBill[];
  reminders: BillingReminder[];
  insurance?: InsuranceBillingSummary;
}
