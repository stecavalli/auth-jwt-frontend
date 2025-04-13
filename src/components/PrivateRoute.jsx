// src/components/PrivateRoute.jsx
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getLoggedInUser } from "../auth/auth";

const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getLoggedInUser();
      setAuthorized(!!user);
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) return <p>Caricamento...</p>;
  if (!authorized) return <Navigate to="/login" />;

  return children;
};

export default PrivateRoute;
