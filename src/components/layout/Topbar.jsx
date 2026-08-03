import {
  FaBell,
  FaSearch,
  FaMoon,
  FaChevronDown,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

const Topbar = () => {
const { user } = useAuth();

console.log("TOPBAR USER:", user);

  const initials =
    user?.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <header
      style={{
        height: "80px",
        background: "#FFFFFF",
        borderBottom: "1px solid #E2E8F0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 35px",
      }}
    >
      <div>
        <h2
          style={{
            margin: 0,
            color: "#0F172A",
          }}
        >
          Dashboard
        </h2>

        <p
          style={{
            margin: "6px 0 0",
            color: "#64748B",
            fontSize: "14px",
          }}
        >
          Welcome back, <strong>{user?.name || "Investor"}</strong> 👋
        </p>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "18px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "#F8FAFC",
            padding: "10px 16px",
            borderRadius: "12px",
            minWidth: "250px",
          }}
        >
          <FaSearch color="#64748B" />

          <input
            type="text"
            placeholder="Search investments, transactions..."
            style={{
              border: "none",
              outline: "none",
              background: "transparent",
              width: "100%",
              fontSize: "14px",
            }}
          />
        </div>

        <FaMoon
          size={18}
          color="#64748B"
          style={{ cursor: "pointer" }}
        />

        <FaBell
          size={18}
          color="#64748B"
          style={{ cursor: "pointer" }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              background: "#2563EB",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "700",
              fontSize: "15px",
            }}
          >
            {initials}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              lineHeight: "1.2",
            }}
          >
            <strong
              style={{
                color: "#0F172A",
                fontSize: "14px",
              }}
            >
              {user?.name || "Investor"}
            </strong>

            <div
  style={{
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  }}
>
  <span
    style={{
      color: "#64748B",
      fontSize: "12px",
      fontWeight: "600",
    }}
  >
    {user?.investorTier} Investor
  </span>

  <span
    style={{
      color: "#94A3B8",
      fontSize: "11px",
    }}
  >
         {user?.email}
          </span>
          </div>
          </div>

          <FaChevronDown color="#64748B" />
        </div>
      </div>
    </header>
  );
};

export default Topbar;