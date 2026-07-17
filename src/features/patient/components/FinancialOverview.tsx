import {
  ArrowRight,
  CreditCard,
  ReceiptText,
  ShieldCheck,
  Wallet,
} from "lucide-react";

const FinancialOverview = () => {
  return (
    <section className="h-full rounded-[30px] border border-white/20 bg-white/70 p-5 shadow-[0_15px_35px_rgba(0,0,0,0.08)] backdrop-blur-xl">

      {/* Header */}

      <div className="mb-4 flex items-center justify-between">

        <div>
          <p className="text-sm text-on-surface-variant">
            Billing & Insurance
          </p>

          <h2 className="mt-1 text-xl font-bold text-on-background">
            Financial Overview
          </h2>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">
          <Wallet
            size={20}
            className="text-primary"
          />
        </div>

      </div>

      {/* Outstanding Balance */}

      <div className="rounded-2xl border border-red-200/70 bg-gradient-to-r from-red-50 to-red-100/70 p-4">

        <div className="flex items-start justify-between">

          <div>

            <p className="text-xs uppercase tracking-wide text-red-500">
              Outstanding Balance
            </p>

            <h3 className="mt-1 text-3xl font-bold text-red-600">
              $145.00
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Cardiology Lab Work • May 12
            </p>

          </div>

          <CreditCard
            size={22}
            className="text-red-500"
          />

        </div>

        <button className="mt-3 inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700">
          Pay Now
          <ArrowRight size={15} />
        </button>

      </div>

      {/* Bottom Cards */}

      <div className="mt-4 grid grid-cols-2 gap-3">

        {/* Insurance */}

        <div className="rounded-2xl bg-slate-50/90 p-3">

          <div className="mb-2 flex items-center gap-2">

            <ShieldCheck
              size={18}
              className="text-emerald-600"
            />

            <p className="text-sm font-semibold text-on-background">
              Insurance
            </p>

          </div>

          <p className="text-xs text-on-surface-variant">
            Aetna Claim #8291
          </p>

          <span className="mt-2 inline-flex rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
            Approved
          </span>

        </div>

        {/* Payment */}

        <div className="rounded-2xl bg-slate-50/90 p-3">

          <div className="mb-2 flex items-center gap-2">

            <ReceiptText
              size={18}
              className="text-primary"
            />

            <p className="text-sm font-semibold text-on-background">
              Recent Payment
            </p>

          </div>

          <p className="text-xs text-on-surface-variant">
            Pharmacy Co-pay
          </p>

          <p className="mt-2 text-lg font-bold text-primary">
            $15.00
          </p>

        </div>

      </div>

    </section>
  );
};

export default FinancialOverview;