export interface TokenObjet {
  access_token: string;
  user: User;
}

export interface User {
  username: string;
  email: string;
  id: string;
}
