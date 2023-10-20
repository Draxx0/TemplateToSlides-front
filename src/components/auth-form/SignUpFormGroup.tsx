import { Link } from "react-router-dom";
import { signUpFormControls } from "../../data/auth/signUpFormControl";
import { Credentials } from "./AuthForm";
import AuthFormGroup from "./AuthFormGroup";
import { Button, Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";


type Props = {
 credentials: Credentials | null;
 setCredentials: React.Dispatch<React.SetStateAction<Credentials | null>>;
}

const SignUpFormGroup = ({ credentials, setCredentials }: Props) => {
 const formControls = signUpFormControls
 return (
  <>
   <Card
    mb={5}
   >
    <CardHeader>
     <Heading as="h2" size={"lg"}>Inscription</Heading>
    </CardHeader>
    <CardBody>
     {formControls.map((control, index) => (
      <AuthFormGroup key={index} control={control} credentials={credentials} setCredentials={setCredentials} />
     ))}
     <Button type="submit" width={"100%"} mt={6}>Soumettre</Button>
    </CardBody>
   </Card>

   <Link className="underline relative z-10 text-white flex justify-center" to={"/auth/signin"}>
    Vous possédez déjà un compte ?
   </Link>
  </>
 );
}

export default SignUpFormGroup;