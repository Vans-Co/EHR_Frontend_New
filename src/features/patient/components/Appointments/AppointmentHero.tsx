import {
  CalendarPlus,
  ShieldCheck,
  Star,
  Stethoscope,
} from "lucide-react";

import AppointmentStats from "./AppointmentStats";
import MiniCalendar from "./MiniCalendar";
import AppointmentPreparationCard from "./AppointmentPreparationCard";

import type {
  Appointment,
  AppointmentStats as AppointmentStatsType,
  CalendarEvent,
} from "../../types/appointment.types";

interface AppointmentHeroProps {
  stats: AppointmentStatsType;

  events: CalendarEvent[];

  selectedDate?: string;

  nextAppointment?: Appointment;

  onDateSelect?: (
    date: string
  ) => void;

  onViewDetails?: (
    id: string
  ) => void;

  onReschedule?: (
    id: string
  ) => void;

  onBookAppointment?: () => void;
}

const AppointmentHero = ({
  stats,
  events,
  selectedDate,
  nextAppointment,
  onDateSelect,
  onViewDetails,
  onReschedule,
  onBookAppointment,
}: AppointmentHeroProps) => {
  return (
    <section className="space-y-6">

      {/* ================= HERO ================= */}

      <div
        className="
          relative
          overflow-hidden
          rounded-[34px]
          border
          border-white/20
          bg-white/35
          backdrop-blur-2xl
          shadow-[0_18px_60px_rgba(37,99,235,.08)]
        "
      >

        {/* Decorative Glow */}

        <div
          className="
            absolute
            -left-24
            -top-24
            h-72
            w-72
            rounded-full
            bg-cyan-400/10
            blur-3xl
          "
        />

        <div
          className="
            absolute
            right-0
            bottom-0
            h-72
            w-72
            rounded-full
            bg-violet-400/10
            blur-3xl
          "
        />

        <div
          className="
            relative
            grid
            gap-8
            p-8
            xl:grid-cols-[1fr_330px]
            xl:items-center
          "
        >

          {/* LEFT */}

          <div>

            <span
              className="
                inline-flex
                rounded-full
                border
                border-cyan-300/30
                bg-cyan-500/10
                px-4
                py-1.5
                text-xs
                font-semibold
                tracking-wider
                text-cyan-700
                backdrop-blur-xl
              "
            >
              PATIENT DASHBOARD
            </span>

            <h1
              className="
                mt-5
                text-4xl
                font-bold
                leading-tight
                text-on-background
              "
            >
              Appointment
              <br />
              Management
            </h1>

            <p
              className="
                mt-4
                max-w-xl
                text-sm
                leading-7
                text-on-surface-variant
              "
            >
              Easily schedule consultations, manage appointments,
              receive reminders and stay connected with your healthcare
              providers—all from one beautiful dashboard.
            </p>
                        {/* Feature Highlights */}

            <div className="mt-8 grid gap-4 sm:grid-cols-3">

              <div
                className="
                  rounded-2xl
                  border
                  border-cyan-200/30
                  bg-cyan-500/10
                  backdrop-blur-xl
                  p-4
                "
              >
                <div
                  className="
                    mb-3
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-cyan-500/20
                  "
                >
                  <Stethoscope
                    size={20}
                    className="text-cyan-700"
                  />
                </div>

                <h3 className="font-semibold text-on-background">
                  120+ Doctors
                </h3>

                <p
                  className="
                    mt-1
                    text-xs
                    leading-5
                    text-on-surface-variant
                  "
                >
                  Experienced specialists across
                  multiple healthcare fields.
                </p>
              </div>

              <div
                className="
                  rounded-2xl
                  border
                  border-violet-200/30
                  bg-violet-500/10
                  backdrop-blur-xl
                  p-4
                "
              >
                <div
                  className="
                    mb-3
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-violet-500/20
                  "
                >
                  <Star
                    size={20}
                    className="text-violet-700"
                  />
                </div>

                <h3 className="font-semibold text-on-background">
                  4.9 Rating
                </h3>

                <p
                  className="
                    mt-1
                    text-xs
                    leading-5
                    text-on-surface-variant
                  "
                >
                  Trusted by thousands of patients
                  for quality healthcare.
                </p>
              </div>

              <div
                className="
                  rounded-2xl
                  border
                  border-sky-200/30
                  bg-sky-500/10
                  backdrop-blur-xl
                  p-4
                "
              >
                <div
                  className="
                    mb-3
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-sky-500/20
                  "
                >
                  <ShieldCheck
                    size={20}
                    className="text-sky-700"
                  />
                </div>

                <h3 className="font-semibold text-on-background">
                  Secure Records
                </h3>

                <p
                  className="
                    mt-1
                    text-xs
                    leading-5
                    text-on-surface-variant
                  "
                >
                  Your appointments and medical
                  history stay protected.
                </p>
              </div>

            </div>

          </div>

          {/* ================= RIGHT CARD ================= */}

          <div
            className="
              relative
              overflow-hidden
              rounded-[28px]
              bg-gradient-to-br
              from-cyan-500
              via-sky-500
              to-violet-500
              p-7
              text-white
              shadow-[0_18px_45px_rgba(59,130,246,.25)]
            "
          >

            <div
              className="
                absolute
                -right-12
                -top-12
                h-40
                w-40
                rounded-full
                bg-white/15
                blur-2xl
              "
            />

            <div
              className="
                absolute
                bottom-0
                left-0
                h-32
                w-32
                rounded-full
                bg-violet-300/20
                blur-2xl
              "
            />

            <div className="relative">

              <span
                className="
                  rounded-full
                  bg-white/20
                  px-3
                  py-1
                  text-xs
                  font-semibold
                  backdrop-blur-lg
                "
              >
                HEALTHCARE
              </span>

              <h2
                className="
                  mt-5
                  text-2xl
                  font-bold
                "
              >
                Book Your
                <br />
                Next Visit
              </h2>

              <p
                className="
                  mt-3
                  text-sm
                  leading-6
                  text-white/90
                "
              >
                Find the right specialist, choose your
                preferred time slot and confirm your
                appointment within minutes.
              </p>
                            {/* Quick Stats */}

              <div className="mt-6 grid grid-cols-3 gap-3">

                <div
                  className="
                    rounded-2xl
                    bg-white/15
                    p-3
                    text-center
                    backdrop-blur-xl
                  "
                >
                  <p className="text-xl font-bold">
                    120+
                  </p>

                  <p className="mt-1 text-xs text-white/80">
                    Doctors
                  </p>
                </div>

                <div
                  className="
                    rounded-2xl
                    bg-white/15
                    p-3
                    text-center
                    backdrop-blur-xl
                  "
                >
                  <p className="text-xl font-bold">
                    4.9★
                  </p>

                  <p className="mt-1 text-xs text-white/80">
                    Rating
                  </p>
                </div>

                <div
                  className="
                    rounded-2xl
                    bg-white/15
                    p-3
                    text-center
                    backdrop-blur-xl
                  "
                >
                  <p className="text-xl font-bold">
                    24/7
                  </p>

                  <p className="mt-1 text-xs text-white/80">
                    Support
                  </p>
                </div>

              </div>

              <button
                onClick={onBookAppointment}
                className="
                  mt-8
                  inline-flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  bg-white
                  px-6
                  py-3.5
                  text-sm
                  font-semibold
                  text-sky-700
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:shadow-xl
                "
              >
                <CalendarPlus size={18} />

                Book Appointment
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* ================= STATS ================= */}

      <AppointmentStats
        stats={stats}
      />

      {/* ================= CALENDAR + PREPARATION ================= */}

      <div
        className="
          grid
          gap-6
          xl:grid-cols-[360px_1fr]
          items-stretch
        "
      >

        <MiniCalendar
          events={events}
          selectedDate={selectedDate}
          onDateSelect={onDateSelect}
        />

        <AppointmentPreparationCard
          appointment={nextAppointment}
          onViewDetails={onViewDetails}
          onReschedule={onReschedule}
        />

      </div>
            {/* ================= END CONTENT ================= */}

    </section>
  );
};

export default AppointmentHero;