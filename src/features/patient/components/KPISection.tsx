import type {
  KPIData,
  NextAppointment,
} from "@/features/patient/types/dashboard.types";

import NextAppointmentCard from "./NextAppointmentCard";
import ReportsCard from "./ReportsCard";
import PrescriptionCard from "./PrescriptionCard";
import WellnessScore from "./WellnessScore";

interface KPISectionProps {
  appointment: NextAppointment;
  data: KPIData;
}

const KPISection = ({
  appointment,
  data,
}: KPISectionProps) => {
  return (
    <section className="space-y-6">

      {/* Next Appointment */}

      <div className="flex justify-center lg:justify-start">
        <div className="w-full max-w-3xl">

          <NextAppointmentCard
            data={appointment}
          />

        </div>
      </div>

      {/* KPI Cards */}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">

        <ReportsCard
          data={data.reports}
        />

        <PrescriptionCard
          data={data.prescriptions}
        />

        {/* Static Component (No API Required) */}

        <WellnessScore />

      </div>

    </section>
  );
};

export default KPISection;