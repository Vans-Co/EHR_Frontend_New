import type { ReactNode } from "react";
import { HeartPulse, ShieldCheck, Stethoscope } from "lucide-react";

import GlassCard from "./GlassCard";
import AppLogo from "./Applogo";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

const AuthLayout = ({
  children,
  title,
  subtitle,
}: AuthLayoutProps) => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-50 via-white to-blue-100">

      {/* Background Decorations */}

      <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-sky-300/25 blur-3xl" />

      <div className="absolute right-0 top-32 h-[28rem] w-[28rem] rounded-full bg-blue-300/20 blur-3xl" />

      <div className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-300/20 blur-3xl" />

      <div className="relative z-10 flex min-h-screen">

        {/* Left Panel */}

        <section className="hidden w-1/2 flex-col justify-between bg-gradient-to-br from-primary via-blue-700 to-sky-600 p-14 text-white xl:flex">

          <div>

            <div className="inline-flex rounded-2xl bg-white px-5 py-3 shadow-xl">
             <AppLogo />
             </div>

            <div className="mt-24">

              <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 backdrop-blur">

                <ShieldCheck size={18} />

                Secure Healthcare Platform

              </div>

              <h1 className="max-w-lg text-5xl font-bold leading-tight">

                Healthcare designed for the modern world.

              </h1>

              <p className="mt-8 max-w-md text-lg leading-8 text-white/80">

                Access appointments, prescriptions, medical records,
                insurance and billing from one secure platform.

              </p>

            </div>

          </div>

          <div className="space-y-5">

            <div className="flex items-center gap-4 rounded-3xl bg-white/10 p-5 backdrop-blur">

              <HeartPulse size={34} />

              <div>

                <h3 className="font-semibold">

                  Patient First

                </h3>

                <p className="text-sm text-white/75">

                  Personalized healthcare experience.

                </p>

              </div>

            </div>

            <div className="flex items-center gap-4 rounded-3xl bg-white/10 p-5 backdrop-blur">

              <Stethoscope size={34} />

              <div>

                <h3 className="font-semibold">

                  Doctors Connected

                </h3>

                <p className="text-sm text-white/75">

                  Secure consultations anytime.

                </p>

              </div>

            </div>

          </div>

        </section>

        {/* Right Panel */}

        <section className="flex flex-1 items-center justify-center px-6 py-12">

          <div className="w-full max-w-md">

            <div className="mb-8 xl:hidden">

              <AppLogo />

            </div>

            <GlassCard>

              <div className="mb-8">

                <h2 className="text-4xl font-bold text-slate-900">

                  {title}

                </h2>

                <p className="mt-3 text-slate-500 leading-7">

                  {subtitle}

                </p>

              </div>

              {children}

            </GlassCard>

          </div>

        </section>

      </div>

    </main>
  );
};

export default AuthLayout;