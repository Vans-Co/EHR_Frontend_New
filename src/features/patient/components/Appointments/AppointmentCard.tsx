import {
  CalendarDays,
  ChevronRight,
  Clock3,
  Hospital,
  MapPin,
  RotateCcw,
  Video,
  XCircle,
} from "lucide-react";

import type {
  Appointment,
} from "../../types/appointment.types";

import {
  STATUS_STYLES,
} from "./appointment.constants";

interface AppointmentCardProps {
  appointment: Appointment;

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

const AppointmentCard = ({
  appointment,
  onViewDetails,
  onReschedule,
  onCancel,
}: AppointmentCardProps) => {

  const doctorInitials =
    appointment.doctorName
      .split(" ")
      .map((word) => word[0])
      .slice(0, 2)
      .join("");

  return (

    <article
      className="
        group
        relative
        overflow-hidden
        rounded-[30px]
        border
        border-white/30
        bg-gradient-to-br
        from-cyan-500/5
        via-white/75
        to-violet-500/5
        p-5
        shadow-[0_15px_40px_rgba(15,23,42,.06)]
        backdrop-blur-2xl
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-[0_20px_45px_rgba(15,23,42,.10)]
      "
    >

      {/* Background Glow */}

      <div
        className="
          absolute
          -right-16
          -top-16
          h-40
          w-40
          rounded-full
          bg-cyan-400/10
          blur-3xl
        "
      />

      <div
        className="
          absolute
          -bottom-16
          -left-16
          h-36
          w-36
          rounded-full
          bg-violet-400/10
          blur-3xl
        "
      />

      <div className="relative">

        {/* Header */}

        <div className="flex items-start justify-between">

          <div className="flex gap-4">

            {/* Avatar */}

            <div
              className="
                flex
                h-14
                w-14
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-br
                from-cyan-400
                to-violet-500
                text-lg
                font-bold
                text-white
                shadow-lg
              "
            >
              {doctorInitials}
            </div>

            <div>

              <h3
                className="
                  text-lg
                  font-bold
                  text-on-background
                "
              >
                {appointment.doctorName}
              </h3>

              <p
                className="
                  mt-1
                  font-medium
                  text-primary
                "
              >
                {appointment.specialization}
              </p>

              <div
                className="
                  mt-3
                  flex
                  flex-wrap
                  gap-2
                "
              >

                <span
                  className="
                    rounded-full
                    border
                    border-cyan-300/30
                    bg-cyan-500/10
                    px-3
                    py-1
                    text-[11px]
                    font-semibold
                    text-cyan-700
                  "
                >
                  <span className="inline-flex items-center gap-1">

                    {appointment.appointmentType ===
                    "Video Consultation" ? (
                      <Video size={12} />
                    ) : (
                      <MapPin size={12} />
                    )}

                    {appointment.appointmentType}

                  </span>
                </span>

                <span
                  className={`
                    rounded-full
                    border
                    px-3
                    py-1
                    text-[11px]
                    font-semibold
                    backdrop-blur-xl
                    ${STATUS_STYLES[appointment.status]}
                  `}
                >
                  {appointment.status}
                </span>

                {appointment.tokenNumber != null && (
                  <span
                    className="
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

            </div>

          </div>

        </div>

        {/* Compact Information */}

        <div
          className="
            mt-5
            space-y-2
          "
        >
                    {/* Date + Time */}

          <InfoRow
            leftIcon={
              <CalendarDays
                size={16}
              />
            }
            leftLabel="Date"
            leftValue={appointment.date}
            rightIcon={
              <Clock3
                size={16}
              />
            }
            rightLabel="Time"
            rightValue={appointment.time}
          />

          {/* Hospital + Consultation */}

          <InfoRow
            leftIcon={
              <Hospital
                size={16}
              />
            }
            leftLabel="Hospital"
            leftValue={appointment.hospital}
            rightIcon={
              appointment.appointmentType ===
              "Video Consultation"
                ? (
                  <Video
                    size={16}
                  />
                )
                : (
                  <MapPin
                    size={16}
                  />
                )
            }
            rightLabel="Consultation"
            rightValue={
              appointment.appointmentType
            }
          />

        </div>

        {/* Progress Accent */}

        <div className="mt-5">

          <div
            className="
              h-1.5
              overflow-hidden
              rounded-full
              bg-slate-200/70
            "
          >

            <div
              className="
                h-full
                w-full
                rounded-full
                bg-gradient-to-r
                from-cyan-400
                via-sky-400
                to-violet-400
              "
            />

          </div>

        </div>

        {/* Actions */}

        <div
          className="
            mt-5
            flex
            flex-wrap
            gap-3
          "
        >

          <button
            onClick={() =>
              onViewDetails?.(
                appointment.id
              )
            }
            className="
              flex-1
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-2xl
              bg-gradient-to-r
              from-cyan-500
              to-violet-500
              px-4
              py-3
              text-sm
              font-medium
              text-white
              shadow-lg
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:shadow-xl
            "
          >

            View Details

            <ChevronRight
              size={17}
            />

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
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  border
                  border-cyan-300/30
                  bg-cyan-500/10
                  px-4
                  py-3
                  text-sm
                  font-medium
                  text-cyan-700
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-cyan-500/20
                "
              >
                <RotateCcw size={17} />

                Reschedule
              </button>

              {/* Cancel */}

              <button
                onClick={() =>
                  onCancel?.(
                    appointment.id
                  )
                }
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  border
                  border-red-300/40
                  bg-red-500/10
                  px-4
                  py-3
                  text-sm
                  font-medium
                  text-red-600
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-red-500/20
                "
              >
                <XCircle size={17} />

                Cancel
              </button>

            </>
          )}

        </div>

      </div>

    </article>

  );

};

interface InfoRowProps {
  leftIcon: React.ReactNode;
  leftLabel: string;
  leftValue: string;

  rightIcon: React.ReactNode;
  rightLabel: string;
  rightValue: string;
}

const InfoRow = ({
  leftIcon,
  leftLabel,
  leftValue,
  rightIcon,
  rightLabel,
  rightValue,
}: InfoRowProps) => (

  <div
    className="
      flex
      items-center
      justify-between
      rounded-2xl
      border
      border-white/30
      bg-white/45
      px-4
      py-3
      backdrop-blur-xl
    "
  >

    <div className="flex items-center gap-2">

      <div className="text-cyan-600">
        {leftIcon}
      </div>

      <div>

        <p className="text-[11px] text-on-surface-variant">
          {leftLabel}
        </p>

        <p className="text-sm font-medium text-on-background">
          {leftValue}
        </p>

      </div>

    </div>

    <div className="h-8 w-px bg-slate-200/80" />

    <div className="flex items-center gap-2">

      <div className="text-violet-600">
        {rightIcon}
      </div>

      <div>

        <p className="text-[11px] text-on-surface-variant">
          {rightLabel}
        </p>

        <p className="text-sm font-medium text-on-background">
          {rightValue}
        </p>

      </div>

    </div>

  </div>

);

export default AppointmentCard;