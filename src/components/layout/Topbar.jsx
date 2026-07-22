import {
  FaBell,
  FaSearch,
  FaMoon,
  FaChevronDown,
} from "react-icons/fa";

const Topbar = () => {
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
          Welcome back to Bloomvest 👋
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
            placeholder="Search..."
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
            gap: "10px",
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
            }}
          >
            K
          </div>

          <FaChevronDown color="#64748B" />
        </div>
      </div>
    </header>
  );
};

export default Topbar;