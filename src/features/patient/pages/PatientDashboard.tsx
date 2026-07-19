import { useNavigate } from "react-router-dom";

import WelcomeBanner from "@/features/patient/components/WelcomeBanner";
import KPISection from "@/features/patient/components/KPISection";
import HealthProfileCard from "@/features/patient/components/HealthProfileCard";
import ActivityFeed from "@/features/patient/components/ActivityFeed";
import FinancialOverview from "@/features/patient/components/FinancialOverview";
import AppointmentDrawer from "@/features/patient/components/Appointments/AppointmentDrawer";

import { patientDashboardData } from "@/features/patient/mock/patientDashboard.mock";

import useAppointments from "@/hooks/useAppointments";

const dashboard = patientDashboardData;

const PatientDashboard = () => {
  const navigate = useNavigate();

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
          data={dashboard.profile}
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