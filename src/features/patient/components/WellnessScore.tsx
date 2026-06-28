const WellnessScore = () => {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="mb-6 text-xl font-semibold text-slate-900">Wellness Score</h3>

      <div className="relative flex h-48 items-center justify-center">
        <svg className="h-32 w-32 -rotate-90 transform" viewBox="0 0 36 36">
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="text-slate-200"
          />
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray="92, 100"
            strokeLinecap="round"
            className="text-blue-600"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-semibold text-slate-900">92</span>
          <span className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
            Optimal
          </span>
        </div>
      </div>
    </section>
  );
};

export default WellnessScore;