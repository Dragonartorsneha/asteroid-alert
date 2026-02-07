import React, { useEffect, useState } from "react";

export default function SplashScreen({ onFinish }) {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    setTimeout(() => setFade(true), 2500);
    setTimeout(onFinish, 3500);
  }, [onFinish]);

  return (
    <div style={{
      height: "100vh",
      background: "radial-gradient(circle at center, #0b0f1a, black)",
      color: "#9ecbff",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      opacity: fade ? 0 : 1,
      transition: "opacity 1s ease"
    }}>
      <h1 style={{ fontSize: "42px", letterSpacing: "2px" }}>COSMIC WATCH</h1>
      <p style={{ opacity: 0.7 }}>Initializing Near-Earth Object Tracking…</p>
    </div>
  );
}
