import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContextCreation";

const ProtectedRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null; // or spinner 


  if (!user) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoutes;
