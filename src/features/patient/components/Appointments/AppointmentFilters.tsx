import {
  CalendarDays,
  Search,
  SlidersHorizontal,
} from "lucide-react";

import type {
  AppointmentFilters as AppointmentFiltersType,
  AppointmentStatus,
} from "../../types/appointment.types";

import {
  APPOINTMENT_STATUS,
} from "./appointment.constants";

interface AppointmentFiltersProps {
  filters: AppointmentFiltersType;

  onSearchChange: (
    value: string
  ) => void;

  onStatusChange: (
    value: "all" | AppointmentStatus
  ) => void;

  onSortChange: (
    value:
      | "newest"
      | "oldest"
      | "doctor"
      | "status"
  ) => void;

  onDateChange: (
    value: string
  ) => void;

}

const AppointmentFilters = ({
  filters,
  onSearchChange,
  onStatusChange,
  onSortChange,
  onDateChange,
}: AppointmentFiltersProps) => {

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

      {/* Background Glow */}

      <div
        className="
          absolute
          -right-24
          -top-24
          h-56
          w-56
          rounded-full
          bg-cyan-400/10
          blur-3xl
        "
      />

      <div
        className="
          absolute
          -bottom-24
          -left-24
          h-56
          w-56
          rounded-full
          bg-violet-400/10
          blur-3xl
        "
      />

      <div className="relative">

        {/* Search */}

        <div className="relative">

          <Search
            size={18}
            className="
              absolute
              left-5
              top-1/2
              -translate-y-1/2
              text-primary
            "
          />

          <input
            type="text"
            value={filters.search}
            onChange={(e) =>
              onSearchChange(
                e.target.value
              )
            }
            placeholder="Search doctor, specialization or hospital..."
            className="
              w-full
              rounded-2xl
              border
              border-white/30
              bg-white/55
              py-3.5
              pl-12
              pr-4
              text-sm
              backdrop-blur-xl
              outline-none
              transition-all
              duration-300
              placeholder:text-on-surface-variant
              focus:border-cyan-300/40
              focus:bg-white/70
              focus:ring-4
              focus:ring-cyan-400/10
            "
          />

        </div>

        {/* Status Chips */}

        <div
          className="
            mt-5
            flex
            flex-wrap
            gap-2
          "
        >

          <button
            onClick={() =>
              onStatusChange("all")
            }
            className={`
              rounded-full
              border
              px-4
              py-2
              text-sm
              font-medium
              transition-all
              duration-300

              ${
                filters.status === "all"
                  ? `
                    border-cyan-300/40
                    bg-gradient-to-r
                    from-cyan-500
                    to-violet-500
                    text-white
                    shadow-lg
                  `
                  : `
                    border-white/30
                    bg-white/50
                    text-on-background
                    backdrop-blur-xl
                    hover:bg-white/70
                  `
              }
            `}
          >
            All
          </button>

          {APPOINTMENT_STATUS.map(
            (status) => (

              <button
                key={status}
                onClick={() =>
                  onStatusChange(status)
                }
                className={`
                  rounded-full
                  border
                  px-4
                  py-2
                  text-sm
                  font-medium
                  transition-all
                  duration-300

                  ${
                    filters.status === status
                      ? `
                        border-cyan-300/40
                        bg-gradient-to-r
                        from-cyan-500
                        to-violet-500
                        text-white
                        shadow-lg
                      `
                      : `
                        border-white/30
                        bg-white/50
                        text-on-background
                        backdrop-blur-xl
                        hover:bg-white/70
                      `
                  }
                `}
              >
                {status}
              </button>

            )
          )}

        </div>

        {/* Controls */}

        <div
          className="
            mt-5
            grid
            gap-4
            md:grid-cols-2
          "
        >
                    {/* Sort */}

          <div className="relative">

            <SlidersHorizontal
              size={18}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-primary
              "
            />

            <select
              value={filters.sort}
              onChange={(e) =>
                onSortChange(
                  e.target.value as
                    | "newest"
                    | "oldest"
                    | "doctor"
                    | "status"
                )
              }
              className="
                w-full
                appearance-none
                rounded-2xl
                border
                border-white/30
                bg-white/55
                py-3
                pl-11
                pr-5
                text-sm
                font-medium
                text-on-background
                backdrop-blur-xl
                outline-none
                transition-all
                duration-300
                focus:border-cyan-300/40
                focus:bg-white/70
                focus:ring-4
                focus:ring-cyan-400/10
              "
            >

              <option value="newest">
                Newest First
              </option>

              <option value="oldest">
                Oldest First
              </option>

              <option value="doctor">
                Doctor Name
              </option>

              <option value="status">
                Status
              </option>

            </select>

          </div>

          {/* Date */}

          <div className="relative">

            <CalendarDays
              size={18}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-primary
              "
            />

            <input
              type="date"
              value={filters.date}
              onChange={(e) =>
                onDateChange(
                  e.target.value
                )
              }
              className="
                w-full
                rounded-2xl
                border
                border-white/30
                bg-white/55
                py-3
                pl-11
                pr-4
                text-sm
                font-medium
                text-on-background
                backdrop-blur-xl
                outline-none
                transition-all
                duration-300
                focus:border-cyan-300/40
                focus:bg-white/70
                focus:ring-4
                focus:ring-cyan-400/10
              "
            />

          </div>

        </div>

        {/* Footer */}

        <div
          className="
            mt-6
            flex
            flex-wrap
            items-center
            justify-between
            gap-3
            border-t
            border-white/20
            pt-5
          "
        >

          <div
            className="
              flex
              items-center
              gap-2
              text-sm
              text-on-surface-variant
            "
          >

            <SlidersHorizontal
              size={16}
              className="text-primary"
            />

            <span>
              Search, filter and sort your appointments.
            </span>

          </div>

          {/* Active Filters */}

          <div
            className="
              rounded-full
              border
              border-cyan-300/30
              bg-cyan-500/10
              px-4
              py-2
              text-xs
              font-semibold
              text-primary
              backdrop-blur-xl
            "
          >

            {
              [
                filters.search,
                filters.date,
                filters.status !== "all"
                  ? filters.status
                  : null,
              ].filter(Boolean).length
            }
            {" "}
            Active Filter
            {
              [
                filters.search,
                filters.date,
                filters.status !== "all"
                  ? filters.status
                  : null,
              ].filter(Boolean).length !== 1 &&
              "s"
            }

          </div>

        </div>

      </div>

    </section>

  );

};

export default AppointmentFilters;