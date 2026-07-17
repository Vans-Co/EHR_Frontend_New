import {
  Activity,
  AlertCircle,
  CheckCircle2,
  FileText,
} from "lucide-react";

const activities = [
  {
    title: "Appointment Booked",
    description: "Dr. Lawson • Cardiology",
    time: "2 hrs ago",
    color: "bg-emerald-500",
    icon: CheckCircle2,
  },
  {
    title: "Lab Report Uploaded",
    description: "CBC Report • City Labs",
    time: "Yesterday",
    color: "bg-primary",
    icon: FileText,
  },
  {
    title: "Medication Reminder",
    description: "Lisinopril 10mg",
    time: "Today • 8:00 AM",
    color: "bg-red-500",
    icon: AlertCircle,
  },
];

const ActivityFeed = () => {
  return (
    <section className="flex h-full flex-col rounded-[30px] border border-white/20 bg-white/70 p-5 shadow-[0_15px_35px_rgba(0,0,0,0.08)] backdrop-blur-xl">

      {/* Header */}

      <div className="mb-4 flex items-center justify-between">

        <div>

          <p className="text-sm text-on-surface-variant">
            Recent Updates
          </p>

          <h2 className="mt-1 text-xl font-bold text-on-background">
            Activity Feed
          </h2>

        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">

          <Activity
            size={20}
            className="text-primary"
          />

        </div>

      </div>

      {/* Timeline */}

      <div className="relative flex-1">

        <div className="absolute left-[18px] top-2 bottom-2 w-px bg-slate-200" />

        <div className="space-y-3">

          {activities.map((item) => {

            const Icon = item.icon;

            return (

              <div
                key={item.title}
                className="relative flex items-start gap-3"
              >

                <div
                  className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white shadow-sm ${item.color}`}
                >

                  <Icon size={16} />

                </div>

                <div className="flex-1 rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3 transition hover:shadow-sm">

                  <div className="flex items-start justify-between">

                    <div>

                      <h3 className="text-sm font-semibold text-on-background">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-xs text-on-surface-variant">
                        {item.description}
                      </p>

                    </div>

                    <span className="whitespace-nowrap text-xs text-on-surface-variant">
                      {item.time}
                    </span>

                  </div>

                </div>

              </div>

            );

          })}

        </div>

      </div>

    </section>
  );
};

export default ActivityFeed;