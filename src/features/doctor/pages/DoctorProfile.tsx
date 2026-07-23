import { useEffect, useState } from "react";

import { Loader2, Save, Stethoscope } from "lucide-react";

import { useAuthStore } from "@/store/authStore";
import { doctorApi } from "@/features/doctor/services/doctorApi";

interface ProfileForm {
  firstName: string;
  lastName: string;
  phoneNo: string;
  specialization: string;
  licenseNumber: string;
  aboutDoctor: string;
  degrees: string; // comma separated in the form
  consultationFee: string;
}

const EMPTY: ProfileForm = {
  firstName: "",
  lastName: "",
  phoneNo: "",
  specialization: "",
  licenseNumber: "",
  aboutDoctor: "",
  degrees: "",
  consultationFee: "",
};

const FIELDS: {
  key: keyof ProfileForm;
  label: string;
  placeholder?: string;
}[] = [
  { key: "firstName", label: "First Name" },
  { key: "lastName", label: "Last Name" },
  { key: "phoneNo", label: "Phone Number" },
  { key: "specialization", label: "Specialization", placeholder: "Cardiology" },
  { key: "licenseNumber", label: "License Number" },
  { key: "degrees", label: "Degrees", placeholder: "MBBS, MD" },
  { key: "consultationFee", label: "Consultation Fee (₹)", placeholder: "500" },
];

const DoctorProfile = () => {
  const user = useAuthStore((state) => state.user);
  const updateUser = useAuthStore((state) => state.updateUser);

  const [form, setForm] = useState<ProfileForm>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(
    null
  );

  useEffect(() => {
    if (!user?.ehrId) return;
    (async () => {
      try {
        const data = await doctorApi.getProfile(user.ehrId);
        const u = data?.user ?? {};
        const p = data?.doctorProfile ?? {};
        setForm({
          firstName: u.firstName ?? "",
          lastName: u.lastName ?? "",
          phoneNo: u.phoneNo != null ? String(u.phoneNo) : "",
          specialization: p.specialization ?? "",
          licenseNumber: p.licenseNumber ?? "",
          aboutDoctor: p.aboutDoctor ?? "",
          degrees: Array.isArray(p.degrees) ? p.degrees.join(", ") : "",
          consultationFee:
            p.consultationFee != null ? String(p.consultationFee) : "",
        });
      } catch {
        setMessage({ ok: false, text: "Could not load your profile." });
      } finally {
        setLoading(false);
      }
    })();
  }, [user?.ehrId]);

  const update = (key: keyof ProfileForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setMessage(null);
  };

  const save = async () => {
    if (!user?.ehrId) return;
    setSaving(true);
    setMessage(null);
    try {
      await doctorApi.updateProfile(user.ehrId, {
        firstName: form.firstName || undefined,
        lastName: form.lastName || undefined,
        phoneNo: form.phoneNo ? Number(form.phoneNo) : undefined,
        specialization: form.specialization || undefined,
        licenseNumber: form.licenseNumber || undefined,
        aboutDoctor: form.aboutDoctor || undefined,
        degrees: form.degrees
          ? form.degrees.split(",").map((d) => d.trim()).filter(Boolean)
          : undefined,
        consultationFee: form.consultationFee
          ? Number(form.consultationFee)
          : undefined,
      });
      // keep the navbar greeting in sync
      updateUser({ firstName: form.firstName, lastName: form.lastName });
      setMessage({ ok: true, text: "Profile saved." });
    } catch {
      setMessage({ ok: false, text: "Could not save your profile." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">

      {/* Hero */}

      <section
        className="
          flex
          items-center
          gap-5
          rounded-[30px]
          border
          border-white/30
          bg-gradient-to-br
          from-cyan-500/5
          via-white/75
          to-violet-500/5
          p-7
          shadow-[0_15px_40px_rgba(15,23,42,.06)]
          backdrop-blur-2xl
        "
      >
        <div
          className="
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-[22px]
            bg-gradient-to-br
            from-cyan-400
            via-sky-500
            to-violet-500
            shadow-xl
          "
        >
          <Stethoscope size={28} className="text-white" />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-on-background">
            Doctor Profile
          </h1>
          <p className="mt-1 text-sm text-on-surface-variant">
            This information is shown to patients when they search for you.
          </p>
        </div>
      </section>

      {/* Form */}

      <section
        className="
          rounded-[30px]
          border
          border-white/30
          bg-white/70
          p-6
          backdrop-blur-xl
        "
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-10 text-on-surface-variant">
            <Loader2 size={18} className="animate-spin" />
            Loading profile...
          </div>
        ) : (
          <>
            <div className="grid gap-5 sm:grid-cols-2">
              {FIELDS.map((f) => (
                <label key={f.key} className="block">
                  <span className="text-xs font-semibold uppercase tracking-wide text-on-surface-variant">
                    {f.label}
                  </span>
                  <input
                    type="text"
                    value={form[f.key]}
                    placeholder={f.placeholder}
                    onChange={(e) => update(f.key, e.target.value)}
                    className="
                      mt-1.5
                      w-full
                      rounded-xl
                      border
                      border-outline-variant
                      bg-white
                      px-4
                      py-2.5
                      text-sm
                      text-on-background
                      outline-none
                      transition-colors
                      focus:border-primary
                    "
                  />
                </label>
              ))}
            </div>

            <label className="mt-5 block">
              <span className="text-xs font-semibold uppercase tracking-wide text-on-surface-variant">
                About
              </span>
              <textarea
                value={form.aboutDoctor}
                rows={4}
                placeholder="Tell patients about your experience..."
                onChange={(e) => update("aboutDoctor", e.target.value)}
                className="
                  mt-1.5
                  w-full
                  rounded-xl
                  border
                  border-outline-variant
                  bg-white
                  px-4
                  py-2.5
                  text-sm
                  text-on-background
                  outline-none
                  transition-colors
                  focus:border-primary
                "
              />
            </label>

            {message && (
              <p
                className={`
                  mt-4
                  rounded-xl
                  px-4
                  py-3
                  text-sm
                  ${message.ok
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-red-50 text-red-600"}
                `}
              >
                {message.text}
              </p>
            )}

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                disabled={saving}
                onClick={save}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-2xl
                  bg-gradient-to-r
                  from-cyan-500
                  via-sky-500
                  to-violet-500
                  px-7
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  shadow-lg
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {saving ? (
                  <>
                    <Loader2 size={17} className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={17} />
                    Save Profile
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default DoctorProfile;
