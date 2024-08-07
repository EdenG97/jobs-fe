import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../stores/auth";

export default function ProtectedRoute() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const token = auth.token;

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    } else {
      setLoading(false);
    }
  }, [token, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <Outlet />;
}
