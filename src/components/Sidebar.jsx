import { Link, useLocation } from "react-router-dom";

import {
  FaChartPie,
  FaWallet,
  FaChartLine,
  FaExchangeAlt,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
  FaChartBar,
} from "react-icons/fa";

const menus = [
  {
    icon: <FaChartPie />,
    title: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: <FaWallet />,
    title: "Wallet",
    path: "/wallet",
  },
  {
    icon: <FaChartLine />,
    title: "Investments",
    path: "/investments",
  },
  {
    icon: <FaExchangeAlt />,
    title: "Transactions",
    path: "/transactions",
  },
  {
  icon: <FaChartBar />,
  title: "Analytics",
  path: "/analytics",
  },
  {
    icon: <FaUserCircle />,
    title: "Profile",
    path: "/profile",
  },
  {
    icon: <FaCog />,
    title: "Settings",
    path: "/settings",
  },
];

export default function Sidebar({ user }) {
  const location = useLocation();
  return (
    <aside
      style={{
        width: "270px",
        background: "#0F172A",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "30px 20px",
      }}
    >
      <div>
        <h2
          style={{
            marginBottom: "5px",
            color: "#3B82F6",
          }}
        >
          Bloomvest
        </h2>

        <p
          style={{
            color: "#94A3B8",
            fontSize: "13px",
            marginBottom: "35px",
          }}
        >
          Investor Dashboard
        </p>

        <div
          style={{
            background: "#1E293B",
            borderRadius: "15px",
            padding: "15px",
            marginBottom: "30px",
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: "16px",
            }}
          >
            {user?.name || "Investor"}
          </h3>

          <p
            style={{
              marginTop: "8px",
              fontSize: "13px",
              color: "#94A3B8",
            }}
          >
            {user?.email || "user@example.com"}
          </p>
        </div>

        {menus.map((menu) => (
  <Link
    key={menu.path}
    to={menu.path}
    style={{
      textDecoration: "none",
      color: "inherit",
    }}
  >
    <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              padding: "14px 16px",
              borderRadius: "12px",
              marginBottom: "10px",
              cursor: "pointer",
              background:
              location.pathname === menu.path
                 ? "#2563EB"
                 : "transparent",
                    transition: ".3s",
              }}
          >
            {menu.icon}

            <span>{menu.title}</span>
              </div>
              </Link>
            ))}
             </div>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
        style={{
          border: "none",
          background: "#DC2626",
          color: "#fff",
          padding: "14px",
          borderRadius: "12px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          fontWeight: "600",
        }}
      >
        <FaSignOutAlt />
        Logout
      </button>
    </aside>
  );
}