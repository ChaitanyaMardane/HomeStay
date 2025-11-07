import { Navigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import { useContext } from "react";

const ProtectedRoutes = ({ children }) => {
  const { user  } = useContext(AuthContext);
  // if (loading) return null; // or spinner
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoutes;