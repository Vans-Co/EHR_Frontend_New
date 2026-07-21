import { useCallback, useEffect, useState } from "react";

import {
  Check,
  FileText,
  Loader2,
  ShieldCheck,
  X,
} from "lucide-react";

import { useAuthStore } from "@/store/authStore";
import {
  permissionsApi,
  type ReportAccessRequest,
  type RestrictionRequest,
  type RequestStatus,
} from "@/features/patient/services/permissionsApi";

const STATUS_BADGE: Record<RequestStatus, string> = {
  PENDING: "bg-amber-500/10 text-amber-700 border-amber-300/40",
  APPROVED: "bg-emerald-500/10 text-emerald-700 border-emerald-300/40",
  REJECTED: "bg-red-500/10 text-red-600 border-red-300/40",
};

const formatDate = (iso: string | null) => {
  if (!iso) return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? ""
    : d.toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });
};

const PatientPermissions = () => {
  const user = useAuthStore((state) => state.user);

  const [restrictions, setRestrictions] = useState<RestrictionRequest[]>([]);
  const [reportRequests, setReportRequests] = useState<ReportAccessRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyKey, setBusyKey] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!user?.ehrId) return;
    setLoading(true);
    try {
      const [r1, r2] = await Promise.allSettled([
        permissionsApi.getRestrictionRequests(user.ehrId),
        permissionsApi.getReportAccessRequests(user.ehrId),
      ]);
      if (r1.status === "fulfilled") setRestrictions(r1.value);
      if (r2.status === "fulfilled") setReportRequests(r2.value);
    } finally {
      setLoading(false);
    }
  }, [user?.ehrId]);

  useEffect(() => {
    load();
  }, [load]);

  const respondRestriction = async (req: RestrictionRequest, approve: boolean) => {
    setBusyKey(`r-${req.id}`);
    try {
      if (approve) {
        await permissionsApi.approveRestriction(req.id, req.restrictedAttributes);
      } else {
        await permissionsApi.rejectRestriction(req.id);
      }
      await load();
    } finally {
      setBusyKey(null);
    }
  };

  const respondReport = async (req: ReportAccessRequest, approve: boolean) => {
    setBusyKey(`p-${req.id}`);
    try {
      if (approve) {
        await permissionsApi.approveReportAccess(req.id);
      } else {
        await permissionsApi.rejectReportAccess(req.id);
      }
      await load();
    } finally {
      setBusyKey(null);
    }
  };

  const ActionButtons = ({
    busy,
    onApprove,
    onReject,
  }: {
    busy: boolean;
    onApprove: () => void;
    onReject: () => void;
  }) => (
    <div className="flex gap-2">
      <button
        type="button"
        disabled={busy}
        onClick={onApprove}
        className="
          inline-flex
          items-center
          gap-1.5
          rounded-xl
          bg-emerald-600
          px-4
          py-2
          text-sm
          font-semibold
          text-white
          transition-all
          hover:bg-emerald-700
          disabled:opacity-50
        "
      >
        {busy ? <Loader2 size={15} className="animate-spin" /> : <Check size={15} />}
        Approve
      </button>
      <button
        type="button"
        disabled={busy}
        onClick={onReject}
        className="
          inline-flex
          items-center
          gap-1.5
          rounded-xl
          border
          border-red-300/50
          bg-red-500/10
          px-4
          py-2
          text-sm
          font-semibold
          text-red-600
          transition-all
          hover:bg-red-500/20
          disabled:opacity-50
        "
      >
        <X size={15} />
        Reject
      </button>
    </div>
  );

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
          <ShieldCheck size={28} className="text-white" />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-on-background">
            Access Permissions
          </h1>
          <p className="mt-1 text-sm text-on-surface-variant">
            Doctors need your approval to see critical information like
            allergies, emergency contact and medical reports.
          </p>
        </div>
      </section>

      {loading && (
        <div className="flex items-center justify-center gap-2 py-10 text-on-surface-variant">
          <Loader2 size={18} className="animate-spin" />
          Loading requests...
        </div>
      )}

      {/* Profile access requests */}

      {!loading && (
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
          <h2 className="flex items-center gap-2 text-lg font-bold text-on-background">
            <ShieldCheck size={19} className="text-cyan-600" />
            Profile Information Requests
          </h2>

          {restrictions.length === 0 ? (
            <p className="mt-3 text-sm text-on-surface-variant">
              No profile access requests yet.
            </p>
          ) : (
            <div className="mt-4 space-y-3">
              {restrictions.map((req) => (
                <div
                  key={req.id}
                  className="
                    flex
                    flex-wrap
                    items-center
                    justify-between
                    gap-4
                    rounded-2xl
                    border
                    border-outline-variant
                    bg-white/60
                    px-5
                    py-4
                  "
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-on-background">
                      {req.accessorName}
                    </p>
                    <p className="mt-1 text-xs text-on-surface-variant">
                      Requested: {req.restrictedAttributes.join(", ") || "profile details"}
                    </p>
                    <p className="mt-1 text-xs text-on-surface-variant">
                      {formatDate(req.requestedAt)}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`rounded-full border px-3 py-1 text-[11px] font-semibold ${STATUS_BADGE[req.status]}`}
                    >
                      {req.status}
                    </span>

                    {req.status === "PENDING" && (
                      <ActionButtons
                        busy={busyKey === `r-${req.id}`}
                        onApprove={() => respondRestriction(req, true)}
                        onReject={() => respondRestriction(req, false)}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Report access requests */}

      {!loading && (
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
          <h2 className="flex items-center gap-2 text-lg font-bold text-on-background">
            <FileText size={19} className="text-violet-600" />
            Medical Report Requests
          </h2>

          {reportRequests.length === 0 ? (
            <p className="mt-3 text-sm text-on-surface-variant">
              No report access requests yet.
            </p>
          ) : (
            <div className="mt-4 space-y-3">
              {reportRequests.map((req) => (
                <div
                  key={req.id}
                  className="
                    flex
                    flex-wrap
                    items-center
                    justify-between
                    gap-4
                    rounded-2xl
                    border
                    border-outline-variant
                    bg-white/60
                    px-5
                    py-4
                  "
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-on-background">
                      Dr. {req.doctorName}
                    </p>
                    <p className="mt-1 text-xs text-on-surface-variant">
                      Wants access to your medical reports
                    </p>
                    <p className="mt-1 text-xs text-on-surface-variant">
                      {formatDate(req.requestedAt)}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`rounded-full border px-3 py-1 text-[11px] font-semibold ${STATUS_BADGE[req.status]}`}
                    >
                      {req.status}
                    </span>

                    {req.status === "PENDING" && (
                      <ActionButtons
                        busy={busyKey === `p-${req.id}`}
                        onApprove={() => respondReport(req, true)}
                        onReject={() => respondReport(req, false)}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default PatientPermissions;
