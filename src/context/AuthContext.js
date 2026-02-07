import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const login = (email) => setUser({ email });
  const logout = () => setUser(null);

  const saveAsteroid = (asteroid) => {
    setFavorites(prev =>
      prev.find(a => a.name === asteroid.name) ? prev : [...prev, asteroid]
    );
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, favorites, saveAsteroid }}>
      {children}
    </AuthContext.Provider>
  );
}
