import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { listAppointmentsByPatient, cancelAppointment } from "../../patient/services/patientApi";
import { deleteAppointment } from "../../admin/services/adminApi";
import { formatDisplayDate } from "@/lib/dateUtils";
import AppButton from "@/components/common/AppButton";
import StatusBadge from "@/components/common/StatusBadge";
import { CalendarDays, Clock, ShieldAlert, Trash2, XCircle } from "lucide-react";
import { Link } from "react-router-dom";

const DoctorAppointments = () => {
  const { user } = useAuthStore();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (user?.ehrId) {
      loadAppointments();
    }
  }, [user?.ehrId]);

  const loadAppointments = async () => {
    try {
      setLoading(true);
      const data = await listAppointmentsByPatient(String(user?.ehrId));
      setAppointments(data);
    } catch (err) {
      setError("Failed to load appointments.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id: number) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;
    try {
      setError("");
      setSuccess("");
      await cancelAppointment(id);
      setSuccess("Appointment cancelled successfully!");
      loadAppointments();
    } catch (err) {
      setError("Failed to cancel appointment.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this appointment?")) return;
    try {
      setError("");
      setSuccess("");
      await deleteAppointment(id);
      setSuccess("Appointment deleted from database.");
      loadAppointments();
    } catch (err) {
      setError("Failed to delete appointment.");
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "SCHEDULED":
        return "bg-blue-50 text-blue-700 border border-blue-250";
      case "COMPLETED":
        return "bg-green-50 text-green-700 border border-green-250";
      case "CANCELLED":
        return "bg-red-50 text-red-700 border border-red-250";
      default:
        return "bg-slate-50 text-slate-700 border border-slate-200";
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Assigned Consultations</h1>
          <p className="text-sm text-slate-500">Track and manage patient appointment statuses.</p>
        </div>
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
        {appointments.length === 0 ? (
          <div className="p-8 text-center text-slate-500">No appointments scheduled for you.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-outline-variant text-sm font-semibold text-slate-700">
                  <th className="p-4">Appointment ID</th>
                  <th className="p-4">Patient EHR ID</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Time</th>
                  <th className="p-4">Charge</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant text-sm text-slate-600">
                {appointments.map((appt) => (
                  <tr key={appt.token} className="hover:bg-slate-55 transition">
                    <td className="p-4 font-semibold text-slate-800">#{appt.token}</td>
                    <td className="p-4 font-semibold text-slate-700">
                      <Link
                        to={`/doctor/medical-records?patientId=${appt.patientId}`}
                        className="text-primary hover:underline"
                      >
                        {appt.patientId}
                      </Link>
                    </td>
                    <td className="p-4 font-semibold text-slate-800">{formatDisplayDate(appt.date)}</td>
                    <td className="p-4 text-slate-500">
                      {appt.startTime.substring(0, 5)} - {appt.lastTime.substring(0, 5)}
                    </td>
                    <td className="p-4 font-semibold text-slate-800">₹{appt.charge}</td>
                    <td className="p-4">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-bold border ${getStatusClass(appt.status)}`}>
                        {appt.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      {appt.status === "SCHEDULED" && (
                        <AppButton
                          onClick={() => handleCancel(appt.token)}
                          className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs px-3 py-1.5 rounded-xl"
                        >
                          Cancel
                        </AppButton>
                      )}
                      <AppButton
                        onClick={() => handleDelete(appt.token)}
                        className="bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 text-xs p-2 rounded-xl"
                        title="Delete record"
                      >
                        <Trash2 size={14} />
                      </AppButton>
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

export default DoctorAppointments;
