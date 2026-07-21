import {
  CalendarDays,
  CreditCard,
  FileHeart,
  FileText,
  LayoutDashboard,
  LogOut,
  Settings,
  ShieldCheck,
  Stethoscope,
  UserCircle,
  Users,
  UserRoundCog,
  Hospital,
  ClipboardList,
  Receipt,
  AlertTriangle,
  Pill,
  type LucideIcon,
} from "lucide-react";

import type { UserRole } from "@/features/auth/types/auth.types";

export interface SidebarItem {
  title: string;
  path: string;
  icon: LucideIcon;
}
export interface SidebarSection {
  title?: string;
  items: SidebarItem[];
}

export const sidebarItems: Record<UserRole, SidebarItem[]> = {
  PATIENT: [
    {
      title: "Dashboard",
      path: "/patient/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Appointments",
      path: "/patient/appointments",
      icon: CalendarDays,
    },
    {
      title: "Medical Records",
      path: "/patient/medical-records",
      icon: FileHeart,
    },
    {
      title: "Prescriptions",
      path: "/patient/prescriptions",
      icon: FileText,
    },
    
    {
      title: "Medication",
      path: "/patient/medication",
      icon: Pill,
    },
    {
      title: "Billing",
      path: "/patient/billing",
      icon: CreditCard,
    },
    {
      title: "Insurance",
      path: "/patient/insurance",
      icon: ShieldCheck,
    },
    {
      title: "Allergies",
      path: "/patient/allergies",
      icon: AlertTriangle,
    },
    {
      title: "Permissions",
      path: "/patient/permissions",
      icon: ShieldCheck,
    },
    {
      title: "Profile",
      path: "/patient/profile",
      icon: UserCircle,
    },
    {
      title: "Settings",
      path: "/patient/settings",
      icon: Settings,
    },
  ],

  DOCTOR: [
    {
      title: "Dashboard",
      path: "/doctor/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Appointments",
      path: "/doctor/appointments",
      icon: CalendarDays,
    },
    {
      title: "Patients",
      path: "/doctor/patients",
      icon: Users,
    },
    {
      title: "Availability",
      path: "/doctor/availability",
      icon: CalendarDays,
    },
    {
      title: "Medical Records",
      path: "/doctor/medical-records",
      icon: FileHeart,
    },
    {
      title: "Prescriptions",
      path: "/doctor/prescriptions",
      icon: FileText,
    },
    {
      title: "Profile",
      path: "/doctor/profile",
      icon: Stethoscope,
    },
    {
      title: "Settings",
      path: "/doctor/settings",
      icon: Settings,
    },
  ],

  ADMIN: [
    {
      title: "Dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Users",
      path: "/admin/users",
      icon: Users,
    },
    {
      title: "Doctors",
      path: "/admin/doctors",
      icon: UserRoundCog,
    },
    {
      title: "Hospitals",
      path: "/admin/hospitals",
      icon: Hospital,
    },
    {
      title: "Appointments",
      path: "/admin/appointments",
      icon: ClipboardList,
    },
    {
      title: "Billing",
      path: "/admin/billing",
      icon: Receipt,
    },
    {
      title: "Settings",
      path: "/admin/settings",
      icon: Settings,
    },
  ],
};

export const commonSidebarItems = [
  {
    title: "Logout",
    icon: LogOut,
  },
];
/*
========================================================

Future Common Navigation

Help

Support

Feedback

About

Logout

========================================================

Future Patient

Telemedicine

Health Goals

Vaccination

========================================================

Future Doctor

Availability

Schedules

Consultations

========================================================

Future Admin

Analytics

Reports

Departments

========================================================
*/
