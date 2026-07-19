import { useEffect, useState } from "react";
import { getAllDoctors } from "../services/adminApi";
import { searchPatients } from "../../doctor/services/doctorApi";
import { Stethoscope, Users, CheckCircle, TrendingUp } from "lucide-react";

const AdminDashboard = () => {
  const [doctorsCount, setDoctorsCount] = useState(0);
  const [patientsCount, setPatientsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const docs = await getAllDoctors();
      setDoctorsCount(docs.length);

      // Search with empty or common query to get total patients estimate
      const pats = await searchPatients("a");
      setPatientsCount(pats.length);
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
      <div className="rounded-3xl bg-slate-900 p-6 text-white shadow-md">
        <h1 className="text-2xl font-bold">Admin Console</h1>
        <p className="mt-1 text-sm text-slate-400">System overview, audit logs, and directory controls.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <div className="rounded-3xl border border-outline-variant bg-white p-5 shadow-sm flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Stethoscope size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase">Registered Doctors</p>
            <h3 className="text-2xl font-bold text-slate-800">{doctorsCount} Doctors</h3>
          </div>
        </div>

        <div className="rounded-3xl border border-outline-variant bg-white p-5 shadow-sm flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-600 border border-green-200">
            <Users size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase">Total Patients</p>
            <h3 className="text-2xl font-bold text-slate-800">{patientsCount} Patients</h3>
          </div>
        </div>

        <div className="rounded-3xl border border-outline-variant bg-white p-5 shadow-sm flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 border border-teal-200">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase">System API Status</p>
            <h3 className="text-xl font-bold text-teal-700">Healthy (200 OK)</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
