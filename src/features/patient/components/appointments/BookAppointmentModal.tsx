import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { Appointment } from "../../types/appointment.types";

type AppointmentForm = {
  doctor: string;
  department: string;
  date: string;
  time: string;
  reason: string;
};

type BookAppointmentModalProps = {
  open: boolean;
  onClose: () => void;

  // Create Appointment
  onBookAppointment: (data: AppointmentForm) => void;

  // Edit Appointment
  appointment?: Appointment | null;
  onUpdateAppointment?: (
    id: number,
    data: AppointmentForm
  ) => void;
};

const initialForm: AppointmentForm = {
  doctor: "",
  department: "",
  date: "",
  time: "",
  reason: "",
};

const BookAppointmentModal = ({
  open,
  onClose,
  onBookAppointment,
  appointment,
  onUpdateAppointment,
}: BookAppointmentModalProps) => {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (!open) return;

    if (appointment) {
      setForm({
      doctor: appointment.doctor,
       department: appointment.department,
       date: appointment.rawDate,
       time: appointment.rawTime,
       reason: appointment.reason ?? "",
});
    } else {
      setForm(initialForm);
    }
  }, [appointment, open]);

  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (appointment && onUpdateAppointment) {
      onUpdateAppointment(appointment.id, form);
    } else {
      onBookAppointment(form);
    }

    setForm(initialForm);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h2 className="text-xl font-semibold">
            {appointment ? "Reschedule Appointment" : "Book Appointment"}
          </h2>

          <button
            onClick={onClose}
            className="rounded-md p-2 hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >
          <div>
            <label className="mb-2 block text-sm font-medium">
              Doctor
            </label>

            <input
              name="doctor"
              value={form.doctor}
              onChange={handleChange}
              placeholder="Enter doctor's name"
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Department
            </label>

            <select
              name="department"
              value={form.department}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500"
            >
              <option value="">Select Department</option>
              <option>Cardiology</option>
              <option>Orthopedic</option>
              <option>Neurology</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Date
              </label>

              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Time
              </label>

              <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Reason
            </label>

            <textarea
              rows={4}
              name="reason"
              value={form.reason}
              onChange={handleChange}
              placeholder="Describe your symptoms..."
              className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-5 py-2 hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
            >
              {appointment ? "Save Changes" : "Book Appointment"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default BookAppointmentModal;