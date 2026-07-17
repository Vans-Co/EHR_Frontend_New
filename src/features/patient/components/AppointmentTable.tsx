import {
  CalendarDays,
  MoreVertical,
  Video,
  Clock,
} from "lucide-react";

const appointments = [
  {
    initials: "DA",
    doctor: "Dr. Aris",
    department: "Cardiology",
    date: "24 May 2024",
    time: "10:30 AM",
    status: "Confirmed",
    statusClass:
      "bg-green-100 text-green-700",
    action: "Join",
  },
  {
    initials: "LM",
    doctor: "Dr. Lawson",
    department: "Orthopedic",
    date: "02 Jun 2024",
    time: "02:15 PM",
    status: "Pending",
    statusClass:
      "bg-amber-100 text-amber-700",
    action: "Reschedule",
  },
];

const AppointmentTable = () => {
  return (
    <section
      className="
        overflow-hidden
        rounded-3xl
        border
        border-outline-variant
        bg-background
        shadow-sm
      "
    >
      {/* ========================= */}
      {/* Header */}
      {/* ========================= */}

      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-outline-variant
          p-5
        "
      >
        <div>

          <p className="text-sm text-on-surface-variant">
            Schedule
          </p>

          <h2 className="mt-1 text-xl font-bold text-on-background">
            Upcoming Appointments
          </h2>

        </div>

        <button
          className="
            rounded-xl
            bg-primary/10
            px-4
            py-2
            text-sm
            font-semibold
            text-primary
            transition
            hover:bg-primary/20
          "
        >
          View All
        </button>

      </div>

      {/* ========================= */}
      {/* Desktop Table */}
      {/* ========================= */}

      <div className="hidden overflow-x-auto md:block">

        <table className="w-full">

          <thead className="bg-surface-container">

            <tr>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-on-surface-variant">
                Doctor
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-on-surface-variant">
                Department
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-on-surface-variant">
                Schedule
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-on-surface-variant">
                Status
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase text-on-surface-variant">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {appointments.map((item) => (
              <tr
                key={item.doctor}
                className="
                  border-t
                  border-outline-variant
                  transition
                  hover:bg-surface-container-low
                "
              >
                {/* Doctor */}

                <td className="px-6 py-5">

                  <div className="flex items-center gap-3">

                    <div
                      className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-full
                        bg-primary
                        font-bold
                        text-white
                      "
                    >
                      {item.initials}
                    </div>

                    <div>

                      <p className="font-semibold text-on-background">
                        {item.doctor}
                      </p>

                      <p className="text-sm text-on-surface-variant">
                        Specialist
                      </p>

                    </div>

                  </div>

                </td>

                {/* Department */}

                <td className="px-6 py-5">

                  <span
                    className="
                      rounded-full
                      bg-primary/10
                      px-3
                      py-1
                      text-sm
                      font-medium
                      text-primary
                    "
                  >
                    {item.department}
                  </span>

                </td>

                {/* Schedule */}

                <td className="px-6 py-5">

                  <div className="space-y-1">

                    <div className="flex items-center gap-2">

                      <CalendarDays
                        size={16}
                        className="text-primary"
                      />

                      <span className="text-sm text-on-background">
                        {item.date}
                      </span>

                    </div>

                    <div className="flex items-center gap-2">

                      <Clock
                        size={16}
                        className="text-on-surface-variant"
                      />

                      <span className="text-sm text-on-surface-variant">
                        {item.time}
                      </span>

                    </div>

                  </div>

                </td>

                {/* Status */}

                <td className="px-6 py-5">

                  <span
                    className={`
                      rounded-full
                      px-3
                      py-1
                      text-xs
                      font-semibold
                      ${item.statusClass}
                    `}
                  >
                    {item.status}
                  </span>

                </td>

                {/* Actions */}

                <td className="px-6 py-5">

                  <div className="flex justify-end gap-3">

                    <button
                      className="
                        flex
                        items-center
                        gap-2
                        rounded-xl
                        bg-primary
                        px-4
                        py-2
                        text-sm
                        font-medium
                        text-white
                        transition
                        hover:opacity-90
                      "
                    >
                      <Video size={16} />

                      {item.action}

                    </button>

                    <button
                      className="
                        rounded-xl
                        p-2
                        transition
                        hover:bg-surface-container
                      "
                    >
                      <MoreVertical
                        size={18}
                        className="text-on-surface-variant"
                      />
                    </button>

                  </div>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

      {/* ========================= */}
      {/* Mobile Cards */}
      {/* ========================= */}

      <div className="space-y-4 p-4 md:hidden">

        {appointments.map((item) => (

          <div
            key={item.doctor}
            className="
              rounded-2xl
              border
              border-outline-variant
              p-4
            "
          >
            <div className="flex items-center gap-3">

              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  bg-primary
                  font-bold
                  text-white
                "
              >
                {item.initials}
              </div>

              <div>

                <h3 className="font-semibold text-on-background">
                  {item.doctor}
                </h3>

                <p className="text-sm text-on-surface-variant">
                  {item.department}
                </p>

              </div>

            </div>

            <div className="mt-4 flex items-center justify-between">

              <div>

                <p className="text-sm text-on-background">
                  {item.date}
                </p>

                <p className="text-xs text-on-surface-variant">
                  {item.time}
                </p>

              </div>

              <span
                className={`
                  rounded-full
                  px-3
                  py-1
                  text-xs
                  font-semibold
                  ${item.statusClass}
                `}
              >
                {item.status}
              </span>

            </div>

            <button
              className="
                mt-4
                w-full
                rounded-xl
                bg-primary
                py-3
                font-medium
                text-white
              "
            >
              {item.action}
            </button>

          </div>

        ))}

      </div>

    </section>
  );
};

export default AppointmentTable;