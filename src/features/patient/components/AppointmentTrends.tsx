const AppointmentTrends = () => {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="mb-6 text-xl font-semibold text-slate-900">Appointment Trends</h3>

      <div className="flex h-48 items-end justify-between gap-2 px-2">
        <div className="h-[40%] w-full rounded-t bg-blue-100" />
        <div className="h-[60%] w-full rounded-t bg-blue-100" />
        <div className="h-[30%] w-full rounded-t bg-blue-100" />
        <div className="h-[80%] w-full rounded-t bg-blue-600" />
        <div className="h-[50%] w-full rounded-t bg-blue-100" />
        <div className="h-[70%] w-full rounded-t bg-blue-100" />
      </div>

      <div className="mt-3 flex justify-between px-2 text-[10px] font-bold uppercase tracking-wide text-slate-400">
        <span>Jan</span>
        <span>Feb</span>
        <span>Mar</span>
        <span>Apr</span>
        <span>May</span>
        <span>Jun</span>
      </div>
    </section>
  );
};

export default AppointmentTrends;