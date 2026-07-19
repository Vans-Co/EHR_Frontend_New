import { useCallback, useEffect, useState } from "react";

import WelcomeBanner from "@/features/patient/components/WelcomeBanner";
import KPISection from "@/features/patient/components/KPISection";
import HealthProfileCard from "@/features/patient/components/HealthProfileCard";
import ActivityFeed from "@/features/patient/components/ActivityFeed";
import FinancialOverview from "@/features/patient/components/FinancialOverview";

import { useAuthStore } from "@/store/authStore";
import { normalizeEhrId } from "@/features/patient/components/patientProfileUtils";
import { formatBloodGroup } from "@/features/patient/components/patientProfileUtils";
import { getPatientProfile } from "@/features/patient/services/patientApi";
import {
  getPatientAppointments,
  getPatientMedicalRecords,
  getDashboardAllergies,
} from "@/features/patient/services/dashboardApi";

import type {
  DashboardData,
  NextAppointment,
  PrescriptionMedicine,
} from "@/features/patient/types/dashboard.types";
import type { AppointmentResponse, MedicineResponse } from "@/features/patient/services/dashboardApi";
import type { PatientAllergy } from "@/features/patient/types/allergy.types";
import type { PatientProfile } from "@/features/patient/types/patient.types";

/* ============================================================
   Helpers to transform API data into dashboard shape
============================================================ */

const formatAppointmentDate = (dateStr: string): string => {
  if (!dateStr) return "";
  // Backend returns mm-dd-yyyy
  const parts = dateStr.split("-");
  if (parts.length === 3 && parts[0].length <= 2) {
    return `${parts[2]}-${parts[0]}-${parts[1]}`; // yyyy-mm-dd for Date()
  }
  return dateStr;
};

const formatTime12h = (timeStr: string): string => {
  if (!timeStr) return "";
  const [h, m] = timeStr.split(":");
  const hour = parseInt(h, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${m} ${ampm}`;
};

const buildNextAppointment = (
  appointments: AppointmentResponse[]
): NextAppointment | null => {
  const scheduled = appointments.filter((a) => a.status === "SCHEDULED");
  if (scheduled.length === 0) return null;

  const next = scheduled[0];
  return {
    doctorName: next.doctorId || "Your Doctor",
    specialization: "General",
    hospital: "Vans Healthcare",
    date: formatAppointmentDate(next.date),
    time: formatTime12h(next.startTime),
  };
};

const shiftToDosage = (shift: string): string => {
  switch (shift) {
    case "MORNING_BeforeFood":
      return "Morning (Before Food)";
    case "MORNING_AfterFood":
      return "Morning (After Food)";
    case "EVENING_BeforeFood":
      return "Evening (Before Food)";
    case "EVENING_AfterFood":
      return "Evening (After Food)";
    case "NIGHT_BeforeFood":
      return "Night (Before Food)";
    case "NIGHT_AfterFood":
      return "Night (After Food)";
    default:
      return "Once Daily";
  }
};

const buildPrescriptionMedicines = (
  records: MedicineResponse[]
): PrescriptionMedicine[] => {
  const medicines: PrescriptionMedicine[] = [];
  let counter = 1;

  for (const record of records) {
    if (!record.details) continue;
    for (const detail of record.details) {
      if (detail.isActive) {
        medicines.push({
          id: counter++,
          name: `${detail.medicineName} ${detail.dosageMg}mg`,
          dosage: shiftToDosage(detail.shift),
          duration: `${detail.tenure} Days`,
        });
      }
    }
  }

  return medicines.slice(0, 5);
};

const buildAllergyString = (allergies: PatientAllergy[]): string => {
  if (allergies.length === 0) return "None";
  const names = allergies.slice(0, 3).map((a) => a.allergyItem || a.category);
  return allergies.length > 3
    ? `${names.join(", ")} +${allergies.length - 3}`
    : names.join(", ");
};

/* ============================================================
   Static fallback data (for sections without endpoints)
============================================================ */

const staticWelcome = {
  todayDate: new Date().toISOString().slice(0, 10),
  nextAppointment: {
    doctorName: "No upcoming",
    specialization: "—",
    hospital: "Vans Healthcare",
    date: new Date().toISOString().slice(0, 10),
    time: "—",
  },
};

const staticFinancial = {
  outstandingBalance: 0,
  billTitle: "No outstanding bills",
  insurance: {
    provider: "—",
    claimNumber: "—",
    status: "—",
  },
  recentPayment: {
    title: "—",
    amount: 0,
  },
};

const staticActivities = [
  {
    id: 1,
    title: "Welcome to EHR",
    description: "Your dashboard is ready",
    type: "appointment" as const,
    time: "Just now",
  },
];

/* ============================================================
   Component
============================================================ */

const PatientDashboard = () => {
  const authUser = useAuthStore((state) => state.user);
  const ehrId = normalizeEhrId(authUser?.ehrId);

  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadDashboard = useCallback(async () => {
    if (!ehrId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      // Fetch all data in parallel
      const [profileResult, appointmentsResult, recordsResult, allergiesResult] =
        await Promise.allSettled([
          getPatientProfile(ehrId),
          getPatientAppointments(ehrId, 0, 10),
          getPatientMedicalRecords(ehrId, 0, 10),
          getDashboardAllergies(ehrId),
        ]);

      const profile: PatientProfile | null =
        profileResult.status === "fulfilled" ? profileResult.value : null;

      const appointments: AppointmentResponse[] =
        appointmentsResult.status === "fulfilled"
          ? appointmentsResult.value.content ?? []
          : [];

      const records: MedicineResponse[] =
        recordsResult.status === "fulfilled"
          ? recordsResult.value.content ?? []
          : [];

      const allergies: PatientAllergy[] =
        allergiesResult.status === "fulfilled" ? allergiesResult.value : [];

      // Build next appointment
      const nextAppointment = buildNextAppointment(appointments);

      // Build prescriptions
      const activeMedicines = buildPrescriptionMedicines(records);

      // Build allergy string
      const allergyString = buildAllergyString(allergies);

      // Count appointments
      const completedAppointments = appointments.filter(
        (a) => a.status === "COMPLETED"
      ).length;

      const data: DashboardData = {
        welcome: {
          todayDate: new Date().toISOString().slice(0, 10),
          nextAppointment: nextAppointment ?? staticWelcome.nextAppointment,
        },

        kpi: {
          reports: {
            total: completedAppointments,
            lastUpdated: "Just now",
            reports: appointments.slice(0, 3).map((a, i) => ({
              id: i + 1,
              title: `Appointment with ${a.doctorId || "Doctor"}`,
              date: a.date || "—",
              type: "other" as const,
            })),
          },
          prescriptions: {
            active: activeMedicines.length,
            nextRefill: "—",
            medicines:
              activeMedicines.length > 0
                ? activeMedicines
                : [
                    {
                      id: 1,
                      name: "No active prescriptions",
                      dosage: "—",
                      duration: "—",
                    },
                  ],
          },
          wellness: {
            score: 92,
            status: "Excellent",
          },
        },

        profile: {
          patientId: ehrId,
          age: profile?.dob
            ? Math.floor(
                (Date.now() - new Date(profile.dob).getTime()) /
                  (365.25 * 24 * 60 * 60 * 1000)
              )
            : 0,
          gender: profile?.gender ?? "—",
          bloodGroup: formatBloodGroup(profile?.bloodGroup ?? ""),
          condition: "Healthy",
          allergies: allergyString,
          primaryDoctor: "—",
          medication: `${activeMedicines.length} Active`,
          lastVisit:
            appointments.length > 0
              ? appointments[0].date || "—"
              : "—",
          emergencyContact: {
            name: profile?.emergencyContact?.contactName ?? "—",
            relation: profile?.emergencyContact?.relationship ?? "—",
            phone: profile?.emergencyContact?.contactPhoneNo
              ? `+91 ${profile.emergencyContact.contactPhoneNo}`
              : "—",
          },
        },

        financial: staticFinancial,
        activities: staticActivities,
      };

      setDashboard(data);
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [ehrId]);

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

  if (isLoading) {
    return (
      <div className="mx-auto flex w-full max-w-[1700px] flex-col gap-7">
        <div className="h-48 animate-pulse rounded-3xl bg-white/70 shadow-sm" />
        <div className="h-64 animate-pulse rounded-[28px] bg-white/70 shadow-sm" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-72 animate-pulse rounded-[30px] bg-white/70 shadow-sm"
            />
          ))}
        </div>
        <div className="h-64 animate-pulse rounded-[30px] bg-white/70 shadow-sm" />
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="mx-auto flex w-full max-w-[1700px] flex-col items-center justify-center gap-4 py-20">
        <p className="text-lg font-semibold text-slate-700">
          Unable to load dashboard
        </p>
        <p className="text-sm text-slate-500">Please try refreshing the page.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-[1700px] flex-col gap-7">

      {/* Welcome Banner */}

      <WelcomeBanner
        data={dashboard.welcome}
      />

      {/* Next Appointment + KPI */}

      <KPISection
        appointment={dashboard.welcome.nextAppointment}
        data={dashboard.kpi}
      />

      {/* Health Profile */}

      <section>

        <HealthProfileCard
          data={dashboard.profile}
        />

      </section>

      {/* Financial + Activity */}

      <section className="grid items-stretch gap-6 xl:grid-cols-10">

        {/* Financial */}

        <div className="h-full xl:col-span-6">

          <FinancialOverview
            data={dashboard.financial}
          />

        </div>

        {/* Activity */}

        <div className="h-full xl:col-span-4">

          <ActivityFeed
            data={dashboard.activities}
          />

        </div>

      </section>

    </div>
  );
};

export default PatientDashboard;