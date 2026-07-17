import NextAppointmentCard from "./NextAppointmentCard";
import ReportsCard from "./ReportsCard";
import PrescriptionCard from "./PrescriptionCard";
import WellnessScore from "./WellnessScore";

const KPISection = () => {
  return (
    <section className="space-y-6">

      <div className="flex justify-center lg:justify-start">
        <div className="w-full max-w-3xl">
          <NextAppointmentCard />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <ReportsCard />

        <PrescriptionCard />

        <WellnessScore />
      </div>

    </section>
  );
};

export default KPISection;