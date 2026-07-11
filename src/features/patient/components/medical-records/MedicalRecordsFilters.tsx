import {
  Search,
  Building2,
  FileText,
  ShieldCheck,
} from "lucide-react";

type MedicalRecordsFiltersProps = {
  search: string;
  department: string;
  reportType: string;
  status: string;

  onSearchChange: (value: string) => void;
  onDepartmentChange: (value: string) => void;
  onReportTypeChange: (value: string) => void;
  onStatusChange: (value: string) => void;
};

const MedicalRecordsFilters = ({
  search,
  department,
  reportType,
  status,
  onSearchChange,
  onDepartmentChange,
  onReportTypeChange,
  onStatusChange,
}: MedicalRecordsFiltersProps) => {
  return (
    <section className="rounded-2xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-100/40">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold text-slate-900">
            Search & Filter Records
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Quickly find your medical reports using filters.
          </p>

        </div>

      </div>

      <div className="grid gap-5 lg:grid-cols-4">

        {/* Search */}

        <div className="relative">

          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-blue-500" />

          <input
            type="text"
            placeholder="Search reports, doctor..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="
              w-full
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              py-3
              pl-12
              pr-4
              text-sm
              shadow-sm
              transition-all
              duration-300
              outline-none
              focus:border-blue-500
              focus:bg-white
              focus:shadow-lg
              focus:shadow-blue-200/40
            "
          />

        </div>

        {/* Department */}

        <div className="relative">

          <Building2 className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-blue-500" />

          <select
            value={department}
            onChange={(e) => onDepartmentChange(e.target.value)}
            className="
              w-full
              appearance-none
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              py-3
              pl-12
              pr-4
              text-sm
              shadow-sm
              transition-all
              duration-300
              outline-none
              focus:border-blue-500
              focus:bg-white
              focus:shadow-lg
              focus:shadow-blue-200/40
            "
          >
            <option value="All">All Departments</option>
            <option value="Cardiology">❤️ Cardiology</option>
            <option value="Neurology">🧠 Neurology</option>
            <option value="Orthopedic">🦴 Orthopedic</option>
            <option value="Radiology">🩻 Radiology</option>
            <option value="General">🩺 General Medicine</option>
          </select>

        </div>

        {/* Report Type */}

        <div className="relative">

          <FileText className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-blue-500" />

          <select
            value={reportType}
            onChange={(e) => onReportTypeChange(e.target.value)}
            className="
              w-full
              appearance-none
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              py-3
              pl-12
              pr-4
              text-sm
              shadow-sm
              transition-all
              duration-300
              outline-none
              focus:border-blue-500
              focus:bg-white
              focus:shadow-lg
              focus:shadow-blue-200/40
            "
          >
            <option value="All">All Report Types</option>
            <option value="Blood Test">🧪 Blood Test</option>
            <option value="MRI">🧠 MRI</option>
            <option value="CT Scan">🖥️ CT Scan</option>
            <option value="X-Ray">🩻 X-Ray</option>
            <option value="ECG">❤️ ECG</option>
            <option value="Prescription">💊 Prescription</option>
            <option value="Ultrasound">📡 Ultrasound</option>
            <option value="Other">📄 Other</option>
          </select>

        </div>

        {/* Status */}

        <div className="relative">

          <ShieldCheck className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-blue-500" />

          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="
              w-full
              appearance-none
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              py-3
              pl-12
              pr-4
              text-sm
              shadow-sm
              transition-all
              duration-300
              outline-none
              focus:border-blue-500
              focus:bg-white
              focus:shadow-lg
              focus:shadow-blue-200/40
            "
          >
            <option value="All">All Verification Status</option>
            <option value="Verified">🛡 Verified</option>
            <option value="Reviewed">✅ Reviewed</option>
            <option value="Pending">🟡 Pending</option>
          </select>

        </div>

      </div>

    </section>
  );
};

export default MedicalRecordsFilters;