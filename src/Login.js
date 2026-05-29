import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "./config/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const text = await response.text();

console.log("RAW RESPONSE:", text);

let data;

try {
  data = JSON.parse(text);
} catch (err) {
  console.log("INVALID JSON RESPONSE");
  alert(text);
  return;
}

      console.log("LOGIN RESPONSE:", data);

      if (data.token) {
        localStorage.setItem("token", data.token);

        console.log("TOKEN SAVED:", localStorage.getItem("token"));

        navigate("/dashboard");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.log("LOGIN ERROR:", error);
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;