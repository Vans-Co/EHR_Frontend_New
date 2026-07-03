import { PlusCircle } from "lucide-react";

type AppointmentHeaderProps = {
  onBookAppointment: () => void;
};

const AppointmentHeader = ({
  onBookAppointment,
}: AppointmentHeaderProps) => {
  return (
    <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          My Appointments
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          View, manage and schedule your healthcare appointments.
        </p>
      </div>

      <button
        onClick={onBookAppointment}
        className="flex items-center gap-2 rounded-lg bg-black px-5 py-2 text-sm font-medium text-white hover:opacity-90"
      >
        <PlusCircle className="h-4 w-4" />
        Book Appointment
      </button>
    </section>
  );
};

export default AppointmentHeader;