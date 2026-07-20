import AppointmentHero from "@/features/patient/components/Appointments/AppointmentHero";
import AppointmentFilters from "@/features/patient/components/Appointments/AppointmentFilters";
import AppointmentList from "@/features/patient/components/Appointments/AppointmentList";
import AppointmentDrawer from "@/features/patient/components/Appointments/AppointmentDrawer";
import AppointmentTrendCard from "@/features/patient/components/Appointments/AppointmentTrends";

import useAppointments from "@/hooks/useAppointments";

const trendData = [
  {
    month: "Jan",
    appointments: 6,
  },
  {
    month: "Feb",
    appointments: 9,
  },
  {
    month: "Mar",
    appointments: 7,
  },
  {
    month: "Apr",
    appointments: 11,
  },
  {
    month: "May",
    appointments: 13,
  },
  {
    month: "Jun",
    appointments: 10,
  },
];

const Appointments = () => {
  const {
    // Data
    stats,
    calendarEvents,
    filteredAppointments,

    // Calendar
    selectedDate,
    setSelectedDate,

    // Filters
    filters,
    setFilters,

    // Drawer
    drawerOpen,
    drawerMode,
    selectedAppointment,

    openCreateDrawer,
    openViewDrawer,
    openEditDrawer,
    closeDrawer,

    // CRUD
    createAppointment,
    updateAppointment,
    cancelAppointment,

    // Loading
    loading,
  } = useAppointments();

  return (
    <div className="space-y-8">

      {/* ================= Hero ================= */}

      <AppointmentHero
        stats={stats}
        events={calendarEvents}
        selectedDate={selectedDate}
        nextAppointment={filteredAppointments.find(
          (appointment) =>
            appointment.status === "Upcoming" ||
            appointment.status === "Rescheduled"
        )}
        onBookAppointment={openCreateDrawer}
        onDateSelect={setSelectedDate}
        onViewDetails={(id) => {
          const appointment =
            filteredAppointments.find(
              (item) => item.id === id
            );

          if (appointment) {
            openViewDrawer(appointment);
          }
        }}
        onReschedule={(id) => {
          const appointment =
            filteredAppointments.find(
              (item) => item.id === id
            );

          if (appointment) {
            openEditDrawer(appointment);
          }
        }}
      />

      {/* ================= Filters ================= */}

      <AppointmentFilters
        filters={filters}
        onSearchChange={(value) =>
          setFilters({ search: value })
        }
        onStatusChange={(value) =>
          setFilters({ status: value })
        }
        onSortChange={(value) =>
          setFilters({ sort: value })
        }
        onDateChange={(value) =>
          setFilters({ date: value })
        }
      />

      {/* ================= Appointment List ================= */}

      <AppointmentList
        appointments={filteredAppointments}
        onViewDetails={(id) => {
          const appointment =
            filteredAppointments.find(
              (item) => item.id === id
            );

          if (appointment) {
            openViewDrawer(appointment);
          }
        }}
        onReschedule={(id) => {
          const appointment =
            filteredAppointments.find(
              (item) => item.id === id
            );

          if (appointment) {
            openEditDrawer(appointment);
          }
        }}
        onCancel={cancelAppointment}
      />

      {/* ================= Trend ================= */}

      <AppointmentTrendCard
        data={trendData}
      />

      {/* ================= Drawer ================= */}

      <AppointmentDrawer
        open={drawerOpen}
        mode={drawerMode}
        appointment={selectedAppointment}
        loading={loading}
        onClose={closeDrawer}
        onSubmit={(data) => {
          if (drawerMode === "create") {
            createAppointment(data);
          } else if (
            drawerMode === "edit" &&
            selectedAppointment
          ) {
            updateAppointment(
              selectedAppointment.id,
              data
            );
          }
        }}
      />
    </div>
  );
};

export default Appointments;