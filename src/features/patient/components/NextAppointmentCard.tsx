import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  Stethoscope,
} from "lucide-react";

import {
  format,
  isTomorrow,
} from "date-fns";

import type {
  Appointment,
} from "@/features/patient/types/appointment.types";

interface NextAppointmentCardProps {
  data: Appointment | null;

  onViewDetails?: (id: string) => void;
}

const NextAppointmentCard = ({
  data,
  onViewDetails,
}: NextAppointmentCardProps) => {
  if (!data) {
    return (
      <section
        className="
          rounded-[28px]
          border
          border-cyan-100/70
          bg-gradient-to-br
          from-[#FCFEFF]
          via-[#F2FCFE]
          to-[#F5F4FF]
          p-10
          text-center
          shadow-[0_12px_35px_rgba(0,175,198,0.10)]
        "
      >
        <div
          className="
            mx-auto
            flex
            h-20
            w-20
            items-center
            justify-center
            rounded-3xl
            bg-cyan-100
          "
        >
          <CalendarDays
            className="text-cyan-700"
            size={34}
          />
        </div>

        <h2 className="mt-6 text-2xl font-bold text-slate-900">
          No Upcoming Appointment
        </h2>

        <p className="mt-3 text-slate-500">
          You don't have any scheduled appointments.
        </p>
      </section>
    );
  }

  const appointmentDate = new Date(data.date);

  const appointmentLabel = isTomorrow(
    appointmentDate
  )
    ? "Tomorrow"
    : format(
        appointmentDate,
        "dd MMM yyyy"
      );

  return (
    <section
      className="
        group
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-cyan-100/70
        bg-gradient-to-br
        from-[#FCFEFF]
        via-[#F2FCFE]
        to-[#F5F4FF]
        p-6
        shadow-[0_12px_35px_rgba(0,175,198,0.10)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-[0_20px_45px_rgba(0,175,198,0.18)]
      "
    >
      {/* Decorative Background */}

      <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-cyan-200/25 blur-3xl" />

      <div className="absolute -bottom-24 left-16 h-52 w-52 rounded-full bg-violet-200/15 blur-3xl" />

      <div className="relative z-10">

        {/* Header */}

        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">

          <div className="flex items-center gap-4">

            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-br
                from-[#00B7D4]
                to-[#0098B8]
                shadow-lg
              "
            >
              <CalendarDays
                className="text-white"
                size={28}
              />
            </div>

            <div>

              <p className="text-sm font-medium tracking-wide text-slate-500">
                Next Appointment
              </p>

              <h2 className="mt-1 text-3xl font-bold text-slate-900">
                {appointmentLabel}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {format(
                  appointmentDate,
                  "EEEE"
                )}{" "}
                • {data.time}
              </p>

            </div>

          </div>

          <span
            className="
              inline-flex
              items-center
              gap-2
              self-start
              rounded-full
              border
              border-cyan-200
              bg-cyan-50
              px-4
              py-2
              text-sm
              font-semibold
              text-cyan-700
            "
          >
            <CheckCircle2 size={16} />

            {data.status}
          </span>

        </div>

        {/* Divider */}

        <div className="my-6 h-px bg-gradient-to-r from-transparent via-cyan-100 to-transparent" />

        {/* Details */}

        <div className="grid gap-4 md:grid-cols-3">

          <div className="flex items-center gap-3 rounded-2xl bg-white/60 p-4">

            <div className="rounded-xl bg-cyan-100 p-3">
              <Clock3
                className="text-cyan-700"
                size={20}
              />
            </div>

            <div>

              <p className="text-xs uppercase tracking-wider text-slate-400">
                Time
              </p>

              <p className="font-semibold text-slate-900">
                {data.time}
              </p>

            </div>

          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-white/60 p-4">

            <div className="rounded-xl bg-sky-100 p-3">
              <Stethoscope
                className="text-sky-700"
                size={20}
              />
            </div>

            <div>

              <p className="text-xs uppercase tracking-wider text-slate-400">
                Doctor
              </p>

              <p className="font-semibold text-slate-900">
                {data.doctorName}
              </p>

              <p className="text-sm text-slate-500">
                {data.specialization}
              </p>

            </div>

          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-white/60 p-4">

            <div className="rounded-xl bg-violet-100 p-3">
              <MapPin
                className="text-violet-600"
                size={20}
              />
            </div>

            <div>

              <p className="text-xs uppercase tracking-wider text-slate-400">
                Hospital
              </p>

              <p className="font-semibold text-slate-900">
                {data.hospital}
              </p>

            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-sm text-slate-500">
            Stay on track with your healthcare journey.
          </p>

          <button
            onClick={() =>
              onViewDetails?.(data.id)
            }
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-[#00AFC6]
              px-5
              py-2.5
              text-sm
              font-semibold
              text-white
              shadow-lg
              transition-all
              duration-300
              hover:bg-[#0098B8]
            "
          >
            View Details

            <ArrowRight
              size={16}
              className="transition-transform duration-300 hover:translate-x-1"
            />
          </button>

        </div>

      </div>

    </section>
  );
};

export default NextAppointmentCard;