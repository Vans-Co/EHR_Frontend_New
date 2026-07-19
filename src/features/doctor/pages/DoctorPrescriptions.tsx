import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { listAppointmentsByPatient } from "../../patient/services/patientApi";
import { formatDisplayDate } from "@/lib/dateUtils";
import { FileText, Clipboard, HeartPulse } from "lucide-react";
import { Link } from "react-router-dom";

const DoctorPrescriptions = () => {
  const { user } = useAuthStore();
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.ehrId) {
      loadPrescriptions();
    }
  }, [user?.ehrId]);

  const loadPrescriptions = async () => {
    try {
      setLoading(true);
      // Fetch doctor appointments/records
      const appts = await listAppointmentsByPatient(String(user?.ehrId));
      setRecords(appts);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Prescription Registry</h1>
        <p className="text-sm text-slate-500">History of prescriptions issued from your doctor account.</p>
      </div>

      <div className="rounded-3xl border border-outline-variant bg-white shadow-sm overflow-hidden">
        {records.length === 0 ? (
          <div className="p-8 text-center text-slate-500">No prescriptions found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-outline-variant text-sm font-semibold text-slate-700">
                  <th className="p-4">Appointment ID</th>
                  <th className="p-4">Patient EHR</th>
                  <th className="p-4">Consultation Date</th>
                  <th className="p-4">Prescription Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant text-sm text-slate-600">
                {records.map((appt) => (
                  <tr key={appt.token} className="hover:bg-slate-55 transition">
                    <td className="p-4 font-semibold text-slate-800">#{appt.token}</td>
                    <td className="p-4 font-semibold text-slate-700">{appt.patientId}</td>
                    <td className="p-4">{formatDisplayDate(appt.date)}</td>
                    <td className="p-4">
                      <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200">
                        Prescribed
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <Link to={`/doctor/medical-records?patientId=${appt.patientId}`}>
                        <span className="text-xs font-bold text-primary hover:underline">
                          View/Update
                        </span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorPrescriptions;
