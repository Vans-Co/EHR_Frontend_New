import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import {
  CalendarClock,
  CalendarDays,
  ChevronRight,
  FileText,
  Ticket,
  Users,
} from "lucide-react";

import { useAuthStore } from "@/store/authStore";
import {
  doctorApi,
  type DoctorAppointment,
  type ReportAccessEntry,
  type ScheduleEntry,
} from "@/features/doctor/services/doctorApi";

const todayBackend = () => {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${mm}-${dd}-${d.getFullYear()}`;
};

const to12h = (t: string) => {
  const [h, min] = (t || "").split(":").map(Number);
  if (Number.isNaN(h)) return t;
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(min ?? 0).padStart(2, "0")} ${period}`;
};

const DoctorDashboard = () => {
  const user = useAuthStore((state) => state.user);

  const [todayQueue, setTodayQueue] = useState<DoctorAppointment[]>([]);
  const [schedule, setSchedule] = useState<ScheduleEntry[]>([]);
  const [access, setAccess] = useState<ReportAccessEntry[]>([]);

  useEffect(() => {
    if (!user?.ehrId) return;
    const id = user.ehrId;
    doctorApi.getAppointments(id, todayBackend()).then(setTodayQueue).catch(() => {});
    doctorApi.getSchedule(id).then(setSchedule).catch(() => {});
    doctorApi.getReportAccess(id).then(setAccess).catch(() => {});
  }, [user?.ehrId]);

  const scheduled = todayQueue.filter((a) => a.status === "SCHEDULED");
  const nextUp = scheduled[0] ?? null;
  const approvedAccess = access.filter((a) => a.status === "APPROVED").length;
  const pendingAccess = access.filter((a) => a.status === "PENDING").length;

  const cards = [
    {
      to: "/doctor/appointments",
      icon: CalendarDays,
      title: "Today's Appointments",
      value: String(scheduled.length),
      detail: nextUp
        ? `Next: token #${nextUp.tokenNumber ?? "–"} · ${nextUp.patientName ?? nextUp.patientId} at ${to12h(nextUp.startTime)}`
        : "No more appointments today",
    },
    {
      to: "/doctor/availability",
      icon: CalendarClock,
      title: "Availability",
      value: String(new Set(schedule.map((s) => s.day)).size),
      detail: schedule.length
        ? `Working days: ${[...new Set(schedule.map((s) => s.day))].map((d) => d.slice(0, 3)).join(", ")}`
        : "No weekly schedule set yet — patients can't see your hours",
    },
    {
      to: "/doctor/reports",
      icon: FileText,
      title: "Report Access",
      value: String(approvedAccess),
      detail: pendingAccess
        ? `${pendingAccess} request${pendingAccess > 1 ? "s" : ""} waiting for patient approval`
        : "Patients who shared their reports with you",
    },
    {
      to: "/doctor/patients",
      icon: Users,
      title: "Find Patients",
      value: "→",
      detail: "Search patients, request access, view allergies",
    },
  ];

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-7">

      {/* Welcome */}

      <section
        className="
          rounded-[30px]
          border
          border-white/30
          bg-gradient-to-br
          from-cyan-500/5
          via-white/75
          to-violet-500/5
          p-8
          shadow-[0_15px_40px_rgba(15,23,42,.06)]
          backdrop-blur-2xl
        "
      >
        <h1 className="text-3xl font-bold text-on-background">
          Welcome, Dr. {user?.firstName ?? ""} 👨‍⚕️
        </h1>
        <p className="mt-2 text-sm text-on-surface-variant">
          Here's what your day looks like.
        </p>
      </section>

      {/* Stat cards */}

      <section className="grid gap-5 sm:grid-cols-2">
        {cards.map((card) => (
          <Link
            key={card.to}
            to={card.to}
            className="
              group
              rounded-[26px]
              border
              border-white/30
              bg-white/70
              p-6
              backdrop-blur-xl
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-[0_18px_45px_rgba(15,23,42,.10)]
            "
          >
            <div className="flex items-center justify-between">
              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-br
                  from-cyan-400
                  to-violet-500
                  shadow-lg
                "
              >
                <card.icon size={22} className="text-white" />
              </div>
              <span className="text-3xl font-bold text-on-background">
                {card.value}
              </span>
            </div>

            <h2 className="mt-4 flex items-center gap-1 font-semibold text-on-background">
              {card.title}
              <ChevronRight
                size={16}
                className="text-on-surface-variant transition-transform group-hover:translate-x-1"
              />
            </h2>
            <p className="mt-1 text-sm text-on-surface-variant">{card.detail}</p>
          </Link>
        ))}
      </section>

      {/* Today's queue preview */}

      {scheduled.length > 0 && (
        <section
          className="
            rounded-[26px]
            border
            border-white/30
            bg-white/70
            p-6
            backdrop-blur-xl
          "
        >
          <h2 className="font-bold text-on-background">Today's Queue</h2>
          <div className="mt-4 space-y-2">
            {scheduled.slice(0, 5).map((a) => (
              <div
                key={a.token}
                className="
                  flex
                  items-center
                  gap-4
                  rounded-xl
                  border
                  border-outline-variant
                  bg-white/60
                  px-4
                  py-3
                  text-sm
                "
              >
                <span className="flex items-center gap-1.5 font-bold text-violet-700">
                  <Ticket size={14} />#{a.tokenNumber ?? "–"}
                </span>
                <span className="flex-1 font-medium text-on-background">
                  {a.patientName ?? a.patientId}
                </span>
                <span className="text-on-surface-variant">
                  {to12h(a.startTime)} – {to12h(a.lastTime)}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default DoctorDashboard;
