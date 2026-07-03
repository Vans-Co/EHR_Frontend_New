import type { Appointment } from "../../types/appointment.types";

type AppointmentStatsProps = {
  appointments: Appointment[];
};

const AppointmentStats = ({
  appointments,
}: AppointmentStatsProps) => {
  const confirmed = appointments.filter(
    (item) => item.status === "Confirmed"
  ).length;

  const pending = appointments.filter(
    (item) => item.status === "Pending"
  ).length;

  const completed = appointments.filter(
    (item) => item.status === "Completed"
  ).length;

  const cancelled = appointments.filter(
    (item) => item.status === "Cancelled"
  ).length;

  const cards = [
    {
      title: "Confirmed",
      value: confirmed,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "Pending",
      value: pending,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      title: "Completed",
      value: completed,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Cancelled",
      value: cancelled,
      color: "text-red-600",
      bg: "bg-red-50",
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div
            className={`inline-flex rounded-lg px-3 py-1 text-xs font-semibold ${card.bg} ${card.color}`}
          >
            {card.title}
          </div>

          <h2 className="mt-4 text-3xl font-bold text-slate-900">
            {card.value}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {card.title} appointments
          </p>
        </div>
      ))}
    </section>
  );
};

export default AppointmentStats;