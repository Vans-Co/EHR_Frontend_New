import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  appointmentService,
  dtoToAppointment,
} from "@/features/patient/services/appointment.service";

import { useAppointmentStore } from "@/store/appointmentStore";
import { useAuthStore } from "@/store/authStore";

import type {
  Appointment,
  AppointmentStats,
  CalendarEvent,
  AppointmentFormData,
  Doctor,
} from "@/features/patient/types/appointment.types";

const errMsg = (err: unknown, fallback: string) => {
  const axiosMsg = (err as { response?: { data?: unknown } })?.response?.data;
  if (typeof axiosMsg === "string" && axiosMsg) return axiosMsg;
  return err instanceof Error ? err.message : fallback;
};

export const useAppointments = () => {
  const ehrId = useAuthStore((state) => state.user?.ehrId);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const doctorsRef = useRef<Doctor[]>([]);

  const {
    appointments,
    calendarEvents,

    filters,
    selectedDate,

    selectedAppointment,

    drawerOpen,
    drawerMode,

    loading,
    error,

    setAppointments,

    setFilters,
    resetFilters,

    setSelectedDate,

    setSelectedAppointment,

    openDrawer,
    closeDrawer,

    setLoading,
    setError,
  } = useAppointmentStore();

  /*
  ========================================
  Refresh Appointments
  ========================================
  */

  const refreshAppointments = useCallback(async () => {
    if (!ehrId) return;
    try {
      setLoading(true);

      // load doctors once so appointments can show doctor name/specialization
      let docs = doctorsRef.current;
      if (!docs.length) {
        docs = await appointmentService.getDoctors();
        doctorsRef.current = docs;
        setDoctors(docs);
      }
      const byId: Record<string, Doctor> = {};
      docs.forEach((d) => {
        if (d.id) byId[d.id] = d;
      });

      const dtos = await appointmentService.getAppointments(ehrId);
      setAppointments(dtos.map((dto) => dtoToAppointment(dto, byId)));
    } catch (err) {
      setError(errMsg(err, "Unable to load appointments."));
    } finally {
      setLoading(false);
    }
  }, [ehrId, setAppointments, setLoading, setError]);

  const resolveDoctorId = useCallback(
    (name: string) => doctorsRef.current.find((d) => d.name === name)?.id ?? "",
    []
  );

  useEffect(() => {
    refreshAppointments();
  }, [refreshAppointments]);
    /*
  ========================================
  Filtered Appointments
  ========================================
  */

  const filteredAppointments = useMemo(() => {
    let data = [...appointments];

    // Search
    if (filters.search.trim()) {
      const keyword = filters.search.toLowerCase();

      data = data.filter((appointment) =>
        [
          appointment.doctorName,
          appointment.specialization,
          appointment.hospital,
          appointment.location,
          appointment.reason,
        ]
          .join(" ")
          .toLowerCase()
          .includes(keyword)
      );
    }

    // Status Filter
    if (filters.status !== "all") {
      data = data.filter(
        (appointment) =>
          appointment.status === filters.status
      );
    }

    // Calendar Date Filter
    const activeDate =
      selectedDate || filters.date;

    if (activeDate) {
      data = data.filter(
        (appointment) =>
          appointment.date === activeDate
      );
    }

    // Sorting
    switch (filters.sort) {
      case "doctor":
        data.sort((a, b) =>
          a.doctorName.localeCompare(
            b.doctorName
          )
        );
        break;

      case "status":
        data.sort((a, b) =>
          a.status.localeCompare(b.status)
        );
        break;

      case "oldest":
        data.sort(
          (a, b) =>
            new Date(a.date).getTime() -
            new Date(b.date).getTime()
        );
        break;

      case "newest":
      default:
        data.sort(
          (a, b) =>
            new Date(b.date).getTime() -
            new Date(a.date).getTime()
        );
        break;
    }

    return data;
  }, [
    appointments,
    filters,
    selectedDate,
  ]);

  /*
  ========================================
  Statistics
  ========================================
  */

  const stats: AppointmentStats =
    useMemo(
      () => ({
        upcoming: appointments.filter(
          (appointment) =>
            appointment.status ===
            "Upcoming"
        ).length,

        completed: appointments.filter(
          (appointment) =>
            appointment.status ===
            "Completed"
        ).length,

        cancelled: appointments.filter(
          (appointment) =>
            appointment.status ===
            "Cancelled"
        ).length,

        rescheduled: appointments.filter(
          (appointment) =>
            appointment.status ===
            "Rescheduled"
        ).length,
      }),
      [appointments]
    );
    /*
========================================
Next Appointment
========================================
*/

const nextAppointment = useMemo(() => {
  const now = new Date();

  return (
    appointments
      .filter(
        (appointment) =>
          (appointment.status === "Upcoming" ||
            appointment.status === "Rescheduled") &&
          new Date(
            `${appointment.date} ${appointment.time}`
          ) >= now
      )
      .sort(
        (a, b) =>
          new Date(
            `${a.date} ${a.time}`
          ).getTime() -
          new Date(
            `${b.date} ${b.time}`
          ).getTime()
      )[0] ?? null
  );
}, [appointments]);

  /*
  ========================================
  Calendar Events
  ========================================
  */

  const derivedCalendarEvents: CalendarEvent[] =
    useMemo(() => {
      if (calendarEvents.length) {
        return calendarEvents;
      }

      return appointments.map(
        (appointment) => ({
          id: appointment.id,

          title: appointment.doctorName,

          date: appointment.date,

          status: appointment.status,
        })
      );
    }, [
      appointments,
      calendarEvents,
    ]);
      /*
  ========================================
  Drawer Actions
  ========================================
  */

  const openCreateDrawer = useCallback(() => {
    openDrawer("create");
  }, [openDrawer]);

  const openEditDrawer = useCallback(
    (appointment: Appointment) => {
      openDrawer("edit", appointment);
    },
    [openDrawer]
  );

  const openViewDrawer = useCallback(
    (appointment: Appointment) => {
      openDrawer("view", appointment);
    },
    [openDrawer]
  );

  /*
  ========================================
  Create Appointment
  ========================================
  */

  const createAppointment = useCallback(
    async (formData: AppointmentFormData) => {
      if (!ehrId) return;
      const doctorId = resolveDoctorId(formData.doctorName);
      if (!doctorId) {
        setError("Please select a valid doctor.");
        return;
      }
      try {
        setLoading(true);
        await appointmentService.createAppointment(formData, ehrId, doctorId);
        closeDrawer();
        await refreshAppointments();
      } catch (err) {
        setError(errMsg(err, "Unable to create appointment."));
      } finally {
        setLoading(false);
      }
    },
    [ehrId, resolveDoctorId, refreshAppointments, closeDrawer, setLoading, setError]
  );

  /*
  ========================================
  Update Appointment
  ========================================
  */

  const updateAppointment = useCallback(
    async (id: string, formData: AppointmentFormData) => {
      if (!ehrId) return;
      const doctorId = resolveDoctorId(formData.doctorName);
      if (!doctorId) {
        setError("Please select a valid doctor.");
        return;
      }
      try {
        setLoading(true);
        await appointmentService.rescheduleAppointment(id, formData, ehrId, doctorId);
        closeDrawer();
        await refreshAppointments();
      } catch (err) {
        setError(errMsg(err, "Unable to update appointment."));
      } finally {
        setLoading(false);
      }
    },
    [ehrId, resolveDoctorId, refreshAppointments, closeDrawer, setLoading, setError]
  );

  /*
  ========================================
  Cancel Appointment
  ========================================
  */

  const cancelAppointment = useCallback(
    async (id: string) => {
      try {
        setLoading(true);
        await appointmentService.cancelAppointment(id);
        await refreshAppointments();
      } catch (err) {
        setError(errMsg(err, "Unable to cancel appointment."));
      } finally {
        setLoading(false);
      }
    },
    [refreshAppointments, setLoading, setError]
  );

  /*
  ========================================
  Reschedule Appointment
  ========================================
  */

  const rescheduleAppointment = useCallback(
    async (id: string, date: string, time: string) => {
      if (!ehrId) return;
      const existing = appointments.find((a) => a.id === id);
      if (!existing) return;
      const doctorId = resolveDoctorId(existing.doctorName);
      try {
        setLoading(true);
        await appointmentService.rescheduleAppointment(
          id,
          { ...existing, date, time } as AppointmentFormData,
          ehrId,
          doctorId
        );
        closeDrawer();
        await refreshAppointments();
      } catch (err) {
        setError(errMsg(err, "Unable to reschedule appointment."));
      } finally {
        setLoading(false);
      }
    },
    [ehrId, appointments, resolveDoctorId, refreshAppointments, closeDrawer, setLoading, setError]
  );
      /*
  ========================================
  Return
  ========================================
  */

  return {
    // ==========================
    // Data
    // ==========================

   appointments,

doctors,

filteredAppointments,

stats,

nextAppointment,

calendarEvents: derivedCalendarEvents,

    // ==========================
    // UI State
    // ==========================

    loading,

    error,

    // ==========================
    // Filters
    // ==========================

    filters,

    setFilters,

    resetFilters,

    // ==========================
    // Calendar
    // ==========================

    selectedDate,

    setSelectedDate,

    // ==========================
    // Selected Appointment
    // ==========================

    selectedAppointment,

    setSelectedAppointment,

    // ==========================
    // Drawer
    // ==========================

    drawerOpen,

    drawerMode,

    openCreateDrawer,

    openEditDrawer,

    openViewDrawer,

    closeDrawer,

    // ==========================
    // CRUD
    // ==========================

    createAppointment,

    updateAppointment,

    cancelAppointment,

    rescheduleAppointment,

    // ==========================
    // Utilities
    // ==========================

    refreshAppointments,
  };
};

export default useAppointments;