import { Credentials } from "../components/auth-form/AuthForm";
import { TokenObjet, User } from "../types/user";
import TokenService from "./token.service";

const signup = async (body: Credentials): Promise<void> => {
  const response: Response = await fetch(
    `${import.meta.env.VITE_APP_API_URL}/users`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    throw new Error(`Erreur HTTP: ${response.statusText}`);
  }

  const result: TokenObjet = await response.json();

  TokenService.insertTokenInLocalStorage(result.access_token);
  UserService.insertUserInLocalStorage(result.user);
};

const signin = async (body: Omit<Credentials, "username">): Promise<void> => {
  const response: Response = await fetch(
    `${import.meta.env.VITE_APP_API_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    throw new Error(`Erreur HTTP: ${response.statusText}`);
  }

  const result: TokenObjet = await response.json();

  TokenService.insertTokenInLocalStorage(result.access_token);
  UserService.insertUserInLocalStorage(result.user);
};

const insertUserInLocalStorage = (user: User): void => {
  localStorage.setItem("user", JSON.stringify(user));
};

const getUserFromLocalStorage = (): User | null => {
  const user = localStorage.getItem("user");

  if (!user) {
    return null;
  }

  return JSON.parse(user);
};

const logoutUser = (): void => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

const UserService = {
  signin,
  signup,
  insertUserInLocalStorage,
  getUserFromLocalStorage,
  logoutUser,
};

export default UserService;
