import {
  X,
  Download,
  FileText,
  Building2,
  UserRound,
  CalendarDays,
  ShieldCheck,
  BadgeCheck,
  ImageIcon,
  FileBadge,
  Stethoscope,
} from "lucide-react";

import type { MedicalRecord } from "../../types/medicalRecord.types";

type ViewRecordModalProps = {
  open: boolean;
  onClose: () => void;
  record: MedicalRecord | null;
  onDownload: (record: MedicalRecord) => void;
};

const getStatusColor = (status: MedicalRecord["status"]) => {
  switch (status) {
    case "Verified":
      return "bg-emerald-100 text-emerald-700 border border-emerald-200";

    case "Reviewed":
      return "bg-blue-100 text-blue-700 border border-blue-200";

    case "Pending":
      return "bg-amber-100 text-amber-700 border border-amber-200";

    default:
      return "bg-slate-100 text-slate-700 border border-slate-200";
  }
};

const getRibbon = (record: MedicalRecord) => {
  if (record.source === "Hospital") {
    return {
      text: "Verified Hospital Record",
      icon: ShieldCheck,
      color: "bg-blue-600 text-white",
    };
  }

  return {
    text: "Self Uploaded Record",
    icon: BadgeCheck,
    color: "bg-amber-500 text-white",
  };
};

const getFileType = (record: MedicalRecord) => {
  if (!record.fileType)
    return {
      icon: FileText,
      label: "Medical Report",
    };

  if (record.fileType.includes("pdf"))
    return {
      icon: FileBadge,
      label: "PDF Document",
    };

  if (record.fileType.includes("image"))
    return {
      icon: ImageIcon,
      label: "Image File",
    };

  return {
    icon: FileText,
    label: "Medical Report",
  };
};

const ViewRecordModal = ({
  open,
  onClose,
  record,
  onDownload,
}: ViewRecordModalProps) => {
  if (!open || !record) return null;

  const isPdf = record.fileType?.includes("pdf");

  const ribbon = getRibbon(record);

  const RibbonIcon = ribbon.icon;

  const FileIcon = getFileType(record).icon;

  const fileLabel = getFileType(record).label;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-5">

      <div className="relative max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl shadow-blue-300/40">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-200 bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-5 text-white">

          <div>

            <h2 className="text-2xl font-bold">
              Medical Record
            </h2>

            <p className="mt-1 text-blue-100">
              Secure Healthcare Document
            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-xl bg-white/10 p-2 transition hover:bg-white/20"
          >
            <X className="h-6 w-6" />
          </button>

        </div>

        <div className="max-h-[calc(92vh-90px)] overflow-y-auto">

          {/* Ribbon */}

          <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-8 py-4">

            <div
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold shadow ${ribbon.color}`}
            >
              <RibbonIcon className="h-4 w-4" />

              {ribbon.text}

            </div>

            <span
              className={`rounded-full px-4 py-2 text-sm font-semibold ${getStatusColor(
                record.status
              )}`}
            >
              {record.status}
            </span>

          </div>

          {/* Preview */}

          <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-8">

            <div className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-xl shadow-blue-100/50">

              {isPdf ? (

                <div className="flex h-[420px] flex-col items-center justify-center">

                  <FileText className="h-28 w-28 text-red-500" />

                  <h3 className="mt-6 text-2xl font-bold text-slate-800">
                    PDF Document
                  </h3>

                  <p className="mt-2 text-slate-500">
                    Preview unavailable in browser
                  </p>

                </div>

              ) : (

                <img
                  src={record.image}
                  alt={record.title}
                  className="max-h-[500px] w-full object-contain"
                />

              )}

            </div>

          </div>
                    {/* Record Information */}

          <div className="space-y-8 px-8 pb-8">

            {/* Title */}

            <div>

              <h1 className="text-3xl font-bold text-slate-900">
                {record.title}
              </h1>

              <p className="mt-2 text-lg text-slate-500">
                {record.reportType}
              </p>

            </div>

            {/* Information Cards */}

            <div className="grid gap-6 md:grid-cols-2">

              {/* Doctor */}

              <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-100/40">

                <div className="flex items-center gap-4">

                  <div className="rounded-xl bg-blue-100 p-3">

                    <UserRound className="h-6 w-6 text-blue-600" />

                  </div>

                  <div>

                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Doctor
                    </p>

                    <h3 className="mt-1 text-lg font-semibold text-slate-900">
                      {record.doctor}
                    </h3>

                    <p className="text-sm text-slate-500">
                      Consulting Physician
                    </p>

                  </div>

                </div>

              </div>

              {/* Hospital */}

              <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-100/40">

                <div className="flex items-center gap-4">

                  <div className="rounded-xl bg-blue-100 p-3">

                    <Building2 className="h-6 w-6 text-blue-600" />

                  </div>

                  <div>

                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Hospital
                    </p>

                    <h3 className="mt-1 text-lg font-semibold text-slate-900">
                      {record.hospital}
                    </h3>

                    <p className="text-sm text-slate-500">
                      Verified Healthcare Provider
                    </p>

                  </div>

                </div>

              </div>

              {/* Department */}

              <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-100/40">

                <div className="flex items-center gap-4">

                  <div className="rounded-xl bg-blue-100 p-3">

                    <Stethoscope className="h-6 w-6 text-blue-600" />

                  </div>

                  <div>

                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Department
                    </p>

                    <h3 className="mt-1 text-lg font-semibold text-slate-900">
                      {record.department}
                    </h3>

                    <p className="text-sm text-slate-500">
                      Medical Specialty
                    </p>

                  </div>

                </div>

              </div>

              {/* Date */}

              <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-100/40">

                <div className="flex items-center gap-4">

                  <div className="rounded-xl bg-blue-100 p-3">

                    <CalendarDays className="h-6 w-6 text-blue-600" />

                  </div>

                  <div>

                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Record Date
                    </p>

                    <h3 className="mt-1 text-lg font-semibold text-slate-900">
                      {record.date}
                    </h3>

                    <p className="text-sm text-slate-500">
                      Medical Consultation Date
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* File Information */}

            <div className="rounded-2xl border border-blue-100 bg-blue-50/40 p-6 shadow-lg shadow-blue-100/40">

              <div className="mb-5 flex items-center gap-3">

                <FileIcon className="h-6 w-6 text-blue-600" />

                <h3 className="text-lg font-bold text-slate-900">
                  File Information
                </h3>

              </div>

              <div className="grid gap-5 md:grid-cols-2">

                <div>

                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    File Type
                  </p>

                  <p className="mt-2 font-semibold text-slate-800">
                    {fileLabel}
                  </p>

                </div>

                <div>

                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    File Name
                  </p>

                  <p className="mt-2 break-all font-semibold text-slate-800">
                    {record.fileName || "Hospital Generated Record"}
                  </p>

                </div>

              </div>

            </div>

            {/* Description */}

            <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-100/40">

              <h3 className="mb-4 text-lg font-bold text-slate-900">
                Description
              </h3>

              <p className="leading-8 text-slate-600">
                {record.description}
              </p>

            </div>
                        {/* Footer */}

            <div className="sticky bottom-0 z-20 flex flex-col gap-4 rounded-2xl border border-blue-100 bg-white p-6 shadow-2xl shadow-blue-100/50 md:flex-row md:items-center md:justify-between">

              {/* Record Info */}

              <div className="flex items-center gap-3">

                <div
                  className={`h-3 w-3 rounded-full ${
                    record.source === "Hospital"
                      ? "bg-emerald-500"
                      : "bg-amber-500"
                  }`}
                />

                <div>

                  <p className="font-semibold text-slate-800">
                    {record.source === "Hospital"
                      ? "Hospital Issued Record"
                      : "Patient Uploaded Record"}
                  </p>

                  <p className="text-sm text-slate-500">
                    Record ID #{record.id}
                  </p>

                </div>

              </div>

              {/* Buttons */}

              <div className="flex gap-3">

                <button
                  onClick={() => onDownload(record)}
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-blue-600
                    px-6
                    py-3
                    font-semibold
                    text-white
                    shadow-lg
                    shadow-blue-200/60
                    transition-all
                    duration-300
                    hover:bg-blue-700
                    hover:shadow-xl
                    hover:shadow-blue-300/60
                  "
                >
                  <Download className="h-5 w-5" />

                  Download Record

                </button>

                <button
                  onClick={onClose}
                  className="
                    rounded-xl
                    border
                    border-slate-300
                    bg-white
                    px-6
                    py-3
                    font-semibold
                    text-slate-700
                    transition-all
                    duration-300
                    hover:border-blue-300
                    hover:bg-blue-50
                    hover:text-blue-700
                  "
                >
                  Close
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ViewRecordModal;