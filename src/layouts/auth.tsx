import { Outlet, Navigate, useLocation } from "react-router";
import useAuthStore from "../store/authStore";
import Loading from "../components/loading";

export default function Auth() {
  const { isAuthenticated, loading } = useAuthStore();
  const location = useLocation();

  if (loading) {
    return (
      <Loading />
    );
  }

  if (isAuthenticated) {
    const from = (location.state as { from?: string })?.from || "/";
    return <Navigate to={from} replace />;
  }

  return (
    <Outlet />
  );
}