import {
  Download,
  Eye,
  FileText,
  Trash2,
  Building2,
  UserRound,
  CalendarDays,
  ShieldCheck,
  BadgeCheck,
  ImageIcon,
  FileBadge,
} from "lucide-react";

import type { MedicalRecord } from "../../types/medicalRecord.types";

type MedicalRecordCardProps = {
  record: MedicalRecord;
  onView: (record: MedicalRecord) => void;
  onDownload: (record: MedicalRecord) => void;
  onDelete?: (id: number) => void;
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
      text: "Verified Hospital",
      icon: ShieldCheck,
      className:
        "bg-blue-600 text-white shadow-lg shadow-blue-300/40",
    };
  }

  return {
    text: "Self Uploaded",
    icon: BadgeCheck,
    className:
      "bg-amber-500 text-white shadow-lg shadow-amber-300/40",
  };
};

const getFileType = (record: MedicalRecord) => {
  if (!record.fileType)
    return {
      label: "Medical Report",
      icon: FileText,
    };

  if (record.fileType.includes("pdf"))
    return {
      label: "PDF Document",
      icon: FileBadge,
    };

  if (
    record.fileType.includes("image") ||
    record.fileType.includes("png") ||
    record.fileType.includes("jpg") ||
    record.fileType.includes("jpeg")
  )
    return {
      label: "Image File",
      icon: ImageIcon,
    };

  return {
    label: "Medical Report",
    icon: FileText,
  };
};

const reportIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case "blood test":
      return "🧪";

    case "mri":
      return "🧠";

    case "ct scan":
      return "🖥️";

    case "x-ray":
      return "🩻";

    case "ecg":
      return "❤️";

    case "prescription":
      return "💊";

    case "ultrasound":
      return "📡";

    default:
      return "📄";
  }
};

const MedicalRecordCard = ({
  record,
  onView,
  onDownload,
  onDelete,
}: MedicalRecordCardProps) => {
  const isPdf = record.fileType?.includes("pdf");

  const ribbon = getRibbon(record);

  const FileIcon = getFileType(record).icon;

  const fileLabel = getFileType(record).label;

  return (
    <div
      className="
        group
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-lg
        shadow-blue-100/50
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-blue-200
        hover:shadow-xl
        hover:shadow-blue-200/60
      "
    >
      {/* Ribbon */}

      <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-3 text-white">
        <div className="flex items-center gap-2">
          <ribbon.icon className="h-4 w-4" />

          <span className="text-xs font-semibold uppercase tracking-wide">
            {ribbon.text}
          </span>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
            record.status
          )}`}
        >
          {record.status}
        </span>
      </div>

      {/* Preview */}

      <div className="relative flex h-56 items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50">
        {isPdf ? (
          <div className="flex flex-col items-center text-blue-600">
            <FileText className="h-20 w-20" />

            <p className="mt-3 rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
              PDF Preview
            </p>
          </div>
        ) : (
          <img
            src={record.image}
            alt={record.title}
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-500
              group-hover:scale-105
            "
          />
        )}

        <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow-md">
          {reportIcon(record.reportType)} {record.reportType}
        </div>
      </div>

      {/* Body */}

      <div className="space-y-5 p-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            {record.title}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {record.description}
          </p>
        </div>
                {/* Information */}

        <div className="space-y-3 rounded-xl border border-blue-100 bg-blue-50/40 p-4 shadow-sm shadow-blue-100/40">

          <div className="flex items-center gap-3">

            <div className="rounded-lg bg-white p-2 shadow-sm">
              <Building2 className="h-5 w-5 text-blue-600" />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Hospital
              </p>

              <p className="font-semibold text-slate-800">
                {record.hospital}
              </p>
            </div>

          </div>

          <div className="flex items-center gap-3">

            <div className="rounded-lg bg-white p-2 shadow-sm">
              <UserRound className="h-5 w-5 text-blue-600" />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Doctor
              </p>

              <p className="font-semibold text-slate-800">
                {record.doctor}
              </p>
            </div>

          </div>

          <div className="flex items-center gap-3">

            <div className="rounded-lg bg-white p-2 shadow-sm">
              <ShieldCheck className="h-5 w-5 text-blue-600" />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Department
              </p>

              <p className="font-semibold text-slate-800">
                {record.department}
              </p>
            </div>

          </div>

          <div className="flex items-center gap-3">

            <div className="rounded-lg bg-white p-2 shadow-sm">
              <CalendarDays className="h-5 w-5 text-blue-600" />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Record Date
              </p>

              <p className="font-semibold text-slate-800">
                {record.date}
              </p>
            </div>

          </div>

        </div>

        {/* File Information */}

        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">

          <div className="flex items-center gap-3">

            <div className="rounded-lg bg-white p-2 shadow-sm">
              <FileIcon className="h-5 w-5 text-blue-600" />
            </div>

            <div>

              <p className="text-xs uppercase tracking-wide text-slate-500">
                File Type
              </p>

              <p className="font-medium text-slate-800">
                {fileLabel}
              </p>

            </div>

          </div>

          {record.fileName && (
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
              {record.fileName}
            </span>
          )}

        </div>

        {/* Description */}

        <div className="rounded-xl border border-slate-200 bg-white p-4">

          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Notes
          </p>

          <p className="text-sm leading-6 text-slate-600">
            {record.description}
          </p>

        </div>

        {/* Actions */}

        <div className="grid grid-cols-3 gap-3">

          <button
            onClick={() => onView(record)}
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-blue-600
              px-4
              py-3
              text-sm
              font-semibold
              text-white
              shadow-lg
              shadow-blue-200/50
              transition-all
              duration-300
              hover:bg-blue-700
              hover:shadow-blue-300/60
            "
          >
            <Eye className="h-4 w-4" />
            View
          </button>

          <button
            onClick={() => onDownload(record)}
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-blue-200
              bg-white
              px-4
              py-3
              text-sm
              font-semibold
              text-blue-700
              shadow-md
              shadow-blue-100/40
              transition-all
              duration-300
              hover:bg-blue-50
              hover:shadow-blue-200/50
            "
          >
            <Download className="h-4 w-4" />
            Download
          </button>
                    {record.source === "Patient" && onDelete ? (
            <button
              onClick={() => onDelete(record.id)}
              className="
                flex
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-red-200
                bg-white
                px-4
                py-3
                text-sm
                font-semibold
                text-red-600
                shadow-md
                transition-all
                duration-300
                hover:border-red-300
                hover:bg-red-50
                hover:shadow-red-200/40
              "
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
          ) : (
            <div
              className="
                flex
                items-center
                justify-center
                rounded-xl
                border
                border-emerald-200
                bg-emerald-50
                px-4
                py-3
                text-sm
                font-semibold
                text-emerald-700
              "
            >
              <ShieldCheck className="mr-2 h-4 w-4" />
              Hospital Verified
            </div>
          )}
        </div>

        {/* Footer */}

        <div className="flex items-center justify-between border-t border-slate-200 pt-4">

          <div className="flex items-center gap-2">

            <div
              className={`h-2.5 w-2.5 rounded-full ${
                record.source === "Hospital"
                  ? "bg-emerald-500"
                  : "bg-amber-500"
              }`}
            />

            <span className="text-sm font-medium text-slate-600">
              {record.source === "Hospital"
                ? "Hospital Issued Record"
                : "Patient Uploaded Record"}
            </span>

          </div>

          <div className="text-xs text-slate-400">
            ID #{record.id}
          </div>

        </div>

      </div>
    </div>
  );
};

export default MedicalRecordCard;