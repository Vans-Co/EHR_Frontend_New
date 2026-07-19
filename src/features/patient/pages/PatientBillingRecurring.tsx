import { useMemo, useState } from "react";
import { RotateCw } from "lucide-react";

import EmptyState from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  BillingDataSkeleton,
  BillingErrorState,
  BillingPageShell,
  BillingSummaryCard,
  RecurringBillsTable,
  usePatientBillingData,
} from "@/features/patient/components/PatientBillingShared";

import type { RecurringBill } from "@/features/patient/types/billing.types";

const PatientBillingRecurring = () => {
  const { data, isLoading, isError, retry } =
    usePatientBillingData();
  const [pausedIds, setPausedIds] = useState<string[]>(
    []
  );
  const [selectedBill, setSelectedBill] =
    useState<RecurringBill | null>(null);

  const recurringBills = useMemo(
    () =>
      data.recurringBills.map((bill) =>
        pausedIds.includes(bill.id)
          ? { ...bill, status: "paused" as const }
          : bill
      ),
    [data.recurringBills, pausedIds]
  );

  if (isLoading) {
    return (
      <BillingPageShell
        title="Recurring Bills"
        description="Manage recurring healthcare expenses such as monthly medication refills."
      >
        <BillingDataSkeleton rows={3} />
      </BillingPageShell>
    );
  }

  if (isError) {
    return (
      <BillingPageShell
        title="Recurring Bills"
        description="Manage recurring healthcare expenses such as monthly medication refills."
      >
        <BillingErrorState onRetry={retry} />
      </BillingPageShell>
    );
  }

  return (
    <BillingPageShell
      title="Recurring Bills"
      description="Manage recurring healthcare expenses such as monthly medication refills."
    >
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <BillingSummaryCard
          title="Active Plans"
          value={`${recurringBills.filter((bill) => bill.status === "active").length} Plans`}
          formatAsCurrency={false}
          description="Recurring healthcare payments currently running."
          icon={<RotateCw size={22} className="text-white" />}
          accentClassName="bg-gradient-to-br from-sky-500 to-cyan-500 text-white"
        />
        <BillingSummaryCard
          title="Due Soon"
          value={`${recurringBills.filter((bill) => bill.status === "dueSoon").length} Plans`}
          formatAsCurrency={false}
          description="Subscriptions renewing in the immediate cycle."
          icon={<RotateCw size={22} className="text-white" />}
          accentClassName="bg-gradient-to-br from-amber-500 to-yellow-500 text-white"
        />
        <BillingSummaryCard
          title="Paused"
          value={`${recurringBills.filter((bill) => bill.status === "paused").length} Plans`}
          formatAsCurrency={false}
          description="UI-only cancellations or paused recurring payments."
          icon={<RotateCw size={22} className="text-white" />}
          accentClassName="bg-gradient-to-br from-slate-500 to-slate-700 text-white"
        />
      </section>

      {recurringBills.length === 0 ? (
        <EmptyState
          title="No recurring bills"
          description="Recurring medication or subscription charges will show up here when available."
        />
      ) : (
        <RecurringBillsTable
          items={recurringBills}
          onCancel={(bill) => setSelectedBill(bill)}
        />
      )}

      <Dialog
        open={Boolean(selectedBill)}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedBill(null);
          }
        }}
      >
        <DialogContent className="rounded-[28px]">
          <DialogHeader>
            <DialogTitle>Cancel Recurring Payment</DialogTitle>
            <DialogDescription>
              This is a UI-only action because backend cancellation is not connected yet.
            </DialogDescription>
          </DialogHeader>

          <p className="text-sm leading-6 text-on-surface-variant">
            {selectedBill?.serviceName} will be marked as paused in the interface so the patient can review it later.
          </p>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setSelectedBill(null)}
            >
              Keep Active
            </Button>
            <Button
              onClick={() => {
                if (selectedBill) {
                  setPausedIds((current) =>
                    current.includes(selectedBill.id)
                      ? current
                      : [...current, selectedBill.id]
                  );
                }
                setSelectedBill(null);
              }}
            >
              Pause Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </BillingPageShell>
  );
};

export default PatientBillingRecurring;
