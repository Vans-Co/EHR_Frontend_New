import { useState } from "react";
import { listAppointmentsByPatient } from "../../patient/services/patientApi";
import { deleteAppointment } from "../services/adminApi";
import { formatDisplayDate } from "@/lib/dateUtils";
import AppButton from "@/components/common/AppButton";
import AppInput from "@/components/common/AppInput";
import { Search, Calendar, Trash2 } from "lucide-react";

const AdminAppointments = () => {
  const [userId, setUserId] = useState("");
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    try {
      setLoading(true);
      setError("");
      setSuccess("");
      const list = await listAppointmentsByPatient(userId);
      setAppointments(list);
    } catch (err) {
      setError("Failed to fetch appointments. Ensure the Patient/Doctor ID exists.");
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to permanently delete this appointment from the database?")) return;
    try {
      setError("");
      setSuccess("");
      await deleteAppointment(id);
      setSuccess(`Appointment #${id} deleted successfully.`);
      // refresh
      const list = await listAppointmentsByPatient(userId);
      setAppointments(list);
    } catch (err) {
      setError("Failed to delete appointment.");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">System Appointments Registry</h1>
        <p className="text-sm text-slate-500">Query and manage appointments by Patient or Doctor EHR ID.</p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-3 max-w-xl">
        <AppInput
          placeholder="Enter Patient or Doctor EHR ID (e.g. USR-1002)..."
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          leftIcon={<Search size={18} />}
          className="flex-1"
          required
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
        {appointments.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            {userId ? "No appointments found for this user." : "Search by Patient/Doctor ID above."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-outline-variant text-sm font-semibold text-slate-700">
                  <th className="p-4">Appointment ID</th>
                  <th className="p-4">Patient EHR</th>
                  <th className="p-4">Doctor EHR</th>
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
                    <td className="p-4">{appt.patientId}</td>
                    <td className="p-4">{appt.doctorId}</td>
                    <td className="p-4 font-semibold text-slate-800">{formatDisplayDate(appt.date)}</td>
                    <td className="p-4 text-slate-500 font-medium">
                      {appt.startTime.substring(0, 5)} - {appt.lastTime.substring(0, 5)}
                    </td>
                    <td className="p-4 font-bold text-slate-800">₹{appt.charge}</td>
                    <td className="p-4">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-xs font-bold border ${
                          appt.status === "SCHEDULED"
                            ? "bg-blue-55 text-blue-700 border-blue-200"
                            : appt.status === "COMPLETED"
                            ? "bg-green-55 text-green-700 border-green-200"
                            : "bg-red-50 text-red-700 border-red-200"
                        }`}
                      >
                        {appt.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <AppButton
                        onClick={() => handleDelete(appt.token)}
                        className="bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 text-xs px-3 py-1.5 rounded-xl"
                      >
                        Delete
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

export default AdminAppointments;
