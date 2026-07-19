import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { listAppointmentsByPatient, cancelAppointment } from "../../patient/services/patientApi";
import { getReportAccessRequestsForDoctor } from "../services/doctorApi";
import { formatDisplayDate } from "@/lib/dateUtils";
import AppButton from "@/components/common/AppButton";
import { Stethoscope, Calendar, Users, Eye, FileText, CheckCircle, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";

const DoctorDashboard = () => {
  const { user } = useAuthStore();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [accessRequests, setAccessRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user?.ehrId) {
      loadDashboard();
    }
  }, [user?.ehrId]);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const appts = await listAppointmentsByPatient(String(user?.ehrId), 0, 10);
      const reqs = await getReportAccessRequestsForDoctor(String(user?.ehrId));
      setAppointments(appts);
      setAccessRequests(reqs);
    } catch (err) {
      setError("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "SCHEDULED":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "COMPLETED":
        return "bg-green-50 text-green-700 border-green-200";
      case "CANCELLED":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
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
      {/* Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-primary to-primary-container p-6 text-white shadow-md">
        <h1 className="text-2xl font-bold">Welcome Back, Dr. {user?.firstName} {user?.lastName}</h1>
        <p className="mt-1 text-sm text-white/80">Manage your patient appointments, prescriptions, and medical files.</p>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-600 text-sm font-semibold">
          {error}
        </div>
      )}

      {/* KPI Stats */}
      <div className="grid gap-6 sm:grid-cols-3">
        <div className="rounded-3xl border border-outline-variant bg-white p-5 shadow-sm flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Calendar size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase">Consultations</p>
            <h3 className="text-2xl font-bold text-slate-800">
              {appointments.filter((a) => a.status === "SCHEDULED").length} Active
            </h3>
          </div>
        </div>

        <div className="rounded-3xl border border-outline-variant bg-white p-5 shadow-sm flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-600 border border-green-200">
            <Users size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase">Total Patients</p>
            <h3 className="text-2xl font-bold text-slate-800">
              {new Set(appointments.map((a) => a.patientId)).size} Patients
            </h3>
          </div>
        </div>

        <div className="rounded-3xl border border-outline-variant bg-white p-5 shadow-sm flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 border border-amber-200">
            <Eye size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase">File Access</p>
            <h3 className="text-2xl font-bold text-slate-800">
              {accessRequests.filter((r) => r.status === "APPROVED").length} Approved
            </h3>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Appointments Queue */}
        <div className="rounded-3xl border border-outline-variant bg-white shadow-sm overflow-hidden md:col-span-2">
          <div className="border-b border-outline-variant bg-slate-50 p-5 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Stethoscope size={18} className="text-primary" /> Today's Consultation Queue
              </h2>
            </div>
            <Link to="/doctor/appointments" className="text-sm font-semibold text-primary hover:underline">
              View All
            </Link>
          </div>

          {appointments.length === 0 ? (
            <div className="p-8 text-center text-slate-500">No scheduled consultations today.</div>
          ) : (
            <div className="divide-y divide-outline-variant">
              {appointments.map((appt) => (
                <div key={appt.token} className="p-5 flex items-center justify-between hover:bg-slate-55 transition">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-800">Patient EHR ID: {appt.patientId}</span>
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-bold border ${getStatusClass(appt.status)}`}>
                        {appt.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 mt-1">
                      Time: {appt.startTime.substring(0, 5)} - {appt.lastTime.substring(0, 5)} | {formatDisplayDate(appt.date)}
                    </p>
                  </div>
                  <Link to={`/doctor/medical-records?patientId=${appt.patientId}`}>
                    <AppButton className="text-xs px-3 py-1.5 rounded-xl">
                      Examine EHR
                    </AppButton>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Access Requests */}
        <div className="rounded-3xl border border-outline-variant bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Eye size={18} className="text-primary" /> Reports Access Status
          </h2>
          {accessRequests.length === 0 ? (
            <p className="text-sm text-slate-500 text-center py-6">No reports requested yet.</p>
          ) : (
            <div className="space-y-3">
              {accessRequests.map((req) => (
                <div key={req.id} className="p-3.5 rounded-2xl border border-outline-variant bg-slate-50 text-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-slate-800">Patient: {req.patientId}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">ID: #{req.id}</p>
                    </div>
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-xs font-bold border ${
                        req.status === "APPROVED"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : req.status === "PENDING"
                          ? "bg-amber-50 text-amber-700 border-amber-200"
                          : "bg-red-50 text-red-700 border-red-200"
                      }`}
                    >
                      {req.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;