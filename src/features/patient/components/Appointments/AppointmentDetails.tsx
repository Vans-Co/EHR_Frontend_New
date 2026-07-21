import {
  CalendarDays,
  Clock3,
  Hospital,
  MapPin,
  Video,
  User,
  FileText,
  StickyNote,
  BadgeCheck,
  ShieldCheck,
  FileCheck,
} from "lucide-react";

import type {
  Appointment,
} from "../../types/appointment.types";

import {
  STATUS_STYLES,
} from "./appointment.constants";

interface AppointmentDetailsProps {
  appointment?: Appointment | null;
}

interface DetailItemProps {
  icon: React.ReactNode;

  label: string;

  value: string;
}

const DetailItem = ({
  icon,
  label,
  value,
}: DetailItemProps) => (

  <div
    className="
      relative
      overflow-hidden
      rounded-[22px]
      border
      border-white/30
      bg-white/60
      p-5
      shadow-sm
      backdrop-blur-xl
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-lg
    "
  >

    <div
      className="
        absolute
        -right-8
        -top-8
        h-20
        w-20
        rounded-full
        bg-cyan-400/10
        blur-2xl
      "
    />

    <div className="relative">

      <div
        className="
          mb-3
          flex
          items-center
          gap-3
        "
      >

        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            bg-gradient-to-br
            from-cyan-400
            to-violet-500
            text-white
            shadow-md
          "
        >
          {icon}
        </div>

        <span
          className="
            text-xs
            font-semibold
            uppercase
            tracking-wide
            text-on-surface-variant
          "
        >
          {label}
        </span>

      </div>

      <p
        className="
          text-base
          font-semibold
          text-on-background
        "
      >
        {value || "-"}
      </p>

    </div>

  </div>

);

const AppointmentDetails = ({
  appointment,
}: AppointmentDetailsProps) => {

  if (!appointment) {

    return (

      <section
        className="
          flex
          min-h-[420px]
          items-center
          justify-center
          rounded-[30px]
          border
          border-white/20
          bg-gradient-to-br
          from-cyan-500/5
          via-white/70
          to-violet-500/5
          backdrop-blur-xl
        "
      >

        <div className="text-center">

          <CalendarDays
            size={54}
            className="mx-auto text-primary"
          />

          <h2
            className="
              mt-5
              text-2xl
              font-bold
              text-on-background
            "
          >
            No Appointment Selected
          </h2>

          <p
            className="
              mt-2
              text-sm
              text-on-surface-variant
            "
          >
            Select an appointment to view its details.
          </p>

        </div>

      </section>

    );

  }

  return (

    <div className="space-y-7">

      {/* Doctor Profile */}

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
          p-7
          shadow-[0_15px_40px_rgba(15,23,42,.06)]
          backdrop-blur-2xl
        "
      >

        <div
          className="
            absolute
            -right-16
            -top-16
            h-44
            w-44
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
            h-44
            w-44
            rounded-full
            bg-violet-400/10
            blur-3xl
          "
        />

        <div
          className="
            relative
            flex
            items-start
            justify-between
            gap-5
          "
        >

          <div className="flex gap-5">

            <div
              className="
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-[24px]
                bg-gradient-to-br
                from-cyan-400
                via-sky-500
                to-violet-500
                shadow-xl
              "
            >

              <User
                size={36}
                className="text-white"
              />

            </div>

            <div>

              <p className="text-sm text-on-surface-variant">
                Consulting Doctor
              </p>

              <h2
                className="
                  mt-1
                  text-2xl
                  font-bold
                  text-on-background
                "
              >
                {appointment.doctorName}
              </h2>

              <p
                className="
                  mt-1
                  font-semibold
                  text-primary
                "
              >
                {appointment.specialization}
              </p>

              <p
                className="
                  mt-2
                  text-sm
                  text-on-surface-variant
                "
              >
                {appointment.hospital}
              </p>

            </div>

          </div>

          <span
            className={`
              rounded-full
              border
              px-5
              py-2
              text-xs
              font-semibold
              ${STATUS_STYLES[appointment.status]}
            `}
          >
            {appointment.status}
          </span>

        </div>

      </section>

      {/* Information Grid */}

      <section
        className="
          grid
          gap-4
          md:grid-cols-2
        "
      >

        <DetailItem
          icon={<CalendarDays size={18} />}
          label="Date"
          value={appointment.date}
        />

        <DetailItem
          icon={<Clock3 size={18} />}
          label="Time"
          value={appointment.time}
        />

        {appointment.tokenNumber != null && (
          <DetailItem
            icon={<Clock3 size={18} />}
            label="Token Number"
            value={`#${appointment.tokenNumber}`}
          />
        )}

        <DetailItem
          icon={<Hospital size={18} />}
          label="Hospital"
          value={appointment.hospital}
        />

        <DetailItem
          icon={
            appointment.appointmentType ===
            "Video Consultation"
              ? <Video size={18} />
              : <MapPin size={18} />
          }
          label="Consultation"
          value={appointment.appointmentType}
        />

      </section>
            {/* Reason */}

      <section
        className="
          relative
          overflow-hidden
          rounded-[30px]
          border
          border-white/30
          bg-white/65
          p-6
          shadow-sm
          backdrop-blur-xl
        "
      >

        <div
          className="
            absolute
            -right-12
            -top-12
            h-32
            w-32
            rounded-full
            bg-cyan-400/10
            blur-3xl
          "
        />

        <div className="relative">

          <div className="mb-5 flex items-center gap-3">

            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-gradient-to-br
                from-cyan-400
                to-violet-500
                text-white
              "
            >
              <FileText size={20} />
            </div>

            <div>

              <h3 className="font-bold text-on-background">
                Reason for Visit
              </h3>

              <p className="text-sm text-on-surface-variant">
                Primary consultation purpose
              </p>

            </div>

          </div>

          <p
            className="
              leading-8
              text-on-background
            "
          >
            {appointment.reason}
          </p>

        </div>

      </section>

      {/* Notes */}

      <section
        className="
          relative
          overflow-hidden
          rounded-[30px]
          border
          border-white/30
          bg-white/65
          p-6
          shadow-sm
          backdrop-blur-xl
        "
      >

        <div
          className="
            absolute
            -left-12
            -bottom-12
            h-32
            w-32
            rounded-full
            bg-violet-400/10
            blur-3xl
          "
        />

        <div className="relative">

          <div className="mb-5 flex items-center gap-3">

            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-gradient-to-br
                from-violet-500
                to-cyan-400
                text-white
              "
            >
              <StickyNote size={20} />
            </div>

            <div>

              <h3 className="font-bold text-on-background">
                Additional Notes
              </h3>

              <p className="text-sm text-on-surface-variant">
                Doctor & patient remarks
              </p>

            </div>

          </div>

          <p
            className="
              leading-8
              text-on-background
            "
          >
            {appointment.notes ||
              "No additional notes available."}
          </p>

        </div>

      </section>

      {/* Quick Information */}

      <section
        className="
          rounded-[30px]
          border
          border-white/30
          bg-white/65
          p-6
          backdrop-blur-xl
        "
      >

        <div className="mb-5 flex items-center gap-3">

          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              bg-gradient-to-br
              from-emerald-400
              to-cyan-500
              text-white
            "
          >
            <ShieldCheck size={20} />
          </div>

          <div>

            <h3 className="font-bold">
              Quick Information
            </h3>

            <p className="text-sm text-on-surface-variant">
              Appointment requirements
            </p>

          </div>

        </div>

        <div
          className="
            grid
            gap-4
            md:grid-cols-3
          "
        >

          <StatusCard
            title="Prescription"
            active={
              appointment.prescriptionAvailable
            }
            icon={<FileCheck size={18} />}
          />

          <StatusCard
            title="Insurance"
            active={
              appointment.insuranceRequired
            }
            icon={<ShieldCheck size={18} />}
          />

          <StatusCard
            title="Reports"
            active={
              appointment.reportsRequired
            }
            icon={<BadgeCheck size={18} />}
          />

        </div>

      </section>

      {/* Appointment ID */}

      <section
        className="
          rounded-[30px]
          border
          border-cyan-300/20
          bg-gradient-to-r
          from-cyan-500/10
          to-violet-500/10
          p-5
          backdrop-blur-xl
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
              to-violet-500
              text-white
              shadow-lg
            "
          >
            <BadgeCheck size={26} />
          </div>

          <div>

            <p className="text-sm text-on-surface-variant">
              Verified Appointment ID
            </p>

            <h3
              className="
                mt-1
                text-lg
                font-bold
                text-on-background
              "
            >
              {appointment.id}
            </h3>

          </div>

        </div>

      </section>

    </div>

  );

};

interface StatusCardProps {
  title: string;
  active: boolean;
  icon: React.ReactNode;
}

const StatusCard = ({
  title,
  active,
  icon,
}: StatusCardProps) => (

  <div
    className="
      rounded-[22px]
      border
      border-white/30
      bg-white/60
      p-5
      backdrop-blur-xl
    "
  >

    <div className="flex items-center gap-3">

      <div
        className={`
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          ${
            active
              ? "bg-emerald-500 text-white"
              : "bg-slate-200 text-slate-500"
          }
        `}
      >
        {icon}
      </div>

      <div>

        <p className="text-sm font-semibold">
          {title}
        </p>

        <p
          className={`
            text-xs
            ${
              active
                ? "text-emerald-600"
                : "text-slate-500"
            }
          `}
        >
          {active ? "Available" : "Not Required"}
        </p>

      </div>

    </div>

  </div>

);

export default AppointmentDetails;