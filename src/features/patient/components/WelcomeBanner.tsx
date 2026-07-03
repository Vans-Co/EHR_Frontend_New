import { PlusCircle, Download, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WelcomeBanner = () => {
  const navigate = useNavigate();

  return (
    
    <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Welcome back</h1>
        <p className="mt-1 text-sm text-slate-500">
          Your health journey at a glance. You have 2 upcoming consultations this week.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button onClick={() => navigate("/patient/appointments")}className="flex items-center gap-2 rounded-lg bg-black px-5 py-2 text-sm font-medium text-white hover:opacity-90">
          <PlusCircle className="h-4 w-4" />
          Book Appointment
        </button>
        <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-900 hover:bg-slate-100">
          <Download className="h-4 w-4" />
          Reports
        </button>
        <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-900 hover:bg-slate-100">
          <CreditCard className="h-4 w-4" />
          Pay Bill
        </button>
      </div>
    </section>
  );
};

export default WelcomeBanner;