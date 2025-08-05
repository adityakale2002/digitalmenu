import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import MenuLayout from './layouts/MenuLayout';
import TableView from './pages/TableView';
import MenuView from './pages/MenuView';
import CartView from './pages/CartView';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { AdminAuthProvider } from './contexts/AdminAuthContext';
import { MenuProvider } from './contexts/MenuContext';
import ChefDashboard from './pages/ChefDashboard';
import WaiterDashboard from './pages/WaiterDashboard';
import FeedbackDashboard from './pages/FeedbackDashboard';
import ManagementDashboard from './pages/ManagementDashboard';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#FF4B2B',
      light: '#FF7F5C',
      dark: '#CC3C22',
    },
    secondary: {
      main: '#2B7FFF',
      light: '#5C9FFF',
      dark: '#2266CC',
    },
    background: {
      default: '#F8F9FA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2D3436',
      secondary: '#636E72',
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      letterSpacing: '-0.01562em',
    },
    h4: {
      fontSize: '2rem',
      fontWeight: 600,
      letterSpacing: '-0.00833em',
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 600,
      letterSpacing: '0.0075em',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 12px 30px rgba(0,0,0,0.12)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
          padding: '10px 24px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 6px 15px rgba(255,75,43,0.2)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #FF4B2B 30%, #FF7F5C 90%)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 20,
        },
      },
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MenuProvider>
        <AdminAuthProvider>
          <Router>
            <Routes>
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/feedback"
                element={
                  <ProtectedRoute>
                    <FeedbackDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Management Dashboard Route */}
              <Route path="/management" element={<ManagementDashboard />} />

              {/* Chef Dashboard Route */}
              <Route path="/chef-dashboard" element={<ChefDashboard />} />

              {/* Waiter Dashboard Route */}
              <Route path="/waiter-dashboard" element={<WaiterDashboard />} />

              {/* Customer Routes */}
              <Route path="/" element={<MenuLayout />}>
                <Route index element={<TableView />} />
                <Route path="menu" element={<MenuView />} />
                <Route path="cart" element={<CartView />} />
                <Route path="order" element={<MenuView />} />
              </Route>
            </Routes>
          </Router>
        </AdminAuthProvider>
      </MenuProvider>
    </ThemeProvider>
  );
};

export default App; 