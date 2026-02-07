import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div style={{
      background: "#0b0f1a",
      padding: "10px 20px",
      display: "flex",
      justifyContent: "space-between",
      color: "white"
    }}>
      <span>🌌 Cosmic Watch</span>
      {user && (
        <div>
          <span style={{ marginRight: "10px" }}>{user.email}</span>
          <button onClick={() => { logout(); navigate("/login"); }}>Logout</button>
        </div>
      )}
    </div>
  );
}

