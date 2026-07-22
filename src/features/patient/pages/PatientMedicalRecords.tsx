import { useEffect, useState } from "react";

import {
  Download,
  FileHeart,
  FileText,
  Loader2,
  Stethoscope,
} from "lucide-react";

import { useAuthStore } from "@/store/authStore";
import {
  reportsApi,
  type MyReport,
} from "@/features/patient/services/reportsApi";
import { realtime } from "@/services/realtime.service";

const PatientMedicalRecords = () => {
  const user = useAuthStore((state) => state.user);

  const [reports, setReports] = useState<MyReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.ehrId) return;
    (async () => {
      try {
        setReports(await reportsApi.getMyReports(user.ehrId));
      } catch {
        setError("Could not load your medical records.");
      } finally {
        setLoading(false);
      }
    })();
  }, [user?.ehrId]);

  // New reports arrive over the websocket as soon as a doctor uploads them.
  useEffect(
    () =>
      realtime.on("reports", (data) => {
        const incoming = data as MyReport;
        setReports((prev) => [
          incoming,
          ...prev.filter((r) => r.id !== incoming.id),
        ]);
      }),
    []
  );

  const download = async (report: MyReport) => {
    try {
      const blob = await reportsApi.downloadReport(report.id);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = report.fileName ?? `report_${report.id}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setError("Could not download the file.");
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
          <FileHeart size={28} className="text-white" />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-on-background">
            Medical Records
          </h1>
          <p className="mt-1 text-sm text-on-surface-variant">
            Reports your doctors have added for you.
          </p>
        </div>
      </section>

      {error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-10 text-on-surface-variant">
          <Loader2 size={18} className="animate-spin" />
          Loading records...
        </div>
      ) : reports.length === 0 ? (
        <p className="rounded-[26px] border border-white/30 bg-white/70 p-8 text-center text-sm text-on-surface-variant backdrop-blur-xl">
          No medical records yet. Reports added by your doctors will appear
          here.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {reports.map((report) => (
            <article
              key={report.id}
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
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-2xl
                      bg-gradient-to-br
                      from-cyan-400
                      to-violet-500
                      shadow-lg
                    "
                  >
                    <FileText size={20} className="text-white" />
                  </div>

                  <div>
                    <h2 className="font-bold text-on-background">
                      {report.info || "Report"}
                    </h2>
                    <p className="mt-0.5 flex items-center gap-1.5 text-sm text-on-surface-variant">
                      <Stethoscope size={13} />
                      Dr. {report.doctorName} · {report.dateTime}
                    </p>
                  </div>
                </div>

                {report.fileName && (
                  <button
                    type="button"
                    onClick={() => download(report)}
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
                      font-semibold
                      text-cyan-700
                      transition-colors
                      hover:bg-cyan-500/20
                    "
                  >
                    <Download size={15} />
                    {report.fileName}
                  </button>
                )}
              </div>

              {(report.desc || report.conclusion) && (
                <div className="mt-4 space-y-2 rounded-xl bg-white/60 p-4 text-sm">
                  {report.desc && (
                    <p className="text-on-background">
                      <span className="font-semibold">Description: </span>
                      {report.desc}
                    </p>
                  )}
                  {report.conclusion && (
                    <p className="text-on-background">
                      <span className="font-semibold">Conclusion: </span>
                      {report.conclusion}
                    </p>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientMedicalRecords;
