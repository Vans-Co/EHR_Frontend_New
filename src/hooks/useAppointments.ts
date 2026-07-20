import { useCallback, useEffect, useMemo } from "react";

import { appointmentService } from "@/features/patient/services/appointment.service";

import { useAppointmentStore } from "@/store/appointmentStore";

import type {
  Appointment,
  AppointmentStats,
  AppointmentStatus,
  CalendarEvent,
  DrawerMode,
  AppointmentFormData,
} from "@/features/patient/types/appointment.types";

export const useAppointments = () => {
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
    setCalendarEvents,

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

  const refreshAppointments =
    useCallback(async () => {
      try {
        setLoading(true);

        /*
        Later

        const data =
          await appointmentService.getAppointments();

        setAppointments(data);

        */

        setAppointments([...appointments]);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load appointments."
        );
      } finally {
        setLoading(false);
      }
    }, [
      appointments,

      setAppointments,
      setLoading,
      setError,
    ]);

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
    async (
      formData: AppointmentFormData
    ) => {
      try {
        setLoading(true);

        /*
        Future API

        const appointment =
          await appointmentService.createAppointment(formData);

        setAppointments([...appointments, appointment]);
        */

        const newAppointment: Appointment = {
          id: crypto.randomUUID(),

          doctorName: formData.doctorName,
          specialization: formData.specialization,

          hospital: formData.hospital,
          location: formData.location,

          date: formData.date,
          time: formData.time,

          appointmentType:
            formData.appointmentType,

          reason: formData.reason,

          status: "Upcoming",

          notes: formData.notes,

          prescriptionAvailable: false,

          reportsRequired: false,

          insuranceRequired: false,
        };

        setAppointments([
          newAppointment,
          ...appointments,
        ]);

        closeDrawer();
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to create appointment."
        );
      } finally {
        setLoading(false);
      }
    },
    [
      appointments,

      setAppointments,

      setLoading,

      setError,

      closeDrawer,
    ]
  );

  /*
  ========================================
  Update Appointment
  ========================================
  */

  const updateAppointment = useCallback(
    async (
      id: string,
      formData: AppointmentFormData
    ) => {
      try {
        setLoading(true);

        /*
        await appointmentService.updateAppointment(id, formData);
        */

        const updated =
          appointments.map((appointment) =>
            appointment.id === id
              ? {
                  ...appointment,

                  doctorName:
                   formData.doctorName,

                 specialization:
                   formData.specialization,

                 hospital:
                    formData.hospital,

                location:
                    formData.location,

                date: formData.date,

                time: formData.time,

                appointmentType:
                formData.appointmentType,

                reason:
                  formData.reason,

                notes:
                  formData.notes,
                }
              : appointment
          );

        setAppointments(updated);

        closeDrawer();
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to update appointment."
        );
      } finally {
        setLoading(false);
      }
    },
    [
      appointments,

      setAppointments,

      setLoading,

      setError,

      closeDrawer,
    ]
  );

  /*
  ========================================
  Cancel Appointment
  ========================================
  */

  const cancelAppointment =
    useCallback(
      async (id: string) => {
        try {
          setLoading(true);

          /*
          await appointmentService.cancelAppointment(id);
          */

          const updated =
            appointments.map(
              (appointment) =>
                appointment.id === id
                  ? {
                      ...appointment,
                      status:
                        "Cancelled" as AppointmentStatus,
                    }
                  : appointment
            );

          setAppointments(updated);
        } catch (err) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to cancel appointment."
          );
        } finally {
          setLoading(false);
        }
      },
      [
        appointments,

        setAppointments,

        setLoading,

        setError,
      ]
    );

  /*
  ========================================
  Reschedule Appointment
  ========================================
  */

  const rescheduleAppointment =
    useCallback(
      async (
        id: string,
        date: string,
        time: string
      ) => {
        try {
          setLoading(true);

          /*
          await appointmentService.rescheduleAppointment(
              id,
              date,
              time
          );
          */

          const updated =
            appointments.map(
              (appointment) =>
                appointment.id === id
                  ? {
                      ...appointment,

                      date,

                      time,

                      status:
                        "Rescheduled" as AppointmentStatus,
                    }
                  : appointment
            );

          setAppointments(updated);

          closeDrawer();
        } catch (err) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to reschedule appointment."
          );
        } finally {
          setLoading(false);
        }
      },
      [
        appointments,

        setAppointments,

        setLoading,

        setError,

        closeDrawer,
      ]
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