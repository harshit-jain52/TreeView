import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { BASE_URL } from "../App";

const PrivateRoutes = (props) => {
  const { redirectPath } = props;
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const { dispatch } = useAuthContext();

  useEffect(() => {
    const checkAuth = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        return setIsAuthenticated(false);
      }
      const response = await fetch(`${BASE_URL}/api/users/auth`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        dispatch({ type: "LOGOUT" });
        return setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    };

    checkAuth();
  }, []);

  return isAuthenticated ? <Outlet /> : <Navigate to={redirectPath} />;
};

export default PrivateRoutes;
