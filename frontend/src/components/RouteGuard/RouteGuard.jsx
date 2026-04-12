import AuthContext from "@/contexts/AuthContext";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router";

export default function RouteGuard({
  allowedRoles = [],
  requireAuth = false,
  guestOnly = false,
  children,
}) {
  const { userData, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading || userData === null) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Get value after set context
  const isAuthenticated = userData?.isAuthenticated;
  const user = userData?.user;

  // Guest-only pages
  if (guestOnly && isAuthenticated) {
    return user.role === "admin" ? (
      <Navigate to="/admin" replace />
    ) : (
      <Navigate to="/" replace />
    );
  }

  // Protected routes
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // Role check
  if (requireAuth && allowedRoles.length > 0) {
    if (!allowedRoles.includes(user.role)) {
      return user.role === "admin" ? (
        <Navigate to="/admin" replace />
      ) : (
        <Navigate to="/" replace />
      );
    }
  }

  // if (!userData || !userData.isAuthenticated) {
  //   return <Navigate to="/auth/login" state={{ from: location }} replace />;
  // }

  // if (!allowedRoles.includes(user.role)) {
  //   return user.role === "admin" ? (
  //     <Navigate to="/admin" replace />
  //   ) : (
  //     <Navigate to="/" replace />
  //   );
  // }

  return children;
}
