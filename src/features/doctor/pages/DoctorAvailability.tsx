import { useEffect, useState } from "react";

import { CalendarClock, Loader2, Save } from "lucide-react";

import { useAuthStore } from "@/store/authStore";
import {
  doctorApi,
  WEEK_DAYS,
  type ScheduleEntry,
  type WeekDay,
} from "@/features/doctor/services/doctorApi";

interface DayRow {
  enabled: boolean;
  start: string; // HH:mm (input value)
  end: string; // HH:mm
}

const DEFAULT_ROW: DayRow = { enabled: false, start: "09:00", end: "17:00" };

const toInputTime = (hms: string) => hms.slice(0, 5); // "09:00:00" -> "09:00"
const toApiTime = (hm: string) => `${hm}:00`; // "09:00" -> "09:00:00"

const DoctorAvailability = () => {
  const user = useAuthStore((state) => state.user);

  const [rows, setRows] = useState<Record<WeekDay, DayRow>>(
    Object.fromEntries(
      WEEK_DAYS.map((d) => [d, { ...DEFAULT_ROW }])
    ) as Record<WeekDay, DayRow>
  );

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(
    null
  );

  useEffect(() => {
    if (!user?.ehrId) return;

    (async () => {
      try {
        const schedule = await doctorApi.getSchedule(user.ehrId);
        setRows((prev) => {
          const next = { ...prev };
          for (const entry of schedule) {
            if (next[entry.day]) {
              next[entry.day] = {
                enabled: true,
                start: toInputTime(entry.startTime),
                end: toInputTime(entry.endTime),
              };
            }
          }
          return next;
        });
      } catch {
        /* start from a blank week */
      } finally {
        setLoading(false);
      }
    })();
  }, [user?.ehrId]);

  const updateRow = (day: WeekDay, updates: Partial<DayRow>) => {
    setRows((prev) => ({ ...prev, [day]: { ...prev[day], ...updates } }));
    setMessage(null);
  };

  const save = async () => {
    if (!user?.ehrId) return;

    const schedule: ScheduleEntry[] = WEEK_DAYS.filter(
      (d) => rows[d].enabled
    ).map((d) => ({
      day: d,
      startTime: toApiTime(rows[d].start),
      endTime: toApiTime(rows[d].end),
    }));

    for (const entry of schedule) {
      if (entry.startTime >= entry.endTime) {
        setMessage({
          ok: false,
          text: `${entry.day}: start time must be before end time.`,
        });
        return;
      }
    }

    setSaving(true);
    setMessage(null);
    try {
      await doctorApi.setSchedule(user.ehrId, schedule);
      setMessage({ ok: true, text: "Availability saved." });
    } catch (err: unknown) {
      const detail =
        (err as { response?: { data?: string } })?.response?.data;
      setMessage({
        ok: false,
        text: typeof detail === "string" && detail
          ? detail
          : "Could not save availability. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">

      {/* Hero */}

      <section
        className="
          flex
          items-center
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
          <CalendarClock size={28} className="text-white" />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-on-background">
            Weekly Availability
          </h1>
          <p className="mt-1 text-sm text-on-surface-variant">
            Patients can only book appointments inside these hours.
          </p>
        </div>
      </section>

      {/* Schedule editor */}

      <section
        className="
          rounded-[30px]
          border
          border-white/30
          bg-white/70
          p-6
          backdrop-blur-xl
        "
      >

        {loading ? (
          <div className="flex items-center justify-center gap-2 py-10 text-on-surface-variant">
            <Loader2 size={18} className="animate-spin" />
            Loading schedule...
          </div>
        ) : (
          <div className="space-y-3">
            {WEEK_DAYS.map((day) => {
              const row = rows[day];
              return (
                <div
                  key={day}
                  className={`
                    flex
                    flex-wrap
                    items-center
                    gap-4
                    rounded-2xl
                    border
                    px-5
                    py-4
                    transition-colors
                    ${row.enabled
                      ? "border-cyan-300/40 bg-cyan-500/5"
                      : "border-outline-variant bg-white/40 opacity-70"}
                  `}
                >
                  <label className="flex w-40 cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      checked={row.enabled}
                      onChange={(e) =>
                        updateRow(day, { enabled: e.target.checked })
                      }
                      className="h-4 w-4 accent-cyan-600"
                    />
                    <span className="text-sm font-semibold capitalize text-on-background">
                      {day.toLowerCase()}
                    </span>
                  </label>

                  <div className="flex items-center gap-3">
                    <input
                      type="time"
                      value={row.start}
                      disabled={!row.enabled}
                      onChange={(e) => updateRow(day, { start: e.target.value })}
                      className="
                        rounded-xl
                        border
                        border-outline-variant
                        bg-white
                        px-3
                        py-2
                        text-sm
                        text-on-background
                        outline-none
                        focus:border-primary
                        disabled:opacity-50
                      "
                    />
                    <span className="text-sm text-on-surface-variant">to</span>
                    <input
                      type="time"
                      value={row.end}
                      disabled={!row.enabled}
                      onChange={(e) => updateRow(day, { end: e.target.value })}
                      className="
                        rounded-xl
                        border
                        border-outline-variant
                        bg-white
                        px-3
                        py-2
                        text-sm
                        text-on-background
                        outline-none
                        focus:border-primary
                        disabled:opacity-50
                      "
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {message && (
          <p
            className={`
              mt-4
              rounded-xl
              px-4
              py-3
              text-sm
              ${message.ok
                ? "bg-emerald-50 text-emerald-700"
                : "bg-red-50 text-red-600"}
            `}
          >
            {message.text}
          </p>
        )}

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            disabled={saving || loading}
            onClick={save}
            className="
              inline-flex
              items-center
              gap-2
              rounded-2xl
              bg-gradient-to-r
              from-cyan-500
              via-sky-500
              to-violet-500
              px-7
              py-3
              text-sm
              font-semibold
              text-white
              shadow-lg
              transition-all
              duration-300
              hover:-translate-y-0.5
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {saving ? (
              <>
                <Loader2 size={17} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={17} />
                Save Availability
              </>
            )}
          </button>
        </div>
      </section>
    </div>
  );
};

export default DoctorAvailability;
