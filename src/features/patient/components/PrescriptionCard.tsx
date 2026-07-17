import {
  ArrowUpRight,
  Pill,
  Sunrise,
  Moon,
} from "lucide-react";

const medicines = [
  {
    name: "Lisinopril",
    dosage: "10 mg",
    time: "Morning",
    icon: <Sunrise className="h-4 w-4 text-white" />,
  },
  {
    name: "Metformin",
    dosage: "500 mg",
    time: "Night",
    icon: <Moon className="h-4 w-4 text-white" />,
  },
];

const PrescriptionCard = () => {
  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-[30px]
        bg-gradient-to-br
        from-[#D9FBFD]
        via-[#EAFBFF]
        to-[#F5F9FF]
        p-5
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
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              from-[#00B8D9]
              to-[#5B5FEF]
              shadow-lg
            "
          >
            <Pill className="h-7 w-7 text-white" />
          </div>

          <button
            className="
              flex
              h-10
              w-10
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

        <div className="mt-7">

          <p className="text-lg font-medium text-slate-700">
            Today's Medicines
          </p>

        </div>

        {/* Medicine List */}

        <div className="mt-5 space-y-3">

          {medicines.map((medicine) => (
            <div
              key={medicine.name}
              className="
                flex
                items-center
                justify-between
                rounded-2xl
                bg-white/45
                px-3
                py-3
                backdrop-blur-xl
              "
            >
              <div className="flex items-center gap-3">

                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-gradient-to-br
                    from-[#00B8D9]
                    to-[#5B5FEF]
                  "
                >
                  {medicine.icon}
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
                {medicine.time}
              </span>

            </div>
          ))}

        </div>

        {/* Footer */}

        <div
          className="
            mt-5
            rounded-2xl
            bg-white/45
            px-4
            py-3
            backdrop-blur-xl
          "
        >
          <div className="flex items-center justify-between">

            <div>

              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                Next Refill
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-800">
                18 July 2026
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
              2 Refills
            </span>

          </div>

        </div>

      </div>
    </section>
  );
};

export default PrescriptionCard;