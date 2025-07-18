import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(()=> {
    const fetchUser = async () => {
      try {
        const {data} = await api.get('auth/me', { withCredentials: true});
        setUser(data);
      } catch{
        setUser(null)
      }
    };
    fetchUser();
  }, []);

  const login = async (credentials) => {
    const res = await api.post('/auth/login', credentials);
    const { token, ...userData } = res.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    console.log("AuthContext User:", user);
  };

  const register = async (credentials) => {
    const res = await api.post('/auth/register', credentials);
    const { token, ...userData } = res.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);