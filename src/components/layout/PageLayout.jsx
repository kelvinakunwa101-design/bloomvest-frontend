import Sidebar from "../Sidebar";
import Topbar from "./Topbar";

const PageLayout = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#F8FAFC",
      }}
    >
      <Sidebar user={JSON.parse(localStorage.getItem("user") || "null")} />

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