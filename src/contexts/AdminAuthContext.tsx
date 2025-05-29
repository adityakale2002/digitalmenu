import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminAuthContextType {
  isAdmin: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if admin token exists in localStorage
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
      setIsAdmin(true);
    }
  }, []);

  const login = async (username: string, password: string) => {
    // In a real app, this would make an API call to verify credentials
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('adminToken', 'dummy-token');
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setIsAdmin(false);
  };

  return (
    <AdminAuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}; 