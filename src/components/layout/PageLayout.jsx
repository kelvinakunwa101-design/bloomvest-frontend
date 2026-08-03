import { useAuth } from "../../context/AuthContext";
import Sidebar from "../Sidebar";
import Topbar from "./Topbar";

const PageLayout = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div style={{ padding: 40 }}>Loading...</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#F8FAFC",
      }}
    >
      <Sidebar user={user} />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Topbar />

        <main
          style={{
            flex: 1,
            padding: "30px",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default PageLayout;