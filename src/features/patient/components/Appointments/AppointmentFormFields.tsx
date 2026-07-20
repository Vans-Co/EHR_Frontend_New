import {
  CalendarDays,
  FileText,
  StickyNote,
} from "lucide-react";

import type {
  AppointmentType,
  Doctor,
} from "../../types/appointment.types";

import DoctorSelect from "./DoctorSelect";
import TimeSlotPicker from "./TimeSlotPicker";

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

interface AppointmentFormData {
  doctorName: string;

  specialization: string;

  hospital: string;

  location: string;

  date: string;

  time: string;

  appointmentType: AppointmentType;

  reason: string;

  notes: string;
}

interface AppointmentFormFieldsProps {
  form: AppointmentFormData;

  doctors: Doctor[];

  slots: TimeSlot[];

  loading?: boolean;

  onChange: (
    field: keyof AppointmentFormData,
    value: string
  ) => void;
}

const AppointmentFormFields = ({
  form,
  doctors,
  slots,
  loading = false,
  onChange,
}: AppointmentFormFieldsProps) => {
  return (

    <div className="space-y-8">

      {/* Doctor */}

      <DoctorSelect
        doctors={doctors}
        value={form.doctorName}
        disabled={loading}
        onChange={(value) =>
          onChange("doctorName", value)
        }
      />

      {/* Date + Consultation */}

      <section
        className="
          grid
          gap-6
          lg:grid-cols-2
        "
      >

        {/* Date */}

        <div
          className="
            rounded-[24px]
            border
            border-white/20
            bg-white/60
            p-5
            backdrop-blur-xl
          "
        >

          <label
            className="
              mb-3
              flex
              items-center
              gap-2
              text-sm
              font-semibold
              text-on-background
            "
          >

            <CalendarDays
              size={17}
              className="text-primary"
            />

            Appointment Date

          </label>

          <div className="relative">

            <CalendarDays
              size={18}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-primary
              "
            />

            <input
              type="date"
              value={form.date}
              disabled={loading}
              onChange={(e) =>
                onChange(
                  "date",
                  e.target.value
                )
              }
              className="
                w-full
                rounded-2xl
                border
                border-white/30
                bg-white/70
                py-3
                pl-11
                pr-4
                text-sm
                backdrop-blur-xl
                outline-none
                transition-all
                duration-300
                focus:border-primary/30
                focus:ring-4
                focus:ring-primary/10
              "
            />

          </div>

        </div>

        {/* Consultation */}

        <div
          className="
            rounded-[24px]
            border
            border-white/20
            bg-white/60
            p-5
            backdrop-blur-xl
          "
        >

          <label
            className="
              mb-3
              block
              text-sm
              font-semibold
              text-on-background
            "
          >
            Consultation Type
          </label>

          <div
            className="
              grid
              grid-cols-2
              gap-3
            "
          >

            {[
              "In-Person",
              "Video Consultation",
            ].map((type) => {

              const selected =
                form.appointmentType ===
                type;

              return (

                <button
                  key={type}
                  type="button"
                  disabled={loading}
                  onClick={() =>
                    onChange(
                      "appointmentType",
                      type
                    )
                  }
                  className={`
                    rounded-2xl
                    border
                    px-4
                    py-4
                    text-sm
                    font-semibold
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
                          shadow-lg
                        `
                        : `
                          border-white/20
                          bg-white/60
                          hover:border-primary/20
                          hover:bg-primary/5
                        `
                    }
                  `}
                >
                  {type}
                </button>

              );

            })}

          </div>

        </div>

      </section>

      {/* Time */}

      <TimeSlotPicker
        slots={slots}
        value={form.time}
        disabled={loading}
        onChange={(value) =>
          onChange("time", value)
        }
      />
            {/* Reason */}

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

        <label
          className="
            mb-3
            flex
            items-center
            gap-2
            text-sm
            font-semibold
            text-on-background
          "
        >

          <FileText
            size={17}
            className="text-primary"
          />

          Reason for Visit

        </label>

        <div className="relative">

          <textarea
            rows={4}
            disabled={loading}
            value={form.reason}
            onChange={(e) =>
              onChange(
                "reason",
                e.target.value
              )
            }
            placeholder="Briefly describe your symptoms or the reason for this appointment..."
            className="
              w-full
              resize-none
              rounded-2xl
              border
              border-white/30
              bg-white/70
              p-4
              text-sm
              leading-7
              backdrop-blur-xl
              outline-none
              transition-all
              duration-300
              focus:border-primary/30
              focus:ring-4
              focus:ring-primary/10
            "
          />

        </div>

      </section>

      {/* Notes */}

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

        <label
          className="
            mb-3
            flex
            items-center
            gap-2
            text-sm
            font-semibold
            text-on-background
          "
        >

          <StickyNote
            size={17}
            className="text-primary"
          />

          Additional Notes

          <span
            className="
              rounded-full
              bg-primary/10
              px-2
              py-0.5
              text-[10px]
              font-semibold
              uppercase
              tracking-wide
              text-primary
            "
          >
            Optional
          </span>

        </label>

        <textarea
          rows={5}
          disabled={loading}
          value={form.notes}
          onChange={(e) =>
            onChange(
              "notes",
              e.target.value
            )
          }
          placeholder="Anything your doctor should know before the consultation..."
          className="
            w-full
            resize-none
            rounded-2xl
            border
            border-white/30
            bg-white/70
            p-4
            text-sm
            leading-7
            backdrop-blur-xl
            outline-none
            transition-all
            duration-300
            focus:border-primary/30
            focus:ring-4
            focus:ring-primary/10
          "
        />

      </section>

    </div>

  );

};

export default AppointmentFormFields;