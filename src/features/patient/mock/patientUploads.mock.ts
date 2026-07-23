import {
  DocumentStatus,
  DocumentType,
  DoctorReviewStatus,
  FileType,
  RecordSource,
  TimelineEventType,
  VerificationStatus,
} from "../types";

import type { PatientUpload } from "../types";

export const patientUploads: PatientUpload[] = [
  {
    id: "PU001",

    title: "COVID-19 Vaccination Certificate",

    description: "Final vaccination certificate uploaded by patient",

    source: RecordSource.PATIENT,

    documentType: DocumentType.VACCINATION,

    status: DocumentStatus.ACTIVE,

    file: {
      id: "PFILE001",

      fileName: "covid-vaccine.pdf",

      originalFileName: "Vaccination_Certificate.pdf",

      fileType: FileType.PDF,

      extension: ".pdf",

      mimeType: "application/pdf",

      fileSize: 942000,

      totalPages: 1,

      thumbnailUrl: "/documents/thumbnails/vaccine.png",

      previewUrl: "/documents/previews/vaccine.pdf",

      downloadUrl: "/documents/downloads/vaccine.pdf",
    },

    medical: {
      clinicalNotes: "COVID-19 Vaccination Certificate",

      medications: [],

      allergies: [],
    },

    verification: {
      status: VerificationStatus.VERIFIED,

      verifiedBy: "Apollo Hospital",

      verifiedDate: new Date("2026-07-02"),

      remarks: "Certificate verified.",
    },

    review: {
      status: DoctorReviewStatus.REVIEWED,

      reviewedBy: "Dr. Rajesh Sharma",

      reviewDate: new Date("2026-07-03"),

      notes: "Vaccination record accepted.",
    },

    timeline: [
      {
        id: "PT001",

        title: "Uploaded",

        description: "Patient uploaded certificate",

        type: TimelineEventType.UPLOADED,

        performedBy: "Patient",

        date: new Date("2026-07-01"),
      },
      {
        id: "PT002",

        title: "Verified",

        description: "Hospital verified certificate",

        type: TimelineEventType.VERIFIED,

        performedBy: "Apollo Hospital",

        date: new Date("2026-07-02"),
      },
    ],

    tags: [
      "Vaccination",
      "COVID-19",
    ],

    isFavorite: true,

    isShared: false,

    shareCount: 0,

    downloadCount: 2,

    viewCount: 8,

    createdAt: new Date("2026-07-01"),

    updatedAt: new Date("2026-07-02"),

    uploadedAt: new Date("2026-07-01"),

    createdBy: "Patient",

    updatedBy: "Patient",

    uploadedByPatient: true,

    patientNotes:
      "Uploaded for future consultations.",

    verifiedByHospital: true,
  },

  {
    id: "PU002",

    title: "Health Insurance Card",

    description: "Insurance identification document",

    source: RecordSource.PATIENT,

    documentType: DocumentType.INSURANCE,

    status: DocumentStatus.ACTIVE,

    file: {
      id: "PFILE002",

      fileName: "insurance-card.pdf",

      originalFileName: "Insurance_Card.pdf",

      fileType: FileType.PDF,

      extension: ".pdf",

      mimeType: "application/pdf",

      fileSize: 632000,

      totalPages: 2,

      thumbnailUrl: "/documents/thumbnails/insurance.png",

      previewUrl: "/documents/previews/insurance.pdf",

      downloadUrl: "/documents/downloads/insurance.pdf",
    },

    medical: {
      clinicalNotes:
        "Insurance card uploaded by patient.",
    },

    verification: {
      status: VerificationStatus.PENDING,
    },

    review: {
      status: DoctorReviewStatus.NOT_REVIEWED,
    },

    timeline: [
      {
        id: "PT003",

        title: "Uploaded",

        description: "Insurance document uploaded",

        type: TimelineEventType.UPLOADED,

        performedBy: "Patient",

        date: new Date("2026-06-28"),
      },
    ],

    tags: [
      "Insurance",
    ],

    isFavorite: false,

    isShared: false,

    shareCount: 0,

    downloadCount: 0,

    viewCount: 3,

    createdAt: new Date("2026-06-28"),

    updatedAt: new Date("2026-06-28"),

    uploadedAt: new Date("2026-06-28"),

    createdBy: "Patient",

    updatedBy: "Patient",

    uploadedByPatient: true,

    patientNotes:
      "For cashless admission.",

    verifiedByHospital: false,
  },
    {
    id: "PU003",

    title: "Home Blood Sugar Report",

    description: "Weekly blood glucose monitoring report",

    source: RecordSource.PATIENT,

    documentType: DocumentType.LAB_REPORT,

    status: DocumentStatus.ACTIVE,

    file: {
      id: "PFILE003",

      fileName: "blood-sugar-report.pdf",

      originalFileName: "Blood_Sugar_Report.pdf",

      fileType: FileType.PDF,

      extension: ".pdf",

      mimeType: "application/pdf",

      fileSize: 1256000,

      totalPages: 3,

      thumbnailUrl: "/documents/thumbnails/lab.png",

      previewUrl: "/documents/previews/lab.pdf",

      downloadUrl: "/documents/downloads/lab.pdf",
    },

    medical: {
      diagnosis: "Diabetes Monitoring",

      clinicalNotes:
        "Patient maintained daily blood glucose readings.",

      followUpAdvice:
        "Review with endocrinologist during next visit.",
    },

    verification: {
      status: VerificationStatus.PENDING,
    },

    review: {
      status: DoctorReviewStatus.UNDER_REVIEW,
    },

    timeline: [
      {
        id: "PT004",

        title: "Uploaded",

        description: "Blood sugar report uploaded",

        type: TimelineEventType.UPLOADED,

        performedBy: "Patient",

        date: new Date("2026-06-20"),
      },
    ],

    tags: [
      "Diabetes",
      "Blood Sugar",
      "Lab Report",
    ],

    isFavorite: false,

    isShared: true,

    shareCount: 1,

    downloadCount: 1,

    viewCount: 6,

    createdAt: new Date("2026-06-20"),

    updatedAt: new Date("2026-06-20"),

    uploadedAt: new Date("2026-06-20"),

    createdBy: "Patient",

    updatedBy: "Patient",

    uploadedByPatient: true,

    patientNotes:
      "Home monitoring report before follow-up.",

    verifiedByHospital: false,
  },

  {
    id: "PU004",

    title: "Local Clinic Prescription",

    description: "Prescription from family physician",

    source: RecordSource.PATIENT,

    documentType: DocumentType.PRESCRIPTION,

    status: DocumentStatus.ACTIVE,

    file: {
      id: "PFILE004",

      fileName: "clinic-prescription.pdf",

      originalFileName: "Clinic_Prescription.pdf",

      fileType: FileType.PDF,

      extension: ".pdf",

      mimeType: "application/pdf",

      fileSize: 814000,

      totalPages: 2,

      thumbnailUrl: "/documents/thumbnails/prescription.png",

      previewUrl: "/documents/previews/prescription.pdf",

      downloadUrl: "/documents/downloads/prescription.pdf",
    },

    medical: {
      diagnosis: "Seasonal Viral Infection",

      treatment: "Symptomatic treatment",

      medications: [
        "Paracetamol 650mg",
        "Cetirizine 10mg",
      ],

      clinicalNotes:
        "Patient advised adequate hydration and rest.",

      followUpAdvice:
        "Visit physician if fever persists for more than 3 days.",
    },

    verification: {
      status: VerificationStatus.REJECTED,

      remarks:
        "Hospital could not verify the issuing clinic.",
    },

    review: {
      status: DoctorReviewStatus.NOT_REVIEWED,
    },

    timeline: [
      {
        id: "PT005",

        title: "Uploaded",

        description: "Prescription uploaded by patient",

        type: TimelineEventType.UPLOADED,

        performedBy: "Patient",

        date: new Date("2026-05-12"),
      },
      {
        id: "PT006",

        title: "Verification Failed",

        description:
          "Unable to verify issuing clinic",

        type: TimelineEventType.UPDATED,

        performedBy: "Medical Records",

        date: new Date("2026-05-14"),
      },
    ],

    tags: [
      "Prescription",
      "Clinic",
    ],

    isFavorite: false,

    isShared: false,

    shareCount: 0,

    downloadCount: 0,

    viewCount: 5,

    createdAt: new Date("2026-05-12"),

    updatedAt: new Date("2026-05-14"),

    uploadedAt: new Date("2026-05-12"),

    createdBy: "Patient",

    updatedBy: "Medical Records",

    uploadedByPatient: true,

    patientNotes:
      "Prescription from my family doctor.",

    verifiedByHospital: false,
  },
    {
    id: "PU005",

    title: "Annual Health Checkup Report",

    description: "Comprehensive annual health screening report",

    source: RecordSource.PATIENT,

    documentType: DocumentType.LAB_REPORT,

    status: DocumentStatus.ACTIVE,

    file: {
      id: "PFILE005",

      fileName: "annual-health-checkup.pdf",

      originalFileName: "Annual_Health_Checkup.pdf",

      fileType: FileType.PDF,

      extension: ".pdf",

      mimeType: "application/pdf",

      fileSize: 2845000,

      totalPages: 12,

      thumbnailUrl: "/documents/thumbnails/health-checkup.png",

      previewUrl: "/documents/previews/health-checkup.pdf",

      downloadUrl: "/documents/downloads/health-checkup.pdf",
    },

    medical: {
      diagnosis: "Routine Preventive Health Check",

      treatment: "No treatment required",

      clinicalNotes:
        "Overall health parameters within normal limits. Continue healthy lifestyle.",

      followUpAdvice:
        "Repeat annual health checkup after one year.",

      medications: [],

      allergies: [],
    },

    verification: {
      status: VerificationStatus.VERIFIED,

      verifiedBy: "Apollo Hospital",

      verifiedDate: new Date("2026-04-08"),

      remarks: "Verified successfully.",
    },

    review: {
      status: DoctorReviewStatus.REVIEWED,

      reviewedBy: "Dr. Rajesh Sharma",

      reviewDate: new Date("2026-04-09"),

      notes:
        "Annual report reviewed. No immediate medical concerns.",
    },

    timeline: [
      {
        id: "PT007",

        title: "Uploaded",

        description: "Annual health checkup uploaded",

        type: TimelineEventType.UPLOADED,

        performedBy: "Patient",

        date: new Date("2026-04-07"),
      },
      {
        id: "PT008",

        title: "Verified",

        description: "Health report verified",

        type: TimelineEventType.VERIFIED,

        performedBy: "Apollo Hospital",

        date: new Date("2026-04-08"),
      },
      {
        id: "PT009",

        title: "Reviewed",

        description: "Doctor reviewed report",

        type: TimelineEventType.REVIEWED,

        performedBy: "Dr. Rajesh Sharma",

        date: new Date("2026-04-09"),
      },
    ],

    tags: [
      "Health Checkup",
      "Annual",
      "Preventive Care",
    ],

    isFavorite: true,

    isShared: true,

    shareCount: 2,

    downloadCount: 4,

    viewCount: 15,

    createdAt: new Date("2026-04-07"),

    updatedAt: new Date("2026-04-09"),

    uploadedAt: new Date("2026-04-07"),

    createdBy: "Patient",

    updatedBy: "Apollo Hospital",

    uploadedByPatient: true,

    patientNotes:
      "Annual preventive health checkup report for future reference.",

    verifiedByHospital: true,
  },
];