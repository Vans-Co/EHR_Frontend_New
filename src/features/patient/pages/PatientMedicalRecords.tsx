import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import {
  getMedicalRecords,
  getPatientAllergies,
  createAllergy,
  updateAllergy,
  deleteAllergy,
  getReportsByPatient,
  downloadReportFile,
  getReportAccessRequestsForPatient,
  approveReportAccess,
  rejectReportAccess,
  getActiveMedications,
  getMedicationHistory,
  getDietInstructionsByPatient,
} from "../services/patientApi";
import { getAllDoctors } from "../../admin/services/adminApi";
import AppButton from "@/components/common/AppButton";
import AppInput from "@/components/common/AppInput";
import AppSelect from "@/components/common/AppSelect";
import { formatDisplayDate } from "@/lib/dateUtils";
import { FileHeart, Plus, Download, AlertTriangle, ShieldCheck, Clipboard, FileText } from "lucide-react";

interface Allergy {
  allergyid: number;
  category: string;
  items: string;
  allergyType: "DRUG" | "FOOD" | "ENVIRONMENTAL" | "INSECT" | "LATEX" | "OTHER";
  severity: "MILD" | "MODERATE" | "SEVERE" | "LIFE_THREATENING";
  description: string;
}

interface Report {
  id: number;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  dateTime: string;
  info: string;
  desc: string;
  conclusion: string;
  fileName: string;
  fileType: string;
}

interface AccessRequest {
  id: number;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  requestedAt: string;
  respondedAt: string | null;
}

const PatientMedicalRecords = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<"records" | "medications" | "allergies">("records");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Data states
  const [records, setRecords] = useState<any[]>([]);
  const [allergies, setAllergies] = useState<Allergy[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [accessRequests, setAccessRequests] = useState<AccessRequest[]>([]);
  const [activeMeds, setActiveMeds] = useState<any[]>([]);
  const [pastMeds, setPastMeds] = useState<any[]>([]);
  const [dietInstructions, setDietInstructions] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);

  // Allergy Modal
  const [isAllergyModalOpen, setIsAllergyModalOpen] = useState(false);
  const [allergySubmitting, setAllergySubmitting] = useState(false);
  const [editingAllergy, setEditingAllergy] = useState<Allergy | null>(null);
  const [allergyForm, setAllergyForm] = useState({
    category: "",
    items: "",
    allergyType: "DRUG",
    severity: "MILD",
    description: "",
  });

  const allergyTypes = [
    { label: "Drug", value: "DRUG" },
    { label: "Food", value: "FOOD" },
    { label: "Environmental", value: "ENVIRONMENTAL" },
    { label: "Insect", value: "INSECT" },
    { label: "Latex", value: "LATEX" },
    { label: "Other", value: "OTHER" },
  ];

  const severityLevels = [
    { label: "Mild", value: "MILD" },
    { label: "Moderate", value: "MODERATE" },
    { label: "Severe", value: "SEVERE" },
    { label: "Life Threatening", value: "LIFE_THREATENING" },
  ];

  useEffect(() => {
    if (user?.ehrId) {
      loadData();
    }
  }, [user?.ehrId, activeTab]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const docs = await getAllDoctors();
      setDoctors(docs);

      if (activeTab === "records") {
        const recordsData = await getMedicalRecords(String(user?.ehrId));
        const reportsData = await getReportsByPatient(String(user?.ehrId));
        const reqs = await getReportAccessRequestsForPatient(String(user?.ehrId));

        setRecords(recordsData.content || []);
        setReports(reportsData);
        setAccessRequests(reqs);
      } else if (activeTab === "medications") {
        const active = await getActiveMedications(String(user?.ehrId));
        const past = await getMedicationHistory(String(user?.ehrId));
        const diets = await getDietInstructionsByPatient(String(user?.ehrId));

        setActiveMeds(active.content || []);
        setPastMeds(past.content || []);
        setDietInstructions(diets);
      } else if (activeTab === "allergies") {
        const list = await getPatientAllergies(String(user?.ehrId));
        setAllergies(list);
      }
    } catch (err) {
      setError("Failed to fetch medical record data.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (reportId: number, fileName: string) => {
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

  const handleApproveAccess = async (requestId: number) => {
    try {
      await approveReportAccess(requestId);
      setSuccess("Access approved successfully.");
      loadData();
    } catch (err) {
      setError("Failed to approve access.");
    }
  };

  const handleRejectAccess = async (requestId: number) => {
    try {
      await rejectReportAccess(requestId);
      setSuccess("Access request rejected.");
      loadData();
    } catch (err) {
      setError("Failed to reject access.");
    }
  };

  // Allergy Operations
  const handleOpenAddAllergy = () => {
    setEditingAllergy(null);
    setAllergyForm({
      category: "",
      items: "",
      allergyType: "DRUG",
      severity: "MILD",
      description: "",
    });
    setIsAllergyModalOpen(true);
  };

  const handleOpenEditAllergy = (a: Allergy) => {
    setEditingAllergy(a);
    setAllergyForm({
      category: a.category,
      items: a.items,
      allergyType: a.allergyType,
      severity: a.severity,
      description: a.description,
    });
    setIsAllergyModalOpen(true);
  };

  const handleAllergySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setAllergySubmitting(true);
      setError("");
      setSuccess("");
      if (editingAllergy) {
        await updateAllergy(String(user?.ehrId), allergyForm);
        setSuccess("Allergy updated successfully!");
      } else {
        await createAllergy(String(user?.ehrId), allergyForm);
        setSuccess("Allergy registered successfully!");
      }
      setIsAllergyModalOpen(false);
      loadData();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to save allergy.");
    } finally {
      setAllergySubmitting(false);
    }
  };

  const handleDeleteAllergy = async (allergyId: number) => {
    if (!window.confirm("Are you sure you want to delete this allergy?")) return;
    try {
      setError("");
      setSuccess("");
      await deleteAllergy(String(user?.ehrId), allergyId);
      setSuccess("Allergy deleted successfully!");
      loadData();
    } catch (err) {
      setError("Failed to delete allergy.");
    }
  };

  const getDoctorName = (docId: string) => {
    const doc = doctors.find((d) => d.id === docId);
    if (doc?.user) {
      return `Dr. ${doc.user.firstName} ${doc.user.lastName}`;
    }
    return docId;
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Medical Records</h1>
        <p className="text-sm text-slate-500">View diagnostic reports, ongoing therapies, and record restrictions.</p>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-600 text-sm font-semibold">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-2xl border border-green-200 bg-green-50 p-4 text-green-700 text-sm font-semibold">
          {success}
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-outline-variant gap-4">
        {(["records", "medications", "allergies"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-bold capitalize transition-all ${
              activeTab === tab ? "border-b-2 border-primary text-primary" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "records" && (
        <div className="grid gap-6 md:grid-cols-3">
          {/* Main Records List */}
          <div className="space-y-6 md:col-span-2">
            <div className="rounded-3xl border border-outline-variant bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
                <FileHeart size={18} className="text-primary" /> Diagnostic Reports & Files
              </h2>
              {reports.length === 0 ? (
                <p className="text-slate-500 text-center py-6">No diagnostic reports uploaded yet.</p>
              ) : (
                <div className="divide-y divide-outline-variant">
                  {reports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between py-4">
                      <div>
                        <h4 className="font-semibold text-slate-800">{report.info}</h4>
                        <p className="text-xs text-slate-400">
                          By: {report.doctorName || getDoctorName(report.doctorId)} | {formatDisplayDate(report.dateTime)}
                        </p>
                        {report.conclusion && (
                          <p className="mt-1 text-sm text-slate-600">Conclusion: {report.conclusion}</p>
                        )}
                      </div>
                      <AppButton
                        onClick={() => handleDownload(report.id, report.fileName)}
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
          </div>

          {/* Access Requests */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-outline-variant bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
                <ShieldCheck size={18} className="text-primary" /> Report Access Requests
              </h2>
              {accessRequests.length === 0 ? (
                <p className="text-slate-500 text-center py-6">No pending access requests.</p>
              ) : (
                <div className="space-y-4">
                  {accessRequests.map((req) => (
                    <div key={req.id} className="p-4 rounded-2xl border border-outline-variant bg-slate-50 space-y-3">
                      <div>
                        <h4 className="font-semibold text-slate-800">
                          {req.doctorName || getDoctorName(req.doctorId)}
                        </h4>
                        <p className="text-xs text-slate-500">Requested access to view your medical files.</p>
                      </div>
                      {req.status === "PENDING" ? (
                        <div className="flex gap-2">
                          <AppButton
                            onClick={() => handleApproveAccess(req.id)}
                            className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1.5 rounded-xl w-full"
                          >
                            Approve
                          </AppButton>
                          <AppButton
                            onClick={() => handleRejectAccess(req.id)}
                            className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1.5 rounded-xl w-full"
                          >
                            Reject
                          </AppButton>
                        </div>
                      ) : (
                        <span className="text-xs font-bold capitalize text-slate-500">{req.status}</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === "medications" && (
        <div className="grid gap-6 md:grid-cols-3">
          {/* Ongoing and Past Meds */}
          <div className="space-y-6 md:col-span-2">
            {/* Active */}
            <div className="rounded-3xl border border-outline-variant bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
                <Clipboard size={18} className="text-primary" /> Ongoing Medications
              </h2>
              {activeMeds.length === 0 ? (
                <p className="text-slate-500 text-center py-6">No active medications prescribed.</p>
              ) : (
                <div className="space-y-4">
                  {activeMeds.map((medRecord) => (
                    <div key={medRecord.id} className="p-4 rounded-2xl border border-outline-variant bg-blue-50/50">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-xs text-slate-400">Prescribed On: {formatDisplayDate(medRecord.prescribedOn)}</p>
                          <p className="text-xs font-bold text-primary">Doctor: {getDoctorName(medRecord.prescribedBy?.id)}</p>
                        </div>
                      </div>
                      <div className="mt-3 space-y-2">
                        {medRecord.details?.map((det: any, idx: number) => (
                          <div key={idx} className="flex justify-between border-t border-slate-100 pt-2 text-sm">
                            <span className="font-semibold text-slate-800">{det.medicineName}</span>
                            <span className="text-slate-600">{det.dosageMg}mg | {det.shift} | {det.tenure} days</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* History */}
            <div className="rounded-3xl border border-outline-variant bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
                <FileText size={18} className="text-slate-600" /> Past Medications
              </h2>
              {pastMeds.length === 0 ? (
                <p className="text-slate-500 text-center py-6">No medication history records.</p>
              ) : (
                <div className="space-y-4">
                  {pastMeds.map((medRecord) => (
                    <div key={medRecord.id} className="p-4 rounded-2xl border border-outline-variant">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-xs text-slate-400">Prescribed On: {formatDisplayDate(medRecord.prescribedOn)}</p>
                          <p className="text-xs font-semibold text-slate-600">Doctor: {getDoctorName(medRecord.prescribedBy?.id)}</p>
                        </div>
                      </div>
                      <div className="mt-3 space-y-2">
                        {medRecord.details?.map((det: any, idx: number) => (
                          <div key={idx} className="flex justify-between border-t border-slate-100 pt-2 text-sm text-slate-500">
                            <span>{det.medicineName}</span>
                            <span>{det.dosageMg}mg | {det.shift} | {det.tenure} days</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Diet Instructions */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-outline-variant bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
                <Clipboard size={18} className="text-primary" /> Prescribed Diet guidelines
              </h2>
              {dietInstructions.length === 0 ? (
                <p className="text-slate-500 text-center py-6">No diet charts prescribed.</p>
              ) : (
                <div className="space-y-4">
                  {dietInstructions.map((diet) => (
                    <div key={diet.id} className="p-4 rounded-2xl border border-outline-variant bg-slate-50">
                      <h4 className="font-semibold text-slate-800">{diet.name_of_diet}</h4>
                      <p className="mt-1 text-sm text-slate-600">{diet.food_description}</p>
                      <p className="mt-2 text-xs text-slate-400">
                        Prescribed By: {getDoctorName(diet.prescribeBy?.id)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === "allergies" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <AlertTriangle size={18} className="text-amber-500" /> Allergy Registry
            </h2>
            <AppButton onClick={handleOpenAddAllergy} className="flex items-center gap-1.5 text-xs py-2 px-3 rounded-xl">
              <Plus size={14} /> Add Allergy
            </AppButton>
          </div>

          {allergies.length === 0 ? (
            <div className="rounded-3xl border border-outline-variant bg-white p-8 text-center text-slate-500">
              No allergies registered. Click "Add Allergy" if you have any drug or food sensitivities.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {allergies.map((all) => (
                <div key={all.allergyid} className="rounded-3xl border border-outline-variant bg-white p-5 shadow-sm space-y-4 relative">
                  <div>
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-xs font-bold border ${
                        all.severity === "LIFE_THREATENING"
                          ? "bg-red-50 text-red-700 border-red-200"
                          : all.severity === "SEVERE"
                          ? "bg-orange-50 text-orange-700 border-orange-200"
                          : all.severity === "MODERATE"
                          ? "bg-amber-50 text-amber-700 border-amber-200"
                          : "bg-slate-50 text-slate-700 border-slate-200"
                      }`}
                    >
                      {all.severity.replace("_", " ")}
                    </span>
                    <h3 className="mt-2 text-lg font-bold text-slate-800 capitalize">
                      {all.allergyType.toLowerCase()} Allergy
                    </h3>
                    <p className="text-sm text-slate-500">Category: {all.category}</p>
                    <p className="text-sm text-slate-600 font-semibold mt-1">Symptom Items: {all.items}</p>
                    {all.description && (
                      <p className="text-xs text-slate-500 mt-2 italic bg-slate-50 p-2 rounded-xl border border-slate-100">
                        {all.description}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <AppButton
                      variant="secondary"
                      onClick={() => handleOpenEditAllergy(all)}
                      className="text-xs py-1.5 w-full rounded-xl"
                    >
                      Edit
                    </AppButton>
                    <AppButton
                      onClick={() => handleDeleteAllergy(all.allergyid)}
                      className="bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 text-xs py-1.5 w-full rounded-xl"
                    >
                      Delete
                    </AppButton>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Allergy Modal */}
      {isAllergyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-3xl border border-outline-variant bg-white p-6 shadow-xl animate-in fade-in zoom-in duration-200">
            <h3 className="text-lg font-bold text-slate-800">
              {editingAllergy ? "Edit Allergy Record" : "Add Allergy Record"}
            </h3>
            <p className="text-xs text-slate-400 mt-1">Enter your drug, food, or chemical sensitivities.</p>

            <form onSubmit={handleAllergySubmit} className="space-y-4 mt-4">
              <AppSelect
                label="Allergy Type"
                value={allergyForm.allergyType}
                onChange={(e) => setAllergyForm({ ...allergyForm, allergyType: e.target.value })}
                options={allergyTypes}
                required
              />

              <AppSelect
                label="Severity"
                value={allergyForm.severity}
                onChange={(e) => setAllergyForm({ ...allergyForm, severity: e.target.value })}
                options={severityLevels}
                required
              />

              <AppInput
                label="Allergy Category (e.g. Antibiotics, Dairy)"
                value={allergyForm.category}
                onChange={(e) => setAllergyForm({ ...allergyForm, category: e.target.value })}
                required
              />

              <AppInput
                label="Reactive Items / Trigger (e.g. Penicillin, Lactose)"
                value={allergyForm.items}
                onChange={(e) => setAllergyForm({ ...allergyForm, items: e.target.value })}
                required
              />

              <AppInput
                label="Description of reaction / Notes"
                value={allergyForm.description}
                onChange={(e) => setAllergyForm({ ...allergyForm, description: e.target.value })}
              />

              <div className="flex justify-end gap-3 pt-4">
                <AppButton variant="secondary" onClick={() => setIsAllergyModalOpen(false)}>
                  Cancel
                </AppButton>
                <AppButton type="submit" loading={allergySubmitting}>
                  Save Allergy
                </AppButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientMedicalRecords;
