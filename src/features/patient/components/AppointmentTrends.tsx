import {
  TrendingUp,
  CalendarDays,
} from "lucide-react";

const data = [
  { month: "Jan", value: 40 },
  { month: "Feb", value: 60 },
  { month: "Mar", value: 30 },
  { month: "Apr", value: 85 },
  { month: "May", value: 55 },
  { month: "Jun", value: 72 },
];

const AppointmentTrends = () => {
  return (
    <section
      className="
        rounded-3xl
        border
        border-outline-variant
        bg-background
        p-5
        shadow-sm
      "
    >
      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-on-surface-variant">
            Analytics
          </p>

          <h3 className="mt-1 text-xl font-bold text-on-background">
            Appointment Trends
          </h3>

        </div>

        <div
          className="
            flex
            items-center
            gap-2
            rounded-full
            bg-green-50
            px-3
            py-1.5
            text-sm
            font-semibold
            text-green-600
          "
        >
          <TrendingUp size={16} />
          +18%
        </div>

      </div>

      {/* Summary */}

      <div className="mt-5 flex items-center gap-3">

        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-primary/10
          "
        >
          <CalendarDays
            size={22}
            className="text-primary"
          />
        </div>

        <div>

          <p className="text-2xl font-bold text-on-background">
            24
          </p>

          <p className="text-sm text-on-surface-variant">
            Appointments This Month
          </p>

        </div>

      </div>

      {/* Chart */}

      <div
        className="
          mt-6
          flex
          h-40
          items-end
          justify-between
          gap-3
        "
      >
        {data.map((item, index) => (
          <div
            key={item.month}
            className="flex flex-1 flex-col items-center"
          >
            <div
              className={`
                w-full
                rounded-t-2xl
                transition-all
                duration-300
                hover:opacity-80
                ${
                  index === 3
                    ? "bg-primary"
                    : "bg-primary/20"
                }
              `}
              style={{
                height: `${item.value}%`,
              }}
            />

            <span
              className="
                mt-3
                text-xs
                font-medium
                text-on-surface-variant
              "
            >
              {item.month}
            </span>
          </div>
        ))}
      </div>

    </section>
  );
};

export default AppointmentTrends;