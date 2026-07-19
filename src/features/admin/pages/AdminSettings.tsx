import { Settings, Shield, User } from "lucide-react";

const AdminSettings = () => {
  return (
    <div className="space-y-6 max-w-xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Admin Settings</h1>
        <p className="text-sm text-slate-500">Configure global platform roles, policies, and clinic information.</p>
      </div>

      <div className="rounded-3xl border border-outline-variant bg-white p-6 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
          <Shield className="text-primary" /> Security Policies
        </h2>

        <div className="space-y-2.5 text-sm text-slate-600">
          <div className="flex justify-between items-center bg-slate-50 border border-slate-100 p-4 rounded-2xl">
            <div>
              <p className="font-semibold text-slate-800">Multi-Factor Authentication (MFA)</p>
              <p className="text-xs text-slate-500">Enforce MFA validation for administrative profiles.</p>
            </div>
            <span className="text-xs font-bold text-slate-400">Disabled</span>
          </div>

          <div className="flex justify-between items-center bg-slate-50 border border-slate-100 p-4 rounded-2xl">
            <div>
              <p className="font-semibold text-slate-800">API Access Restrictions</p>
              <p className="text-xs text-slate-500">Restrict access to registered clinic doctor clients only.</p>
            </div>
            <span className="text-xs font-bold text-primary">Enabled</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
