import type { AppointmentStats as AppointmentStatsType } from "../../types/appointment.types";

import { STAT_CONFIG } from "./appointment.constants";

interface AppointmentStatsProps {
  stats: AppointmentStatsType;
}

const AppointmentStats = ({
  stats,
}: AppointmentStatsProps) => {
  return (
    <section
      className="
        grid
        grid-cols-2
        gap-4
        lg:grid-cols-4
      "
    >
      {STAT_CONFIG.map((item) => {
        const Icon = item.icon;

        const value =
          stats[
            item.key as keyof AppointmentStatsType
          ];

        return (
          <div
            key={item.key}
            className={`
              group
              relative
              overflow-hidden
              rounded-[24px]
              border
              backdrop-blur-2xl
              px-5
              py-4
              transition-all
              duration-300
              hover:-translate-y-1

              ${
                item.key === "upcoming"
                  ? `
                    border-cyan-200/40
                    bg-gradient-to-br
                    from-cyan-500/10
                    via-white/75
                    to-white/65
                    shadow-[0_12px_35px_rgba(6,182,212,.08)]
                  `
                  : item.key === "completed"
                  ? `
                    border-emerald-200/40
                    bg-gradient-to-br
                    from-emerald-500/10
                    via-white/75
                    to-white/65
                    shadow-[0_12px_35px_rgba(16,185,129,.08)]
                  `
                  : item.key === "cancelled"
                  ? `
                    border-rose-200/40
                    bg-gradient-to-br
                    from-rose-500/10
                    via-white/75
                    to-white/65
                    shadow-[0_12px_35px_rgba(244,63,94,.08)]
                  `
                  : `
                    border-violet-200/40
                    bg-gradient-to-br
                    from-violet-500/10
                    via-white/75
                    to-white/65
                    shadow-[0_12px_35px_rgba(168,85,247,.08)]
                  `
              }
            `}
          >
            {/* Ambient Glow */}

            <div
              className={`
                absolute
                -right-10
                -top-10
                h-28
                w-28
                rounded-full
                blur-3xl
                opacity-60
                transition-all
                duration-300
                group-hover:opacity-90
                ${item.glow}
              `}
            />

            {/* Left Accent */}

            <div
              className={`
                absolute
                left-0
                top-5
                bottom-5
                w-1
                rounded-r-full

                ${
                  item.key === "upcoming"
                    ? "bg-cyan-400/80"
                    : item.key === "completed"
                    ? "bg-emerald-400/80"
                    : item.key === "cancelled"
                    ? "bg-rose-400/80"
                    : "bg-violet-400/80"
                }
              `}
            />

            <div className="relative">

              {/* Header */}

              <div className="flex items-start justify-between">

                <div>

                  <p
                    className="
                      text-[11px]
                      font-semibold
                      uppercase
                      tracking-[0.12em]
                      text-on-surface-variant
                    "
                  >
                    {item.title}
                  </p>

                  <h2
                    className={`
                      mt-2
                      text-[30px]
                      font-bold
                      leading-none

                      ${
                        item.key === "upcoming"
                          ? "text-cyan-600"
                          : item.key === "completed"
                          ? "text-emerald-600"
                          : item.key === "cancelled"
                          ? "text-rose-600"
                          : "text-violet-600"
                      }
                    `}
                  >
                    {value}
                  </h2>

                </div>

                <div
                  className={`
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gradient-to-br
                    shadow-lg
                    ${item.gradient}
                  `}
                >
                  <Icon
                    size={20}
                    className="text-white"
                  />
                </div>

              </div>
                            {/* Description */}

              <p
                className="
                  mt-3
                  text-sm
                  leading-5
                  text-on-surface-variant
                "
              >
                {item.key === "upcoming" &&
                  "Scheduled consultations awaiting your visit."}

                {item.key === "completed" &&
                  "Healthcare visits completed successfully."}

                {item.key === "cancelled" &&
                  "Cancelled or missed appointments."}

                {item.key === "rescheduled" &&
                  "Appointments moved to a new date."}
              </p>

              {/* Bottom */}

              <div className="mt-5 flex items-center justify-between">

                <span
                  className={`
                    inline-flex
                    items-center
                    rounded-full
                    border
                    px-3
                    py-1
                    text-[11px]
                    font-semibold
                    backdrop-blur-xl

                    ${
                      item.key === "upcoming"
                        ? `
                          border-cyan-300/30
                          bg-cyan-500/10
                          text-cyan-700
                        `
                        : item.key === "completed"
                        ? `
                          border-emerald-300/30
                          bg-emerald-500/10
                          text-emerald-700
                        `
                        : item.key === "cancelled"
                        ? `
                          border-rose-300/30
                          bg-rose-500/10
                          text-rose-700
                        `
                        : `
                          border-violet-300/30
                          bg-violet-500/10
                          text-violet-700
                        `
                    }
                  `}
                >
                  {item.key === "upcoming" &&
                    "↗ Active"}

                  {item.key === "completed" &&
                    "✓ Completed"}

                  {item.key === "cancelled" &&
                    "● Review"}

                  {item.key === "rescheduled" &&
                    "⟳ Updated"}
                </span>

                <div
                  className={`
                    h-2.5
                    w-2.5
                    rounded-full
                    shadow-md

                    ${
                      item.key === "upcoming"
                        ? "bg-cyan-500"
                        : item.key === "completed"
                        ? "bg-emerald-500"
                        : item.key === "cancelled"
                        ? "bg-rose-500"
                        : "bg-violet-500"
                    }
                  `}
                />

              </div>

            </div>

          </div>
        );
      })}
    </section>
  );
};

export default AppointmentStats;