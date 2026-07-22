import { useCallback, useEffect, useState } from "react";

// @ts-ignore: module may be resolved differently in the project setup
import { medicalRecordsService } from "../services/medicalRecords.service";

import type {
  DashboardSummary,
  QuickAction,
} from "../types";

export function useMedicalDashboard() {
  const [dashboard, setDashboard] = useState<DashboardSummary | null>(null);
  const [quickActions, setQuickActions] = useState<QuickAction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [dashboardData, actions] = await Promise.all([
        medicalRecordsService.getDashboardSummary(),
        medicalRecordsService.getQuickActions(),
      ]);

      setDashboard(dashboardData);
      setQuickActions(actions);
    } catch (error) {
      console.error(error);
      setError("Failed to load dashboard.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  return {
    dashboard,
    quickActions,
    loading,
    error,
    refresh: loadDashboard,
  };
}