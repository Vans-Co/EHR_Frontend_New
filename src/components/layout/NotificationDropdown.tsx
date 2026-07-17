import { Bell } from "lucide-react";

import { notificationItems } from "./config/notificationItems";

const NotificationDropdown = () => {

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

      {/* ========================= */}
      {/* Header */}
      {/* ========================= */}

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
          {notificationItems.length}
        </span>

      </div>

      {/* ========================= */}
      {/* Notification List */}
      {/* ========================= */}

      <div className="max-h-[430px] overflow-y-auto">
                {notificationItems.map((notification) => {

          const Icon = notification.icon;

          return (

            <button
              key={notification.id}
              type="button"
              className="
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
              "
            >

              {/* Icon */}

              <div
                className="
                  mt-1
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  bg-primary/10
                  transition-all
                  duration-300
                  group-hover:bg-primary
                "
              >

                <Icon
                  size={19}
                  className="
                    text-primary
                    transition-colors
                    duration-300
                    group-hover:text-white
                  "
                />

              </div>

              {/* Content */}

              <div className="min-w-0 flex-1">

                <div className="flex items-center justify-between gap-3">

                  <h4
                    className="
                      truncate
                      font-semibold
                      text-on-background
                    "
                  >
                    {notification.title}
                  </h4>

                  <span
                    className="
                      shrink-0
                      rounded-full
                      bg-surface-container
                      px-2
                      py-1
                      text-[11px]
                      font-medium
                      text-on-surface-variant
                    "
                  >
                    {notification.time}
                  </span>

                </div>

                <p
                  className="
                    mt-2
                    text-sm
                    leading-6
                    text-on-surface-variant
                  "
                >
                  {notification.description}
                </p>

              </div>

            </button>

          );

        })}
              </div>

      {/* ========================= */}
      {/* Footer */}
      {/* ========================= */}

      <div
        className="
          flex
          items-center
          justify-between
          border-t
          border-outline-variant
          bg-surface-container-low
          px-5
          py-4
        "
      >

        <button
          type="button"
          className="
            rounded-xl
            px-4
            py-2
            text-sm
            font-semibold
            text-primary
            transition-all
            duration-200
            hover:bg-primary/10
          "
        >
          Mark all as read
        </button>

        <button
          type="button"
          className="
            rounded-xl
            bg-primary
            px-5
            py-2
            text-sm
            font-semibold
            text-white
            shadow-md
            transition-all
            duration-200
            hover:scale-105
            hover:shadow-lg
          "
        >
          View All
        </button>

      </div>

    </div>

  );

};

export default NotificationDropdown;

/*
==========================================================
Future API Integration
==========================================================

GET    /notifications
PATCH  /notifications/read
PATCH  /notifications/read-all

React Query Hook:
useNotifications()

Service:
notification.service.ts

Future Improvements:

✓ Real-time notifications using WebSocket
✓ Read / Unread indicator
✓ Filter by category
✓ Infinite scrolling
✓ Mark individual notification as read
✓ Notification preferences
*/