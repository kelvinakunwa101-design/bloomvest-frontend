import { useState } from "react";
import { toast } from "react-toastify";
import Modal from "../../ui/Modal";
import API_URL from "../../../config/api";

const DepositModal = ({ isOpen, onClose, onSuccess }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDeposit = async () => {
    if (!amount || Number(amount) <= 0) {
      toast.warning("Please enter a valid deposit amount.");
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
          type: "deposit",
          amount: Number(amount),
          description,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Deposit failed");
      }

      toast.success("Deposit completed successfully!");

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
      title="Deposit Funds"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input
          type="number"
          placeholder="Deposit Amount"
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
          onClick={handleDeposit}
          disabled={loading}
        >
          {loading ? "Processing..." : "Confirm Deposit"}
        </button>
      </div>
    </Modal>
  );
};

export default DepositModal;