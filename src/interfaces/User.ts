export interface User {
  user: {
    id: string;
    username: string;
    password: string | null;
    firstName: string;
    lastName: string;
  };
  jwtToken: string;
}

export interface LoginUser {
  username: string;
  password: string;
}

export interface RegisterUser {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

export interface InputsTouched {
  [key: string]: boolean;
}
