import {
  ArrowUpRight,
  Pill,
  Sunrise,
  Moon,
} from "lucide-react";

import type {
  PrescriptionData,
  PrescriptionMedicine,
} from "@/features/patient/types/dashboard.types";

interface PrescriptionCardProps {
  data: PrescriptionData;
}

const getMedicineIcon = (
  medicine: PrescriptionMedicine,
) => {
  const dosage = medicine.dosage.toLowerCase();

  if (
    dosage.includes("morning") ||
    dosage.includes("breakfast") ||
    dosage.includes("am")
  ) {
    return <Sunrise className="h-4 w-4 text-white" />;
  }

  return <Moon className="h-4 w-4 text-white" />;
};

const getMedicineTime = (
  medicine: PrescriptionMedicine,
) => {
  const dosage = medicine.dosage.toLowerCase();

  if (
    dosage.includes("morning") ||
    dosage.includes("breakfast") ||
    dosage.includes("am")
  ) {
    return "Morning";
  }

  if (
    dosage.includes("night") ||
    dosage.includes("pm")
  ) {
    return "Night";
  }

  if (dosage.includes("evening")) {
    return "Evening";
  }

  return "Daily";
};

const PrescriptionCard = ({
  data,
}: PrescriptionCardProps) => {
  return (
    <section
      className="
        relative
        h-full
        overflow-hidden
        rounded-[30px]
        bg-gradient-to-br
        from-[#D9FBFD]
        via-[#EAFBFF]
        to-[#F5F9FF]
        p-4
        shadow-[0_18px_40px_rgba(0,175,198,.18)]
      "
    >
      {/* Decorative Blur */}

      <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-cyan-300/20 blur-3xl" />

      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-300/20 blur-3xl" />

      <div className="relative flex h-full flex-col">

        {/* Header */}

        <div className="flex items-start justify-between">

          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              from-[#00B8D9]
              to-[#5B5FEF]
              shadow-lg
            "
          >
            <Pill className="h-6 w-6 text-white" />
          </div>

          <button
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-white/60
              backdrop-blur-md
              transition
              hover:bg-white
            "
          >
            <ArrowUpRight className="h-4 w-4 text-[#00AFC6]" />
          </button>

        </div>

        {/* Heading */}

        <div className="mt-4">

          <p className="text-lg font-medium text-slate-700">
            Today's Medicines
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {data.active} Active Prescription
            {data.active !== 1 ? "s" : ""}
          </p>

        </div>

        {/* Medicine List */}

        <div className="mt-3 flex-1 space-y-2">

          {data.medicines.map((medicine) => (

            <div
              key={medicine.id}
              className="
                flex
                items-center
                justify-between
                rounded-2xl
                bg-white/45
                px-3
                py-2
                backdrop-blur-xl
              "
            >

              <div className="flex items-center gap-3">

                <div
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    bg-gradient-to-br
                    from-[#00B8D9]
                    to-[#5B5FEF]
                  "
                >
                  {getMedicineIcon(medicine)}
                </div>

                <div>

                  <p className="text-sm font-semibold text-slate-800">
                    {medicine.name}
                  </p>

                  <p className="text-xs text-slate-500">
                    {medicine.dosage}
                  </p>

                </div>

              </div>

              <span className="text-xs font-semibold text-slate-600">
                {getMedicineTime(medicine)}
              </span>

            </div>

          ))}

        </div>

        {/* Footer */}

        <div
          className="
            mt-3
            rounded-2xl
            bg-white/45
            px-4
            py-2
            backdrop-blur-xl
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                Next Refill
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-800">
                {data.nextRefill}
              </p>

            </div>

            <span
              className="
                rounded-full
                bg-gradient-to-r
                from-[#00B8D9]
                to-[#5B5FEF]
                px-3
                py-1
                text-xs
                font-semibold
                text-white
              "
            >
              {data.active} Active
            </span>

          </div>

        </div>

      </div>

    </section>
  );
};

export default PrescriptionCard;