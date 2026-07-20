import type { KPIData } from "@/features/patient/types/dashboard.types";
import type { Appointment } from "@/features/patient/types/appointment.types";

import NextAppointmentCard from "./NextAppointmentCard";
import ReportsCard from "./ReportsCard";
import PrescriptionCard from "./PrescriptionCard";
import WellnessScore from "./WellnessScore";

interface KPISectionProps {
  appointment: Appointment | null;

  data: KPIData;

  onViewAppointment?: (id: string) => void;
}

const KPISection = ({
  appointment,
  data,
  onViewAppointment,
}: KPISectionProps) => {
  return (
    <section className="space-y-6">

      {/* Next Appointment */}

      <div className="flex justify-center lg:justify-start">
        <div className="w-full max-w-3xl">

          <NextAppointmentCard
            data={appointment}
            onViewDetails={onViewAppointment}
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

        <WellnessScore />

      </div>

    </section>
  );
};

export default KPISection;