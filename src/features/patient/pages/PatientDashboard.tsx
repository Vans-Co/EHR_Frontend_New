import WelcomeBanner from "../components/WelcomeBanner";
import KPISection from "../components/KPISection";
import HealthProfileCard from "../components/HealthProfileCard";
import AppointmentTable from "../components/AppointmentTable";
import AppointmentTrends from "../components/AppointmentTrends";
import WellnessScore from "../components/WellnessScore";
import RecentRecords from "../components/RecentRecords";
import FinancialOverview from "../components/FinancialOverview";
import ActivityFeed from "../components/ActivityFeed";

const PatientDashboard = () => {
  return (
    <div className="space-y-6">
      <WelcomeBanner />

      <KPISection />

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 space-y-6 lg:col-span-8">
          <HealthProfileCard />
          <AppointmentTable />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <AppointmentTrends />
            <WellnessScore />
          </div>
        </div>

        <div className="col-span-12 space-y-6 lg:col-span-4">
          <RecentRecords />
          <FinancialOverview />
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;