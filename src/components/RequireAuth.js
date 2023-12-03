import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function RequireAuth() {
  const { userState } = useAuth();
  const location = useLocation();

  return userState.isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
