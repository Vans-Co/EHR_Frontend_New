import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  CalendarDays,
  FolderOpen,
  Pill,
  CreditCard,
  Shield,
  User,
  Settings,
  Users,
  Clock3,
  FileText,
  Building2,
  Stethoscope,
  BarChart3,
} from "lucide-react";
import type { UserRole } from "@/features/auth/types/auth.types";

export type DashboardRole = Extract<UserRole, "PATIENT" | "DOCTOR" | "ADMIN">;

export type SidebarSection =
  | "Main"
  | "Clinical"
  | "Finance"
  | "Management"
  | "Account";

export type SidebarConfigItem = {
  id: string;
  label: string;
  path: string;
  icon: LucideIcon;
  section: SidebarSection;
  badge?: string | number;
  disabled?: boolean;
};

export const sidebarConfig: Record<DashboardRole, SidebarConfigItem[]> = {
  PATIENT: [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/patient/dashboard",
      icon: LayoutDashboard,
      section: "Main",
    },
    {
      id: "appointments",
      label: "Appointments",
      path: "/patient/appointments",
      icon: CalendarDays,
      section: "Clinical",
      badge: 3,
    },
    {
      id: "medical-records",
      label: "Medical Records",
      path: "/patient/records",
      icon: FolderOpen,
      section: "Clinical",
    },
    {
      id: "prescriptions",
      label: "Prescriptions",
      path: "/patient/prescriptions",
      icon: Pill,
      section: "Clinical",
    },
    {
      id: "billing",
      label: "Billing",
      path: "/patient/billing",
      icon: CreditCard,
      section: "Finance",
    },
    {
      id: "insurance",
      label: "Insurance",
      path: "/patient/insurance",
      icon: Shield,
      section: "Finance",
    },
    {
      id: "profile",
      label: "Profile",
      path: "/patient/profile",
      icon: User,
      section: "Account",
    },
    {
      id: "settings",
      label: "Settings",
      path: "/patient/settings",
      icon: Settings,
      section: "Account",
    },
  ],

  DOCTOR: [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/doctor/dashboard",
      icon: LayoutDashboard,
      section: "Main",
    },
    {
      id: "patients",
      label: "Patients",
      path: "/doctor/patients",
      icon: Users,
      section: "Clinical",
    },
    {
      id: "appointments",
      label: "Appointments",
      path: "/doctor/appointments",
      icon: CalendarDays,
      section: "Clinical",
      badge: 5,
    },
    {
      id: "schedule",
      label: "Schedule",
      path: "/doctor/schedule",
      icon: Clock3,
      section: "Clinical",
    },
    {
      id: "prescriptions",
      label: "Prescriptions",
      path: "/doctor/prescriptions",
      icon: Pill,
      section: "Clinical",
    },
    {
      id: "reports",
      label: "Reports",
      path: "/doctor/reports",
      icon: FileText,
      section: "Clinical",
      badge: "New",
    },
    {
      id: "profile",
      label: "Profile",
      path: "/doctor/profile",
      icon: User,
      section: "Account",
    },
    {
      id: "settings",
      label: "Settings",
      path: "/doctor/settings",
      icon: Settings,
      section: "Account",
    },
  ],

  ADMIN: [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
      section: "Main",
    },
    {
      id: "users",
      label: "Users",
      path: "/admin/users",
      icon: Users,
      section: "Management",
    },
    {
      id: "doctors",
      label: "Doctors",
      path: "/admin/doctors",
      icon: Stethoscope,
      section: "Management",
    },
    {
      id: "hospitals",
      label: "Hospitals",
      path: "/admin/hospitals",
      icon: Building2,
      section: "Management",
    },
    {
      id: "departments",
      label: "Departments",
      path: "/admin/departments",
      icon: FolderOpen,
      section: "Management",
    },
    {
      id: "billing",
      label: "Billing",
      path: "/admin/billing",
      icon: CreditCard,
      section: "Finance",
    },
    {
      id: "analytics",
      label: "Analytics",
      path: "/admin/analytics",
      icon: BarChart3,
      section: "Management",
    },
    {
      id: "settings",
      label: "Settings",
      path: "/admin/settings",
      icon: Settings,
      section: "Account",
    },
  ],
};