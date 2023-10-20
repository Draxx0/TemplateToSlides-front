import { FormControl } from "../../types/form";

export const signUpFormControls: Array<FormControl> = [
  {
    inputName: "username",
    inputPlaceholder: "Veuillez saisir votre nom d'utilisateur",
    inputType: "text",
    label: "Nom d'utilisateur",
  },
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
