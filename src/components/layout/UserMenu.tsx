import { LogOut } from "lucide-react";

import { patientMenuItems } from "./config/userMenuItems";

import { useNavigate } from "react-router-dom";

import { useAuthStore } from "@/store/authStore";

const UserMenu = () => {

  const navigate = useNavigate();

  const logout = useAuthStore(
    (state) => state.logout
  );

  const authUser = useAuthStore(
  (state) => state.user
);

const user =
  authUser ?? {
    firstName: "Patient",
    lastName: "",
    email: "patient@demo.com",
    role: "PATIENT",
  };

  const handleLogout = () => {

    logout();

    navigate("/login");

  };

  return (

    <div
      className="
        absolute
        right-0
        top-14
        z-50
        w-[340px]
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
      {/* Profile Header */}
      {/* ========================= */}

      <div
        className="
          border-b
          border-outline-variant
          bg-surface-container-low
          p-6
        "
      >

        <div className="flex items-center gap-4">

          {/* Avatar */}

          <div
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              bg-primary
              text-xl
              font-bold
              text-white
              shadow-lg
            "
          >

            {user.firstName.charAt(0)}
            {user.lastName.charAt(0)}

          </div>

          <div className="min-w-0 flex-1">

            <h3
              className="
                truncate
                text-lg
                font-bold
                text-on-background
              "
            >
              {user.firstName} {user.lastName}
            </h3>

            <p
              className="
                mt-1
                text-sm
                text-on-surface-variant
              "
            >
              {user.role}
            </p>

            <p
              className="
                mt-1
                truncate
                text-xs
                text-on-surface-variant
              "
            >
              {user.email}
            </p>

          </div>

        </div>

      </div>

      {/* ========================= */}
      {/* Menu Items */}
      {/* ========================= */}

      <div className="p-3">
                {patientMenuItems.map((item) => {

          const Icon = item.icon;

          return (

            <button
              key={item.label}
              type="button"
              onClick={() =>
                item.path &&
                navigate(item.path)
              }
              className="
                group
                flex
                w-full
                items-center
                gap-4
                rounded-2xl
                px-4
                py-3.5
                text-left
                transition-all
                duration-300
                hover:bg-primary/5
              "
            >

              {/* Icon */}

              <div
                className="
                  flex
                  h-11
                  w-11
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
                  size={20}
                  className="
                    text-primary
                    transition-all
                    duration-300
                    group-hover:text-white
                  "
                />

              </div>

              {/* Text */}

              <div className="flex-1">

                <p
                  className="
                    font-semibold
                    text-on-background
                    transition-colors
                    duration-300
                    group-hover:text-primary
                  "
                >
                  {item.label}
                </p>

              </div>

            </button>

          );

        })}

        <div className="my-4 border-t border-outline-variant" />
                {/* ========================= */}
        {/* Logout */}
        {/* ========================= */}

        <button
          type="button"
          onClick={handleLogout}
          className="
            group
            flex
            w-full
            items-center
            gap-4
            rounded-2xl
            px-4
            py-3.5
            text-left
            transition-all
            duration-300
            hover:bg-red-50
            dark:hover:bg-red-950/20
          "
        >

          {/* Logout Icon */}

          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-2xl
              bg-red-100
              transition-all
              duration-300
              group-hover:bg-red-500
              dark:bg-red-900/30
            "
          >

            <LogOut
              size={20}
              className="
                text-red-500
                transition-all
                duration-300
                group-hover:text-white
              "
            />

          </div>

          {/* Logout Text */}

          <div className="flex-1">

            <p
              className="
                font-semibold
                text-red-500
              "
            >
              Logout
            </p>

            <p
              className="
                text-xs
                text-on-surface-variant
              "
            >
              Sign out of your account
            </p>

          </div>

        </button>
              </div>

    </div>

  );

};

export default UserMenu;