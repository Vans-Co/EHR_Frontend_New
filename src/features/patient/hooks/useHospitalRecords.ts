import { useCallback, useEffect, useState } from "react";

// Avoid importing a missing service module here; fetch records directly.

import type { HospitalRecord } from "../types";

export function useHospitalRecords() {
  const [records, setRecords] = useState<HospitalRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRecords = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch hospital records from the API as a fallback to the missing service module.
      const res = await fetch('/api/hospital-records');
      if (!res.ok) throw new Error(`Fetch error: ${res.status}`);
      const data: HospitalRecord[] = await res.json();
      setRecords(data || []);
    } catch (error) {
      console.error(error);
      setError("Failed to load hospital records.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRecords();
  }, [loadRecords]);

  return {
    records,
    loading,
    error,
    refresh: loadRecords,
  };
}