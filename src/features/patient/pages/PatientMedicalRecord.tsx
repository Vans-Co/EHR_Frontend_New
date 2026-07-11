import { useEffect, useMemo, useState } from "react";

import type { MedicalRecord } from "../types/medicalRecord.types";
import { medicalRecords } from "../data/records.mock";

import MedicalRecordCard from "../components/medical-records/MedicalRecordCard";
import MedicalRecordsStats from "../components/medical-records/MedicalRecordsStats";
import MedicalRecordsFilters from "../components/medical-records/MedicalRecordsFilters";
import UploadRecordModal from "../components/medical-records/UploadRecordModal";
import ViewRecordModal from "../components/medical-records/ViewRecordModal";

import {
  FolderOpen,
  Upload,
  Building2,
  ShieldCheck,
  ArrowUpDown,
} from "lucide-react";

const STORAGE_KEY = "patient-medical-records";

type SortOption =
  | "Newest"
  | "Oldest"
  | "A-Z"
  | "Verified";

const PatientMedicalRecord = () => {

  const [records, setRecords] =
    useState<MedicalRecord[]>(medicalRecords);

  const [search, setSearch] =
    useState("");

  const [department, setDepartment] =
    useState("All");

  const [reportType, setReportType] =
    useState("All");

  const [status, setStatus] =
    useState("All");

  /* ---------- NEW ---------- */

  const [hospital, setHospital] =
    useState("All");

  const [sortBy, setSortBy] =
    useState<SortOption>("Newest");

  /* ------------------------- */

  const [uploadOpen, setUploadOpen] =
    useState(false);

  const [selectedRecord, setSelectedRecord] =
    useState<MedicalRecord | null>(null);

  // ===========================
  // Load Uploaded Records
  // ===========================

  useEffect(() => {

    const saved =
      localStorage.getItem(STORAGE_KEY);

    if (!saved) return;

    const uploaded: MedicalRecord[] =
      JSON.parse(saved);

    const hospitalRecords =
      medicalRecords.filter(
        (record) =>
          record.source === "Hospital"
      );

    setRecords([
      ...hospitalRecords,
      ...uploaded,
    ]);

  }, []);

  // ===========================
  // Save Uploaded Records
  // ===========================

  useEffect(() => {

    const uploaded =
      records.filter(
        (record) =>
          record.source === "Patient"
      );

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(uploaded)
    );

  }, [records]);

  // ===========================
  // Upload Record
  // ===========================

  const handleUpload = (data: {
    title: string;
    doctor: string;
    hospital: string;
    department: string;
    reportType: string;
    date: string;
    description: string;
    file: File | null;
  }) => {

    const objectUrl = data.file
      ? URL.createObjectURL(data.file)
      : "https://placehold.co/700x500?text=Medical+Record";

    const newRecord: MedicalRecord = {

      id: Date.now(),

      title: data.title,

      doctor: data.doctor,

      hospital: data.hospital,

      department: data.department,

      reportType:
        data.reportType as MedicalRecord["reportType"],

      date: data.date,

      description: data.description,

      image: objectUrl,

      fileUrl: objectUrl,

      fileName: data.file?.name,

      fileType: data.file?.type,

      source: "Patient",

      status: "Pending",
    };

    setRecords((prev) => [
      newRecord,
      ...prev,
    ]);

  };

  // ===========================
  // Delete Record
  // ===========================

  const handleDelete = (
    id: number
  ) => {

    if (
      !window.confirm(
        "Delete this medical record?"
      )
    ) {
      return;
    }

    setRecords((prev) =>
      prev.filter(
        (record) =>
          record.id !== id
      )
    );

  };

  // ===========================
  // Download
  // ===========================

  const handleDownload = (
    record: MedicalRecord
  ) => {

    if (!record.fileUrl) {
      alert("Download unavailable.");
      return;
    }

    const link =
      document.createElement("a");

    link.href = record.fileUrl;

    link.download =
      record.fileName ??
      `${record.title}.pdf`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

  };

  // ===========================
  // Summary Numbers
  // ===========================

  const totalRecords = records.length;

  const uploadedCount =
    records.filter(
      (r) => r.source === "Patient"
    ).length;

  const verifiedCount =
    records.filter(
      (r) => r.status === "Verified"
    ).length;

  const hospitalCount =
    new Set(
      records.map(
        (r) => r.hospital
      )
    ).size;

  const hospitals = [
    "All",
    ...Array.from(
      new Set(
        records.map(
          (r) => r.hospital
        )
      )
    ),
  ];
    // ===========================
  // Filtering + Sorting
  // ===========================

  const filteredRecords = useMemo(() => {

    const filtered = records.filter((record) => {

      const matchesSearch =
        record.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        record.doctor
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        record.hospital
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesDepartment =
        department === "All" ||
        record.department === department;

      const matchesType =
        reportType === "All" ||
        record.reportType === reportType;

      const matchesStatus =
        status === "All" ||
        record.status === status;

      const matchesHospital =
        hospital === "All" ||
        record.hospital === hospital;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesType &&
        matchesStatus &&
        matchesHospital
      );

    });

    switch (sortBy) {

      case "Oldest":

        filtered.sort(
          (a, b) =>
            new Date(a.date).getTime() -
            new Date(b.date).getTime()
        );

        break;

      case "A-Z":

        filtered.sort((a, b) =>
          a.title.localeCompare(b.title)
        );

        break;

      case "Verified":

        filtered.sort((a, b) => {

          if (
            a.status === "Verified" &&
            b.status !== "Verified"
          )
            return -1;

          if (
            b.status === "Verified" &&
            a.status !== "Verified"
          )
            return 1;

          return 0;

        });

        break;

      default:

        filtered.sort(
          (a, b) =>
            new Date(b.date).getTime() -
            new Date(a.date).getTime()
        );

    }

    return filtered;

  }, [
    records,
    search,
    department,
    reportType,
    status,
    hospital,
    sortBy,
  ]);

  const hospitalRecords =
    filteredRecords.filter(
      (record) =>
        record.source === "Hospital"
    );

  const uploadedRecords =
    filteredRecords.filter(
      (record) =>
        record.source === "Patient"
    );

  return (

    <div className="space-y-8">

      {/* ===================================================== */}
      {/* Hero Banner */}
      {/* ===================================================== */}

      <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 p-8 text-white shadow-2xl shadow-blue-200">

        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur">

              <FolderOpen className="h-4 w-4" />

              Digital Healthcare Records

            </div>

            <h1 className="text-4xl font-bold">
              Medical Records
            </h1>

            <p className="mt-3 max-w-2xl text-blue-100">

              Securely manage your hospital reports,
              prescriptions, scans and personal
              medical documents from one place.

            </p>

          </div>

          {/* Quick Stats */}

          <div className="grid grid-cols-2 gap-4">

            <div className="rounded-2xl bg-white/15 p-5 backdrop-blur">

              <p className="text-sm text-blue-100">
                Total Records
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {totalRecords}
              </h2>

            </div>

            <div className="rounded-2xl bg-white/15 p-5 backdrop-blur">

              <p className="text-sm text-blue-100">
                Verified
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {verifiedCount}
              </h2>

            </div>

            <div className="rounded-2xl bg-white/15 p-5 backdrop-blur">

              <p className="text-sm text-blue-100">
                Hospitals
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {hospitalCount}
              </h2>

            </div>

            <div className="rounded-2xl bg-white/15 p-5 backdrop-blur">

              <p className="text-sm text-blue-100">
                Uploaded
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {uploadedCount}
              </h2>

            </div>

          </div>

        </div>

      </section>

      {/* Stats */}

      <MedicalRecordsStats
        records={records}
      />

      {/* Filters */}

      <MedicalRecordsFilters
        search={search}
        department={department}
        reportType={reportType}
        status={status}
        onSearchChange={setSearch}
        onDepartmentChange={setDepartment}
        onReportTypeChange={setReportType}
        onStatusChange={setStatus}
      />

      {/* ===================================================== */}
      {/* Extra Controls */}
      {/* ===================================================== */}

      <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-lg shadow-blue-100/40">

        <div className="grid gap-5 lg:grid-cols-2">

          {/* Hospital */}

          <div>

            <label className="mb-2 block text-sm font-semibold text-slate-600">

              Hospital

            </label>

            <select
              value={hospital}
              onChange={(e) =>
                setHospital(
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm outline-none transition focus:border-blue-500 focus:bg-white focus:shadow-lg focus:shadow-blue-200/40"
            >
              {hospitals.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>

          </div>

          {/* Sort */}

          <div>

            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-600">

              <ArrowUpDown className="h-4 w-4 text-blue-600" />

              Sort Records

            </label>

            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(
                  e.target
                    .value as SortOption
                )
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm outline-none transition focus:border-blue-500 focus:bg-white focus:shadow-lg focus:shadow-blue-200/40"
            >
              <option value="Newest">
                Newest First
              </option>

              <option value="Oldest">
                Oldest First
              </option>

              <option value="A-Z">
                A - Z
              </option>

              <option value="Verified">
                Verified First
              </option>

            </select>

          </div>

        </div>

      </div>
            {/* ===================================================== */}
      {/* Hospital Records */}
      {/* ===================================================== */}

      <section className="space-y-6">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <div className="flex items-center gap-3">

              <div className="rounded-xl bg-blue-100 p-3 shadow-md shadow-blue-200">

                <Building2 className="h-6 w-6 text-blue-600" />

              </div>

              <div>

                <h2 className="text-2xl font-bold text-slate-900">
                  Hospital Records
                </h2>

                <p className="mt-1 text-slate-500">
                  Official medical records received from verified healthcare
                  providers.
                </p>

              </div>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <div className="rounded-full bg-blue-50 px-5 py-2 text-sm font-semibold text-blue-700 shadow-md shadow-blue-100">

              {hospitalRecords.length} Record
              {hospitalRecords.length !== 1 ? "s" : ""}

            </div>

            <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-md shadow-emerald-100">

              <ShieldCheck className="h-4 w-4" />

              Verified Source

            </div>

          </div>

        </div>

        {/* Divider */}

        <div className="h-px bg-gradient-to-r from-blue-300 via-blue-100 to-transparent" />

        {/* Empty State */}

        {hospitalRecords.length === 0 ? (

          <div className="rounded-3xl border border-dashed border-blue-200 bg-gradient-to-br from-blue-50 to-white p-14 text-center shadow-lg shadow-blue-100">

            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 shadow-lg shadow-blue-200">

              <Building2 className="h-12 w-12 text-blue-600" />

            </div>

            <h3 className="text-2xl font-bold text-slate-800">
              No Hospital Records Found
            </h3>

            <p className="mx-auto mt-3 max-w-xl text-slate-500">

              We couldn't find any hospital records matching your current
              filters. Try changing your search criteria.

            </p>

          </div>

        ) : (

          <div className="grid gap-7 md:grid-cols-2 2xl:grid-cols-3">

            {hospitalRecords.map((record) => (

              <MedicalRecordCard
                key={record.id}
                record={record}
                onView={setSelectedRecord}
                onDownload={handleDownload}
              />

            ))}

          </div>

        )}

      </section>

      {/* ===================================================== */}
      {/* Uploaded Records */}
      {/* ===================================================== */}
            <section className="space-y-6">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <div className="flex items-center gap-3">

              <div className="rounded-xl bg-blue-100 p-3 shadow-md shadow-blue-200">

                <Upload className="h-6 w-6 text-blue-600" />

              </div>

              <div>

                <h2 className="text-2xl font-bold text-slate-900">
                  My Uploaded Records
                </h2>

                <p className="mt-1 text-slate-500">
                  Personal medical documents uploaded by you for future
                  reference.
                </p>

              </div>

            </div>

          </div>

          <div className="flex flex-wrap items-center gap-3">

            <div className="rounded-full bg-blue-50 px-5 py-2 text-sm font-semibold text-blue-700 shadow-md shadow-blue-100">

              {uploadedRecords.length} Record
              {uploadedRecords.length !== 1 ? "s" : ""}

            </div>

            <button
              onClick={() => setUploadOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-200 transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-300"
            >
              <Upload className="h-5 w-5" />

              Upload Record

            </button>

          </div>

        </div>

        <div className="h-px bg-gradient-to-r from-blue-300 via-blue-100 to-transparent" />

        {uploadedRecords.length === 0 ? (

          <div className="rounded-3xl border border-dashed border-blue-200 bg-gradient-to-br from-blue-50 to-white p-14 text-center shadow-lg shadow-blue-100">

            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 shadow-lg shadow-blue-200">

              <Upload className="h-12 w-12 text-blue-600" />

            </div>

            <h3 className="text-2xl font-bold text-slate-800">
              No Uploaded Records Yet
            </h3>

            <p className="mx-auto mt-3 max-w-xl text-slate-500">

              Upload prescriptions, blood reports, scans and other medical
              documents to securely keep everything in one place.

            </p>

            <button
              onClick={() => setUploadOpen(true)}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-300"
            >
              <Upload className="h-5 w-5" />

              Upload First Record

            </button>

          </div>

        ) : (

          <div className="grid gap-7 md:grid-cols-2 2xl:grid-cols-3">

            {uploadedRecords.map((record) => (

              <MedicalRecordCard
                key={record.id}
                record={record}
                onView={setSelectedRecord}
                onDownload={handleDownload}
                onDelete={handleDelete}
              />

            ))}

          </div>

        )}

      </section>

      {/* Upload Modal */}

      <UploadRecordModal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onUpload={handleUpload}
      />

      {/* View Modal */}

      <ViewRecordModal
        open={selectedRecord !== null}
        record={selectedRecord}
        onClose={() => setSelectedRecord(null)}
        onDownload={handleDownload}
      />

    </div>

  );

};

export default PatientMedicalRecord;