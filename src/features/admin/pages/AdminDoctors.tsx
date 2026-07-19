import { useEffect, useState } from "react";
import { getAllDoctors, searchDoctors, deleteDoctor, createDoctor } from "../services/adminApi";
import { specialties } from "@/config/metadata";
import { toBackendDate } from "@/lib/dateUtils";
import AppButton from "@/components/common/AppButton";
import AppInput from "@/components/common/AppInput";
import AppSelect from "@/components/common/AppSelect";
import { Stethoscope, Search, Plus, User, Trash2, ShieldAlert, XCircle } from "lucide-react";

const AdminDoctors = () => {
  const [query, setQuery] = useState("");
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Create Modal
  const [isOpen, setIsOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dob: "",
    gender: "Male",
    phoneNo: "",
    bloodGroup: "O_POSITIVE",
    addressLine: "",
    city: "",
    state: "",
    pinCode: "",
    aadhaarNumber: "",
    panNumber: "",
    specialization: "General Practitioner (GP)",
    licenseNumber: "",
    aboutDoctor: "",
  });

  const bloodGroups = [
    { label: "A+", value: "A_POSITIVE" },
    { label: "A-", value: "A_NEGATIVE" },
    { label: "B+", value: "B_POSITIVE" },
    { label: "B-", value: "B_NEGATIVE" },
    { label: "AB+", value: "AB_POSITIVE" },
    { label: "AB-", value: "AB_NEGATIVE" },
    { label: "O+", value: "O_POSITIVE" },
    { label: "O-", value: "O_NEGATIVE" },
  ];

  const genders = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Non-binary", value: "Non_binary" },
    { label: "Prefer not to say", value: "Prefer_not_to_say" },
  ];

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      setLoading(true);
      const list = await getAllDoctors();
      setDoctors(list);
    } catch (err) {
      setError("Failed to load doctor directory.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) {
      loadDoctors();
      return;
    }
    try {
      setLoading(true);
      const list = await searchDoctors(query);
      setDoctors(list);
    } catch (err) {
      setError("Failed to search doctors.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDoctor = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this doctor?")) return;
    try {
      setError("");
      setSuccess("");
      await deleteDoctor(id);
      setSuccess(`Doctor ID ${id} deleted successfully.`);
      loadDoctors();
    } catch (err) {
      setError("Failed to delete doctor.");
    }
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Form validation
    if (!form.firstName || !form.lastName || !form.email || !form.password || !form.phoneNo) {
      setError("Name, Email, Password, and Phone are required.");
      return;
    }

    if (!/^\d{10}$/.test(form.phoneNo)) {
      setError("Phone Number must be exactly 10 digits.");
      return;
    }

    if (form.pinCode && !/^\d{6}$/.test(form.pinCode)) {
      setError("PIN Code must be exactly 6 digits.");
      return;
    }

    if (form.aadhaarNumber && !/^\d{12}$/.test(form.aadhaarNumber)) {
      setError("Aadhaar Number must be exactly 12 digits.");
      return;
    }

    try {
      setSubmitting(true);
      await createDoctor({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        role: "DOCTOR",
        dob: toBackendDate(form.dob),
        gender: form.gender,
        phoneNo: Number(form.phoneNo),
        bloodGroup: form.bloodGroup,
        address: {
          addressLine: form.addressLine,
          city: form.city,
          state: form.state,
          pin_code: Number(form.pinCode),
        },
        doctorProfile: {
          aadhaarNumber: form.aadhaarNumber,
          panNumber: form.panNumber.toUpperCase(),
          specialization: form.specialization,
          licenseNumber: form.licenseNumber,
          aboutDoctor: form.aboutDoctor,
          degrees: [],
        },
      });

      setSuccess("Doctor registered successfully!");
      setIsOpen(false);
      loadDoctors();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to register doctor.");
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Doctors Directory</h1>
          <p className="text-sm text-slate-500">Query and onboard doctor staff.</p>
        </div>
        <AppButton onClick={() => setIsOpen(true)} className="flex items-center gap-1.5 self-start">
          <Plus size={18} /> Register Doctor
        </AppButton>
      </div>

      <form onSubmit={handleSearch} className="flex gap-3 max-w-xl">
        <AppInput
          placeholder="Search doctors by name, license number, or specialization..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          leftIcon={<Search size={18} />}
          className="flex-1"
        />
        <AppButton type="submit" className="px-6 h-14 rounded-2xl">
          Search
        </AppButton>
      </form>

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

      <div className="rounded-3xl border border-outline-variant bg-white shadow-sm overflow-hidden">
        {doctors.length === 0 ? (
          <div className="p-8 text-center text-slate-500">No doctors found in directory.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-outline-variant text-sm font-semibold text-slate-700">
                  <th className="p-4">Doctor EHR ID</th>
                  <th className="p-4">Doctor Name</th>
                  <th className="p-4">Specialization</th>
                  <th className="p-4">License ID</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant text-sm text-slate-600">
                {doctors.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-55 transition">
                    <td className="p-4 font-semibold text-slate-800">{doc.id}</td>
                    <td className="p-4 flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-primary">
                        <User size={14} />
                      </div>
                      Dr. {doc.user?.firstName} {doc.user?.lastName}
                    </td>
                    <td className="p-4 text-slate-700 font-medium">
                      {doc.doctorProfile?.specialization || "General Medicine"}
                    </td>
                    <td className="p-4 text-slate-500 font-semibold">{doc.doctorProfile?.licenseNumber || "N/A"}</td>
                    <td className="p-4 text-slate-500">{doc.user?.email}</td>
                    <td className="p-4 text-slate-500">+91 {doc.user?.phoneNo}</td>
                    <td className="p-4 text-right">
                      <AppButton
                        onClick={() => handleDeleteDoctor(doc.id)}
                        className="bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 text-xs px-3 py-1.5 rounded-xl"
                      >
                        Delete
                      </AppButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Register Doctor Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
          <div className="w-full max-w-2xl rounded-3xl border border-outline-variant bg-white p-6 shadow-xl animate-in fade-in zoom-in duration-200 my-8">
            <div className="flex items-center justify-between border-b border-outline-variant pb-3 mb-4">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-1.5">
                <Stethoscope className="text-primary" /> Onboard Doctor Account
              </h3>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600">
                <XCircle size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <AppInput
                  label="First Name"
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  required
                />
                <AppInput
                  label="Last Name"
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <AppInput
                  label="Email Address"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
                <AppInput
                  label="Password"
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <AppInput
                  label="Date of Birth"
                  type="date"
                  value={form.dob}
                  onChange={(e) => setForm({ ...form, dob: e.target.value })}
                  required
                />
                <AppSelect
                  label="Gender"
                  value={form.gender}
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                  options={genders}
                  required
                />
                <AppSelect
                  label="Blood Group"
                  value={form.bloodGroup}
                  onChange={(e) => setForm({ ...form, bloodGroup: e.target.value })}
                  options={bloodGroups}
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <AppInput
                  label="Phone Number"
                  value={form.phoneNo}
                  onChange={(e) => setForm({ ...form, phoneNo: e.target.value })}
                  required
                />
                <AppInput
                  label="Aadhaar Card (12 digits)"
                  value={form.aadhaarNumber}
                  onChange={(e) => setForm({ ...form, aadhaarNumber: e.target.value })}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <AppInput
                  label="PAN Card Number"
                  value={form.panNumber}
                  onChange={(e) => setForm({ ...form, panNumber: e.target.value })}
                />
                <AppSelect
                  label="Specialization"
                  value={form.specialization}
                  onChange={(e) => setForm({ ...form, specialization: e.target.value })}
                  options={specOptions}
                  required
                />
                <AppInput
                  label="License ID"
                  value={form.licenseNumber}
                  onChange={(e) => setForm({ ...form, licenseNumber: e.target.value })}
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <AppInput
                  label="Address Line"
                  value={form.addressLine}
                  onChange={(e) => setForm({ ...form, addressLine: e.target.value })}
                />
                <AppInput
                  label="City"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                />
                <AppInput
                  label="State"
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <AppInput
                  label="Postal PIN"
                  value={form.pinCode}
                  onChange={(e) => setForm({ ...form, pinCode: e.target.value })}
                />
                <AppInput
                  label="Brief Biography"
                  value={form.aboutDoctor}
                  onChange={(e) => setForm({ ...form, aboutDoctor: e.target.value })}
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-4">
                <AppButton variant="secondary" onClick={() => setIsOpen(false)}>
                  Cancel
                </AppButton>
                <AppButton type="submit" loading={submitting}>
                  Register Doctor
                </AppButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDoctors;
