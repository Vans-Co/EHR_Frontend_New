import WelcomeBanner from "@/features/patient/components/WelcomeBanner";
import KPISection from "@/features/patient/components/KPISection";
import HealthProfileCard from "@/features/patient/components/HealthProfileCard";
import ActivityFeed from "@/features/patient/components/ActivityFeed";
import FinancialOverview from "@/features/patient/components/FinancialOverview";

import { patientDashboardData } from "@/features/patient/mock/patientDashboard.mock";

const dashboard = patientDashboardData;

const PatientDashboard = () => {
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