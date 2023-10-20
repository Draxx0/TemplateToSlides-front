import { Presentation, PresentationSave } from "../types/presentation";
import TokenService from "./token.service";

const savePresentation = async (body: PresentationSave): Promise<void> => {
  const token = TokenService.getTokenFromLocalStorage();
  const response: Response = await fetch(
    `${import.meta.env.VITE_APP_API_URL}/presentations`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token ?? null}`,
      },
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    throw new Error(`Erreur HTTP: ${response.statusText}`);
  }
};

const getAllUserPresentation = async (
  id: string
): Promise<Array<Presentation>> => {
  const response: Response = await fetch(
    `${import.meta.env.VITE_APP_API_URL}/presentations/user/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TokenService.getTokenFromLocalStorage()}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Erreur HTTP: ${response.statusText}`);
  }

  const presentations: Array<Presentation> = await response.json();

  return presentations;
};

const PresentationService = {
  savePresentation,
  getAllUserPresentation,
};

export default PresentationService;
