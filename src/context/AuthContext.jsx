import { useEffect, useState } from 'react';
import { api } from '../services/api.js';
import { AuthContext } from './auth.js';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('verzel_token');
    const stored = localStorage.getItem('verzel_user');
    if (token && stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const data = await api.login({ username: email, password });
    localStorage.setItem('verzel_token', data.token);
    localStorage.setItem('verzel_user', JSON.stringify(data.user));
    setUser(data.user);
    return data.user;
  };

  const register = async (payload) => {
    const data = await api.register(payload);
    localStorage.setItem('verzel_token', data.token);
    localStorage.setItem('verzel_user', JSON.stringify(data.user));
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem('verzel_token');
    localStorage.removeItem('verzel_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
