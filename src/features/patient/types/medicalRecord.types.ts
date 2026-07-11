export interface MedicalRecord {
  id: number;
  title: string;
  doctor: string;
  hospital: string;
  department: string;
  reportType:
    | "Blood Test"
    | "MRI"
    | "CT Scan"
    | "X-Ray"
    | "Prescription"
    | "ECG"
    | "Ultrasound"
    | "Other";

  date: string;
  description: string;
  image: string;
  // Local uploaded file URL
  fileUrl?: string;
  // File type
  fileType?: string;
  // Original filename
  fileName?: string;
  source: "Hospital" | "Patient";
  status: "Verified" | "Reviewed" | "Pending";
}