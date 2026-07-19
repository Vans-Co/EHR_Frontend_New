import { useEffect, useState } from "react";
import {
  CalendarPlus,
  FileText,
  ArrowRight,
} from "lucide-react";
import { format } from "date-fns";

import { useAuthStore } from "@/store/authStore";

import type { WelcomeData } from "@/features/patient/types/dashboard.types";

interface WelcomeBannerProps {
  data: WelcomeData;

  onBookAppointment?: () => void;

  onViewRecords?: () => void;
}

const WelcomeBanner = ({
  onBookAppointment,
  onViewRecords,
}: WelcomeBannerProps) => {
  const user = useAuthStore(
    (state) => state.user
  );

  const [today, setToday] =
    useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setToday(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-white/30
        bg-gradient-to-br
        from-sky-50
        via-white
        to-cyan-50
        p-8
        shadow-[0_20px_60px_rgba(15,23,42,0.08)]
      "
    >
      {/* Background Glow */}

      <div
        className="
          absolute
          -top-24
          -right-16
          h-72
          w-72
          rounded-full
          bg-cyan-300/20
          blur-3xl
        "
      />

      <div
        className="
          absolute
          -bottom-24
          left-10
          h-80
          w-80
          rounded-full
          bg-sky-300/20
          blur-3xl
        "
      />

      <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}

        <div className="max-w-3xl">

          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-sky-200
              bg-white/80
              px-4
              py-2
              text-xs
              font-semibold
              uppercase
              tracking-[0.18em]
              text-sky-700
              backdrop-blur-xl
            "
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />

            Patient Dashboard
          </div>

          <h1
            className="
              mt-6
              text-4xl
              font-bold
              tracking-tight
              text-slate-900
            "
          >
            {user?.firstName ?? "Patient"}'s

            <span
              className="
                bg-gradient-to-r
                from-sky-600
                via-cyan-500
                to-violet-500
                bg-clip-text
                text-transparent
              "
            >
              {" "}
              Health Dashboard
            </span>

          </h1>

          <p
            className="
              mt-5
              max-w-2xl
              text-[15px]
              leading-8
              text-slate-600
            "
          >
            Manage appointments, access medical records,
            review prescriptions and stay updated with your
            healthcare journey from one personalized dashboard.
          </p>

          {/* Buttons */}

          <div className="mt-8 flex flex-wrap gap-4">

            <button
              onClick={onBookAppointment}
              className="
                group
                inline-flex
                items-center
                gap-2
                rounded-2xl
                bg-gradient-to-r
                from-cyan-500
                via-sky-500
                to-violet-500
                px-6
                py-3
                text-sm
                font-semibold
                text-white
                shadow-lg
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
              "
            >
              <CalendarPlus size={18} />

              Schedule Appointment

              <ArrowRight
                size={16}
                className="
                  transition
                  group-hover:translate-x-1
                "
              />
            </button>

            <button
              onClick={onViewRecords}
              className="
                group
                inline-flex
                items-center
                gap-2
                rounded-2xl
                border
                border-sky-200
                bg-white/80
                px-6
                py-3
                text-sm
                font-semibold
                text-sky-700
                shadow-md
                backdrop-blur-xl
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-sky-400
                hover:shadow-lg
              "
            >
              <FileText size={18} />

              Medical Records

              <ArrowRight
                size={16}
                className="
                  transition
                  group-hover:translate-x-1
                "
              />
            </button>

          </div>

        </div>

        {/* Right Card */}

        <div
          className="
            rounded-[30px]
            border
            border-white/40
            bg-white/80
            px-8
            py-8
            text-center
            shadow-xl
            backdrop-blur-xl
            lg:min-w-[250px]
          "
        >

          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.2em]
              text-sky-600
            "
          >
            Today
          </p>

          <h2
            className="
              mt-3
              text-6xl
              font-bold
              text-slate-900
            "
          >
            {format(today, "dd")}
          </h2>

          <p className="mt-2 text-base font-semibold text-slate-600">
            {format(today, "MMMM yyyy")}
          </p>

          <div
            className="
              mt-5
              rounded-full
              bg-gradient-to-r
              from-sky-100
              to-cyan-100
              px-4
              py-2
              text-sm
              font-semibold
              text-sky-700
            "
          >
            {format(today, "EEEE")}
          </div>

          <div className="mt-6">

            <p className="text-xs uppercase tracking-wider text-slate-500">
              Current Time
            </p>

            <p className="mt-2 text-3xl font-bold text-sky-700">
              {format(today, "hh:mm:ss a")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeBanner;
