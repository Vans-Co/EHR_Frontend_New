import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <main className="flex min-h-screen">
      {/* Hero Section */}
      <section className="hidden lg:flex lg:w-1/2 relative items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1586773860418-d37222d8fce3')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/95 to-blue-700/80" />
        </div>

        <div className="relative z-10 max-w-2xl px-10 text-white">
          <div className="flex gap-3 mb-8">
            <span className="px-3 py-1 rounded-full border border-white/20 bg-white/10 text-xs font-semibold">
              Trusted Platform
            </span>

            <span className="px-3 py-1 rounded-full border border-white/20 bg-white/10 text-xs font-semibold">
              HIPAA Compliant
            </span>
          </div>

          <h1 className="text-5xl font-bold leading-tight mb-6">
            Precision Care <br />
            Powered by Innovation.
          </h1>

          <p className="text-lg text-white/70 mb-10 max-w-xl">
            Vans Healthcare provides medical professionals
            with real-time analytics, patient monitoring,
            and secure communication tools.
          </p>

          <div className="grid grid-cols-2 gap-6 mb-10">
            <div className="flex items-center gap-3">
              ⚡ <span>Real-time Data</span>
            </div>

            <div className="flex items-center gap-3">
              🔒 <span>Secure Access</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8 border-t border-white/10 pt-8">
            <div>
              <h3 className="text-2xl font-bold">500k+</h3>
              <p className="text-xs uppercase text-white/50">
                Patients Served
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold">10k+</h3>
              <p className="text-xs uppercase text-white/50">
                Doctors
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold">99.9%</h3>
              <p className="text-xs uppercase text-white/50">
                Uptime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Login Form */}
      <section className="w-full lg:w-1/2 flex items-center justify-center bg-slate-50 p-8">
        <LoginForm />
      </section>
    </main>
  );
};

export default Login;