import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../stores/auth";
import LoadingSpinner from "./LoadngSpinner";

export default function PublicRoute() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const token = auth.token;

  useEffect(() => {
    if (token) {
      navigate("/", { replace: true });
    } else {
      setLoading(false);
    }
  }, [token, navigate]);

  if (loading) {
    return (
      <div className="text-center py-4">
        <LoadingSpinner />
      </div>
    );
  }

  return <Outlet />;
}
