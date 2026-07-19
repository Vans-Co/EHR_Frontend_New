import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  Apple,
  Bug,
  CircleAlert,
  Leaf,
  Pill,
  Plus,
  Search,
  ShieldAlert,
  ShieldPlus,
  Sparkles,
} from "lucide-react";

import AppButton from "@/components/common/AppButton";
import AppCard from "@/components/common/AppCard";
import AppInput from "@/components/common/AppInput";
import AppSelect from "@/components/common/AppSelect";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  addPatientAllergy,
  deletePatientAllergy,
  getPatientAllergies,
  updatePatientAllergy,
} from "@/features/patient/services/patientAllergiesApi";
import { useAuthStore } from "@/store/authStore";
import { normalizeEhrId } from "@/features/patient/components/patientProfileUtils";

import type {
  AllergyFormErrors,
  AllergyFormValues,
  AllergySeverity,
  AllergyType,
  PatientAllergy,
} from "@/features/patient/types/allergy.types";

const typeOptions = [
  { label: "All Types", value: "ALL" },
  { label: "Food", value: "FOOD" },
  { label: "Drug", value: "DRUG" },
  { label: "Environmental", value: "ENVIRONMENTAL" },
  { label: "Insect", value: "INSECT" },
  { label: "Other", value: "OTHER" },
];

const severityOptions = [
  { label: "All Severities", value: "ALL" },
  { label: "Mild", value: "MILD" },
  { label: "Moderate", value: "MODERATE" },
  { label: "Severe", value: "SEVERE" },
  {
    label: "Life Threatening",
    value: "LIFE_THREATENING",
  },
];

const formTypeOptions = typeOptions.slice(1);
const formSeverityOptions = severityOptions.slice(1);

const defaultFormValues: AllergyFormValues = {
  category: "",
  allergyItem: "",
  allergyType: "FOOD",
  severity: "MODERATE",
  description: "",
};

const severityBadgeClasses: Record<
  AllergySeverity,
  string
> = {
  MILD: "bg-emerald-100 text-emerald-700",
  MODERATE: "bg-yellow-100 text-yellow-700",
  SEVERE: "bg-orange-100 text-orange-700",
  LIFE_THREATENING: "bg-red-100 text-red-700",
};

const severityLabels: Record<AllergySeverity, string> = {
  MILD: "Mild",
  MODERATE: "Moderate",
  SEVERE: "Severe",
  LIFE_THREATENING: "Life Threatening",
};

const severityDots: Record<AllergySeverity, string> = {
  MILD: "bg-emerald-500",
  MODERATE: "bg-yellow-500",
  SEVERE: "bg-orange-500",
  LIFE_THREATENING: "bg-red-500",
};

const typeLabels: Record<AllergyType, string> = {
  FOOD: "Food",
  DRUG: "Drug",
  ENVIRONMENTAL: "Environmental",
  INSECT: "Insect",
  OTHER: "Other",
};

const typeIconMap: Record<AllergyType, typeof Apple> = {
  FOOD: Apple,
  DRUG: Pill,
  ENVIRONMENTAL: Leaf,
  INSECT: Bug,
  OTHER: CircleAlert,
};


const validateForm = (
  values: AllergyFormValues
): AllergyFormErrors => {
  const errors: AllergyFormErrors = {};

  if (!values.category.trim()) {
    errors.category = "Category is required.";
  }

  if (!values.allergyItem.trim()) {
    errors.allergyItem =
      "Allergy item is required.";
  }

  if (!values.description.trim()) {
    errors.description = "Description is required.";
  }

  return errors;
};

const AllergySeverityBadge = ({
  severity,
}: {
  severity: AllergySeverity;
}) => (
  <span
    className={cn(
      "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold",
      severityBadgeClasses[severity]
    )}
  >
    <span
      className={cn(
        "h-2 w-2 rounded-full",
        severityDots[severity]
      )}
    />
    {severityLabels[severity]}
  </span>
);

const AllergyTypeBadge = ({
  type,
}: {
  type: AllergyType;
}) => {
  const Icon = typeIconMap[type];

  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
      <Icon size={14} />
      {typeLabels[type]}
    </span>
  );
};

const SummaryCard = ({
  title,
  value,
  subtitle,
  icon,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
}) => (
  <div className="rounded-[30px] border border-white/20 bg-white/70 p-5 shadow-[0_15px_35px_rgba(0,0,0,0.08)] backdrop-blur-xl">
    <div className="mb-4 flex items-center justify-between">
      <div>
        <p className="text-sm text-on-surface-variant">
          {title}
        </p>
        <h2 className="mt-1 text-3xl font-bold text-on-background">
          {value}
        </h2>
      </div>

      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        {icon}
      </div>
    </div>

    <p className="text-sm text-on-surface-variant">
      {subtitle}
    </p>
  </div>
);

const AllergyToast = ({
  message,
  visible,
}: {
  message: string;
  visible: boolean;
}) => (
  <div
    className={cn(
      "pointer-events-none fixed right-4 top-24 z-50 w-[min(360px,calc(100vw-2rem))] transition-all duration-300",
      visible
        ? "translate-y-0 opacity-100"
        : "translate-y-2 opacity-0"
    )}
  >
    <div className="pointer-events-auto rounded-[28px] border border-white/25 bg-white/80 p-4 shadow-[0_20px_40px_rgba(15,23,42,0.12)] backdrop-blur-xl">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-success/10 text-success">
          <ShieldPlus size={18} />
        </div>

        <div className="min-w-0">
          <p className="font-semibold text-on-background">
            Allergy details updated
          </p>
          <p className="mt-1 text-sm text-on-surface-variant">
            {message}
          </p>
        </div>
      </div>
    </div>
  </div>
);

const AllergyFormDialog = ({
  open,
  mode,
  values,
  errors,
  isSubmitting,
  onOpenChange,
  onChange,
  onSubmit,
}: {
  open: boolean;
  mode: "add" | "edit";
  values: AllergyFormValues;
  errors: AllergyFormErrors;
  isSubmitting: boolean;
  onOpenChange: (open: boolean) => void;
  onChange: (
    field: keyof AllergyFormValues,
    value: string
  ) => void;
  onSubmit: () => void;
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-2xl rounded-[28px] bg-white/95">
      <DialogHeader>
        <DialogTitle>
          {mode === "add"
            ? "Add Allergy"
            : "Edit Allergy"}
        </DialogTitle>
        <DialogDescription>
          Keep allergy information current so healthcare providers can make safer treatment decisions.
        </DialogDescription>
      </DialogHeader>

      <div className="grid gap-4 sm:grid-cols-2">
        <AppInput
          label="Category"
          value={values.category}
          onChange={(event) =>
            onChange("category", event.target.value)
          }
          error={errors.category}
          placeholder="Food, Medication, Environment"
        />
        <AppInput
          label="Allergy Item"
          value={values.allergyItem}
          onChange={(event) =>
            onChange(
              "allergyItem",
              event.target.value
            )
          }
          error={errors.allergyItem}
          placeholder="Peanuts, Penicillin, Dust"
        />
        <AppSelect
          label="Allergy Type"
          value={values.allergyType}
          onChange={(event) =>
            onChange(
              "allergyType",
              event.target.value
            )
          }
          options={formTypeOptions}
          error={errors.allergyType}
        />
        <AppSelect
          label="Severity"
          value={values.severity}
          onChange={(event) =>
            onChange("severity", event.target.value)
          }
          options={formSeverityOptions}
          error={errors.severity}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-on-background">
          Description
        </label>
        <textarea
          value={values.description}
          onChange={(event) =>
            onChange(
              "description",
              event.target.value
            )
          }
          rows={4}
          className={cn(
            "w-full rounded-2xl border bg-white px-4 py-3 text-sm text-on-background outline-none transition-all duration-300",
            errors.description
              ? "border-red-400"
              : "border-outline-variant",
            "focus:border-primary focus:ring-4 focus:ring-primary/10"
          )}
          placeholder="Describe the reaction and any important care notes."
        />
        {errors.description && (
          <p className="text-sm text-red-500">
            {errors.description}
          </p>
        )}
      </div>

      <DialogFooter>
        <Button
          variant="outline"
          onClick={() => onOpenChange(false)}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          loading={isSubmitting}
        >
          {mode === "add"
            ? "Save Allergy"
            : "Update Allergy"}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

const DeleteAllergyDialog = ({
  allergy,
  isDeleting,
  onOpenChange,
  onDelete,
}: {
  allergy: PatientAllergy | null;
  isDeleting: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
}) => (
  <Dialog
    open={Boolean(allergy)}
    onOpenChange={onOpenChange}
  >
    <DialogContent className="max-w-md rounded-[28px] bg-white/95">
      <DialogHeader>
        <DialogTitle>Delete Allergy?</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this allergy? This action cannot be undone.
        </DialogDescription>
      </DialogHeader>

      <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {allergy?.allergyItem}
      </div>

      <DialogFooter>
        <Button
          variant="outline"
          onClick={() => onOpenChange(false)}
          disabled={isDeleting}
        >
          Cancel
        </Button>
        <Button
          variant="destructive"
          onClick={onDelete}
          loading={isDeleting}
        >
          Delete
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

const AllergySkeleton = () => (
  <div className="space-y-7">
    <div className="h-48 animate-pulse rounded-3xl bg-white/70 shadow-sm" />
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="h-36 animate-pulse rounded-[30px] bg-white/70 shadow-sm"
        />
      ))}
    </div>
    <div className="grid gap-6 xl:grid-cols-10">
      <div className="h-72 animate-pulse rounded-[30px] bg-white/70 shadow-sm xl:col-span-6" />
      <div className="h-72 animate-pulse rounded-[30px] bg-white/70 shadow-sm xl:col-span-4" />
    </div>
  </div>
);

const PatientAllergies = () => {
  const user = useAuthStore((state) => state.user);
  const patientId = normalizeEhrId(user?.ehrId);

  const [allergies, setAllergies] = useState<
    PatientAllergy[]
  >([]);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] =
    useState("ALL");
  const [selectedSeverity, setSelectedSeverity] =
    useState("ALL");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<
    "add" | "edit"
  >("add");
  const [formValues, setFormValues] =
    useState<AllergyFormValues>(defaultFormValues);
  const [formErrors, setFormErrors] =
    useState<AllergyFormErrors>({});
  const [isSubmitting, setIsSubmitting] =
    useState(false);
  const [allergyToDelete, setAllergyToDelete] =
    useState<PatientAllergy | null>(null);
  const [isDeleting, setIsDeleting] =
    useState(false);
  const [toastMessage, setToastMessage] =
    useState("");
  const [showToast, setShowToast] =
    useState(false);

  const loadAllergies = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const data = await getPatientAllergies(patientId);
      setAllergies(data);
    } catch (error) {
      console.error(
        "Failed to load patient allergies.",
        error
      );
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadAllergies();
  }, [patientId]);

  useEffect(() => {
    if (!showToast) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setShowToast(false);
    }, 2400);

    return () => window.clearTimeout(timer);
  }, [showToast]);

  const filteredAllergies = useMemo(
    () =>
      allergies.filter((allergy) => {
        const normalizedSearch =
          search.trim().toLowerCase();
        const matchesSearch =
          !normalizedSearch ||
          allergy.allergyItem
            .toLowerCase()
            .includes(normalizedSearch) ||
          allergy.description
            .toLowerCase()
            .includes(normalizedSearch) ||
          allergy.category
            .toLowerCase()
            .includes(normalizedSearch);

        const matchesType =
          selectedType === "ALL" ||
          allergy.allergyType === selectedType;

        const matchesSeverity =
          selectedSeverity === "ALL" ||
          allergy.severity === selectedSeverity;

        return (
          matchesSearch &&
          matchesType &&
          matchesSeverity
        );
      }),
    [
      allergies,
      search,
      selectedType,
      selectedSeverity,
    ]
  );

  const summary = useMemo(() => {
    const severeCount = allergies.filter(
      (allergy) =>
        allergy.severity === "SEVERE" ||
        allergy.severity === "LIFE_THREATENING"
    ).length;

    return {
      total: allergies.length,
      severe: severeCount,
      drug: allergies.filter(
        (allergy) => allergy.allergyType === "DRUG"
      ).length,
      food: allergies.filter(
        (allergy) => allergy.allergyType === "FOOD"
      ).length,
    };
  }, [allergies]);

  const criticalAllergies = useMemo(
    () =>
      allergies.filter(
        (allergy) =>
          allergy.severity === "SEVERE" ||
          allergy.severity === "LIFE_THREATENING"
      ),
    [allergies]
  );

  const openAddDialog = () => {
    setFormMode("add");
    setFormValues(defaultFormValues);
    setFormErrors({});
    setIsFormOpen(true);
  };

  const openEditDialog = (allergy: PatientAllergy) => {
    setFormMode("edit");
    setFormValues({
      allergyId: allergy.allergyId,
      category: allergy.category,
      allergyItem: allergy.allergyItem,
      allergyType: allergy.allergyType,
      severity: allergy.severity,
      description: allergy.description,
    });
    setFormErrors({});
    setIsFormOpen(true);
  };

  const handleFormChange = (
    field: keyof AllergyFormValues,
    value: string
  ) => {
    setFormValues((current) => ({
      ...current,
      [field]: value,
    }));
    setFormErrors((current) => ({
      ...current,
      [field]: undefined,
    }));
  };

  const handleSubmit = async () => {
    const nextErrors = validateForm(formValues);

    if (Object.keys(nextErrors).length > 0) {
      setFormErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      if (formMode === "add") {
        await addPatientAllergy(patientId, formValues);
        setToastMessage(
          "The allergy was added successfully."
        );
      } else {
        await updatePatientAllergy(patientId, formValues);
        setToastMessage(
          "The allergy details were updated successfully."
        );
      }

      setIsFormOpen(false);
      setShowToast(true);
      await loadAllergies();
    } catch (error) {
      console.error(
        "Failed to save patient allergy.",
        error
      );
      setFormErrors({
        description:
          "We could not save this allergy. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!allergyToDelete) {
      return;
    }

    setIsDeleting(true);

    try {
      await deletePatientAllergy(
        patientId,
        allergyToDelete.allergyId
      );
      setAllergyToDelete(null);
      setToastMessage(
        "The allergy was deleted successfully."
      );
      setShowToast(true);
      await loadAllergies();
    } catch (error) {
      console.error(
        "Failed to delete patient allergy.",
        error
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <AllergyToast
        message={toastMessage}
        visible={showToast}
      />

      <div className="mx-auto flex w-full max-w-[1700px] flex-col gap-7">
        <section className="relative overflow-hidden rounded-3xl border border-sky-100 bg-gradient-to-r from-sky-50 via-white to-cyan-50 p-6 shadow-sm">
          <div className="absolute -top-16 right-0 h-48 w-48 rounded-full bg-sky-100/50 blur-3xl" />
          <div className="absolute -bottom-20 left-10 h-56 w-56 rounded-full bg-cyan-100/40 blur-3xl" />

          <div className="relative z-10 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-sky-600">
                Dashboard
              </p>

              <h1 className="mt-2 text-3xl font-bold text-slate-900">
                Patient{" "}
                <span className="text-sky-700">
                  Allergies
                </span>
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                Manage and maintain your allergy information to help healthcare providers make safer treatment decisions.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={openAddDialog}
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <Plus size={18} />
                  Add Allergy
                </button>

                <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-5 py-2.5 text-sm font-medium text-sky-700 shadow-sm backdrop-blur">
                  <ShieldAlert size={18} />
                  {criticalAllergies.length} critical alerts
                </div>
              </div>
            </div>

            <div className="lg:text-right">
              <p className="text-sm font-medium text-slate-500">
                Patient ID
              </p>
              <p className="mt-1 text-2xl font-bold text-slate-900">
                {patientId}
              </p>
            </div>
          </div>
        </section>

        {isLoading ? (
          <AllergySkeleton />
        ) : isError ? (
          <AppCard className="border-danger/20">
            <div className="flex flex-col gap-4 text-center sm:text-left">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-danger/10 text-danger sm:mx-0">
                <AlertTriangle size={24} />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-on-background">
                  Allergies could not be loaded
                </h2>
                <p className="text-sm text-on-surface-variant">
                  We hit a temporary issue while loading allergy information. Please try again.
                </p>
              </div>
              <div>
                <AppButton onClick={() => void loadAllergies()}>
                  Retry
                </AppButton>
              </div>
            </div>
          </AppCard>
        ) : (
          <>
            <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              <SummaryCard
                title="Total Allergies"
                value={`${summary.total}`}
                subtitle="All known patient allergy records."
                icon={<Sparkles size={20} />}
              />
              <SummaryCard
                title="Severe Allergies"
                value={`${summary.severe}`}
                subtitle="Severe or life-threatening alerts."
                icon={<AlertTriangle size={20} />}
              />
              <SummaryCard
                title="Drug Allergies"
                value={`${summary.drug}`}
                subtitle="Medication-specific reactions on file."
                icon={<Pill size={20} />}
              />
              <SummaryCard
                title="Food Allergies"
                value={`${summary.food}`}
                subtitle="Food-related sensitivities and reactions."
                icon={<Apple size={20} />}
              />
            </section>

            <section className="grid items-stretch gap-6 xl:grid-cols-10">
              <div className="xl:col-span-6">
                <section className="h-full rounded-[30px] border border-white/20 bg-white/70 p-5 shadow-[0_15px_35px_rgba(0,0,0,0.08)] backdrop-blur-xl">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-on-surface-variant">
                        Search & Filters
                      </p>
                      <h2 className="mt-1 text-xl font-bold text-on-background">
                        Allergy Registry
                      </h2>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">
                      <Search
                        size={20}
                        className="text-primary"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-3">
                    <AppInput
                      value={search}
                      onChange={(event) =>
                        setSearch(event.target.value)
                      }
                      placeholder="Search by name or description"
                    />
                    <AppSelect
                      value={selectedType}
                      onChange={(event) =>
                        setSelectedType(
                          event.target.value
                        )
                      }
                      options={typeOptions}
                    />
                    <AppSelect
                      value={selectedSeverity}
                      onChange={(event) =>
                        setSelectedSeverity(
                          event.target.value
                        )
                      }
                      options={severityOptions}
                    />
                  </div>

                  <div className="mt-4 flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSearch("");
                        setSelectedType("ALL");
                        setSelectedSeverity("ALL");
                      }}
                    >
                      Reset
                    </Button>
                  </div>
                </section>
              </div>

              <div className="xl:col-span-4">
                <section className="flex h-full flex-col rounded-[30px] border border-white/20 bg-white/70 p-5 shadow-[0_15px_35px_rgba(0,0,0,0.08)] backdrop-blur-xl">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-on-surface-variant">
                        High Priority
                      </p>
                      <h2 className="mt-1 text-xl font-bold text-on-background">
                        Critical Allergies
                      </h2>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">
                      <ShieldAlert
                        size={20}
                        className="text-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    {criticalAllergies.length === 0 ? (
                      <div className="rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-5 text-sm text-on-surface-variant">
                        No severe or life-threatening allergies have been recorded.
                      </div>
                    ) : (
                      criticalAllergies
                        .slice(0, 3)
                        .map((allergy) => (
                          <div
                            key={allergy.allergyId}
                            className="rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-4 transition hover:shadow-sm"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <h3 className="text-sm font-semibold text-on-background">
                                  {allergy.allergyItem}
                                </h3>
                                <p className="mt-1 text-xs text-on-surface-variant">
                                  {allergy.category}
                                </p>
                              </div>

                              <AllergySeverityBadge
                                severity={allergy.severity}
                              />
                            </div>

                            <p className="mt-3 text-sm leading-6 text-on-surface-variant">
                              {allergy.description}
                            </p>
                          </div>
                        ))
                    )}
                  </div>
                </section>
              </div>
            </section>

            {allergies.length === 0 ? (
              <EmptyState
                title="No allergies have been added yet."
                description="Keep this list up to date so doctors can quickly review risks before prescribing treatments."
                actionLabel="Add Allergy"
                onAction={openAddDialog}
                icon={<ShieldPlus size={36} />}
              />
            ) : filteredAllergies.length === 0 ? (
              <EmptyState
                title="No allergies match these filters"
                description="Try adjusting the search query or filters to find the allergy record you need."
              />
            ) : (
              <>
                <div className="hidden overflow-hidden rounded-[30px] border border-white/20 bg-white/70 shadow-[0_15px_35px_rgba(0,0,0,0.08)] backdrop-blur-xl lg:block">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-outline-variant">
                        <TableHead>Allergy Item</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Allergy Type</TableHead>
                        <TableHead>Severity</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAllergies.map((allergy) => (
                        <TableRow
                          key={allergy.allergyId}
                          className="border-outline-variant"
                        >
                          <TableCell className="font-semibold text-on-background">
                            {allergy.allergyItem}
                          </TableCell>
                          <TableCell>
                            {allergy.category}
                          </TableCell>
                          <TableCell>
                            <AllergyTypeBadge
                              type={allergy.allergyType}
                            />
                          </TableCell>
                          <TableCell>
                            <AllergySeverityBadge
                              severity={allergy.severity}
                            />
                          </TableCell>
                          <TableCell className="max-w-[360px] whitespace-normal text-on-surface-variant">
                            {allergy.description}
                          </TableCell>
                          <TableCell>
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  openEditDialog(allergy)
                                }
                              >
                                Edit
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  setAllergyToDelete(
                                    allergy
                                  )
                                }
                              >
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="grid gap-4 lg:hidden">
                  {filteredAllergies.map((allergy) => (
                    <div
                      key={allergy.allergyId}
                      className="rounded-[30px] border border-white/20 bg-white/70 p-5 shadow-[0_15px_35px_rgba(0,0,0,0.08)] backdrop-blur-xl"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h2 className="text-lg font-semibold text-on-background">
                            {allergy.allergyItem}
                          </h2>
                          <p className="mt-1 text-sm text-on-surface-variant">
                            {allergy.category}
                          </p>
                        </div>
                        <AllergySeverityBadge
                          severity={allergy.severity}
                        />
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <AllergyTypeBadge
                          type={allergy.allergyType}
                        />
                      </div>

                      <p className="mt-4 text-sm leading-6 text-on-surface-variant">
                        {allergy.description}
                      </p>

                      <div className="mt-5 flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            openEditDialog(allergy)
                          }
                          className="flex-1"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            setAllergyToDelete(allergy)
                          }
                          className="flex-1"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>

      <div className="fixed bottom-24 right-4 z-30 md:hidden">
        <AppButton
          onClick={openAddDialog}
          className="rounded-full px-5 shadow-[0_20px_35px_rgba(14,165,233,0.22)]"
          disabled={isLoading}
        >
          <Plus size={16} />
          Add Allergy
        </AppButton>
      </div>

      <AllergyFormDialog
        open={isFormOpen}
        mode={formMode}
        values={formValues}
        errors={formErrors}
        isSubmitting={isSubmitting}
        onOpenChange={(open) => {
          setIsFormOpen(open);
          if (!open) {
            setFormErrors({});
          }
        }}
        onChange={handleFormChange}
        onSubmit={() => void handleSubmit()}
      />

      <DeleteAllergyDialog
        allergy={allergyToDelete}
        isDeleting={isDeleting}
        onOpenChange={(open) => {
          if (!open) {
            setAllergyToDelete(null);
          }
        }}
        onDelete={() => void handleDelete()}
      />
    </>
  );
};

export default PatientAllergies;
