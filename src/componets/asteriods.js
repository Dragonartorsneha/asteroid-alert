
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function AsteroidPieChart({ asteroids }) {
  if (!asteroids.length) return null;

  const avgDistance = asteroids.reduce((sum, a) => sum + a.missDistance, 0) / asteroids.length;
  const avgVelocity = asteroids.reduce((sum, a) => sum + (a.velocity || 0), 0) / asteroids.length;
  const avgSize = asteroids.reduce((sum, a) => sum + (a.diameter || 0), 0) / asteroids.length;

  const data = [
    { name: "Distance", value: avgDistance },
    { name: "Velocity", value: avgVelocity },
    { name: "Size", value: avgSize }
  ];

  const COLORS = ["#4da6ff", "#00ff88", "#ffcc00"];

  return (
    <div style={{ height: 250 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} dataKey="value" outerRadius={80}>
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
