import { useState } from "react";
import { toast } from "react-toastify";
import API_URL from "../config/api";

const ChangePassword = () => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (
      !form.currentPassword ||
      !form.newPassword ||
      !form.confirmPassword
    ) {
      toast.warning("Please complete all fields.");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await fetch(
        `${API_URL}/api/user/change-password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            currentPassword: form.currentPassword,
            newPassword: form.newPassword,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      toast.success("Password changed successfully!");

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto" }}>
      <h2>Change Password</h2>

      <input
        type="password"
        placeholder="Current Password"
        value={form.currentPassword}
        onChange={(e) =>
          setForm({
            ...form,
            currentPassword: e.target.value,
          })
        }
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="New Password"
        value={form.newPassword}
        onChange={(e) =>
          setForm({
            ...form,
            newPassword: e.target.value,
          })
        }
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Confirm New Password"
        value={form.confirmPassword}
        onChange={(e) =>
          setForm({
            ...form,
            confirmPassword: e.target.value,
          })
        }
      />

      <br />
      <br />

      <button
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Updating..." : "Change Password"}
      </button>
    </div>
  );
};

export default ChangePassword;