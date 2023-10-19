import { PresentationData } from "../types/presentation";
import { Template } from "../types/template";

export const getTemplates = async (): Promise<Template[]> => {
  const response: Template[] = await fetch(
    `${import.meta.env.VITE_APP_API_URL}/templates`
  ).then((response) => response.json());

  if (!response) {
    throw new Error("An error occured");
  }

  return response;
};

export const getTemplate = async (id: string | null): Promise<Template> => {
  const response: Template = await fetch(
    `${import.meta.env.VITE_APP_API_URL}/templates/${id}`
  ).then((response) => response.json());

  if (!response) {
    throw new Error("An error occured");
  }

  return response;
};

export const generateTemplate = async (
  body: PresentationData
): Promise<string> => {
  const response: Response = await fetch(
    `${import.meta.env.VITE_APP_API_URL}/templates/generate-template`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    throw new Error("Erreur lors de l'envoi des données");
  }

  return response.json();
};
