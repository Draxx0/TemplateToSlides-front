import { Box } from "@chakra-ui/react";
import SignInFormGroup from "./SignInFormGroup";
import SignUpFormGroup from "./SignUpFormGroup";
import { useState } from "react";
import UserService from "../../services/user.service";
import { useNavigate } from "react-router-dom";

export type Credentials = {
  username: string;
  email: string;
  password: string;
}

const AuthForm = ({ method }: { method: "signin" | "signup" }) => {

  const navigate = useNavigate();

  const [signUpCredentials, setSignUpCredentials] = useState<Credentials | null>(null)

  const [signInCredentials, setSignInCredentials] = useState<Omit<Credentials, "username"> | null>(null)

  const isSigninPage = (): boolean => {
    return method === "signin"
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (isSigninPage() && signInCredentials) {
        await UserService.signin(signInCredentials).then(() => navigate('/app'))
        return;
      }

      if (signUpCredentials) {
        await UserService.signup(signUpCredentials).then(() => navigate("/app"));
        return;
      }
    } catch (error) {
      throw new Error("An error occured during authentification")
    }
  }

  return (
    <Box as="form" onSubmit={handleSubmit} >
      {method === "signin" ?
        <SignInFormGroup credentials={signInCredentials} setCredentials={setSignInCredentials} /> :
        <SignUpFormGroup credentials={signUpCredentials} setCredentials={setSignUpCredentials} />}
    </Box>
  );
}

export default AuthForm;