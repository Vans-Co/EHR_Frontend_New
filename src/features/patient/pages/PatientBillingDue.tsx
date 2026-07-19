import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import EmptyState from "@/components/common/EmptyState";
import {
  BillingDataSkeleton,
  BillingErrorState,
  BillingPageShell,
  DueSummaryTiles,
  OutstandingBillsTable,
  usePatientBillingData,
} from "@/features/patient/components/PatientBillingShared";

const PatientBillingDue = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, retry } =
    usePatientBillingData();

  const dueItems = useMemo(
    () =>
      data.items.filter(
        (item) => item.status !== "paid"
      ),
    [data.items]
  );

  if (isLoading) {
    return (
      <BillingPageShell
        title="Outstanding Payments"
        description="Track pending, due soon, and overdue invoices in one place."
      >
        <BillingDataSkeleton rows={4} />
      </BillingPageShell>
    );
  }

  if (isError) {
    return (
      <BillingPageShell
        title="Outstanding Payments"
        description="Track pending, due soon, and overdue invoices in one place."
      >
        <BillingErrorState onRetry={retry} />
      </BillingPageShell>
    );
  }

  return (
    <BillingPageShell
      title="Outstanding Payments"
      description="Review every unpaid bill, upcoming due date, and overdue amount before it impacts care continuity."
    >
      <DueSummaryTiles items={dueItems} />

      {dueItems.length === 0 ? (
        <EmptyState
          title="No outstanding bills"
          description="All current patient charges have already been settled."
        />
      ) : (
        <OutstandingBillsTable
          items={dueItems}
          onRowClick={(item) =>
            navigate(
              `/patient/billing/invoices/${item.invoiceId}`
            )
          }
        />
      )}
    </BillingPageShell>
  );
};

export default PatientBillingDue;
