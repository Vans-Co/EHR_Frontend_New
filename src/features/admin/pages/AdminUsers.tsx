import { useState } from "react";
import { searchPatients } from "../../doctor/services/doctorApi";
import { deleteUser } from "../services/adminApi";
import AppButton from "@/components/common/AppButton";
import AppInput from "@/components/common/AppInput";
import { Search, User, Trash2 } from "lucide-react";

interface Patient {
  ehrId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: number;
  dob: string;
  gender: string;
}

const AdminUsers = () => {
  const [query, setQuery] = useState("");
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    try {
      setLoading(true);
      setError("");
      setSuccess("");
      const list = await searchPatients(query);
      setPatients(list);
    } catch (err) {
      setError("Failed to search patients.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this user?")) return;
    try {
      setError("");
      setSuccess("");
      await deleteUser(id);
      setSuccess(`User ID ${id} deleted successfully.`);
      // refresh
      const list = await searchPatients(query || "a");
      setPatients(list);
    } catch (err) {
      setError("Failed to delete user.");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">User Accounts Directory</h1>
        <p className="text-sm text-slate-500">Query and manage registered patient files.</p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-3 max-w-xl">
        <AppInput
          placeholder="Search patients by name, email, or EHR ID..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          leftIcon={<Search size={18} />}
          className="flex-1"
        />
        <AppButton type="submit" loading={loading} className="px-6 h-14 rounded-2xl">
          Search Directory
        </AppButton>
      </form>

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

      <div className="rounded-3xl border border-outline-variant bg-white shadow-sm overflow-hidden">
        {patients.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            {query ? "No patients found matching your query." : "Search directory above."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-outline-variant text-sm font-semibold text-slate-700">
                  <th className="p-4">EHR ID</th>
                  <th className="p-4">Full Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">DOB</th>
                  <th className="p-4">Gender</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant text-sm text-slate-600">
                {patients.map((pat) => (
                  <tr key={pat.ehrId} className="hover:bg-slate-55 transition">
                    <td className="p-4 font-semibold text-slate-800">{pat.ehrId}</td>
                    <td className="p-4 flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-primary">
                        <User size={14} />
                      </div>
                      {pat.firstName} {pat.lastName}
                    </td>
                    <td className="p-4">{pat.email}</td>
                    <td className="p-4">+91 {pat.phoneNo}</td>
                    <td className="p-4">{pat.dob}</td>
                    <td className="p-4">{pat.gender}</td>
                    <td className="p-4 text-right">
                      <AppButton
                        onClick={() => handleDeleteUser(pat.ehrId)}
                        className="bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 text-xs px-3 py-1.5 rounded-xl"
                      >
                        Delete User
                      </AppButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
