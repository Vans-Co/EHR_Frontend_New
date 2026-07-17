import {
  ExternalLink,
  Download,
  FlaskConical,
  Pill,
  Stethoscope,
  FileText,
} from "lucide-react";

const records = [
  {
    title: "Complete Blood Count",
    category: "Lab Results",
    date: "12 May 2024",
    color: "bg-sky-100 text-sky-600",
    icon: FlaskConical,
  },
  {
    title: "Lisinopril Prescription",
    category: "Pharmacy",
    date: "05 May 2024",
    color: "bg-emerald-100 text-emerald-600",
    icon: Pill,
  },
  {
    title: "Chest X-Ray Report",
    category: "Radiology",
    date: "20 Apr 2024",
    color: "bg-violet-100 text-violet-600",
    icon: Stethoscope,
  },
];

const RecentRecords = () => {
  return (
    <section
      className="
        rounded-3xl
        border
        border-outline-variant
        bg-background
        p-5
        shadow-sm
      "
    >
      {/* Header */}

      <div className="mb-5 flex items-center justify-between">

        <div>

          <p className="text-sm text-on-surface-variant">
            Medical History
          </p>

          <h2 className="mt-1 text-xl font-bold text-on-background">
            Recent Records
          </h2>

        </div>

        <button
          type="button"
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-2xl
            bg-primary/10
            transition
            hover:bg-primary/20
          "
        >
          <ExternalLink
            size={20}
            className="text-primary"
          />
        </button>

      </div>

      {/* Records */}

      <div className="space-y-3">

        {records.map((record) => {

          const Icon = record.icon;

          return (
            <div
              key={record.title}
              className="
                flex
                items-center
                gap-4
                rounded-2xl
                border
                border-outline-variant
                p-3
                transition-all
                duration-300
                hover:bg-surface-container
              "
            >
              {/* Icon */}

              <div
                className={`
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  ${record.color}
                `}
              >
                <Icon size={20} />
              </div>

              {/* Content */}

              <div className="min-w-0 flex-1">

                <h3 className="truncate font-semibold text-on-background">
                  {record.title}
                </h3>

                <div className="mt-1 flex items-center gap-2">

                  <span
                    className="
                      rounded-full
                      bg-primary/10
                      px-2
                      py-0.5
                      text-xs
                      font-medium
                      text-primary
                    "
                  >
                    {record.category}
                  </span>

                  <span className="text-xs text-on-surface-variant">
                    {record.date}
                  </span>

                </div>

              </div>

              {/* Download */}

              <button
                type="button"
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  transition
                  hover:bg-primary/10
                "
              >
                <Download
                  size={18}
                  className="text-primary"
                />
              </button>

            </div>
          );

        })}

      </div>

      {/* Footer */}

      <button
        className="
          mt-5
          w-full
          rounded-2xl
          bg-primary
          py-3
          font-medium
          text-white
          transition
          hover:opacity-90
        "
      >
        <FileText
          size={18}
          className="mr-2 inline"
        />
        View All Records
      </button>

    </section>
  );
};

export default RecentRecords;