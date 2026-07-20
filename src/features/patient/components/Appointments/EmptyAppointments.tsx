import {
  CalendarPlus,
  SearchX,
  Sparkles,
} from "lucide-react";

interface EmptyAppointmentsProps {
  title?: string;

  description?: string;

  showAction?: boolean;

  onBookAppointment?: () => void;
}

const EmptyAppointments = ({
  title = "No appointments found",
  description =
    "Looks like there aren't any appointments matching your current filters. Try adjusting your search or schedule a new consultation.",
  showAction = true,
  onBookAppointment,
}: EmptyAppointmentsProps) => {
  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-white/20
        bg-white/70
        px-8
        py-14
        text-center
        shadow-[0_18px_45px_rgba(0,0,0,.08)]
        backdrop-blur-2xl
        dark:bg-white/5
      "
    >
      {/* Background Glow */}

      <div
        className="
          absolute
          left-1/2
          top-0
          h-72
          w-72
          -translate-x-1/2
          rounded-full
          bg-gradient-to-br
          from-cyan-400/20
          via-sky-400/10
          to-violet-400/20
          blur-3xl
        "
      />

      {/* Decorative Circles */}

      <div
        className="
          absolute
          -left-8
          top-10
          h-28
          w-28
          rounded-full
          bg-cyan-400/10
          blur-2xl
        "
      />

      <div
        className="
          absolute
          -right-8
          bottom-10
          h-32
          w-32
          rounded-full
          bg-violet-400/10
          blur-2xl
        "
      />

      <div className="relative">

        {/* Icon */}

        <div
          className="
            relative
            mx-auto
            flex
            h-28
            w-28
            items-center
            justify-center
            rounded-[30px]
            bg-gradient-to-br
            from-cyan-500
            via-sky-500
            to-violet-500
            shadow-[0_20px_40px_rgba(14,165,233,.35)]
          "
        >
          <SearchX
            size={46}
            className="text-white"
          />

          <div
            className="
              absolute
              -right-2
              -top-2
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-white
              shadow-lg
            "
          >
            <Sparkles
              size={16}
              className="text-primary"
            />
          </div>
        </div>

        {/* Title */}

        <h2
          className="
            mt-8
            text-3xl
            font-bold
            tracking-tight
            text-on-background
          "
        >
          {title}
        </h2>

        {/* Description */}

        <p
          className="
            mx-auto
            mt-4
            max-w-xl
            text-[15px]
            leading-7
            text-on-surface-variant
          "
        >
          {description}
        </p>

        {/* CTA */}

        {showAction && (
          <button
            onClick={onBookAppointment}
            className="
              mt-10
              inline-flex
              items-center
              gap-3
              rounded-2xl
              bg-gradient-to-r
              from-cyan-500
              via-sky-500
              to-violet-500
              px-7
              py-3.5
              text-sm
              font-semibold
              text-white
              shadow-[0_15px_35px_rgba(14,165,233,.35)]
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-[0_20px_45px_rgba(14,165,233,.45)]
            "
          >
            <CalendarPlus size={18} />

            Book Your First Appointment
          </button>
        )}

      </div>
    </section>
  );
};

export default EmptyAppointments;