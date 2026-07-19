import EmptyState from "@/components/common/EmptyState";
import {
  BillingDataSkeleton,
  BillingErrorState,
  BillingPageShell,
  PaymentHistoryTable,
  usePatientBillingData,
} from "@/features/patient/components/PatientBillingShared";

const PatientBillingHistory = () => {
  const { data, isLoading, isError, retry } =
    usePatientBillingData();

  if (isLoading) {
    return (
      <BillingPageShell
        title="Payment History"
        description="A complete ledger of completed patient payments and transaction references."
      >
        <BillingDataSkeleton rows={3} />
      </BillingPageShell>
    );
  }

  if (isError) {
    return (
      <BillingPageShell
        title="Payment History"
        description="A complete ledger of completed patient payments and transaction references."
      >
        <BillingErrorState onRetry={retry} />
      </BillingPageShell>
    );
  }

  return (
    <BillingPageShell
      title="Payment History"
      description="A complete ledger of completed patient payments and transaction references."
    >
      {data.payments.length === 0 ? (
        <EmptyState
          title="No payment history yet"
          description="Completed invoice payments will appear here once they are processed."
        />
      ) : (
        <PaymentHistoryTable items={data.payments} />
      )}
    </BillingPageShell>
  );
};

export default PatientBillingHistory;
