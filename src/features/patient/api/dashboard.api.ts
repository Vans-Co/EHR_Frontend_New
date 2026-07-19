import type { DashboardData } from "../types/dashboard.types";

export const patientDashboardData: DashboardData = {
  welcome: {
    todayDate: "17 July 2026",

    nextAppointment: {
      doctorName: "Dr. Julian Lawson",
      specialization: "Cardiology",
      hospital: "Vans Healthcare",
      date: "18 Jul 2026",
      time: "10:30 AM",
    },
  },

  kpi: {
    reports: {
      total: 14,
      lastUpdated: "2 days ago",
      reports: [],
    },

    prescriptions: {
      active: 3,
      nextRefill: "22 Jul",
      medicines: [],
    },

    wellness: {
      score: 92,
      status: "Excellent",
    },
  },

  profile: {
    patientId: "PT-20481",

    bloodGroup: "O+",

    age: 22,

    gender: "Female",

    condition: "Healthy",

    allergies: "None",

    primaryDoctor: "Dr. Julian Lawson",

    medication: "1 Active",

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

      claimNumber: "8291",

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
