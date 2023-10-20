const insertTokenInLocalStorage = (token: string) => {
  localStorage.setItem("token", token);
};

const getTokenFromLocalStorage = (): string | null => {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  return token;
};

const TokenService = {
  insertTokenInLocalStorage,
  getTokenFromLocalStorage,
};

export default TokenService;
