import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { FormControl as IFormControl } from "../../types/form";
import { Credentials } from "./AuthForm";

type Props = {
 control: IFormControl;
 credentials: (Credentials | null) | (Omit<Credentials, "username"> | null)
 setCredentials: React.Dispatch<React.SetStateAction<Omit<Credentials, "username"> | null>> | React.Dispatch<React.SetStateAction<Credentials | null>>
}

const AuthFormGroup = ({ control, credentials, setCredentials }: Props) => {

 const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const { value, name } = event.target

  setCredentials((prevState: unknown) => {
   if (prevState) {
    return {
     ...prevState,
     [name]: value
    }
   }
   return {
    [name]: value
   }
  })
 }


 return (
  <FormControl display={"flex"} gap={2} flexDirection={"column"}>
   <FormLabel>{control.label}</FormLabel>
   <Input placeholder={control.inputPlaceholder} name={control.inputName} type={control.inputType} onChange={handleChange} />
  </FormControl>
 );
}

export default AuthFormGroup;