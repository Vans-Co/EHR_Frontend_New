import type { DashboardData } from "../types/dashboard.types";

export const patientDashboardData: DashboardData = {
  welcome: {
    todayDate: "2026-07-17",

    nextAppointment: {
      doctorName: "Dr. Julian Lawson",
      specialization: "Cardiology",
      hospital: "Vans Healthcare",
      date: "2026-07-18",
      time: "10:30 AM",
    },
  },

  kpi: {
    reports: {
      total: 14,

      lastUpdated: "2 days ago",

      reports: [
        {
          id: 1,
          title: "Blood Test",
          date: "Today",
          type: "lab",
        },
        {
          id: 2,
          title: "ECG Report",
          date: "Yesterday",
          type: "ecg",
        },
        {
          id: 3,
          title: "Chest X-Ray",
          date: "18 Jun",
          type: "xray",
        },
      ],
    },

    prescriptions: {
      active: 3,

      nextRefill: "22 Jul",

      medicines: [
        {
          id: 1,
          name: "Lisinopril 10mg",
          dosage: "Once Daily",
          duration: "30 Days",
        },
        {
          id: 2,
          name: "Vitamin D3",
          dosage: "After Breakfast",
          duration: "60 Days",
        },
        {
          id: 3,
          name: "Paracetamol 500mg",
          dosage: "SOS",
          duration: "5 Days",
        },
      ],
    },

    wellness: {
      score: 92,

      status: "Excellent",
    },
  },

  profile: {
    patientId: "PT-20481",

    age: 22,

    gender: "Female",

    bloodGroup: "O+",

    condition: "Healthy",

    allergies: "None",

    primaryDoctor: "Dr. Julian Lawson",

    medication: "3 Active",

    lastVisit: "12 Jul 2026",

    emergencyContact: {
      name: "Rajesh Dave",

      relation: "Father",

      phone: "+91 9876543210",
    },
  },

  financial: {
    outstandingBalance: 145,

    billTitle: "Cardiology Lab Work",

    insurance: {
      provider: "Aetna",

      claimNumber: "CLM-8291",

      status: "Approved",
    },

    recentPayment: {
      title: "Pharmacy Co-pay",

      amount: 15,
    },
  },

  activities: [
    {
      id: 1,
      title: "Appointment Booked",
      description: "Dr. Julian Lawson",
      type: "appointment",
      time: "2 hrs ago",
    },

    {
      id: 2,
      title: "Lab Report Uploaded",
      description: "CBC Report",
      type: "report",
      time: "Yesterday",
    },

    {
      id: 3,
      title: "Medication Reminder",
      description: "Lisinopril 10mg",
      type: "medication",
      time: "Today • 8:00 AM",
    },
  ],
};