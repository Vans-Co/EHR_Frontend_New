import { Search } from "lucide-react";

type AppointmentFiltersProps = {
  search: string;
  status: string;
  department: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onDepartmentChange: (value: string) => void;
};

const AppointmentFilters = ({
  search,
  status,
  department,
  onSearchChange,
  onStatusChange,
  onDepartmentChange,
}: AppointmentFiltersProps) => {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-4 md:grid-cols-3">

        {/* Search */}

        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />

          <input
            type="text"
            placeholder="Search doctor..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-lg border border-slate-300 py-2 pl-10 pr-4 outline-none transition focus:border-blue-500"
          />
        </div>

        {/* Status */}

        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="rounded-lg border border-slate-300 px-4 py-2 outline-none transition focus:border-blue-500"
        >
          <option value="All">All Status</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        {/* Department */}

        <select
          value={department}
          onChange={(e) => onDepartmentChange(e.target.value)}
          className="rounded-lg border border-slate-300 px-4 py-2 outline-none transition focus:border-blue-500"
        >
          <option value="All">All Departments</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Orthopedic">Orthopedic</option>
          <option value="Neurology">Neurology</option>
        </select>

      </div>
    </section>
  );
};

export default AppointmentFilters;