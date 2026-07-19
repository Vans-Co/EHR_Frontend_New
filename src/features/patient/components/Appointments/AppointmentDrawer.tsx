import {
  X,
  CalendarPlus,
  FilePenLine,
  Eye,
} from "lucide-react";

import type {
  Appointment,
  DrawerMode,
} from "../../types/appointment.types";

import AppointmentForm from "./AppointmentForm";
import AppointmentDetails from "./AppointmentDetails";

import {
  DRAWER_TITLES,
} from "./appointment.constants";

interface AppointmentDrawerProps {
  open: boolean;

  mode: DrawerMode;

  appointment?: Appointment | null;

  loading?: boolean;

  onClose: () => void;

  onSubmit: (data: any) => void;
}

const MODE_ICON = {
  create: CalendarPlus,
  edit: FilePenLine,
  view: Eye,
} satisfies Record<
  DrawerMode,
  React.ElementType
>;

const AppointmentDrawer = ({
  open,
  mode,
  appointment,
  loading = false,
  onClose,
  onSubmit,
}: AppointmentDrawerProps) => {

  const ModeIcon = MODE_ICON[mode];

  return (
    <>

      {/* Overlay */}

      <div
        onClick={onClose}
        className={`
          fixed
          inset-0
          z-40
          bg-slate-950/30
          backdrop-blur-md
          transition-all
          duration-500

          ${
            open
              ? "visible opacity-100"
              : "invisible opacity-0"
          }
        `}
      />

      {/* Drawer */}

      <aside
        className={`
          fixed
          right-4
          top-4
          z-50
          flex
          h-[calc(100vh-2rem)]
          w-full
          max-w-[640px]
          flex-col
          overflow-hidden
          rounded-[36px]
          border
          border-white/30
          bg-gradient-to-br
          from-cyan-500/5
          via-white/80
          to-violet-500/5
          shadow-[0_25px_80px_rgba(15,23,42,.18)]
          backdrop-blur-3xl
          transition-all
          duration-500
          dark:bg-slate-900/90

          ${
            open
              ? "translate-x-0 opacity-100"
              : "translate-x-[110%] opacity-0"
          }
        `}
      >

        {/* Top Glow */}

        <div
          className="
            absolute
            -right-24
            -top-24
            h-64
            w-64
            rounded-full
            bg-cyan-400/15
            blur-3xl
          "
        />

        {/* Bottom Glow */}

        <div
          className="
            absolute
            -bottom-24
            -left-24
            h-64
            w-64
            rounded-full
            bg-violet-400/15
            blur-3xl
          "
        />

        {/* Header */}

        <div
          className="
            relative
            flex
            items-start
            justify-between
            border-b
            border-white/20
            px-8
            py-7
          "
        >

          <div className="flex items-center gap-4">

            <div
              className="
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-[22px]
                bg-gradient-to-br
                from-cyan-400
                via-sky-500
                to-violet-500
                shadow-xl
              "
            >

              <ModeIcon
                size={30}
                className="text-white"
              />

            </div>

            <div>

              <p className="text-sm text-on-surface-variant">
                Appointment
              </p>

              <h2
                className="
                  mt-1
                  text-2xl
                  font-bold
                  text-on-background
                "
              >
                {DRAWER_TITLES[mode]}
              </h2>

              <p
                className="
                  mt-2
                  text-sm
                  text-on-surface-variant
                "
              >
                {mode === "create" &&
                  "Book your appointment with confidence."}

                {mode === "edit" &&
                  "Modify appointment information."}

                {mode === "view" &&
                  "Review appointment details."}
              </p>

            </div>

          </div>

          <button
            onClick={onClose}
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              border
              border-white/30
              bg-white/60
              text-on-background
              backdrop-blur-xl
              transition-all
              duration-300
              hover:scale-105
              hover:bg-red-50
              hover:text-red-500
            "
          >

            <X size={22} />

          </button>

        </div>

        {/* Body */}
                <div
          className="
            relative
            flex-1
            overflow-hidden
          "
        >

          {/* Scrollable Content */}

          <div
            className="
              h-full
              overflow-y-auto
              px-8
              py-8
              scrollbar-thin
              scrollbar-thumb-primary/20
              scrollbar-track-transparent
            "
          >

            {mode === "view" ? (

              <AppointmentDetails
                appointment={appointment}
              />

            ) : (

              <AppointmentForm
                mode={mode}
                appointment={appointment}
                loading={loading}
                onSubmit={onSubmit}
                onCancel={onClose}
              />

            )}

          </div>

          {/* Bottom Glass Fade */}

          <div
            className="
              pointer-events-none
              absolute
              bottom-0
              left-0
              right-0
              h-16
              bg-gradient-to-t
              from-white/90
              via-white/40
              to-transparent
              backdrop-blur-sm
            "
          />

        </div>

      </aside>

    </>

  );

};

export default AppointmentDrawer;