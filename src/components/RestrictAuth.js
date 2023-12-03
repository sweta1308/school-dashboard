import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const RestrictAuth = () => {
  const { userState } = useAuth();
  const location = useLocation();

  return userState.isLoggedIn ? (
    <Navigate to={location?.state?.from?.pathname || "/"} replace />
  ) : (
    <Outlet />
  );
};
