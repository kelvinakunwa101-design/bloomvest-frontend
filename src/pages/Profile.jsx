import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API_URL from "../config/api";

const Profile = () => {
const [user, setUser] = useState({
  name: "",
  email: "",
  phone: "",
  occupation: "",
  country: "",
  state: "",
  city: "",
});

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/api/users/me`, {
        
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      console.log("PROFILE DATA:", data);

      setUser({
  name: data.name || "",
  email: data.email || "",
  phone: data.phone || "",
  occupation: data.occupation || "",
  country: data.country || "",
  state: data.state || "",
  city: data.city || "",
});
    } catch (err) {
      toast.error("Unable to load profile.");
    }
  };

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

      setUser(data);

      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto" }}>
      <h2>My Profile</h2>

      <input
        type="text"
        placeholder="Full Name"
        value={user.name}
        onChange={(e) =>
          setUser({
            ...user,
            name: e.target.value,
          })
        }
      />

      <br />
      <br />

      <input
        type="email"
        placeholder="Email"
        value={user.email}
        onChange={(e) =>
          setUser({
            ...user,
            email: e.target.value,
          })
        }
      />
      <input
         type="text"
        placeholder="Phone"
        value={user.phone}
        onChange={(e) =>
        setUser({
         ...user,
         phone: e.target.value,
       })
      }
     />

<input
  type="text"
  placeholder="Occupation"
  value={user.occupation}
  onChange={(e) =>
    setUser({
      ...user,
      occupation: e.target.value,
    })
  }
/>

<br />
<br />

<input
  type="text"
  placeholder="Country"
  value={user.country}
  onChange={(e) =>
    setUser({
      ...user,
      country: e.target.value,
    })
  }
/>

<br />
<br />

<input
  type="text"
  placeholder="State"
  value={user.state}
  onChange={(e) =>
    setUser({
      ...user,
      state: e.target.value,
    })
  }
/>

<br />
<br />

<input
  type="text"
  placeholder="City"
  value={user.city}
  onChange={(e) =>
    setUser({
      ...user,
      city: e.target.value,
    })
  }
/>

<br />
<br />

      <br />
      <br />
      <br />
      <br />

      <button
        onClick={updateProfile}
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
};

export default Profile;