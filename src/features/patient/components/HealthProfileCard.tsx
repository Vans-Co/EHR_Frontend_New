import {
  Activity,
  CalendarDays,
  HeartPulse,
  Phone,
  Pill,
  ShieldAlert,
  Stethoscope,
  UserRound,
} from "lucide-react";

const HealthProfileCard = () => {
  return (
    <section className="relative overflow-hidden rounded-[30px] bg-gradient-to-br from-[#1976E8] via-[#1693EA] to-[#09B5D8] p-6 shadow-[0_20px_45px_rgba(16,120,230,.18)]">

      {/* Decorative Blur */}

      <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

      <div className="absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-cyan-300/10 blur-3xl" />

      <div className="relative">

        {/* Header */}

        <div className="mb-6 flex items-start justify-between">

          <div>

            <h2 className="text-2xl font-semibold text-white">
              Health Profile
            </h2>

            <p className="mt-1 text-sm text-cyan-100">
              Your latest health summary
            </p>

          </div>

          <div className="rounded-2xl border border-white/20 bg-white/15 px-5 py-3 text-center backdrop-blur-xl">

            <p className="text-3xl font-bold text-white">
              92
            </p>

            <p className="text-[11px] uppercase tracking-[0.18em] text-cyan-100">
              Health Score
            </p>

          </div>

        </div>

        {/* Top Row */}

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">

          {/* Blood Group */}

          <div className="rounded-2xl bg-white/12 p-4 backdrop-blur-xl">

            <Activity className="mb-3 h-5 w-5 text-cyan-100" />

            <p className="text-xs uppercase tracking-wide text-cyan-100">
              Blood Group
            </p>

            <h3 className="mt-1 text-lg font-semibold text-white">
              O+
            </h3>

          </div>

          {/* Allergies */}

          <div className="rounded-2xl bg-white/12 p-4 backdrop-blur-xl">

            <ShieldAlert className="mb-3 h-5 w-5 text-cyan-100" />

            <p className="text-xs uppercase tracking-wide text-cyan-100">
              Allergies
            </p>

            <h3 className="mt-1 text-lg font-semibold text-white">
              None
            </h3>

          </div>

          {/* Condition */}

          <div className="rounded-2xl bg-white/12 p-4 backdrop-blur-xl">

            <HeartPulse className="mb-3 h-5 w-5 text-cyan-100" />

            <p className="text-xs uppercase tracking-wide text-cyan-100">
              Condition
            </p>

            <h3 className="mt-1 text-lg font-semibold text-white">
              Healthy
            </h3>

          </div>

          {/* Emergency Contact */}

          <div className="lg:col-span-2 rounded-2xl bg-white/12 p-4 backdrop-blur-xl">

            <div className="flex items-start justify-between">

              <div>

                <Phone className="mb-3 h-5 w-5 text-cyan-100" />

                <p className="text-xs uppercase tracking-wide text-cyan-100">
                  Emergency Contact
                </p>

                <h3 className="mt-1 text-lg font-semibold text-white">
                  +91 98765 43210
                </h3>

              </div>

              <div className="rounded-xl bg-white/10 px-3 py-2 text-right">

                <p className="text-xs text-cyan-100">
                  Relation
                </p>

                <p className="font-medium text-white">
                  Father
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Bottom Row */}

        <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">

          {/* Medication */}

          <div className="rounded-2xl bg-white/12 p-4 backdrop-blur-xl">

            <Pill className="mb-3 h-5 w-5 text-cyan-100" />

            <p className="text-xs uppercase tracking-wide text-cyan-100">
              Medication
            </p>

            <h3 className="mt-1 text-base font-semibold text-white">
              1 Active
            </h3>

          </div>

          {/* Doctor */}

          <div className="rounded-2xl bg-white/12 p-4 backdrop-blur-xl">

            <Stethoscope className="mb-3 h-5 w-5 text-cyan-100" />

            <p className="text-xs uppercase tracking-wide text-cyan-100">
              Primary Doctor
            </p>

            <h3 className="mt-1 text-base font-semibold text-white">
              Dr. Julian
            </h3>

          </div>

          {/* Last Visit */}

          <div className="rounded-2xl bg-white/12 p-4 backdrop-blur-xl">

            <CalendarDays className="mb-3 h-5 w-5 text-cyan-100" />

            <p className="text-xs uppercase tracking-wide text-cyan-100">
              Last Visit
            </p>

            <h3 className="mt-1 text-base font-semibold text-white">
              12 Oct 2025
            </h3>

          </div>

          {/* Patient ID */}

          <div className="rounded-2xl bg-white/12 p-4 backdrop-blur-xl">

            <UserRound className="mb-3 h-5 w-5 text-cyan-100" />

            <p className="text-xs uppercase tracking-wide text-cyan-100">
              Patient ID
            </p>

            <h3 className="mt-1 text-base font-semibold text-white">
              PT-20481
            </h3>

          </div>

        </div>

      </div>

    </section>
  );
};

export default HealthProfileCard;