import { useCallback, useEffect, useState } from "react";

import { medicalRecordsService } from "../services/medicalRecords.service";

import type { PatientUpload } from "../types";

export function usePatientUploads() {
  const [uploads, setUploads] = useState<PatientUpload[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUploads = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await medicalRecordsService.getPatientUploads();

      setUploads(data);
    } catch (error) {
      console.error(error);
      setError("Failed to load patient uploads.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUploads();
  }, [loadUploads]);

  return {
    uploads,
    loading,
    error,
    refresh: loadUploads,
  };
}