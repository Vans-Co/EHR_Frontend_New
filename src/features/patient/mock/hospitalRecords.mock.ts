import {
  Department,
  DocumentStatus,
  DocumentType,
  DoctorReviewStatus,
  FileType,
  RecordSource,
  TimelineEventType,
  VerificationStatus,
} from "../types";

import type { HospitalRecord } from "../types";

export const hospitalRecords: HospitalRecord[] = [
  {
    id: "HR001",

    title: "Cardiology Consultation",

    description: "Initial consultation for chest pain",

    source: RecordSource.HOSPITAL,

    documentType: DocumentType.CONSULTATION,

    status: DocumentStatus.ACTIVE,

    file: {
      id: "FILE001",

      fileName: "cardiology-consultation.pdf",

      originalFileName: "Consultation.pdf",

      fileType: FileType.PDF,

      extension: ".pdf",

      mimeType: "application/pdf",

      fileSize: 2456000,

      totalPages: 4,

      thumbnailUrl: "/documents/thumbnails/consultation.png",

      previewUrl: "/documents/previews/consultation.pdf",

      downloadUrl: "/documents/downloads/consultation.pdf",
    },

    hospital: {
      hospitalId: "HOSP001",

      hospitalName: "Apollo Hospitals Navi Mumbai",

      department: Department.CARDIOLOGY,

      doctorId: "DOC001",

      doctorName: "Dr. Rajesh Sharma",

      doctorSpecialization: "Cardiologist",

      encounterId: "ENC001",

      visitDate: new Date("2026-07-05"),
    },

    medical: {
      chiefComplaint: "Chest pain while climbing stairs",

      diagnosis: "Stable Angina",

      treatment: "Medication & lifestyle modification",

      clinicalNotes:
        "Patient advised ECG and TMT for further evaluation.",

      followUpAdvice: "Review after 15 days",

      medications: [
        "Aspirin 75mg",
        "Atorvastatin 20mg",
      ],

      allergies: [
        "Penicillin",
      ],
    },

    verification: {
      status: VerificationStatus.VERIFIED,

      verifiedBy: "Apollo Records Department",

      verifiedDate: new Date("2026-07-05"),

      remarks: "Verified",
    },

    review: {
      status: DoctorReviewStatus.REVIEWED,

      reviewedBy: "Dr. Rajesh Sharma",

      reviewDate: new Date("2026-07-05"),

      notes: "Continue medication.",
    },

    timeline: [
      {
        id: "T001",

        title: "Record Created",

        description: "Hospital uploaded consultation",

        type: TimelineEventType.CREATED,

        performedBy: "Apollo Hospital",

        date: new Date("2026-07-05"),
      },
      {
        id: "T002",

        title: "Verified",

        description: "Document verified",

        type: TimelineEventType.VERIFIED,

        performedBy: "Medical Records",

        date: new Date("2026-07-05"),
      },
    ],

    tags: [
      "Cardiology",
      "Consultation",
    ],

    isFavorite: true,

    isShared: false,

    shareCount: 0,

    downloadCount: 3,

    viewCount: 11,

    createdAt: new Date("2026-07-05"),

    updatedAt: new Date("2026-07-05"),

    uploadedAt: new Date("2026-07-05"),

    createdBy: "Apollo Hospital",

    updatedBy: "Apollo Hospital",
  },
    {
    id: "HR002",

    title: "Complete Blood Count",

    description: "Routine laboratory investigation",

    source: RecordSource.HOSPITAL,

    documentType: DocumentType.LAB_REPORT,

    status: DocumentStatus.ACTIVE,

    file: {
      id: "FILE002",

      fileName: "cbc-report.pdf",

      originalFileName: "CBC_Report.pdf",

      fileType: FileType.PDF,

      extension: ".pdf",

      mimeType: "application/pdf",

      fileSize: 1540000,

      totalPages: 2,

      thumbnailUrl: "/documents/thumbnails/lab.png",

      previewUrl: "/documents/previews/lab.pdf",

      downloadUrl: "/documents/downloads/lab.pdf",
    },

    hospital: {
      hospitalId: "HOSP002",

      hospitalName: "Fortis Hospital Mulund",

      department: Department.PATHOLOGY,

      doctorId: "DOC002",

      doctorName: "Dr. Meera Kulkarni",

      doctorSpecialization: "Pathologist",

      encounterId: "ENC002",

      visitDate: new Date("2026-06-21"),
    },

    medical: {
      diagnosis: "Normal CBC values",

      clinicalNotes: "No abnormalities detected.",
    },

    verification: {
      status: VerificationStatus.VERIFIED,

      verifiedBy: "Fortis Hospital",

      verifiedDate: new Date("2026-06-21"),
    },

    review: {
      status: DoctorReviewStatus.REVIEWED,

      reviewedBy: "Dr. Meera Kulkarni",

      reviewDate: new Date("2026-06-21"),
    },

    timeline: [
      {
        id: "T003",

        title: "Lab Report Uploaded",

        description: "Laboratory report generated",

        type: TimelineEventType.UPLOADED,

        performedBy: "Fortis Laboratory",

        date: new Date("2026-06-21"),
      },
    ],

    tags: [
      "Laboratory",
      "Blood Test",
    ],

    isFavorite: false,

    isShared: true,

    shareCount: 2,

    downloadCount: 5,

    viewCount: 17,

    createdAt: new Date("2026-06-21"),

    updatedAt: new Date("2026-06-21"),

    uploadedAt: new Date("2026-06-21"),

    createdBy: "Fortis Hospital",

    updatedBy: "Fortis Hospital",
  },

  {
    id: "HR003",

    title: "MRI Brain Report",

    description: "MRI Brain with contrast",

    source: RecordSource.HOSPITAL,

    documentType: DocumentType.RADIOLOGY,

    status: DocumentStatus.ACTIVE,

    file: {
      id: "FILE003",

      fileName: "mri-brain.pdf",

      originalFileName: "MRI_Brain_Report.pdf",

      fileType: FileType.PDF,

      extension: ".pdf",

      mimeType: "application/pdf",

      fileSize: 4823000,

      totalPages: 8,

      thumbnailUrl: "/documents/thumbnails/mri.png",

      previewUrl: "/documents/previews/mri.pdf",

      downloadUrl: "/documents/downloads/mri.pdf",
    },

    hospital: {
      hospitalId: "HOSP003",

      hospitalName: "Kokilaben Dhirubhai Ambani Hospital",

      department: Department.RADIOLOGY,

      doctorId: "DOC003",

      doctorName: "Dr. Amit Deshpande",

      doctorSpecialization: "Radiologist",

      encounterId: "ENC003",

      visitDate: new Date("2026-05-18"),
    },

    medical: {
      diagnosis: "No acute intracranial abnormality",

      clinicalNotes:
        "Brain MRI appears normal. No evidence of hemorrhage or infarct.",
    },

    verification: {
      status: VerificationStatus.VERIFIED,

      verifiedBy: "Radiology Department",

      verifiedDate: new Date("2026-05-18"),
    },

    review: {
      status: DoctorReviewStatus.REVIEWED,

      reviewedBy: "Dr. Amit Deshpande",

      reviewDate: new Date("2026-05-18"),

      notes: "Normal study.",
    },

    timeline: [
      {
        id: "T004",

        title: "MRI Uploaded",

        description: "Radiology report uploaded",

        type: TimelineEventType.UPLOADED,

        performedBy: "Radiology Department",

        date: new Date("2026-05-18"),
      },
    ],

    tags: [
      "MRI",
      "Radiology",
    ],

    isFavorite: false,

    isShared: false,

    shareCount: 0,

    downloadCount: 2,

    viewCount: 6,

    createdAt: new Date("2026-05-18"),

    updatedAt: new Date("2026-05-18"),

    uploadedAt: new Date("2026-05-18"),

    createdBy: "Kokilaben Hospital",

    updatedBy: "Kokilaben Hospital",
  },
    {
    id: "HR002",

    title: "Complete Blood Count",

    description: "Routine laboratory investigation",

    source: RecordSource.HOSPITAL,

    documentType: DocumentType.LAB_REPORT,

    status: DocumentStatus.ACTIVE,

    file: {
      id: "FILE002",

      fileName: "cbc-report.pdf",

      originalFileName: "CBC_Report.pdf",

      fileType: FileType.PDF,

      extension: ".pdf",

      mimeType: "application/pdf",

      fileSize: 1540000,

      totalPages: 2,

      thumbnailUrl: "/documents/thumbnails/lab.png",

      previewUrl: "/documents/previews/lab.pdf",

      downloadUrl: "/documents/downloads/lab.pdf",
    },

    hospital: {
      hospitalId: "HOSP002",

      hospitalName: "Fortis Hospital Mulund",

      department: Department.PATHOLOGY,

      doctorId: "DOC002",

      doctorName: "Dr. Meera Kulkarni",

      doctorSpecialization: "Pathologist",

      encounterId: "ENC002",

      visitDate: new Date("2026-06-21"),
    },

    medical: {
      diagnosis: "Normal CBC values",

      clinicalNotes: "No abnormalities detected.",
    },

    verification: {
      status: VerificationStatus.VERIFIED,

      verifiedBy: "Fortis Hospital",

      verifiedDate: new Date("2026-06-21"),
    },

    review: {
      status: DoctorReviewStatus.REVIEWED,

      reviewedBy: "Dr. Meera Kulkarni",

      reviewDate: new Date("2026-06-21"),
    },

    timeline: [
      {
        id: "T003",

        title: "Lab Report Uploaded",

        description: "Laboratory report generated",

        type: TimelineEventType.UPLOADED,

        performedBy: "Fortis Laboratory",

        date: new Date("2026-06-21"),
      },
    ],

    tags: [
      "Laboratory",
      "Blood Test",
    ],

    isFavorite: false,

    isShared: true,

    shareCount: 2,

    downloadCount: 5,

    viewCount: 17,

    createdAt: new Date("2026-06-21"),

    updatedAt: new Date("2026-06-21"),

    uploadedAt: new Date("2026-06-21"),

    createdBy: "Fortis Hospital",

    updatedBy: "Fortis Hospital",
  },

  {
    id: "HR003",

    title: "MRI Brain Report",

    description: "MRI Brain with contrast",

    source: RecordSource.HOSPITAL,

    documentType: DocumentType.RADIOLOGY,

    status: DocumentStatus.ACTIVE,

    file: {
      id: "FILE003",

      fileName: "mri-brain.pdf",

      originalFileName: "MRI_Brain_Report.pdf",

      fileType: FileType.PDF,

      extension: ".pdf",

      mimeType: "application/pdf",

      fileSize: 4823000,

      totalPages: 8,

      thumbnailUrl: "/documents/thumbnails/mri.png",

      previewUrl: "/documents/previews/mri.pdf",

      downloadUrl: "/documents/downloads/mri.pdf",
    },

    hospital: {
      hospitalId: "HOSP003",

      hospitalName: "Kokilaben Dhirubhai Ambani Hospital",

      department: Department.RADIOLOGY,

      doctorId: "DOC003",

      doctorName: "Dr. Amit Deshpande",

      doctorSpecialization: "Radiologist",

      encounterId: "ENC003",

      visitDate: new Date("2026-05-18"),
    },

    medical: {
      diagnosis: "No acute intracranial abnormality",

      clinicalNotes:
        "Brain MRI appears normal. No evidence of hemorrhage or infarct.",
    },

    verification: {
      status: VerificationStatus.VERIFIED,

      verifiedBy: "Radiology Department",

      verifiedDate: new Date("2026-05-18"),
    },

    review: {
      status: DoctorReviewStatus.REVIEWED,

      reviewedBy: "Dr. Amit Deshpande",

      reviewDate: new Date("2026-05-18"),

      notes: "Normal study.",
    },

    timeline: [
      {
        id: "T004",

        title: "MRI Uploaded",

        description: "Radiology report uploaded",

        type: TimelineEventType.UPLOADED,

        performedBy: "Radiology Department",

        date: new Date("2026-05-18"),
      },
    ],

    tags: [
      "MRI",
      "Radiology",
    ],

    isFavorite: false,

    isShared: false,

    shareCount: 0,

    downloadCount: 2,

    viewCount: 6,

    createdAt: new Date("2026-05-18"),

    updatedAt: new Date("2026-05-18"),

    uploadedAt: new Date("2026-05-18"),

    createdBy: "Kokilaben Hospital",

    updatedBy: "Kokilaben Hospital",
  },
    {
    id: "HR004",

    title: "Discharge Summary",

    description: "Hospital discharge after laparoscopic appendectomy",

    source: RecordSource.HOSPITAL,

    documentType: DocumentType.DISCHARGE_SUMMARY,

    status: DocumentStatus.ACTIVE,

    file: {
      id: "FILE004",

      fileName: "discharge-summary.pdf",

      originalFileName: "Discharge_Summary.pdf",

      fileType: FileType.PDF,

      extension: ".pdf",

      mimeType: "application/pdf",

      fileSize: 3254000,

      totalPages: 6,

      thumbnailUrl: "/documents/thumbnails/discharge.png",

      previewUrl: "/documents/previews/discharge.pdf",

      downloadUrl: "/documents/downloads/discharge.pdf",
    },

    hospital: {
      hospitalId: "HOSP004",

      hospitalName: "Nanavati Max Super Speciality Hospital",

      department: Department.GENERAL_MEDICINE,

      doctorId: "DOC004",

      doctorName: "Dr. Neha Kapoor",

      doctorSpecialization: "General Surgeon",

      encounterId: "ENC004",

      visitDate: new Date("2026-04-30"),
    },

    medical: {
      diagnosis: "Acute Appendicitis",

      treatment: "Laparoscopic Appendectomy",

      clinicalNotes:
        "Patient recovered well after surgery with no complications.",

      followUpAdvice:
        "Review after one week. Avoid lifting heavy weights.",

      medications: [
        "Paracetamol 650mg",
        "Amoxicillin 500mg",
      ],
    },

    verification: {
      status: VerificationStatus.VERIFIED,

      verifiedBy: "Medical Records Department",

      verifiedDate: new Date("2026-04-30"),

      remarks: "Verified",
    },

    review: {
      status: DoctorReviewStatus.REVIEWED,

      reviewedBy: "Dr. Neha Kapoor",

      reviewDate: new Date("2026-04-30"),

      notes: "Recovery progressing normally.",
    },

    timeline: [
      {
        id: "T005",

        title: "Discharge Summary Created",

        description: "Patient discharged successfully",

        type: TimelineEventType.CREATED,

        performedBy: "Nanavati Hospital",

        date: new Date("2026-04-30"),
      },
    ],

    tags: [
      "Surgery",
      "Discharge",
    ],

    isFavorite: true,

    isShared: true,

    shareCount: 1,

    downloadCount: 7,

    viewCount: 18,

    createdAt: new Date("2026-04-30"),

    updatedAt: new Date("2026-04-30"),

    uploadedAt: new Date("2026-04-30"),

    createdBy: "Nanavati Hospital",

    updatedBy: "Nanavati Hospital",
  },

  {
    id: "HR005",

    title: "Hypertension Prescription",

    description: "Follow-up prescription for hypertension",

    source: RecordSource.HOSPITAL,

    documentType: DocumentType.PRESCRIPTION,

    status: DocumentStatus.ACTIVE,

    file: {
      id: "FILE005",

      fileName: "prescription.pdf",

      originalFileName: "Prescription.pdf",

      fileType: FileType.PDF,

      extension: ".pdf",

      mimeType: "application/pdf",

      fileSize: 845000,

      totalPages: 1,

      thumbnailUrl: "/documents/thumbnails/prescription.png",

      previewUrl: "/documents/previews/prescription.pdf",

      downloadUrl: "/documents/downloads/prescription.pdf",
    },

    hospital: {
      hospitalId: "HOSP005",

      hospitalName: "P. D. Hinduja Hospital",

      department: Department.CARDIOLOGY,

      doctorId: "DOC005",

      doctorName: "Dr. Sanjay Mehta",

      doctorSpecialization: "Cardiologist",

      encounterId: "ENC005",

      visitDate: new Date("2026-03-15"),
    },

    medical: {
      diagnosis: "Primary Hypertension",

      treatment: "Continue antihypertensive medication",

      medications: [
        "Telmisartan 40mg",
        "Amlodipine 5mg",
      ],

      clinicalNotes:
        "Blood pressure controlled. Continue medication and reduce salt intake.",

      followUpAdvice: "Review after one month.",
    },

    verification: {
      status: VerificationStatus.VERIFIED,

      verifiedBy: "Hinduja Hospital",

      verifiedDate: new Date("2026-03-15"),

      remarks: "Verified",
    },

    review: {
      status: DoctorReviewStatus.REVIEWED,

      reviewedBy: "Dr. Sanjay Mehta",

      reviewDate: new Date("2026-03-15"),

      notes: "Patient stable.",
    },

    timeline: [
      {
        id: "T006",

        title: "Prescription Issued",

        description: "Prescription uploaded",

        type: TimelineEventType.CREATED,

        performedBy: "Dr. Sanjay Mehta",

        date: new Date("2026-03-15"),
      },
    ],

    tags: [
      "Prescription",
      "Cardiology",
    ],

    isFavorite: false,

    isShared: false,

    shareCount: 0,

    downloadCount: 4,

    viewCount: 12,

    createdAt: new Date("2026-03-15"),

    updatedAt: new Date("2026-03-15"),

    uploadedAt: new Date("2026-03-15"),

    createdBy: "Hinduja Hospital",

    updatedBy: "Hinduja Hospital",
  },
];