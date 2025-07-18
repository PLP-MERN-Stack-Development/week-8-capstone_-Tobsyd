import { getUserRole } from "../utils/auth";
import Admin from "./Admin";
import Dashboard from "./Dashboard";
import { Navigate } from "react-router-dom";

export default function RoleDashboard() {
  const userRole = getUserRole();

  // If no role is found, redirect to login
  if (!userRole) {
    return <Navigate to="/login" replace />;
  }

  // Render appropriate dashboard based on role
  switch (userRole) {
    case 'admin':
      return <Admin/>;
    case 'developer':
      return <Dashboard/>;
    default:
      // If role is not recognized, redirect to login
      return <Navigate to="/login" replace />;
  }
} 