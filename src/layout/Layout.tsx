import { Box } from "@chakra-ui/react";
import Header from "../components/Header"
import { ArrowBackIcon } from "@chakra-ui/icons";
import UserService from "../services/user.service";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }: { children: React.ReactElement }) => {
 const user = UserService.getUserFromLocalStorage();
 const navigate = useNavigate()

 const handleLogout = () => {
  UserService.logoutUser()
  navigate("/auth/signin")
 }

 return (
  <>
   {user && <>
    <Header />
    <ArrowBackIcon onClick={handleLogout} className="absolute right-10 top-10 z-40 cursor-pointer hover:-translate-x-2 transition-all ease-in-out duration-200" color={"white"} w={6} h={6} />
   </>
   }



   <Box className="h-screen relative flex items-center justify-center">
    {children}
   </Box>
  </>
 );
}

export default Layout;