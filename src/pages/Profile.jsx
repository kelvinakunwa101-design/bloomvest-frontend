import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API_URL from "../config/api";
import styles from "./Profile.module.css";

const Profile = () => {
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    occupation: "",
    country: "",
    state: "",
    city: "",
    avatar: "",
    accountNumber: "",
    investorId: "",
    investorTier: "",
    kycStatus: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  // ===========================
  // LOAD PROFILE
  // ===========================
  const loadProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      setUser({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        occupation: data.occupation || "",
        country: data.country || "",
        state: data.state || "",
        city: data.city || "",
        avatar: data.avatar || "",
        accountNumber: data.accountNumber || "",
        investorId: data.investorId || "",
        investorTier: data.investorTier || "Bronze",
        kycStatus: data.kycStatus || "Pending",
      });
    } catch {
      toast.error("Unable to load profile.");
    }
  };

  // ===========================
  // AVATAR UPLOAD
  // ===========================
  const uploadAvatar = async (e) => {
    try {
      const file = e.target.files[0];

      if (!file) return;

      const formData = new FormData();
      formData.append("avatar", file);

      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/api/users/avatar`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      setUser((prev) => ({
        ...prev,
        avatar: data.avatar,
      }));

      toast.success("Avatar updated successfully!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  // ===========================
  // UPDATE PROFILE
  // ===========================
  const updateProfile = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/api/users/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      setUser(data.user || data);

      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.profile}>
      {/* ================= HEADER ================= */}

      <div className={styles.header}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={
              user.avatar
                ? `${API_URL}${user.avatar}`
                : `https://ui-avatars.com/api/?name=${user.name}`
            }
            alt="avatar"
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              objectFit: "cover",
              border: "4px solid #2563eb",
            }}
          />

          <br />

          <input
            type="file"
            accept="image/*"
            onChange={uploadAvatar}
          />
        </div>

        <div className={styles.name}>
          <h2>{user.name}</h2>

          <p>{user.email}</p>

          <div className={styles.badges}>
            <span className={styles.badge}>
              {user.investorTier} Investor
            </span>

            <span className={styles.verified}>
              {user.kycStatus}
            </span>
          </div>

          <p>
            <strong>Investor ID:</strong>{" "}
            {user.investorId || "N/A"}
          </p>

          <p>
            <strong>Account Number:</strong>{" "}
            {user.accountNumber || "N/A"}
          </p>
        </div>
      </div>

      {/* ================= FORM ================= */}

      <div className={styles.grid}>
        <div className={styles.field}>
          <label>Full Name</label>

          <input
            value={user.name}
            onChange={(e) =>
              setUser({
                ...user,
                name: e.target.value,
              })
            }
          />
        </div>

        <div className={styles.field}>
          <label>Email</label>

          <input
            value={user.email}
            readOnly
            className={styles.readonly}
          />
        </div>

        <div className={styles.field}>
          <label>Phone</label>

          <input
            value={user.phone}
            onChange={(e) =>
              setUser({
                ...user,
                phone: e.target.value,
              })
            }
          />
        </div>

        <div className={styles.field}>
          <label>Occupation</label>

          <input
            value={user.occupation}
            onChange={(e) =>
              setUser({
                ...user,
                occupation: e.target.value,
              })
            }
          />
        </div>

        <div className={styles.field}>
          <label>Country</label>

          <input
            value={user.country}
            onChange={(e) =>
              setUser({
                ...user,
                country: e.target.value,
              })
            }
          />
        </div>

        <div className={styles.field}>
          <label>State</label>

          <input
            value={user.state}
            onChange={(e) =>
              setUser({
                ...user,
                state: e.target.value,
              })
            }
          />
        </div>

        <div className={styles.field}>
          <label>City</label>

          <input
            value={user.city}
            onChange={(e) =>
              setUser({
                ...user,
                city: e.target.value,
              })
            }
          />
        </div>
      </div>

      <button
        className={styles.button}
        onClick={updateProfile}
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
};

export default Profile;