import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import {
  getRestrictionGrantsForPatient,
  approveRestrictionGrant,
  rejectRestrictionGrant,
} from "../services/patientApi";
import AppButton from "@/components/common/AppButton";
import { Shield, Check, X, ShieldAlert, ShieldCheck } from "lucide-react";

interface RestrictionGrant {
  id: number;
  patientId: string;
  patientName: string;
  accessorId: string;
  accessorName: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  restrictedAttributes: string | null;
  requestedAt: string;
  respondedAt: string | null;
}

const PatientSettings = () => {
  const { user } = useAuthStore();
  const [restrictions, setRestrictions] = useState<RestrictionGrant[]>([]);
  const [loading, setLoading] = useState(true);
  const [actioningId, setActioningId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Approval modal states
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(null);
  const [selectedAttributes, setSelectedAttributes] = useState<string[]>([]);

  const attributesList = [
    { key: "phoneNo", label: "Phone Number" },
    { key: "email", label: "Email Address" },
    { key: "dob", label: "Date of Birth" },
    { key: "bloodGroup", label: "Blood Group" },
    { key: "address", label: "Full Address" },
    { key: "emergencyContact", label: "Emergency Contact Info" },
  ];

  useEffect(() => {
    if (user?.ehrId) {
      fetchRestrictions();
    }
  }, [user?.ehrId]);

  const fetchRestrictions = async () => {
    try {
      setLoading(true);
      const data = await getRestrictionGrantsForPatient(String(user?.ehrId));
      setRestrictions(data);
    } catch (err) {
      setError("Failed to fetch restriction grants.");
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (requestId: number) => {
    try {
      setActioningId(requestId);
      setError("");
      setSuccess("");
      await rejectRestrictionGrant(requestId);
      setSuccess("Restriction request rejected successfully.");
      fetchRestrictions();
    } catch (err) {
      setError("Failed to reject request.");
    } finally {
      setActioningId(null);
    }
  };

  const openApproveModal = (requestId: number) => {
    setSelectedRequestId(requestId);
    setSelectedAttributes([]);
    setIsApproveModalOpen(true);
  };

  const toggleAttribute = (key: string) => {
    setSelectedAttributes((prev) =>
      prev.includes(key) ? prev.filter((a) => a !== key) : [...prev, key]
    );
  };

  const handleApproveSubmit = async () => {
    if (!selectedRequestId) return;
    try {
      setActioningId(selectedRequestId);
      setError("");
      setSuccess("");
      await approveRestrictionGrant(selectedRequestId, selectedAttributes);
      setSuccess("Restriction request approved successfully.");
      setIsApproveModalOpen(false);
      fetchRestrictions();
    } catch (err) {
      setError("Failed to approve request.");
    } finally {
      setActioningId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="rounded-3xl border border-outline-variant bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Shield className="text-primary" /> Privacy & Restrictions settings
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Control access to your health record attributes by other users and doctors.
        </p>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-600 text-sm font-semibold">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-2xl border border-green-200 bg-green-50 p-4 text-green-700 text-sm font-semibold">
          {success}
        </div>
      )}

      <div className="rounded-3xl border border-outline-variant bg-white shadow-sm overflow-hidden">
        <div className="border-b border-outline-variant bg-slate-50 p-5">
          <h2 className="text-lg font-bold text-slate-800">Restriction Access Log</h2>
          <p className="text-sm text-slate-500">
            Request from doctors or users to restrict specific properties of your profile.
          </p>
        </div>

        {restrictions.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            No restriction access logs found for your profile.
          </div>
        ) : (
          <div className="divide-y divide-outline-variant">
            {restrictions.map((req) => (
              <div key={req.id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-800">
                      {req.accessorName || "Unknown User"}
                    </span>
                    <span className="text-xs text-slate-400">({req.accessorId})</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-500">
                    Requested restriction on attributes:{" "}
                    <span className="font-semibold text-primary">
                      {req.restrictedAttributes
                        ? JSON.parse(req.restrictedAttributes).join(", ")
                        : "None selected"}
                    </span>
                  </p>
                  <p className="mt-0.5 text-xs text-slate-400">
                    Requested at: {new Date(req.requestedAt).toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-center">
                  {req.status === "PENDING" && (
                    <>
                      <AppButton
                        onClick={() => openApproveModal(req.id)}
                        disabled={actioningId !== null}
                        className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-1.5 px-4 py-2 text-xs rounded-xl"
                      >
                        <Check size={14} /> Approve
                      </AppButton>
                      <AppButton
                        onClick={() => handleReject(req.id)}
                        disabled={actioningId !== null}
                        className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-1.5 px-4 py-2 text-xs rounded-xl"
                      >
                        <X size={14} /> Reject
                      </AppButton>
                    </>
                  )}

                  {req.status === "APPROVED" && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-3 py-1.5 rounded-full">
                      <ShieldCheck size={14} /> Approved
                    </span>
                  )}

                  {req.status === "REJECTED" && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 bg-red-50 border border-red-200 px-3 py-1.5 rounded-full">
                      <ShieldAlert size={14} /> Rejected
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Approve Modal */}
      {isApproveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-3xl border border-outline-variant bg-white p-6 shadow-xl animate-in fade-in zoom-in duration-200">
            <h3 className="text-lg font-bold text-slate-800">Select Attributes to Restrict</h3>
            <p className="mt-1 text-sm text-slate-500">
              Only selected attributes will be restricted (hidden) from the accessor.
            </p>

            <div className="my-4 grid gap-3">
              {attributesList.map((attr) => (
                <label
                  key={attr.key}
                  className="flex items-center justify-between rounded-2xl border border-outline-variant p-3.5 hover:bg-slate-55 cursor-pointer transition"
                >
                  <span className="text-sm font-semibold text-slate-700">{attr.label}</span>
                  <input
                    type="checkbox"
                    checked={selectedAttributes.includes(attr.key)}
                    onChange={() => toggleAttribute(attr.key)}
                    className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                </label>
              ))}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <AppButton variant="secondary" onClick={() => setIsApproveModalOpen(false)}>
                Cancel
              </AppButton>
              <AppButton onClick={handleApproveSubmit} loading={actioningId !== null}>
                Confirm Approval
              </AppButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientSettings;