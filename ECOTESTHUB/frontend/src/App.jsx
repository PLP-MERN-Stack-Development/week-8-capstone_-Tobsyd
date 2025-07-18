import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import TestPage from './pages/TestPage';
import History from './pages/History';
import Admin from './pages/Admin';
import { AuthProvider } from './context/AuthContext';
// import ProtectedRoute from './utils/ProtectedRoute';
// import RoleDashboard from './pages/RoleDashboard';
// import Subscription from './pages/Subscription';



export default function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} /> 
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
         {/* <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <RoleDashboard />
            </ProtectedRoute>
          }
        /> */}
        {/* <Route path="/subscription" element={<Subscription/>} /> */}
        <Route path="/test/:id" element={<TestPage/>} />
        <Route path="/history" element={<History/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/" element={<Login/>} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}