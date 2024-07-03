// src/AuthContext.jsx
// import React, { createContext, useContext, useState } from 'react';

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const login = () => {
//     setIsAuthenticated(true);
//   };

//   const logout = () => {
//     setIsAuthenticated(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);

import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   const userRole = localStorage.getItem('role');
  //   if (token) {
  //     setIsAuthenticated(true);
  //     setRole(userRole);
  //   }
  // }, []);

  const login = (token, userRole) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', userRole);
    setIsAuthenticated(true);
    setRole(userRole);
    // navigate(userRole === 'admin' ? '/admin-dashboard' : '/dashboard');
    // console.log("isAuthenticated", isAuthenticated);
  };

  const logout = () => {
    // localStorage.removeItem('token');
    // localStorage.removeItem('role');
    setIsAuthenticated(false);
    setRole(null);
    // navigate('/login');
  };
  // console.log("isAuthenticated", isAuthenticated);
  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
