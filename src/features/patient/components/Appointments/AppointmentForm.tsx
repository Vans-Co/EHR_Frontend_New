import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  CalendarCheck,
  CalendarPlus,
  Loader2,
} from "lucide-react";

import type {
  Appointment,
  AppointmentType,
  Doctor,
  DrawerMode,
} from "../../types/appointment.types";

import { appointmentService } from "../../services/appointment.service";

import AppointmentFormFields from "./AppointmentFormFields";

interface AppointmentFormProps {
  mode: DrawerMode;

  appointment?: Appointment | null;

  doctors?: Doctor[];

  loading?: boolean;

  onSubmit: (data: FormData) => void;

  onCancel: () => void;
}

interface FormData {
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

/*
=========================================
Mock Data
Later this will come from:
appointmentService.getDoctors()
=========================================
*/

const doctorOptions: Doctor[] = [
  {
    id: "doctor-1",
    name: "Dr. Dhruv sehgal",
    specialization: "Cardiologist",
    hospital: "Apollo Hospital",
    location: "Pune",
  },
  {
    id: "doctor-2",
    name: "Dr. Prashant Pandey",
    specialization: "Dermatologist",
    hospital: "Ruby Hall Clinic",
    location: "Pune",
  },
  {
    id: "doctor-3",
    name: "Dr. Harsh Tiwari",
    specialization: "Orthopedic",
    hospital: "Jehangir Hospital",
    location: "Pune",
  },
];

const slotOptions = [
  {
    id: "09:00",
    time: "09:00 AM",
    available: true,
  },
  {
    id: "09:30",
    time: "09:30 AM",
    available: true,
  },
  {
    id: "10:00",
    time: "10:00 AM",
    available: false,
  },
  {
    id: "10:30",
    time: "10:30 AM",
    available: true,
  },
  {
    id: "11:00",
    time: "11:00 AM",
    available: true,
  },
  {
    id: "11:30",
    time: "11:30 AM",
    available: true,
  },
];

/** Build 30-minute slots between two "HH:mm:ss" times. */
const buildSlots = (startTime: string, endTime: string) => {
  const toMinutes = (hms: string) => {
    const [h, m] = hms.split(":").map(Number);
    return h * 60 + m;
  };

  const format12 = (total: number) => {
    const h = Math.floor(total / 60);
    const m = total % 60;
    const period = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    return `${String(hour12).padStart(2, "0")}:${String(m).padStart(2, "0")} ${period}`;
  };

  const slots = [];
  for (
    let t = toMinutes(startTime);
    t + 30 <= toMinutes(endTime);
    t += 30
  ) {
    const hh = String(Math.floor(t / 60)).padStart(2, "0");
    const mm = String(t % 60).padStart(2, "0");
    slots.push({ id: `${hh}:${mm}`, time: format12(t), available: true });
  }
  return slots;
};

const emptyForm: FormData = {
  doctorName: "",

  specialization: "",

  hospital: "",

  location: "",

  date: "",

  time: "",

  appointmentType: "In-Person",

  reason: "",

  notes: "",
};

const AppointmentForm = ({
  mode,
  appointment,
  doctors,
  loading = false,
  onSubmit,
  onCancel,
}: AppointmentFormProps) => {

  // Real doctors fetched from the backend; the mock list is only a fallback
  // so the form stays usable when the API is unreachable.
  const doctorList =
    doctors && doctors.length > 0 ? doctors : doctorOptions;

  const [form, setForm] =
    useState<FormData>(emptyForm);

  // Time slots follow the selected doctor's real weekly schedule; the static
  // list is only a fallback when the doctor has not configured one.
  const [slots, setSlots] = useState(slotOptions);

  useEffect(() => {

    const doctor = doctorList.find(
      (item) => item.name === form.doctorName
    );

    if (!doctor?.id || !form.date) {
      setSlots(slotOptions);
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        const schedule =
          await appointmentService.getDoctorSchedule(doctor.id!);

        if (cancelled) return;

        if (schedule.length === 0) {
          setSlots(slotOptions);
          return;
        }

        const weekday = new Date(`${form.date}T00:00:00`)
          .toLocaleDateString("en-US", { weekday: "long" })
          .toUpperCase();

        setSlots(
          schedule
            .filter((entry) => entry.day === weekday)
            .flatMap((entry) => buildSlots(entry.startTime, entry.endTime))
        );
      } catch {
        if (!cancelled) setSlots(slotOptions);
      }
    })();

    return () => {
      cancelled = true;
    };

  }, [form.doctorName, form.date, doctorList]);

  const [errors, setErrors] =
    useState<
      Partial<
        Record<
          keyof FormData,
          string
        >
      >
    >({});

  useEffect(() => {

    if (
      mode === "edit" &&
      appointment
    ) {

      setForm({
        doctorName:
          appointment.doctorName,

        specialization:
          appointment.specialization,

        hospital:
          appointment.hospital,

        location:
          appointment.location,

        date:
          appointment.date,

        time:
          appointment.time,

        appointmentType:
          appointment.appointmentType,

        reason:
          appointment.reason,

        notes:
          appointment.notes ?? "",
      });

    } else {

      setForm(emptyForm);

      setErrors({});

    }

  }, [
    appointment,
    mode,
  ]);

  const handleChange = (
    field: keyof FormData,
    value: string
  ) => {

    if (
      field === "doctorName"
    ) {

      const doctor =
        doctorList.find(
          (item) =>
            item.name === value
        );

      setForm((prev) => ({
        ...prev,

        doctorName: value,

        specialization:
          doctor?.specialization ??
          "",

        hospital:
          doctor?.hospital ??
          "",

        location:
          doctor?.location ??
          "",
      }));

      setErrors((prev) => {

        const updated = {
          ...prev,
        };

        delete updated.doctorName;

        return updated;

      });

      return;

    }

    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => {

      const updated = {
        ...prev,
      };

      delete updated[field];

      return updated;

    });

  };

  const validate = () => {

    const newErrors:
      typeof errors = {};

    if (!form.doctorName)
      newErrors.doctorName =
        "Required";

    if (!form.date)
      newErrors.date =
        "Required";

    if (!form.time)
      newErrors.time =
        "Required";

    if (
      !form.reason.trim()
    )
      newErrors.reason =
        "Required";

    setErrors(newErrors);

    return (
      Object.keys(newErrors)
        .length === 0
    );

  };
    const submit = () => {

    if (!validate())
      return;

    // Clear all validation errors after successful validation
    setErrors({});

    onSubmit(form);

  };

  const title =
    useMemo(() => {

      return mode ===
        "create"
        ? "Book Appointment"
        : "Update Appointment";

    }, [mode]);

  return (

    <div className="space-y-8">

      {/* Hero */}

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
            relative
            flex
            items-center
            gap-5
          "
        >

          <div
            className="
              flex
              h-18
              w-18
              items-center
              justify-center
              rounded-[22px]
              bg-gradient-to-br
              from-cyan-400
              via-sky-500
              to-violet-500
              p-5
              shadow-xl
            "
          >

            <CalendarPlus
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
              {title}
            </h2>

            <p
              className="
                mt-2
                text-sm
                text-on-surface-variant
              "
            >
              Fill in the information below to
              continue.
            </p>

          </div>

        </div>

      </section>

      {/* Form */}

      <section
        className="
          rounded-[30px]
          border
          border-white/30
          bg-white/70
          p-6
          backdrop-blur-xl
        "
      >

        <AppointmentFormFields
          form={form}
          doctors={doctorList}
          slots={slots}
          loading={loading}
          onChange={handleChange}
        />

      </section>

      {/* Validation */}

      {Object.values(errors).some(Boolean) && (

        <div
          className="
            flex
            items-center
            gap-3
            rounded-[22px]
            border
            border-red-200/60
            bg-red-50/80
            px-5
            py-4
            text-sm
            text-red-600
            backdrop-blur-xl
            animate-in
            fade-in
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
              bg-red-100
            "
          >
            ⚠️
          </div>

          <div>

            <p className="font-semibold">
              Incomplete Form
            </p>

            <p className="text-red-500">
              Please complete all required fields before
              continuing.
            </p>

          </div>

        </div>

      )}

      {/* Footer */}

      <section
        className="
          sticky
          bottom-0
          z-20
          flex
          items-center
          justify-end
          gap-4
          rounded-[28px]
          border
          border-white/30
          bg-white/80
          p-5
          shadow-[0_-8px_30px_rgba(15,23,42,.06)]
          backdrop-blur-2xl
        "
      >

        <button
          type="button"
          disabled={loading}
          onClick={onCancel}
          className="
            rounded-2xl
            border
            border-primary/15
            bg-primary/5
            px-6
            py-3
            text-sm
            font-semibold
            text-primary
            transition-all
            duration-300
            hover:bg-primary/10
            hover:-translate-y-0.5
          "
        >
          Cancel
        </button>

        <button
          type="button"
          disabled={loading}
          onClick={submit}
          className="
            inline-flex
            items-center
            gap-2
            rounded-2xl
            bg-gradient-to-r
            from-cyan-500
            via-sky-500
            to-violet-500
            px-7
            py-3
            text-sm
            font-semibold
            text-white
            shadow-[0_10px_30px_rgba(14,165,233,.35)]
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:shadow-[0_15px_35px_rgba(14,165,233,.45)]
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >

          {loading ? (

            <>

              <Loader2
                size={18}
                className="animate-spin"
              />

              Saving...

            </>

          ) : (

            <>

              <CalendarCheck size={18} />

              {mode === "create"
                ? "Book Appointment"
                : "Save Changes"}

            </>

          )}

        </button>

      </section>

    </div>

  );

};

export default AppointmentForm;