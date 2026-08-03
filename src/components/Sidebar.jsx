import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

 import {
  FaChartPie,
  FaWallet,
  FaChartLine,
  FaExchangeAlt,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
  FaChartBar,
  FaMobileAlt,
  FaLock,
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
  icon: <FaMobileAlt />,
  title: "Utilities",
  path: "/utilities",
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
  icon: <FaLock />,
  title: "Change Password",
  path: "/change-password",
  },
  {
    icon: <FaCog />,
    title: "Settings",
    path: "/settings",
  },
];

export default function Sidebar({ user }) {
  const { logout } = useAuth();
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
    fontSize: "17px",
  }}
>
  {user?.name || "Investor"}
</h3>

<p
  style={{
    marginTop: "8px",
    color: "#CBD5E1",
    fontSize: "13px",
  }}
>
  ID: {user?.investorId || "BV-000001"}
</p>

<p
  style={{
    color: "#94A3B8",
    fontSize: "13px",
    marginTop: "5px",
  }}
>
  A/C: {user?.accountNumber || "0000000000"}
</p>

<p
  style={{
    color:
      user?.kycStatus === "Verified"
        ? "#22C55E"
        : "#F59E0B",
    fontWeight: "600",
    marginTop: "8px",
  }}
>
  {user?.kycStatus || "Pending"}
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
  onClick={logout}
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
