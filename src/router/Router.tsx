import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "../pages/Auth";
import ProtectedRoute from "./ProtectedRoute";
import PresentationApp from "../pages/PresentationApp";
import UserDashboard from "../pages/UserDashboard";

const Router = () => {
 return (
  <Routes>
   <Route element={<ProtectedRoute />}>
    <Route path="*" element={<></>} />
    <Route path="/" element={<Navigate to={"/app"} />} />
    <Route path="/app" element={<PresentationApp />} />
    <Route path="/user-dashboard" element={<UserDashboard />} />
   </Route>
   <Route path="/auth/signup" element={<Auth method="signup" />} />
   <Route path="/auth/signin" element={<Auth method="signin" />} />
  </Routes>
 );
}

export default Router;