import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { updateDoctorPassword } from "../services/doctorApi";
import AppButton from "@/components/common/AppButton";
import AppInput from "@/components/common/AppInput";
import { Lock, ShieldAlert } from "lucide-react";

const DoctorSettings = () => {
  const { user } = useAuthStore();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!password) {
      setError("Password cannot be empty.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      await updateDoctorPassword(String(user?.ehrId), {
        password,
      });
      setSuccess("Password updated successfully!");
      setPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to update password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="rounded-3xl border border-outline-variant bg-white p-6 shadow-sm">
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Lock className="text-primary" /> Credentials Settings
        </h1>
        <p className="mt-1 text-xs text-slate-500">Configure your doctor account credentials.</p>

        {error && (
          <div className="mt-4 flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-600 text-sm font-semibold">
            <ShieldAlert size={16} />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mt-4 rounded-2xl border border-green-200 bg-green-50 p-4 text-green-700 text-sm font-semibold">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <AppInput
            label="New Password"
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <AppInput
            label="Confirm New Password"
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <div className="flex justify-end pt-2">
            <AppButton type="submit" loading={loading} className="w-full">
              Update Password
            </AppButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorSettings;
