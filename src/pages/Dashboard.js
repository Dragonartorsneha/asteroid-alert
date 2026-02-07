import React, { useEffect, useState, useContext} from "react";
import SpaceScene from "../componets/SpaceScene";
import AsteroidPieChart from "../componets/asteriods";
import SpaceFunFacts from "../componets/asteriodsfunfacts";
import { AuthContext } from "../context/AuthContext";


export default function Dashboard() {
  const { favorites } = useContext(AuthContext);

  const [asteroids, setAsteroids] = useState([]);
  const [loading, setLoading] = useState(true);

  const demoAsteroids = [
    { name: "Astra-1", missDistance: 550000, velocity: 25000, diameter: 120, risk: "High" },
    { name: "Borealis-4", missDistance: 1200000, velocity: 18000, diameter: 80, risk: "Low" },
    { name: "Cygnus-9", missDistance: 3500000, velocity: 32000, diameter: 150, risk: "Low" },
    { name: "Draco-7", missDistance: 800000, velocity: 21000, diameter: 95, risk: "Medium" }
  ];

  useEffect(() => {
    fetch("http://localhost:5000/api/asteroids")
      .then(res => {
        if (!res.ok) throw new Error("Backend offline");
        return res.json();
      })
      .then(data => {
        setAsteroids(data);
        setLoading(false);
      })
      .catch(() => {
        console.warn("Using demo asteroid data");
        setAsteroids(demoAsteroids);
        setLoading(false);
      });
  }, []);

  const hazardous = asteroids.filter(a => a.risk === "High");

  return (
    <div>
      <h1 style={{ textAlign: "center", padding: "15px", color: "#9ecbff" }}>
        🚀 Cosmic Watch — Live Near-Earth Object Monitor
      </h1>

      <div className="dashboard-container">
        

       
        <div className="panel">
          <h3>🚨 Hazard Alerts</h3>
          {hazardous.length === 0 && <p>No immediate threats detected</p>}
          {hazardous.map((a, i) => (
            <div key={i} className="alert-item alert-high">
              <strong>{a.name}</strong><br />
              Distance: {a.missDistance.toLocaleString()} km
            </div>
          ))}

          <SpaceFunFacts />
         
<div style={{
  marginTop: "15px",
  padding: "12px",
  borderRadius: "12px",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)"
}}>
  <h3 style={{ color: "#ffd700" }}>⭐ Favorite Asteroids</h3>

  {favorites.length === 0 ? (
    <p style={{ fontSize: "13px", opacity: 0.6 }}>No favorites saved yet</p>
  ) : (
    favorites.map((a, i) => (
      <div key={i} style={{
        fontSize: "13px",
        marginBottom: "6px",
        padding: "6px",
        borderRadius: "6px",
        background: "rgba(255,255,255,0.04)"
      }}>
        <strong>{a.name}</strong><br />
        {a.missDistance.toLocaleString()} km away
      </div>
    ))
  )}
</div>

        </div>

        
        <div className="panel" style={{ padding: 0 }}>
          {loading && <p style={{ textAlign: "center" }}>Loading space data...</p>}
          <SpaceScene asteroids={asteroids} />
        </div>

       
        <div className="panel">
          <h3>📊 Object Stats</h3>
          {asteroids.map((a, i) => (
            <div key={i} className="stat-card">
              <strong>{a.name}</strong><br />
              Distance: {a.missDistance.toLocaleString()} km<br />
              Speed: {a.velocity?.toLocaleString()} km/h<br />
              Size: ~{a.diameter} m<br />
              Risk: <span style={{ color: a.risk === "High" ? "red" : "#00ff88" }}>{a.risk}</span>
            </div>
          ))}

          <h3>📈 Averages</h3>
          <AsteroidPieChart asteroids={asteroids} />
        </div>

      </div>
      

<div style={{
  gridColumn: "1 / span 3",
  marginTop: "20px",
  padding: "15px",
  borderRadius: "12px",
  background: "rgba(255,255,255,0.05)"
}}>
  <h3 style={{ textAlign: "center", marginBottom: "12px" }}>🚦 Asteroid Risk Levels</h3>

  
  <div style={{ marginBottom: "10px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
      <span style={{ color: "red" }}>High Risk</span>
      <span>{asteroids.filter(a => a.risk === "High").length}</span>
    </div>
    <div style={{
      height: "14px",
      background: "rgba(255,255,255,0.08)",
      borderRadius: "8px",
      overflow: "hidden"
    }}>
      <div style={{
        width: `${(asteroids.filter(a => a.risk === "High").length / asteroids.length) * 100 || 0}%`,
        background: "red",
        height: "100%"
      }} />
    </div>
  </div>

  
  <div style={{ marginBottom: "10px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
      <span style={{ color: "#ffaa00" }}>Medium Risk</span>
      <span>{asteroids.filter(a => a.risk === "Medium").length}</span>
    </div>
    <div style={{
      height: "14px",
      background: "rgba(255,255,255,0.08)",
      borderRadius: "8px",
      overflow: "hidden"
    }}>
      <div style={{
        width: `${(asteroids.filter(a => a.risk === "Medium").length / asteroids.length) * 100 || 0}%`,
        background: "#ffaa00",
        height: "100%"
      }} />
    </div>
  </div>

  
  <div>
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
      <span style={{ color: "#00ff88" }}>Low Risk</span>
      <span>{asteroids.filter(a => a.risk === "Low").length}</span>
    </div>
    <div style={{
      height: "14px",
      background: "rgba(255,255,255,0.08)",
      borderRadius: "8px",
      overflow: "hidden"
    }}>
      <div style={{
        width: `${(asteroids.filter(a => a.risk === "Low").length / asteroids.length) * 100 || 0}%`,
        background: "#00ff88",
        height: "100%"
      }} />
    </div>
  </div>
</div>


    </div>
    
  );
}
