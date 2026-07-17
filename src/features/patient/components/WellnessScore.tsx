import {
  Heart,
  Footprints,
  Activity,
} from "lucide-react";

const WellnessScore = () => {
  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-[30px]
        border
        border-white/20
        bg-gradient-to-br
        from-[#DDF9FD]
        via-[#ECFBFF]
        to-[#F7FAFF]
        p-5
        shadow-[0_18px_40px_rgba(0,175,198,.18)]
      "
    >
      {/* Background Glow */}

      <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-cyan-300/20 blur-3xl" />

      <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-blue-300/20 blur-3xl" />

      {/* Glass Overlay */}

      <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />

      <div className="relative z-10">

        {/* Header */}

        <div className="flex items-start justify-between">

          <div>

            <p className="text-sm font-medium text-slate-600">
              Health Analytics
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              Wellness Score
            </h2>

          </div>

          <span
            className="
              rounded-full
              border
              border-emerald-200
              bg-emerald-100/70
              px-3
              py-1
              text-xs
              font-semibold
              text-emerald-700
              backdrop-blur-md
            "
          >
            Excellent
          </span>

        </div>

        {/* Circle */}

        <div className="relative mt-5 flex justify-center">

          <svg
            className="h-32 w-32 -rotate-90"
            viewBox="0 0 36 36"
          >
            <path
              d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#D6E6FF"
              strokeWidth="3"
            />

            <path
              d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#2F6BFF"
              strokeWidth="3"
              strokeDasharray="92,100"
              strokeLinecap="round"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">

            <span className="text-4xl font-bold text-slate-900">
              92
            </span>

            <span className="text-sm font-medium text-slate-600">
              /100
            </span>

          </div>

        </div>

        {/* Bottom Stats */}

        <div className="mt-5 grid grid-cols-3 gap-2">

          <div
            className="
              rounded-2xl
              bg-white/35
              py-2.5
              text-center
              backdrop-blur-md
            "
          >
            <Heart className="mx-auto mb-1 h-4 w-4 text-[#2F6BFF]" />

            <p className="text-lg font-bold text-slate-900">
              72
            </p>

            <p className="text-[11px] text-slate-600">
              BPM
            </p>

          </div>

          <div
            className="
              rounded-2xl
              bg-white/35
              py-2.5
              text-center
              backdrop-blur-md
            "
          >
            <Footprints className="mx-auto mb-1 h-4 w-4 text-[#2F6BFF]" />

            <p className="text-lg font-bold text-slate-900">
              8.2k
            </p>

            <p className="text-[11px] text-slate-600">
              Steps
            </p>

          </div>

          <div
            className="
              rounded-2xl
              bg-white/35
              py-2.5
              text-center
              backdrop-blur-md
            "
          >
            <Activity className="mx-auto mb-1 h-4 w-4 text-[#2F6BFF]" />

            <p className="text-lg font-bold text-slate-900">
              98%
            </p>

            <p className="text-[11px] text-slate-600">
              O₂
            </p>

          </div>

        </div>

      </div>

    </section>
  );
};

export default WellnessScore;