import React, { useRef, useState, useContext } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Sphere, Html } from "@react-three/drei";
import * as THREE from "three";
import { AuthContext } from "../context/AuthContext";


import { useTexture } from "@react-three/drei";

function Earth() {
  const ref = React.useRef();

  
  const texture = useTexture("/875earth.jpg");

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.0015;
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[2.6, 64, 64]} />
      <meshStandardMaterial
        map={texture}
        metalness={0.2}
        roughness={0.8}
      />
    </mesh>
  );
}



function OrbitRing({ radius }) {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.02, radius + 0.02, 64]} />
      <meshBasicMaterial color="#2b7cff" side={THREE.DoubleSide} transparent opacity={0.2} />
    </mesh>
  );
}


function Asteroid({ data, orbitRadius, speed }) {
  const ref = useRef();
  const materialRef = useRef();
  const angle = useRef(Math.random() * Math.PI * 2);
  const [showInfo, setShowInfo] = useState(false);
  const { saveAsteroid } = useContext(AuthContext);

  useFrame((state, delta) => {
    angle.current += delta * speed;
    const x = Math.cos(angle.current) * orbitRadius;
    const z = Math.sin(angle.current) * orbitRadius;

    if (ref.current) {
      ref.current.position.set(x, (data.missDistance % 3) - 1.5, z);
      ref.current.rotation.x += 0.01;
      ref.current.rotation.y += 0.01;
    }

    if (materialRef.current && data.risk === "High") {
      const pulse = 0.5 + Math.sin(state.clock.elapsedTime * 4) * 0.4;
      materialRef.current.emissiveIntensity = pulse;
    }
  });

  const color =
    data.risk === "High" ? "#ff6b81" :
    data.risk === "Medium" ? "#ffb347" :
    "#7ef9a9";

  return (
    <mesh ref={ref} onClick={() => setShowInfo(!showInfo)}>
      <dodecahedronGeometry args={[0.5, 0]} />
      <meshStandardMaterial
        ref={materialRef}
        color={color}
        emissive={color}
        emissiveIntensity={data.risk === "High" ? 0.6 : 0.25}
      />

      {showInfo && (
        <Html distanceFactor={10}>
          <div style={{
            background: "#0b0f1a",
            padding: "10px",
            borderRadius: "8px",
            color: "white",
            fontSize: "12px",
            boxShadow: "0 0 10px rgba(43,124,255,0.6)"
          }}>
            <strong>{data.name}</strong><br />
            Distance: {data.missDistance.toLocaleString()} km<br />
            Risk: {data.risk}<br />
            <button onClick={(e) => { e.stopPropagation(); saveAsteroid(data); }}>
              ⭐ Save
            </button>
          </div>
        </Html>
      )}
    </mesh>
  );
}

export default function SpaceScene({ asteroids = [] }) {
  return (
    <Canvas camera={{ position: [0, 3, 10], fov: 60 }} style={{ background: "black", height: "500px" }}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 3, 5]} intensity={2} />
      <directionalLight position={[-5, -3, -5]} intensity={0.5} />
      <Stars radius={200} depth={80} count={7000} factor={5} fade />
      <Earth />
      <OrbitRing radius={4} />
      <OrbitRing radius={5.5} />
      <OrbitRing radius={7} />

      {asteroids.map((a, i) => (
        <Asteroid
          key={i}
          data={a}
          orbitRadius={4 + (i % 3) * 1.5}
          speed={0.2 + (i % 3) * 0.1}
        />
      ))}

      <OrbitControls />
    </Canvas>
  );
}

