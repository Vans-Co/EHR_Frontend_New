import { useMemo, useState } from "react";
import {
  CalendarClock,
  RotateCw,
  ShieldCheck,
} from "lucide-react";

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
  formatBillingDate,
  BillingPageShell,
  BillingSummaryCard,
  RecurringBillsTable,
  usePatientBillingData,
} from "@/features/patient/components/PatientBillingShared";

import type { RecurringBill } from "@/features/patient/types/billing.types";

const PatientBillingRecurring = () => {
  const { data, isLoading, isError, retry } =
    usePatientBillingData();
  const [statusOverrides, setStatusOverrides] =
    useState<
      Partial<
        Record<string, RecurringBill["status"]>
      >
    >({});
  const [selectedBill, setSelectedBill] =
    useState<RecurringBill | null>(null);

  const recurringBills = useMemo(
    () =>
      data.recurringBills.map((bill) =>
        statusOverrides[bill.id]
          ? {
              ...bill,
              status:
                statusOverrides[
                  bill.id
                ] as RecurringBill["status"],
            }
          : bill
      ),
    [data.recurringBills, statusOverrides]
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

      <section className="grid gap-4 xl:grid-cols-[1.25fr_0.95fr]">
        <div className="rounded-[30px] border border-white/30 bg-[linear-gradient(180deg,rgba(255,255,255,0.90),rgba(248,252,255,0.82))] p-5 shadow-[0_18px_38px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] bg-sky-100 text-sky-600">
              <RotateCw size={22} />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-on-surface-variant">
                Billing Control
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-on-background">
                Keep recurring plans aligned with care schedules
              </h2>
              <p className="mt-2 text-sm leading-6 text-on-surface-variant">
                Review upcoming renewals, pause plans that are no longer needed, and reactivate subscriptions when treatment resumes.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
          <div className="rounded-[30px] border border-white/30 bg-[linear-gradient(180deg,rgba(255,255,255,0.90),rgba(248,252,255,0.82))] p-5 shadow-[0_18px_38px_rgba(15,23,42,0.08)] backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-[18px] bg-amber-100 text-amber-600">
                <CalendarClock size={20} />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface-variant">
                  Next Renewal
                </p>
                <p className="mt-1 text-lg font-bold text-on-background">
                  {recurringBills[0]
                    ? formatBillingDate(
                        recurringBills[0].nextBillingDate
                      )
                    : "No plans"}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[30px] border border-white/30 bg-[linear-gradient(180deg,rgba(255,255,255,0.90),rgba(248,252,255,0.82))] p-5 shadow-[0_18px_38px_rgba(15,23,42,0.08)] backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-[18px] bg-emerald-100 text-emerald-600">
                <ShieldCheck size={20} />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface-variant">
                  Active Coverage
                </p>
                <p className="mt-1 text-lg font-bold text-on-background">
                  {recurringBills.filter((bill) => bill.status !== "paused").length} plans monitored
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {recurringBills.length === 0 ? (
        <EmptyState
          title="No recurring bills"
          description="Recurring medication or subscription charges will show up here when available."
        />
      ) : (
        <section className="space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-on-surface-variant">
                Active Table
              </p>
              <h2 className="text-2xl font-bold tracking-tight text-on-background">
                Recurring billing schedule
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-on-surface-variant">
              Each row now keeps its actions aligned and its status easy to scan, even when service descriptions are longer.
            </p>
          </div>

          <RecurringBillsTable
            items={recurringBills}
            onPause={(bill) => setSelectedBill(bill)}
            onResume={(bill) => {
              setStatusOverrides((current) => ({
                ...current,
                [bill.id]: "active",
              }));
            }}
            onPayNow={(bill) => {
              setStatusOverrides((current) => ({
                ...current,
                [bill.id]: "active",
              }));
            }}
          />
        </section>
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
            {selectedBill?.serviceName} will be marked as paused in the interface so the patient can review it later. Its activity status will update immediately, and the next billing date will remain {selectedBill ? formatBillingDate(selectedBill.nextBillingDate) : "unchanged"} until backend support is connected.
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
                  setStatusOverrides((current) => ({
                    ...current,
                    [selectedBill.id]: "paused",
                  }));
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
