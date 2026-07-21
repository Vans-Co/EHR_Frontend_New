import { useCallback, useEffect, useState } from "react";

import {
  Download,
  FileText,
  Loader2,
  Lock,
  Upload,
} from "lucide-react";

import { useAuthStore } from "@/store/authStore";
import {
  doctorApi,
  type PatientReport,
  type ReportAccessEntry,
} from "@/features/doctor/services/doctorApi";

const todayBackend = () => {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${mm}-${dd}-${d.getFullYear()}`;
};

const EMPTY_FORM = { info: "", desc: "", conclusion: "" };

const DoctorReports = () => {
  const user = useAuthStore((state) => state.user);

  const [access, setAccess] = useState<ReportAccessEntry[]>([]);
  const [selected, setSelected] = useState<ReportAccessEntry | null>(null);
  const [reports, setReports] = useState<PatientReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingReports, setLoadingReports] = useState(false);

  const [form, setForm] = useState(EMPTY_FORM);
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(
    null
  );

  useEffect(() => {
    if (!user?.ehrId) return;
    (async () => {
      try {
        setAccess(await doctorApi.getReportAccess(user.ehrId));
      } catch {
        /* empty list */
      } finally {
        setLoading(false);
      }
    })();
  }, [user?.ehrId]);

  const approved = access.filter((a) => a.status === "APPROVED");
  const pending = access.filter((a) => a.status === "PENDING");

  const loadReports = useCallback(async (patientId: string) => {
    setLoadingReports(true);
    try {
      setReports(await doctorApi.getPatientReports(patientId));
    } catch {
      setReports([]);
    } finally {
      setLoadingReports(false);
    }
  }, []);

  const selectPatient = (entry: ReportAccessEntry) => {
    setSelected(entry);
    setMessage(null);
    setForm(EMPTY_FORM);
    setFile(null);
    loadReports(entry.patientId);
  };

  const upload = async () => {
    if (!user?.ehrId || !selected) return;
    if (!form.info.trim()) {
      setMessage({ ok: false, text: "Please give the report a title." });
      return;
    }
    setSaving(true);
    setMessage(null);
    try {
      let fileBase64: string | undefined;
      if (file) {
        fileBase64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () =>
            resolve((reader.result as string).split(",")[1] ?? "");
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      }
      await doctorApi.addReport({
        patientId: selected.patientId,
        doctorId: user.ehrId,
        dateTime: todayBackend(),
        info: form.info,
        desc: form.desc,
        conclusion: form.conclusion,
        fileBase64,
        fileName: file?.name,
        fileType: file?.type || undefined,
      });
      setForm(EMPTY_FORM);
      setFile(null);
      setMessage({ ok: true, text: "Report sent. The patient was notified." });
      await loadReports(selected.patientId);
    } catch {
      setMessage({ ok: false, text: "Could not upload the report." });
    } finally {
      setSaving(false);
    }
  };

  const download = async (report: PatientReport) => {
    try {
      const blob = await doctorApi.downloadReport(report.id);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = report.fileName ?? `report_${report.id}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setMessage({ ok: false, text: "Could not download the file." });
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
          <FileText size={28} className="text-white" />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-on-background">
            Medical Reports
          </h1>
          <p className="mt-1 text-sm text-on-surface-variant">
            Upload reports for your patients and review ones they shared with
            you.
          </p>
        </div>
      </section>

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-10 text-on-surface-variant">
          <Loader2 size={18} className="animate-spin" />
          Loading patients...
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">

          {/* Patient list */}

          <section
            className="
              rounded-[26px]
              border
              border-white/30
              bg-white/70
              p-5
              backdrop-blur-xl
            "
          >
            <h2 className="text-sm font-bold uppercase tracking-wide text-on-surface-variant">
              Patients with access
            </h2>

            {approved.length === 0 && (
              <p className="mt-3 flex items-start gap-2 text-sm text-on-surface-variant">
                <Lock size={15} className="mt-0.5 shrink-0" />
                No patient has granted report access yet. Use the Patients page
                to send a request.
              </p>
            )}

            <div className="mt-3 space-y-2">
              {approved.map((entry) => (
                <button
                  key={entry.id}
                  type="button"
                  onClick={() => selectPatient(entry)}
                  className={`
                    w-full
                    rounded-xl
                    border
                    px-4
                    py-3
                    text-left
                    text-sm
                    transition-colors
                    ${selected?.id === entry.id
                      ? "border-cyan-400/60 bg-cyan-500/10 font-semibold text-cyan-800"
                      : "border-outline-variant bg-white/60 text-on-background hover:bg-primary/5"}
                  `}
                >
                  {entry.patientName}
                  <span className="mt-0.5 block text-xs font-normal text-on-surface-variant">
                    {entry.patientId}
                  </span>
                </button>
              ))}
            </div>

            {pending.length > 0 && (
              <>
                <h3 className="mt-5 text-xs font-bold uppercase tracking-wide text-on-surface-variant">
                  Waiting for approval
                </h3>
                <ul className="mt-2 space-y-1">
                  {pending.map((entry) => (
                    <li
                      key={entry.id}
                      className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700"
                    >
                      {entry.patientName}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </section>

          {/* Reports + upload */}

          <section className="lg:col-span-2">
            {!selected ? (
              <p className="rounded-[26px] border border-white/30 bg-white/70 p-8 text-center text-sm text-on-surface-variant backdrop-blur-xl">
                Select a patient to view and upload reports.
              </p>
            ) : (
              <div className="flex flex-col gap-5">

                {/* Upload form */}

                <div
                  className="
                    rounded-[26px]
                    border
                    border-white/30
                    bg-white/70
                    p-6
                    backdrop-blur-xl
                  "
                >
                  <h2 className="font-bold text-on-background">
                    New report for {selected.patientName}
                  </h2>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <input
                      type="text"
                      placeholder="Title (e.g. Blood Test)"
                      value={form.info}
                      onChange={(e) => {
                        setForm({ ...form, info: e.target.value });
                        setMessage(null);
                      }}
                      className="rounded-xl border border-outline-variant bg-white px-4 py-2.5 text-sm outline-none focus:border-primary"
                    />
                    <input
                      type="file"
                      onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                      className="rounded-xl border border-outline-variant bg-white px-4 py-2 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-cyan-500/10 file:px-3 file:py-1.5 file:text-cyan-700"
                    />
                    <textarea
                      placeholder="Description"
                      rows={2}
                      value={form.desc}
                      onChange={(e) => setForm({ ...form, desc: e.target.value })}
                      className="rounded-xl border border-outline-variant bg-white px-4 py-2.5 text-sm outline-none focus:border-primary sm:col-span-2"
                    />
                    <textarea
                      placeholder="Conclusion"
                      rows={2}
                      value={form.conclusion}
                      onChange={(e) =>
                        setForm({ ...form, conclusion: e.target.value })
                      }
                      className="rounded-xl border border-outline-variant bg-white px-4 py-2.5 text-sm outline-none focus:border-primary sm:col-span-2"
                    />
                  </div>

                  {message && (
                    <p
                      className={`mt-4 rounded-xl px-4 py-2.5 text-sm ${message.ok ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"}`}
                    >
                      {message.text}
                    </p>
                  )}

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      disabled={saving}
                      onClick={upload}
                      className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-2xl
                        bg-gradient-to-r
                        from-cyan-500
                        to-violet-500
                        px-6
                        py-2.5
                        text-sm
                        font-semibold
                        text-white
                        shadow-lg
                        transition-all
                        hover:-translate-y-0.5
                        disabled:opacity-60
                      "
                    >
                      {saving ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <Upload size={16} />
                      )}
                      Send Report
                    </button>
                  </div>
                </div>

                {/* Existing reports */}

                <div
                  className="
                    rounded-[26px]
                    border
                    border-white/30
                    bg-white/70
                    p-6
                    backdrop-blur-xl
                  "
                >
                  <h2 className="font-bold text-on-background">
                    Reports of {selected.patientName}
                  </h2>

                  {loadingReports ? (
                    <div className="flex items-center gap-2 py-6 text-sm text-on-surface-variant">
                      <Loader2 size={16} className="animate-spin" />
                      Loading reports...
                    </div>
                  ) : reports.length === 0 ? (
                    <p className="mt-3 text-sm text-on-surface-variant">
                      No reports yet.
                    </p>
                  ) : (
                    <div className="mt-4 space-y-3">
                      {reports.map((r) => (
                        <div
                          key={r.id}
                          className="
                            flex
                            flex-wrap
                            items-center
                            gap-4
                            rounded-xl
                            border
                            border-outline-variant
                            bg-white/60
                            px-4
                            py-3
                          "
                        >
                          <FileText size={18} className="shrink-0 text-cyan-600" />
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-on-background">
                              {r.info || "Report"}
                            </p>
                            <p className="mt-0.5 text-xs text-on-surface-variant">
                              {r.dateTime} · Dr. {r.doctorName}
                              {r.desc ? ` — ${r.desc}` : ""}
                            </p>
                          </div>
                          {r.fileName && (
                            <button
                              type="button"
                              onClick={() => download(r)}
                              className="
                                inline-flex
                                items-center
                                gap-1.5
                                rounded-lg
                                border
                                border-cyan-300/50
                                bg-cyan-500/10
                                px-3
                                py-1.5
                                text-xs
                                font-semibold
                                text-cyan-700
                                hover:bg-cyan-500/20
                              "
                            >
                              <Download size={13} />
                              {r.fileName}
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default DoctorReports;
