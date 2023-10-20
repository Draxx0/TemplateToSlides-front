import { Navigate, Outlet } from "react-router-dom";
import UserService from "../services/user.service";

const ProtectedRoute = () => {
 const user = UserService.getUserFromLocalStorage()
 return user ? <Outlet /> : <Navigate to="/auth/signin" />;
}

export default ProtectedRoute;