import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedAdminRouter = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
//   if (!isAuthenticated || user?.role !== "admin") {
//     return <Navigate to="/" replace />;
//   }
  return <Outlet />;
};

export default ProtectedAdminRouter;
