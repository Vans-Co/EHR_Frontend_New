import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Edit3, RefreshCcw } from "lucide-react";

import PageHeader from "@/components/layout/PageHeader";
import AppButton from "@/components/common/AppButton";
import { useAuthStore } from "@/store/authStore";

import { getPatientProfile } from "@/features/patient/services/patientApi";
import type { PatientProfile as PatientProfileData } from "@/features/patient/types/patient.types";
import {
  AddressInfoIcon,
  ContactInfoIcon,
  DoctorInfoIcon,
  ErrorStateCard,
  EmergencyInfoIcon,
  MedicalInfoIcon,
  PatientProfileSkeleton,
  PersonalInfoIcon,
  ProfilePageShell,
  ProfileHeaderCard,
  ProfileSectionCard,
  ReadOnlyField,
} from "@/features/patient/components/PatientProfileShared";
import {
  formatProfileDate,
  normalizeEhrId,
} from "@/features/patient/components/patientProfileUtils";

const PatientProfile = () => {
  const navigate = useNavigate();
  const authUser = useAuthStore((state) => state.user);
  const [profile, setProfile] = useState<PatientProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProfile = useCallback(
    async (showLoader = false) => {
      const ehrId = normalizeEhrId(authUser?.ehrId);

      if (!ehrId) {
        setProfile(null);
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
        setError("");
      } catch (fetchError) {
        console.error(fetchError);
        setError("We couldn't load your profile right now. Please try again.");
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

  if (isLoading) {
    return (
      <ProfilePageShell>
        <PageHeader
          title="Patient Profile"
          subtitle="A complete view of your healthcare identity, presented in the same polished dashboard language."
        />
        <PatientProfileSkeleton />
      </ProfilePageShell>
    );
  }

  if (error || !profile) {
    return (
      <ProfilePageShell>
        <PageHeader
          title="Patient Profile"
          subtitle="A complete view of your healthcare identity, presented in the same polished dashboard language."
        />

        <ErrorStateCard
          title="Unable to load profile"
          message={error || "No profile data is available for this patient."}
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
                onClick={() => navigate("/patient/dashboard")}
                className="rounded-full border-sky-200 bg-white/70 px-5 text-sky-700 backdrop-blur-xl hover:border-sky-400 hover:bg-white"
              >
                Back to Dashboard
              </AppButton>
            </div>
          }
        />
      </ProfilePageShell>
    );
  }

  return (
    <ProfilePageShell>
      <PageHeader
        title="Patient Profile"
        subtitle="A complete view of your healthcare identity, presented in the same polished dashboard language."
      />

      <ProfileHeaderCard
        profile={profile}
        action={
          <AppButton
            className="w-full rounded-full border border-white/15 bg-white/15 px-6 text-white shadow-none backdrop-blur-xl hover:bg-white/20 sm:w-auto"
            onClick={() => navigate("/patient/profile/edit")}
          >
            <Edit3 size={16} />
            &nbsp; Edit Profile
          </AppButton>
        }
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <ProfileSectionCard
          title="Personal Information"
          subtitle="Core identity details anchored to your EHR record."
          icon={<PersonalInfoIcon />}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <ReadOnlyField label="First Name" value={profile.firstName} />
            <ReadOnlyField label="Last Name" value={profile.lastName} />
            <ReadOnlyField
              label="Date of Birth"
              value={formatProfileDate(profile.dob)}
            />
            <ReadOnlyField label="Gender" value={profile.gender} />
            <ReadOnlyField
              label="Marital Status"
              value={profile.maritalStatus}
            />
            <ReadOnlyField label="Blood Group" value={profile.bloodGroup} />
          </div>
        </ProfileSectionCard>

        <ProfileSectionCard
          title="Contact Information"
          subtitle="Primary communication details used across your care journey."
          icon={<ContactInfoIcon />}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <ReadOnlyField label="Email" value={profile.email} />
            <ReadOnlyField
              label="Phone Number"
              value={String(profile.phoneNo ?? "")}
            />
          </div>
        </ProfileSectionCard>

        <ProfileSectionCard
          title="Address"
          subtitle="Your current residential address on file."
          icon={<AddressInfoIcon />}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <ReadOnlyField
                label="Address Line"
                value={profile.address.addressLine}
              />
            </div>
            <ReadOnlyField label="City" value={profile.address.city} />
            <ReadOnlyField label="State" value={profile.address.state} />
            <ReadOnlyField
              label="PIN Code"
              value={String(profile.address.pin_code ?? "")}
            />
          </div>
        </ProfileSectionCard>

        <ProfileSectionCard
          title="Emergency Contact"
          subtitle="Trusted contact information used in urgent care situations."
          icon={<EmergencyInfoIcon />}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <ReadOnlyField
              label="Contact Name"
              value={profile.emergencyContact.contactName}
            />
            <ReadOnlyField
              label="Contact Number"
              value={String(profile.emergencyContact.contactPhoneNo ?? "")}
            />
            <ReadOnlyField
              label="Relationship"
              value={profile.emergencyContact.relationship}
            />
          </div>
        </ProfileSectionCard>

        <div className="xl:col-span-2">
          <ProfileSectionCard
            title="Medical Information"
            subtitle="Key healthcare identity markers used throughout the EHR."
            icon={<MedicalInfoIcon />}
          >
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <ReadOnlyField label="Blood Group" value={profile.bloodGroup} />
              <ReadOnlyField label="EHR ID" value={profile.ehrId} />
            </div>
          </ProfileSectionCard>
        </div>

        {profile.role === "DOCTOR" && profile.doctorProfile && (
          <div className="xl:col-span-2">
            <ProfileSectionCard
              title="Doctor Information"
              subtitle="Professional credentials and clinical identity for doctor accounts."
              icon={<DoctorInfoIcon />}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <ReadOnlyField
                  label="Specialization"
                  value={profile.doctorProfile.specialization}
                />
                <ReadOnlyField
                  label="License Number"
                  value={profile.doctorProfile.licenseNumber}
                />
                <div className="sm:col-span-2">
                  <ReadOnlyField
                    label="Degrees"
                    value={
                      profile.doctorProfile.degrees.length > 0
                        ? profile.doctorProfile.degrees.join(", ")
                        : "Not provided"
                    }
                  />
                </div>
                <ReadOnlyField
                  label="PAN Number"
                  value={profile.doctorProfile.panNumber}
                />
                <ReadOnlyField
                  label="Aadhaar Number"
                  value={profile.doctorProfile.aadhaarNumber}
                />
                <div className="sm:col-span-2">
                  <ReadOnlyField
                    label="About Doctor"
                    value={profile.doctorProfile.aboutDoctor}
                  />
                </div>
              </div>
            </ProfileSectionCard>
          </div>
        )}
      </div>
    </ProfilePageShell>
  );
};

export default PatientProfile;
