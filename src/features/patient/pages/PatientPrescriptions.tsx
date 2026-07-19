import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { getActiveMedications } from "../services/patientApi";
import { getAllDoctors } from "../../admin/services/adminApi";
import { formatDisplayDate } from "@/lib/dateUtils";
import { FileText, Clock, User, HeartPulse, HelpCircle } from "lucide-react";

const PatientPrescriptions = () => {
  const { user } = useAuthStore();
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user?.ehrId) {
      loadPrescriptions();
    }
  }, [user?.ehrId]);

  const loadPrescriptions = async () => {
    try {
      setLoading(true);
      const res = await getActiveMedications(String(user?.ehrId));
      const docs = await getAllDoctors();
      setPrescriptions(res.content || []);
      setDoctors(docs);
    } catch (err) {
      setError("Failed to load active prescriptions.");
    } finally {
      setLoading(false);
    }
  };

  const getDoctorName = (docId: string) => {
    const doc = doctors.find((d) => d.id === docId);
    if (doc?.user) {
      return `Dr. ${doc.user.firstName} ${doc.user.lastName}`;
    }
    return docId;
  };

  const formatShiftName = (shift: string) => {
    if (!shift) return "";
    return shift
      .replace("MORNING_", "Morning - ")
      .replace("EVENING_", "Evening - ")
      .replace("NIGHT_", "Night - ")
      .replace("BeforeFood", "Before Food 🍽️")
      .replace("AfterFood", "After Food 🍲");
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
        <h1 className="text-2xl font-bold text-slate-800">Active Prescriptions</h1>
        <p className="text-sm text-slate-500">Your current ongoing medications, dosages, and schedules.</p>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-600 text-sm font-semibold">
          {error}
        </div>
      )}

      {prescriptions.length === 0 ? (
        <div className="rounded-3xl border border-outline-variant bg-white p-8 text-center text-slate-500">
          No active prescriptions found.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {prescriptions.map((p) => (
            <div key={p.id} className="rounded-3xl border border-outline-variant bg-white p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-bold text-slate-800 flex items-center gap-1.5">
                      <FileText size={18} className="text-primary" /> Prescription #{p.id}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">Prescribed On: {formatDisplayDate(p.prescribedOn)}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-primary font-bold bg-primary/10 px-3 py-1 rounded-full">
                    <User size={12} /> {getDoctorName(p.prescribedBy?.id)}
                  </div>
                </div>

                <div className="mt-4 space-y-4">
                  {p.details?.map((med: any, idx: number) => (
                    <div key={idx} className="rounded-2xl border border-slate-100 p-4 bg-slate-50 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800 flex items-center gap-1.5">
                          <HeartPulse size={16} className="text-red-500" /> {med.medicineName}
                        </span>
                        <span className="text-xs text-slate-500 font-semibold">{med.dosageMg} mg</span>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                        <span className="flex items-center gap-1 font-semibold text-slate-700">
                          <Clock size={12} className="text-primary" /> {formatShiftName(med.shift)}
                        </span>
                        <span>•</span>
                        <span>Tenure: <span className="font-semibold text-slate-700">{med.tenure} days</span></span>
                      </div>

                      {med.notes && (
                        <p className="text-xs text-slate-500 mt-2 bg-white p-2 rounded-xl border border-slate-100 italic">
                          Notes: {med.notes}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {p.diet && (
                <div className="mt-6 rounded-2xl border border-outline-variant bg-green-50/50 p-4 border-l-4 border-l-green-500">
                  <h4 className="text-xs font-bold text-green-800 uppercase tracking-wider">Associated Diet instruction</h4>
                  <h5 className="font-bold text-slate-800 mt-1">{p.diet.name_of_diet}</h5>
                  <p className="text-xs text-slate-600 mt-0.5">{p.diet.food_description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientPrescriptions;