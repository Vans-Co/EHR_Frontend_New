import { useEffect, useMemo, useState } from "react";
import {
  X,
  GraduationCap,
  Stethoscope,
  IndianRupee,
  CalendarClock,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import { isAxiosError } from "axios";

import {
  doctorsApi,
  type DoctorDirectoryEntry,
  type DoctorScheduleEntry,
} from "@/features/patient/services/doctorsApi";

interface DoctorBookingDrawerProps {
  doctor: DoctorDirectoryEntry;
  patientId: string;
  onClose: () => void;
  onBooked: () => void;
}

const DAY_NAMES = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

// "09:00:00" -> "9:00 AM"
const to12h = (hms: string) => {
  const [h, m] = (hms || "").split(":").map(Number);
  if (Number.isNaN(h)) return hms;
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m ?? 0).padStart(2, "0")} ${period}`;
};

// Generate 30-minute start times within [start, end).
const buildSlots = (startHms: string, endHms: string): string[] => {
  const [sh, sm] = startHms.split(":").map(Number);
  const [eh, em] = endHms.split(":").map(Number);
  const start = sh * 60 + sm;
  const end = eh * 60 + em;
  const slots: string[] = [];
  for (let t = start; t + 30 <= end; t += 30) {
    const hh = Math.floor(t / 60);
    const mm = t % 60;
    slots.push(`${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}:00`);
  }
  return slots;
};

const todayIso = () => {
  const d = new Date();
  const off = d.getTimezoneOffset();
  return new Date(d.getTime() - off * 60000).toISOString().slice(0, 10);
};

const DoctorBookingDrawer = ({
  doctor,
  patientId,
  onClose,
  onBooked,
}: DoctorBookingDrawerProps) => {
  const [schedule, setSchedule] = useState<DoctorScheduleEntry[]>([]);
  const [loadingSchedule, setLoadingSchedule] = useState(true);

  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");

  const [booking, setBooking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setSchedule(await doctorsApi.getSchedule(doctor.id));
      } finally {
        setLoadingSchedule(false);
      }
    })();
  }, [doctor.id]);

  const workingDays = useMemo(
    () => schedule.map((s) => s.day),
    [schedule]
  );

  // Schedule entry for the chosen date's weekday, if the doctor works that day.
  const daySchedule = useMemo(() => {
    if (!date) return null;
    const [y, m, d] = date.split("-").map(Number);
    const weekday = DAY_NAMES[new Date(y, m - 1, d).getDay()];
    return schedule.find((s) => s.day === weekday) ?? null;
  }, [date, schedule]);

  const slots = useMemo(
    () => (daySchedule ? buildSlots(daySchedule.startTime, daySchedule.endTime) : []),
    [daySchedule]
  );

  const handleDateChange = (value: string) => {
    setDate(value);
    setSlot("");
    setError(null);
  };

  const book = async () => {
    if (!slot) {
      setError("Please choose a time slot.");
      return;
    }
    setBooking(true);
    setError(null);
    try {
      await doctorsApi.book({
        doctorId: doctor.id,
        patientId,
        date,
        startTime: slot,
        charge: doctor.consultationFee,
      });
      setDone(true);
      onBooked();
    } catch (err) {
      const message =
        isAxiosError(err) && typeof err.response?.data === "string"
          ? err.response.data
          : "Could not book this appointment. Please try another slot.";
      setError(message);
    } finally {
      setBooking(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative flex h-full w-full max-w-md flex-col overflow-y-auto bg-background shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-outline-variant p-6">
          <div>
            <h2 className="text-xl font-bold text-on-background">
              {doctor.name}
            </h2>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-on-surface-variant">
              <Stethoscope size={15} className="text-primary" />
              {doctor.specialization || "General Physician"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-on-surface-variant transition hover:bg-primary/10"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 space-y-6 p-6">
          {/* Fee */}
          <div className="flex items-center justify-between rounded-2xl bg-primary/5 px-5 py-4">
            <span className="text-sm font-medium text-on-surface-variant">
              Consultation fee
            </span>
            <span className="flex items-center gap-0.5 text-lg font-bold text-on-background">
              {doctor.consultationFee != null ? (
                <>
                  <IndianRupee size={17} />
                  {doctor.consultationFee}
                </>
              ) : (
                <span className="text-sm text-on-surface-variant">
                  Not specified
                </span>
              )}
            </span>
          </div>

          {/* About */}
          {doctor.aboutDoctor && (
            <div>
              <h3 className="text-sm font-semibold text-on-background">About</h3>
              <p className="mt-1.5 text-sm leading-6 text-on-surface-variant">
                {doctor.aboutDoctor}
              </p>
            </div>
          )}

          {/* Degrees */}
          {doctor.degrees.length > 0 && (
            <div>
              <h3 className="flex items-center gap-1.5 text-sm font-semibold text-on-background">
                <GraduationCap size={16} className="text-primary" />
                Qualifications
              </h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {doctor.degrees.map((deg) => (
                  <span
                    key={deg}
                    className="rounded-full bg-surface-container px-3 py-1 text-xs font-medium text-on-surface-variant"
                  >
                    {deg}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Booking */}
          <div className="border-t border-outline-variant pt-5">
            <h3 className="flex items-center gap-1.5 text-sm font-semibold text-on-background">
              <CalendarClock size={16} className="text-primary" />
              Book an appointment
            </h3>

            {loadingSchedule ? (
              <div className="mt-3 flex items-center gap-2 text-sm text-on-surface-variant">
                <Loader2 size={15} className="animate-spin" />
                Loading availability...
              </div>
            ) : schedule.length === 0 ? (
              <p className="mt-3 text-sm text-on-surface-variant">
                This doctor has not published any availability yet.
              </p>
            ) : (
              <>
                <p className="mt-2 text-xs text-on-surface-variant">
                  Available on:{" "}
                  {workingDays
                    .map((d) => d.slice(0, 3))
                    .join(", ")}
                </p>

                <label className="mt-4 block text-xs font-medium text-on-surface-variant">
                  Select date
                </label>
                <input
                  type="date"
                  min={todayIso()}
                  value={date}
                  onChange={(e) => handleDateChange(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-outline-variant bg-background px-4 py-2.5 text-sm text-on-background outline-none focus:border-primary"
                />

                {date && !daySchedule && (
                  <p className="mt-3 text-sm text-amber-600">
                    The doctor is not available on this day. Please pick one of
                    the available days.
                  </p>
                )}

                {slots.length > 0 && (
                  <>
                    <p className="mt-4 text-xs font-medium text-on-surface-variant">
                      Select a slot
                    </p>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      {slots.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSlot(s)}
                          className={`rounded-xl border px-2 py-2 text-xs font-semibold transition ${
                            slot === s
                              ? "border-primary bg-primary text-white"
                              : "border-outline-variant bg-background text-on-background hover:border-primary"
                          }`}
                        >
                          {to12h(s)}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}

            {error && (
              <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {done && (
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
                <CheckCircle2 size={16} />
                Appointment booked successfully.
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-outline-variant p-6">
          {done ? (
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-2xl bg-primary py-3 text-sm font-semibold text-white transition hover:bg-primary/90"
            >
              Done
            </button>
          ) : (
            <button
              type="button"
              disabled={booking || !slot}
              onClick={book}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {booking && <Loader2 size={16} className="animate-spin" />}
              {doctor.consultationFee != null
                ? `Confirm booking · ₹${doctor.consultationFee}`
                : "Confirm booking"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorBookingDrawer;
