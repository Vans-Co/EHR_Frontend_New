import { useState } from "react";
import { listAppointmentsByPatient } from "../../patient/services/patientApi";
import { formatDisplayDate } from "@/lib/dateUtils";
import AppButton from "@/components/common/AppButton";
import AppInput from "@/components/common/AppInput";
import { Search, Receipt, DollarSign } from "lucide-react";

const AdminBilling = () => {
  const [patientId, setPatientId] = useState("");
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalRevenue, setTotalRevenue] = useState(0);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientId) return;

    try {
      setLoading(true);
      setError("");
      const list = await listAppointmentsByPatient(patientId);
      setAppointments(list);
      const total = list.reduce((sum: number, a: any) => sum + (a.charge || 0), 0);
      setTotalRevenue(total);
    } catch (err) {
      setError("Failed to fetch billing reports. Check that the Patient ID is valid.");
      setAppointments([]);
      setTotalRevenue(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">System Billing Ledger</h1>
        <p className="text-sm text-slate-500">Query invoice receipts and total payments by Patient EHR ID.</p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-3 max-w-xl">
        <AppInput
          placeholder="Enter Patient EHR ID (e.g. USR-1001)..."
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          leftIcon={<Search size={18} />}
          className="flex-1"
          required
        />
        <AppButton type="submit" loading={loading} className="px-6 h-14 rounded-2xl">
          Query Invoices
        </AppButton>
      </form>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-600 text-sm font-semibold">
          {error}
        </div>
      )}

      {appointments.length > 0 && (
        <div className="rounded-3xl border border-outline-variant bg-white p-5 shadow-sm flex items-center gap-4 max-w-xs">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-600 border border-green-200">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase">Total Paid Consultations</p>
            <h3 className="text-2xl font-bold text-slate-800">₹{totalRevenue}</h3>
          </div>
        </div>
      )}

      <div className="rounded-3xl border border-outline-variant bg-white shadow-sm overflow-hidden">
        {appointments.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            {patientId ? "No billing statements found." : "Search by Patient ID above."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-outline-variant text-sm font-semibold text-slate-700">
                  <th className="p-4">Invoice ID</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Description</th>
                  <th className="p-4">TPA / Insurance Method</th>
                  <th className="p-4">Paid Amount</th>
                  <th className="p-4">Invoice Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant text-sm text-slate-600">
                {appointments.map((appt) => (
                  <tr key={appt.token} className="hover:bg-slate-55 transition">
                    <td className="p-4 font-semibold text-slate-800">#INV-92{appt.token}</td>
                    <td className="p-4">{formatDisplayDate(appt.date)}</td>
                    <td className="p-4 flex items-center gap-2">
                      <Receipt size={14} className="text-slate-400" /> Clinic Consultation Fee
                    </td>
                    <td className="p-4">Insurance Co-Pay</td>
                    <td className="p-4 font-bold text-slate-800">₹{appt.charge}</td>
                    <td className="p-4">
                      <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200">
                        Settled
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

export default AdminBilling;
