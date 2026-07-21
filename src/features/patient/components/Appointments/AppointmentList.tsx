import {
  CalendarDays,
  ChevronRight,
  Clock3,
  RotateCcw,
  XCircle,
} from "lucide-react";

import type {
  Appointment,
} from "../../types/appointment.types";

import {
  STATUS_STYLES,
} from "./appointment.constants";

import AppointmentCard from "./AppointmentCard";
import EmptyAppointments from "./EmptyAppointments";

interface AppointmentListProps {
  appointments: Appointment[];

  onViewDetails?: (
    id: string
  ) => void;

  onReschedule?: (
    id: string
  ) => void;

  onCancel?: (
    id: string
  ) => void;
}

const AppointmentList = ({
  appointments,
  onViewDetails,
  onReschedule,
  onCancel,
}: AppointmentListProps) => {

  if (!appointments.length) {
    return <EmptyAppointments />;
  }

  return (
    <>

      {/* ================= Mobile ================= */}

      <div className="space-y-5 lg:hidden">

        {appointments.map((appointment) => (

          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            onViewDetails={onViewDetails}
            onReschedule={onReschedule}
            onCancel={onCancel}
          />

        ))}

      </div>

      {/* ================= Desktop ================= */}

      <section
        className="
          relative
          hidden
          overflow-hidden
          rounded-[30px]
          border
          border-white/30
          bg-gradient-to-br
          from-cyan-500/5
          via-white/75
          to-violet-500/5
          shadow-[0_18px_45px_rgba(15,23,42,.06)]
          backdrop-blur-2xl
          lg:block
        "
      >

        {/* Ambient Glow */}

        <div
          className="
            absolute
            -right-24
            -top-24
            h-56
            w-56
            rounded-full
            bg-cyan-400/10
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -bottom-20
            -left-20
            h-48
            w-48
            rounded-full
            bg-violet-400/10
            blur-3xl
          "
        />

        <div className="relative">

          {/* Header */}

          <div
            className="
              flex
              items-center
              justify-between
              border-b
              border-white/20
              px-8
              py-6
            "
          >

            <div className="flex items-center gap-4">

              <div
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-br
                  from-cyan-400
                  to-violet-400
                  shadow-lg
                "
              >

                <CalendarDays
                  size={24}
                  className="text-white"
                />

              </div>

              <div>

                <h2
                  className="
                    text-xl
                    font-bold
                    text-on-background
                  "
                >
                  Appointment History
                </h2>

                <p
                  className="
                    mt-1
                    text-sm
                    text-on-surface-variant
                  "
                >
                  Review your previous and upcoming appointments
                </p>

              </div>

            </div>

            <div
              className="
                rounded-2xl
                border
                border-cyan-200/30
                bg-cyan-500/10
                px-4
                py-2
                backdrop-blur-xl
              "
            >

              <p
                className="
                  text-xs
                  text-on-surface-variant
                "
              >
                Total
              </p>

              <p
                className="
                  text-lg
                  font-bold
                  text-primary
                "
              >
                {appointments.length}
              </p>

            </div>

          </div>

          {/* Table */}

          <div className="overflow-x-auto px-5 py-5">

            <table
              className="
                min-w-full
                border-separate
                border-spacing-y-3
              "
            >

              <thead>

                <tr>

                  <th className="px-5 pb-2 text-left text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                    Doctor
                  </th>

                  <th className="px-4 pb-2 text-left text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                    Date
                  </th>

                  <th className="px-4 pb-2 text-left text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                    Time
                  </th>

                  <th className="px-4 pb-2 text-left text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                    Type
                  </th>

                  <th className="px-4 pb-2 text-left text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                    Status
                  </th>

                  <th className="px-6 pb-2 text-right text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>
                              {appointments.map((appointment) => (

                <tr
                  key={appointment.id}
                  className="
                    group
                    transition-all
                    duration-300
                  "
                >

                  <td
                    colSpan={6}
                    className="p-0"
                  >

                    <div
                      className="
                        flex
                        items-center
                        rounded-[24px]
                        border
                        border-white/30
                        bg-white/55
                        backdrop-blur-xl
                        transition-all
                        duration-300
                        hover:-translate-y-0.5
                        hover:border-cyan-200/40
                        hover:bg-white/70
                        hover:shadow-[0_16px_40px_rgba(15,23,42,.08)]
                      "
                    >

                      {/* Doctor */}

                      <div className="flex w-[34%] items-center gap-4 px-5 py-5">

                        <div
                          className="
                            flex
                            h-12
                            w-12
                            items-center
                            justify-center
                            rounded-2xl
                            bg-gradient-to-br
                            from-cyan-400
                            to-violet-500
                            text-sm
                            font-bold
                            text-white
                            shadow-lg
                          "
                        >
                          {appointment.doctorName
                            .split(" ")
                            .map((word) => word[0])
                            .slice(0, 2)
                            .join("")}
                        </div>

                        <div>

                          <p
                            className="
                              font-semibold
                              text-on-background
                            "
                          >
                            {appointment.doctorName}
                          </p>

                          <p
                            className="
                              mt-1
                              text-sm
                              text-primary
                            "
                          >
                            {appointment.specialization}
                          </p>

                        </div>

                        {appointment.tokenNumber != null && (
                          <span
                            className="
                              ml-auto
                              shrink-0
                              rounded-full
                              border
                              border-violet-300/30
                              bg-violet-500/10
                              px-3
                              py-1
                              text-[11px]
                              font-semibold
                              text-violet-700
                            "
                          >
                            Token #{appointment.tokenNumber}
                          </span>
                        )}

                      </div>

                      {/* Date */}

                      <div className="flex w-[16%] items-center gap-2 px-3">

                        <CalendarDays
                          size={16}
                          className="text-cyan-600"
                        />

                        <span className="text-sm">
                          {appointment.date}
                        </span>

                      </div>

                      {/* Time */}

                      <div className="flex w-[14%] items-center gap-2 px-3">

                        <Clock3
                          size={16}
                          className="text-violet-600"
                        />

                        <span className="text-sm">
                          {appointment.time}
                        </span>

                      </div>

                      {/* Type */}

                      <div className="w-[16%] px-3">

                        <span
                          className={`
                            inline-flex
                            rounded-full
                            border
                            px-3
                            py-1.5
                            text-xs
                            font-semibold
                            backdrop-blur-xl

                            ${
                              appointment.appointmentType ===
                              "Video Consultation"
                                ? `
                                  border-violet-300/30
                                  bg-violet-500/10
                                  text-violet-700
                                `
                                : `
                                  border-cyan-300/30
                                  bg-cyan-500/10
                                  text-cyan-700
                                `
                            }
                          `}
                        >
                          {appointment.appointmentType}
                        </span>

                      </div>

                      {/* Status */}

                      <div className="w-[12%] px-3">

                        <span
                          className={`
                            rounded-full
                            border
                            px-4
                            py-2
                            text-xs
                            font-semibold
                            shadow-sm
                            ${STATUS_STYLES[appointment.status]}
                          `}
                        >
                          {appointment.status}
                        </span>

                      </div>

                      {/* Actions */}

                      <div className="ml-auto flex items-center gap-2 px-5">
                                                {/* View */}

                        <button
                          onClick={() =>
                            onViewDetails?.(
                              appointment.id
                            )
                          }
                          className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-2xl
                            bg-gradient-to-r
                            from-cyan-500
                            to-violet-500
                            text-white
                            shadow-lg
                            transition-all
                            duration-300
                            hover:-translate-y-0.5
                            hover:shadow-xl
                          "
                        >
                          <ChevronRight size={18} />
                        </button>

                        {(appointment.status ===
                          "Upcoming" ||
                          appointment.status ===
                            "Rescheduled") && (
                          <>
                            {/* Reschedule */}

                            <button
                              onClick={() =>
                                onReschedule?.(
                                  appointment.id
                                )
                              }
                              className="
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-2xl
                                border
                                border-cyan-300/30
                                bg-cyan-500/10
                                text-cyan-700
                                backdrop-blur-xl
                                transition-all
                                duration-300
                                hover:-translate-y-0.5
                                hover:bg-cyan-500/20
                              "
                            >
                              <RotateCcw size={17} />
                            </button>

                            {/* Cancel */}

                            <button
                              onClick={() =>
                                onCancel?.(
                                  appointment.id
                                )
                              }
                              className="
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-2xl
                                border
                                border-red-300/40
                                bg-red-500/10
                                text-red-600
                                backdrop-blur-xl
                                transition-all
                                duration-300
                                hover:-translate-y-0.5
                                hover:bg-red-500/20
                              "
                            >
                              <XCircle size={17} />
                            </button>
                          </>
                        )}

                      </div>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </section>

    </>

  );

};

export default AppointmentList;