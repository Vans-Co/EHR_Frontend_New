import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { searchPatients, requestReportAccess } from "../services/doctorApi";
import AppButton from "@/components/common/AppButton";
import AppInput from "@/components/common/AppInput";
import { Search, User, ShieldAlert, CheckCircle, Eye } from "lucide-react";
import { Link } from "react-router-dom";

interface Patient {
  ehrId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: number;
  dob: string;
  gender: string;
}

const DoctorPatients = () => {
  const { user } = useAuthStore();
  const [query, setQuery] = useState("");
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);
  const [submittingId, setSubmittingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    try {
      setLoading(true);
      setError("");
      setSuccess("");
      const list = await searchPatients(query);
      setPatients(list);
    } catch (err) {
      setError("Failed to search patients.");
    } finally {
      setLoading(false);
    }
  };

  const handleRequestAccess = async (patientId: string) => {
    try {
      setSubmittingId(patientId);
      setError("");
      setSuccess("");
      await requestReportAccess({
        doctorId: String(user?.ehrId),
        patientId,
      });
      setSuccess(`Access request submitted successfully for patient ID ${patientId}!`);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to submit request.");
    } finally {
      setSubmittingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Search Patients</h1>
        <p className="text-sm text-slate-500">Find patient profiles and request report access permissions.</p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-3 max-w-xl">
        <AppInput
          placeholder="Enter patient name, email, or EHR ID..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          leftIcon={<Search size={18} />}
          className="flex-1"
        />
        <AppButton type="submit" loading={loading} className="px-6 h-14 rounded-2xl">
          Search
        </AppButton>
      </form>

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
        {patients.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            {query ? "No patients found matching your query." : "Search by name or ID above."}
          </div>
        ) : (
          <div className="divide-y divide-outline-variant">
            {patients.map((pat) => (
              <div key={pat.ehrId} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between hover:bg-slate-55 transition">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-primary">
                    <User size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">
                      {pat.firstName} {pat.lastName}
                    </h3>
                    <p className="text-xs text-slate-400">EHR ID: {pat.ehrId} | DOB: {pat.dob}</p>
                    <p className="text-xs text-slate-500 font-semibold mt-0.5">Phone: +91 {pat.phoneNo}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-center">
                  <AppButton
                    onClick={() => handleRequestAccess(pat.ehrId)}
                    disabled={submittingId !== null}
                    variant="secondary"
                    className="text-xs px-4 py-2 rounded-xl flex items-center gap-1.5"
                  >
                    Request Access
                  </AppButton>

                  <Link to={`/doctor/medical-records?patientId=${pat.ehrId}`}>
                    <AppButton className="text-xs px-4 py-2 rounded-xl flex items-center gap-1.5">
                      <Eye size={14} /> Open EHR
                    </AppButton>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorPatients;
