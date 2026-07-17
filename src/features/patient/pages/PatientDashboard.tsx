import WelcomeBanner from "@/features/patient/components/WelcomeBanner";
import KPISection from "@/features/patient/components/KPISection";
import HealthProfileCard from "@/features/patient/components/HealthProfileCard";
import ActivityFeed from "@/features/patient/components/ActivityFeed";
import FinancialOverview from "@/features/patient/components/FinancialOverview";

const PatientDashboard = () => {
  return (
    <div className="mx-auto flex w-full max-w-[1700px] flex-col gap-7">

      {/* Welcome Banner */}
      <WelcomeBanner />

      {/* Next Appointment + KPI Cards */}
      <KPISection />

      {/* Health Profile */}
      <section>
        <HealthProfileCard />
      </section>

      {/* Financial + Activity */}
      <section className="grid items-stretch gap-6 xl:grid-cols-10">

        {/* Financial Overview - 60% */}
        <div className="xl:col-span-6 h-full">
          <FinancialOverview />
        </div>

        {/* Activity Feed - 40% */}
        <div className="xl:col-span-4 h-full">
          <ActivityFeed />
        </div>

      </section>

    </div>
  );
};

export default PatientDashboard;