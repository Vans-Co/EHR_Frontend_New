import type { MedicalRecord } from "../types/medicalRecord.types";

export const medicalRecords: MedicalRecord[] = [
  {
    id: 1,
    title: "Complete Blood Count",
    doctor: "Dr. Sarah Johnson",
    hospital: "City Care Hospital",
    department: "Pathology",
    reportType: "Blood Test",
    date: "2026-06-12",
    description:
      "Routine blood examination showing normal haemoglobin, RBC, WBC and platelet count.",
    image: "https://placehold.co/600x400?text=Blood+Test",
    fileUrl: "https://placehold.co/600x400?text=Blood+Test",
    fileName: "Blood_Report.pdf",
    fileType: "image/png",
    source: "Hospital",
    status: "Verified",
  },

  {
    id: 2,
    title: "Chest X-Ray",
    doctor: "Dr. Michael Lee",
    hospital: "Sunrise Hospital",
    department: "Radiology",
    reportType: "X-Ray",
    date: "2026-05-28",
    description:
      "Chest X-Ray examination. No active pulmonary disease detected.",
    image: "https://placehold.co/600x400?text=Chest+X-Ray",
    fileUrl: "https://placehold.co/600x400?text=Chest+X-Ray",
    fileName: "Chest_XRay.png",
    fileType: "image/png",
    source: "Hospital",
    status: "Reviewed",
  },

  {
    id: 3,
    title: "Brain MRI",
    doctor: "Dr. Emily Brown",
    hospital: "Metro Neuro Center",
    department: "Neurology",
    reportType: "MRI",
    date: "2026-04-15",
    description:
      "MRI scan of the brain performed for persistent headaches. No abnormalities detected.",
    image: "https://placehold.co/600x400?text=Brain+MRI",
    fileUrl: "https://placehold.co/600x400?text=Brain+MRI",
    fileName: "Brain_MRI.pdf",
    fileType: "application/pdf",
    source: "Hospital",
    status: "Verified",
  },

  {
    id: 4,
    title: "Personal Prescription",
    doctor: "Self Upload",
    hospital: "Uploaded by Patient",
    department: "General",
    reportType: "Prescription",
    date: "2026-07-01",
    description:
      "Prescription uploaded by the patient for future reference.",
    image: "https://placehold.co/600x400?text=Prescription",
    fileUrl: "https://placehold.co/600x400?text=Prescription",
    fileName: "Prescription.jpg",
    fileType: "image/jpeg",
    source: "Patient",
    status: "Pending",
  },
];