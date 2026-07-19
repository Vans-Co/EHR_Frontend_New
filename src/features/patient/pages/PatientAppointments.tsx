import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import {
  listAppointmentsByPatient,
  createAppointment,
  rescheduleAppointment,
  cancelAppointment,
} from "../services/patientApi";
import { getAllDoctors } from "../../admin/services/adminApi";
import AppButton from "@/components/common/AppButton";
import AppInput from "@/components/common/AppInput";
import AppSelect from "@/components/common/AppSelect";
import StatusBadge from "@/components/common/StatusBadge";
import { toBackendDate, toFrontendDate, formatDisplayDate } from "@/lib/dateUtils";
import { CalendarDays, Clock, DollarSign, Plus, User, FileText, CheckCircle, XCircle } from "lucide-react";

interface Appointment {
  token: number;
  patientId: string;
  doctorId: string;
  doctorName?: string;
  date: string;
  startTime: string;
  lastTime: string;
  charge: number;
  status: "SCHEDULED" | "CANCELLED" | "COMPLETED" | "ON_HOLD";
  total_seat: number;
  available_seat: number;
}

const PatientAppointments = () => {
  const { user } = useAuthStore();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Booking Modal
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [bookSubmitting, setBookSubmitting] = useState(false);
  const [bookData, setBookData] = useState({
    doctorId: "",
    date: "",
    startTime: "",
    lastTime: "",
    charge: "500",
  });

  // Reschedule Modal
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
  const [rescheduleSubmitting, setRescheduleSubmitting] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [rescheduleData, setRescheduleData] = useState({
    date: "",
    startTime: "",
    lastTime: "",
  });

  useEffect(() => {
    if (user?.ehrId) {
      fetchData();
    }
  }, [user?.ehrId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const appts = await listAppointmentsByPatient(String(user?.ehrId));
      const docs = await getAllDoctors();
      setAppointments(appts);
      setDoctors(docs);
    } catch (err) {
      setError("Failed to load appointments.");
    } finally {
      setLoading(false);
    }
  };

  const handleBookSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookData.doctorId || !bookData.date || !bookData.startTime || !bookData.lastTime) {
      setError("Please fill all booking fields.");
      return;
    }

    try {
      setBookSubmitting(true);
      setError("");
      setSuccess("");
      await createAppointment({
        patientId: String(user?.ehrId),
        doctorId: bookData.doctorId,
        date: toBackendDate(bookData.date),
        startTime: bookData.startTime + ":00", // pad with seconds for LocalTime
        lastTime: bookData.lastTime + ":00",
        charge: Number(bookData.charge),
        total_seat: 1,
        available_seat: 0,
        status: "SCHEDULED",
      });
      setSuccess("Appointment booked successfully!");
      setIsBookModalOpen(false);
      // reset form
      setBookData({
        doctorId: "",
        date: "",
        startTime: "",
        lastTime: "",
        charge: "500",
      });
      // refresh
      const appts = await listAppointmentsByPatient(String(user?.ehrId));
      setAppointments(appts);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to book appointment.");
    } finally {
      setBookSubmitting(false);
    }
  };

  const openReschedule = (appt: Appointment) => {
    setSelectedAppointment(appt);
    setRescheduleData({
      date: toFrontendDate(appt.date),
      startTime: appt.startTime.substring(0, 5),
      lastTime: appt.lastTime.substring(0, 5),
    });
    setIsRescheduleModalOpen(true);
  };

  const handleRescheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAppointment) return;

    try {
      setRescheduleSubmitting(true);
      setError("");
      setSuccess("");
      await rescheduleAppointment(selectedAppointment.token, {
        patientId: String(user?.ehrId),
        doctorId: selectedAppointment.doctorId,
        date: toBackendDate(rescheduleData.date),
        startTime: rescheduleData.startTime + ":00",
        lastTime: rescheduleData.lastTime + ":00",
        charge: selectedAppointment.charge,
        status: selectedAppointment.status,
      });
      setSuccess("Appointment rescheduled successfully!");
      setIsRescheduleModalOpen(false);
      // refresh
      const appts = await listAppointmentsByPatient(String(user?.ehrId));
      setAppointments(appts);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to reschedule.");
    } finally {
      setRescheduleSubmitting(false);
    }
  };

  const handleCancel = async (id: number) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;
    try {
      setError("");
      setSuccess("");
      await cancelAppointment(id);
      setSuccess("Appointment cancelled successfully!");
      const appts = await listAppointmentsByPatient(String(user?.ehrId));
      setAppointments(appts);
    } catch (err: any) {
      setError("Failed to cancel appointment.");
    }
  };

  const getDoctorName = (docId: string) => {
    const doc = doctors.find((d) => d.id === docId);
    if (doc?.user) {
      return `Dr. ${doc.user.firstName} ${doc.user.lastName}`;
    }
    return docId;
  };

  const doctorOptions = doctors.map((d) => ({
    label: `Dr. ${d.user?.firstName} ${d.user?.lastName} (${d.doctorProfile?.specialization || "General"})`,
    value: d.id,
  }));

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
          <h1 className="text-2xl font-bold text-slate-800">My Appointments</h1>
          <p className="text-sm text-slate-500">Book, reschedule, or cancel your clinic consultations.</p>
        </div>
        <AppButton onClick={() => setIsBookModalOpen(true)} className="flex items-center gap-1.5 self-start">
          <Plus size={18} /> Book Appointment
        </AppButton>
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
          <div className="p-8 text-center text-slate-500">
            No appointments booked yet. Click "Book Appointment" to schedule one.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-outline-variant text-sm font-semibold text-slate-700">
                  <th className="p-4">Appointment ID</th>
                  <th className="p-4">Doctor</th>
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
                    <td className="p-4 flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-primary">
                        <User size={14} />
                      </div>
                      {getDoctorName(appt.doctorId)}
                    </td>
                    <td className="p-4 font-semibold text-slate-800">{formatDisplayDate(appt.date)}</td>
                    <td className="p-4 text-slate-500 font-medium">
                      {appt.startTime.substring(0, 5)} - {appt.lastTime.substring(0, 5)}
                    </td>
                    <td className="p-4 font-semibold text-slate-800">₹{appt.charge}</td>
                    <td className="p-4">
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-bold ${
                          appt.status === "SCHEDULED"
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : appt.status === "COMPLETED"
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : appt.status === "CANCELLED"
                            ? "bg-red-50 text-red-700 border border-red-200"
                            : "bg-slate-50 text-slate-700 border border-slate-200"
                        }`}
                      >
                        {appt.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      {appt.status === "SCHEDULED" && (
                        <>
                          <AppButton
                            variant="secondary"
                            onClick={() => openReschedule(appt)}
                            className="px-3 py-1.5 text-xs rounded-xl"
                          >
                            Reschedule
                          </AppButton>
                          <AppButton
                            onClick={() => handleCancel(appt.token)}
                            className="bg-red-55 hover:bg-red-100 text-red-600 px-3 py-1.5 text-xs rounded-xl border border-red-200"
                          >
                            Cancel
                          </AppButton>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Book Appointment Modal */}
      {isBookModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-3xl border border-outline-variant bg-white p-6 shadow-xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-outline-variant pb-3 mb-4">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-1.5">
                <CalendarDays className="text-primary" /> Book Consultation
              </h3>
              <button onClick={() => setIsBookModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <XCircle size={20} />
              </button>
            </div>

            <form onSubmit={handleBookSubmit} className="space-y-4">
              <AppSelect
                label="Choose Doctor"
                value={bookData.doctorId}
                onChange={(e) => setBookData({ ...bookData, doctorId: e.target.value })}
                options={[{ label: "Select Doctor", value: "" }, ...doctorOptions]}
                required
              />

              <AppInput
                label="Consultation Date"
                type="date"
                value={bookData.date}
                onChange={(e) => setBookData({ ...bookData, date: e.target.value })}
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <AppInput
                  label="Start Time"
                  type="time"
                  value={bookData.startTime}
                  onChange={(e) => setBookData({ ...bookData, startTime: e.target.value })}
                  required
                />
                <AppInput
                  label="End Time"
                  type="time"
                  value={bookData.lastTime}
                  onChange={(e) => setBookData({ ...bookData, lastTime: e.target.value })}
                  required
                />
              </div>

              <AppInput
                label="Consultation Charge (₹)"
                type="number"
                value={bookData.charge}
                onChange={(e) => setBookData({ ...bookData, charge: e.target.value })}
                leftIcon={<DollarSign size={16} />}
                required
              />

              <div className="flex justify-end gap-3 pt-4">
                <AppButton variant="secondary" onClick={() => setIsBookModalOpen(false)}>
                  Cancel
                </AppButton>
                <AppButton type="submit" loading={bookSubmitting}>
                  Book Now
                </AppButton>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {isRescheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-3xl border border-outline-variant bg-white p-6 shadow-xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-outline-variant pb-3 mb-4">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-1.5">
                <Clock className="text-primary" /> Reschedule Appointment
              </h3>
              <button onClick={() => setIsRescheduleModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <XCircle size={20} />
              </button>
            </div>

            <form onSubmit={handleRescheduleSubmit} className="space-y-4">
              <AppInput
                label="New Consultation Date"
                type="date"
                value={rescheduleData.date}
                onChange={(e) => setRescheduleData({ ...rescheduleData, date: e.target.value })}
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <AppInput
                  label="New Start Time"
                  type="time"
                  value={rescheduleData.startTime}
                  onChange={(e) => setRescheduleData({ ...rescheduleData, startTime: e.target.value })}
                  required
                />
                <AppInput
                  label="New End Time"
                  type="time"
                  value={rescheduleData.lastTime}
                  onChange={(e) => setRescheduleData({ ...rescheduleData, lastTime: e.target.value })}
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <AppButton variant="secondary" onClick={() => setIsRescheduleModalOpen(false)}>
                  Cancel
                </AppButton>
                <AppButton type="submit" loading={rescheduleSubmitting}>
                  Save New Time
                </AppButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientAppointments;
