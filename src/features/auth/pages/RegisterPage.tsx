import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BadgeCheck,
  CheckCircle2,
  Eye,
  EyeOff,
  HeartPulse,
  Loader2,
  LockKeyhole,
  Plus,
  Stethoscope,
  Trash2,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registerUser } from "@/features/auth/services/authApi";

type Role = "PATIENT" | "DOCTOR";

type RegisterFormState = {
  role: Role;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  dob: string;
  gender: "Male" | "Female" | "Other";
  bloodGroup: string;
  phoneNo: string;
  addressLine: string;
  city: string;
  state: string;
  pin_code: string;
  emergencyContactName: string;
  emergencyContactRelationship: string;
  emergencyContactPhoneNo: string;
  specialization: string;
  licenseNumber: string;
  degrees: string[];
};

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] as const;

const roleCards = [
  {
    value: "PATIENT" as const,
    icon: UserRound,
    label: "Patient",
    description: "Create a personal healthcare profile.",
  },
  {
    value: "DOCTOR" as const,
    icon: Stethoscope,
    label: "Doctor",
    description: "Register clinical credentials and practice access.",
  },
] as const;

const trustPoints = [
  "HIPAA-aligned access controls",
  "Encrypted patient and clinical records",
  "Role-based workflows for care teams",
] as const;

const defaultFormState: RegisterFormState = {
  role: "PATIENT",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  dob: "",
  gender: "Male",
  bloodGroup: "A+",
  phoneNo: "",
  addressLine: "",
  city: "",
  state: "",
  pin_code: "",
  emergencyContactName: "",
  emergencyContactRelationship: "",
  emergencyContactPhoneNo: "",
  specialization: "",
  licenseNumber: "",
  degrees: [""],
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState(defaultFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const role = formState.role;

  const onChange =
    (field: keyof RegisterFormState) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setFormState((current) => ({
        ...current,
        [field]: event.target.value,
      }));
    };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      if (formState.password !== formState.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const payload = {
        firstName: formState.firstName,
        lastName: formState.lastName,
        email: formState.email,
        password: formState.password,
        dob: formState.dob,
        gender: formState.gender,
        phoneNo: Number(formState.phoneNo),
        bloodGroup: formState.bloodGroup,
        role: formState.role,
        address: {
          addressLine: formState.addressLine,
          city: formState.city,
          state: formState.state,
          pin_code: Number(formState.pin_code),
        },
        ...(formState.role === "DOCTOR" && {
          doctorProfile: {
            specialization: formState.specialization,
            licenseNumber: formState.licenseNumber,
            degrees: formState.degrees.filter((degree) => degree.trim().length > 0),
          },
        }),
        ...(formState.role === "PATIENT" && {
          emergencyContact: {
            contactName: formState.emergencyContactName,
            relationship: formState.emergencyContactRelationship,
            contactPhoneNo: Number(formState.emergencyContactPhoneNo),
          },
        }),
      };

      await registerUser(payload);

      navigate("/login");
    } catch {
      alert("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const roleSummary = useMemo(() => {
    return role === "PATIENT"
      ? "Emergency contact details help care teams respond quickly when a visit needs escalation."
      : "Credential details help administrators validate clinical access before account activation.";
  }, [role]);

  return (
    <main className="min-h-screen bg-surface-container-low text-on-background">
      <div className="grid min-h-screen lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="relative hidden overflow-hidden bg-primary px-10 py-8 text-on-primary lg:flex lg:flex-col lg:justify-between xl:px-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.22),transparent_32%),radial-gradient(circle_at_80%_0%,rgba(125,211,252,0.2),transparent_30%)]" />

          <div className="relative">
            <Link to="/" className="inline-flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded bg-on-primary text-primary">
                <HeartPulse size={20} />
              </span>
              <span className="text-sm font-semibold">Vans Healthcare</span>
            </Link>

            <div className="mt-20 max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold">
                <BadgeCheck size={14} />
                Secure Healthcare Registration
              </div>
              <h1 className="mt-6 text-5xl font-semibold leading-tight tracking-normal">
                Start with the right clinical identity.
              </h1>
              <p className="mt-5 max-w-md text-sm leading-6 text-on-primary/75">
                Create a patient or doctor account with structured onboarding,
                role-aware details, and secure healthcare data handling.
              </p>
            </div>
          </div>

          <div className="relative grid gap-3">
            {trustPoints.map((point) => (
              <div
                key={point}
                className="flex items-center gap-3 rounded border border-white/15 bg-white/10 p-4 text-sm font-medium backdrop-blur"
              >
                <CheckCircle2 size={17} />
                {point}
              </div>
            ))}
          </div>
        </aside>

        <section className="flex items-start justify-center px-4 py-6 sm:px-6 lg:max-h-screen lg:overflow-y-auto lg:px-10 lg:py-8">
          <div className="w-full max-w-3xl">
            <div className="mb-5 flex items-center justify-between gap-4">
              <Link to="/" className="flex items-center gap-2 text-sm font-semibold text-secondary lg:hidden">
                <HeartPulse size={18} />
                Vans Healthcare
              </Link>
              <Link to="/login" className="ml-auto text-sm font-semibold text-primary hover:underline">
                Sign In
              </Link>
            </div>

            <div className="rounded border border-outline-variant bg-surface-container-lowest shadow-xl shadow-slate-900/5">
              <div className="border-b border-outline-variant px-5 py-5 sm:px-8">
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
                      Account Setup
                    </p>
                    <h2 className="mt-2 text-3xl font-semibold tracking-normal text-on-background">
                      Create Account
                    </h2>
                    <p className="mt-2 max-w-xl text-sm leading-6 text-on-surface-variant">
                      Choose your role and enter the details required to set up
                      your Vans Healthcare profile.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 rounded bg-secondary/10 px-3 py-2 text-xs font-semibold text-secondary">
                    <LockKeyhole size={14} />
                    Encrypted
                  </div>
                </div>
              </div>

              <form onSubmit={onSubmit} className="space-y-7 px-5 py-6 sm:px-8">
                <section>
                  <SectionTitle
                    title="Registration Type"
                    description="Select the workflow that matches this account."
                  />
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {roleCards.map((item) => {
                      const Icon = item.icon;
                      const active = role === item.value;

                      return (
                        <button
                          key={item.value}
                          type="button"
                          onClick={() =>
                            setFormState((current) => ({
                              ...current,
                              role: item.value,
                            }))
                          }
                          className={`rounded border p-4 text-left transition ${
                            active
                              ? "border-secondary bg-secondary/10 ring-2 ring-secondary/15"
                              : "border-outline-variant bg-surface-container-low hover:border-secondary/60"
                          }`}
                        >
                          <div className="flex gap-3">
                            <span
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded ${
                                active
                                  ? "bg-secondary text-on-secondary"
                                  : "bg-surface-container-high text-on-surface"
                              }`}
                            >
                              <Icon size={18} />
                            </span>
                            <span>
                              <span className="block text-sm font-semibold text-on-surface">
                                {item.label}
                              </span>
                              <span className="mt-1 block text-xs leading-5 text-on-surface-variant">
                                {item.description}
                              </span>
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </section>

                <section>
                  <SectionTitle title="Personal Details" />
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <Field label="First Name">
                      <Input value={formState.firstName} onChange={onChange("firstName")} placeholder="John" />
                    </Field>
                    <Field label="Last Name">
                      <Input value={formState.lastName} onChange={onChange("lastName")} placeholder="Doe" />
                    </Field>
                    <Field label="Email Address">
                      <Input value={formState.email} onChange={onChange("email")} type="email" placeholder="name@example.com" />
                    </Field>
                    <Field label="Phone Number">
                      <Input value={formState.phoneNo} onChange={onChange("phoneNo")} inputMode="numeric" placeholder="9876543210" />
                    </Field>
                    <Field label="Date of Birth">
                      <Input value={formState.dob} onChange={onChange("dob")} type="date" />
                    </Field>
                    <Field label="Gender">
                      <select
                        value={formState.gender}
                        onChange={(event) =>
                          setFormState((current) => ({
                            ...current,
                            gender: event.target.value as RegisterFormState["gender"],
                          }))
                        }
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </Field>
                    <Field label="Blood Group" className="md:col-span-2">
                      <select
                        value={formState.bloodGroup}
                        onChange={(event) =>
                          setFormState((current) => ({
                            ...current,
                            bloodGroup: event.target.value,
                          }))
                        }
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                      >
                        {bloodGroups.map((bloodGroup) => (
                          <option key={bloodGroup} value={bloodGroup}>
                            {bloodGroup}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>
                </section>

                <section>
                  <SectionTitle title="Address" />
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <Field label="Address Line" className="md:col-span-2">
                      <Input value={formState.addressLine} onChange={onChange("addressLine")} placeholder="Street, building, area" />
                    </Field>
                    <Field label="City">
                      <Input value={formState.city} onChange={onChange("city")} placeholder="City" />
                    </Field>
                    <Field label="State">
                      <Input value={formState.state} onChange={onChange("state")} placeholder="State" />
                    </Field>
                    <Field label="PIN Code">
                      <Input value={formState.pin_code} onChange={onChange("pin_code")} inputMode="numeric" placeholder="400001" />
                    </Field>
                  </div>
                </section>

                <section className="rounded border border-outline-variant bg-surface-container-low p-4">
                  <SectionTitle
                    title={role === "PATIENT" ? "Emergency Contact" : "Doctor Credentials"}
                    description={roleSummary}
                  />

                  {role === "PATIENT" ? (
                    <div className="mt-4 grid gap-4 md:grid-cols-3">
                      <Field label="Contact Name">
                        <Input value={formState.emergencyContactName} onChange={onChange("emergencyContactName")} placeholder="Full name" />
                      </Field>
                      <Field label="Relationship">
                        <Input value={formState.emergencyContactRelationship} onChange={onChange("emergencyContactRelationship")} placeholder="Parent, spouse" />
                      </Field>
                      <Field label="Contact Phone">
                        <Input value={formState.emergencyContactPhoneNo} onChange={onChange("emergencyContactPhoneNo")} inputMode="numeric" placeholder="9876543210" />
                      </Field>
                    </div>
                  ) : (
                    <div className="mt-4 space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <Field label="Specialization">
                          <Input value={formState.specialization} onChange={onChange("specialization")} placeholder="Cardiology" />
                        </Field>
                        <Field label="License Number">
                          <Input value={formState.licenseNumber} onChange={onChange("licenseNumber")} placeholder="MED-12345" />
                        </Field>
                      </div>

                      <div className="rounded border border-outline-variant bg-surface-container-lowest p-4">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <p className="text-sm font-semibold text-on-surface">Degrees</p>
                            <p className="mt-1 text-xs text-on-surface-variant">
                              Add medical qualifications in display order.
                            </p>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                              setFormState((current) => ({
                                ...current,
                                degrees: [...current.degrees, ""],
                              }))
                            }
                            className="h-9 rounded"
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Degree
                          </Button>
                        </div>

                        <div className="mt-4 space-y-3">
                          {formState.degrees.map((degree, index) => (
                            <div key={index} className="grid grid-cols-[1fr_auto] gap-2">
                              <Input
                                value={degree}
                                onChange={(event) =>
                                  setFormState((current) => {
                                    const nextDegrees = [...current.degrees];
                                    nextDegrees[index] = event.target.value;

                                    return {
                                      ...current,
                                      degrees: nextDegrees,
                                    };
                                  })
                                }
                                placeholder={`Degree ${index + 1}`}
                              />
                              <Button
                                type="button"
                                variant="outline"
                                disabled={formState.degrees.length === 1}
                                onClick={() =>
                                  setFormState((current) => ({
                                    ...current,
                                    degrees: current.degrees.filter((_, degreeIndex) => degreeIndex !== index),
                                  }))
                                }
                                className="h-10 rounded px-3"
                                aria-label={`Remove degree ${index + 1}`}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </section>

                <section>
                  <SectionTitle title="Security" />
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <PasswordField
                      label="Password"
                      value={formState.password}
                      show={showPassword}
                      onToggle={() => setShowPassword((current) => !current)}
                      onChange={onChange("password")}
                    />
                    <PasswordField
                      label="Confirm Password"
                      value={formState.confirmPassword}
                      show={showConfirmPassword}
                      onToggle={() => setShowConfirmPassword((current) => !current)}
                      onChange={onChange("confirmPassword")}
                    />
                  </div>
                </section>

                <div className="flex flex-col gap-4 border-t border-outline-variant pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-on-surface-variant">
                    Already registered?{" "}
                    <Link to="/login" className="font-semibold text-primary hover:underline">
                      Sign in
                    </Link>
                  </p>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-11 rounded bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/15 hover:bg-primary/90"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

type FieldProps = {
  label: string;
  children: React.ReactNode;
  className?: string;
};

const Field = ({ label, children, className = "" }: FieldProps) => (
  <label className={`block space-y-1.5 ${className}`}>
    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-outline">
      {label}
    </span>
    {children}
  </label>
);

type SectionTitleProps = {
  title: string;
  description?: string;
};

const SectionTitle = ({ title, description }: SectionTitleProps) => (
  <div>
    <h3 className="text-base font-semibold text-on-surface">{title}</h3>
    {description && (
      <p className="mt-1 text-sm leading-6 text-on-surface-variant">
        {description}
      </p>
    )}
  </div>
);

type PasswordFieldProps = {
  label: string;
  value: string;
  show: boolean;
  onToggle: () => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const PasswordField = ({
  label,
  value,
  show,
  onToggle,
  onChange,
}: PasswordFieldProps) => (
  <Field label={label}>
    <div className="relative">
      <Input
        value={value}
        onChange={onChange}
        type={show ? "text" : "password"}
        placeholder="Enter password"
        className="pr-11"
      />
      <button
        type="button"
        onClick={onToggle}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant transition hover:text-on-surface"
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  </Field>
);

export default RegisterPage;
