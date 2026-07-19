import { ShieldCheck, Info, FileText, CheckCircle } from "lucide-react";

const PatientInsurance = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Health Insurance Details</h1>
        <p className="text-sm text-slate-500">Configure your third-party administrator (TPA) policy and check coverage metrics.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-outline-variant bg-white p-6 shadow-sm space-y-4 md:col-span-2">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
            <ShieldCheck className="text-primary" /> Active Policy Information
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 text-sm">
            <div>
              <p className="text-slate-400 font-semibold">TPA / Insurance Provider</p>
              <p className="font-bold text-slate-800 mt-0.5">Aetna India Healthcare</p>
            </div>
            <div>
              <p className="text-slate-400 font-semibold">Policy Name</p>
              <p className="font-bold text-slate-800 mt-0.5">Family Health Super-Secure Plus</p>
            </div>
            <div>
              <p className="text-slate-400 font-semibold">Policy Number</p>
              <p className="font-bold text-slate-800 mt-0.5">POL-99281-22A</p>
            </div>
            <div>
              <p className="text-slate-400 font-semibold">Corporate Sponsor</p>
              <p className="font-bold text-slate-800 mt-0.5">Vans Healthcare Corporate</p>
            </div>
            <div>
              <p className="text-slate-400 font-semibold">Sum Insured</p>
              <p className="font-bold text-slate-800 mt-0.5">₹10,00,000</p>
            </div>
            <div>
              <p className="text-slate-400 font-semibold">Coverage Start Date</p>
              <p className="font-bold text-slate-800 mt-0.5">01 Jan 2026</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-outline-variant bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Info className="text-primary" /> Quick Help
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Corporate insurance policies are pre-integrated into our billing platform. Present your EHR ID at the pharmacy or lab reception to invoke automatic co-pay deductions.
          </p>
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-xs font-semibold text-slate-600">
            Support Desk: 1800-440-2022
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-outline-variant bg-white shadow-sm overflow-hidden">
        <div className="border-b border-outline-variant bg-slate-50 p-5">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <FileText size={18} className="text-primary" /> Claim History
          </h2>
          <p className="text-sm text-slate-500">Record of insurance claims and co-pays processed on your profile.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-outline-variant text-sm font-semibold text-slate-700">
                <th className="p-4">Claim ID</th>
                <th className="p-4">Policy No</th>
                <th className="p-4">Description</th>
                <th className="p-4">Claim Amount</th>
                <th className="p-4">Approved Amount</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant text-sm text-slate-600">
              <tr className="hover:bg-slate-55 transition">
                <td className="p-4 font-semibold text-slate-800">CLM-8291</td>
                <td className="p-4">POL-99281-22A</td>
                <td className="p-4">Cardiology Consultation & ECG</td>
                <td className="p-4">₹1,500</td>
                <td className="p-4 font-bold text-slate-800">₹1,500</td>
                <td className="p-4">
                  <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200">
                    Approved
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientInsurance;
