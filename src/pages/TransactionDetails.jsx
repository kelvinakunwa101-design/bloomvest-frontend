import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import API_URL from "../config/api";

export default function TransactionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          `${API_URL}/api/transactions`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        const selected = data.find(
          (item) => item._id === id
        );

        setTransaction(selected);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTransaction();
  }, [id]);

  if (!transaction) {
    return (
      <PageLayout>
        <h2>Loading transaction...</h2>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          background: "#fff",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 10px 25px rgba(0,0,0,.08)",
        }}
      >
        <h2>Transaction Receipt</h2>

        <hr />

        <p><strong>Reference:</strong> {transaction.reference}</p>

        <p><strong>Type:</strong> {transaction.type}</p>

        <p><strong>Amount:</strong> ₦{transaction.amount.toLocaleString()}</p>

        <p><strong>Status:</strong> {transaction.status}</p>

        <p><strong>Description:</strong> {transaction.description}</p>

        <p>
          <strong>Date:</strong>{" "}
          {new Date(transaction.createdAt).toLocaleString()}
        </p>

        <button
          style={{
            marginTop: "25px",
          }}
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    </PageLayout>
  );
}