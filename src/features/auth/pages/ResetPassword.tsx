import {
  CheckCircle2,
  HeartPulse,
  KeyRound,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

import ResetPasswordForm from "@/features/auth/components/ResetPasswordForm";

const passwordGuidance = [
  {
    icon: KeyRound,
    title: "Use a unique password",
    text: "Avoid reusing a password from another website or application.",
  },
  {
    icon: LockKeyhole,
    title: "Make it difficult to guess",
    text: "Use a longer phrase with a mix of characters and numbers.",
  },
  {
    icon: ShieldCheck,
    title: "Keep your account private",
    text: "Never share passwords or recovery codes with another person.",
  },
] as const;

const ResetPassword = () => {
  return (
    <main className="grid min-h-screen bg-surface-container-low text-on-background lg:grid-cols-[0.9fr_1.1fr]">
      <aside className="relative hidden overflow-hidden bg-primary text-on-primary lg:flex lg:flex-col lg:justify-between">
        <img
          src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=1400&q=80"
          alt="Medical professional working in a modern clinic"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-primary/90 to-secondary/75" />

        <div className="relative z-10 px-10 py-8 xl:px-14">
          <Link to="/" className="inline-flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded bg-white text-primary shadow-lg">
              <HeartPulse size={20} />
            </span>
            <span className="text-sm font-semibold">Vans Healthcare</span>
          </Link>

          <div className="mt-20 max-w-lg">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur">
              <CheckCircle2 size={14} />
              Protected Password Update
            </span>
            <h1 className="mt-6 text-5xl font-semibold leading-tight tracking-normal">
              Secure your healthcare account.
            </h1>
            <p className="mt-5 max-w-md text-sm leading-6 text-white/75">
              Choose a strong new password to protect access to your clinical
              workspace and personal healthcare information.
            </p>
          </div>
        </div>

        <div className="relative z-10 grid gap-3 px-10 pb-10 xl:px-14">
          {passwordGuidance.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="flex items-start gap-3 rounded border border-white/15 bg-white/10 p-4 backdrop-blur"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-white/15">
                <Icon size={17} />
              </span>
              <div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="mt-1 text-xs leading-5 text-white/65">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </aside>

      <section className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-10">
        <div className="w-full max-w-md">
          <Link
            to="/"
            className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-secondary lg:hidden"
          >
            <HeartPulse size={18} />
            Vans Healthcare
          </Link>
          <ResetPasswordForm />
          <p className="mt-5 text-center text-xs leading-5 text-on-surface-variant">
            Password changes should be completed only from a trusted device and
            network.
          </p>
        </div>
      </section>
    </main>
  );
};

export default ResetPassword;
