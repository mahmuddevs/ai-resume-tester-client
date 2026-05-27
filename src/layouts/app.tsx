import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";
import { setNavigate } from "../utils/navigation";
import useAuthStore from "../store/authStore";

export default function AppLayout() {
  const navigate = useNavigate();
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    setNavigate(navigate);
    checkAuth();
  }, [navigate, checkAuth]);

  return <Outlet />;
}
