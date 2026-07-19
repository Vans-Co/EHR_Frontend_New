import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Edit3,
  Mail,
  MapPin,
  Phone,
  RefreshCcw,
  UserRound,
} from "lucide-react";

import AppButton from "@/components/common/AppButton";
import AppCard from "@/components/common/AppCard";
import AppDatePicker from "@/components/common/AppDatePicker";
import AppInput from "@/components/common/AppInput";
import AppSelect from "@/components/common/AppSelect";
import PageHeader from "@/components/layout/PageHeader";

import { useAuthStore } from "@/store/authStore";
import {
  getPatientProfile,
  updatePatientProfile,
} from "@/features/patient/services/patientApi";
import type {
  PatientProfile as PatientProfileData,
  PatientProfileFieldErrors,
  PatientProfileFormValues,
  UpdatePatientProfileRequest,
} from "@/features/patient/types/patient.types";
import {
  AddressInfoIcon,
  ContactInfoIcon,
  ErrorStateCard,
  EmergencyInfoIcon,
  PatientProfileSkeleton,
  PersonalInfoIcon,
  ProfilePageShell,
  ProfileHeaderCard,
  ProfileSectionCard,
  ProfileToast,
} from "@/features/patient/components/PatientProfileShared";
import {
  bloodGroupOptions,
  genderOptions,
  mapProfileToFormValues,
  maritalStatusOptions,
  normalizeEhrId,
} from "@/features/patient/components/patientProfileUtils";

const numberPattern = /^\d+$/;

const fieldContainerClassName =
  "rounded-[26px] border border-white/30 bg-gradient-to-br from-white/75 to-sky-50/70 p-4 shadow-[0_12px_28px_rgba(15,23,42,0.06)] backdrop-blur-xl";

const labelClassName =
  "text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500";

const inputWrapperClassName =
  "border-white/55 bg-white/65 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] backdrop-blur-sm";

const PatientProfileEdit = () => {
  const navigate = useNavigate();
  const updateAuthUser = useAuthStore((state) => state.updateUser);
  const authUser = useAuthStore((state) => state.user);

  const [profile, setProfile] = useState<PatientProfileData | null>(null);
  const [formValues, setFormValues] = useState<PatientProfileFormValues | null>(
    null,
  );
  const [errors, setErrors] = useState<PatientProfileFieldErrors>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const headerProfile = useMemo(
    () =>
      profile && formValues
        ? {
            ...profile,
            firstName: formValues.firstName,
            lastName: formValues.lastName,
          }
        : profile,
    [formValues, profile],
  );

  const fetchProfile = useCallback(
    async (showLoader = false) => {
      const ehrId = normalizeEhrId(authUser?.ehrId);

      if (!ehrId) {
        setProfile(null);
        setFormValues(null);
        setError("We couldn't find your EHR ID in the current session.");
        setIsLoading(false);
        return;
      }

      try {
        if (showLoader) {
          setIsLoading(true);
          setError("");
        }

        const response = await getPatientProfile(ehrId);
        setProfile(response);
        setFormValues(mapProfileToFormValues(response));
        setError("");
      } catch (fetchError) {
        console.error(fetchError);
        setError(
          "We couldn't load your profile for editing. Please try again.",
        );
      } finally {
        setIsLoading(false);
      }
    },
    [authUser?.ehrId],
  );

  useEffect(() => {
    const loadProfile = async () => {
      await fetchProfile();
    };

    void loadProfile();
  }, [fetchProfile]);

  useEffect(() => {
    if (!showToast) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setShowToast(false);
    }, 3000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [showToast]);

  const updateField = (
    field: keyof PatientProfileFormValues,
    value: string,
  ) => {
    setFormValues((currentValues) =>
      currentValues
        ? {
            ...currentValues,
            [field]: value,
          }
        : currentValues,
    );

    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: undefined,
    }));
  };

  const validateForm = () => {
    if (!formValues) {
      return false;
    }

    const nextErrors: PatientProfileFieldErrors = {};

    if (!formValues.firstName.trim()) {
      nextErrors.firstName = "First name is required.";
    }

    if (!formValues.lastName.trim()) {
      nextErrors.lastName = "Last name is required.";
    }

    if (!formValues.phoneNo.trim()) {
      nextErrors.phoneNo = "Phone number is required.";
    } else if (!numberPattern.test(formValues.phoneNo)) {
      nextErrors.phoneNo = "Phone number must contain digits only.";
    }

    if (!formValues.dob) {
      nextErrors.dob = "Date of birth is required.";
    }

    if (!formValues.gender) {
      nextErrors.gender = "Gender is required.";
    }

    if (!formValues.maritalStatus) {
      nextErrors.maritalStatus = "Marital status is required.";
    }

    if (!formValues.bloodGroup) {
      nextErrors.bloodGroup = "Blood group is required.";
    }

    if (!formValues.addressLine.trim()) {
      nextErrors.addressLine = "Address line is required.";
    }

    if (!formValues.city.trim()) {
      nextErrors.city = "City is required.";
    }

    if (!formValues.state.trim()) {
      nextErrors.state = "State is required.";
    }

    if (!formValues.pin_code.trim()) {
      nextErrors.pin_code = "PIN code is required.";
    } else if (!numberPattern.test(formValues.pin_code)) {
      nextErrors.pin_code = "PIN code must contain digits only.";
    }

    if (!formValues.contactName.trim()) {
      nextErrors.contactName = "Emergency contact name is required.";
    }

    if (!formValues.contactPhoneNo.trim()) {
      nextErrors.contactPhoneNo = "Emergency contact number is required.";
    } else if (!numberPattern.test(formValues.contactPhoneNo)) {
      nextErrors.contactPhoneNo =
        "Emergency contact number must contain digits only.";
    }

    if (!formValues.relationship.trim()) {
      nextErrors.relationship = "Relationship is required.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const buildPayload = (): UpdatePatientProfileRequest => ({
    firstName: formValues?.firstName.trim() ?? "",
    lastName: formValues?.lastName.trim() ?? "",
    phoneNo: Number(formValues?.phoneNo ?? 0),
    dob: formValues?.dob ?? "",
    gender: formValues?.gender ?? "",
    bloodGroup: formValues?.bloodGroup ?? "",
    maritalStatus: formValues?.maritalStatus ?? "",
    address: {
      addressLine: formValues?.addressLine.trim() ?? "",
      city: formValues?.city.trim() ?? "",
      state: formValues?.state.trim() ?? "",
      pin_code: Number(formValues?.pin_code ?? 0),
    },
    emergencyContact: {
      contactName: formValues?.contactName.trim() ?? "",
      contactPhoneNo: Number(formValues?.contactPhoneNo ?? 0),
      relationship: formValues?.relationship.trim() ?? "",
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsSaving(true);
      setError("");

      const updatedProfile = await updatePatientProfile(buildPayload());

      setProfile(updatedProfile);
      setFormValues(mapProfileToFormValues(updatedProfile));
      updateAuthUser({
        firstName: updatedProfile.firstName,
        lastName: updatedProfile.lastName,
        phoneNo: updatedProfile.phoneNo,
        dob: updatedProfile.dob,
        gender: updatedProfile.gender,
        bloodGroup: updatedProfile.bloodGroup,
        address: updatedProfile.address,
      });

      setShowToast(true);
    } catch (saveError) {
      console.error(saveError);
      setError(
        "We couldn't save your profile changes. Please review the form and try again.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <ProfilePageShell>
        <PageHeader
          title="Edit Profile"
          subtitle="Refine your profile details inside the same premium dashboard experience."
        />
        <PatientProfileSkeleton />
      </ProfilePageShell>
    );
  }

  if (error && !profile) {
    return (
      <ProfilePageShell>
        <PageHeader
          title="Edit Profile"
          subtitle="Refine your profile details inside the same premium dashboard experience."
        />

        <ErrorStateCard
          title="Unable to load editable profile"
          message={error}
          action={
            <div className="flex flex-wrap gap-3">
              <AppButton
                type="button"
                onClick={() => void fetchProfile(true)}
                className="rounded-full bg-primary px-5 text-white hover:bg-primary/90"
              >
                <RefreshCcw size={16} />
                Retry
              </AppButton>

              <AppButton
                variant="outline"
                onClick={() => navigate("/patient/profile")}
                className="rounded-full border-sky-200 bg-white/70 px-5 text-sky-700 backdrop-blur-xl hover:border-sky-400 hover:bg-white"
              >
                Back to Profile
              </AppButton>
            </div>
          }
        />
      </ProfilePageShell>
    );
  }

  if (!profile || !formValues || !headerProfile) {
    return null;
  }

  return (
    <>
      <ProfileToast
        visible={showToast}
        message="Your latest details have been saved successfully."
      />

      <ProfilePageShell>
        <PageHeader
          title="Edit Profile"
          subtitle="Refine your profile details inside the same premium dashboard experience."
        />

        <ProfileHeaderCard
          profile={headerProfile}
          action={
            <div className="flex items-center gap-3">
              <AppButton
                variant="outline"
                className="w-full rounded-full border border-white/20 bg-white/15 px-6 text-white shadow-none backdrop-blur-xl hover:bg-white/20 sm:w-auto"
                onClick={() => navigate("/patient/profile")}
              >
                Cancel
              </AppButton>

              <AppButton
                type="submit"
                form="patient-profile-form"
                loading={isSaving}
                className="w-full rounded-full bg-white px-6 text-sky-700 shadow-none hover:bg-sky-50 sm:w-auto"
              >
                <Edit3 size={16} />
                &nbsp; Save Changes
              </AppButton>
            </div>
          }
        />

        <form
          id="patient-profile-form"
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <section className="rounded-[30px] border border-white/25 bg-white/65 p-5 shadow-[0_15px_35px_rgba(0,0,0,0.08)] backdrop-blur-xl">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-600">
                  Edit Mode
                </p>
                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  Shape Your Profile
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
                  Update the details that matter most while protected identity
                  fields remain safely locked to your account.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:min-w-[280px]">
                <div className="rounded-2xl border border-sky-100 bg-sky-50/80 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-600">
                    Status
                  </p>
                  <p className="mt-2 text-lg font-bold text-slate-900">
                    Ready to Save
                  </p>
                </div>
                <div className="rounded-2xl border border-cyan-100 bg-cyan-50/80 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-700">
                    Account Role
                  </p>
                  <p className="mt-2 text-lg font-bold text-slate-900">
                    {formValues.role}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {error && (
            <AppCard className="rounded-[28px] border border-red-200/60 bg-white/80 backdrop-blur-xl">
              <p className="text-sm font-medium text-danger">{error}</p>
            </AppCard>
          )}

          <div className="grid gap-6 xl:grid-cols-2">
            <ProfileSectionCard
              title="Personal Information"
              subtitle="Update the personal details tied to your healthcare profile."
              icon={<PersonalInfoIcon />}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <AppInput
                  label="First Name"
                  value={formValues.firstName}
                  error={errors.firstName}
                  leftIcon={<UserRound size={18} />}
                  containerClassName={fieldContainerClassName}
                  labelClassName={labelClassName}
                  inputWrapperClassName={inputWrapperClassName}
                  onChange={(event) =>
                    updateField("firstName", event.target.value)
                  }
                />
                <AppInput
                  label="Last Name"
                  value={formValues.lastName}
                  error={errors.lastName}
                  leftIcon={<UserRound size={18} />}
                  containerClassName={fieldContainerClassName}
                  labelClassName={labelClassName}
                  inputWrapperClassName={inputWrapperClassName}
                  onChange={(event) =>
                    updateField("lastName", event.target.value)
                  }
                />
                <AppDatePicker
                  label="Date of Birth"
                  value={formValues.dob}
                  error={errors.dob}
                  containerClassName={fieldContainerClassName}
                  labelClassName={labelClassName}
                  inputWrapperClassName={inputWrapperClassName}
                  onChange={(event) => updateField("dob", event.target.value)}
                />
                <AppSelect
                  label="Gender"
                  value={formValues.gender}
                  error={errors.gender}
                  leftIcon={<UserRound size={18} />}
                  options={genderOptions}
                  containerClassName={fieldContainerClassName}
                  labelClassName={labelClassName}
                  inputWrapperClassName={inputWrapperClassName}
                  onChange={(event) =>
                    updateField("gender", event.target.value)
                  }
                />
                <AppSelect
                  label="Marital Status"
                  value={formValues.maritalStatus}
                  error={errors.maritalStatus}
                  leftIcon={<UserRound size={18} />}
                  options={maritalStatusOptions}
                  containerClassName={fieldContainerClassName}
                  labelClassName={labelClassName}
                  inputWrapperClassName={inputWrapperClassName}
                  onChange={(event) =>
                    updateField("maritalStatus", event.target.value)
                  }
                />
                <AppSelect
                  label="Blood Group"
                  value={formValues.bloodGroup}
                  error={errors.bloodGroup}
                  options={bloodGroupOptions}
                  containerClassName={fieldContainerClassName}
                  labelClassName={labelClassName}
                  inputWrapperClassName={inputWrapperClassName}
                  onChange={(event) =>
                    updateField("bloodGroup", event.target.value)
                  }
                />
                <AppInput
                  label="Phone Number"
                  value={formValues.phoneNo}
                  error={errors.phoneNo}
                  leftIcon={<Phone size={18} />}
                  containerClassName={fieldContainerClassName}
                  labelClassName={labelClassName}
                  inputWrapperClassName={inputWrapperClassName}
                  onChange={(event) =>
                    updateField("phoneNo", event.target.value)
                  }
                />
              </div>
            </ProfileSectionCard>

            <ProfileSectionCard
              title="Contact Information"
              subtitle="Protected account fields stay locked while editable contact info remains easy to manage."
              icon={<ContactInfoIcon />}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <AppInput
                  label="Email"
                  value={formValues.email}
                  readOnly
                  leftIcon={<Mail size={18} />}
                  className="cursor-default"
                  containerClassName={fieldContainerClassName}
                  labelClassName={labelClassName}
                  inputWrapperClassName="border-white/45 bg-slate-50/80 backdrop-blur-sm"
                />
                <AppInput
                  label="EHR ID"
                  value={formValues.ehrId}
                  readOnly
                  leftIcon={<UserRound size={18} />}
                  className="cursor-default"
                  containerClassName={fieldContainerClassName}
                  labelClassName={labelClassName}
                  inputWrapperClassName="border-white/45 bg-slate-50/80 backdrop-blur-sm"
                />
                <AppInput
                  label="Role"
                  value={formValues.role}
                  readOnly
                  leftIcon={<UserRound size={18} />}
                  className="cursor-default"
                  containerClassName={fieldContainerClassName}
                  labelClassName={labelClassName}
                  inputWrapperClassName="border-white/45 bg-slate-50/80 backdrop-blur-sm"
                />
              </div>
            </ProfileSectionCard>

            <ProfileSectionCard
              title="Address"
              subtitle="Keep your residential information accurate and up to date."
              icon={<AddressInfoIcon />}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <AppInput
                    label="Address Line"
                    value={formValues.addressLine}
                    error={errors.addressLine}
                    leftIcon={<MapPin size={18} />}
                    containerClassName={fieldContainerClassName}
                    labelClassName={labelClassName}
                    inputWrapperClassName={inputWrapperClassName}
                    onChange={(event) =>
                      updateField("addressLine", event.target.value)
                    }
                  />
                </div>
                <AppInput
                  label="City"
                  value={formValues.city}
                  error={errors.city}
                  containerClassName={fieldContainerClassName}
                  labelClassName={labelClassName}
                  inputWrapperClassName={inputWrapperClassName}
                  onChange={(event) => updateField("city", event.target.value)}
                />
                <AppInput
                  label="State"
                  value={formValues.state}
                  error={errors.state}
                  containerClassName={fieldContainerClassName}
                  labelClassName={labelClassName}
                  inputWrapperClassName={inputWrapperClassName}
                  onChange={(event) => updateField("state", event.target.value)}
                />
                <AppInput
                  label="PIN Code"
                  value={formValues.pin_code}
                  error={errors.pin_code}
                  containerClassName={fieldContainerClassName}
                  labelClassName={labelClassName}
                  inputWrapperClassName={inputWrapperClassName}
                  onChange={(event) =>
                    updateField("pin_code", event.target.value)
                  }
                />
              </div>
            </ProfileSectionCard>

            <ProfileSectionCard
              title="Emergency Contact"
              subtitle="Make sure urgent-contact information is always current."
              icon={<EmergencyInfoIcon />}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <AppInput
                  label="Contact Name"
                  value={formValues.contactName}
                  error={errors.contactName}
                  containerClassName={fieldContainerClassName}
                  labelClassName={labelClassName}
                  inputWrapperClassName={inputWrapperClassName}
                  onChange={(event) =>
                    updateField("contactName", event.target.value)
                  }
                />
                <AppInput
                  label="Contact Number"
                  value={formValues.contactPhoneNo}
                  error={errors.contactPhoneNo}
                  containerClassName={fieldContainerClassName}
                  labelClassName={labelClassName}
                  inputWrapperClassName={inputWrapperClassName}
                  onChange={(event) =>
                    updateField("contactPhoneNo", event.target.value)
                  }
                />
                <AppInput
                  label="Relationship"
                  value={formValues.relationship}
                  error={errors.relationship}
                  containerClassName={fieldContainerClassName}
                  labelClassName={labelClassName}
                  inputWrapperClassName={inputWrapperClassName}
                  onChange={(event) =>
                    updateField("relationship", event.target.value)
                  }
                />
              </div>
            </ProfileSectionCard>
          </div>

          <div className="sticky bottom-4 z-20 rounded-[28px] border border-white/30 bg-white/75 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.12)] backdrop-blur-xl">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-600">
                  Final Step
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Review your updates and save when everything looks right.
                </p>
              </div>

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <AppButton
                  type="button"
                  variant="outline"
                  className="rounded-full border-sky-200 bg-white/75 px-6 text-sky-700 backdrop-blur-xl hover:border-sky-400 hover:bg-white"
                  onClick={() => navigate("/patient/profile")}
                >
                  Cancel
                </AppButton>

                <AppButton
                  type="submit"
                  loading={isSaving}
                  className="rounded-full bg-primary px-6 text-white hover:bg-primary/90"
                >
                  Save Changes
                </AppButton>
              </div>
            </div>
          </div>
        </form>
      </ProfilePageShell>
    </>
  );
};

export default PatientProfileEdit;
