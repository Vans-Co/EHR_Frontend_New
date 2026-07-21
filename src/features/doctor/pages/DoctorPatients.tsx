import { useCallback, useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";

import {
  AlertTriangle,
  FileText,
  Loader2,
  Lock,
  Search,
  ShieldQuestion,
  Users,
} from "lucide-react";

import { useAuthStore } from "@/store/authStore";
import useDebounce from "@/hooks/useDebounce";
import {
  searchService,
  type PatientSearchResult,
} from "@/services/search.service";
import {
  doctorApi,
  REQUESTABLE_ATTRIBUTES,
  type PatientAllergy,
} from "@/features/doctor/services/doctorApi";

const DoctorPatients = () => {
  const user = useAuthStore((state) => state.user);
  const [searchParams] = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [results, setResults] = useState<PatientSearchResult[]>([]);
  const [searching, setSearching] = useState(false);

  const [busyId, setBusyId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<
    Record<string, { ok: boolean; text: string }>
  >({});
  const [allergies, setAllergies] = useState<
    Record<string, PatientAllergy[] | "denied">
  >({});

  const debouncedQuery = useDebounce(query.trim(), 350);

  const runSearch = useCallback(async (q: string) => {
    if (q.length < 2) {
      setResults([]);
      return;
    }
    setSearching(true);
    try {
      setResults(await searchService.searchPatients(q));
    } catch {
      setResults([]);
    } finally {
      setSearching(false);
    }
  }, []);

  useEffect(() => {
    runSearch(debouncedQuery);
  }, [debouncedQuery, runSearch]);

  const setNote = (ehrId: string, ok: boolean, text: string) =>
    setFeedback((prev) => ({ ...prev, [ehrId]: { ok, text } }));

  const requestProfileAccess = async (patient: PatientSearchResult) => {
    if (!user?.ehrId) return;
    setBusyId(patient.ehrId);
    try {
      await doctorApi.requestProfileAccess(patient.ehrId, user.ehrId, [
        ...REQUESTABLE_ATTRIBUTES,
      ]);
      setNote(
        patient.ehrId,
        true,
        "Access request sent. The patient will be notified."
      );
    } catch {
      setNote(patient.ehrId, false, "Could not send the access request.");
    } finally {
      setBusyId(null);
    }
  };

  const requestReportAccess = async (patient: PatientSearchResult) => {
    if (!user?.ehrId) return;
    setBusyId(patient.ehrId);
    try {
      await doctorApi.requestReportAccess(user.ehrId, patient.ehrId);
      setNote(
        patient.ehrId,
        true,
        "Report access request sent. The patient will be notified."
      );
    } catch {
      setNote(patient.ehrId, false, "Could not send the report access request.");
    } finally {
      setBusyId(null);
    }
  };

  const viewAllergies = async (patient: PatientSearchResult) => {
    setBusyId(patient.ehrId);
    try {
      const data = await doctorApi.getPatientAllergies(patient.ehrId);
      setAllergies((prev) => ({ ...prev, [patient.ehrId]: data }));
    } catch {
      // 403 -> the patient has not approved allergy access yet
      setAllergies((prev) => ({ ...prev, [patient.ehrId]: "denied" }));
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">

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
          <Users size={28} className="text-white" />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-on-background">Patients</h1>
          <p className="mt-1 text-sm text-on-surface-variant">
            Search patients to send reports, request access to critical info,
            or schedule appointments.
          </p>
        </div>
      </section>

      {/* Search */}

      <div className="relative">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, email or EHR id (min 2 characters)..."
          className="
            h-13
            w-full
            rounded-2xl
            border
            border-outline-variant
            bg-white/80
            py-3.5
            pl-12
            pr-5
            text-sm
            text-on-background
            outline-none
            transition-all
            focus:border-primary
            focus:ring-4
            focus:ring-primary/10
          "
        />
      </div>

      {/* Results */}

      {searching && (
        <div className="flex items-center justify-center gap-2 py-8 text-on-surface-variant">
          <Loader2 size={18} className="animate-spin" />
          Searching...
        </div>
      )}

      {!searching && debouncedQuery.length >= 2 && results.length === 0 && (
        <p className="py-8 text-center text-sm text-on-surface-variant">
          No patients found for "{debouncedQuery}".
        </p>
      )}

      <div className="flex flex-col gap-4">
        {results.map((patient) => {
          const note = feedback[patient.ehrId];
          const allergyState = allergies[patient.ehrId];
          const busy = busyId === patient.ehrId;

          return (
            <article
              key={patient.ehrId}
              className="
                rounded-[26px]
                border
                border-white/30
                bg-white/70
                p-6
                shadow-[0_10px_30px_rgba(15,23,42,.05)]
                backdrop-blur-xl
              "
            >
              <div className="flex flex-wrap items-start justify-between gap-4">

                <div className="flex items-center gap-4">
                  <div
                    className="
                      flex
                      h-13
                      w-13
                      items-center
                      justify-center
                      rounded-2xl
                      bg-gradient-to-br
                      from-cyan-400
                      to-violet-500
                      p-3.5
                      text-base
                      font-bold
                      text-white
                    "
                  >
                    {(patient.firstName?.[0] ?? "?") +
                      (patient.lastName?.[0] ?? "")}
                  </div>

                  <div>
                    <h3 className="font-bold text-on-background">
                      {`${patient.firstName ?? ""} ${patient.lastName ?? ""}`.trim() ||
                        patient.ehrId}
                    </h3>
                    <p className="text-sm text-on-surface-variant">
                      {patient.email} · {patient.ehrId}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => viewAllergies(patient)}
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-xl
                      border
                      border-amber-300/50
                      bg-amber-500/10
                      px-4
                      py-2
                      text-sm
                      font-medium
                      text-amber-700
                      transition-colors
                      hover:bg-amber-500/20
                      disabled:opacity-50
                    "
                  >
                    <AlertTriangle size={15} />
                    View Allergies
                  </button>

                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => requestProfileAccess(patient)}
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-xl
                      border
                      border-cyan-300/50
                      bg-cyan-500/10
                      px-4
                      py-2
                      text-sm
                      font-medium
                      text-cyan-700
                      transition-colors
                      hover:bg-cyan-500/20
                      disabled:opacity-50
                    "
                  >
                    <ShieldQuestion size={15} />
                    Request Profile Access
                  </button>

                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => requestReportAccess(patient)}
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-xl
                      border
                      border-violet-300/50
                      bg-violet-500/10
                      px-4
                      py-2
                      text-sm
                      font-medium
                      text-violet-700
                      transition-colors
                      hover:bg-violet-500/20
                      disabled:opacity-50
                    "
                  >
                    <FileText size={15} />
                    Request Report Access
                  </button>
                </div>
              </div>

              {note && (
                <p
                  className={`
                    mt-4
                    rounded-xl
                    px-4
                    py-2.5
                    text-sm
                    ${note.ok
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-red-50 text-red-600"}
                  `}
                >
                  {note.text}
                </p>
              )}

              {allergyState === "denied" && (
                <p
                  className="
                    mt-4
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-slate-100
                    px-4
                    py-2.5
                    text-sm
                    text-slate-600
                  "
                >
                  <Lock size={15} />
                  Allergies are restricted. Send a profile access request and
                  wait for the patient's approval.
                </p>
              )}

              {Array.isArray(allergyState) && (
                <div className="mt-4 rounded-xl border border-outline-variant bg-white/60 p-4">
                  <h4 className="text-sm font-semibold text-on-background">
                    Allergies
                  </h4>
                  {allergyState.length === 0 ? (
                    <p className="mt-2 text-sm text-on-surface-variant">
                      No allergies recorded.
                    </p>
                  ) : (
                    <ul className="mt-2 space-y-2">
                      {allergyState.map((a, i) => (
                        <li
                          key={i}
                          className="flex flex-wrap items-center gap-2 text-sm text-on-background"
                        >
                          <span className="font-medium">
                            {a.allergenName ?? "Unknown allergen"}
                          </span>
                          {a.allergyType && (
                            <span className="rounded-full bg-cyan-500/10 px-2 py-0.5 text-[11px] font-semibold text-cyan-700">
                              {a.allergyType}
                            </span>
                          )}
                          {a.severity && (
                            <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-[11px] font-semibold text-red-600">
                              {a.severity}
                            </span>
                          )}
                          {a.reaction && (
                            <span className="text-on-surface-variant">
                              — {a.reaction}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default DoctorPatients;
