import { Button, Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";
import { signInFormControls } from "../../data/auth/signInFormControls";
import { Credentials } from "./AuthForm";
import AuthFormGroup from "./AuthFormGroup";
import { Link } from "react-router-dom";

type Props = {
 credentials: Omit<Credentials, "username"> | null;
 setCredentials: React.Dispatch<React.SetStateAction<Omit<Credentials, "username"> | null>>;
}

const SignInFormGroup = ({ credentials, setCredentials }: Props) => {

 const formControls = signInFormControls

 return (
  <>
   <Card
    mb={5}
   >
    <CardHeader>
     <Heading as="h2" size={"lg"}>Connexion</Heading>
    </CardHeader>
    <CardBody display={"flex"} flexDirection={"column"} gap={4}>
     {formControls.map((control, index) => (
      <AuthFormGroup key={index} control={control} credentials={credentials} setCredentials={setCredentials} />
     ))}
     <Button type="submit" width={"100%"} mt={6}>Soumettre</Button>
    </CardBody>
   </Card>
   <Link className="underline relative z-10 text-white flex justify-center" to={"/auth/signup"}>
    Vous n'avez pas encore de compte ?
   </Link>
  </>
 );
}

export default SignInFormGroup;