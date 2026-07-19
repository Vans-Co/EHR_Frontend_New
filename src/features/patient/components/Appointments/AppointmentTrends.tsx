import {
  TrendingUp,
} from "lucide-react";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type {
  AppointmentTrend,
} from "../../types/appointment.types";

interface AppointmentTrendCardProps {
  data: AppointmentTrend[];
}

const AppointmentTrendCard = ({
  data,
}: AppointmentTrendCardProps) => {

  const total = data.reduce(
    (sum, item) => sum + item.appointments,
    0
  );

  const average = Math.round(
    total / data.length
  );

  const growth =
    data.length > 1
      ? Math.round(
          ((data[data.length - 1].appointments -
            data[0].appointments) /
            data[0].appointments) *
            100
        )
      : 0;

  return (

    <section
      className="
        relative
        overflow-hidden
        rounded-[30px]
        border
        border-white/30
        bg-gradient-to-br
        from-cyan-500/5
        via-white/75
        to-violet-500/5
        p-6
        shadow-[0_15px_40px_rgba(15,23,42,.06)]
        backdrop-blur-2xl
      "
    >

      {/* Ambient Glow */}

      <div
        className="
          absolute
          -right-20
          -top-20
          h-52
          w-52
          rounded-full
          bg-cyan-400/10
          blur-3xl
        "
      />

      <div
        className="
          absolute
          -bottom-20
          -left-20
          h-52
          w-52
          rounded-full
          bg-violet-400/10
          blur-3xl
        "
      />

      <div className="relative">

        {/* Header */}

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-on-surface-variant">
              Analytics
            </p>

            <h2
              className="
                mt-1
                text-2xl
                font-bold
                text-on-background
              "
            >
              Appointment Trends
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-on-surface-variant
              "
            >
              Monthly appointment activity overview
            </p>

          </div>

          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              from-cyan-400
              to-violet-500
              shadow-lg
            "
          >

            <TrendingUp
              size={24}
              className="text-white"
            />

          </div>

        </div>

        {/* Chart Container */}

        <div
          className="
            mt-6
            rounded-[24px]
            border
            border-white/30
            bg-white/40
            p-4
            backdrop-blur-xl
          "
        >

          <div className="h-[320px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <AreaChart data={data}>

                <defs>

                  <linearGradient
                    id="appointmentGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >

                    <stop
                      offset="5%"
                      stopColor="#22D3EE"
                      stopOpacity={0.45}
                    />

                    <stop
                      offset="95%"
                      stopColor="#8B5CF6"
                      stopOpacity={0}
                    />

                  </linearGradient>

                </defs>

                <CartesianGrid
                  strokeDasharray="4 4"
                  vertical={false}
                  stroke="#E2E8F0"
                />

                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                />

                <YAxis
                  tickLine={false}
                  axisLine={false}
                />

                <Tooltip
                  contentStyle={{
                    borderRadius: "18px",
                    border: "1px solid rgba(255,255,255,.35)",
                    backdropFilter: "blur(18px)",
                    background: "rgba(255,255,255,.85)",
                    boxShadow:
                      "0 10px 30px rgba(15,23,42,.08)",
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="appointments"
                  stroke="#06B6D4"
                  strokeWidth={4}
                  fill="url(#appointmentGradient)"
                  dot={{
                    r: 5,
                    fill: "#06B6D4",
                  }}
                  activeDot={{
                    r: 7,
                  }}
                />

              </AreaChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* Analytics Cards */}

        <div
          className="
            mt-6
            grid
            gap-4
            md:grid-cols-3
          "
        >
                    {/* Total */}

          <div
            className="
              relative
              overflow-hidden
              rounded-[24px]
              border
              border-cyan-300/20
              bg-gradient-to-br
              from-cyan-500/10
              to-cyan-400/5
              p-5
              backdrop-blur-xl
            "
          >

            <div
              className="
                absolute
                -right-8
                -top-8
                h-24
                w-24
                rounded-full
                bg-cyan-400/20
                blur-3xl
              "
            />

            <div className="relative">

              <p className="text-sm text-on-surface-variant">
                Total Appointments
              </p>

              <h3
                className="
                  mt-3
                  text-3xl
                  font-bold
                  text-on-background
                "
              >
                {total}
              </h3>

            </div>

          </div>

          {/* Average */}

          <div
            className="
              relative
              overflow-hidden
              rounded-[24px]
              border
              border-violet-300/20
              bg-gradient-to-br
              from-violet-500/10
              to-fuchsia-400/5
              p-5
              backdrop-blur-xl
            "
          >

            <div
              className="
                absolute
                -right-8
                -top-8
                h-24
                w-24
                rounded-full
                bg-violet-400/20
                blur-3xl
              "
            />

            <div className="relative">

              <p className="text-sm text-on-surface-variant">
                Monthly Average
              </p>

              <h3
                className="
                  mt-3
                  text-3xl
                  font-bold
                  text-on-background
                "
              >
                {average}
              </h3>

            </div>

          </div>

          {/* Growth */}

          <div
            className="
              relative
              overflow-hidden
              rounded-[24px]
              border
              border-emerald-300/20
              bg-gradient-to-br
              from-emerald-500/10
              to-green-400/5
              p-5
              backdrop-blur-xl
            "
          >

            <div
              className="
                absolute
                -right-8
                -top-8
                h-24
                w-24
                rounded-full
                bg-emerald-400/20
                blur-3xl
              "
            />

            <div className="relative">

              <p className="text-sm text-on-surface-variant">
                Growth Rate
              </p>

              <h3
                className={`
                  mt-3
                  text-3xl
                  font-bold
                  ${
                    growth >= 0
                      ? "text-emerald-600"
                      : "text-red-500"
                  }
                `}
              >
                {growth >= 0 && "+"}

                {growth}%
              </h3>

              <p
                className="
                  mt-2
                  text-xs
                  text-on-surface-variant
                "
              >
                Compared to first month
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>

  );

};

export default AppointmentTrendCard;