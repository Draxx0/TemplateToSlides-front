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
