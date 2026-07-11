import { useEffect, useState } from "react";
import {
  Upload,
  X,
  FileText,
  Image as ImageIcon,
  RefreshCw,
  Trash2,
} from "lucide-react";

type UploadRecordModalProps = {
  open: boolean;
  onClose: () => void;
  onUpload: (data: {
    title: string;
    doctor: string;
    hospital: string;
    department: string;
    reportType: string;
    date: string;
    description: string;
    file: File | null;
  }) => void;
};

const UploadRecordModal = ({
  open,
  onClose,
  onUpload,
}: UploadRecordModalProps) => {
  const [form, setForm] = useState({
    title: "",
    doctor: "",
    hospital: "",
    department: "",
    reportType: "",
    date: "",
    description: "",
  });

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [previewUrl, setPreviewUrl] =
    useState("");

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement |
      HTMLTextAreaElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (
    file: File | null
  ) => {
    if (!file) return;

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setSelectedFile(file);

    setPreviewUrl(
      URL.createObjectURL(file)
    );
  };

  const handleRemove = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setSelectedFile(null);
    setPreviewUrl("");
  };

  const resetForm = () => {
    setForm({
      title: "",
      doctor: "",
      hospital: "",
      department: "",
      reportType: "",
      date: "",
      description: "",
    });

    handleRemove();
  };

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    onUpload({
      ...form,
      file: selectedFile,
    });

    resetForm();

    onClose();
  };
    return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">

      <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* Header */}

        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-8 py-5">

          <div>

            <h2 className="text-2xl font-bold text-slate-900">
              Upload Medical Record
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Upload reports, prescriptions and scans securely.
            </p>

          </div>

          <button
            type="button"
            onClick={() => {
              resetForm();
              onClose();
            }}
            className="rounded-lg p-2 transition hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>

        </div>

        {/* Body */}

        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-8"
        >

          <div className="grid gap-6 lg:grid-cols-2">

            {/* Left Side */}

            <div className="space-y-5">

              <div>

                <label className="mb-2 block text-sm font-semibold">
                  Report Title
                </label>

                <input
                  required
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-semibold">
                  Doctor
                </label>

                <input
                  name="doctor"
                  value={form.doctor}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-semibold">
                  Hospital
                </label>

                <input
                  name="hospital"
                  value={form.hospital}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
                />

              </div>

              <div className="grid gap-4 md:grid-cols-2">

                <select
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  className="rounded-xl border border-slate-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
                >
                  <option value="">Department</option>
                  <option>Cardiology</option>
                  <option>Neurology</option>
                  <option>Orthopedic</option>
                  <option>Radiology</option>
                  <option>General</option>
                </select>

                <select
                  name="reportType"
                  value={form.reportType}
                  onChange={handleChange}
                  className="rounded-xl border border-slate-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
                >
                  <option value="">Report Type</option>
                  <option>Blood Test</option>
                  <option>X-Ray</option>
                  <option>MRI</option>
                  <option>CT Scan</option>
                  <option>ECG</option>
                  <option>Prescription</option>
                  <option>Other</option>
                </select>

              </div>

              <div>

                <label className="mb-2 block text-sm font-semibold">
                  Date
                </label>

                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-semibold">
                  Description
                </label>

                <textarea
                  rows={5}
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
                />

              </div>

            </div>

            {/* Right Side */}

            <div>

              <label className="mb-3 block text-sm font-semibold">
                Upload Report
              </label>

              {!selectedFile ? (

                <label className="group flex h-80 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-blue-300 bg-blue-50/40 p-8 shadow-sm transition-all duration-300 hover:border-blue-500 hover:bg-blue-50 hover:shadow-xl hover:shadow-blue-200">

                  <Upload className="mb-5 h-14 w-14 text-blue-600 transition-transform duration-300 group-hover:scale-110" />

                  <h3 className="text-xl font-semibold text-slate-800">
                    Click to Upload
                  </h3>

                  <p className="mt-2 text-center text-sm text-slate-500">
                    PDF, JPG, JPEG or PNG
                  </p>

                  <input
                    hidden
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                      handleFileChange(
                        e.target.files?.[0] ?? null
                      )
                    }
                  />

                </label>

              ) : (

                <div className="rounded-2xl border border-blue-200 bg-blue-50/30 p-5 shadow-md">

                  {selectedFile.type.includes("image") ? (

                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="mb-5 h-72 w-full rounded-xl border object-contain"
                    />

                  ) : (

                    <iframe
                      src={previewUrl}
                      title="PDF Preview"
                      className="mb-5 h-72 w-full rounded-xl border bg-white"
                    />

                  )}

                  <div className="space-y-2">

                    <div className="flex items-center gap-3">

                      {selectedFile.type.includes("pdf") ? (
                        <FileText className="h-8 w-8 text-red-600" />
                      ) : (
                        <ImageIcon className="h-8 w-8 text-blue-600" />
                      )}

                      <div>

                        <p className="font-semibold">
                          {selectedFile.name}
                        </p>

                        <p className="text-sm text-slate-500">
                          {(selectedFile.size / 1024).toFixed(2)} KB
                        </p>

                        <p className="text-xs text-slate-400">
                          {selectedFile.type}
                        </p>

                      </div>

                    </div>

                    <div className="flex gap-3 pt-4">

                      <label className="flex cursor-pointer items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">

                        <RefreshCw className="h-4 w-4" />

                        Replace

                        <input
                          hidden
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) =>
                            handleFileChange(
                              e.target.files?.[0] ?? null
                            )
                          }
                        />

                      </label>

                      <button
                        type="button"
                        onClick={handleRemove}
                        className="flex items-center gap-2 rounded-lg border border-red-300 px-4 py-2 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                        Remove
                      </button>

                    </div>

                  </div>

                </div>

              )}

            </div>

          </div>

          {/* Footer */}

          <div className="mt-8 flex justify-end gap-3 border-t border-slate-200 pt-6">

            <button
              type="button"
              onClick={() => {
                resetForm();
                onClose();
              }}
              className="rounded-xl border border-slate-300 px-6 py-3 font-medium hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white shadow-lg shadow-blue-300 transition hover:bg-blue-700"
            >
              Upload Record
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default UploadRecordModal;