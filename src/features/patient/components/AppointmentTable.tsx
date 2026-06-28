import { MoreVertical } from "lucide-react";

const appointments = [
  {
    initials: "DA",
    doctor: "Dr. Aris",
    department: "Cardiology",
    date: "May 24, 2024 • 10:30 AM",
    status: "Confirmed",
    statusClass: "bg-green-100 text-green-700",
    action: "Join Call",
  },
  {
    initials: "LM",
    doctor: "Dr. Lawson",
    department: "Orthopedic",
    date: "June 02, 2024 • 02:15 PM",
    status: "Pending",
    statusClass: "bg-amber-100 text-amber-700",
    action: "Reschedule",
  },
];

const AppointmentTable = () => {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
        <h2 className="text-xl font-semibold text-slate-900">Upcoming Appointments</h2>
        <button type="button" className="text-sm font-semibold text-blue-600 hover:underline">
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Doctor Name
              </th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Department
              </th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Date & Time
              </th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Status
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-400">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {appointments.map((item) => (
              <tr key={item.doctor} className="hover:bg-slate-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                      {item.initials}
                    </div>
                    <div className="text-sm font-medium text-slate-900">{item.doctor}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-700">{item.department}</td>
                <td className="px-6 py-4 text-sm text-slate-700">{item.date}</td>
                <td className="px-6 py-4">
                  <span className={`rounded px-2 py-1 text-xs font-medium ${item.statusClass}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-3">
                    <button className="text-sm font-medium text-blue-600 hover:underline">
                      {item.action}
                    </button>
                    <button type="button" aria-label="More actions" className="text-slate-400 hover:text-slate-700">
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