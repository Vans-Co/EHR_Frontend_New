import {
  ChevronDown,
  Stethoscope,
} from "lucide-react";

import type {
  Doctor,
} from "../../types/appointment.types";

interface DoctorSelectProps {
  doctors: Doctor[];

  value: string;

  onChange: (
    doctorName: string
  ) => void;

  disabled?: boolean;
}

const DoctorSelect = ({
  doctors,
  value,
  onChange,
  disabled = false,
}: DoctorSelectProps) => {
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

      <label
        htmlFor="doctor"
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
        <Stethoscope
          size={17}
          className="text-primary"
        />

        Select Doctor
      </label>

      {/* Select */}

      <div className="relative">

        <Stethoscope
          size={18}
          className="
            pointer-events-none
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-primary
          "
        />

        <ChevronDown
          size={18}
          className="
            pointer-events-none
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-on-surface-variant
          "
        />

        <select
          id="doctor"
          value={value}
          disabled={disabled}
          onChange={(e) =>
            onChange(e.target.value)
          }
          className="
            w-full
            appearance-none
            rounded-2xl
            border
            border-white/30
            bg-white/70
            py-3.5
            pl-11
            pr-12
            text-sm
            font-medium
            text-on-background
            backdrop-blur-xl
            outline-none
            transition-all
            duration-300
            focus:border-primary/30
            focus:ring-4
            focus:ring-primary/10
            hover:border-primary/20
            disabled:cursor-not-allowed
            disabled:opacity-60
            dark:bg-white/5
          "
        >

          <option value="">
            Select a Doctor
          </option>

          {doctors.map((doctor) => (

            <option
              key={
                doctor.id ??
                doctor.name
              }
              value={doctor.name}
            >
              {doctor.name} •{" "}
              {doctor.specialization}
            </option>

          ))}

        </select>

      </div>

      {/* Helper */}

      <p
        className="
          mt-3
          text-xs
          text-on-surface-variant
        "
      >
        Selecting a doctor will automatically
        fill the specialization, hospital and
        location details.
      </p>

    </section>
  );
};

export default DoctorSelect;