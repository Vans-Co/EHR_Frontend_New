import { useCallback, useEffect, useState } from "react";

import { useAuthStore } from "@/store/authStore";
import {
  notificationService,
  type AppNotification,
} from "@/services/notification.service";

const useNotifications = () => {
  const user = useAuthStore((state) => state.user);

  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!user?.ehrId) return;
    setLoading(true);
    try {
      setNotifications(await notificationService.getNotifications(user.ehrId));
    } catch {
      // keep whatever we had; the bell just won't update
    } finally {
      setLoading(false);
    }
  }, [user?.ehrId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const markAsRead = async (id: number) => {
    try {
      await notificationService.markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, readStatus: true } : n))
      );
    } catch {
      /* ignore */
    }
  };

  const markAllAsRead = async () => {
    const unread = notifications.filter((n) => !n.readStatus);
    await Promise.allSettled(
      unread.map((n) => notificationService.markAsRead(n.id))
    );
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, readStatus: true }))
    );
  };

  const unreadCount = notifications.filter((n) => !n.readStatus).length;

  return {
    notifications,
    unreadCount,
    loading,
    refresh,
    markAsRead,
    markAllAsRead,
  };
};

export default useNotifications;
