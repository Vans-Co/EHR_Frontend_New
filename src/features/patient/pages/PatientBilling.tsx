import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, IndianRupee, Receipt, RotateCw } from "lucide-react";

import EmptyState from "@/components/common/EmptyState";
import {
  BillingDataSkeleton,
  BillingErrorState,
  BillingFilterBar,
  BillingPageShell,
  BillingQuickLinks,
  BillingReminderCard,
  BillingSummaryCard,
  BillingTable,
  // InsuranceBillingCard,
  usePatientBillingData,
} from "@/features/patient/components/PatientBillingShared";

const PatientBilling = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, retry } = usePatientBillingData();
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedServiceType, setSelectedServiceType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredItems = useMemo(
    () =>
      data.items.filter((item) => {
        const matchesSearch =
          !search ||
          item.description.toLowerCase().includes(search.toLowerCase()) ||
          item.invoiceNumber.toLowerCase().includes(search.toLowerCase());

        const matchesDate = !selectedDate || item.date === selectedDate;

        const matchesServiceType =
          selectedServiceType === "all" ||
          item.serviceType === selectedServiceType;

        const matchesStatus =
          selectedStatus === "all" || item.status === selectedStatus;

        return (
          matchesSearch && matchesDate && matchesServiceType && matchesStatus
        );
      }),
    [data.items, search, selectedDate, selectedServiceType, selectedStatus],
  );

  if (isLoading) {
    return (
      <BillingPageShell
        title="Billing Overview"
        description="Track outstanding balances, invoices, due dates, recurring healthcare bills, and payment history."
      >
        <BillingDataSkeleton />
      </BillingPageShell>
    );
  }

  if (isError) {
    return (
      <BillingPageShell
        title="Billing Overview"
        description="Track outstanding balances, invoices, due dates, recurring healthcare bills, and payment history."
      >
        <BillingErrorState onRetry={retry} />
      </BillingPageShell>
    );
  }

  return (
    <BillingPageShell
      title="Billing Overview"
      description="A complete financial view for the patient dashboard, including every charge, reminders, insurance coverage, and invoice access."
    >
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <BillingSummaryCard
          title="Total Outstanding"
          amount={data.summary.totalOutstanding}
          description="Unpaid balances that still require action."
          icon={<CreditCard size={22} className="text-white" />}
          accentClassName="border-red-200/40 bg-gradient-to-br from-red-500/10 via-white/75 to-white/65 shadow-[0_12px_35px_rgba(244,63,94,.08)]"
          glowClassName="bg-red-400/20"
          pillClassName="from-red-400 via-rose-400 to-orange-500"
          dotClassName="bg-red-500"
          statusLabel="Priority"
        />
        <BillingSummaryCard
          title="Total Due"
          amount={data.summary.upcomingDue}
          description="Bills approaching their payment due date."
          icon={<Receipt size={22} className="text-white" />}
          accentClassName="border-amber-200/40 bg-gradient-to-br from-amber-500/10 via-white/75 to-white/65 shadow-[0_12px_35px_rgba(245,158,11,.08)]"
          glowClassName="bg-amber-400/20"
          pillClassName="from-amber-400 via-yellow-400 to-orange-500"
          dotClassName="bg-amber-500"
          statusLabel="Due Soon"
        />
        <BillingSummaryCard
          title="Total Paid"
          amount={data.summary.totalPaid}
          description="Completed payments successfully received."
          icon={<IndianRupee size={22} className="text-white" />}
          accentClassName="border-emerald-200/40 bg-gradient-to-br from-emerald-500/10 via-white/75 to-white/65 shadow-[0_12px_35px_rgba(16,185,129,.08)]"
          glowClassName="bg-emerald-400/20"
          pillClassName="from-emerald-400 via-green-400 to-teal-500"
          dotClassName="bg-emerald-500"
          statusLabel="Received"
        />
        <BillingSummaryCard
          title="Recurring Bills"
          value={`${data.summary.activeRecurringBills} Bills`}
          formatAsCurrency={false}
          description="Subscriptions for monthly medications and care."
          icon={<RotateCw size={22} className="text-white" />}
          accentClassName="border-violet-200/40 bg-gradient-to-br from-violet-500/10 via-white/75 to-white/65 shadow-[0_12px_35px_rgba(168,85,247,.08)]"
          glowClassName="bg-violet-400/20"
          pillClassName="from-violet-400 via-fuchsia-400 to-indigo-500"
          dotClassName="bg-violet-500"
          statusLabel="Auto Pay"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <div className="space-y-4">
          {data.reminders.length === 0 ? (
            <EmptyState
              title="No billing reminders right now"
              description="Due-tomorrow, overdue, and recurring medication reminders will show up here."
            />
          ) : (
            data.reminders.map((reminder) => (
              <BillingReminderCard key={reminder.id} reminder={reminder} />
            ))
          )}
        </div>

        <div className="space-y-6">
          <BillingQuickLinks />
        </div>
      </section>

      <section className="space-y-6">
        <BillingFilterBar
          search={search}
          date={selectedDate}
          serviceType={selectedServiceType}
          status={selectedStatus}
          onSearchChange={setSearch}
          onDateChange={setSelectedDate}
          onServiceTypeChange={setSelectedServiceType}
          onStatusChange={setSelectedStatus}
          onReset={() => {
            setSearch("");
            setSelectedDate("");
            setSelectedServiceType("all");
            setSelectedStatus("all");
          }}
        />

        {filteredItems.length === 0 ? (
          <EmptyState
            title="No billing items found"
            description="Try adjusting the current filters to see more invoices and service charges."
          />
        ) : (
          <BillingTable
            items={filteredItems}
            onRowClick={(item) =>
              navigate(`/patient/billing/invoices/${item.invoiceId}`)
            }
          />
        )}
      </section>
    </BillingPageShell>
  );
};

export default PatientBilling;
