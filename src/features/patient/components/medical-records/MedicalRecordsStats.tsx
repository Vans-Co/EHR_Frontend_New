import {
  FileText,
  ShieldCheck,
  Building2,
  Clock3,
} from "lucide-react";

import type { MedicalRecord } from "../../types/medicalRecord.types";

type MedicalRecordsStatsProps = {
  records: MedicalRecord[];
};

const MedicalRecordsStats = ({
  records,
}: MedicalRecordsStatsProps) => {
  const totalRecords = records.length;

  const hospitalRecords = records.filter(
    (record) => record.source === "Hospital"
  ).length;

  const uploadedRecords = records.filter(
    (record) => record.source === "Patient"
  ).length;

  const verifiedRecords = records.filter(
    (record) => record.status === "Verified"
  ).length;

  const pendingRecords = records.filter(
    (record) => record.status === "Pending"
  ).length;

  const hospitals = new Set(
    records.map((record) => record.hospital)
  ).size;

  const doctors = new Set(
    records.map((record) => record.doctor)
  ).size;

  const stats = [
    {
      title: "Total Records",
      value: totalRecords,
      subtitle: `${uploadedRecords} uploaded by you`,
      icon: FileText,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      shadow: "shadow-blue-200/50",
    },
    {
      title: "Verified Records",
      value: verifiedRecords,
      subtitle: `${hospitalRecords} hospital records`,
      icon: ShieldCheck,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      shadow: "shadow-emerald-200/50",
    },
    {
      title: "Hospitals",
      value: hospitals,
      subtitle: `${doctors} doctors consulted`,
      icon: Building2,
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
      shadow: "shadow-indigo-200/50",
    },
    {
      title: "Pending",
      value: pendingRecords,
      subtitle: "Awaiting verification",
      icon: Clock3,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      shadow: "shadow-amber-200/50",
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className={`
              group
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-6
              shadow-lg
              ${stat.shadow}
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-blue-200
              hover:shadow-xl
            `}
          >
            <div className="flex items-start justify-between">

              <div>

                <p className="text-sm font-semibold text-slate-500">
                  {stat.title}
                </p>

                <h2 className="mt-3 text-4xl font-bold text-slate-900">
                  {stat.value}
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  {stat.subtitle}
                </p>

              </div>

              <div
                className={`
                  rounded-2xl
                  ${stat.iconBg}
                  p-4
                  shadow-md
                  transition-all
                  duration-300
                  group-hover:scale-110
                `}
              >
                <Icon
                  className={`h-7 w-7 ${stat.iconColor}`}
                />
              </div>

            </div>

            {/* Bottom Progress Accent */}

            <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-100">

              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600"
                style={{
                  width: `${Math.min(
                    (stat.value /
                      Math.max(totalRecords, 1)) *
                      100,
                    100
                  )}%`,
                }}
              />

            </div>

          </div>
        );
      })}
    </section>
  );
};

export default MedicalRecordsStats;