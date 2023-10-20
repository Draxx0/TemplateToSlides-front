import { FormControl } from "../../types/form";

export const signInFormControls: Array<FormControl> = [
  {
    inputName: "email",
    inputPlaceholder: "Veuillez saisir votre email",
    inputType: "email",
    label: "Adresse Email",
  },
  {
    inputName: "password",
    inputPlaceholder: "Veuillez saisir votre mot de passe",
    inputType: "password",
    label: "Mot de passe",
  },
];
