import AuthContext from "@/contexts/AuthContext";
import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

export default function AdminRoute({ children, authentication = true }) {
  const { userData } = useContext(AuthContext);
  const isAuthenticated = userData.isAuthenticated || false;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (authentication && authentication !== isAuthenticated) {
      navigate("/auth/login", { state: { from: location }, replace: true });
    } else if (!authentication && authentication !== isAuthenticated) {
      navigate(location?.state?.from?.pathname || "/admin", { replace: true });
    }
  }, [isAuthenticated, authentication, navigate]);

  return children;
}
