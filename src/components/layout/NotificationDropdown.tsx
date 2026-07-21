import { Bell, CheckCheck, Loader2 } from "lucide-react";

import type { AppNotification } from "@/services/notification.service";

interface NotificationDropdownProps {
  notifications: AppNotification[];
  unreadCount: number;
  loading?: boolean;
  onMarkAsRead: (id: number) => void;
  onMarkAllAsRead: () => void;
}

/** "2026-07-21T14:05:00" -> "21 Jul, 2:05 PM" */
const formatTime = (iso: string) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const NotificationDropdown = ({
  notifications,
  unreadCount,
  loading = false,
  onMarkAsRead,
  onMarkAllAsRead,
}: NotificationDropdownProps) => {

  return (

    <div
      className="
        absolute
        right-0
        top-14
        z-50
        w-[390px]
        overflow-hidden
        rounded-3xl
        border
        border-outline-variant
        bg-background/95
        backdrop-blur-xl
        shadow-[0_20px_60px_rgba(15,23,42,0.18)]
        animate-in
        fade-in
        zoom-in-95
        duration-200
      "
    >

      {/* Header */}

      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-outline-variant
          px-6
          py-5
        "
      >

        <div className="flex items-center gap-4">

          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-2xl
              bg-primary/10
            "
          >

            <Bell
              size={20}
              className="text-primary"
            />

          </div>

          <div>

            <h3 className="text-lg font-bold text-on-background">
              Notifications
            </h3>

            <p className="text-xs text-on-surface-variant">
              Recent activity from your account
            </p>

          </div>

        </div>

        <span
          className="
            rounded-full
            bg-primary
            px-3
            py-1
            text-xs
            font-semibold
            text-white
          "
        >
          {unreadCount}
        </span>

      </div>

      {/* Notification List */}

      <div className="max-h-[430px] overflow-y-auto">

        {loading && notifications.length === 0 && (
          <div className="flex items-center justify-center gap-2 px-6 py-8 text-sm text-on-surface-variant">
            <Loader2 size={16} className="animate-spin" />
            Loading...
          </div>
        )}

        {!loading && notifications.length === 0 && (
          <div className="px-6 py-8 text-center text-sm text-on-surface-variant">
            No notifications yet.
          </div>
        )}

        {notifications.map((notification) => (

          <button
            key={notification.id}
            type="button"
            onClick={() => {
              if (!notification.readStatus) {
                onMarkAsRead(notification.id);
              }
            }}
            className={`
              group
              flex
              w-full
              items-start
              gap-4
              border-b
              border-outline-variant
              px-6
              py-5
              text-left
              transition-all
              duration-300
              hover:bg-primary/5
              ${notification.readStatus ? "opacity-60" : ""}
            `}
          >

            {/* Unread dot */}

            <div
              className={`
                mt-2
                h-2.5
                w-2.5
                shrink-0
                rounded-full
                ${notification.readStatus ? "bg-transparent" : "bg-primary"}
              `}
            />

            {/* Content */}

            <div className="min-w-0 flex-1">

              <div className="flex items-center justify-between gap-3">

                <p
                  className="
                    text-sm
                    leading-6
                    text-on-background
                  "
                >
                  {notification.message}
                </p>

              </div>

              <span
                className="
                  mt-2
                  inline-block
                  rounded-full
                  bg-surface-container
                  px-2
                  py-1
                  text-[11px]
                  font-medium
                  text-on-surface-variant
                "
              >
                {formatTime(notification.timestamp)}
              </span>

            </div>

          </button>

        ))}

      </div>

      {/* Footer */}

      <div
        className="
          flex
          items-center
          justify-end
          border-t
          border-outline-variant
          bg-surface-container-low
          px-5
          py-4
        "
      >

        <button
          type="button"
          onClick={onMarkAllAsRead}
          disabled={unreadCount === 0}
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            px-4
            py-2
            text-sm
            font-semibold
            text-primary
            transition-all
            duration-200
            hover:bg-primary/10
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          <CheckCheck size={16} />
          Mark all as read
        </button>

      </div>

    </div>

  );

};

export default NotificationDropdown;
