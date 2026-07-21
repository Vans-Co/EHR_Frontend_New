import {
  CheckCircle2,
  Clock3,
  Lock,
} from "lucide-react";

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

interface TimeSlotPickerProps {
  slots: TimeSlot[];

  value: string;

  onChange: (slotId: string) => void;

  disabled?: boolean;
}

const TimeSlotPicker = ({
  slots,
  value,
  onChange,
  disabled = false,
}: TimeSlotPickerProps) => {
  return (
    <section
      className="
        rounded-[24px]
        border
        border-white/20
        bg-white/60
        p-5
        backdrop-blur-xl
      "
    >
      {/* Header */}

      <div className="mb-5 flex items-center gap-3">

        <div
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-br
            from-cyan-500
            to-violet-500
            shadow-lg
          "
        >
          <Clock3
            size={20}
            className="text-white"
          />
        </div>

        <div>

          <h3 className="font-semibold text-on-background">
            Available Time Slots
          </h3>

          <p className="text-xs text-on-surface-variant">
            Select your preferred consultation time.
          </p>

        </div>

      </div>

      {/* Empty = doctor has no working hours on the chosen day */}

      {slots.length === 0 && (
        <div
          className="
            flex
            items-center
            gap-3
            rounded-2xl
            border
            border-amber-200/60
            bg-amber-50/80
            px-5
            py-4
            text-sm
            text-amber-700
          "
        >
          <Lock size={16} className="shrink-0" />
          The doctor is not available on this day. Please pick another date.
        </div>
      )}

      {/* Slots */}

      <div
        className="
          grid
          grid-cols-2
          gap-3
          sm:grid-cols-3
          lg:grid-cols-4
        "
      >

        {slots.map((slot) => {

          const selected =
            value === slot.id;

          return (

            <button
              key={slot.id}
              type="button"
              disabled={
                !slot.available ||
                disabled
              }
              onClick={() =>
                onChange(slot.id)
              }
              className={`
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                p-4
                transition-all
                duration-300

                ${
                  selected
                    ? `
                      border-transparent
                      bg-gradient-to-r
                      from-cyan-500
                      via-sky-500
                      to-violet-500
                      text-white
                      shadow-[0_10px_25px_rgba(14,165,233,.35)]
                      scale-[1.03]
                    `
                    : slot.available
                    ? `
                      border-white/30
                      bg-white/70
                      backdrop-blur-xl
                      hover:-translate-y-1
                      hover:border-primary/30
                      hover:shadow-lg
                    `
                    : `
                      cursor-not-allowed
                      border-slate-200
                      bg-slate-100/90
                      text-slate-400
                      opacity-70
                    `
                }
              `}
            >

              {selected && (

                <CheckCircle2
                  size={16}
                  className="
                    absolute
                    right-3
                    top-3
                  "
                />

              )}

              {!slot.available && (

                <Lock
                  size={14}
                  className="
                    absolute
                    right-3
                    top-3
                  "
                />

              )}

              <div className="space-y-1">

                <p className="text-sm font-semibold">
                  {slot.time}
                </p>

                <p
                  className={`
                    text-xs

                    ${
                      selected
                        ? "text-white/80"
                        : slot.available
                        ? "text-on-surface-variant"
                        : "text-slate-400"
                    }
                  `}
                >

                  {slot.available
                    ? "Available"
                    : "Unavailable"}

                </p>

              </div>

            </button>

          );

        })}

      </div>

      {/* Legend */}

      {slots.length > 0 && (
      <div
        className="
          mt-6
          flex
          flex-wrap
          items-center
          gap-6
          rounded-2xl
          bg-white/40
          p-4
          text-xs
          backdrop-blur-xl
        "
      >

        <div className="flex items-center gap-2">

          <span
            className="
              h-3
              w-3
              rounded-full
              bg-gradient-to-r
              from-cyan-500
              to-violet-500
            "
          />

          Selected

        </div>

        <div className="flex items-center gap-2">

          <span
            className="
              h-3
              w-3
              rounded-full
              border
              border-primary/30
              bg-white
            "
          />

          Available

        </div>

        <div className="flex items-center gap-2">

          <span
            className="
              h-3
              w-3
              rounded-full
              bg-slate-300
            "
          />

          Unavailable

        </div>

      </div>
      )}

    </section>
  );
};

export default TimeSlotPicker;