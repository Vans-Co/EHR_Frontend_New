import { CheckCircle2, FileText, AlertCircle } from "lucide-react";

const activities = [
  {
    title: "Appointment Booked",
    description: "with Dr. Lawson",
    time: "2 hours ago",
    dotClass: "bg-blue-600 text-white",
    icon: <CheckCircle2 className="h-3 w-3" />,
  },
  {
    title: "Lab Report Uploaded",
    description: "by City Labs",
    time: "Yesterday, 4:30 PM",
    dotClass: "bg-slate-100 border border-slate-300 text-blue-600",
    icon: <FileText className="h-3 w-3" />,
  },
  {
    title: "Medication Reminder",
    description: "Lisinopril 10mg",
    time: "Today, 8:00 AM",
    dotClass: "bg-red-600 text-white",
    icon: <AlertCircle className="h-3 w-3" />,
  },
];

const ActivityFeed = () => {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold text-slate-900">Activity Feed</h2>

      <div className="relative space-y-6">
        <div className="absolute bottom-2 left-[11px] top-2 w-px bg-slate-200" />

        {activities.map((item) => (
          <div key={item.title} className="relative pl-5">
            <div
              className={`absolute left-0 top-1 z-10 flex h-[22px] w-[22px] items-center justify-center rounded-full ${item.dotClass}`}
            >
              {item.icon}
            </div>

            <div className="ml-4">
              <p className="text-sm text-slate-900">
                <span className="font-bold">{item.title}</span> {item.description}
              </p>
              <p className="text-xs text-slate-400">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ActivityFeed;