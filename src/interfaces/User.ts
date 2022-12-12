export interface User {
  user: {
    id: string;
    username: string;
    password: string | null;
    firstName: string;
    lastName: string;
  },
  jwtToken: string
}
