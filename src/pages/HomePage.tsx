import {
  BadgeCheck,
  BarChart3,
  Building2,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  CreditCard,
  FileText,
  LockKeyhole,
  Mail,
  Phone,
  ShieldCheck,
  Smartphone,
  Stethoscope,
  TrendingUp,
  UserRound,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const featureCards = [
  {
    icon: CalendarCheck,
    title: "Appointment Management",
    description:
      "Intelligent scheduling system with automated reminders and conflict resolution for multi-department setups.",
  },
  {
    icon: ClipboardList,
    title: "Electronic Medical Records",
    description:
      "Centralized patient histories with lightning-fast retrieval and structured data entry optimized for speed.",
  },
  {
    icon: CreditCard,
    title: "Integrated Billing",
    description:
      "Seamless financial workflows from insurance verification to final payment collection and patient invoicing.",
  },
];

const solutions = [
  {
    icon: UserRound,
    title: "For Patients",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCHhpGqXUlF59nuwpfyNVpPMOYKe3ID6ksEdIDXWGoh8A0TCE9tWa1qjiBBbm4z31xfX-GiCqmjOZoTjEsHC8BxUgT6d8CV49GjPY4hvmYdpZxAEP6ARyWVYxRh9b3avZFCIrnhl3EqripuXRO3VvNh7ebjzaA5H_w1yuOl-mLjmVLFQ2iTrYeNe_P2EJInWuYS508lu0r2I8RQSXl66rYDK9DG0hH3y-OlFNeouT7MhC_3uWcPZi85pEvAEs8J39GTyzcQ54gJeoU",
    description:
      "Manage your health records, book appointments, and track your wellness with an intuitive portal.",
  },
  {
    icon: Stethoscope,
    title: "For Doctors",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuApbHRmLLi1CzllFwUvubLsqmbbmHtkfFM9G8N_7W5dUi65DMwIs8HlAs6wIlycKVDKXhlX-t2qRQmlmimCMuiHmhFByCqvsZsaJL9FA51Wm-4pqdp-DzulhqFR6TM1e6T344LQbWpkcwGkEYyT7-e0TXFU0lfOr4nIrAERAlYfZn-fruCJ3NM2OFp_QSmp1uzACfP8WxYwKT4LcdwlngQ1EDNruAKaH3o5Ip6d2Kw9gZg-sFwB2WhMr78ewU4HQ85BcrKBs-244oA",
    description:
      "Streamline consultations, access clinical data anywhere, and optimize your schedule with ease.",
  },
  {
    icon: Building2,
    title: "For Hospitals",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBISLPvgD2vB9_Fx7kpmm6Hm50q0LcuklVJ0aNLsrmsrQXvv_HhkbIu0X-GlLQ4O4eaDBzHautjOAME_OX65-iM_fEcO0CmdeZgRkoxYIxM6Lx27sCrMJQFi0GuDieBvgjjQmWd-wE_Ajng1yfTK3z4zgfITrKT0UtIPEdCy3nA8O0CnvYxnFui2PIotzyvDEY3xhmJQAw4SOUW2juE-0mms68etjiXw4MDvPxvcUKYhYwS-ESyQRv95M4_71EhTTJnEP52lgmRzcM",
    description:
      "Scale your operations, manage departments, and drive efficiency with enterprise-grade tools.",
  },
];

const standards = [
  {
    icon: ShieldCheck,
    title: "Security (HIPAA)",
    description:
      "Continuous compliance monitoring and data encryption at rest and in transit.",
  },
  {
    icon: Zap,
    title: "Efficiency",
    description: "Reducing administrative overhead by up to 40% through automation.",
  },
  {
    icon: Smartphone,
    title: "Accessibility",
    description: "Cloud-native platform accessible on any device, anywhere, securely.",
  },
  {
    icon: TrendingUp,
    title: "Scalability",
    description:
      "Grow from a single clinic to a multi-hospital network with zero friction.",
  },
];

const HomePage = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background font-sans text-on-background">
      <nav className="sticky top-0 z-50 h-12 border-b border-outline-variant/60 bg-surface/95 backdrop-blur">
        <div className="mx-auto flex h-full w-full max-w-6xl items-center justify-between px-4 sm:px-5 lg:px-6">
          <Link to="/" className="text-sm font-semibold text-secondary">
            Vans Healthcare
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {["Features", "Solutions", "Testimonials", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-[11px] font-medium text-on-surface-variant transition hover:text-secondary"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-[11px] font-semibold text-secondary transition hover:text-primary"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="rounded-sm bg-primary px-3.5 py-2 text-[11px] font-semibold text-on-primary transition hover:bg-primary/90"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main>
        <section className="hero-gradient">
          <div className="mx-auto grid min-h-[520px] w-full max-w-6xl items-center gap-12 px-4 py-16 sm:px-5 md:grid-cols-[1fr_0.95fr] lg:px-6">
            <div className="max-w-xl">
              <div className="mb-8 inline-flex items-center gap-1.5 rounded-full bg-secondary-fixed px-2.5 py-1 text-[10px] font-semibold text-on-secondary-fixed-variant">
                <BadgeCheck size={12} />
                Enterprise Ready
              </div>

              <h1 className="max-w-lg text-3xl font-semibold leading-tight tracking-normal text-on-background sm:text-4xl">
                Transforming Healthcare Through{" "}
                <span className="text-secondary">Innovation &amp; Precision.</span>
              </h1>

              <p className="mt-5 max-w-md text-sm leading-6 text-on-surface-variant">
                A unified digital management platform designed for modern
                hospitals, doctors, and patients. Secure, efficient, and
                data-driven solutions for the next era of clinical care.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/register"
                  className="rounded-sm bg-primary px-5 py-2.5 text-xs font-semibold text-on-primary transition hover:bg-primary/90"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="rounded-sm border border-outline-variant bg-surface-container-lowest px-5 py-2.5 text-xs font-semibold text-on-surface transition hover:bg-surface-container-low"
                >
                  Sign In
                </Link>
              </div>
            </div>

            <div className="relative hidden md:block">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1gQzqdixArSwLNPCWvoOKhBydpg2F0AlyTgdHmtraxCKaSRxLtV13MaGcFS6mO8JYWk9Sx9_sWDtqHWk3FZExBj8Ids_aakv7mCUhdoMO7VXk7BfEQf4ppDL1ZT0BLe5h8fUEx6zjctMFDETJC6I45ACfReNJJlFq2EmHvsnH8pTiEebsnwftCm1QT4RHaj-ManYT9GuW5M3z1dV7-g5VFnRnAwRBDhWXxnEGWoov_TMivDFCgZ1U48M5s592WgNa6LgncU3IB4w"
                alt="Healthcare dashboard on a tablet"
                className="h-[320px] w-full rounded object-cover shadow-xl"
              />
              <div className="absolute -bottom-5 -left-5 w-36 rounded border border-outline-variant bg-surface-container-lowest p-3 shadow-lg">
                <div className="mb-2 flex items-center gap-2">
                  <LockKeyhole size={15} className="text-secondary" />
                  <span className="text-[11px] font-semibold text-on-surface">
                    HIPAA Compliant
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-secondary-fixed">
                  <div className="h-full w-full bg-secondary" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-outline-variant/40 bg-surface-container-low py-8">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-7 px-4 text-center sm:px-5 md:grid-cols-3 lg:px-6">
            {[
              ["500k+", "Patients Served"],
              ["10k+", "Registered Doctors"],
              ["250+", "Hospitals Connected"],
            ].map(([value, label], index) => (
              <div
                key={label}
                className={index === 1 ? "md:border-x md:border-outline-variant/60" : ""}
              >
                <p className="text-2xl font-semibold text-primary">{value}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.28em] text-outline">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="features" className="bg-background py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-5 lg:px-6">
            <div className="mx-auto mb-10 max-w-xl text-center">
              <h2 className="text-2xl font-medium text-on-background">
                Engineered for Clinical Excellence
              </h2>
              <p className="mt-3 text-sm leading-6 text-on-surface-variant">
                Our modular platform provides all the tools necessary to manage
                a high-scale healthcare environment without compromising on
                safety or speed.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-6 lg:grid-cols-12">
              {featureCards.map(({ icon: Icon, title, description }) => (
                <article
                  key={title}
                  className="rounded border border-outline-variant bg-surface-container-lowest p-6 transition hover:border-secondary md:col-span-2 lg:col-span-4"
                >
                  <Icon size={20} className="mb-7 text-secondary" />
                  <h3 className="mb-3 text-sm font-semibold text-on-surface">
                    {title}
                  </h3>
                  <p className="text-xs leading-5 text-on-surface-variant">
                    {description}
                  </p>
                </article>
              ))}

              <article className="rounded bg-primary p-6 text-on-primary md:col-span-4 lg:col-span-8">
                <BarChart3 size={22} className="mb-7" />
                <h3 className="mb-3 text-lg font-semibold">
                  Real-time Analytics &amp; Reporting
                </h3>
                <p className="max-w-md text-sm font-medium leading-6 text-on-primary/85">
                  Gain operational insights with interactive dashboards. Monitor
                  hospital occupancy, financial performance, and patient
                  outcomes in real-time.
                </p>
                <Link
                  to="/login"
                  className="mt-6 inline-flex rounded-sm bg-on-primary px-4 py-2 text-[11px] font-semibold text-primary transition hover:bg-secondary-fixed"
                >
                  Explore Dashboard
                </Link>
              </article>

              <article className="rounded border border-outline-variant bg-surface-container-lowest p-6 transition hover:border-secondary md:col-span-2 lg:col-span-4">
                <LockKeyhole size={20} className="mb-7 text-secondary" />
                <h3 className="mb-3 text-sm font-semibold text-on-surface">
                  HIPAA-Compliant Access
                </h3>
                <p className="text-xs leading-5 text-on-surface-variant">
                  Military-grade encryption and granular role-based access
                  controls to ensure total patient data privacy.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="solutions" className="bg-surface-container-low py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-5 lg:px-6">
            <h2 className="mb-10 text-center text-2xl font-medium">
              Solutions Tailored for the Ecosystem
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {solutions.map(({ icon: Icon, title, image, description }) => (
                <article
                  key={title}
                  className="overflow-hidden rounded border border-outline-variant bg-surface-container-lowest"
                >
                  <img src={image} alt={title} className="h-44 w-full object-cover" />
                  <div className="p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded bg-secondary/10 text-secondary">
                        <Icon size={16} />
                      </span>
                      <h3 className="text-sm font-semibold">{title}</h3>
                    </div>
                    <p className="text-xs leading-5 text-on-surface-variant">
                      {description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-background py-16">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-5 md:grid-cols-2 lg:px-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {standards.map(({ icon: Icon, title, description }, index) => (
                <article
                  key={title}
                  className={`rounded bg-surface-container-low p-6 ${
                    index % 2 === 1 ? "sm:mt-8" : ""
                  }`}
                >
                  <Icon size={17} className="mb-5 text-secondary" />
                  <h3 className="mb-2 text-sm font-semibold">{title}</h3>
                  <p className="text-xs leading-5 text-on-surface-variant">
                    {description}
                  </p>
                </article>
              ))}
            </div>

            <div>
              <h2 className="max-w-md text-3xl font-medium leading-tight">
                The Gold Standard for Healthcare Digitalization
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-6 text-on-surface-variant">
                Vans Healthcare is more than just a software platform; it is a
                foundation for better outcomes. By unifying disparate systems,
                we allow medical professionals to focus on what truly matters:
                the patient.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-on-surface">
                {[
                  "99.99% Uptime SLA for Critical Operations",
                  "24/7 Priority Support for Medical Staff",
                  "Seamless HL7/FHIR Data Integration",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 size={16} className="text-secondary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="testimonials" className="bg-surface-container-low py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-5 lg:px-6">
            <h2 className="mb-10 text-center text-2xl font-medium">
              Trusted by Industry Leaders
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {[
                {
                  initials: "JW",
                  quote:
                    "Vans Healthcare has fundamentally changed how we manage our 50-doctor practice. The real-time analytics have helped us reduce patient wait times by 30% while increasing overall satisfaction.",
                  name: "Dr. James Wilson",
                  role: "Medical Director, St. Jude's Clinic",
                },
                {
                  initials: "SA",
                  quote:
                    "As an administrator, the billing and HIPAA compliance modules are lifesavers. The transition was seamless, and the interface is incredibly intuitive for even our most non-technical staff.",
                  name: "Sarah Adams",
                  role: "Chief Operations Officer, Metropolitan General",
                },
              ].map((testimonial) => (
                <article
                  key={testimonial.name}
                  className="relative rounded border border-outline-variant bg-surface-container-lowest p-8"
                >
                  <FileText
                    size={34}
                    className="absolute right-7 top-7 text-outline/15"
                  />
                  <p className="relative mb-8 text-sm italic leading-6 text-on-surface">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded bg-secondary/10 text-xs font-bold text-secondary">
                      {testimonial.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{testimonial.name}</p>
                      <p className="text-[11px] text-on-surface-variant">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="bg-background py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-5 lg:px-6">
            <div className="overflow-hidden rounded border border-outline-variant bg-surface-container-lowest md:grid md:grid-cols-[0.92fr_1.38fr]">
              <div className="bg-primary p-8 text-on-primary sm:p-10">
                <h2 className="text-2xl font-semibold">Get in Touch</h2>
                <p className="mt-7 text-sm font-medium leading-6 text-on-primary/80">
                  Ready to modernize your healthcare operations? Our specialists
                  are standing by to provide a custom demo.
                </p>
                <div className="mt-10 space-y-4 text-sm font-semibold">
                  <div className="flex items-center gap-3">
                    <Mail size={16} />
                    enterprise@vanshealth.com
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={16} />
                    +1 (800) 555-0123
                  </div>
                </div>
              </div>

              <form
                className="space-y-4 p-8 sm:p-10"
                onSubmit={(event) => event.preventDefault()}
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="space-y-1.5 text-[11px] font-medium text-outline">
                    First Name
                    <input
                      type="text"
                      placeholder="John"
                      className="w-full rounded-sm border border-transparent bg-surface-container-low px-3 py-2.5 text-xs text-on-surface outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                    />
                  </label>
                  <label className="space-y-1.5 text-[11px] font-medium text-outline">
                    Last Name
                    <input
                      type="text"
                      placeholder="Doe"
                      className="w-full rounded-sm border border-transparent bg-surface-container-low px-3 py-2.5 text-xs text-on-surface outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                    />
                  </label>
                </div>

                <label className="space-y-1.5 text-[11px] font-medium text-outline">
                  Organization
                  <input
                    type="text"
                    placeholder="Hospital or Clinic Name"
                    className="w-full rounded-sm border border-transparent bg-surface-container-low px-3 py-2.5 text-xs text-on-surface outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                  />
                </label>

                <label className="space-y-1.5 text-[11px] font-medium text-outline">
                  Inquiry Type
                  <select className="w-full rounded-sm border border-transparent bg-surface-container-low px-3 py-2.5 text-xs text-on-surface outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20">
                    <option>Enterprise Solution Demo</option>
                    <option>Partnership Inquiry</option>
                    <option>Support Request</option>
                  </select>
                </label>

                <label className="space-y-1.5 text-[11px] font-medium text-outline">
                  Message
                  <textarea
                    placeholder="Tell us about your needs..."
                    className="h-28 w-full resize-none rounded-sm border border-transparent bg-surface-container-low px-3 py-2.5 text-xs text-on-surface outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                  />
                </label>

                <button className="w-full rounded-sm bg-secondary py-2.5 text-xs font-semibold text-on-secondary transition hover:bg-secondary/90">
                  Send Inquiry
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-outline-variant bg-surface-container-lowest px-4 py-8 sm:px-5 lg:px-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <Link to="/" className="text-sm font-semibold text-secondary">
              Vans Healthcare
            </Link>
            <p className="mt-3 text-xs text-on-surface-variant">
              (c) 2026 Vans Healthcare. All rights reserved.
              <br />
              Secure, HIPAA-compliant clinical management.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs">
            {["Privacy Policy", "Terms of Service", "Security", "Status", "API Docs"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="text-on-surface-variant underline transition hover:text-primary"
                >
                  {item}
                </a>
              )
            )}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
