import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import ParentDashboard from './components/ParentDashboard';
import './App.css';
import React from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      setIsAuthenticated(true);
      const userData = JSON.parse(user);
      setUserRole(userData.role);
    }
  }, []);

  const ProtectedRoute = ({ children, requiredRole }: { children: React.ReactElement, requiredRole?: string }) => {
    if (!isAuthenticated) {
      return <Navigate to="/" replace />;
    }
    
    if (requiredRole && userRole !== requiredRole) {
      return <Navigate to="/" replace />;
    }
    
    return children;
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            isAuthenticated ? (
              <Navigate to={userRole === 'ADMIN' ? '/admin-dashboard' : '/parent-dashboard'} replace />
            ) : (
              <Login />
            )
          } 
        />
        <Route 
          path="/admin-dashboard" 
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/parent-dashboard" 
          element={
            <ProtectedRoute requiredRole="PARENT">
              <ParentDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
