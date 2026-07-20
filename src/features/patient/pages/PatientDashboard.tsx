import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import WelcomeBanner from "@/features/patient/components/WelcomeBanner";
import KPISection from "@/features/patient/components/KPISection";
import HealthProfileCard from "@/features/patient/components/HealthProfileCard";
import ActivityFeed from "@/features/patient/components/ActivityFeed";
import FinancialOverview from "@/features/patient/components/FinancialOverview";
import AppointmentDrawer from "@/features/patient/components/Appointments/AppointmentDrawer";
import { getPatientAllergies } from "@/features/patient/services/patientAllergiesApi";
import { normalizeEhrId } from "@/features/patient/components/patientProfileUtils";
import { useAuthStore } from "@/store/authStore";

import { patientDashboardData } from "@/features/patient/mock/patientDashboard.mock";
import type { PatientAllergy } from "@/features/patient/types/allergy.types";

import useAppointments from "@/hooks/useAppointments";

const dashboard = patientDashboardData;

const PatientDashboard = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const patientId =
    normalizeEhrId(user?.ehrId) ||
    dashboard.profile.patientId;
  const [allergies, setAllergies] = useState<
    PatientAllergy[]
  >([]);

  const {
    nextAppointment,

    drawerOpen,
    drawerMode,

    selectedAppointment,

    loading,

    openCreateDrawer,
    openViewDrawer,
    closeDrawer,

    createAppointment,
    updateAppointment,
  } = useAppointments();

  useEffect(() => {
    let isMounted = true;

    const loadAllergies = async () => {
      try {
        const response =
          await getPatientAllergies(patientId);

        if (isMounted) {
          setAllergies(response);
        }
      } catch (error) {
        console.error(
          "Failed to load dashboard allergies.",
          error
        );

        if (isMounted) {
          setAllergies([]);
        }
      }
    };

    void loadAllergies();

    return () => {
      isMounted = false;
    };
  }, [patientId]);

  const allergySummary = useMemo(() => {
    if (allergies.length === 0) {
      return "None reported";
    }

    const allergyNames = allergies
      .map((allergy) => allergy.allergyItem.trim())
      .filter(Boolean);

    if (allergyNames.length === 0) {
      return `${allergies.length} recorded`;
    }

    if (allergyNames.length <= 2) {
      return allergyNames.join(", ");
    }

    return `${allergyNames
      .slice(0, 2)
      .join(", ")} +${allergyNames.length - 2}`;
  }, [allergies]);

  const profileData = useMemo(
    () => ({
      ...dashboard.profile,
      patientId,
      bloodGroup:
        user?.bloodGroup ||
        dashboard.profile.bloodGroup,
      allergies: allergySummary,
    }),
    [allergySummary, patientId, user?.bloodGroup]
  );

  return (
    <div className="mx-auto flex w-full max-w-[1700px] flex-col gap-7">

      {/* Welcome Banner */}

      <WelcomeBanner
        data={dashboard.welcome}
        onBookAppointment={openCreateDrawer}
        onViewRecords={() =>
          navigate("/patient/medical-records")
        }
      />

      {/* KPI */}

      <KPISection
        appointment={nextAppointment}
        data={dashboard.kpi}
        onViewAppointment={() => {
          if (nextAppointment) {
            openViewDrawer(nextAppointment);
          }
        }}
      />

      {/* Health */}

      <section>

        <HealthProfileCard
          data={profileData}
          onAllergiesClick={() =>
            navigate("/patient/allergies")
          }
        />

      </section>

      {/* Bottom */}

      <section className="grid items-stretch gap-6 xl:grid-cols-10">

        <div className="h-full xl:col-span-6">

          <FinancialOverview
            data={dashboard.financial}
          />

        </div>

        <div className="h-full xl:col-span-4">

          <ActivityFeed
            data={dashboard.activities}
          />

        </div>

      </section>

      {/* Appointment Drawer */}

      <AppointmentDrawer
        open={drawerOpen}
        mode={drawerMode}
        appointment={selectedAppointment}
        loading={loading}
        onClose={closeDrawer}
        onSubmit={(data) => {
          if (drawerMode === "create") {
            createAppointment(data);
          } else if (
            drawerMode === "edit" &&
            selectedAppointment
          ) {
            updateAppointment(
              selectedAppointment.id,
              data
            );
          }
        }}
      />

    </div>
  );
};

export default PatientDashboard;
