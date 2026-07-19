import { CalendarPlus, FileText, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { useAuthStore } from "@/store/authStore";
import type { WelcomeData } from "@/features/patient/types/dashboard.types";

interface WelcomeBannerProps {
  data: WelcomeData;
}

const WelcomeBanner = ({ data }: WelcomeBannerProps) => {
  const user = useAuthStore((state) => state.user);

  const hour = new Date().getHours();

  const greeting =
    hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-sky-100
        bg-gradient-to-r
        from-sky-50
        via-white
        to-cyan-50
        p-6
        shadow-sm
      "
    >
      {/* Background Decoration */}

      <div className="absolute -top-16 right-0 h-48 w-48 rounded-full bg-sky-100/50 blur-3xl" />

      <div className="absolute -bottom-20 left-10 h-56 w-56 rounded-full bg-cyan-100/40 blur-3xl" />

      <div className="relative z-10">
        {/* Top */}

        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          {/* Left */}

          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-sky-600">
              Dashboard
            </p>

            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              {greeting},{" "}
              <span className="text-sky-700">
                {user?.firstName ?? "Patient"} 👋
              </span>
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              Welcome back! Here's your healthcare overview for today. Stay on
              top of appointments, reports and prescriptions.
            </p>

            {/* Actions */}

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                className="
                  group
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-primary
                  px-5
                  py-2.5
                  text-sm
                  font-medium
                  text-white
                  shadow-md
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:shadow-lg
                "
              >
                <CalendarPlus size={18} />
                Book Appointment
                <ArrowRight
                  size={16}
                  className="transition group-hover:translate-x-1"
                />
              </button>

              <button
                className="
                  group
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-sky-200
                  bg-white/80
                  px-5
                  py-2.5
                  text-sm
                  font-medium
                  text-sky-700
                  shadow-sm
                  backdrop-blur
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:border-sky-400
                  hover:shadow-md
                "
              >
                <FileText size={18} />
                View Records
                <ArrowRight
                  size={16}
                  className="transition group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>

          {/* Right */}

          <div className="lg:text-right">
            <p className="text-sm font-medium text-slate-500">
              {format(new Date(data.todayDate), "EEEE")}
            </p>

            <p className="mt-1 text-2xl font-bold text-slate-900">
              {format(new Date(data.todayDate), "dd MMM yyyy")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeBanner;
