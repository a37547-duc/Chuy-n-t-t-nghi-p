import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedAdminRouter = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  if (!isAuthenticated || user?.role !== "admin") {
    return <Navigate to="/login" replace />;
  }
  return children
};

export default ProtectedAdminRouter;
