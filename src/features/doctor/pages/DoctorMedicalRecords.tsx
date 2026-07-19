import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import {
  getPatientAllergies,
  getMedicalRecords,
  getReportsByPatient,
  downloadReportFile,
} from "../../patient/services/patientApi";
import {
  addReport,
  addMedication,
  addDietInstruction,
  requestReportAccess,
} from "../services/doctorApi";
import { searchPatients } from "../services/doctorApi";
import AppButton from "@/components/common/AppButton";
import AppInput from "@/components/common/AppInput";
import AppSelect from "@/components/common/AppSelect";
import { formatDisplayDate, toBackendDate } from "@/lib/dateUtils";
import {
  User,
  Search,
  FileHeart,
  Plus,
  Trash,
  Upload,
  AlertTriangle,
  Download,
  Clipboard,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";

interface MedicineItem {
  medicineName: string;
  dosageMg: number;
  shift: string;
  tenure: number;
  isActive: boolean;
  expire: string;
  notes: string;
}

const DoctorMedicalRecords = () => {
  const { user } = useAuthStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const patientId = searchParams.get("patientId") || "";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Patient Info
  const [allergies, setAllergies] = useState<any[]>([]);
  const [records, setRecords] = useState<any[]>([]);
  const [reports, setReports] = useState<any[]>([]);

  // Search Patient
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  // Modals
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportSubmitting, setReportSubmitting] = useState(false);
  const [reportForm, setReportForm] = useState({
    info: "",
    desc: "",
    conclusion: "",
    file: null as File | null,
  });

  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [prescSubmitting, setPrescSubmitting] = useState(false);
  const [medicinesList, setMedicinesList] = useState<MedicineItem[]>([
    {
      medicineName: "",
      dosageMg: 250,
      shift: "MORNING_AfterFood",
      tenure: 5,
      isActive: true,
      expire: "",
      notes: "",
    },
  ]);

  const [dietForm, setDietForm] = useState({
    name_of_diet: "",
    food_description: "",
  });

  const shifts = [
    { label: "Morning Before Food", value: "MORNING_BeforeFood" },
    { label: "Morning After Food", value: "MORNING_AfterFood" },
    { label: "Evening Before Food", value: "EVENING_BeforeFood" },
    { label: "Evening After Food", value: "EVENING_AfterFood" },
    { label: "Night Before Food", value: "NIGHT_BeforeFood" },
    { label: "Night After Food", value: "NIGHT_AfterFood" },
  ];

  useEffect(() => {
    if (patientId) {
      loadPatientDetails();
    }
  }, [patientId]);

  const loadPatientDetails = async () => {
    try {
      setLoading(true);
      setError("");
      // load details, might fail if no access
      const allergiesData = await getPatientAllergies(patientId);
      const recordsData = await getMedicalRecords(patientId);
      const reportsData = await getReportsByPatient(patientId);

      setAllergies(allergiesData);
      setRecords(recordsData.content || []);
      setReports(reportsData);
    } catch (err: any) {
      setError("Access to patient records is currently restricted. Please submit an access request.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    try {
      setSearchLoading(true);
      const res = await searchPatients(searchQuery);
      setSearchResults(res);
    } catch (err) {
      setError("Failed to search patients.");
    } finally {
      setSearchLoading(false);
    }
  };

  const handleRequestAccess = async () => {
    try {
      setError("");
      setSuccess("");
      await requestReportAccess({
        doctorId: String(user?.ehrId),
        patientId,
      });
      setSuccess("Access request submitted successfully!");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to submit request.");
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = (reader.result as string).split(",")[1];
        resolve(base64String);
      };
      reader.onerror = (err) => reject(err);
    });
  };

  const handleReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportForm.info || !reportForm.file) {
      setError("Report Information and File are required.");
      return;
    }

    try {
      setReportSubmitting(true);
      setError("");
      setSuccess("");

      const fileBase64 = await fileToBase64(reportForm.file);
      const today = new Date().toISOString().split("T")[0]; // yyyy-MM-dd
      const backendToday = toBackendDate(today);

      await addReport({
        patientIds: [patientId],
        doctorId: String(user?.ehrId),
        dateTime: backendToday,
        info: reportForm.info,
        desc: reportForm.desc,
        conclusion: reportForm.conclusion,
        fileBase64,
        fileName: reportForm.file.name,
        fileType: reportForm.file.type,
      });

      setSuccess("Diagnostic report uploaded successfully!");
      setIsReportModalOpen(false);
      loadPatientDetails();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to upload report.");
    } finally {
      setReportSubmitting(false);
    }
  };

  const addMedicineRow = () => {
    setMedicinesList([
      ...medicinesList,
      {
        medicineName: "",
        dosageMg: 250,
        shift: "MORNING_AfterFood",
        tenure: 5,
        isActive: true,
        expire: "",
        notes: "",
      },
    ]);
  };

  const removeMedicineRow = (index: number) => {
    setMedicinesList(medicinesList.filter((_, i) => i !== index));
  };

  const handleMedicineChange = (index: number, field: keyof MedicineItem, value: any) => {
    const updated = [...medicinesList];
    updated[index] = { ...updated[index], [field]: value };
    setMedicinesList(updated);
  };

  const handlePrescriptionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate
    const invalid = medicinesList.some((m) => !m.medicineName || !m.expire);
    if (invalid) {
      setError("Please fill all medicine fields including expiry dates.");
      return;
    }

    try {
      setPrescSubmitting(true);
      setError("");
      setSuccess("");

      // Prepare diet instruction if entered
      let dietObj = null;
      if (dietForm.name_of_diet && dietForm.food_description) {
        // Create diet instruction
        await addDietInstruction(patientId, {
          name_of_diet: dietForm.name_of_diet,
          food_description: dietForm.food_description,
          prescribeBy: String(user?.ehrId),
        });
      }

      const today = new Date().toISOString().split("T")[0]; // yyyy-MM-dd
      const backendToday = toBackendDate(today);

      const medicinesDetails = medicinesList.map((m) => ({
        medicineName: m.medicineName,
        dosageMg: Number(m.dosageMg),
        shift: m.shift,
        tenure: Number(m.tenure),
        isActive: m.isActive,
        expire: toBackendDate(m.expire),
        notes: m.notes,
      }));

      await addMedication({
        prescribedBy: String(user?.ehrId),
        prescribedOn: backendToday,
        details: medicinesDetails,
        patient: patientId,
      });

      setSuccess("Medications prescribed successfully!");
      setIsPrescriptionModalOpen(false);
      // clear forms
      setMedicinesList([
        {
          medicineName: "",
          dosageMg: 250,
          shift: "MORNING_AfterFood",
          tenure: 5,
          isActive: true,
          expire: "",
          notes: "",
        },
      ]);
      setDietForm({ name_of_diet: "", food_description: "" });
      loadPatientDetails();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to prescribe medications.");
    } finally {
      setPrescSubmitting(false);
    }
  };

  const handleDownloadReport = async (reportId: number, fileName: string) => {
    try {
      const blob = await downloadReportFile(reportId);
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName || `report_${reportId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setError("Failed to download report.");
    }
  };

  if (!patientId) {
    return (
      <div className="space-y-6 max-w-xl mx-auto">
        <div className="rounded-3xl border border-outline-variant bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-4">
            <Search size={22} className="text-primary" /> Select Patient EHR
          </h2>
          <form onSubmit={handleSearch} className="flex gap-3">
            <AppInput
              placeholder="Search by patient name, email, or EHR ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <AppButton type="submit" loading={searchLoading} className="px-5 h-14 rounded-2xl">
              Search
            </AppButton>
          </form>

          {searchResults.length > 0 && (
            <div className="mt-6 border-t border-outline-variant pt-4 space-y-3">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Search Results</h3>
              <div className="divide-y divide-outline-variant">
                {searchResults.map((pat) => (
                  <div key={pat.ehrId} className="flex items-center justify-between py-3">
                    <div>
                      <h4 className="font-semibold text-slate-800">
                        {pat.firstName} {pat.lastName}
                      </h4>
                      <p className="text-xs text-slate-400">ID: {pat.ehrId} | Phone: {pat.phoneNo}</p>
                    </div>
                    <AppButton
                      onClick={() => setSearchParams({ patientId: pat.ehrId })}
                      className="text-xs px-3 py-1.5 rounded-xl"
                    >
                      Examine
                    </AppButton>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <User size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">EHR Record: {patientId}</h1>
            <button
              onClick={() => setSearchParams({})}
              className="text-xs font-semibold text-primary hover:underline"
            >
              ← Choose different patient
            </button>
          </div>
        </div>

        <div className="flex gap-2 self-start sm:self-center">
          <AppButton
            variant="secondary"
            onClick={() => setIsReportModalOpen(true)}
            className="flex items-center gap-1.5 text-xs py-2 px-3 rounded-xl border border-outline-variant"
          >
            <Upload size={14} /> Upload Report
          </AppButton>
          <AppButton
            onClick={() => setIsPrescriptionModalOpen(true)}
            className="flex items-center gap-1.5 text-xs py-2 px-3 rounded-xl"
          >
            <Plus size={14} /> Prescribe Medications
          </AppButton>
        </div>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 space-y-3">
          <div className="flex items-center gap-2 text-red-600">
            <AlertTriangle size={20} />
            <p className="text-sm font-semibold">{error}</p>
          </div>
          {error.includes("restricted") && (
            <AppButton onClick={handleRequestAccess} className="text-xs py-2 px-4 rounded-xl">
              Submit Access Request
            </AppButton>
          )}
        </div>
      )}

      {success && (
        <div className="rounded-2xl border border-green-200 bg-green-50 p-4 text-green-700 text-sm font-semibold">
          {success}
        </div>
      )}

      {!error && (
        <div className="grid gap-6 md:grid-cols-3">
          {/* Diagnostic Reports */}
          <div className="space-y-6 md:col-span-2">
            <div className="rounded-3xl border border-outline-variant bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
                <FileHeart size={18} className="text-primary" /> Patient Reports File
              </h2>
              {reports.length === 0 ? (
                <p className="text-slate-500 text-center py-6">No diagnostic reports uploaded yet.</p>
              ) : (
                <div className="divide-y divide-outline-variant">
                  {reports.map((r) => (
                    <div key={r.id} className="flex items-center justify-between py-4">
                      <div>
                        <h4 className="font-semibold text-slate-800">{r.info}</h4>
                        <p className="text-xs text-slate-400">
                          Uploaded On: {formatDisplayDate(r.dateTime)} | Conclusion: {r.conclusion}
                        </p>
                      </div>
                      <AppButton
                        onClick={() => handleDownloadReport(r.id, r.fileName)}
                        variant="secondary"
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-xl"
                      >
                        <Download size={14} /> Download
                      </AppButton>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Medical Prescriptions History */}
            <div className="rounded-3xl border border-outline-variant bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
                <Clipboard size={18} className="text-primary" /> Consultation Prescriptions
              </h2>
              {records.length === 0 ? (
                <p className="text-slate-500 text-center py-6">No prescriptions found.</p>
              ) : (
                <div className="space-y-4">
                  {records.map((rec) => (
                    <div key={rec.id} className="p-4 rounded-2xl border border-outline-variant bg-slate-50">
                      <div className="flex justify-between items-start border-b border-slate-100 pb-2">
                        <span className="text-xs text-slate-400">Prescribed On: {formatDisplayDate(rec.prescribedOn)}</span>
                      </div>
                      <div className="mt-3 space-y-2">
                        {rec.details?.map((med: any, idx: number) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span className="font-semibold text-slate-800">{med.medicineName}</span>
                            <span className="text-slate-500">{med.dosageMg}mg | {med.shift} | {med.tenure} days</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Allergies list */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-outline-variant bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
                <AlertTriangle size={18} className="text-amber-500" /> Patient Allergies
              </h2>
              {allergies.length === 0 ? (
                <p className="text-slate-500 text-center py-6">No allergies registered.</p>
              ) : (
                <div className="space-y-3">
                  {allergies.map((all) => (
                    <div key={all.allergyid} className="p-3.5 rounded-2xl border border-outline-variant bg-amber-50/20 text-sm">
                      <span className="inline-block text-[10px] font-bold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full uppercase">
                        {all.severity}
                      </span>
                      <h4 className="font-bold text-slate-800 mt-1 capitalize">{all.allergyType.toLowerCase()}</h4>
                      <p className="text-xs text-slate-500">Trigger: {all.items} ({all.category})</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Upload Report Modal */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-3xl border border-outline-variant bg-white p-6 shadow-xl animate-in fade-in zoom-in duration-200">
            <h3 className="text-lg font-bold text-slate-800">Upload Diagnostic Report</h3>
            <p className="text-xs text-slate-400 mt-1">Select a lab result file and fill in diagnostic conclusions.</p>

            <form onSubmit={handleReportSubmit} className="space-y-4 mt-4">
              <AppInput
                label="Report Information"
                placeholder="e.g. Complete Blood Count, Chest X-Ray"
                value={reportForm.info}
                onChange={(e) => setReportForm({ ...reportForm, info: e.target.value })}
                required
              />

              <AppInput
                label="Description"
                placeholder="Brief description of findings"
                value={reportForm.desc}
                onChange={(e) => setReportForm({ ...reportForm, desc: e.target.value })}
              />

              <AppInput
                label="Conclusion"
                placeholder="e.g. Normal, High cholesterol"
                value={reportForm.conclusion}
                onChange={(e) => setReportForm({ ...reportForm, conclusion: e.target.value })}
              />

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Choose File</label>
                <input
                  type="file"
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files && files[0]) {
                      setReportForm({ ...reportForm, file: files[0] });
                    }
                  }}
                  className="w-full rounded-xl border border-outline-variant p-3 text-sm"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <AppButton variant="secondary" onClick={() => setIsReportModalOpen(false)}>
                  Cancel
                </AppButton>
                <AppButton type="submit" loading={reportSubmitting}>
                  Upload Report
                </AppButton>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Prescribe Medication Modal */}
      {isPrescriptionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
          <div className="w-full max-w-2xl rounded-3xl border border-outline-variant bg-white p-6 shadow-xl animate-in fade-in zoom-in duration-200 my-8">
            <h3 className="text-lg font-bold text-slate-800">Prescribe Medication & Diet</h3>
            <p className="text-xs text-slate-400 mt-1">Configure drug intake details and matching diet guidelines.</p>

            <form onSubmit={handlePrescriptionSubmit} className="space-y-6 mt-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-bold text-slate-700">Medicines</h4>
                  <AppButton
                    type="button"
                    onClick={addMedicineRow}
                    className="text-xs py-1.5 px-3 rounded-xl border border-outline-variant"
                    variant="secondary"
                  >
                    + Add Medicine
                  </AppButton>
                </div>

                {medicinesList.map((m, idx) => (
                  <div key={idx} className="p-4 rounded-2xl border border-outline-variant bg-slate-50 space-y-4 relative">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-primary">Medicine #{idx + 1}</span>
                      {medicinesList.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeMedicineRow(idx)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash size={16} />
                        </button>
                      )}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                      <AppInput
                        label="Medicine Name"
                        value={m.medicineName}
                        onChange={(e) => handleMedicineChange(idx, "medicineName", e.target.value)}
                        required
                      />
                      <AppInput
                        label="Dosage (mg)"
                        type="number"
                        value={String(m.dosageMg)}
                        onChange={(e) => handleMedicineChange(idx, "dosageMg", Number(e.target.value))}
                        required
                      />
                      <AppSelect
                        label="Shift"
                        value={m.shift}
                        onChange={(e) => handleMedicineChange(idx, "shift", e.target.value)}
                        options={shifts}
                        required
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <AppInput
                        label="Tenure (days)"
                        type="number"
                        value={String(m.tenure)}
                        onChange={(e) => handleMedicineChange(idx, "tenure", Number(e.target.value))}
                        required
                      />
                      <AppInput
                        label="Expiration Date"
                        type="date"
                        value={m.expire}
                        onChange={(e) => handleMedicineChange(idx, "expire", e.target.value)}
                        required
                      />
                    </div>

                    <AppInput
                      label="Doctor Notes / Directions"
                      value={m.notes}
                      onChange={(e) => handleMedicineChange(idx, "notes", e.target.value)}
                    />
                  </div>
                ))}
              </div>

              {/* Diet chart */}
              <div className="space-y-4 border-t border-slate-100 pt-4">
                <h4 className="text-sm font-bold text-slate-700">Prescribe Diet Chart (Optional)</h4>
                <div className="grid gap-4 sm:grid-cols-2">
                  <AppInput
                    label="Name of Diet (e.g. Sugar-free, Keto)"
                    value={dietForm.name_of_diet}
                    onChange={(e) => setDietForm({ ...dietForm, name_of_diet: e.target.value })}
                  />
                  <AppInput
                    label="Diet Description / Guidelines"
                    value={dietForm.food_description}
                    onChange={(e) => setDietForm({ ...dietForm, food_description: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
                <AppButton variant="secondary" onClick={() => setIsPrescriptionModalOpen(false)}>
                  Cancel
                </AppButton>
                <AppButton type="submit" loading={prescSubmitting}>
                  Prescribe Now
                </AppButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorMedicalRecords;
