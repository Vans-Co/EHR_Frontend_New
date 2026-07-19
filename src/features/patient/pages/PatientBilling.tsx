import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { listAppointmentsByPatient } from "../services/patientApi";
import { formatDisplayDate } from "@/lib/dateUtils";
import { CreditCard, Receipt, ShieldCheck, Landmark } from "lucide-react";

const PatientBilling = () => {
  const { user } = useAuthStore();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalBilled, setTotalBilled] = useState(0);

  useEffect(() => {
    if (user?.ehrId) {
      loadBilling();
    }
  }, [user?.ehrId]);

  const loadBilling = async () => {
    try {
      setLoading(true);
      const appts = await listAppointmentsByPatient(String(user?.ehrId));
      setAppointments(appts);
      const total = appts.reduce((sum: number, a: any) => sum + (a.charge || 0), 0);
      setTotalBilled(total);
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
        <h1 className="text-2xl font-bold text-slate-800">Billing & Invoices</h1>
        <p className="text-sm text-slate-500">Track your consultation invoices, insurance claims, and payments.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        {/* KPI Cards */}
        <div className="rounded-3xl border border-outline-variant bg-white p-5 shadow-sm flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <CreditCard size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase">Total Billed</p>
            <h3 className="text-2xl font-bold text-slate-800">₹{totalBilled}</h3>
          </div>
        </div>

        <div className="rounded-3xl border border-outline-variant bg-white p-5 shadow-sm flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-600 border border-green-200">
            <ShieldCheck size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase">Insurance Provider</p>
            <h3 className="text-xl font-bold text-slate-800">Aetna India</h3>
          </div>
        </div>

        <div className="rounded-3xl border border-outline-variant bg-white p-5 shadow-sm flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 border border-amber-200">
            <Receipt size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase">Claim Status</p>
            <h3 className="text-xl font-bold text-amber-700">Pre-Approved</h3>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-outline-variant bg-white shadow-sm overflow-hidden">
        <div className="border-b border-outline-variant bg-slate-50 p-5">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Landmark size={18} className="text-primary" /> Invoice Ledger
          </h2>
          <p className="text-sm text-slate-500">Breakdown of appointments and associated costs.</p>
        </div>

        {appointments.length === 0 ? (
          <div className="p-8 text-center text-slate-500">No transactions recorded.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-outline-variant text-sm font-semibold text-slate-700">
                  <th className="p-4">Transaction ID</th>
                  <th className="p-4">Description</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Payment Method</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant text-sm text-slate-600">
                {appointments.map((appt) => (
                  <tr key={appt.token} className="hover:bg-slate-55 transition">
                    <td className="p-4 font-semibold text-slate-800">#TXN-{appt.token}</td>
                    <td className="p-4">Consultation with Doctor</td>
                    <td className="p-4">{formatDisplayDate(appt.date)}</td>
                    <td className="p-4">Insurance Co-Pay</td>
                    <td className="p-4 font-bold text-slate-800">₹{appt.charge}</td>
                    <td className="p-4">
                      <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200">
                        Paid
                      </span>
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

export default PatientBilling;
