import { FaBell, FaSearch } from "react-icons/fa";

const Topbar = () => {
  return (
    <header
      style={{
        height: "75px",
        background: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 30px",
        borderBottom: "1px solid #E5E7EB",
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

        <small
          style={{
            color: "#6B7280",
          }}
        >
          Welcome back 👋
        </small>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <FaSearch size={18} color="#64748B" />

        <FaBell size={18} color="#64748B" />

        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "#10B981",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
          }}
        >
          K
        </div>
      </div>
    </header>
  );
};

export default Topbar;