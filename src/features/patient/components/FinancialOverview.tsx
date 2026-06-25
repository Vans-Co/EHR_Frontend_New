const FinancialOverview = () => {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold text-slate-900">Financial Overview</h2>

      <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-sm font-semibold text-red-600">Unpaid Invoice</span>
          <span className="text-sm font-bold text-red-600">$145.00</span>
        </div>
        <p className="text-xs text-slate-500">Visit: May 12 • Cardiology Lab Work</p>
        <button className="mt-4 w-full rounded bg-red-600 py-2 text-sm font-medium text-white hover:bg-red-700">
          Pay Now
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-slate-200 py-3">
          <div>
            <p className="text-sm font-medium text-slate-900">Aetna Claim #8291</p>
            <p className="text-xs text-slate-400">Processed • May 14, 2024</p>
          </div>
          <span className="text-xs font-bold text-green-700">Approved</span>
        </div>

        <div className="flex items-center justify-between py-3">
          <div>
            <p className="text-sm font-medium text-slate-900">Pharmacy Co-pay</p>
            <p className="text-xs text-slate-400">Paid • May 05, 2024</p>
          </div>
          <span className="text-xs font-bold text-slate-600">$15.00</span>
        </div>
      </div>
    </section>
  );
};

export default FinancialOverview;