import type { ReactNode } from "react";
import {
  CalendarClock,
  Clock3,
  Moon,
  Pill,
  Sunrise,
} from "lucide-react";

import AppCard from "@/components/common/AppCard";
import { Badge } from "@/components/ui/badge";
import PrescriptionCard from "@/features/patient/components/PrescriptionCard";
import { patientDashboardData } from "@/features/patient/mock/patientDashboard.mock";

import type { PrescriptionMedicine } from "@/features/patient/types/dashboard.types";

const getScheduleMeta = (medicine: PrescriptionMedicine) => {
  const dosage = medicine.dosage.toLowerCase();

  if (
    dosage.includes("morning") ||
    dosage.includes("breakfast") ||
    dosage.includes("am")
  ) {
    return {
      label: "Morning",
      icon: Sunrise,
      badgeClassName: "border-cyan-300/30 bg-cyan-500/10 text-cyan-700",
      iconClassName: "from-cyan-400 via-sky-400 to-blue-500",
      nextDose: "8:00 AM",
    };
  }

  if (
    dosage.includes("night") ||
    dosage.includes("pm") ||
    dosage.includes("evening")
  ) {
    return {
      label: "Evening",
      icon: Moon,
      badgeClassName: "border-violet-300/30 bg-violet-500/10 text-violet-700",
      iconClassName: "from-violet-400 via-fuchsia-400 to-indigo-500",
      nextDose: "8:30 PM",
    };
  }

  return {
    label: "Daily",
    icon: Clock3,
    badgeClassName: "border-emerald-300/30 bg-emerald-500/10 text-emerald-700",
    iconClassName: "from-emerald-400 via-green-400 to-teal-500",
    nextDose: "1:00 PM",
  };
};

const getDurationDays = (duration: string) => {
  const match = duration.match(/\d+/);
  return match ? Number(match[0]) : null;
};

const getDailyDoseCount = (dosage: string) => {
  const value = dosage.toLowerCase();

  if (value.includes("twice")) return 2;
  if (value.includes("thrice")) return 3;
  return 1;
};

const getMedicineDetails = (
  medicine: PrescriptionMedicine,
  index: number,
  doctorName: string,
) => {
  const durationDays = getDurationDays(medicine.duration) ?? 30;
  const remainingDays = Math.max(durationDays - index * 6, 3);

  return {
    doctorName,
    remainingDays,
    expiryLabel: `${remainingDays} day${remainingDays === 1 ? "" : "s"} left`,
  };
};

const PrescriptionSummaryCard = ({
  title,
  value,
  description,
  statusLabel,
  icon,
  accentClassName,
  glowClassName,
  pillClassName,
  dotClassName,
}: {
  title: string;
  value: string;
  description: string;
  statusLabel: string;
  icon: ReactNode;
  accentClassName: string;
  glowClassName: string;
  pillClassName: string;
  dotClassName: string;
}) => (
  <div
    className={[
      "group relative overflow-hidden rounded-[24px] border px-5 py-4 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1",
      accentClassName,
    ].join(" ")}
  >
    <div
      className={[
        "absolute -right-10 -top-10 h-24 w-24 rounded-full blur-3xl opacity-60 transition-all duration-300 group-hover:opacity-90",
        glowClassName,
      ].join(" ")}
    />
    <div
      className={[
        "absolute bottom-5 left-0 top-5 w-1 rounded-r-full",
        dotClassName,
      ].join(" ")}
    />

    <div className="relative">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
            {title}
          </p>
          <h2 className="mt-2 text-[30px] font-bold leading-none text-on-background">
            {value}
          </h2>
          <p className="mt-2 max-w-[24ch] text-sm leading-5 text-on-surface-variant">
            {description}
          </p>
        </div>

        <div
          className={[
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg",
            pillClassName,
          ].join(" ")}
        >
          {icon}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="inline-flex items-center rounded-full border border-white/20 bg-white/45 px-3 py-1 text-[11px] font-semibold text-on-background backdrop-blur-xl">
          {statusLabel}
        </span>
        <div
          className={["h-2.5 w-2.5 rounded-full shadow-md", dotClassName].join(
            " ",
          )}
        />
      </div>
    </div>
  </div>
);

const PatientPrescription = () => {
  const prescriptions = patientDashboardData.kpi.prescriptions;
  const doctorName = patientDashboardData.profile.primaryDoctor;

  const enrichedMedicines = prescriptions.medicines.map((medicine, index) => ({
    ...medicine,
    schedule: getScheduleMeta(medicine),
    details: getMedicineDetails(medicine, index, doctorName),
  }));

  const morningCount = enrichedMedicines.filter(
    (medicine) => medicine.schedule.label === "Morning",
  ).length;
  const todaysDoses = enrichedMedicines.reduce(
    (sum, medicine) => sum + getDailyDoseCount(medicine.dosage),
    0,
  );
  const expiringSoon = enrichedMedicines.filter(
    (medicine) => medicine.details.remainingDays <= 7,
  ).length;

  return (
    <div className="mx-auto flex w-full max-w-[1700px] flex-col gap-5">
      <section className="relative overflow-hidden rounded-[30px] border border-white/60 bg-[radial-gradient(circle_at_top_left,_rgba(186,230,253,0.85),_transparent_28%),linear-gradient(135deg,rgba(240,249,255,0.96),rgba(255,255,255,0.98),rgba(236,254,255,0.94))] p-5 shadow-[0_20px_44px_rgba(14,165,233,0.10)] sm:p-5">
        <div className="absolute -left-16 top-8 h-32 w-32 rounded-full bg-sky-200/35 blur-3xl" />
        <div className="absolute -right-10 top-0 h-36 w-36 rounded-full bg-cyan-200/35 blur-3xl" />

        <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <Badge className="rounded-full border border-sky-200/80 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary shadow-sm">
              Patient Prescription
            </Badge>
            <div>
              <h1 className="text-[2rem] font-bold tracking-tight text-on-background">
                Prescription
              </h1>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-on-surface-variant">
                Track active medicines, next doses, and expiry status from one
                focused treatment view.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[20px] border border-white/70 bg-white/75 px-4 py-3 shadow-sm backdrop-blur-md">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface-variant">
                Next Refill
              </p>
              <p className="mt-1 text-lg font-bold text-on-background">
                {prescriptions.nextRefill}
              </p>
            </div>
            <div className="rounded-[20px] border border-white/70 bg-white/75 px-4 py-3 shadow-sm backdrop-blur-md">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface-variant">
                Prescribing Doctor
              </p>
              <p className="mt-1 text-lg font-bold text-on-background">
                {doctorName}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <PrescriptionSummaryCard
          title="Active Prescriptions"
          value={`${prescriptions.active}`}
          description="Current medicines in the treatment plan."
          statusLabel="Primary"
          icon={<Pill size={20} className="text-white" />}
          accentClassName="border-cyan-200/40 bg-gradient-to-br from-cyan-500/10 via-white/75 to-white/65 shadow-[0_12px_35px_rgba(6,182,212,.08)]"
          glowClassName="bg-cyan-400/20"
          pillClassName="from-cyan-400 via-sky-400 to-blue-500"
          dotClassName="bg-cyan-500"
        />
        <PrescriptionSummaryCard
          title="Morning Medications"
          value={`${morningCount}`}
          description="Medicines scheduled with breakfast or early-day care."
          statusLabel="Morning"
          icon={<Sunrise size={20} className="text-white" />}
          accentClassName="border-amber-200/40 bg-gradient-to-br from-amber-500/10 via-white/75 to-white/65 shadow-[0_12px_35px_rgba(245,158,11,.08)]"
          glowClassName="bg-amber-400/20"
          pillClassName="from-amber-400 via-yellow-400 to-orange-500"
          dotClassName="bg-amber-500"
        />
        <PrescriptionSummaryCard
          title="Today's Doses"
          value={`${todaysDoses}`}
          description="Estimated doses to stay on track today."
          statusLabel="Today"
          icon={<Clock3 size={20} className="text-white" />}
          accentClassName="border-violet-200/40 bg-gradient-to-br from-violet-500/10 via-white/75 to-white/65 shadow-[0_12px_35px_rgba(168,85,247,.08)]"
          glowClassName="bg-violet-400/20"
          pillClassName="from-violet-400 via-fuchsia-400 to-indigo-500"
          dotClassName="bg-violet-500"
        />
        <PrescriptionSummaryCard
          title="Expiring Soon"
          value={`${expiringSoon}`}
          description="Prescriptions that may need follow-up attention."
          statusLabel="Watch"
          icon={<CalendarClock size={20} className="text-white" />}
          accentClassName="border-emerald-200/40 bg-gradient-to-br from-emerald-500/10 via-white/75 to-white/65 shadow-[0_12px_35px_rgba(16,185,129,.08)]"
          glowClassName="bg-emerald-400/20"
          pillClassName="from-emerald-400 via-green-400 to-teal-500"
          dotClassName="bg-emerald-500"
        />
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.45fr_0.9fr] xl:[&>*]:h-full">
        <AppCard
          title="Active Prescriptions"
          subtitle="The current treatment list with timing, provider, and next-dose context."
          icon={<Pill size={22} />}
          className="h-full border-white/30 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(245,250,255,0.82))] shadow-[0_18px_38px_rgba(15,23,42,0.08)] backdrop-blur-xl"
          bodyClassName="p-5"
        >
          <div className="grid gap-3">
            {enrichedMedicines.map((medicine) => {
              const ScheduleIcon = medicine.schedule.icon;

              return (
                <div
                  key={medicine.id}
                  className="rounded-[22px] border border-slate-200/80 bg-white/85 p-3.5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                    <div className="flex items-start gap-3">
                      <div
                        className={[
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg",
                          medicine.schedule.iconClassName,
                        ].join(" ")}
                      >
                        <ScheduleIcon className="h-4 w-4 text-white" />
                      </div>

                      <div className="space-y-2">
                        <div>
                          <p className="text-base font-semibold text-on-background">
                            {medicine.name}
                          </p>
                          <p className="text-sm text-on-surface-variant">
                            {medicine.dosage} • {medicine.duration}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <span
                            className={[
                              "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
                              medicine.schedule.badgeClassName,
                            ].join(" ")}
                          >
                            {medicine.schedule.label}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-2 sm:grid-cols-3 xl:min-w-[340px]">
                      <div className="rounded-2xl border border-slate-200/80 bg-slate-50/90 px-3 py-3">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface-variant">
                          Doctor
                        </p>
                        <p className="mt-1 text-sm font-semibold text-on-background">
                          {medicine.details.doctorName}
                        </p>
                      </div>
                      <div className="rounded-2xl border border-slate-200/80 bg-slate-50/90 px-3 py-3">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface-variant">
                          Next Dose
                        </p>
                        <p className="mt-1 text-sm font-semibold text-on-background">
                          {medicine.schedule.nextDose}
                        </p>
                      </div>
                      <div className="rounded-2xl border border-slate-200/80 bg-slate-50/90 px-3 py-3">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface-variant">
                          Remaining
                        </p>
                        <p className="mt-1 text-sm font-semibold text-on-background">
                          {medicine.details.expiryLabel}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </AppCard>

        <div className="h-full">
          <PrescriptionCard data={prescriptions} />
        </div>
      </section>
    </div>
  );
};

export default PatientPrescription;
