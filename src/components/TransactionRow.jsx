export default function TransactionRow({ t }) {
  return (
    <div className="row">
      <span className={`tag ${t.type}`}>{t.type}</span>
      <span>${t.amount}</span>
    </div>
  );
}