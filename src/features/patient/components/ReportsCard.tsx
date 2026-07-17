import {
  ArrowUpRight,
  FileText,
  FlaskConical,
  HeartPulse,
  Scan,
} from "lucide-react";

import type {
  ReportsData,
  ReportItem,
} from "@/features/patient/types/dashboard.types";

interface ReportsCardProps {
  data: ReportsData;
}

const getIcon = (type: ReportItem["type"]) => {
  switch (type) {
    case "lab":
      return <FlaskConical className="h-4 w-4" />;

    case "ecg":
      return <HeartPulse className="h-4 w-4" />;

    case "xray":
      return <Scan className="h-4 w-4" />;

    default:
      return <FileText className="h-4 w-4" />;
  }
};

const ReportsCard = ({
  data,
}: ReportsCardProps) => {
  return (
    <section
      className="
        relative
        h-full
        overflow-hidden
        rounded-[28px]
        bg-gradient-to-br
        from-[#1976E8]
        via-[#1688EB]
        to-[#08B5D8]
        p-5
        shadow-[0_18px_40px_rgba(20,120,230,.20)]
      "
    >
      {/* Blur */}

      <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-white/10 blur-3xl" />

      <div className="relative flex h-full flex-col">

        {/* Header */}

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md">
              <FileText className="h-5 w-5 text-white" />
            </div>

            <div>

              <p className="text-lg font-semibold text-white">
                Medical Reports
              </p>

              <p className="text-xs text-cyan-100">
                {data.total} Reports • Updated {data.lastUpdated}
              </p>

            </div>

          </div>

          <button className="rounded-full bg-white/15 p-2 backdrop-blur-md transition hover:bg-white/20">
            <ArrowUpRight className="h-4 w-4 text-white" />
          </button>

        </div>

        {/* Reports */}

        <div className="mt-5 flex-1 space-y-3">

          {data.reports.map((report) => (

            <div
              key={report.id}
              className="
                flex
                items-center
                justify-between
                rounded-2xl
                bg-white/10
                px-3
                py-3
                backdrop-blur-md
              "
            >

              <div className="flex items-center gap-3">

                <div className="rounded-xl bg-white/15 p-2 text-white">
                  {getIcon(report.type)}
                </div>

                <div>

                  <p className="text-sm font-semibold text-white">
                    {report.title}
                  </p>

                  <p className="text-xs text-cyan-100">
                    {report.date}
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

        {/* Footer */}

        <button
          className="
            mt-5
            flex
            w-full
            items-center
            justify-center
            rounded-2xl
            border
            border-white/20
            bg-white/10
            py-3
            text-sm
            font-medium
            text-white
            backdrop-blur-md
            transition
            hover:bg-white/15
          "
        >
          View All Reports
        </button>

      </div>

    </section>
  );
};

export default ReportsCard;