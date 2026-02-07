import React from "react";

function SpaceFunFacts() {
  const facts = [
    "Most asteroids orbit between Mars and Jupiter.",
    "Some asteroids have their own moons!",
    "The largest asteroid, Ceres, is a dwarf planet.",
    "Asteroids are leftovers from the solar system's formation.",
    "NASA tracks thousands of Near-Earth Objects daily."
  ];

  return (
    <div style={{
      marginTop: "15px",
      padding: "12px",
      borderRadius: "12px",
      background: "rgba(0,150,255,0.08)",
      border: "1px solid rgba(255,255,255,0.08)"
    }}>
      <h3 style={{ marginBottom: "8px", color: "#9ecbff" }}>🧠 Asteroid Fun Facts</h3>
      <ul style={{ paddingLeft: "18px", fontSize: "13px", lineHeight: "1.6" }}>
        {facts.map((fact, i) => (
          <li key={i} style={{ marginBottom: "4px" }}>{fact}</li>
        ))}
      </ul>
    </div>
  );
}

export default SpaceFunFacts;
