import { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  AlertTriangle,
  BellRing,
  CalendarClock,
  CreditCard,
  FileDown,
  IndianRupee,
  Receipt,
  RotateCw,
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

const billingStatusIcons: Record<BillingStatus, string> = {
  paid: "🟢",
  dueSoon: "🟡",
  pending: "🟠",
  overdue: "🔴",
};

export const formatCurrency = (value: number) =>
  currencyFormatter.format(value);

export const formatBillingDate = (value: string) =>
  format(parseISO(value), "dd MMM yyyy");

export const getInvoiceById = (
  invoices: BillingInvoice[],
  invoiceId?: string
) =>
  invoices.find(
    (invoice) => invoice.id === invoiceId
  );

export const getInvoicePreview = (invoice: BillingInvoice) => {
  const chargeLines = invoice.charges
    .map(
      (charge) => `${charge.label}: ${formatCurrency(charge.amount)}`
    )
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
    invoice.paymentMethod
      ? `Payment Method: ${invoice.paymentMethod}`
      : null,
    invoice.transactionId
      ? `Transaction ID: ${invoice.transactionId}`
      : null,
  ]
    .filter(Boolean)
    .join("\n");
};

const downloadTextFile = (
  filename: string,
  content: string
) => {
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
  downloadTextFile(
    `${invoice.invoiceNumber}.txt`,
    getInvoicePreview(invoice)
  );
};

export const downloadReceiptFile = (invoice: BillingInvoice) => {
  downloadTextFile(
    `${invoice.receiptNumber ?? invoice.invoiceNumber}-receipt.txt`,
    [
      `Receipt Number: ${invoice.receiptNumber ?? "Pending"}`,
      `Invoice Number: ${invoice.invoiceNumber}`,
      `Amount Received: ${formatCurrency(invoice.finalAmount)}`,
      `Payment Status: ${billingStatusLabels[invoice.paymentStatus]}`,
      invoice.paymentMethod
        ? `Payment Method: ${invoice.paymentMethod}`
        : null,
      invoice.transactionId
        ? `Transaction ID: ${invoice.transactionId}`
        : null,
    ]
      .filter(Boolean)
      .join("\n")
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
  const [mode, setMode] = useState<
    "default" | "empty" | "error"
  >(() => {
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
    <section className="relative overflow-hidden rounded-[32px] border border-sky-100/70 bg-gradient-to-br from-sky-50/90 via-white to-cyan-50/80 p-5 shadow-[0_18px_45px_rgba(14,165,233,0.08)] sm:p-6">
      <div className="absolute -left-16 top-10 h-40 w-40 rounded-full bg-sky-200/30 blur-3xl" />
      <div className="absolute -right-10 top-0 h-44 w-44 rounded-full bg-cyan-200/35 blur-3xl" />
      <div className="relative flex flex-col gap-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-2">
            <Badge className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold tracking-[0.24em] text-primary uppercase">
              Patient Billing
            </Badge>
            <div>
              <h1 className="text-3xl font-bold text-on-background">
                {title}
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-on-surface-variant">
                {description}
              </p>
            </div>
          </div>

          {actions && (
            <div className="flex flex-wrap items-center gap-3">
              {actions}
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          {billingNavItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/patient/billing"}
              className={({ isActive }) =>
                cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition-all",
                  isActive
                    ? "bg-primary text-white shadow-md"
                    : "bg-white/70 text-on-surface-variant shadow-sm hover:bg-white"
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
    className="border-white/20 bg-white/75 shadow-[0_15px_35px_rgba(0,0,0,0.08)] backdrop-blur-xl"
    bodyClassName="p-5"
  >
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-on-surface-variant">
          {title}
        </p>
        <h2 className="mt-3 text-3xl font-bold text-on-background">
          {value ??
            (formatAsCurrency
              ? formatCurrency(amount ?? 0)
              : String(amount ?? 0))}
        </h2>
        <p className="mt-2 text-sm text-on-surface-variant">
          {description}
        </p>
      </div>

      <div
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-2xl",
          accentClassName
        )}
      >
        {icon}
      </div>
    </div>
  </AppCard>
);

export const BillingStatusBadge = ({
  status,
}: {
  status: BillingStatus;
}) => (
  <span
    className={cn(
      "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold",
      billingStatusClasses[status]
    )}
  >
    <span aria-hidden="true">
      {billingStatusIcons[status]}
    </span>
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
      "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
      recurringStatusClasses[status]
    )}
  >
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
  <div className="rounded-[26px] border border-white/25 bg-white/70 p-4 shadow-[0_15px_35px_rgba(0,0,0,0.06)] backdrop-blur-xl">
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <BellRing size={18} />
        </div>
        <div>
          <h3 className="font-semibold text-on-background">
            {reminder.title}
          </h3>
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
    className="border-white/20 bg-white/75 shadow-[0_15px_35px_rgba(0,0,0,0.08)] backdrop-blur-xl"
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
      <MetricTile
        label="Claim Status"
        value={insurance.claimStatus}
      />
    </div>
  </AppCard>
);

const MetricTile = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <div className="rounded-2xl border border-outline-variant bg-surface-container-low px-4 py-4">
    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-on-surface-variant">
      {label}
    </p>
    <p className="mt-2 text-lg font-bold text-on-background">
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
      <Button
        variant="ghost"
        size="sm"
        onClick={onReset}
      >
        Reset
      </Button>
    }
    className="border-white/20 bg-white/75 shadow-[0_15px_35px_rgba(0,0,0,0.08)] backdrop-blur-xl"
  >
    <div className="grid gap-4 lg:grid-cols-4">
      <AppInput
        value={search}
        onChange={(event) =>
          onSearchChange(event.target.value)
        }
        placeholder="Search description or invoice"
      />
      <AppDatePicker
        value={date}
        onChange={(event) =>
          onDateChange(event.target.value)
        }
      />
      <AppSelect
        value={serviceType}
        onChange={(event) =>
          onServiceTypeChange(event.target.value)
        }
        options={serviceTypeOptions}
      />
      <AppSelect
        value={status}
        onChange={(event) =>
          onStatusChange(event.target.value)
        }
        options={statusOptions}
      />
    </div>
  </AppCard>
);

export const BillingTable = ({
  items,
  onRowClick,
}: BillingTableProps) => (
  <div className="overflow-hidden rounded-[28px] border border-white/25 bg-white/75 shadow-[0_15px_35px_rgba(0,0,0,0.08)] backdrop-blur-xl">
    <div className="hidden md:block">
      <Table>
        <TableHeader>
          <TableRow className="border-outline-variant">
            <TableHead>Service Type</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow
              key={item.id}
              className={cn(
                "border-outline-variant",
                onRowClick && "cursor-pointer"
              )}
              onClick={() => onRowClick?.(item)}
            >
              <TableCell className="font-semibold text-on-background">
                {item.serviceType}
              </TableCell>
              <TableCell>{formatBillingDate(item.date)}</TableCell>
              <TableCell className="max-w-[380px] whitespace-normal text-on-surface-variant">
                <div className="space-y-1">
                  <p className="font-medium text-on-background">
                    {item.description}
                  </p>
                  <p className="text-xs uppercase tracking-[0.18em] text-on-surface-variant">
                    {item.invoiceNumber}
                  </p>
                </div>
              </TableCell>
              <TableCell className="font-semibold text-on-background">
                {formatCurrency(item.amount)}
              </TableCell>
              <TableCell>
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
          className="rounded-[24px] border border-outline-variant bg-white/80 p-4 text-left shadow-sm transition hover:-translate-y-0.5"
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

export const BillingDataSkeleton = ({
  rows = 5,
}: {
  rows?: number;
}) => (
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

export const BillingErrorState = ({
  onRetry,
}: {
  onRetry: () => void;
}) => (
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
  <div className="overflow-hidden rounded-[28px] border border-white/25 bg-white/75 shadow-[0_15px_35px_rgba(0,0,0,0.08)] backdrop-blur-xl">
    <Table>
      <TableHeader>
        <TableRow className="border-outline-variant">
          <TableHead>Pending Bills</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead>Amount Due</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow
            key={item.id}
            className={cn(
              "border-outline-variant",
              onRowClick && "cursor-pointer"
            )}
            onClick={() => onRowClick?.(item)}
          >
            <TableCell className="whitespace-normal">
              <div>
                <p className="font-semibold text-on-background">
                  {item.description}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-on-surface-variant">
                  {item.invoiceNumber}
                </p>
              </div>
            </TableCell>
            <TableCell>{formatBillingDate(item.dueDate)}</TableCell>
            <TableCell className="font-semibold text-on-background">
              {formatCurrency(item.amount)}
            </TableCell>
            <TableCell>
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
  <div className="overflow-hidden rounded-[28px] border border-white/25 bg-white/75 shadow-[0_15px_35px_rgba(0,0,0,0.08)] backdrop-blur-xl">
    <Table>
      <TableHeader>
        <TableRow className="border-outline-variant">
          <TableHead>Date</TableHead>
          <TableHead>Invoice Number</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Payment Method</TableHead>
          <TableHead>Transaction ID</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow
            key={item.id}
            className="border-outline-variant"
          >
            <TableCell>{formatBillingDate(item.date)}</TableCell>
            <TableCell className="font-semibold text-on-background">
              {item.invoiceNumber}
            </TableCell>
            <TableCell className="font-semibold text-on-background">
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
  onCancel,
}: {
  items: RecurringBill[];
  onCancel: (bill: RecurringBill) => void;
}) => (
  <div className="overflow-hidden rounded-[28px] border border-white/25 bg-white/75 shadow-[0_15px_35px_rgba(0,0,0,0.08)] backdrop-blur-xl">
    <Table>
      <TableHeader>
        <TableRow className="border-outline-variant">
          <TableHead>Service Name</TableHead>
          <TableHead>Frequency</TableHead>
          <TableHead>Next Billing Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow
            key={item.id}
            className="border-outline-variant"
          >
            <TableCell className="whitespace-normal">
              <div>
                <p className="font-semibold text-on-background">
                  {item.serviceName}
                </p>
                <p className="mt-1 text-sm text-on-surface-variant">
                  {item.details}
                </p>
              </div>
            </TableCell>
            <TableCell>{item.frequency}</TableCell>
            <TableCell>
              {formatBillingDate(item.nextBillingDate)}
            </TableCell>
            <TableCell className="font-semibold text-on-background">
              {formatCurrency(item.amount)}
            </TableCell>
            <TableCell>
              <RecurringStatusBadge status={item.status} />
            </TableCell>
            <TableCell>
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                <Button size="sm">
                  Pay Now
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onCancel(item)}
                >
                  Cancel
                </Button>
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
    className="border-white/20 bg-white/75 shadow-[0_15px_35px_rgba(0,0,0,0.08)] backdrop-blur-xl"
    bodyClassName="p-5"
  >
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <MetricTile
        label="Invoice Number"
        value={invoice.invoiceNumber}
      />
      <MetricTile
        label="Invoice Date"
        value={formatBillingDate(invoice.invoiceDate)}
      />
      <MetricTile
        label="Doctor"
        value={invoice.doctor}
      />
      <MetricTile
        label="Patient"
        value={invoice.patient}
      />
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
    className="border-white/20 bg-white/75 shadow-[0_15px_35px_rgba(0,0,0,0.08)] backdrop-blur-xl"
  >
    <div className="space-y-4">
      <div className="overflow-hidden rounded-3xl border border-outline-variant">
        <Table>
          <TableHeader>
            <TableRow className="border-outline-variant">
              <TableHead>Individual Charges</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoice.charges.map((charge) => (
              <TableRow
                key={charge.id}
                className="border-outline-variant"
              >
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
        <div className="rounded-2xl border border-outline-variant bg-surface-container-low px-4 py-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-on-surface-variant">
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

export const InvoiceActionBar = ({
  invoice,
}: {
  invoice: BillingInvoice;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <AppButton
          variant="outline"
          onClick={() => setOpen(true)}
        >
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
            <Button
              onClick={() => downloadInvoiceFile(invoice)}
            >
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
    className="border-white/20 bg-white/75 shadow-[0_15px_35px_rgba(0,0,0,0.08)] backdrop-blur-xl"
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
    className="rounded-[24px] border border-outline-variant bg-white/80 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
  >
    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
      {icon}
    </div>
    <h3 className="mt-4 font-semibold text-on-background">
      {title}
    </h3>
    <p className="mt-2 text-sm leading-6 text-on-surface-variant">
      {description}
    </p>
  </NavLink>
);

export const DueSummaryTiles = ({
  items,
}: {
  items: BillingItem[];
}) => {
  const totalOutstanding = items.reduce(
    (sum, item) => sum + item.amount,
    0
  );
  const overdueCount = items.filter(
    (item) => item.status === "overdue"
  ).length;

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
