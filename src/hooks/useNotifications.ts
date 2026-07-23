import { useCallback, useEffect, useState } from "react";

import { useAuthStore } from "@/store/authStore";
import {
  notificationService,
  type AppNotification,
} from "@/services/notification.service";
import { realtime } from "@/services/realtime.service";

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

  // Live pushes: new notifications and read-state changes from other tabs.
  useEffect(
    () =>
      realtime.on("notifications", (data) => {
        const incoming = data as AppNotification;
        setNotifications((prev) =>
          prev.some((n) => n.id === incoming.id)
            ? prev.map((n) => (n.id === incoming.id ? incoming : n))
            : [incoming, ...prev]
        );
      }),
    []
  );

  const sendMarkAsRead = async (id: number) => {
    if (!realtime.publish("notifications/read", { id })) {
      await notificationService.markAsRead(id);
    }
  };

  const markAsRead = async (id: number) => {
    try {
      await sendMarkAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, readStatus: true } : n))
      );
    } catch {
      /* ignore */
    }
  };

  const markAllAsRead = async () => {
    const unread = notifications.filter((n) => !n.readStatus);
    await Promise.allSettled(unread.map((n) => sendMarkAsRead(n.id)));
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
