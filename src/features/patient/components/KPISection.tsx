import {
  CalendarDays,
  Pill,
  FileText,
  Wallet,
  Shield,
  Syringe,
  Heart,
  BellRing,
} from "lucide-react";

const cards = [
  {
    title: "Upcoming Appointments",
    value: "02",
    subtext: "Next: Dr. Aris (Cardio)",
    icon: <CalendarDays className="h-5 w-5 text-blue-600" />,
  },
  {
    title: "Active Prescriptions",
    value: "04",
    subtext: "2 refills available",
    icon: <Pill className="h-5 w-5 text-blue-600" />,
  },
  {
    title: "Medical Reports",
    value: "12",
    subtext: "1 new report available",
    icon: <FileText className="h-5 w-5 text-blue-600" />,
    subtextClass: "text-blue-600 font-medium",
  },
  {
    title: "Outstanding Payments",
    value: "$145.00",
    subtext: "Due in 3 days",
    icon: <Wallet className="h-5 w-5 text-red-600" />,
    subtextClass: "text-red-600 font-medium",
  },
  {
    title: "Insurance Status",
    value: "Active",
    subtext: "Aetna • Premium Plus",
    icon: <Shield className="h-5 w-5 text-blue-600" />,
  },
  {
    title: "Vaccination Progress",
    value: "85%",
    subtext: "",
    icon: <Syringe className="h-5 w-5 text-blue-600" />,
    progress: 85,
  },
  {
    title: "Health Score",
    value: "92/100",
    subtext: "Excellent condition",
    icon: <Heart className="h-5 w-5 text-blue-600" />,
  },
  {
    title: "Follow-ups Due",
    value: "01",
    subtext: "Cardiology annual checkup",
    icon: <BellRing className="h-5 w-5 text-blue-600" />,
  },
];

const KPISection = () => {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div key={card.title} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
              {card.title}
            </span>
            {card.icon}
          </div>

          <div className="text-3xl font-semibold tracking-tight text-slate-900">{card.value}</div>

          {card.progress ? (
            <div className="mt-3">
              <div className="h-1.5 w-full rounded-full bg-slate-200">
                <div className="h-1.5 rounded-full bg-blue-600" style={{ width: `${card.progress}%` }} />
              </div>
            </div>
          ) : (
            <div className={`mt-1 text-sm ${card.subtextClass ?? "text-slate-500"}`}>
              {card.subtext}
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default KPISection;