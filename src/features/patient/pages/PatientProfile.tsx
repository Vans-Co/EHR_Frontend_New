import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { getUserById, updateUserProfile, updateUserBloodGroup } from "../services/patientApi";
import AppButton from "@/components/common/AppButton";
import AppInput from "@/components/common/AppInput";
import AppSelect from "@/components/common/AppSelect";
import { User, Phone, MapPin, ShieldAlert, Heart, Calendar } from "lucide-react";
import { toBackendDate, toFrontendDate, formatDisplayDate } from "@/lib/dateUtils";

const PatientProfile = () => {
  const { user, login } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    gender: "",
    phoneNo: "",
    maritalStatus: "",
    addressLine: "",
    city: "",
    state: "",
    pinCode: "",
    contactName: "",
    relationship: "",
    contactPhoneNo: "",
  });

  const [bloodGroup, setBloodGroup] = useState("");

  const genders = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Non-binary", value: "Non_binary" },
    { label: "Prefer not to say", value: "Prefer_not_to_say" },
  ];

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

  const maritalStatuses = [
    { label: "Married", value: "Married" },
    { label: "Unmarried", value: "Unmarried" },
    { label: "Divorced", value: "Divorced" },
    { label: "Widowed", value: "Widowed" },
  ];

  useEffect(() => {
    if (user?.ehrId) {
      fetchProfile();
    }
  }, [user?.ehrId]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await getUserById(String(user?.ehrId));
      setFormData({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        email: data.email || "",
        dob: toFrontendDate(data.dob) || "",
        gender: data.gender || "",
        phoneNo: String(data.phoneNo || ""),
        maritalStatus: data.maritalStatus || "",
        addressLine: data.address?.addressLine || "",
        city: data.address?.city || "",
        state: data.address?.state || "",
        pinCode: String(data.address?.pin_code || ""),
        contactName: data.emergencyContact?.contactName || "",
        relationship: data.emergencyContact?.relationship || "",
        contactPhoneNo: String(data.emergencyContact?.contactPhoneNo || ""),
      });
      setBloodGroup(data.bloodGroup || "");
    } catch (err: any) {
      setError("Failed to load profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Front-end validations
    if (!formData.firstName || !formData.lastName || !formData.phoneNo) {
      setError("Name and Phone Number are required.");
      return;
    }

    if (!/^\d{10}$/.test(formData.phoneNo)) {
      setError("Phone Number must be exactly 10 digits.");
      return;
    }

    if (formData.pinCode && !/^\d{6}$/.test(formData.pinCode)) {
      setError("Postal PIN Code must be exactly 6 digits.");
      return;
    }

    if (formData.contactPhoneNo && !/^\d{10}$/.test(formData.contactPhoneNo)) {
      setError("Emergency contact phone must be exactly 10 digits.");
      return;
    }

    try {
      setSubmitting(true);
      const updatedUser = await updateUserProfile(String(user?.ehrId), {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        dob: toBackendDate(formData.dob),
        gender: formData.gender,
        phoneNo: Number(formData.phoneNo),
        maritalStatus: formData.maritalStatus,
        address: {
          addressLine: formData.addressLine,
          city: formData.city,
          state: formData.state,
          pin_code: Number(formData.pinCode),
        },
        emergencyContact: {
          contactName: formData.contactName,
          relationship: formData.relationship,
          contactPhoneNo: Number(formData.contactPhoneNo),
        },
      });

      // If user successfully updated, also save to authStore
      if (user) {
        const storedAccessToken = localStorage.getItem("accessToken") || "";
        const storedRefreshToken = localStorage.getItem("refreshToken") || "";
        login(
          {
            ...user,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
            phoneNo: updatedUser.phoneNo,
            dob: updatedUser.dob,
            gender: updatedUser.gender,
            bloodGroup: updatedUser.bloodGroup,
            address: updatedUser.address,
          },
          storedAccessToken,
          storedRefreshToken
        );
      }

      setSuccess("Profile updated successfully!");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to update profile.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleBloodGroupUpdate = async (group: string) => {
    try {
      setSubmitting(true);
      setError("");
      setSuccess("");
      await updateUserBloodGroup(String(user?.ehrId), group);
      setBloodGroup(group);
      setSuccess("Blood group updated successfully!");
    } catch (err: any) {
      setError("Failed to update blood group.");
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

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="rounded-3xl border border-outline-variant bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <User size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                {formData.firstName} {formData.lastName}
              </h1>
              <p className="text-sm text-slate-500">Patient EHR ID: {user?.ehrId}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Heart className="text-red-500 fill-red-500" size={20} />
            <span className="font-semibold text-slate-700">Blood Group:</span>
            <select
              value={bloodGroup}
              disabled={submitting}
              onChange={(e) => handleBloodGroupUpdate(e.target.value)}
              className="rounded-xl border border-outline-variant bg-slate-50 px-3 py-1.5 text-sm font-semibold outline-none focus:border-primary"
            >
              <option value="">Select Blood Group</option>
              {bloodGroups.map((bg) => (
                <option key={bg.value} value={bg.value}>
                  {bg.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-600">
          <ShieldAlert size={20} />
          <p className="text-sm font-semibold">{error}</p>
        </div>
      )}

      {success && (
        <div className="rounded-2xl border border-green-200 bg-green-50 p-4 text-green-700">
          <p className="text-sm font-semibold">{success}</p>
        </div>
      )}

      <form onSubmit={handleUpdate} className="grid gap-6 md:grid-cols-2">
        {/* Personal details */}
        <div className="space-y-6 rounded-3xl border border-outline-variant bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Calendar size={18} className="text-primary" /> Personal Information
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <AppInput
              label="First Name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              required
            />
            <AppInput
              label="Last Name"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              required
            />
          </div>

          <AppInput
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            disabled
            helperText="Email address cannot be changed."
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <AppInput
              label="Date of Birth"
              type="date"
              value={formData.dob}
              onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
              required
            />
            <AppSelect
              label="Gender"
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              options={[{ label: "Select Gender", value: "" }, ...genders]}
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <AppInput
              label="Phone Number"
              value={formData.phoneNo}
              onChange={(e) => setFormData({ ...formData, phoneNo: e.target.value })}
              leftIcon={<Phone size={16} />}
              required
            />
            <AppSelect
              label="Marital Status"
              value={formData.maritalStatus}
              onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value })}
              options={[{ label: "Select Status", value: "" }, ...maritalStatuses]}
            />
          </div>
        </div>

        {/* Address and Emergency contact */}
        <div className="space-y-6">
          <div className="space-y-6 rounded-3xl border border-outline-variant bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <MapPin size={18} className="text-primary" /> Address
            </h2>

            <AppInput
              label="Address Line"
              value={formData.addressLine}
              onChange={(e) => setFormData({ ...formData, addressLine: e.target.value })}
              required
            />

            <div className="grid gap-4 sm:grid-cols-3">
              <AppInput
                label="City"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                required
              />
              <AppInput
                label="State"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                required
              />
              <AppInput
                label="PIN Code"
                value={formData.pinCode}
                onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-6 rounded-3xl border border-outline-variant bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Phone size={18} className="text-primary" /> Emergency Contact
            </h2>

            <AppInput
              label="Contact Name"
              value={formData.contactName}
              onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
              required
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <AppInput
                label="Relationship"
                value={formData.relationship}
                onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                required
              />
              <AppInput
                label="Contact Phone"
                value={formData.contactPhoneNo}
                onChange={(e) => setFormData({ ...formData, contactPhoneNo: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="flex justify-end">
            <AppButton type="submit" loading={submitting}>
              Save Profile Changes
            </AppButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PatientProfile;
