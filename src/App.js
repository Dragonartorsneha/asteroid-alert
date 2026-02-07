import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SplashScreen from "./componets/SplashScreen";
import Navbar from "./componets/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/login";
import Signup from "./pages/signup";
import { AuthProvider, AuthContext } from "./context/AuthContext";

function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  const [loading, setLoading] = useState(true);

  if (loading) return <SplashScreen onFinish={() => setLoading(false)} />;

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

