import { MoreVertical } from "lucide-react";
import type { Appointment } from "../../types/appointment.types";

type AppointmentTableProps = {
  appointments: Appointment[];
  onReschedule: (appointment: Appointment) => void;
  onCancel: (id: number) => void;
};

const getStatusClass = (status: Appointment["status"]) => {
  switch (status) {
    case "Confirmed":
      return "bg-green-100 text-green-700";

    case "Pending":
      return "bg-amber-100 text-amber-700";

    case "Completed":
      return "bg-blue-100 text-blue-700";

    case "Cancelled":
      return "bg-red-100 text-red-700";

    default:
      return "bg-slate-100 text-slate-700";
  }
};

const AppointmentTable = ({
  appointments,
  onReschedule,
  onCancel,
}: AppointmentTableProps) => {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
        <h2 className="text-xl font-semibold text-slate-900">
          Appointment History
        </h2>

        <span className="text-sm text-slate-500">
          {appointments.length} Appointments
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Doctor
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Department
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Date
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Status
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-400">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {appointments.map((appointment) => (
              <tr
                key={appointment.id}
                className="hover:bg-slate-50"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                      {appointment.initials}
                    </div>

                    <p className="font-medium text-slate-900">
                      {appointment.doctor}
                    </p>
                  </div>
                </td>

                <td className="px-6 py-4 text-sm text-slate-700">
                  {appointment.department}
                </td>

                <td className="px-6 py-4 text-sm text-slate-700">
                  {appointment.date}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded px-2 py-1 text-xs font-medium ${getStatusClass(
                      appointment.status
                    )}`}
                  >
                    {appointment.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">

                    {appointment.status !== "Completed" &&
                      appointment.status !== "Cancelled" && (
                        <>
                          <button
                            onClick={() => onReschedule(appointment)}
                            className="rounded-md bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 hover:bg-blue-200"
                          >
                            Reschedule
                          </button>

                          <button
                            onClick={() => onCancel(appointment.id)}
                            className="rounded-md bg-red-100 px-3 py-1 text-xs font-medium text-red-700 hover:bg-red-200"
                          >
                            Cancel
                          </button>
                        </>
                      )}

                    {appointment.status === "Completed" && (
                      <button className="rounded-md bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                        View Summary
                      </button>
                    )}

                    {appointment.status === "Cancelled" && (
                      <span className="text-xs text-slate-400">
                        Cancelled
                      </span>
                    )}

                    <button
                      type="button"
                      className="text-slate-400 hover:text-slate-700"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AppointmentTable;