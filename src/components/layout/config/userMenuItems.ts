import {
  User,
  HeartPulse,
  Settings,
  Shield,
  type LucideIcon,
} from "lucide-react";

export interface MenuItem {
  label: string;
  icon: LucideIcon;
  path: string;
}

export const patientMenuItems: MenuItem[] = [
  {
    label: "My Profile",
    icon: User,
    path: "/patient/profile",
  },

  {
    label: "Medical Profile",
    icon: HeartPulse,
    path: "/patient/medical-records",
  },

  {
    label: "Settings",
    icon: Settings,
    path: "/patient/settings",
  },

  {
    label: "Privacy",
    icon: Shield,
    path: "/patient/privacy",
  },
];

/*
Future Expansion

export const doctorMenuItems: MenuItem[] = [
  ...
];

export const adminMenuItems: MenuItem[] = [
  ...
];
*/