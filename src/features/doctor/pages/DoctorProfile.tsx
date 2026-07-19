import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import {
  getDoctorProfile,
  updateDoctorProfile,
  updateDoctorDegrees,
} from "../services/doctorApi";
import { qualifications, specialties } from "@/config/metadata";
import AppButton from "@/components/common/AppButton";
import AppInput from "@/components/common/AppInput";
import AppSelect from "@/components/common/AppSelect";
import { toFrontendDate } from "@/lib/dateUtils";
import { Stethoscope, Award, FileText, User, ShieldAlert, Plus, Trash } from "lucide-react";

const DoctorProfile = () => {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [doctorData, setDoctorData] = useState<any>(null);

  // Profile fields
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [aboutDoctor, setAboutDoctor] = useState("");
  const [degreesList, setDegreesList] = useState<string[]>([]);

  useEffect(() => {
    if (user?.ehrId) {
      fetchProfile();
    }
  }, [user?.ehrId]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await getDoctorProfile(String(user?.ehrId));
      setDoctorData(res);

      const profile = res.doctorProfile || {};
      setAadhaarNumber(profile.aadhaarNumber || "");
      setPanNumber(profile.panNumber || "");
      setSpecialization(profile.specialization || "");
      setLicenseNumber(profile.licenseNumber || "");
      setAboutDoctor(profile.aboutDoctor || "");
      setDegreesList(profile.degrees || []);
    } catch (err) {
      setError("Failed to load doctor profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (aadhaarNumber && !/^\d{12}$/.test(aadhaarNumber)) {
      setError("Aadhaar Number must be exactly 12 digits.");
      return;
    }

    if (panNumber && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panNumber.toUpperCase())) {
      setError("PAN Number format must be valid (e.g. ABCDE1234F).");
      return;
    }

    try {
      setSubmitting(true);
      await updateDoctorProfile(String(user?.ehrId), {
        doctorProfile: {
          aadhaarNumber,
          panNumber: panNumber.toUpperCase(),
          specialization,
          licenseNumber,
          aboutDoctor,
          degrees: degreesList,
        },
      });
      setSuccess("Profile details saved successfully!");
      fetchProfile();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to update profile.");
    } finally {
      setSubmitting(false);
    }
  };

  const addDegree = (degree: string) => {
    if (!degree) return;
    if (degreesList.includes(degree)) return;
    setDegreesList([...degreesList, degree]);
  };

  const removeDegree = (degree: string) => {
    setDegreesList(degreesList.filter((d) => d !== degree));
  };

  const handleSaveDegrees = async () => {
    try {
      setSubmitting(true);
      setError("");
      setSuccess("");
      await updateDoctorDegrees(String(user?.ehrId), {
        doctorProfile: {
          degrees: degreesList,
        },
      });
      setSuccess("Qualifications and Degrees updated successfully!");
    } catch (err) {
      setError("Failed to save qualifications.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  const specOptions = specialties.map((s) => ({ label: s, value: s }));
  const degreeOptions = qualifications.map((q) => ({ label: q, value: q }));

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="rounded-3xl border border-outline-variant bg-white p-6 shadow-sm flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Stethoscope size={32} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Dr. {doctorData?.user?.firstName} {doctorData?.user?.lastName}
          </h1>
          <p className="text-sm text-slate-500">License Number: {licenseNumber || "Not Configured"}</p>
        </div>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-600 text-sm font-semibold">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-2xl border border-green-200 bg-green-50 p-4 text-green-700 text-sm font-semibold">
          {success}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Core Profile */}
        <form onSubmit={handleProfileSubmit} className="space-y-6 rounded-3xl border border-outline-variant bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <FileText size={18} className="text-primary" /> Profile Configurations
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <AppInput
              label="Aadhaar Card (12-digits)"
              value={aadhaarNumber}
              onChange={(e) => setAadhaarNumber(e.target.value)}
            />
            <AppInput
              label="PAN Card Number"
              value={panNumber}
              onChange={(e) => setPanNumber(e.target.value)}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <AppSelect
              label="Specialization"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              options={[{ label: "Select Specialty", value: "" }, ...specOptions]}
              required
            />
            <AppInput
              label="Medical License ID"
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">About / Biography</label>
            <textarea
              value={aboutDoctor}
              onChange={(e) => setAboutDoctor(e.target.value)}
              className="w-full rounded-2xl border border-outline-variant p-4 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 h-32"
              placeholder="Tell your patients about yourself..."
            />
          </div>

          <div className="flex justify-end">
            <AppButton type="submit" loading={submitting}>
              Save Profile
            </AppButton>
          </div>
        </form>

        {/* Degrees and Qualifications */}
        <div className="space-y-6 rounded-3xl border border-outline-variant bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
              <Award size={18} className="text-primary" /> Qualifications & Degrees
            </h2>

            <div className="flex gap-2">
              <select
                onChange={(e) => {
                  addDegree(e.target.value);
                  e.target.value = "";
                }}
                className="flex-1 rounded-2xl border border-outline-variant bg-white px-4 h-14 text-sm outline-none focus:border-primary"
              >
                <option value="">+ Add Qualification Degree</option>
                {degreeOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-6 space-y-2.5">
              {degreesList.length === 0 ? (
                <p className="text-slate-500 text-sm text-center py-4">No qualifications listed yet.</p>
              ) : (
                degreesList.map((deg) => (
                  <div key={deg} className="flex justify-between items-center bg-slate-50 border border-slate-100 p-3 rounded-2xl">
                    <span className="text-sm font-semibold text-slate-700">{deg}</span>
                    <button
                      type="button"
                      onClick={() => removeDegree(deg)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash size={14} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <AppButton onClick={handleSaveDegrees} loading={submitting} className="w-full">
              Save Academic Profile
            </AppButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
