import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  Stethoscope,
} from "lucide-react";

const NextAppointmentCard = () => {
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
        backdrop-blur-xl
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
              <CalendarDays className="h-7 w-7 text-white" />
            </div>

            <div>

              <p className="text-sm font-medium tracking-wide text-slate-500">
                Upcoming Appointment
              </p>

              <h2 className="mt-1 text-3xl font-bold text-slate-900">
                Tomorrow
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Tuesday • 10:30 AM
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
            <CheckCircle2 className="h-4 w-4" />
            Confirmed
          </span>

        </div>

        {/* Divider */}

        <div className="my-6 h-px bg-gradient-to-r from-transparent via-cyan-100 to-transparent" />

        {/* Appointment Details */}

        <div className="grid gap-4 md:grid-cols-3">

          <div className="flex items-center gap-3 rounded-2xl bg-white/60 p-4 backdrop-blur">

            <div className="rounded-xl bg-cyan-100 p-3">
              <Clock3 className="h-5 w-5 text-cyan-700" />
            </div>

            <div>

              <p className="text-xs uppercase tracking-wider text-slate-400">
                Time
              </p>

              <p className="font-semibold text-slate-900">
                10:30 AM
              </p>

            </div>

          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-white/60 p-4 backdrop-blur">

            <div className="rounded-xl bg-sky-100 p-3">
              <Stethoscope className="h-5 w-5 text-sky-700" />
            </div>

            <div>

              <p className="text-xs uppercase tracking-wider text-slate-400">
                Doctor
              </p>

              <p className="font-semibold text-slate-900">
                Dr. Aris
              </p>

              <p className="text-sm text-slate-500">
                Cardiology
              </p>

            </div>

          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-white/60 p-4 backdrop-blur">

            <div className="rounded-xl bg-violet-100 p-3">
              <MapPin className="h-5 w-5 text-violet-600" />
            </div>

            <div>

              <p className="text-xs uppercase tracking-wider text-slate-400">
                Location
              </p>

              <p className="font-semibold text-slate-900">
                Vans Healthcare
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
            className="
              group/button
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

            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />
          </button>

        </div>

      </div>

    </section>
  );
};

export default NextAppointmentCard;