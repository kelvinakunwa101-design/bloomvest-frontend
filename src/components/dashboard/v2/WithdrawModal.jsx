import { useState } from "react";
import { toast } from "react-toastify";
import Modal from "../../ui/Modal";
import API_URL from "../../../config/api";

const WithdrawModal = ({ isOpen, onClose, onSuccess }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleWithdrawal = async () => {
    if (!amount || Number(amount) <= 0) {
      toast.warning("Please enter a valid withdrawal amount.");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/api/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type: "withdrawal",
          amount: Number(amount),
          description,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Withdrawal failed");
      }

      toast.success("Withdrawal completed successfully!");

      setAmount("");
      setDescription("");

      onClose();

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Withdraw Funds"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input
          type="number"
          placeholder="Withdrawal Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          type="text"
          placeholder="Description (Optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          onClick={handleWithdrawal}
          disabled={loading}
        >
          {loading ? "Processing..." : "Confirm Withdrawal"}
        </button>
      </div>
    </Modal>
  );
};

export default WithdrawModal;