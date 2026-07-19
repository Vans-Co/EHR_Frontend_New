import { useMemo, useState } from "react";

import {
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  Hospital,
  MapPin,
  RotateCcw,
  Video,
} from "lucide-react";

import type { Appointment } from "../../types/appointment.types";

interface AppointmentPreparationCardProps {
  appointment?: Appointment;

  onViewDetails?: (id: string) => void;

  onReschedule?: (id: string) => void;
}

const AppointmentPreparationCard = ({
  appointment,
  onViewDetails,
  onReschedule,
}: AppointmentPreparationCardProps) => {

  if (!appointment) {
    return (
      <section
        className="
          flex
          h-full
          items-center
          justify-center
          rounded-[30px]
          border
          border-white/30
          bg-white/70
          p-8
          backdrop-blur-xl
        "
      >
        <div className="text-center">

          <CalendarDays
            size={42}
            className="mx-auto text-primary"
          />

          <h3 className="mt-4 text-lg font-bold">
            No Upcoming Appointment
          </h3>

          <p className="mt-2 text-sm text-on-surface-variant">
            Book an appointment to see it here.
          </p>

        </div>
      </section>
    );
  }


  const [checklist, setChecklist] =
    useState([
      {
        id: 1,
        label: "Insurance Card",
        done: appointment.insuranceRequired,
      },
      {
        id: 2,
        label: "Previous Reports",
        done: appointment.reportsRequired,
      },
      {
        id: 3,
        label: "Valid ID",
        done: true,
      },
      {
        id: 4,
        label: "Reach Early",
        done: true,
      },
    ]);


  const completed = useMemo(
    () =>
      checklist.filter(
        (item) => item.done
      ).length,
    [checklist]
  );


  const progress =
    Math.round(
      (completed / checklist.length) * 100
    );


  const toggleChecklist = (
    id:number
  ) => {

    setChecklist((prev)=>
      prev.map((item)=>
        item.id === id
        ? {
            ...item,
            done: !item.done
          }
        : item
      )
    );

  };


  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-[30px]
        border
        border-white/30
        bg-gradient-to-br
        from-cyan-500/5
        via-white/75
        to-violet-500/5
        px-6
        py-5
        shadow-[0_15px_40px_rgba(15,23,42,.06)]
        backdrop-blur-2xl
      "
    >

      {/* Glow */}

      <div
        className="
          absolute
          -right-20
          -top-20
          h-44
          w-44
          rounded-full
          bg-cyan-400/15
          blur-3xl
        "
      />


      <div className="relative">


        {/* Header */}

        <div
          className="
            flex
            items-start
            justify-between
          "
        >

          <div>

            <p
              className="
                text-[11px]
                uppercase
                tracking-[0.18em]
                text-on-surface-variant
              "
            >
              Upcoming Visit
            </p>


            <h3
              className="
                mt-1
                text-xl
                font-bold
                text-on-background
              "
            >
              {appointment.doctorName}
            </h3>


            <div
              className="
                mt-2
                flex
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
                {appointment.specialization}
              </span>


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
                {appointment.appointmentType}
              </span>

            </div>

          </div>



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
              to-violet-400
              shadow-lg
            "
          >

            <CalendarDays
              size={22}
              className="text-white"
            />

          </div>


        </div>


        {/* Compact Info */}

        <div
          className="
            mt-4
            space-y-2
          "
        >

          <InfoRow
            leftIcon={<CalendarDays size={16}/>}
            leftLabel="Date"
            leftValue={appointment.date}
            rightIcon={<Clock3 size={16}/>}
            rightLabel="Time"
            rightValue={appointment.time}
          />


          <InfoRow
            leftIcon={<Hospital size={16}/>}
            leftLabel="Hospital"
            leftValue={appointment.hospital}
            rightIcon={
              appointment.appointmentType === "Video Consultation"
              ?
              <Video size={16}/>
              :
              <MapPin size={16}/>
            }
            rightLabel="Type"
            rightValue={appointment.appointmentType}
          />

        </div>
                {/* Preparation */}

        <div className="mt-5">

          <div className="mb-3 flex items-center justify-between">

            <h4 className="font-semibold text-on-background">
              Preparation
            </h4>

            <span
              className="
                rounded-full
                border
                border-emerald-300/30
                bg-emerald-500/10
                px-3
                py-1
                text-[11px]
                font-semibold
                text-emerald-700
              "
            >
              {completed}/{checklist.length}
            </span>

          </div>


          {/* Compact 2 Column Checklist */}

          <div className="grid grid-cols-2 gap-2">

            {checklist.map((item) => (

              <button
                key={item.id}
                type="button"
                onClick={() =>
                  toggleChecklist(item.id)
                }
                className={`
                  flex
                  items-center
                  gap-2
                  rounded-2xl
                  border
                  px-3
                  py-2
                  text-left
                  transition-all
                  duration-300
                  hover:scale-[1.02]

                  ${
                    item.done
                      ? `
                        border-emerald-300/40
                        bg-emerald-500/10
                      `
                      : `
                        border-white/40
                        bg-white/40
                        hover:bg-cyan-500/10
                      `
                  }
                `}
              >

                <div
                  className={`
                    flex
                    h-5
                    w-5
                    items-center
                    justify-center
                    rounded-lg
                    transition-all

                    ${
                      item.done
                        ? `
                          bg-gradient-to-br
                          from-emerald-400
                          to-green-500
                        `
                        : `
                          border
                          border-slate-300
                          bg-white/70
                        `
                    }
                  `}
                >

                  {item.done && (
                    <Check
                      size={12}
                      className="text-white"
                    />
                  )}

                </div>

                <span
                  className={`
                    text-xs
                    font-medium
                    transition-all

                    ${
                      item.done
                        ? `
                          text-slate-500
                          line-through
                        `
                        : `
                          text-on-background
                        `
                    }
                  `}
                >
                  {item.label}
                </span>

              </button>

            ))}

          </div>

        </div>


        {/* Progress */}

        <div className="mt-5">

          <div className="mb-2 flex items-center justify-between">

            <span className="text-sm font-medium">
              Preparation Progress
            </span>

            <span className="font-semibold text-primary">
              {progress}%
            </span>

          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-200">

            <div
              style={{
                width: `${progress}%`,
              }}
              className="
                h-full
                rounded-full
                bg-gradient-to-r
                from-cyan-400
                via-sky-400
                to-violet-400
                transition-all
                duration-500
              "
            />

          </div>

        </div>


        {/* Footer */}

        <div className="mt-5 flex gap-3">

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
              py-2.5
              text-sm
              font-medium
              text-white
              shadow-lg
              transition-all
              hover:scale-[1.02]
            "
          >

            View Details

            <ChevronRight size={17} />

          </button>


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
              py-2.5
              text-sm
              font-medium
              text-primary
              transition-all
              hover:bg-cyan-500/20
            "
          >

            <RotateCcw size={16} />

            Reschedule

          </button>

        </div>

      </div>

    </section>
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
      py-2.5
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


    <div className="h-8 w-px bg-slate-200" />


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

export default AppointmentPreparationCard;