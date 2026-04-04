import AuthContext from "@/contexts/AuthContext";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router";

export default function AdminRoute({ children, requiredRole }) {
  const { userData } = useContext(AuthContext);
  const location = useLocation();

  if (userData === null) return null;

  if (!userData?.isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (
    requiredRole &&
    userData?.user?.role?.toLowerCase() !== requiredRole.toLowerCase()
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
}
