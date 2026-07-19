import { create } from "zustand";

import type {
  Appointment,
  AppointmentFilters,
  CalendarEvent,
  DrawerMode,
} from "@/features/patient/types/appointment.types";

import {
  appointments,
  calendarEvents,
} from "@/features/patient/mock/appointment.mock";

interface AppointmentStore {
  // ==========================
  // Data
  // ==========================

  appointments: Appointment[];

  calendarEvents: CalendarEvent[];

  // ==========================
  // Filters
  // ==========================

  filters: AppointmentFilters;

  selectedDate: string;

  // ==========================
  // Selected Appointment
  // ==========================

  selectedAppointment: Appointment | null;

  // ==========================
  // Drawer
  // ==========================

  drawerOpen: boolean;

  drawerMode: DrawerMode;

  // ==========================
  // API State
  // ==========================

  loading: boolean;

  error: string | null;

  // ==========================
  // Actions
  // ==========================

  setAppointments: (
    appointments: Appointment[]
  ) => void;

  setCalendarEvents: (
    events: CalendarEvent[]
  ) => void;

  setFilters: (
    filters: Partial<AppointmentFilters>
  ) => void;

  resetFilters: () => void;

  setSelectedDate: (
    date: string
  ) => void;

  setSelectedAppointment: (
    appointment: Appointment | null
  ) => void;

  openDrawer: (
    mode: DrawerMode,
    appointment?: Appointment
  ) => void;

  closeDrawer: () => void;

  setLoading: (
    loading: boolean
  ) => void;

  setError: (
    error: string | null
  ) => void;
}

const initialFilters: AppointmentFilters = {
  search: "",
  status: "all",
  sort: "newest",
  date: "",
};

export const useAppointmentStore =
  create<AppointmentStore>((set) => ({
    // ==========================
    // Initial State
    // ==========================

    appointments,

    calendarEvents,

    filters: initialFilters,

    selectedDate: "",

    selectedAppointment: null,

    drawerOpen: false,

    drawerMode: "view",

    loading: false,

    error: null,

    // ==========================
    // Actions
    // ==========================

    setAppointments: (appointments) =>
      set({ appointments }),

    setCalendarEvents: (calendarEvents) =>
      set({ calendarEvents }),

    setFilters: (filters) =>
      set((state) => ({
        filters: {
          ...state.filters,
          ...filters,
        },
      })),

    resetFilters: () =>
      set({
        filters: initialFilters,
      }),

    setSelectedDate: (selectedDate) =>
      set({ selectedDate }),

    setSelectedAppointment: (
      selectedAppointment
    ) =>
      set({ selectedAppointment }),

    openDrawer: (
      drawerMode,
      appointment
    ) =>
      set({
        drawerOpen: true,
        drawerMode,
        selectedAppointment:
          appointment ?? null,
      }),

    closeDrawer: () =>
      set({
        drawerOpen: false,
        drawerMode: "view",
        selectedAppointment: null,
      }),

    setLoading: (loading) =>
      set({ loading }),

    setError: (error) =>
      set({ error }),
  }));