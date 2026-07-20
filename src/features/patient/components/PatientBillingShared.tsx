import { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  AlertTriangle,
  BellRing,
  CalendarClock,
  CheckCircle2,
  CreditCard,
  FileDown,
  IndianRupee,
  PauseCircle,
  Receipt,
  RotateCw,
  Sparkles,
  TimerReset,
  Wallet,
} from "lucide-react";
import { format, parseISO } from "date-fns";

import AppButton from "@/components/common/AppButton";
import AppCard from "@/components/common/AppCard";
import AppDatePicker from "@/components/common/AppDatePicker";
import AppInput from "@/components/common/AppInput";
import AppSelect from "@/components/common/AppSelect";
import EmptyState from "@/components/common/EmptyState";
import { Badge } from "@/components/ui/badge";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { patientBillingData } from "@/features/patient/mock/patientBilling.mock";

import type {
  BillingInvoice,
  BillingItem,
  BillingPaymentHistoryItem,
  BillingReminder,
  BillingStatus,
  PatientBillingData,
  RecurringBill,
} from "@/features/patient/types/billing.types";

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const billingNavItems = [
  { label: "Overview", to: "/patient/billing" },
  { label: "Outstanding", to: "/patient/billing/due" },
  { label: "History", to: "/patient/billing/history" },
  { label: "Recurring", to: "/patient/billing/recurring" },
];

const serviceTypeOptions = [
  { label: "All Services", value: "all" },
  { label: "Appointment", value: "Appointment" },
  { label: "Consultation", value: "Consultation" },
  { label: "Lab Test", value: "Lab Test" },
  { label: "Scan", value: "Scan" },
  { label: "Medication", value: "Medication" },
  { label: "Procedure", value: "Procedure" },
];

const statusOptions = [
  { label: "All Statuses", value: "all" },
  { label: "Paid", value: "paid" },
  { label: "Due Soon", value: "dueSoon" },
  { label: "Pending", value: "pending" },
  { label: "Overdue", value: "overdue" },
];

const recurringStatusClasses: Record<RecurringBill["status"], string> = {
  active: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  dueSoon: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  paused: "bg-slate-100 text-slate-700 ring-1 ring-slate-200",
};

const billingStatusClasses: Record<BillingStatus, string> = {
  paid: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  dueSoon: "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-200",
  pending: "bg-orange-50 text-orange-700 ring-1 ring-orange-200",
  overdue: "bg-red-50 text-red-700 ring-1 ring-red-200",
};

const billingStatusLabels: Record<BillingStatus, string> = {
  paid: "Paid",
  dueSoon: "Due Soon",
  pending: "Pending",
  overdue: "Overdue",
};

const billingStatusDotClasses: Record<BillingStatus, string> = {
  paid: "bg-emerald-500",
  dueSoon: "bg-yellow-500",
  pending: "bg-orange-500",
  overdue: "bg-red-500",
};

export const formatCurrency = (value: number) =>
  currencyFormatter.format(value);

export const formatBillingDate = (value: string) =>
  format(parseISO(value), "dd MMM yyyy");

export const getInvoiceById = (
  invoices: BillingInvoice[],
  invoiceId?: string,
) => invoices.find((invoice) => invoice.id === invoiceId);

export const getInvoicePreview = (invoice: BillingInvoice) => {
  const chargeLines = invoice.charges
    .map((charge) => `${charge.label}: ${formatCurrency(charge.amount)}`)
    .join("\n");

  return [
    `Invoice Number: ${invoice.invoiceNumber}`,
    `Invoice Date: ${formatBillingDate(invoice.invoiceDate)}`,
    `Due Date: ${formatBillingDate(invoice.dueDate)}`,
    `Doctor: ${invoice.doctor}`,
    `Patient: ${invoice.patient}`,
    "",
    "Charges",
    chargeLines,
    "",
    `Discounts: ${formatCurrency(invoice.discounts)}`,
    `Insurance Coverage: ${formatCurrency(invoice.insuranceCoverage)}`,
    `Final Amount: ${formatCurrency(invoice.finalAmount)}`,
    `Payment Status: ${billingStatusLabels[invoice.paymentStatus]}`,
    invoice.paymentMethod ? `Payment Method: ${invoice.paymentMethod}` : null,
    invoice.transactionId ? `Transaction ID: ${invoice.transactionId}` : null,
  ]
    .filter(Boolean)
    .join("\n");
};

const downloadTextFile = (filename: string, content: string) => {
  const file = new Blob([content], {
    type: "text/plain;charset=utf-8",
  });
  const url = URL.createObjectURL(file);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
};

export const downloadInvoiceFile = (invoice: BillingInvoice) => {
  downloadTextFile(`${invoice.invoiceNumber}.txt`, getInvoicePreview(invoice));
};

export const downloadReceiptFile = (invoice: BillingInvoice) => {
  downloadTextFile(
    `${invoice.receiptNumber ?? invoice.invoiceNumber}-receipt.txt`,
    [
      `Receipt Number: ${invoice.receiptNumber ?? "Pending"}`,
      `Invoice Number: ${invoice.invoiceNumber}`,
      `Amount Received: ${formatCurrency(invoice.finalAmount)}`,
      `Payment Status: ${billingStatusLabels[invoice.paymentStatus]}`,
      invoice.paymentMethod ? `Payment Method: ${invoice.paymentMethod}` : null,
      invoice.transactionId ? `Transaction ID: ${invoice.transactionId}` : null,
    ]
      .filter(Boolean)
      .join("\n"),
  );
};

interface BillingPageShellProps {
  title: string;
  description: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

interface BillingTableProps {
  items: BillingItem[];
  onRowClick?: (item: BillingItem) => void;
}

interface BillingFilterBarProps {
  search: string;
  date: string;
  serviceType: string;
  status: string;
  onSearchChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onServiceTypeChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onReset: () => void;
}

interface BillingDataState {
  data: PatientBillingData;
  isLoading: boolean;
  isError: boolean;
  retry: () => void;
}

export const usePatientBillingData = (): BillingDataState => {
  const [mode, setMode] = useState<"default" | "empty" | "error">(() => {
    const params = new URLSearchParams(window.location.search);
    const state = params.get("state");
    if (state === "empty" || state === "error") {
      return state;
    }

    return "default";
  });
  const [isLoading, setIsLoading] = useState(true);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    setIsLoading(true);

    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 650);

    return () => window.clearTimeout(timer);
  }, [attempt, mode]);

  const data = useMemo<PatientBillingData>(() => {
    if (mode === "empty") {
      return {
        ...patientBillingData,
        summary: {
          totalOutstanding: 0,
          totalPaid: 0,
          upcomingDue: 0,
          activeRecurringBills: 0,
        },
        items: [],
        invoices: [],
        payments: [],
        recurringBills: [],
        reminders: [],
        insurance: undefined,
      };
    }

    return patientBillingData;
  }, [mode]);

  return {
    data,
    isLoading,
    isError: !isLoading && mode === "error",
    retry: () => {
      setMode("default");
      setAttempt((current) => current + 1);
    },
  };
};

export const BillingPageShell = ({
  title,
  description,
  children,
  actions,
}: BillingPageShellProps) => (
  <div className="mx-auto flex w-full max-w-[1700px] flex-col gap-6">
    <section className="relative overflow-hidden rounded-[34px] border border-white/60 bg-[radial-gradient(circle_at_top_left,_rgba(186,230,253,0.9),_transparent_32%),linear-gradient(135deg,rgba(240,249,255,0.96),rgba(255,255,255,0.98),rgba(236,254,255,0.94))] p-5 shadow-[0_24px_55px_rgba(14,165,233,0.10)] sm:p-6">
      <div className="absolute -left-16 top-10 h-40 w-40 rounded-full bg-sky-200/35 blur-3xl" />
      <div className="absolute -right-10 top-0 h-44 w-44 rounded-full bg-cyan-200/40 blur-3xl" />
      <div className="absolute bottom-0 right-1/3 h-28 w-28 rounded-full bg-white/60 blur-2xl" />

      <div className="relative flex flex-col gap-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-2">
            <Badge className="rounded-full border border-sky-200/80 bg-white/80 px-3 py-1 text-[11px] font-semibold tracking-[0.24em] text-primary uppercase shadow-sm">
              Patient Billing
            </Badge>

            <div>
              <h1 className="text-3xl font-bold tracking-tight text-on-background sm:text-[2.15rem]">
                {title}
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-on-surface-variant sm:text-[15px]">
                {description}
              </p>
            </div>
          </div>

          {actions && (
            <div className="flex flex-wrap items-center gap-3">{actions}</div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 rounded-[26px] border border-white/70 bg-white/70 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] backdrop-blur-md">
          {billingNavItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/patient/billing"}
              className={({ isActive }) =>
                cn(
                  "rounded-2xl px-4 py-2.5 text-sm font-semibold transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-[0_10px_25px_rgba(14,165,233,0.26)]"
                    : "text-on-surface-variant hover:bg-white hover:text-on-background",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </section>

    {children}
  </div>
);

export const BillingSummaryCard = ({
  title,
  amount,
  value,
  formatAsCurrency = true,
  description,
  icon,
  accentClassName,
}: {
  title: string;
  amount?: number;
  value?: string;
  formatAsCurrency?: boolean;
  description: string;
  icon: React.ReactNode;
  accentClassName: string;
}) => (
  <AppCard
    className="border-white/30 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(248,252,255,0.82))] shadow-[0_18px_38px_rgba(15,23,42,0.08)] backdrop-blur-xl"
    bodyClassName="p-5 sm:p-6"
  >
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-on-surface-variant">
          {title}
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-on-background">
          {value ??
            (formatAsCurrency
              ? formatCurrency(amount ?? 0)
              : String(amount ?? 0))}
        </h2>
        <p className="mt-2 max-w-[26ch] text-sm leading-6 text-on-surface-variant">
          {description}
        </p>
      </div>

      <div
        className={cn(
          "flex h-13 w-13 shrink-0 items-center justify-center rounded-[20px] shadow-sm",
          accentClassName,
        )}
      >
        {icon}
      </div>
    </div>
  </AppCard>
);

export const BillingStatusBadge = ({ status }: { status: BillingStatus }) => (
  <span
    className={cn(
      "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold",
      billingStatusClasses[status],
    )}
  >
    <span
      aria-hidden="true"
      className={cn(
        "h-2.5 w-2.5 rounded-full",
        billingStatusDotClasses[status],
      )}
    />
    {billingStatusLabels[status]}
  </span>
);

export const RecurringStatusBadge = ({
  status,
}: {
  status: RecurringBill["status"];
}) => (
  <span
    className={cn(
      "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold",
      recurringStatusClasses[status],
    )}
  >
    {status === "active" ? (
      <CheckCircle2 size={13} />
    ) : status === "dueSoon" ? (
      <TimerReset size={13} />
    ) : (
      <PauseCircle size={13} />
    )}
    {status === "active"
      ? "Active"
      : status === "dueSoon"
        ? "Due Soon"
        : "Paused"}
  </span>
);

export const BillingReminderCard = ({
  reminder,
}: {
  reminder: BillingReminder;
}) => (
  <div className="rounded-[28px] border border-white/30 bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(248,252,255,0.78))] p-4 shadow-[0_18px_38px_rgba(15,23,42,0.06)] backdrop-blur-xl">
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-11 w-11 items-center justify-center rounded-[18px] bg-primary/10 text-primary">
          <BellRing size={18} />
        </div>
        <div>
          <h3 className="font-semibold text-on-background">{reminder.title}</h3>
          <p className="mt-1 text-sm leading-6 text-on-surface-variant">
            {reminder.description}
          </p>
        </div>
      </div>
      <BillingStatusBadge status={reminder.status} />
    </div>
  </div>
);

export const InsuranceBillingCard = ({
  insurance,
}: {
  insurance: NonNullable<PatientBillingData["insurance"]>;
}) => (
  <AppCard
    title="Insurance Billing"
    subtitle="Coverage and claim details tied to the current patient account."
    icon={<Receipt size={22} />}
    className="border-white/30 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(248,252,255,0.82))] shadow-[0_18px_38px_rgba(15,23,42,0.08)] backdrop-blur-xl"
  >
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <MetricTile
        label="Total Bill"
        value={formatCurrency(insurance.totalBill)}
      />
      <MetricTile
        label="Insurance Covered"
        value={formatCurrency(insurance.insuranceCovered)}
      />
      <MetricTile
        label="Patient Payable"
        value={formatCurrency(insurance.patientPayable)}
      />
      <MetricTile label="Claim Status" value={insurance.claimStatus} />
    </div>
  </AppCard>
);

const MetricTile = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-[22px] border border-slate-200/80 bg-white/80 px-4 py-4 shadow-sm">
    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface-variant">
      {label}
    </p>
    <p className="mt-2 text-lg font-bold tracking-tight text-on-background">
      {value}
    </p>
  </div>
);

export const BillingFilterBar = ({
  search,
  date,
  serviceType,
  status,
  onSearchChange,
  onDateChange,
  onServiceTypeChange,
  onStatusChange,
  onReset,
}: BillingFilterBarProps) => (
  <AppCard
    title="Billing Breakdown"
    subtitle="Search and filter every service charge, invoice, and payment state."
    icon={<Wallet size={22} />}
    action={
      <Button variant="ghost" size="sm" onClick={onReset}>
        Reset
      </Button>
    }
    className="border-white/30 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(248,252,255,0.82))] shadow-[0_18px_38px_rgba(15,23,42,0.08)] backdrop-blur-xl"
  >
    <div className="grid gap-4 lg:grid-cols-4">
      <AppInput
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search description or invoice"
      />
      <AppDatePicker
        value={date}
        onChange={(event) => onDateChange(event.target.value)}
      />
      <AppSelect
        value={serviceType}
        onChange={(event) => onServiceTypeChange(event.target.value)}
        options={serviceTypeOptions}
      />
      <AppSelect
        value={status}
        onChange={(event) => onStatusChange(event.target.value)}
        options={statusOptions}
      />
    </div>
  </AppCard>
);

export const BillingTable = ({ items, onRowClick }: BillingTableProps) => (
  <div className="overflow-hidden rounded-[30px] border border-white/30 bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(248,252,255,0.78))] shadow-[0_20px_42px_rgba(15,23,42,0.08)] backdrop-blur-xl">
    <div className="hidden md:block">
      <Table>
        <TableHeader>
          <TableRow className="border-outline-variant bg-slate-50/80">
            <TableHead className="h-14 text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface-variant">
              Service Type
            </TableHead>
            <TableHead className="h-14 text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface-variant">
              Date
            </TableHead>
            <TableHead className="h-14 text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface-variant">
              Description
            </TableHead>
            <TableHead className="h-14 text-right text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface-variant">
              Amount
            </TableHead>
            <TableHead className="h-14 text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface-variant">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow
              key={item.id}
              className={cn(
                "border-outline-variant transition-colors hover:bg-sky-50/45",
                onRowClick && "cursor-pointer",
              )}
              onClick={() => onRowClick?.(item)}
            >
              <TableCell className="font-semibold text-on-background align-top">
                {item.serviceType}
              </TableCell>
              <TableCell className="align-top text-on-surface-variant">
                {formatBillingDate(item.date)}
              </TableCell>
              <TableCell className="max-w-[380px] whitespace-normal align-top text-on-surface-variant">
                <div className="space-y-1">
                  <p className="font-medium text-on-background">
                    {item.description}
                  </p>
                  <p className="text-xs uppercase tracking-[0.18em] text-on-surface-variant">
                    {item.invoiceNumber}
                  </p>
                </div>
              </TableCell>
              <TableCell className="text-right font-semibold text-on-background align-top">
                {formatCurrency(item.amount)}
              </TableCell>
              <TableCell className="align-top">
                <BillingStatusBadge status={item.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

    <div className="grid gap-4 p-4 md:hidden">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onRowClick?.(item)}
          className="rounded-[26px] border border-slate-200/80 bg-white/85 p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-on-background">
                {item.serviceType}
              </p>
              <p className="mt-1 text-sm text-on-surface-variant">
                {item.description}
              </p>
            </div>
            <BillingStatusBadge status={item.status} />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-on-surface-variant">
                Date
              </p>
              <p className="mt-1 font-medium text-on-background">
                {formatBillingDate(item.date)}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-on-surface-variant">
                Amount
              </p>
              <p className="mt-1 font-medium text-on-background">
                {formatCurrency(item.amount)}
              </p>
            </div>
          </div>
        </button>
      ))}
    </div>
  </div>
);

export const BillingDataSkeleton = ({ rows = 5 }: { rows?: number }) => (
  <div className="space-y-6">
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="h-40 animate-pulse rounded-[28px] bg-white/70 shadow-sm"
        />
      ))}
    </div>
    <div className="h-32 animate-pulse rounded-[28px] bg-white/70 shadow-sm" />
    <div className="rounded-[28px] bg-white/70 p-5 shadow-sm">
      <div className="space-y-4">
        {Array.from({ length: rows }).map((_, index) => (
          <div
            key={index}
            className="h-16 animate-pulse rounded-2xl bg-slate-100"
          />
        ))}
      </div>
    </div>
  </div>
);

export const BillingErrorState = ({ onRetry }: { onRetry: () => void }) => (
  <EmptyState
    title="Billing data could not be loaded"
    description="We hit a temporary issue while loading invoices and payments. Please try again."
    icon={<AlertTriangle size={34} />}
    actionLabel="Retry"
    onAction={onRetry}
  />
);

export const OutstandingBillsTable = ({
  items,
  onRowClick,
}: {
  items: BillingItem[];
  onRowClick?: (item: BillingItem) => void;
}) => (
  <div className="overflow-hidden rounded-[30px] border border-white/30 bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(248,252,255,0.78))] shadow-[0_20px_42px_rgba(15,23,42,0.08)] backdrop-blur-xl">
    <Table>
      <TableHeader>
        <TableRow className="border-outline-variant bg-slate-50/80">
          <TableHead className="h-14 text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface-variant">
            Pending Bills
          </TableHead>
          <TableHead className="h-14 text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface-variant">
            Due Date
          </TableHead>
          <TableHead className="h-14 text-right text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface-variant">
            Amount Due
          </TableHead>
          <TableHead className="h-14 text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface-variant">
            Status
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow
            key={item.id}
            className={cn(
              "border-outline-variant transition-colors hover:bg-sky-50/45",
              onRowClick && "cursor-pointer",
            )}
            onClick={() => onRowClick?.(item)}
          >
            <TableCell className="whitespace-normal align-top">
              <div>
                <p className="font-semibold text-on-background">
                  {item.description}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-on-surface-variant">
                  {item.invoiceNumber}
                </p>
              </div>
            </TableCell>
            <TableCell className="align-top text-on-surface-variant">
              {formatBillingDate(item.dueDate)}
            </TableCell>
            <TableCell className="text-right font-semibold text-on-background align-top">
              {formatCurrency(item.amount)}
            </TableCell>
            <TableCell className="align-top">
              <BillingStatusBadge status={item.status} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export const PaymentHistoryTable = ({
  items,
}: {
  items: BillingPaymentHistoryItem[];
}) => (
  <div className="overflow-hidden rounded-[30px] border border-white/30 bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(248,252,255,0.78))] shadow-[0_20px_42px_rgba(15,23,42,0.08)] backdrop-blur-xl">
    <Table>
      <TableHeader>
        <TableRow className="border-outline-variant bg-slate-50/80">
          <TableHead className="h-14 text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface-variant">
            Date
          </TableHead>
          <TableHead className="h-14 text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface-variant">
            Invoice Number
          </TableHead>
          <TableHead className="h-14 text-right text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface-variant">
            Amount
          </TableHead>
          <TableHead className="h-14 text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface-variant">
            Payment Method
          </TableHead>
          <TableHead className="h-14 text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface-variant">
            Transaction ID
          </TableHead>
          <TableHead className="h-14 text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface-variant">
            Status
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow
            key={item.id}
            className="border-outline-variant transition-colors hover:bg-sky-50/45"
          >
            <TableCell className="text-on-surface-variant">
              {formatBillingDate(item.date)}
            </TableCell>
            <TableCell className="font-semibold text-on-background">
              {item.invoiceNumber}
            </TableCell>
            <TableCell className="text-right font-semibold text-on-background">
              {formatCurrency(item.amount)}
            </TableCell>
            <TableCell>{item.paymentMethod}</TableCell>
            <TableCell>{item.transactionId}</TableCell>
            <TableCell>
              <BillingStatusBadge status="paid" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export const RecurringBillsTable = ({
  items,
  onPause,
  onResume,
  onPayNow,
}: {
  items: RecurringBill[];
  onPause: (bill: RecurringBill) => void;
  onResume: (bill: RecurringBill) => void;
  onPayNow: (bill: RecurringBill) => void;
}) => (
  <div className="overflow-hidden rounded-[30px] border border-white/30 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(245,250,255,0.82))] shadow-[0_22px_48px_rgba(15,23,42,0.08)] backdrop-blur-xl">
    <Table>
      <TableHeader>
        <TableRow className="border-outline-variant bg-slate-50/80">
          <TableHead className="h-14 min-w-[280px] text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface-variant">
            Service Name
          </TableHead>
          <TableHead className="h-14 min-w-[120px] text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface-variant">
            Frequency
          </TableHead>
          <TableHead className="h-14 min-w-[150px] text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface-variant">
            Next Billing Date
          </TableHead>
          <TableHead className="h-14 min-w-[110px] text-right text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface-variant">
            Amount
          </TableHead>
          <TableHead className="h-14 min-w-[120px] text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface-variant">
            Status
          </TableHead>
          <TableHead className="h-14 min-w-[212px] text-right text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface-variant">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow
            key={item.id}
            className="border-outline-variant transition-colors hover:bg-sky-50/45"
          >
            <TableCell className="whitespace-normal align-top">
              <div>
                <p className="font-semibold text-on-background">
                  {item.serviceName}
                </p>
                <p className="mt-1 max-w-[34ch] text-sm leading-6 text-on-surface-variant">
                  {item.details}
                </p>
              </div>
            </TableCell>
            <TableCell className="align-top text-on-surface-variant">
              {item.frequency}
            </TableCell>
            <TableCell className="align-top text-on-surface-variant">
              {formatBillingDate(item.nextBillingDate)}
            </TableCell>
            <TableCell className="text-right font-semibold text-on-background align-top">
              {formatCurrency(item.amount)}
            </TableCell>
            <TableCell className="align-top">
              <RecurringStatusBadge status={item.status} />
            </TableCell>
            <TableCell className="w-[212px] align-top">
              <div className="ml-auto flex w-[176px] flex-col items-stretch gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-10 w-full justify-center rounded-full border-slate-200 bg-white/80 px-4"
                >
                  <Sparkles size={14} />
                  View Details
                </Button>
                <Button
                  size="sm"
                  className="h-10 w-full justify-center rounded-full px-4"
                  onClick={() => onPayNow(item)}
                >
                  {item.status === "paused" ? "Reactivate" : "Pay Now"}
                </Button>
                {item.status === "paused" ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 w-full justify-center rounded-full px-4"
                    onClick={() => onResume(item)}
                  >
                    Resume
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 w-full justify-center rounded-full px-4"
                    onClick={() => onPause(item)}
                  >
                    Pause
                  </Button>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export const InvoiceSummaryCard = ({
  invoice,
}: {
  invoice: BillingInvoice;
}) => (
  <AppCard
    className="border-white/30 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(248,252,255,0.82))] shadow-[0_18px_38px_rgba(15,23,42,0.08)] backdrop-blur-xl"
    bodyClassName="p-5"
  >
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <MetricTile label="Invoice Number" value={invoice.invoiceNumber} />
      <MetricTile
        label="Invoice Date"
        value={formatBillingDate(invoice.invoiceDate)}
      />
      <MetricTile label="Doctor" value={invoice.doctor} />
      <MetricTile label="Patient" value={invoice.patient} />
    </div>
  </AppCard>
);

export const InvoiceChargesCard = ({
  invoice,
}: {
  invoice: BillingInvoice;
}) => (
  <AppCard
    title="Invoice Details"
    subtitle="Detailed charge lines, discounts, insurance coverage, and final payable amount."
    icon={<Receipt size={22} />}
    className="border-white/30 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(248,252,255,0.82))] shadow-[0_18px_38px_rgba(15,23,42,0.08)] backdrop-blur-xl"
  >
    <div className="space-y-4">
      <div className="overflow-hidden rounded-3xl border border-outline-variant">
        <Table>
          <TableHeader>
            <TableRow className="border-outline-variant bg-slate-50/80">
              <TableHead>Individual Charges</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoice.charges.map((charge) => (
              <TableRow key={charge.id} className="border-outline-variant">
                <TableCell className="font-medium text-on-background">
                  {charge.label}
                </TableCell>
                <TableCell className="text-right font-semibold text-on-background">
                  {formatCurrency(charge.amount)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricTile
          label="Discounts"
          value={formatCurrency(invoice.discounts)}
        />
        <MetricTile
          label="Insurance Coverage"
          value={formatCurrency(invoice.insuranceCoverage)}
        />
        <MetricTile
          label="Final Amount"
          value={formatCurrency(invoice.finalAmount)}
        />
        <div className="rounded-[22px] border border-slate-200/80 bg-white/80 px-4 py-4 shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface-variant">
            Payment Status
          </p>
          <div className="mt-2">
            <BillingStatusBadge status={invoice.paymentStatus} />
          </div>
        </div>
      </div>
    </div>
  </AppCard>
);

export const InvoiceActionBar = ({ invoice }: { invoice: BillingInvoice }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <AppButton variant="outline" onClick={() => setOpen(true)}>
          <Receipt size={16} />
          View Invoice
        </AppButton>
        <AppButton
          variant="default"
          onClick={() => downloadInvoiceFile(invoice)}
        >
          <FileDown size={16} />
          Download Invoice
        </AppButton>
        <AppButton
          variant="secondary"
          onClick={() => downloadReceiptFile(invoice)}
        >
          <Receipt size={16} />
          Download Receipt
        </AppButton>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl rounded-[28px]">
          <DialogHeader>
            <DialogTitle>Invoice Preview</DialogTitle>
            <DialogDescription>
              Review the invoice details before downloading or sharing them.
            </DialogDescription>
          </DialogHeader>

          <pre className="max-h-[60vh] overflow-auto rounded-2xl bg-slate-950 p-4 text-sm leading-6 text-slate-100">
            {getInvoicePreview(invoice)}
          </pre>

          <DialogFooter>
            <Button onClick={() => downloadInvoiceFile(invoice)}>
              Download Invoice
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export const BillingQuickLinks = () => (
  <AppCard
    title="Outstanding Payments"
    subtitle="Jump straight to balances that need attention or recurring items that may renew soon."
    icon={<CreditCard size={22} />}
    className="border-white/30 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(248,252,255,0.82))] shadow-[0_18px_38px_rgba(15,23,42,0.08)] backdrop-blur-xl"
  >
    <div className="grid gap-4 md:grid-cols-3">
      <QuickLinkCard
        to="/patient/billing/due"
        title="Pending Bills"
        description="Review all unpaid and overdue invoices."
        icon={<AlertTriangle size={18} />}
      />
      <QuickLinkCard
        to="/patient/billing/history"
        title="Payment History"
        description="Track completed payments and transaction IDs."
        icon={<IndianRupee size={18} />}
      />
      <QuickLinkCard
        to="/patient/billing/recurring"
        title="Recurring Bills"
        description="Manage subscriptions for monthly medications."
        icon={<RotateCw size={18} />}
      />
    </div>
  </AppCard>
);

const QuickLinkCard = ({
  to,
  title,
  description,
  icon,
}: {
  to: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}) => (
  <NavLink
    to={to}
    className="rounded-[24px] border border-slate-200/80 bg-white/85 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
  >
    <div className="flex h-11 w-11 items-center justify-center rounded-[18px] bg-primary/10 text-primary">
      {icon}
    </div>
    <h3 className="mt-4 font-semibold text-on-background">{title}</h3>
    <p className="mt-2 text-sm leading-6 text-on-surface-variant">
      {description}
    </p>
  </NavLink>
);

export const DueSummaryTiles = ({ items }: { items: BillingItem[] }) => {
  const totalOutstanding = items.reduce((sum, item) => sum + item.amount, 0);
  const overdueCount = items.filter((item) => item.status === "overdue").length;

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      <BillingSummaryCard
        title="Pending Bills"
        value={`${items.length} Bills`}
        formatAsCurrency={false}
        description="Open charges currently waiting for payment."
        icon={<Receipt size={22} className="text-white" />}
        accentClassName="bg-gradient-to-br from-sky-500 to-cyan-500 text-white"
      />
      <BillingSummaryCard
        title="Overdue Bills"
        value={`${overdueCount} Bills`}
        formatAsCurrency={false}
        description="Invoices that have crossed their due date."
        icon={<AlertTriangle size={22} className="text-white" />}
        accentClassName="bg-gradient-to-br from-red-500 to-orange-500 text-white"
      />
      <BillingSummaryCard
        title="Amount Due"
        amount={totalOutstanding}
        description="Combined value of all pending and overdue bills."
        icon={<IndianRupee size={22} className="text-white" />}
        accentClassName="bg-gradient-to-br from-emerald-500 to-teal-500 text-white"
      />
      <BillingSummaryCard
        title="Due Tomorrow"
        value={`${items.filter((item) => item.status === "dueSoon").length} Bills`}
        formatAsCurrency={false}
        description="Bills that need attention by the next day."
        icon={<CalendarClock size={22} className="text-white" />}
        accentClassName="bg-gradient-to-br from-amber-500 to-yellow-500 text-white"
      />
    </div>
  );
};
