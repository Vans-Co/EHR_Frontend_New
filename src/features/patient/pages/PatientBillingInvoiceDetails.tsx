import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import EmptyState from "@/components/common/EmptyState";
import AppButton from "@/components/common/AppButton";
import {
  BillingPageShell,
  BillingQuickLinks,
  BillingSummaryCard,
  InvoiceActionBar,
  InvoiceChargesCard,
  InvoiceSummaryCard,
  formatCurrency,
  getInvoiceById,
  usePatientBillingData,
} from "@/features/patient/components/PatientBillingShared";

const PatientBillingInvoiceDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, isError, retry } =
    usePatientBillingData();
  const invoice = getInvoiceById(data.invoices, id);

  if (isLoading) {
    return (
      <BillingPageShell
        title="Invoice Details"
        description="Loading invoice details and charge breakdown."
      >
        <div className="h-48 animate-pulse rounded-[28px] bg-white/70 shadow-sm" />
        <div className="h-64 animate-pulse rounded-[28px] bg-white/70 shadow-sm" />
      </BillingPageShell>
    );
  }

  if (isError) {
    return (
      <BillingPageShell
        title="Invoice Details"
        description="Loading invoice details and charge breakdown."
      >
        <EmptyState
          title="Invoice details could not be loaded"
          description="Please retry to fetch this invoice again."
          actionLabel="Retry"
          onAction={retry}
        />
      </BillingPageShell>
    );
  }

  if (!invoice) {
    return (
      <BillingPageShell
        title="Invoice Details"
        description="Loading invoice details and charge breakdown."
      >
        <EmptyState
          title="Invoice not found"
          description="The selected invoice could not be located in the current patient billing records."
          actionLabel="Back to Billing"
          onAction={() => navigate("/patient/billing")}
        />
      </BillingPageShell>
    );
  }

  return (
    <BillingPageShell
      title="Invoice Details"
      description="Review the full invoice, line-item charges, discounts, insurance coverage, and receipt actions."
      actions={
        <AppButton
          variant="outline"
          onClick={() => navigate("/patient/billing")}
        >
          <ArrowLeft size={16} />
          Back to Billing
        </AppButton>
      }
    >
      <InvoiceActionBar invoice={invoice} />

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <BillingSummaryCard
          title="Final Amount"
          amount={invoice.finalAmount}
          description="Final payable amount after discounts and coverage."
          icon={<span className="text-xl text-white">₹</span>}
          accentClassName="bg-gradient-to-br from-emerald-500 to-teal-500 text-white"
        />
        <BillingSummaryCard
          title="Discounts"
          amount={invoice.discounts}
          description="Savings applied to this invoice."
          icon={<span className="text-xl text-white">%</span>}
          accentClassName="bg-gradient-to-br from-sky-500 to-cyan-500 text-white"
        />
        <BillingSummaryCard
          title="Insurance Coverage"
          amount={invoice.insuranceCoverage}
          description="Amount covered by insurance for this bill."
          icon={<span className="text-xl text-white">+</span>}
          accentClassName="bg-gradient-to-br from-violet-500 to-indigo-500 text-white"
        />
        <BillingSummaryCard
          title="Outstanding Payments"
          amount={
            invoice.paymentStatus === "paid"
              ? 0
              : invoice.finalAmount
          }
          description="Remaining balance still due on this invoice."
          icon={<span className="text-xl text-white">!</span>}
          accentClassName="bg-gradient-to-br from-red-500 to-orange-500 text-white"
        />
      </section>

      <InvoiceSummaryCard invoice={invoice} />
      <InvoiceChargesCard invoice={invoice} />
      <BillingQuickLinks />

      <section className="rounded-[28px] border border-white/20 bg-white/75 p-5 shadow-[0_15px_35px_rgba(0,0,0,0.08)] backdrop-blur-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-on-surface-variant">
          Quick Summary
        </p>
        <p className="mt-3 text-sm leading-7 text-on-surface-variant">
          Invoice <span className="font-semibold text-on-background">{invoice.invoiceNumber}</span>{" "}
          was generated for {invoice.patient} under {invoice.doctor}. The
          patient payable amount is{" "}
          <span className="font-semibold text-on-background">
            {formatCurrency(invoice.finalAmount)}
          </span>
          .
        </p>
      </section>
    </BillingPageShell>
  );
};

export default PatientBillingInvoiceDetails;
