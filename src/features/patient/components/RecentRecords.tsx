import { ExternalLink, Download, FlaskConical, Pill, Stethoscope } from "lucide-react";

const records = [
  {
    title: "Complete Blood Count (CBC)",
    meta: "Lab Results • May 12, 2024",
    icon: <FlaskConical className="h-5 w-5" />,
  },
  {
    title: "Lisinopril Prescription",
    meta: "Pharmacy • May 05, 2024",
    icon: <Pill className="h-5 w-5" />,
  },
  {
    title: "Chest X-Ray Report",
    meta: "Radiology • April 20, 2024",
    icon: <Stethoscope className="h-5 w-5" />,
  },
];

const RecentRecords = () => {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">Recent Records</h2>
        <button type="button" aria-label="Open recent records" className="text-slate-400 hover:text-blue-600">
          <ExternalLink className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-4">
        {records.map((record) => (
          <div
            key={record.title}
            className="group -mx-2 flex cursor-pointer items-start gap-4 rounded-lg p-2 transition hover:bg-slate-50"
          >
            <div className="rounded-lg bg-blue-100 p-2 text-blue-600">{record.icon}</div>
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-900">{record.title}</p>
              <p className="text-sm text-slate-500">{record.meta}</p>
            </div>
            <button type="button" aria-label="Download record" className="text-slate-400 hover:text-blue-600">
              <Download className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <button className="mt-6 w-full rounded-lg border border-slate-200 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
        Explore Full Repository
      </button>
    </section>
  );
};

export default RecentRecords;