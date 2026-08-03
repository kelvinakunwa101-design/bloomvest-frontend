import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PageLayout from "../components/layout/PageLayout";
import API_URL from "../config/api";

const Settings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    twoFactor: false,
    darkMode: false,
  });

  useEffect(() => {
  const loadSettings = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/api/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      setSettings({
        emailNotifications: data.emailNotifications ?? true,
        smsNotifications: data.smsNotifications ?? false,
        twoFactor: data.twoFactor ?? false,
        darkMode: data.darkMode ?? false,
      });
    } catch (err) {
      console.error(err);
    }
  };

  loadSettings();
}, []);

  const handleToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/api/user/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(settings),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to save settings");
    }

    toast.success("Settings saved successfully!");
  } catch (err) {
    toast.error(err.message);
  }
};

  return (
    <PageLayout>
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          background: "#fff",
          borderRadius: "12px",
          padding: "30px",
          boxShadow: "0 5px 15px rgba(0,0,0,.08)",
        }}
      >
        <h2>Settings</h2>
        <p style={{ color: "#64748B", marginBottom: "30px" }}>
          Manage your account preferences.
        </p>

        <div style={{ marginBottom: "20px" }}>
          <label>
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={() => handleToggle("emailNotifications")}
            />{" "}
            Email Notifications
          </label>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>
            <input
              type="checkbox"
              checked={settings.smsNotifications}
              onChange={() => handleToggle("smsNotifications")}
            />{" "}
            SMS Notifications
          </label>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>
            <input
              type="checkbox"
              checked={settings.twoFactor}
              onChange={() => handleToggle("twoFactor")}
            />{" "}
            Enable Two-Factor Authentication
          </label>
        </div>

        <div style={{ marginBottom: "30px" }}>
          <label>
            <input
              type="checkbox"
              checked={settings.darkMode}
              onChange={() => handleToggle("darkMode")}
            />{" "}
            Dark Mode (Coming Soon)
          </label>
        </div>

        <button onClick={handleSave}>
          Save Settings
        </button>
      </div>
    </PageLayout>
  );
};

export default Settings;