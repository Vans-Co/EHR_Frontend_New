import { useCallback, useEffect, useState } from "react";

import {
  CalendarDays,
  Clock3,
  Loader2,
  Ticket,
  User as UserIcon,
} from "lucide-react";

import { useAuthStore } from "@/store/authStore";
import {
  doctorApi,
  type DoctorAppointment,
} from "@/features/doctor/services/doctorApi";

const STATUS_BADGE: Record<DoctorAppointment["status"], string> = {
  SCHEDULED: "bg-cyan-500/10 text-cyan-700 border-cyan-300/40",
  COMPLETED: "bg-emerald-500/10 text-emerald-700 border-emerald-300/40",
  CANCELLED: "bg-red-500/10 text-red-600 border-red-300/40",
  ON_HOLD: "bg-amber-500/10 text-amber-700 border-amber-300/40",
};

const todayISO = () => new Date().toISOString().slice(0, 10);

// "2026-07-22" -> "07-22-2026" (backend query format)
const isoToBackend = (iso: string) => {
  const [y, m, d] = iso.split("-");
  return `${m}-${d}-${y}`;
};

// "10:00" / "10:00:00" -> "10:00 AM"
const to12h = (t: string) => {
  const [h, min] = (t || "").split(":").map(Number);
  if (Number.isNaN(h)) return t;
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(min ?? 0).padStart(2, "0")} ${period}`;
};

const DoctorAppointments = () => {
  const user = useAuthStore((state) => state.user);

  const [date, setDate] = useState(todayISO());
  const [showAll, setShowAll] = useState(false);
  const [appointments, setAppointments] = useState<DoctorAppointment[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!user?.ehrId) return;
    setLoading(true);
    try {
      setAppointments(
        await doctorApi.getAppointments(
          user.ehrId,
          showAll ? undefined : isoToBackend(date)
        )
      );
    } catch {
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  }, [user?.ehrId, date, showAll]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">

      {/* Hero */}

      <section
        className="
          flex
          flex-wrap
          items-center
          justify-between
          gap-5
          rounded-[30px]
          border
          border-white/30
          bg-gradient-to-br
          from-cyan-500/5
          via-white/75
          to-violet-500/5
          p-7
          shadow-[0_15px_40px_rgba(15,23,42,.06)]
          backdrop-blur-2xl
        "
      >
        <div className="flex items-center gap-5">
          <div
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-[22px]
              bg-gradient-to-br
              from-cyan-400
              via-sky-500
              to-violet-500
              shadow-xl
            "
          >
            <CalendarDays size={28} className="text-white" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-on-background">
              Appointment Queue
            </h1>
            <p className="mt-1 text-sm text-on-surface-variant">
              Patients in token order for the selected day.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="date"
            value={date}
            disabled={showAll}
            onChange={(e) => setDate(e.target.value)}
            className="
              rounded-xl
              border
              border-outline-variant
              bg-white
              px-4
              py-2.5
              text-sm
              text-on-background
              outline-none
              focus:border-primary
              disabled:opacity-50
            "
          />
          <label className="flex cursor-pointer items-center gap-2 text-sm text-on-surface-variant">
            <input
              type="checkbox"
              checked={showAll}
              onChange={(e) => setShowAll(e.target.checked)}
              className="h-4 w-4 accent-cyan-600"
            />
            All dates
          </label>
        </div>
      </section>

      {/* Queue */}

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-10 text-on-surface-variant">
          <Loader2 size={18} className="animate-spin" />
          Loading appointments...
        </div>
      ) : appointments.length === 0 ? (
        <p className="py-10 text-center text-sm text-on-surface-variant">
          No appointments {showAll ? "yet" : "on this day"}.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {appointments.map((a) => (
            <article
              key={a.token}
              className="
                flex
                flex-wrap
                items-center
                gap-5
                rounded-[24px]
                border
                border-white/30
                bg-white/70
                px-6
                py-5
                shadow-[0_10px_30px_rgba(15,23,42,.05)]
                backdrop-blur-xl
              "
            >
              {/* Token */}

              <div
                className="
                  flex
                  h-14
                  w-14
                  shrink-0
                  flex-col
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-br
                  from-violet-500
                  to-cyan-500
                  text-white
                  shadow-lg
                "
              >
                <Ticket size={14} />
                <span className="text-lg font-bold leading-5">
                  {a.tokenNumber ?? "–"}
                </span>
              </div>

              {/* Patient */}

              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-2 font-semibold text-on-background">
                  <UserIcon size={15} className="shrink-0 text-cyan-600" />
                  {a.patientName || a.patientId}
                </p>
                <p className="mt-1 text-xs text-on-surface-variant">
                  {a.patientId}
                </p>
              </div>

              {/* Date + time */}

              <div className="flex items-center gap-2 text-sm text-on-background">
                <CalendarDays size={15} className="text-cyan-600" />
                {a.date}
              </div>

              <div className="flex items-center gap-2 text-sm text-on-background">
                <Clock3 size={15} className="text-violet-600" />
                {to12h(a.startTime)} – {to12h(a.lastTime)}
              </div>

              {/* Status */}

              <span
                className={`rounded-full border px-3 py-1 text-[11px] font-semibold ${STATUS_BADGE[a.status]}`}
              >
                {a.status}
              </span>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorAppointments;
