import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRouter = ({ children }) => {
  const location = useLocation()
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  if (!isAuthenticated || user?.role !== "user") {
    return <Navigate to="/login" state={{ from: location}} replace />;
  }
  return children;
};

export default ProtectedRouter;
