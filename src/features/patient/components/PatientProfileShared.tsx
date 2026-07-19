import {
  AlertCircle,
  BriefcaseMedical,
  Droplets,
  HeartHandshake,
  Mail,
  MapPin,
  Phone,
  Shield,
  UserRound,
} from "lucide-react";

import AppCard from "@/components/common/AppCard";
import { Badge } from "@/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { getProfileInitials } from "@/features/patient/components/patientProfileUtils";

import type {
  PatientProfile,
} from "@/features/patient/types/patient.types";

interface ProfileHeaderCardProps {
  profile: PatientProfile;
  action?: React.ReactNode;
}

interface ProfileSectionCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

interface ReadOnlyFieldProps {
  label: string;
  value: string;
}

interface ErrorStateCardProps {
  title: string;
  message: string;
  action?: React.ReactNode;
}

interface ProfileToastProps {
  message: string;
  visible: boolean;
}

const DEFAULT_AVATAR =
  "https://api.dicebear.com/9.x/initials/svg?seed=Patient";

export const ProfilePageShell = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <div className="relative overflow-hidden rounded-[32px] border border-sky-100/70 bg-gradient-to-br from-sky-50/90 via-white to-cyan-50/80 p-4 shadow-[0_18px_45px_rgba(14,165,233,0.08)] sm:p-6">
    <div className="absolute -left-12 top-16 h-44 w-44 rounded-full bg-sky-200/30 blur-3xl" />
    <div className="absolute -right-10 top-0 h-52 w-52 rounded-full bg-cyan-200/35 blur-3xl" />
    <div className="absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-blue-100/30 blur-3xl" />
    <div className="relative space-y-6">
      {children}
    </div>
  </div>
);

export const ProfileHeaderCard = ({
  profile,
  action,
}: ProfileHeaderCardProps) => (
  <section className="relative overflow-hidden rounded-[30px] border border-white/25 bg-gradient-to-r from-[#1976E8] via-[#1693EA] to-[#09B5D8] p-6 shadow-[0_22px_48px_rgba(16,120,230,0.18)] fade-up sm:p-7">
    <div className="absolute -right-12 -top-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
    <div className="absolute -bottom-16 left-0 h-44 w-44 rounded-full bg-cyan-300/10 blur-3xl" />
    <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-4 sm:gap-5">
        <Avatar className="h-20 w-20 border-4 border-white/20 shadow-[0_12px_24px_rgba(15,23,42,0.2)] sm:h-24 sm:w-24">
          <AvatarImage
            src={DEFAULT_AVATAR}
            alt={`${profile.firstName} ${profile.lastName}`}
          />
          <AvatarFallback className="bg-white/20 text-xl font-bold text-white backdrop-blur-xl">
            {getProfileInitials(
              profile.firstName,
              profile.lastName
            )}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 space-y-3">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cyan-100/90">
              Patient Profile
            </p>

            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              {profile.firstName} {profile.lastName}
            </h2>

            <div className="flex flex-wrap items-center gap-3">
              <Badge className="rounded-full border border-white/15 bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-xl hover:bg-white/15">
                {profile.role || "PATIENT"}
              </Badge>

              <p className="text-sm font-medium text-cyan-100">
                EHR ID: {profile.ehrId}
              </p>
            </div>
          </div>

          <div className="flex min-w-0 items-center gap-2 text-sm text-cyan-50">
            <Mail size={16} className="shrink-0" />
            <span className="truncate">
              {profile.email}
            </span>
          </div>
        </div>
      </div>

      {action && (
        <div className="flex shrink-0 items-center">
          {action}
        </div>
      )}
    </div>
  </section>
);

export const ProfileSectionCard = ({
  title,
  subtitle,
  icon,
  children,
}: ProfileSectionCardProps) => (
  <section className="rounded-[30px] border border-white/25 bg-white/70 p-5 shadow-[0_15px_35px_rgba(0,0,0,0.08)] backdrop-blur-xl fade-up sm:p-6">
    <div className="mb-5 flex items-start justify-between gap-4">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm">
          {icon}
        </div>

        <div>
          <h2 className="text-xl font-bold text-on-background">
            {title}
          </h2>
          <p className="mt-1 max-w-xl text-sm leading-6 text-on-surface-variant">
            {subtitle}
          </p>
        </div>
      </div>
    </div>

    {children}
  </section>
);

export const ReadOnlyField = ({
  label,
  value,
}: ReadOnlyFieldProps) => (
  <div className="space-y-2">
    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
      {label}
    </p>
    <div className="rounded-2xl border border-white/60 bg-white/75 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-sm">
      <p className="text-[15px] font-medium text-slate-900">
        {value || "Not provided"}
      </p>
    </div>
  </div>
);

export const ErrorStateCard = ({
  title,
  message,
  action,
}: ErrorStateCardProps) => (
  <AppCard className="border-danger/20">
    <div className="flex flex-col gap-4 text-center sm:text-left">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-danger/10 text-danger sm:mx-0">
        <AlertCircle size={24} />
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-on-background">
          {title}
        </h2>
        <p className="text-sm text-on-surface-variant">
          {message}
        </p>
      </div>

      {action}
    </div>
  </AppCard>
);

export const PatientProfileSkeleton = () => (
  <div className="space-y-6">
    <div className="h-36 animate-pulse rounded-[30px] bg-gradient-to-r from-sky-100 via-white to-cyan-100 shadow-sm" />

    <div className="grid gap-6 xl:grid-cols-2">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="rounded-[30px] border border-white/30 bg-white/70 p-6 shadow-[0_15px_35px_rgba(0,0,0,0.08)] backdrop-blur-xl"
        >
          <div className="mb-6 h-6 w-44 animate-pulse rounded-full bg-slate-200" />
          <div className="grid gap-4 sm:grid-cols-2">
            {Array.from({
              length: index === 4 ? 2 : 4,
            }).map((__, fieldIndex) => (
              <div
                key={fieldIndex}
                className="space-y-2"
              >
                <div className="h-4 w-24 animate-pulse rounded-full bg-slate-200" />
                <div className="h-14 animate-pulse rounded-2xl bg-slate-100" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const ProfileToast = ({
  message,
  visible,
}: ProfileToastProps) => (
  <div
    className={cn(
      "pointer-events-none fixed right-4 top-24 z-50 w-[min(360px,calc(100vw-2rem))] transition-all duration-300",
      visible
        ? "translate-y-0 opacity-100"
        : "translate-y-2 opacity-0"
    )}
  >
    <div className="pointer-events-auto rounded-[28px] border border-white/25 bg-white/80 p-4 shadow-[0_20px_40px_rgba(15,23,42,0.12)] backdrop-blur-xl">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-success/10 text-success">
          <Shield size={18} />
        </div>

        <div className="min-w-0">
          <p className="font-semibold text-on-background">
            Profile updated
          </p>
          <p className="mt-1 text-sm text-on-surface-variant">
            {message}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export const PersonalInfoIcon = () => (
  <UserRound size={22} />
);
export const ContactInfoIcon = () => (
  <Phone size={22} />
);
export const AddressInfoIcon = () => (
  <MapPin size={22} />
);
export const EmergencyInfoIcon = () => (
  <HeartHandshake size={22} />
);
export const MedicalInfoIcon = () => (
  <Droplets size={22} />
);
export const DoctorInfoIcon = () => (
  <BriefcaseMedical size={22} />
);
