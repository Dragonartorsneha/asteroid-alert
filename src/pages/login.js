import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!username || !password) return alert("Enter username and password");
    login(username);
    navigate("/");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Login</h2>

        <div className="input-group">
          <FaUser className="input-icon" />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>

        <div className="input-group">
          <FaLock className="input-icon" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button onClick={handleLogin}>Login</button>

        <p style={{ marginTop: "15px" }}>
          Don’t have an account? <Link to="/signup">Register</Link>
        </p>
      </div>
    </div>
  );
}
