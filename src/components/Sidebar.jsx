export default function Sidebar({ user }) {
  return (
    <div className="sidebar">
      <h2>Bloomvest</h2>
      <p>{user?.name}</p>

      <button>Dashboard</button>
      <button>Wallet</button>
      <button>Investments</button>
    </div>
  );
}