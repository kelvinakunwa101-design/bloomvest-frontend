  const DashboardGrid = ({ left, right }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        gap: "24px",
        marginTop: "30px",
        alignItems: "start",
      }}
    >
      <div
        style={{
          minWidth: 0,
        }}
      >
        {left}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          minWidth: 0,
        }}
      >
        {right}
      </div>
    </div>
  );
};

export default DashboardGrid;