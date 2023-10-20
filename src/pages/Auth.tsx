import { Box, Heading } from "@chakra-ui/react";
import AuthForm from "../components/auth-form/AuthForm";

const Auth = ({ method }: { method: "signin" | "signup" }) => {
 return (
  <>
   <Box
    position={"absolute"} inset={0} zIndex={0} backgroundImage={`url('../assets/auth-bg.jpg')`} backgroundPosition={"center"} backgroundRepeat={"no-repeat"} backgroundSize={"cover"}
   ></Box>
   <Box height={"100vh"} background={"black"} position={"absolute"} inset={0} zIndex={0} opacity={0.3}></Box>
   <Box className="flex flex-col">
    <Heading as={"h1"} size={"lg"} mb={10} color={"white"} zIndex={1}>Bienvenue sur TemplateToSlides</Heading>
    <AuthForm method={method} />
   </Box>
  </>
 );
}

export default Auth;