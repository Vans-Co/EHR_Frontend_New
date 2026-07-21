import api from "@/config/axios";

export interface AppNotification {
  id: number;
  message: string;
  timestamp: string; // ISO LocalDateTime
  readStatus: boolean;
}

export const notificationService = {
  async getNotifications(ehrId: string): Promise<AppNotification[]> {
    const { data } = await api.get(`/notifications/patient/${ehrId}`);
    return Array.isArray(data) ? data : [];
  },

  markAsRead(id: number) {
    return api.put(`/notifications/${id}/read`);
  },
};
