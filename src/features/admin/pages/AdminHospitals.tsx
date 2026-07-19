import { Hospital, MapPin, Phone } from "lucide-react";

const AdminHospitals = () => {
  return (
    <div className="space-y-6 max-w-xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Hospital Configuration</h1>
        <p className="text-sm text-slate-500">Configure public clinic metadata and contact numbers.</p>
      </div>

      <div className="rounded-3xl border border-outline-variant bg-white p-6 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
          <Hospital className="text-primary" /> Vans Healthcare Center
        </h2>

        <div className="space-y-3 text-sm text-slate-600">
          <div>
            <span className="font-semibold text-slate-400">Clinic Name</span>
            <p className="font-bold text-slate-800">Vans Speciality Clinic & Diagnostic Center</p>
          </div>

          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-primary" />
            <p>102, Healthcare Plaza, Sector 15, Dwarka, Delhi - 110075</p>
          </div>

          <div className="flex items-center gap-2">
            <Phone size={16} className="text-primary" />
            <p>+91 99999-88888, 011-25539922</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHospitals;
