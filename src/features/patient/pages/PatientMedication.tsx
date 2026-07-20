import { Pill, Sunrise, Moon } from "lucide-react";

import PrescriptionCard from "@/features/patient/components/PrescriptionCard";
import { patientDashboardData } from "@/features/patient/mock/patientDashboard.mock";

// "Medication" shows the medicines the patient is currently on — the same
// "Today's Medicines" data as the dashboard card, expanded onto a full page.
const PatientMedication = () => {
  const prescriptions = patientDashboardData.kpi.prescriptions;

  return (
    <div className="space-y-6 p-4 md:p-8">
      <div>
        <h1 className="text-2xl font-bold text-on-background md:text-3xl">
          Medication
        </h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          The medicines you are currently taking.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,360px)_1fr]">
        {/* reuse the existing Today's Medicines card */}
        <PrescriptionCard data={prescriptions} />

        {/* active medicines list, same visual language as the card rows */}
        <div className="space-y-3">
          {prescriptions.medicines.map((medicine) => {
            const morning = /(morning|breakfast|am)/i.test(medicine.dosage);
            return (
              <div
                key={medicine.id}
                className="flex items-center justify-between rounded-2xl border border-outline-variant bg-background p-4 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#00B8D9] to-[#5B5FEF] text-white">
                    {morning ? (
                      <Sunrise className="h-4 w-4" />
                    ) : (
                      <Moon className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-on-background">
                      {medicine.name}
                    </p>
                    <p className="text-sm text-on-surface-variant">
                      {medicine.dosage} · {medicine.duration}
                    </p>
                  </div>
                </div>
                <Pill className="h-5 w-5 text-primary" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PatientMedication;
