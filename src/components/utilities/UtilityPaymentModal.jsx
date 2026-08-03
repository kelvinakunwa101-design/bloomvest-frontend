import { useState } from "react";
import { toast } from "react-toastify";
import Modal from "../ui/Modal";
import API_URL from "../../config/api";

const UtilityPaymentModal = ({
  isOpen,
  onClose,
  service,
  onSuccess,
}) => {
  const [customer, setCustomer] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!customer || !amount) {
      toast.error("Please complete all fields.");
      return;
    }

    if (Number(amount) <= 0) {
      toast.error("Enter a valid amount.");
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
        type: "utility",
      amount: Number(amount),
 description: `${service} Purchase - ${customer}`,
     }),
      });

      const data = await res.json();

      console.log("Payment response:", data);

      if (!res.ok) {
        throw new Error(data.message);
      }

      toast.success(`${service} payment successful`);

      console.log("Success toast executed");

      setCustomer("");
      setAmount("");

      onClose();

      if (onSuccess) {
        console.log("Calling onSuccess()");
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
      title={`${service} Payment`}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <input
          type="text"
          placeholder="Phone / Meter / Smart Card Number"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </Modal>
  );
};

export default UtilityPaymentModal;