import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Stethoscope,
  GraduationCap,
  IndianRupee,
  Loader2,
  UserRound,
} from "lucide-react";

import { useAuthStore } from "@/store/authStore";
import {
  doctorsApi,
  type DoctorDirectoryEntry,
} from "@/features/patient/services/doctorsApi";
import DoctorBookingDrawer from "@/features/patient/components/doctors/DoctorBookingDrawer";

const FindDoctors = () => {
  const user = useAuthStore((state) => state.user);

  const [doctors, setDoctors] = useState<DoctorDirectoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<DoctorDirectoryEntry | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setDoctors(await doctorsApi.list());
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return doctors;
    return doctors.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.specialization.toLowerCase().includes(q) ||
        d.degrees.some((deg) => deg.toLowerCase().includes(q))
    );
  }, [doctors, query]);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      {/* Header */}
      <section className="rounded-[30px] border border-white/30 bg-gradient-to-br from-cyan-500/5 via-white/75 to-violet-500/5 p-7 shadow-[0_15px_40px_rgba(15,23,42,.06)] backdrop-blur-2xl">
        <h1 className="text-2xl font-bold text-on-background">
          Find a Doctor
        </h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          Browse specialists, view their profile and book an appointment.
        </p>

        <div className="relative mt-5 max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, specialization or degree"
            className="w-full rounded-2xl border border-outline-variant bg-white/80 py-3 pl-11 pr-4 text-sm text-on-background outline-none focus:border-primary"
          />
        </div>
      </section>

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-16 text-sm text-on-surface-variant">
          <Loader2 size={18} className="animate-spin" />
          Loading doctors...
        </div>
      ) : filtered.length === 0 ? (
        <p className="py-16 text-center text-sm text-on-surface-variant">
          No doctors found.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((doctor) => (
            <div
              key={doctor.id}
              className="flex flex-col rounded-3xl border border-outline-variant bg-white/70 p-5 backdrop-blur-xl transition hover:shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <UserRound size={24} />
                </div>
                <div className="min-w-0">
                  <p className="truncate font-semibold text-on-background">
                    {doctor.name}
                  </p>
                  <p className="flex items-center gap-1 truncate text-xs text-on-surface-variant">
                    <Stethoscope size={12} className="text-primary" />
                    {doctor.specialization || "General Physician"}
                  </p>
                </div>
              </div>

              {doctor.degrees.length > 0 && (
                <p className="mt-3 flex items-start gap-1.5 text-xs text-on-surface-variant">
                  <GraduationCap size={14} className="mt-0.5 shrink-0 text-primary" />
                  <span className="line-clamp-2">
                    {doctor.degrees.join(", ")}
                  </span>
                </p>
              )}

              <div className="mt-4 flex items-center justify-between border-t border-outline-variant pt-4">
                <span className="flex items-center gap-0.5 text-sm font-bold text-on-background">
                  {doctor.consultationFee != null ? (
                    <>
                      <IndianRupee size={14} />
                      {doctor.consultationFee}
                    </>
                  ) : (
                    <span className="text-xs font-medium text-on-surface-variant">
                      Fee on request
                    </span>
                  )}
                </span>
                <button
                  type="button"
                  onClick={() => setSelected(doctor)}
                  className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white transition hover:bg-primary/90"
                >
                  View &amp; Book
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selected && user?.ehrId && (
        <DoctorBookingDrawer
          doctor={selected}
          patientId={user.ehrId}
          onClose={() => setSelected(null)}
          onBooked={() => {
            /* list needs no refresh; the drawer shows its own confirmation */
          }}
        />
      )}
    </div>
  );
};

export default FindDoctors;
