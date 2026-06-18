import {
  Activity,
  BarChart3,
  CheckCircle2,
  HeartPulse,
  LockKeyhole,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { Link } from "react-router-dom";

import LoginForm from "../components/LoginForm";

const platformStats = [
  ["500k+", "Patients Served"],
  ["10k+", "Doctors"],
  ["99.9%", "Uptime"],
] as const;

const platformHighlights = [
  {
    icon: Activity,
    label: "Real-time Data",
  },
  {
    icon: LockKeyhole,
    label: "Secure Access",
  },
] as const;

const Login = () => {
  return (
    <main className="grid min-h-screen bg-surface-container-low text-on-background lg:grid-cols-[1.05fr_0.95fr]">
      <section className="relative hidden overflow-hidden bg-primary text-on-primary lg:flex lg:flex-col lg:justify-between">
        <img
          src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1600&q=80"
          alt="Modern clinical workspace"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-primary/88 to-secondary/75" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.18),transparent_30%),radial-gradient(circle_at_80%_5%,rgba(125,211,252,0.24),transparent_28%)]" />

        <div className="relative z-10 px-10 py-8 xl:px-14">
          <Link to="/" className="inline-flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded bg-white text-primary shadow-lg">
              <HeartPulse size={20} />
            </span>
            <span className="text-sm font-semibold">Vans Healthcare</span>
          </Link>

          <div className="mt-20 max-w-2xl">
            <div className="mb-7 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur">
                <ShieldCheck size={14} />
                Trusted Platform
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur">
                <CheckCircle2 size={14} />
                HIPAA Compliant
              </span>
            </div>

            <h1 className="max-w-xl text-5xl font-semibold leading-tight tracking-normal xl:text-6xl">
              Precision care powered by intelligent workflows.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-white/72">
              Sign in to access clinical dashboards, patient records, secure
              communication, and role-based healthcare operations.
            </p>

            <div className="mt-10 grid max-w-lg grid-cols-2 gap-4">
              {platformHighlights.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded border border-white/15 bg-white/10 p-4 text-sm font-semibold backdrop-blur"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded bg-white/15">
                    <Icon size={17} />
                  </span>
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10 px-10 pb-10 xl:px-14">
          <div className="grid max-w-2xl grid-cols-3 gap-6 border-t border-white/15 pt-8">
            {platformStats.map(([value, label]) => (
              <div key={label}>
                <h3 className="text-3xl font-semibold">{value}</h3>
                <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-white/55">
                  {label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-3 rounded border border-white/15 bg-white/10 p-4 text-sm text-white/75 backdrop-blur">
            <BarChart3 size={18} className="shrink-0 text-white" />
            Monitor appointments, care teams, billing, and patient outcomes from
            one secure platform.
          </div>
        </div>
      </section>

      <section className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-10">
        <div className="w-full max-w-[500px]">
          <div className="mb-8 flex items-center justify-between lg:hidden">
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-secondary">
              <HeartPulse size={18} />
              Vans Healthcare
            </Link>
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">
              <Stethoscope size={13} />
              Clinical Access
            </span>
          </div>

          <LoginForm />
        </div>
      </section>
    </main>
  );
};

export default Login;
