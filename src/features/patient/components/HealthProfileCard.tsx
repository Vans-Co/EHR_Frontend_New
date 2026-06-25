import { FileText } from "lucide-react";

const HealthProfileCard = () => {
  return (
    <section className="relative overflow-hidden rounded-xl bg-blue-700 p-6 text-white">
      <div className="absolute right-4 top-2 opacity-10">
        <FileText className="h-40 w-40" />
      </div>

      <h2 className="mb-6 border-b border-white/20 pb-4 text-xl font-semibold">
        Personal Health Profile
      </h2>

      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
        <div>
          <p className="mb-1 text-xs uppercase tracking-wide text-blue-100">Blood Group</p>
          <p className="text-2xl font-semibold">O-Positive</p>
        </div>
        <div>
          <p className="mb-1 text-xs uppercase tracking-wide text-blue-100">Allergies</p>
          <p className="text-sm">Penicillin, Peanuts</p>
        </div>
        <div>
          <p className="mb-1 text-xs uppercase tracking-wide text-blue-100">Chronic Conditions</p>
          <p className="text-sm">Hypertension (Mild)</p>
        </div>
        <div>
          <p className="mb-1 text-xs uppercase tracking-wide text-blue-100">Current Meds</p>
          <p className="text-sm">Lisinopril 10mg</p>
        </div>
        <div>
          <p className="mb-1 text-xs uppercase tracking-wide text-blue-100">Primary Doctor</p>
          <p className="text-sm">Dr. Julian Vance</p>
        </div>
        <div>
          <p className="mb-1 text-xs uppercase tracking-wide text-blue-100">Last Consultation</p>
          <p className="text-sm">Oct 12, 2023</p>
        </div>
      </div>
    </section>
  );
};

export default HealthProfileCard;