import { useState } from "react";
import { toast } from "react-toastify";
import Modal from "../../ui/Modal";
import API_URL from "../../../config/api";

const WithdrawModal = ({ isOpen, onClose, onSuccess }) => {
  const [amount, setAmount] = useState("");

const [bank, setBank] = useState("");

const [accountNumber, setAccountNumber] =
  useState("");

const [accountName, setAccountName] =
  useState("");

const [description, setDescription] =
  useState("");

const [loading, setLoading] =
  useState(false);

  const handleWithdrawal = async () => {
    if (!amount || Number(amount) <= 0) {
      toast.warning("Please enter a valid withdrawal amount.");
      return;
    }

    if (!bank) {
  toast.warning("Select your bank.");
  return;
}

if (!accountNumber) {
  toast.warning("Enter account number.");
  return;
}

if (!accountName) {
  toast.warning("Enter account name.");
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
         bank,
       accountNumber,
        accountName,
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
  onChange={(e) =>
    setAmount(e.target.value)
  }
/>

<select
  value={bank}
  onChange={(e) =>
    setBank(e.target.value)
  }
>
  <option value="">
    Select Bank
  </option>

  <option>Access Bank</option>

  <option>GTBank</option>

  <option>UBA</option>

  <option>Zenith Bank</option>

  <option>First Bank</option>

  <option>Opay</option>

  <option>Moniepoint</option>

  <option>Palmpay</option>
</select>

<input
  placeholder="Account Number"
  value={accountNumber}
  onChange={(e) =>
    setAccountNumber(e.target.value)
  }
/>

<input
  placeholder="Account Name"
  value={accountName}
  onChange={(e) =>
    setAccountName(e.target.value)
  }
/>

<input
  placeholder="Narration (Optional)"
  value={description}
  onChange={(e) =>
    setDescription(e.target.value)
  }
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